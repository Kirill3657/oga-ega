package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
)

type ContactRequest struct {
	Name    string `json:"name"`
	Phone   string `json:"phone"`
	Message string `json:"message"`
}

func sendToMax(w http.ResponseWriter, r *http.Request) {
	// 1. Разбираем входящий JSON
	var req ContactRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, `{"error":"invalid json"}`, http.StatusBadRequest)
		return
	}

	// 2. Получаем токен и chatID из переменных окружения
	token := os.Getenv("MAX_BOT_TOKEN")
	chatID := os.Getenv("MAX_CHAT_ID")
	if token == "" || chatID == "" {
		http.Error(w, `{"error":"server misconfigured"}`, http.StatusInternalServerError)
		return
	}

	// 3. Формируем текст сообщения
	text := "🆕 Новая заявка!\n" +
		"👤 Имя: " + req.Name + "\n" +
		"📞 Телефон: " + req.Phone
	if req.Message != "" {
		text += "\n📝 Комментарий: " + req.Message
	}

	// 4. Отправляем в MAX API
	payload := map[string]string{
		"chat_id": chatID,
		"text":    text,
	}
	body, _ := json.Marshal(payload)

	apiReq, err := http.NewRequest("POST", "https://platform-api2.max.ru/messages", bytes.NewReader(body))
	if err != nil {
		http.Error(w, `{"error":"request creation failed"}`, http.StatusInternalServerError)
		return
	}
	apiReq.Header.Set("Content-Type", "application/json")
	apiReq.Header.Set("Authorization", token)

	client := &http.Client{}
	resp, err := client.Do(apiReq)
	if err != nil {
		http.Error(w, `{"error":"failed to contact MAX"}`, http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		log.Printf("MAX API error: %s", resp.Status)
		http.Error(w, `{"error":"MAX API error"}`, http.StatusInternalServerError)
		return
	}

	// 5. Успешный ответ для фронтенда
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]bool{"ok": true})
}

func main() {
	http.HandleFunc("/api/contact", sendToMax)
	log.Println("Server is running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
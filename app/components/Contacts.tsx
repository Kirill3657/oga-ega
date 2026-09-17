"use client";

import { useState } from "react";
import { MapPin, Phone } from "lucide-react";
import { usePlan } from "./PlanContext";

type Status = { text: string; type: "" | "success" | "error" };

export function Contacts() {
  const { selectedPlan, setSelectedPlan } = usePlan();
  const [status, setStatus] = useState<Status>({ text: "", type: "" });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setSending(true);
    setStatus({ text: "Отправка...", type: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          message: fd.get("message"),
        }),
      });

      if (res.ok) {
        form.reset();
        setSelectedPlan("");
        setStatus({ text: "Заявка отправлена!", type: "success" });
      } else {
        setStatus({ text: "Ошибка. Попробуйте ещё раз.", type: "error" });
      }
    } catch {
      setStatus({ text: "Ошибка. Попробуйте ещё раз.", type: "error" });
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contacts" className="section contacts">
      <h2 className="contacts__title animate-on-scroll animate-fade-up">
        Откройте для своего ребёнка мир самых
        <br />
        <span className="grad-text grad-text--cyan-green">перспективных профессий!</span>
      </h2>
      <div className="contacts__inner animate-on-scroll animate-fade-up delay-100">
        <p className="contacts__item">
          <MapPin className="contacts__icon-yellow" /> г. Энгельс, ул. Тельмана 14а
        </p>
        <p className="contacts__label">Детский центр «Учи.ру»</p>
        <p className="contacts__phone">
          <Phone className="contacts__icon-green" /> +7 (927)-161-98-04
        </p>

        <form id="form" onSubmit={handleSubmit} className="form">
          <input name="name" type="text" placeholder="Ваше имя" required className="form__input" />
          <input name="phone" type="tel" placeholder="Номер телефона" required className="form__input" />
          <input
            name="message"
            type="text"
            placeholder="Комментарий (необязательно)"
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="form__input"
          />
          <button type="submit" disabled={sending} className="btn btn-cta">
            {sending ? "Отправка..." : "Записаться на бесплатное занятие"}
          </button>
          {status.text && (
            <div className={`form__status form__status--${status.type}`}>
              {status.text}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
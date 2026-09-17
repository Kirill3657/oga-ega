import { BookOpen, Users, Trophy } from "lucide-react";

const items = [
  { Icon: BookOpen, color: "var(--yellow)", title: "Формат старшего брата", text: "Обучение не как в школе — как будто занимается старший брат. Для ребёнка это отличная, не перегруженная занятость." },
  { Icon: Users, color: "var(--cyan)", title: "Микро-группы до 10", text: "Каждому ученику уделяется внимание, материал усваивается в комфортном темпе." },
  { Icon: Trophy, color: "var(--green)", title: "Единственные в РФ", text: "Мы — единственная школа в РФ, кто проводит хакатон с дополнительными баллами к ЕГЭ." },
];

export function WhyUs() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title animate-on-scroll animate-fade-up">
          Почему стоит учиться <span className="grad-text grad-text--cyan-green">именно у нас?</span>
        </h2>
        <div className="why-grid">
          {items.map((item, i) => (
            <div key={i} className={`why-card animate-on-scroll animate-fade-up delay-${(i + 1) * 100}`}>
              <div className="why-card__icon" style={{ color: item.color }}>
                <item.Icon />
              </div>
              <h3 className="why-card__title">{item.title}</h3>
              <p className="why-card__text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
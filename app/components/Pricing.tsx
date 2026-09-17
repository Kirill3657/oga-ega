"use client";

import { usePlan } from "./PlanContext";

const plans = [
  {
    label: "1 предмет", price: "5 800 ₽", note: "4 занятия по 2 часа",
    items: ["Русский язык", "Математика", "Информатика"],
  },
  {
    featured: true,
    label: "2 предмета", price: "9 250 ₽", discount: "Скидка 20%",
    items: ["Любые два предмета", "Экономия ~2 350 ₽", "Хакатон + до 10 баллов к ЕГЭ"],
  },
  {
    label: "3 предмета", price: "13 000 ₽", discount: "Скидка 25%",
    items: ["Все три предмета", "Экономия ~4 400 ₽", "Максимальная подготовка"],
  },
];

export function Pricing() {
  const { selectPlanAndScroll } = usePlan();

  return (
    <section id="pricing" className="section">
      <div className="container">
        <h2 className="section-title section-title--tight animate-on-scroll animate-fade-up">
          Подготовка по{" "}
          <span className="grad-text grad-text--cyan-green">1, 2 или 3 предметам</span>
        </h2>
        <p className="section-subtitle animate-on-scroll animate-fade-up delay-100">
          4 занятия по 2 часа. Чем больше предметов — тем выгоднее.
        </p>

        <div className="pricing-grid">
          {plans.map((p, i) => (
            <div key={i} className={`plan animate-on-scroll animate-fade-up delay-${(i + 1) * 100} ${p.featured ? "plan--featured" : ""}`}>
              {p.featured && <div className="plan__badge">Популярный</div>}
              <p className="plan__label">{p.label}</p>
              <p className="plan__price">{p.price}</p>
              {p.note && <p className="plan__note">{p.note}</p>}
              {p.discount && <p className="plan__discount">{p.discount}</p>}
              <ul className="plan__list">
                {p.items.map((it) => <li key={it}>✓ {it}</li>)}
              </ul>
              <button
                type="button"
                onClick={() => selectPlanAndScroll(`${p.label} — ${p.price}${p.discount ? ` (${p.discount})` : ""}`)}
                className="btn btn-primary"
              >
                Записаться
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
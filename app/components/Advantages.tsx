import Image from "next/image";

const items = [
  { title: "До 10 баллов к ЕГЭ", desc: "Дополнительные баллы", img: "/images/advantage0.avif" },
  { title: "Преподаватели", desc: "Недавние выпускники", img: "/images/advantage1.avif" },
  { title: "Методики Москвы", desc: "Лучшего учебного центра", img: "/images/advantage2.avif" },
];

export function Advantages() {
  return (
    <section id="advantages" className="section">
      <div className="container">
        <h2 className="section-title animate-on-scroll animate-fade-up">
          Наши <span className="grad-text grad-text--yellow-orange">преимущества</span>
        </h2>
        <div className="adv-grid">
          {items.map((item, i) => (
            <div key={i} className={`adv-card animate-on-scroll animate-fade-up delay-${(i + 1) * 100}`}>
              <div className="adv-card__image-wrap">
                <Image src={item.img} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="adv-card__image" />
                <div className="adv-card__image-overlay" />
              </div>
              <div className="adv-card__body">
                <div className="adv-card__number">{i + 1}</div>
                <h3 className="adv-card__title">{item.title}</h3>
                <p className="adv-card__desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
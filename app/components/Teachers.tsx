import Image from "next/image";
import { Star } from "lucide-react";

const items = [
  { name: "Мигунова Анастасия", role: "Учитель информатики", img: "/images/teacher1.jpg" },
  { name: "Ковалева Аманда", role: "Преподаватель русского языка и математики", img: "/images/teacher2.jpg" },
];

export function Teachers() {
  return (
    <section id="teachers" className="section section--alt">
      <div className="container">
        <h2 className="section-title animate-on-scroll animate-fade-up">
          Наши <span className="grad-text grad-text--pink-red">преподаватели</span>
        </h2>
        <div className="teachers-grid">
          {items.map((t, i) => (
            <div key={i} className={`teacher-card animate-on-scroll ${i === 0 ? "animate-fade-left" : "animate-fade-right"}`}>
              <div className="teacher-avatar">
                {t.img ? (
                  <Image src={t.img} alt={t.name} width={100} height={100} sizes="100px" className="teacher-avatar__img" />
                ) : (
                  <Star size={32} />
                )}
              </div>
              <div className="teacher-info">
                <h3 className="teacher-name">{t.name}</h3>
                <p className="teacher-role">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
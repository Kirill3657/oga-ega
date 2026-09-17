import { Counter } from "./Counter";

export function Mission() {
  return (
    <section className="section section--alt">
      <div className="container">
        <h2 className="section-title animate-on-scroll animate-fade-up">
          Мы — <span className="grad-text grad-text--yellow-orange">международная сеть</span>
        </h2>
        <p className="mission__text animate-on-scroll animate-fade-up delay-100">
          Обучаем детей более 7 лет. Через наши программы прошло более{" "}
          <span className="mission__accent-cyan">16 000 детей</span>. Мы единственные, кто даёт
          детям возможность получить <span className="mission__accent-yellow">до 10 баллов</span>{" "}
          к результатам ЕГЭ.
        </p>
        <div className="stats">
          <Counter target={16000} label="выпускников" />
          <Counter target={7} label="лет опыта" />
          <Counter target={10} label="баллов к ЕГЭ" />
        </div>
      </div>
    </section>
  );
}
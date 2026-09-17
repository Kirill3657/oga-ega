export function Hackathon() {
  return (
    <section className="section section--alt">
      <div className="container">
        <div className="hackathon__inner animate-on-scroll animate-scale">
          <div className="hackathon__glow" />
          <h2 className="hackathon__title">Хакатон — наш фирменный формат!</h2>
          <p className="hackathon__text">
            Каждый год мы проводим собственный хакатон. Он проходит в рамках{" "}
            <strong>конкурса талантов НТО</strong> и даёт ученикам{" "}
            <strong>до 10 дополнительных баллов к ЕГЭ</strong>.
          </p>
          <a href="#contacts" className="hackathon__cta">Узнать подробнее</a>
        </div>
      </div>
    </section>
  );
}
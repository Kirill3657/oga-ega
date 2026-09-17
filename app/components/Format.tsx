import Image from "next/image";

export function Format() {
  return (
    <section id="format" className="section section--alt">
      <div className="container format__grid">
        <div className="animate-on-scroll animate-fade-left">
          <h2 className="format__title">Формат, который действительно работает</h2>
          <div className="format__text">
            <p>Занятия проходят <span className="accent-yellow">раз в неделю по 2 часа</span>. Преподаватели сами недавно сдавали экзамены, поэтому подготовка идёт «на языке» ребёнка.</p>
            <p>Ведём подготовку по <span className="accent-cyan">русскому языку, математике и информатике</span>.</p>
            <p>У нас <span className="accent-green">микро-группы до 10 человек</span> — это позволяет ребёнку усваивать материал в умеренном темпе.</p>
          </div>
        </div>
        <div className="format__image-wrap animate-on-scroll animate-scale">
          <Image src="/images/students.avif" alt="Занятия" width={800} height={600} sizes="(max-width: 768px) 100vw, 50vw" className="format__image" />
          <div className="format__image-overlay" />
        </div>
      </div>
    </section>
  );
}
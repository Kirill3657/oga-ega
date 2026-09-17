import Image from "next/image";
import { Zap, Fingerprint } from "lucide-react";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__glow hero__glow--cyan" />
      <div className="hero__glow hero__glow--yellow" />
      <div className="container hero__grid">
        <div className="animate-hero">
          <h1 className="hero__title">
            Подготовка к{" "}
            <span className="grad-text grad-text--cyan-blue-yellow">ОГЭ, ЕГЭ, ВПР</span>
          </h1>
          <p className="hero__subtitle">Учи.ру — твой путь к максимальным баллам!</p>
          <div className="hero__buttons">
            <a href="#pricing" className="btn btn-primary">Записаться</a>
            <a href="#advantages" className="btn btn-outline">Узнать больше</a>
          </div>
        </div>
        <div className="hero__visual animate-hero animate-hero--delay">
          <div className="hero__image-wrap">
            <Image
              src="/images/hero.avif"
              alt="Учебный процесс"
              width={600}
              height={400}
              priority
              sizes="(max-width: 768px) 100vw, 600px"
              className="hero__image"
            />
            <div className="hero__image-overlay" />
          </div>
          <div className="hero__icon hero__icon--top"><Zap size={48} /></div>
          <div className="hero__icon hero__icon--bottom"><Fingerprint size={48} /></div>
          <div className="hero__badge">
            <h2 className="hero__badge-title">Учи.ру</h2>
            <p className="hero__badge-text">г. Энгельс, ул. Тельмана 14А</p>
          </div>
        </div>
      </div>
    </section>
  );
}
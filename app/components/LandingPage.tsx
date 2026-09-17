"use client";

import { m, useInView, Variants } from "framer-motion";
import {
  MapPin, Phone, Zap, Fingerprint, Users, Trophy, Star, BookOpen, Menu, X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const fadeIn = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: "easeOut" },
  },
});

const navLinks = [
  { href: "#advantages", label: "Преимущества" },
  { href: "#format", label: "Формат" },
  { href: "#teachers", label: "Преподаватели" },
  { href: "#pricing", label: "Цены" },
  { href: "#contacts", label: "Контакты" },
];

function AnimatedLogo() {
  return (
    <a href="#" className="logo">
      <span aria-hidden className="logo__glow" />
      <m.span
        className="logo__text"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Учи
      </m.span>
      <m.span
        className="logo__accent"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, duration: 0.5, type: "spring", stiffness: 220 }}
        whileHover={{ scale: 1.08 }}
      >
        <span className="logo__dot">.</span>
        ру
      </m.span>
      <span aria-hidden className="logo__shimmer" />
    </a>
  );
}

function Counter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCount((prev) => (prev < target ? prev + Math.ceil(target / 50) : target));
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isInView, target]);

  return (
    <div ref={ref} className="stat">
      <div className="stat__number">{count.toLocaleString("ru-RU")}</div>
      <p className="stat__label">{label}</p>
    </div>
  );
}

export function LandingPage() {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const statusEl = form.querySelector("#form-status") as HTMLElement | null;
    if (statusEl) {
      statusEl.textContent = "Отправка...";
      statusEl.className = "form__status";
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          message: formData.get("message"),
        }),
      });

      if (res.ok) {
        form.reset();
        setSelectedPlan("");
        if (statusEl) {
          statusEl.textContent = "Заявка отправлена!";
          statusEl.className = "form__status form__status--success";
        }
      } else {
        if (statusEl) {
          statusEl.textContent = "Ошибка. Попробуйте ещё раз.";
          statusEl.className = "form__status form__status--error";
        }
      }
    } catch {
      if (statusEl) {
        statusEl.textContent = "Ошибка. Попробуйте ещё раз.";
        statusEl.className = "form__status form__status--error";
      }
    }
  }

  const selectPlan = (plan: string) => {
    setSelectedPlan(plan);
    document.getElementById("form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <div className="container header__inner">
          <AnimatedLogo />

          <nav className="header__nav">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="header__nav-link">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="header__actions">
            <a href="#pricing" className="header__cta">Записаться</a>
            <button
              className="header__burger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="mobile-menu">
            <nav className="container mobile-menu__inner">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-menu__link"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-menu__cta"
              >
                Записаться
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="main">
        {/* HERO */}
        <section className="hero">
          <div className="hero__glow hero__glow--cyan" />
          <div className="hero__glow hero__glow--yellow" />
          <m.div className="container hero__grid" initial="hidden" animate="visible">
            <m.div variants={fadeIn(0)}>
              <h1 className="hero__title">
                Подготовка к{" "}
                <span className="grad-text grad-text--cyan-blue-yellow">ОГЭ, ЕГЭ, ВПР</span>
              </h1>
              <p className="hero__subtitle">Учи.ру — твой путь к максимальным баллам!</p>
              <div className="hero__buttons">
                <a href="#pricing" className="btn btn-primary">Записаться</a>
                <a href="#advantages" className="btn btn-outline">Узнать больше</a>
              </div>
            </m.div>
            <m.div variants={fadeIn(0.3)} className="hero__visual">
              <div className="hero__image-wrap">
                <Image
                  src="/images/hero.avif"
                  alt="Учебный процесс"
                  width={600}
                  height={400}
                  priority
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
            </m.div>
          </m.div>
        </section>

        {/* МИССИЯ И ЦИФРЫ */}
        <section className="section section--alt">
          <div className="container">
            <m.h2
              className="section-title"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn(0)}
            >
              Мы — <span className="grad-text grad-text--yellow-orange">международная сеть</span>
            </m.h2>
            <m.p
              className="mission__text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn(0.2)}
            >
              Обучаем детей более 7 лет. Через наши программы прошло более{" "}
              <span className="mission__accent-cyan">16 000 детей</span>. Мы единственные, кто даёт
              детям возможность получить{" "}
              <span className="mission__accent-yellow">до 10 баллов</span> к результатам ЕГЭ.
            </m.p>
            <div className="stats">
              <Counter target={16000} label="выпускников" />
              <Counter target={7} label="лет опыта" />
              <Counter target={10} label="баллов к ЕГЭ" />
            </div>
          </div>
        </section>

        {/* ПРЕИМУЩЕСТВА */}
        <section id="advantages" className="section">
          <div className="container">
            <m.h2
              className="section-title"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn(0)}
            >
              Наши <span className="grad-text grad-text--yellow-orange">преимущества</span>
            </m.h2>
            <div className="adv-grid">
              {[
                { title: "До 10 баллов к ЕГЭ", desc: "Дополнительные баллы", img: "/images/advantage0.avif" },
                { title: "Преподаватели", desc: "Недавние выпускники", img: "/images/advantage1.avif" },
                { title: "Методики Москвы", desc: "Лучшего учебного центра", img: "/images/advantage2.avif" },
              ].map((item, i) => (
                <m.div
                  key={i}
                  className="adv-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <div className="adv-card__image-wrap">
                    <Image src={item.img} alt={item.title} fill className="adv-card__image" />
                    <div className="adv-card__image-overlay" />
                  </div>
                  <div className="adv-card__body">
                    <div className="adv-card__number">{i + 1}</div>
                    <h3 className="adv-card__title">{item.title}</h3>
                    <p className="adv-card__desc">{item.desc}</p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* ФОРМАТ */}
        <section id="format" className="section section--alt">
          <div className="container format__grid">
            <m.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="format__title">Формат, который действительно работает</h2>
              <div className="format__text">
                <p>Занятия проходят <span className="accent-yellow">раз в неделю по 2 часа</span>. Преподаватели сами недавно сдавали экзамены, поэтому подготовка идёт «на языке» ребёнка.</p>
                <p>Ведём подготовку по <span className="accent-cyan">русскому языку, математике и информатике</span>.</p>
                <p>У нас <span className="accent-green">микро-группы до 10 человек</span> — это позволяет ребёнку усваивать материал в умеренном темпе, а преподаватель подходит к каждому ученику индивидуально.</p>
              </div>
            </m.div>
            <m.div
              className="format__image-wrap"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Image src="/images/students.avif" alt="Занятия" width={800} height={600} className="format__image" />
              <div className="format__image-overlay" />
            </m.div>
          </div>
        </section>

        {/* ПОЧЕМУ МЫ */}
        <section className="section">
          <div className="container">
            <m.h2
              className="section-title"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn(0)}
            >
              Почему стоит учиться <span className="grad-text grad-text--cyan-green">именно у нас?</span>
            </m.h2>
            <div className="why-grid">
              {[
                { icon: <BookOpen />, color: "var(--yellow)", title: "Формат старшего брата", text: "Обучение не как в школе — как будто занимается старший брат. Для ребёнка это отличная, не перегруженная занятость на лето." },
                { icon: <Users />, color: "var(--cyan)", title: "Микро-группы до 10", text: "Каждому ученику уделяется внимание, материал усваивается в комфортном темпе, преподаватель всегда рядом." },
                { icon: <Trophy />, color: "var(--green)", title: "Единственные в РФ", text: "Мы — единственная школа в РФ, кто проводит каждый год хакатон, проходя который дети получают дополнительные баллы к ЕГЭ." },
              ].map((item, i) => (
                <m.div
                  key={i}
                  className="why-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                >
                  <div className="why-card__icon" style={{ color: item.color }}>{item.icon}</div>
                  <h3 className="why-card__title">{item.title}</h3>
                  <p className="why-card__text">{item.text}</p>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* ХАКАТОН */}
        <section className="section section--alt">
          <div className="container">
            <m.div
              className="hackathon__inner"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="hackathon__glow" />
              <h2 className="hackathon__title">Хакатон — наш фирменный формат!</h2>
              <p className="hackathon__text">
                Каждый год мы проводим собственный хакатон. Он проходит в рамках{" "}
                <strong>конкурса талантов НТО</strong> и даёт ученикам{" "}
                <strong>до 10 дополнительных баллов к ЕГЭ</strong> — это уникальная возможность заявить о себе!
              </p>
              <a href="#contacts" className="hackathon__cta">Узнать подробнее</a>
            </m.div>
          </div>
        </section>

        {/* ПРЕПОДАВАТЕЛИ */}
        <section id="teachers" className="section section--alt">
          <div className="container">
            <m.h2
              className="section-title"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn(0)}
            >
              Наши <span className="grad-text grad-text--pink-red">преподаватели</span>
            </m.h2>
            <div className="teachers-grid">
              {[
                { name: "Мигунова Анастасия", role: "Учитель информатики", img: "/images/teacher1.jpg" },
                { name: "Ковалева Аманда", role: "Преподаватель русского языка и математики", img: "/images/teacher2.jpg" },
              ].map((teacher, i) => (
                <m.div
                  key={i}
                  className="teacher-card"
                  initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                >
                  <div className="teacher-avatar">
                    {teacher.img ? (
                      <Image src={teacher.img} alt={teacher.name} width={100} height={100} className="teacher-avatar__img" />
                    ) : (
                      <Star size={32} />
                    )}
                  </div>
                  <div className="teacher-info">
                    <h3 className="teacher-name">{teacher.name}</h3>
                    <p className="teacher-role">{teacher.role}</p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* ЦЕНЫ */}
        <section id="pricing" className="section">
          <div className="container">
            <m.h2
              className="section-title section-title--tight"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn(0)}
            >
              Подготовка по{" "}
              <span className="grad-text grad-text--cyan-green">1, 2 или 3 предметам</span>
            </m.h2>
            <m.p
              className="section-subtitle"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn(0.1)}
            >
              4 занятия по 2 часа. Чем больше предметов — тем выгоднее.
            </m.p>
            <div className="pricing-grid">
              <m.div
                className="plan"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="plan__label">1 предмет</p>
                <p className="plan__price">5 800 ₽</p>
                <p className="plan__note">4 занятия по 2 часа</p>
                <ul className="plan__list">
                  <li>✓ Русский язык</li>
                  <li>✓ Математика</li>
                  <li>✓ Информатика</li>
                </ul>
                <button type="button" onClick={() => selectPlan("1 предмет — 5 800 ₽")} className="btn btn-primary">
                  Записаться
                </button>
              </m.div>

              <m.div
                className="plan plan--featured"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.6 }}
              >
                <div className="plan__badge">Популярный</div>
                <p className="plan__label">2 предмета</p>
                <p className="plan__price">9 250 ₽</p>
                <p className="plan__discount">Скидка 20%</p>
                <ul className="plan__list">
                  <li>✓ Любые два предмета</li>
                  <li>✓ Экономия ~2 350 ₽</li>
                  <li>✓ Хакатон + до 10 баллов к ЕГЭ</li>
                </ul>
                <button type="button" onClick={() => selectPlan("2 предмета — 9 250 ₽ (скидка 20%)")} className="btn btn-primary">
                  Записаться
                </button>
              </m.div>

              <m.div
                className="plan"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <p className="plan__label">3 предмета</p>
                <p className="plan__price">13 000 ₽</p>
                <p className="plan__discount">Скидка 25%</p>
                <ul className="plan__list">
                  <li>✓ Все три предмета</li>
                  <li>✓ Экономия ~4 400 ₽</li>
                  <li>✓ Максимальная подготовка</li>
                </ul>
                <button type="button" onClick={() => selectPlan("3 предмета — 13 000 ₽ (скидка 25%)")} className="btn btn-primary">
                  Записаться
                </button>
              </m.div>
            </div>
          </div>
        </section>

        {/* КОНТАКТЫ */}
        <section id="contacts" className="section contacts">
          <m.h2
            className="contacts__title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn(0)}
          >
            Откройте для своего ребёнка мир самых{" "}
            <br />
            <span className="grad-text grad-text--cyan-green">перспективных профессий!</span>
          </m.h2>
          <m.div
            className="contacts__inner"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
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
              <button type="submit" className="btn btn-cta">Записаться на бесплатное занятие</button>
              <div id="form-status" className="form__status"></div>
            </form>
          </m.div>
        </section>
      </main>
    </>
  );
}
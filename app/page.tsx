"use client";

import { motion, useInView, Variants } from "framer-motion";
import { MapPin, Phone, Zap, Fingerprint, Users, Trophy, Rocket, Star, BookOpen, Code, Brain } from "lucide-react";
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
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-black text-cyan-400">{count.toLocaleString()}</div>
      <p className="text-gray-400 mt-2 text-lg">{label}</p>
    </div>
  );
}

// Компонент "Строители с молотками"
function BuildersAnimation() {
  return (
    <div className="relative flex items-end justify-center h-64 w-full max-w-md mx-auto mt-8">
      {/* Строящаяся стена */}
      <div className="flex flex-col-reverse items-center gap-1">
        {[1, 2, 3, 4, 5].map((_, i) => (
          <motion.div
            key={i}
            className="w-24 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-md shadow-lg"
            initial={{ opacity: 0, y: -20, scaleY: 0 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            transition={{ delay: i * 0.4, duration: 0.4, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Строители */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 + i * 0.2 }}
          >
            {/* Тело */}
            <div className="w-6 h-10 bg-yellow-400 rounded-t-lg rounded-b-md" />
            {/* Голова */}
            <div className="w-8 h-8 bg-orange-300 rounded-full -mt-2" />
            {/* Каска */}
            <div className="w-10 h-3 bg-yellow-600 rounded-full -mt-2" />
            {/* Рука с молотком */}
            <motion.div
              className="absolute -top-4 right-0 w-2 h-6 bg-yellow-700 origin-bottom"
              animate={{ rotate: [0, -30, 0] }}
              transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.3 }}
            >
              {/* Молоток */}
              <div className="absolute -top-1 right-0 w-8 h-3 bg-gray-400 rounded-sm" />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Обработчик отправки формы
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  const statusEl = form.querySelector("#form-status");
  if (statusEl) statusEl.textContent = "Отправка...";

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
      if (statusEl) {
        statusEl.textContent = "Заявка отправлена!";
        statusEl.className = "text-green-400 text-center";
      }
    } else {
      if (statusEl) {
        statusEl.textContent = "Ошибка. Попробуйте ещё раз.";
        statusEl.className = "text-red-400 text-center";
      }
    }
  } catch {
    if (statusEl) {
      statusEl.textContent = "Ошибка. Попробуйте ещё раз.";
      statusEl.className = "text-red-400 text-center";
    }
  }
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white font-sans overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-6">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/20 blur-[120px] rounded-full pointer-events-none" />
        <motion.div
          className="container mx-auto grid md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeIn(0)}>
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Подготовка к{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-yellow-400">
                ОГЭ, ЕГЭ, ВПР
              </span>
            </h1>
            <p className="mt-6 text-2xl text-gray-400">Учи.ру — твой путь к максимальным баллам!</p>
            <div className="mt-10 flex gap-4">
              <a href="#contacts" className="btn-primary">Записаться</a>
              <a href="#advantages" className="btn-outline">Узнать больше</a>
            </div>
          </motion.div>
          <motion.div variants={fadeIn(0.3)} className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image src="/images/hero.avif" alt="Учебный процесс" width={600} height={400} className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="absolute -top-6 -right-6 text-yellow-400 animate-bounce"><Zap size={60} /></div>
            <div className="absolute -bottom-6 -left-6 text-cyan-400 animate-pulse"><Fingerprint size={60} /></div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 text-center shadow-xl">
              <h2 className="text-2xl font-bold">Учи.ру</h2>
              <p className="text-gray-300 text-sm">г. Энгельс, ул. Тельмана 14А</p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* СТРОИТЕЛИ */}
      <BuildersAnimation />

      {/* МИССИЯ И ЦИФРЫ */}
      <section className="py-24 bg-[#0F1523]">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-black text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn(0)}
          >
            Мы — <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">международная сеть</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 text-center max-w-4xl mx-auto mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn(0.2)}
          >
            Обучаем детей более 7 лет. Через наши программы прошло более{" "}
            <span className="text-cyan-400 font-bold">16 000 детей</span>. Мы единственные, кто даёт
            детям возможность получить <span className="text-yellow-400 font-bold">до 10 баллов</span> к результатам ЕГЭ.
          </motion.p>
          <div className="grid md:grid-cols-3 gap-10">
            <Counter target={16000} label="выпускников" />
            <Counter target={7} label="лет опыта" />
            <Counter target={10} label="баллов к ЕГЭ" />
          </div>
        </div>
      </section>

      {/* ПРЕИМУЩЕСТВА */}
      <section id="advantages" className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-black text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn(0)}
          >
            Наши <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">преимущества</span>
          </motion.h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "До 10 баллов к ЕГЭ", desc: "Дополнительные баллы", img: "/images/advantage0.avif" },
              { title: "Преподаватели", desc: "Недавние выпускники", img: "/images/advantage1.avif" },
              { title: "Методики Москвы", desc: "Лучшего учебного центра", img: "/images/advantage2.avif" },
              { title: "Партнерства", desc: "С вузами и компаниями", img: "/images/advantage3.avif" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="relative h-40 overflow-hidden">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="text-3xl font-black text-yellow-400">{i + 1}</div>
                  <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                  <p className="mt-1 text-gray-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* КАК ПРОХОДЯТ ЗАНЯТИЯ */}
      <section className="py-24 bg-[#0F1523]">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-8">Формат, который действительно работает</h2>
            <div className="space-y-6 text-xl text-gray-300">
              <p>Занятия проходят <span className="text-yellow-400 font-bold">раз в неделю по 2 часа</span>. Преподаватели сами недавно сдавали экзамены, поэтому подготовка идёт «на языке» ребёнка.</p>
              <p>Ведём подготовку по <span className="text-cyan-400 font-bold">математике, русскому и информатике</span>.</p>
              <p>У нас <span className="text-green-400 font-bold">микро-группы до 10 человек</span> — это позволяет ребёнку усваивать материал в умеренном темпе, а преподаватель подходит к каждому ученику индивидуально.</p>
            </div>
          </motion.div>
          <motion.div
            className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Image src="/images/students.avif" alt="Занятия" width={800} height={600} className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ПОЧЕМУ МЫ */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-black text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn(0)}
          >
            Почему стоит учиться <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">именно у нас?</span>
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <BookOpen className="w-10 h-10 text-yellow-400" />, title: "Формат старшего брата", text: "Обучение не как в школе — как будто занимается старший брат. Для ребёнка это отличная, не перегруженная занятость на лето." },
              { icon: <Users className="w-10 h-10 text-cyan-400" />, title: "Микро-группы до 10", text: "Каждому ученику уделяется внимание, материал усваивается в комфортном темпе, преподаватель всегда рядом." },
              { icon: <Trophy className="w-10 h-10 text-green-400" />, title: "Единственные в РФ", text: "Мы — единственная школа в РФ, кто проводит каждый год хакатон, проходя который дети получают дополнительные баллы к ЕГЭ." },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ХАКАТОН */}
      <section className="py-24 bg-[#0F1523]">
        <div className="container mx-auto px-6">
          <motion.div
            className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 text-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <h2 className="text-4xl md:text-5xl font-black mb-6">Хакатон — наш фирменный формат!</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Каждый год мы проводим собственный хакатон. Проходя его, ученики решают реальные задачи и получают дополнительные баллы к ЕГЭ — это уникальная возможность заявить о себе!
            </p>
            <a href="#contacts" className="mt-8 inline-block px-8 py-4 bg-white text-red-500 font-bold rounded-full hover:bg-gray-100 transition-all">
              Узнать подробнее
            </a>
          </motion.div>
        </div>
      </section>

      {/* ПОДГОТОВКА К НТО */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-black text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn(0)}
          >
            Подготовка к <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Национальной технологической олимпиаде</span>
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Code className="w-10 h-10 text-blue-400" />, title: "IT и программирование", text: "Учим решать инженерные задачи, работать с данными и создавать собственные проекты." },
              { icon: <Brain className="w-10 h-10 text-purple-400" />, title: "Аналитическое мышление", text: "Развиваем логику и алгоритмическое мышление — ключевые навыки для победы в олимпиаде." },
              { icon: <Rocket className="w-10 h-10 text-green-400" />, title: "Поступление в топ-вузы", text: "Победа в НТО даёт льготы при поступлении в ведущие технические университеты страны." },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРЕПОДАВАТЕЛИ */}
      <section className="py-24 bg-[#0F1523]">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-black text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn(0)}
          >
            Наши <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500">преподаватели</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Мигунова Анастасия", role: "Учитель информатики", img: "/images/teacher1.jpg" },
              { name: "Ковалева Аманда", role: "Преподаватель русского и математики", img: "/images/teacher2.jpg" },
            ].map((teacher, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2"
                initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
              >
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 bg-gray-800 flex items-center justify-center">
                  {teacher.img ? (
                    <Image src={teacher.img} alt={teacher.name} width={100} height={100} className="object-cover" />
                  ) : (
                    <Star className="w-10 h-10 text-gray-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{teacher.name}</h3>
                  <p className="text-cyan-400 mt-1">{teacher.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ЦЕНЫ */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl md:text-5xl font-black text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn(0)}
          >
            Сейчас можно купить со скидкой!
          </motion.h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-0">
            <motion.div
              className="bg-white/5 p-12 text-center rounded-l-3xl border-r-0 border border-white/10"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p>При покупке до 30.01</p>
              <div className="text-7xl font-black text-yellow-400 my-4">-1000 ₽</div>
              <p>на каждый месяц обучения</p>
            </motion.div>
            <motion.div
              className="bg-white/5 p-12 text-center rounded-r-3xl border border-white/10"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-4xl text-gray-400 line-through">6 800 р.</p>
              <p className="text-6xl font-black text-green-400 my-4">5 800 р.</p>
              <a href="#contacts" className="btn-green">Купить со скидкой</a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ + ФОРМА */}
      <section id="contacts" className="py-24 text-center">
        <motion.h2
          className="text-4xl md:text-6xl font-black leading-tight px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn(0)}
        >
          Откройте для своего ребёнка мир самых{" "}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">перспективных профессий!</span>
        </motion.h2>
        <motion.div
          className="mt-12 flex flex-col items-center gap-6 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="flex items-center gap-2 text-xl"><MapPin className="text-yellow-400" /> г. Энгельс, ул. Тельмана 14а</p>
          <p className="text-gray-400">Детский центр "Учи.ру"</p>
          <p className="text-2xl font-bold flex items-center gap-2"><Phone className="text-green-400" /> +7 (927)-161-98-04</p>

          {/* ФОРМА ЗАЯВКИ */}
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 max-w-md w-full mx-auto">
            <input
              name="name"
              type="text"
              placeholder="Ваше имя"
              required
              className="px-5 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 outline-none focus:border-cyan-400 transition-colors"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Номер телефона"
              required
              className="px-5 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 outline-none focus:border-cyan-400 transition-colors"
            />
            <input
              name="message"
              type="text"
              placeholder="Комментарий (необязательно)"
              className="px-5 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 outline-none focus:border-cyan-400 transition-colors"
            />
            <button type="submit" className="btn-cta">Записаться на бесплатное занятие</button>
            <div id="form-status" className="text-center"></div>
          </form>
        </motion.div>
      </section>
    </main>
  );
}
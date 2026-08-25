"use client";

import { motion, Variants } from "framer-motion";
import { MapPin, Phone, Zap, Fingerprint } from "lucide-react";
import Image from "next/image";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white font-sans overflow-x-hidden">
      
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-6">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/20 blur-[120px] rounded-full pointer-events-none" />

        <motion.div 
          className="container mx-auto grid md:grid-cols-2 gap-12 items-center"
          initial="hidden" animate="visible"
        >
          <div>
            <motion.h1 
              className="text-6xl md:text-8xl font-black leading-tight"
              variants={fadeIn} custom={0}
            >
              Подготовка к{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-yellow-400">
                ОГЭ, ЕГЭ, ВПР
              </span>
            </motion.h1>
            <motion.p className="mt-6 text-2xl text-gray-400" variants={fadeIn} custom={1}>
              Учи.ру — твой путь к максимальным баллам!
            </motion.p>
            <motion.div className="mt-10 flex gap-4" variants={fadeIn} custom={2}>
              {/* Ссылка на звонок */}
              <a href="#contacts" className="btn-primary">
                Записаться
              </a>
              {/* Якорь на преимущества */}
              <a href="#advantages" className="btn-outline">
                Узнать больше
              </a>
            </motion.div>
          </div>

          <motion.div variants={fadeIn} custom={3} className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image 
                src="/images/hero.avif" 
                alt="Учебный процесс" 
                width={600} 
                height={400} 
                className="object-cover w-full h-full"
              />
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

      {/* Преимущества (добавлен id для якоря) */}
      <section id="advantages" className="py-24 bg-[#0F1523]">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-5xl font-black text-center mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            Наши <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">преимущества</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "До 10 баллов к ЕГЭ", desc: "Дополнительные баллы", img: "/images/advantage0.avif" },
              { title: "Преподаватели", desc: "Недавние выпускники", img: "/images/advantage1.avif" },
              { title: "Методики Москвы", desc: "Лучшего учебного центра", img: "/images/advantage2.avif" },
              { title: "Партнерства", desc: "С вузами и компаниями", img: "/images/advantage3.avif" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="relative h-40">
                  <Image src={item.img} alt={item.title} fill className="object-cover" />
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

      {/* Цифры и предметы */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            className="text-5xl font-black mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            Подготовка к экзаменам
          </motion.h2>
          
          <div className="grid grid-cols-3 gap-10">
            {[
              { num: "2,5", label: "часа в неделю", color: "text-cyan-400" },
              { num: "3", label: "предмета", color: "text-green-400" },
              { num: "+10", label: "баллов к ЕГЭ", color: "text-yellow-400" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <div className={`text-7xl font-black ${item.color}`}>{item.num}</div>
                <p className="text-gray-400 mt-2">{item.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              { icon: "А", title: "Русский язык", bg: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/30" },
              { icon: "~", title: "Математика", bg: "from-green-500/20 to-green-500/5 border-green-500/30" },
              { icon: "//\\", title: "Информатика", bg: "from-blue-500/20 to-blue-500/5 border-blue-500/30" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`p-8 rounded-2xl bg-gradient-to-br ${item.bg} border backdrop-blur-sm`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-5xl font-black">{item.icon}</div>
                <h3 className="mt-4 text-2xl font-bold">{item.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Наши занятия */}
      <section className="py-24 bg-[#0F1523]">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2 
              className="text-5xl font-black mb-12"
              initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              На наших занятиях ученик:
            </motion.h2>
            <div className="space-y-6 text-2xl text-gray-300">
              {[
                "Подготовится к экзаменам",
                "Попробует на практике пройти экзамен",
                "Будет не только учиться, но и развиваться",
              ].map((text, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <span className="w-3 h-3 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50" />
                  {text}
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Image 
              src="/images/students.avif" 
              alt="Современный класс" 
              width={800} 
              height={600} 
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Цены */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-5xl font-black text-center mb-16"
            initial="hidden" whileInView="visible" viewport={{ once: true }}
          >
            Сейчас можно купить со скидкой!
          </motion.h2>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-0">
            <motion.div
              className="bg-white/5 p-12 text-center rounded-l-3xl border-r-0 border border-white/10"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
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
            >
              <p className="text-4xl text-gray-400 line-through">6 800 р.</p>
              <p className="text-6xl font-black text-green-400 my-4">5 800 р.</p>
              {/* Кнопка ведет к контактам внизу страницы */}
              <a href="#contacts" className="btn-green">
                Купить со скидкой
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contacts" className="py-24 text-center">
        <motion.h2 
          className="text-6xl font-black leading-tight"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          Откройте для своего ребенка мир самых{" "}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
            перспективных профессий!
          </span>
        </motion.h2>
        <motion.div 
          className="mt-12 flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="flex items-center gap-2 text-xl"><MapPin className="text-yellow-400" /> г. Энгельс, ул. Тельмана 14а</p>
          <p className="text-gray-400">Детский центр "Учи.ру"</p>
          <p className="text-3xl font-bold flex items-center gap-2"><Phone className="text-green-400" /> +7 (927)-161-98-04</p>
          <a href="tel:+79271619804" className="btn-cta">
            Записаться на бесплатное занятие
          </a>
        </motion.div>
      </section>
    </main>
  );
}
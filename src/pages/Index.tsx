import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Главная", href: "#hero" },
  { label: "Услуга", href: "#service" },
  { label: "Преимущества", href: "#benefits" },
  { label: "Контакты", href: "#contacts" },
];

const BENEFITS = [
  {
    icon: "Zap",
    title: "Молниеносная скорость",
    desc: "Результат уже через 24 часа. Без бюрократии и затяжных согласований.",
    color: "#FFD60A",
  },
  {
    icon: "ShieldCheck",
    title: "Гарантия качества",
    desc: "Каждый проект проходит контроль на всех этапах. Ваш результат — наша репутация.",
    color: "#00F5FF",
  },
  {
    icon: "TrendingUp",
    title: "Измеримый рост",
    desc: "Отслеживаем метрики и корректируем стратегию под ваши бизнес-цели.",
    color: "#FF006E",
  },
  {
    icon: "Users",
    title: "Команда экспертов",
    desc: "Профессионалы с опытом 7+ лет в ведущих компаниях рынка.",
    color: "#39FF14",
  },
  {
    icon: "Headphones",
    title: "Поддержка 24/7",
    desc: "Всегда на связи. Отвечаем в течение 15 минут в любое время суток.",
    color: "#A855F7",
  },
  {
    icon: "Star",
    title: "Индивидуальный подход",
    desc: "Каждое решение создаётся под уникальные задачи вашего бизнеса.",
    color: "#FF8C00",
  },
];

function useIntersection(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useIntersection();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background font-body overflow-x-hidden">

      {/* NAV */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "glass py-3" : "py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <button
            onClick={() => scrollTo("#hero")}
            className="font-display text-xl font-bold text-gradient-cyan tracking-wider"
          >
            БРЕНД
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-sm font-medium text-white/70 hover:text-[#00F5FF] transition-colors duration-200"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contacts")}
              className="px-5 py-2 rounded-full text-sm font-semibold bg-[#00F5FF] text-[#0a0f1a] hover:bg-white transition-all hover:scale-105 glow-cyan"
            >
              Связаться
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden glass mt-2 mx-4 rounded-2xl p-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-left py-2 text-white/80 hover:text-[#00F5FF] transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-[#00F5FF]/10 blur-[100px] animate-float" />
          <div
            className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#FF006E]/10 blur-[120px] animate-float"
            style={{ animationDelay: "2s" }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#0080FF]/5 blur-[150px]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#00F5FF 1px, transparent 1px), linear-gradient(90deg, #00F5FF 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute top-20 right-20 w-32 h-32 rounded-full border border-[#00F5FF]/20 animate-spin-slow" />
          <div
            className="absolute top-20 right-20 w-20 h-20 rounded-full border border-[#FF006E]/20 animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "12s" }}
          />
          <div className="absolute bottom-20 left-20 w-24 h-24 rounded-full border border-[#FFD60A]/15 animate-spin-slow" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-[#00F5FF] mb-8 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse" />
            Новый уровень вашего бизнеса
          </div>

          <h1
            className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl leading-none mb-6 animate-fade-up"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="text-white">МЫ ДЕЛАЕМ</span>
            <br />
            <span className="text-gradient">РЕЗУЛЬТАТ</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Профессиональные услуги для роста вашего бизнеса.
            <br />
            Без лишних слов — только измеримые результаты.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollTo("#contacts")}
              className="group relative px-8 py-4 rounded-full font-semibold text-[#0a0f1a] bg-[#00F5FF] hover:bg-white transition-all duration-300 hover:scale-105 glow-cyan"
            >
              Получить консультацию
            </button>
            <button
              onClick={() => scrollTo("#service")}
              className="px-8 py-4 rounded-full font-semibold text-white border border-white/20 hover:border-[#00F5FF]/50 hover:bg-white/5 transition-all duration-300"
            >
              Узнать об услуге
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-20">
            {[
              { num: "500+", label: "клиентов" },
              { num: "98%", label: "довольны" },
              { num: "7 лет", label: "на рынке" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4">
                <div className="font-display text-2xl sm:text-3xl font-bold text-gradient-cyan">
                  {s.num}
                </div>
                <div className="text-xs sm:text-sm text-white/50 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-xs text-white/30 tracking-widest">SCROLL</span>
          <Icon name="ChevronDown" size={20} className="text-[#00F5FF]/50" />
        </div>
      </section>

      {/* SERVICE */}
      <section id="service" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FF006E]/8 blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#FF006E] rounded-full" />
              <span className="text-[#FF006E] text-sm font-semibold uppercase tracking-widest">
                Что мы делаем
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              НАША <span className="text-gradient">УСЛУГА</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl">
              Полный цикл работ под ключ — от идеи до результата.
            </p>
          </AnimatedSection>

          <div className="mt-12 grid md:grid-cols-2 gap-8 items-center">
            <AnimatedSection>
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Анализ и стратегия",
                    desc: "Глубоко изучаем ваш бизнес и рынок, формируем чёткий план действий.",
                  },
                  {
                    step: "02",
                    title: "Разработка и создание",
                    desc: "Команда экспертов реализует проект в срок и в рамках бюджета.",
                  },
                  {
                    step: "03",
                    title: "Запуск и поддержка",
                    desc: "Сопровождаем на всех этапах и гарантируем стабильный результат.",
                  },
                ].map((item, i) => (
                  <div
                    key={item.step}
                    className="glass glass-hover rounded-2xl p-6 cursor-default"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-display text-3xl font-bold text-[#00F5FF]/30">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="font-semibold text-white text-lg mb-1">
                          {item.title}
                        </h3>
                        <p className="text-white/50 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection className="flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00F5FF]/20 to-[#FF006E]/20 blur-xl animate-gradient-shift" style={{ backgroundSize: "200% 200%" }} />
                <div className="relative glass rounded-3xl w-full h-full flex flex-col items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00F5FF]/5 to-[#FF006E]/5" />
                  <div className="relative z-10 text-center p-8">
                    <div className="text-6xl mb-4 animate-float">🚀</div>
                    <div className="font-display text-2xl font-bold text-white mb-2">
                      ПОД КЛЮЧ
                    </div>
                    <div className="text-white/50 text-sm">
                      Полный цикл
                      <br />
                      от идеи до результата
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/20">
                      <div className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse" />
                      <span className="text-[#00F5FF] text-xs font-medium">
                        Доступно сейчас
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#00F5FF]/6 blur-[150px]" />
          <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-[#A855F7]/6 blur-[120px]" />
        </div>

        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#FFD60A] rounded-full" />
              <span className="text-[#FFD60A] text-sm font-semibold uppercase tracking-widest">
                Почему мы
              </span>
              <div className="w-8 h-1 bg-[#FFD60A] rounded-full" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              НАШИ <span className="text-gradient">ПРЕИМУЩЕСТВА</span>
            </h2>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <AnimatedSection key={b.title} className="h-full">
                <div
                  className="glass glass-hover rounded-2xl p-6 h-full cursor-default group"
                  style={{ transitionDelay: `${(i % 3) * 80}ms` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${b.color}15`,
                      border: `1px solid ${b.color}30`,
                    }}
                  >
                    <Icon name={b.icon} size={22} style={{ color: b.color }} />
                  </div>
                  <h3 className="font-semibold text-white text-base mb-2">
                    {b.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-16 px-6">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl">
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#00F5FF]/20 via-[#0080FF]/20 to-[#FF006E]/20 animate-gradient-shift"
              style={{ backgroundSize: "200% 200%" }}
            />
            <div className="absolute inset-0 glass" />
            <div className="relative z-10 p-10 sm:p-14 text-center">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
                ГОТОВЫ НАЧАТЬ?
              </h2>
              <p className="text-white/60 mb-8 max-w-lg mx-auto">
                Оставьте заявку и получите бесплатную консультацию уже сегодня.
              </p>
              <button
                onClick={() =>
                  document
                    .querySelector("#contacts")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-10 py-4 rounded-full font-bold text-[#0a0f1a] bg-[#00F5FF] hover:scale-105 transition-all duration-300 glow-cyan"
              >
                Оставить заявку →
              </button>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full bg-[#00F5FF]/6 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-1 bg-[#00F5FF] rounded-full" />
              <span className="text-[#00F5FF] text-sm font-semibold uppercase tracking-widest">
                Напишите нам
              </span>
              <div className="w-8 h-1 bg-[#00F5FF] rounded-full" />
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
              СВЯЗАТЬСЯ <span className="text-gradient-cyan">С НАМИ</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-10">
            <AnimatedSection>
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-semibold text-white text-lg mb-4">
                    Контактная информация
                  </h3>
                  {[
                    { icon: "Phone", label: "Телефон", value: "+7 (800) 000-00-00" },
                    { icon: "Mail", label: "Email", value: "hello@company.ru" },
                    { icon: "MapPin", label: "Адрес", value: "Москва, ул. Примерная, 1" },
                    { icon: "Clock", label: "Режим работы", value: "Пн–Пт, 9:00–18:00" },
                  ].map((c) => (
                    <div
                      key={c.label}
                      className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#00F5FF]/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={c.icon} size={16} className="text-[#00F5FF]" />
                      </div>
                      <div>
                        <div className="text-xs text-white/40">{c.label}</div>
                        <div className="text-white text-sm font-medium">{c.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass rounded-2xl p-6">
                  <h3 className="font-semibold text-white text-sm mb-3">
                    Мы в соцсетях
                  </h3>
                  <div className="flex gap-3">
                    {[
                      { icon: "Send", label: "Telegram" },
                      { icon: "MessageCircle", label: "WhatsApp" },
                      { icon: "Camera", label: "Instagram" },
                    ].map((s) => (
                      <button
                        key={s.label}
                        className="w-10 h-10 rounded-xl glass flex items-center justify-center text-white/60 hover:text-[#00F5FF] transition-all duration-200"
                        title={s.label}
                      >
                        <Icon name={s.icon} size={18} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              {sent ? (
                <div className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    ОТПРАВЛЕНО!
                  </h3>
                  <p className="text-white/50">
                    Мы свяжемся с вами в ближайшее время.
                  </p>
                  <button
                    className="mt-6 text-sm text-[#00F5FF] hover:underline"
                    onClick={() => setSent(false)}
                  >
                    Отправить ещё
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-4">
                  <h3 className="font-semibold text-white text-lg mb-2">
                    Оставить заявку
                  </h3>
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">
                      Ваше имя
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Иван Петров"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#00F5FF]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">
                      Телефон
                    </label>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#00F5FF]/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-1.5 uppercase tracking-wide">
                      Сообщение
                    </label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="Расскажите о вашем проекте..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-[#00F5FF]/50 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-semibold bg-[#00F5FF] text-[#0a0f1a] hover:bg-white transition-all duration-300 hover:scale-[1.02] glow-cyan"
                  >
                    Отправить заявку
                  </button>
                  <p className="text-center text-xs text-white/25">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-display text-lg font-bold text-gradient-cyan">БРЕНД</div>
          <div className="text-white/30 text-xs text-center">
            © 2026 Компания. Все права защищены.
          </div>
          <div className="flex gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => scrollTo(l.href)}
                className="text-xs text-white/30 hover:text-white/70 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

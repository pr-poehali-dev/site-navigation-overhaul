import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/a9daea41-11b0-46df-a398-ee39679bfc45/files/135b2fd6-b3d8-46f7-9b45-854411ca568e.jpg";
const CABIN_IMG = "https://cdn.poehali.dev/projects/a9daea41-11b0-46df-a398-ee39679bfc45/files/408c25e0-83d9-441d-af53-340e791a2dc0.jpg";
const BANYA_IMG = "https://cdn.poehali.dev/projects/a9daea41-11b0-46df-a398-ee39679bfc45/files/8da52026-6c41-4ae2-a045-8db97de38cce.jpg";
const FAMILY_IMG = "https://cdn.poehali.dev/projects/a9daea41-11b0-46df-a398-ee39679bfc45/files/f46ea525-9103-481b-9498-645a05313e3d.jpg";

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function FadeUp({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`fade-up ${className}`} style={style}>
      {children}
    </div>
  );
}

const API_URL = "https://functions.poehali.dev/f939cbe2-c21e-480d-929e-893b813148be";

export default function Index() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    checkin: "",
    guests: "",
    comment: "",
  });
  useScrollReveal();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("server error");
      setSent(true);
    } catch {
      setError("Не удалось отправить заявку. Позвоните нам: +7 (984) 153-17-11");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "#f7f5f0", color: "#1a1712", fontFamily: "Inter, Helvetica Neue, sans-serif" }}
    >
      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-50 border-b"
        style={{
          background: "rgba(247,245,240,0.93)",
          backdropFilter: "blur(16px)",
          borderColor: "rgba(26,23,18,0.06)",
          padding: "14px 24px",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3 text-left">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-lg flex-shrink-0"
              style={{ background: "#0a6b70" }}
            >
              🌊
            </div>
            <div>
              <div
                className="font-bold leading-tight"
                style={{ fontFamily: "Playfair Display, Georgia, serif", fontSize: "1.1rem" }}
              >
                МоёМоре
              </div>
              <div className="text-xs uppercase tracking-widest" style={{ color: "#6b6760" }}>
                База отдыха
              </div>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {[
              ["services", "Услуги"],
              ["packages", "Пакеты"],
              ["reviews", "Отзывы"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-sm font-medium px-3 py-2 rounded-lg transition-all hover:bg-black/5"
                style={{ color: "#6b6760" }}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("booking")}
            className="text-sm font-semibold px-5 py-2.5 rounded-full text-white transition-all hover:opacity-90"
            style={{ background: "#0a6b70" }}
          >
            Забронировать →
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        id="hero"
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: "100svh" }}
      >
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="База отдыха у моря"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,8,5,0.88) 0%, rgba(10,8,5,0.28) 50%, rgba(10,8,5,0.08) 100%)",
            }}
          />
        </div>

        <div
          className="relative z-10 max-w-6xl mx-auto w-full px-6 sm:px-10"
          style={{ paddingBottom: "clamp(3rem,8vw,6rem)", paddingTop: "5rem" }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
            style={{
              background: "rgba(212,133,10,0.22)",
              border: "1px solid rgba(212,133,10,0.45)",
              color: "#f5c06a",
            }}
          >
            🌊 Лето 2026 · Июнь — Сентябрь
          </div>

          <h1
            className="font-bold text-white mb-6"
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(2.8rem,6vw,6rem)",
              lineHeight: 1.05,
              maxWidth: "14ch",
            }}
          >
            Уйди от города.
            <br />
            <em style={{ color: "#f0b940", fontStyle: "normal" }}>Войди в море.</em>
          </h1>

          <p
            className="mb-10 font-light"
            style={{
              fontSize: "clamp(1.1rem,2vw,1.4rem)",
              color: "rgba(255,255,255,0.75)",
              maxWidth: "50ch",
            }}
          >
            Собственный пляж, уютные домики и настоящий отдых для всей семьи — в самом
            живописном уголке у воды.
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() => scrollTo("booking")}
              className="inline-flex items-center gap-3 font-semibold rounded-full text-white transition-all hover:opacity-90"
              style={{ background: "#0a6b70", padding: "14px 32px", fontSize: "1rem" }}
            >
              <span>Забронировать место</span>
              <Icon name="ArrowRight" size={18} />
            </button>
            <button
              onClick={() => scrollTo("packages")}
              className="font-medium rounded-full transition-all hover:bg-white/20"
              style={{
                background: "rgba(255,255,255,0.14)",
                color: "#fff",
                padding: "14px 32px",
                border: "1px solid rgba(255,255,255,0.28)",
                backdropFilter: "blur(8px)",
                fontSize: "1rem",
              }}
            >
              Смотреть пакеты
            </button>
          </div>

          <div
            className="flex items-center gap-2"
            style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.8rem" }}
          >
            <div
              className="w-2 h-2 rounded-full pulse-dot flex-shrink-0"
              style={{ background: "#4ade80" }}
            />
            <span>Осталось 6 свободных домиков на июль — август</span>
          </div>
        </div>
      </section>

      {/* ── PROMISES ── */}
      <section style={{ background: "#fdfcf9", padding: "clamp(3rem,8vw,5rem) 24px" }}>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-5">
          {[
            {
              icon: "🏖️",
              title: "Своё море",
              text: "Закрытый пляж только для наших гостей. Чистый песок, тихая вода, лежаки и зонты — без посторонних.",
            },
            {
              icon: "🏡",
              title: "Живёшь как дома",
              text: "Уютные деревянные домики с кондиционером, чистым бельём, кухней и видом на море из окна.",
            },
            {
              icon: "🎉",
              title: "Отдыхаешь как на курорте",
              text: "Баня, SUP, мангал, анимация для детей — вся инфраструктура включена в стоимость территории.",
            },
          ].map((p, i) => (
            <FadeUp key={p.title} style={{ transitionDelay: `${i * 100}ms` }}>
              <div
                className="card-hover rounded-2xl p-8 h-full"
                style={{ background: "#f7f5f0", border: "1px solid #ddd9d0" }}
              >
                <div className="text-4xl mb-4 leading-none">{p.icon}</div>
                <h3
                  className="font-bold mb-3"
                  style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontSize: "1.2rem",
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: "0.925rem", color: "#6b6760", lineHeight: 1.7 }}>
                  {p.text}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── FOR WHOM ── */}
      <section
        id="for-whom"
        style={{ background: "#f7f5f0", padding: "clamp(4rem,8vw,6rem) 24px" }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#0a6b70" }}
            >
              Для кого
            </div>
          </FadeUp>
          <FadeUp>
            <h2
              className="font-bold mb-4"
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(2rem,4vw,3rem)",
              }}
            >
              Тебе сюда, если ты...
            </h2>
          </FadeUp>
          <FadeUp>
            <p className="mb-12" style={{ fontSize: "1.05rem", color: "#6b6760", maxWidth: "52ch" }}>
              Мы не пытаемся быть для всех. Мы создаём идеальный отдых для тех, кто
              ценит настоящее море и настоящий покой.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: "👨‍👩‍👧",
                title: "Семья с детьми",
                text: "Дети заняты с утра до вечера — аниматор, батут, горки, мастер-классы. А вы просто лежите у воды и дышите.",
              },
              {
                icon: "💑",
                title: "Пара",
                text: "Закрытые беседки, чан на двоих у воды, романтический ужин под заказ, закат с бокалом вина.",
              },
              {
                icon: "👫",
                title: "Компания друзей",
                text: "Большие домики на 6–8 человек, мангальная зона, волейбол, баня, и своя вечеринка под звёздами.",
              },
              {
                icon: "🧘",
                title: "Хочешь просто выдохнуть",
                text: "Никаких гостиничных правил. Только море, воздух, тишина и ты. Именно за этим сюда возвращаются снова.",
              },
            ].map((s, i) => (
              <FadeUp key={s.title} style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                <div
                  className="card-hover rounded-2xl p-8 flex gap-5"
                  style={{ background: "#fdfcf9", border: "1px solid #ddd9d0" }}
                >
                  <div className="text-4xl leading-none flex-shrink-0">{s.icon}</div>
                  <div>
                    <h3
                      className="font-bold mb-2"
                      style={{
                        fontFamily: "Playfair Display, Georgia, serif",
                        fontSize: "1.15rem",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "#6b6760", lineHeight: 1.7 }}>
                      {s.text}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" style={{ background: "#fdfcf9", padding: "clamp(4rem,8vw,6rem) 24px" }}>
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#0a6b70" }}
            >
              Атмосфера
            </div>
          </FadeUp>
          <FadeUp>
            <h2
              className="font-bold mb-10"
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(2rem,4vw,3rem)",
              }}
            >
              Это место нужно увидеть
            </h2>
          </FadeUp>

          <FadeUp>
            <div
              className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden gap-1"
              style={{ height: "clamp(300px,45vw,520px)" }}
            >
              <div className="gallery-item col-span-2" style={{ gridRow: "span 2" }}>
                <img src={HERO_IMG} alt="Бухта базы отдыха" />
              </div>
              <div className="gallery-item">
                <img src={CABIN_IMG} alt="Уютный домик" />
              </div>
              <div className="gallery-item">
                <img src={BANYA_IMG} alt="Чан у моря" />
              </div>
              <div className="gallery-item">
                <img src={FAMILY_IMG} alt="Семья на пляже" />
              </div>
              <div
                className="gallery-item flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #d0e8e8 0%, #0a6b70 100%)",
                }}
              >
                <div className="text-center text-white p-4">
                  <div className="text-4xl mb-1">🌅</div>
                  <div
                    className="font-bold text-sm"
                    style={{ fontFamily: "Playfair Display, Georgia, serif" }}
                  >
                    Каждый вечер
                  </div>
                  <div className="text-xs opacity-80">такой закат</div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section
        id="services"
        style={{ background: "#f7f5f0", padding: "clamp(4rem,8vw,6rem) 24px" }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#0a6b70" }}
            >
              Что у нас есть
            </div>
          </FadeUp>
          <FadeUp>
            <h2
              className="font-bold mb-3"
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(2rem,4vw,3rem)",
              }}
            >
              Всё для настоящего отдыха
            </h2>
          </FadeUp>
          <FadeUp>
            <p className="mb-12" style={{ fontSize: "1.05rem", color: "#6b6760", maxWidth: "52ch" }}>
              Мы продаём не койко-место. Мы создаём готовый сценарий летнего счастья.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {[
              {
                icon: "🏄",
                title: "Водные активности",
                text: "Прокат SUP-досок, каяков, катамаранов. Снаряжение для дайвинга и рыбалки. Инструктор по запросу.",
              },
              {
                icon: "🔥",
                title: "Баня и чан",
                text: "Русская баня на берегу с купелью. Деревянный чан у воды с видом на море. Бронирование за 1 день.",
              },
              {
                icon: "🍽️",
                title: "Питание",
                text: "Домашние завтраки, шведский стол или доставка в домик. Мангальные зоны с углём и дровами в подарок.",
              },
              {
                icon: "🎈",
                title: "Детская анимация",
                text: "Аниматор каждые выходные. Батут, творческие мастер-классы, игровые зоны. Дети счастливы — родители отдыхают.",
              },
              {
                icon: "🏊",
                title: "Бассейн и пляж",
                text: "Открытый бассейн с мая по сентябрь. Собственный пляж с лежаками, зонтами и чистым песком.",
              },
              {
                icon: "⚡",
                title: "Инфраструктура",
                text: "Охрана 24/7, парковка, Wi-Fi, электричество и вода круглосуточно. Кондиционер в каждом домике.",
              },
            ].map((s, i) => (
              <FadeUp key={s.title} style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <div
                  className="card-hover rounded-2xl p-6 h-full"
                  style={{ background: "#fdfcf9", border: "1px solid #ddd9d0" }}
                >
                  <div className="text-3xl mb-4 leading-none">{s.icon}</div>
                  <h3
                    className="font-bold mb-2"
                    style={{
                      fontFamily: "Playfair Display, Georgia, serif",
                      fontSize: "1.05rem",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#6b6760", lineHeight: 1.65 }}>
                    {s.text}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section
        id="packages"
        style={{ background: "#fdfcf9", padding: "clamp(4rem,8vw,6rem) 24px" }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-3 text-center"
              style={{ color: "#0a6b70" }}
            >
              Пакеты отдыха
            </div>
          </FadeUp>
          <FadeUp>
            <h2
              className="font-bold mb-3 text-center"
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(2rem,4vw,3rem)",
              }}
            >
              Не просто ночёвка — готовый сценарий
            </h2>
          </FadeUp>
          <FadeUp>
            <p
              className="mb-12 text-center mx-auto"
              style={{ fontSize: "1.05rem", color: "#6b6760", maxWidth: "52ch" }}
            >
              Выбери свой формат. Всё уже продумано — просто приедь и наслаждайся.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-3 gap-6">
            {/* Family */}
            <FadeUp>
              <div
                className="card-hover rounded-2xl p-8 flex flex-col h-full"
                style={{ background: "#f7f5f0", border: "1px solid #ddd9d0" }}
              >
                <div className="text-3xl mb-4">🌅</div>
                <h3
                  className="font-bold mb-1"
                  style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontSize: "1.4rem",
                  }}
                >
                  Семейный отдых
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#6b6760", marginBottom: "1.5rem" }}>
                  3 ночи для семьи с детьми
                </p>
                <div style={{ fontSize: "0.875rem", color: "#6b6760", textDecoration: "line-through", marginBottom: "4px" }}>
                  18 000 ₽
                </div>
                <div
                  className="font-bold mb-6"
                  style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontSize: "1.8rem",
                    color: "#0a6b70",
                  }}
                >
                  15 900 ₽
                </div>
                <ul className="flex flex-col gap-3 flex-1 mb-8">
                  {[
                    "Проживание 3 ночи",
                    "Завтраки включены",
                    "Детская анимация",
                    "1 час бани в подарок",
                    "Пляж и бассейн",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3"
                      style={{ fontSize: "0.875rem", color: "#6b6760" }}
                    >
                      <span style={{ color: "#0a6b70", fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("booking")}
                  className="w-full rounded-full font-semibold transition-all hover:bg-[#0a6b70] hover:text-white"
                  style={{
                    padding: "14px",
                    border: "2px solid #0a6b70",
                    color: "#0a6b70",
                    background: "transparent",
                    fontSize: "0.9rem",
                  }}
                >
                  Выбрать пакет
                </button>
              </div>
            </FadeUp>

            {/* Romantic — Featured */}
            <FadeUp style={{ transitionDelay: "80ms" }}>
              <div
                className="card-hover rounded-2xl p-8 flex flex-col h-full relative"
                style={{ background: "#0a6b70", border: "1px solid #0a6b70", color: "#fff" }}
              >
                <div
                  className="absolute left-1/2 -translate-x-1/2 -top-4 px-4 py-1.5 rounded-full text-xs font-bold text-white"
                  style={{ background: "#d4850a", whiteSpace: "nowrap" }}
                >
                  🔥 Хит сезона
                </div>
                <div className="text-3xl mb-4">💑</div>
                <h3
                  className="font-bold mb-1"
                  style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontSize: "1.4rem",
                  }}
                >
                  Романтик
                </h3>
                <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", marginBottom: "1.5rem" }}>
                  2 ночи для двоих
                </p>
                <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.5)", textDecoration: "line-through", marginBottom: "4px" }}>
                  12 000 ₽
                </div>
                <div
                  className="font-bold mb-6"
                  style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontSize: "1.8rem",
                  }}
                >
                  9 900 ₽
                </div>
                <ul className="flex flex-col gap-3 flex-1 mb-8">
                  {[
                    "Домик с видом на море",
                    "Ужин при свечах",
                    "Чан у воды на 2 часа",
                    "Букет и бокал вина",
                    "Поздний выезд",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3"
                      style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.75)" }}
                    >
                      <span style={{ color: "#b9eaed", fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("booking")}
                  className="w-full rounded-full font-semibold transition-all hover:opacity-90"
                  style={{
                    padding: "14px",
                    background: "#fff",
                    color: "#0a6b70",
                    border: "2px solid #fff",
                    fontSize: "0.9rem",
                  }}
                >
                  Выбрать пакет
                </button>
              </div>
            </FadeUp>

            {/* Group */}
            <FadeUp style={{ transitionDelay: "160ms" }}>
              <div
                className="card-hover rounded-2xl p-8 flex flex-col h-full"
                style={{ background: "#f7f5f0", border: "1px solid #ddd9d0" }}
              >
                <div className="text-3xl mb-4">👥</div>
                <h3
                  className="font-bold mb-1"
                  style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontSize: "1.4rem",
                  }}
                >
                  Компания
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#6b6760", marginBottom: "1.5rem" }}>
                  Большой домик 6–8 человек
                </p>
                <div style={{ height: "22px", marginBottom: "4px" }} />
                <div
                  className="font-bold mb-6"
                  style={{
                    fontFamily: "Playfair Display, Georgia, serif",
                    fontSize: "1.8rem",
                    color: "#0a6b70",
                  }}
                >
                  от 24 000 ₽/ночь
                </div>
                <ul className="flex flex-col gap-3 flex-1 mb-8">
                  {[
                    "Домик 6–8 мест",
                    "Мангальная зона",
                    "SUP × 4 в подарок",
                    "Баня на вечер",
                    "Волейбол, настолки",
                  ].map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3"
                      style={{ fontSize: "0.875rem", color: "#6b6760" }}
                    >
                      <span style={{ color: "#0a6b70", fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollTo("booking")}
                  className="w-full rounded-full font-semibold transition-all hover:bg-[#0a6b70] hover:text-white"
                  style={{
                    padding: "14px",
                    border: "2px solid #0a6b70",
                    color: "#0a6b70",
                    background: "transparent",
                    fontSize: "0.9rem",
                  }}
                >
                  Выбрать пакет
                </button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section
        style={{
          background: "#fdfcf9",
          padding: "clamp(3rem,6vw,5rem) 24px",
          borderTop: "1px solid #ddd9d0",
          borderBottom: "1px solid #ddd9d0",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-10 text-center"
              style={{ color: "#0a6b70" }}
            >
              Нам доверяют
            </div>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "7+", label: "лет принимаем гостей каждое лето" },
              { num: "4.9★", label: "рейтинг на Яндекс.Картах из 300+ отзывов" },
              { num: "68%", label: "гостей возвращаются к нам повторно" },
              { num: "30%", label: "предоплата — остаток при заезде" },
            ].map((t, i) => (
              <FadeUp key={t.num} style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="text-center p-6">
                  <div
                    className="font-bold mb-2"
                    style={{
                      fontFamily: "Playfair Display, Georgia, serif",
                      fontSize: "clamp(2rem,3.5vw,3.2rem)",
                      color: "#0a6b70",
                    }}
                  >
                    {t.num}
                  </div>
                  <div style={{ fontSize: "0.875rem", color: "#6b6760", lineHeight: 1.5 }}>
                    {t.label}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section
        id="reviews"
        style={{ background: "#f7f5f0", padding: "clamp(4rem,8vw,6rem) 24px" }}
      >
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#0a6b70" }}
            >
              Отзывы гостей
            </div>
          </FadeUp>
          <FadeUp>
            <h2
              className="font-bold mb-12"
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(2rem,4vw,3rem)",
              }}
            >
              Они были. И вернулись снова.
            </h2>
          </FadeUp>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                initial: "А",
                name: "Анна Смирнова",
                city: "Владивосток",
                text: "«Приехали на 3 дня — продлили до 7. Дети не хотели уезжать, муж уже бронирует на август. Такой красоты и тишины мы давно не видели!»",
              },
              {
                initial: "М",
                name: "Михаил Козлов",
                city: "Хабаровск",
                text: "«Чистота, вкусная еда, душевный персонал. Ощущение, что ты дома — только с морем за окном. Отдельный респект за баню у воды.»",
              },
              {
                initial: "О",
                name: "Семья Петровых",
                city: "Уссурийск",
                text: "«Были уже второй раз и возвращаемся в сентябре. Нигде такого соотношения цены и качества не видели. Рекомендуем всем без исключения!»",
              },
            ].map((r, i) => (
              <FadeUp key={r.name} style={{ transitionDelay: `${i * 100}ms` }}>
                <div
                  className="rounded-2xl p-8 flex flex-col gap-5 h-full"
                  style={{ background: "#fdfcf9", border: "1px solid #ddd9d0" }}
                >
                  <div style={{ color: "#d4850a", letterSpacing: "2px", fontSize: "1rem" }}>
                    ★★★★★
                  </div>
                  <p
                    className="flex-1 italic"
                    style={{ fontSize: "0.9rem", color: "#6b6760", lineHeight: 1.8 }}
                  >
                    {r.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center font-bold flex-shrink-0"
                      style={{
                        fontFamily: "Playfair Display, Georgia, serif",
                        background: "#d0e8e8",
                        color: "#0a6b70",
                        fontSize: "1.1rem",
                      }}
                    >
                      {r.initial}
                    </div>
                    <div>
                      <div className="font-semibold" style={{ fontSize: "0.9rem" }}>
                        {r.name}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#6b6760" }}>{r.city}</div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOYALTY ── */}
      <section style={{ background: "#fdfcf9", padding: "clamp(4rem,8vw,6rem) 24px" }}>
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: "#0a6b70" }}
            >
              Программа лояльности
            </div>
          </FadeUp>
          <FadeUp>
            <h2
              className="font-bold mb-3"
              style={{
                fontFamily: "Playfair Display, Georgia, serif",
                fontSize: "clamp(2rem,4vw,3rem)",
              }}
            >
              Возвращайся — получай больше
            </h2>
          </FadeUp>
          <FadeUp>
            <p className="mb-12 mx-auto" style={{ fontSize: "1.05rem", color: "#6b6760" }}>
              Наши гости — это семья. И мы заботимся о тех, кто выбирает нас снова и снова.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-5 text-left">
            {[
              {
                icon: "🎁",
                title: "Скидка 10% на второй заезд",
                text: "Автоматически применяется при следующем бронировании — достаточно назвать своё имя.",
              },
              {
                icon: "👥",
                title: "Акция «Приведи друга»",
                text: "−15% вам обоим при одновременном бронировании. Чем больше компания — тем веселее!",
              },
              {
                icon: "🎂",
                title: "Подарок в день рождения",
                text: "Сюрприз в номере при заезде в день рождения. Мы помним о вас!",
              },
              {
                icon: "⭐",
                title: "Статус «Свой гость»",
                text: "Приоритетное бронирование на следующий сезон. Ваши любимые домики — за вами.",
              },
            ].map((l, i) => (
              <FadeUp key={l.title} style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                <div
                  className="rounded-2xl p-6 flex gap-4 items-start"
                  style={{ background: "#f7f5f0", border: "1px solid #ddd9d0" }}
                >
                  <div className="text-2xl flex-shrink-0 leading-tight">{l.icon}</div>
                  <div>
                    <div className="font-semibold mb-1">{l.title}</div>
                    <p style={{ fontSize: "0.875rem", color: "#6b6760", lineHeight: 1.65 }}>
                      {l.text}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING FORM ── */}
      <section
        id="booking"
        className="relative overflow-hidden"
        style={{ background: "#0a6b70", padding: "clamp(4rem,8vw,6rem) 24px" }}
      >
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div
            className="text-xs font-bold uppercase tracking-widest mb-4 text-center"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Бронирование
          </div>
          <h2
            className="font-bold text-white text-center mb-3"
            style={{
              fontFamily: "Playfair Display, Georgia, serif",
              fontSize: "clamp(2rem,4vw,3rem)",
            }}
          >
            Забронируй своё место
            <br />
            на лето прямо сейчас
          </h2>
          <p className="text-center mb-2" style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.05rem" }}>
            При бронировании сегодня —{" "}
            <strong className="text-white">бесплатный ранний заезд</strong> в подарок
          </p>
          <div
            className="flex items-center justify-center gap-2 mb-10"
            style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}
          >
            <div className="w-2 h-2 rounded-full pulse-dot flex-shrink-0" style={{ background: "#4ade80" }} />
            В июле свободно только 6 домиков — не откладывай
          </div>

          {sent ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✅</div>
              <h3
                className="font-bold text-white text-2xl mb-3"
                style={{ fontFamily: "Playfair Display, Georgia, serif" }}
              >
                Заявка отправлена!
              </h3>
              <p style={{ color: "rgba(255,255,255,0.7)" }}>
                Перезвоним в течение 15 минут и зафиксируем ваши даты.
              </p>
              <button
                className="mt-6 text-sm underline"
                style={{ color: "rgba(255,255,255,0.6)" }}
                onClick={() => setSent(false)}
              >
                Отправить ещё
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {[
                  { key: "name", label: "Ваше имя", type: "text", placeholder: "Как к вам обращаться?" },
                  { key: "phone", label: "Телефон / WhatsApp", type: "tel", placeholder: "+7 (000) 000-00-00" },
                  { key: "checkin", label: "Дата заезда", type: "date", placeholder: "" },
                  { key: "guests", label: "Количество гостей", type: "number", placeholder: "2" },
                ].map((field) => (
                  <div key={field.key}>
                    <label
                      className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      required={field.key === "name" || field.key === "phone"}
                      className="w-full rounded-xl outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.14)",
                        border: "1px solid rgba(255,255,255,0.22)",
                        padding: "14px 18px",
                        fontSize: "1rem",
                        fontFamily: "Inter, sans-serif",
                        color: "#fff",
                      }}
                    />
                  </div>
                ))}
              </div>

              {error && (
                <p className="text-center mb-3 rounded-xl px-4 py-3"
                  style={{ background: "rgba(255,80,80,0.18)", color: "#fca5a5", fontSize: "0.875rem" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full font-bold transition-all mt-2 hover:opacity-90 disabled:opacity-60"
                style={{
                  background: "#fff",
                  color: "#0a6b70",
                  padding: "18px",
                  fontSize: "1rem",
                }}
              >
                {loading ? "Отправляем..." : "📩 Отправить заявку — это бесплатно"}
              </button>
              <p
                className="text-center mt-3"
                style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}
              >
                Перезвоним в течение 15 минут и зафиксируем ваши даты ✓
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#1a1712",
          color: "#fff",
          padding: "clamp(3rem,6vw,5rem) 24px 2rem",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div
            className="grid md:grid-cols-3 gap-12 mb-12 pb-12"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div>
              <div
                className="font-bold mb-1"
                style={{
                  fontFamily: "Playfair Display, Georgia, serif",
                  fontSize: "1.4rem",
                }}
              >
                МоёМоре
              </div>
              <div
                className="text-xs uppercase tracking-widest mb-6"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                База отдыха у моря
              </div>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.75,
                  maxWidth: "38ch",
                }}
              >
                Летний отдых у моря с июня по сентябрь. Собственный пляж, уютные домики,
                баня и всё для настоящего перезагруза.
              </p>
            </div>

            <div>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Навигация
              </div>
              <ul className="flex flex-col gap-3">
                {[
                  ["for-whom", "Для кого"],
                  ["services", "Услуги"],
                  ["packages", "Пакеты"],
                  ["reviews", "Отзывы"],
                  ["booking", "Забронировать"],
                ].map(([id, label]) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      className="transition-colors hover:text-white"
                      style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div
                className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Контакты
              </div>
              <div className="flex flex-col gap-3">
                {[
                  "📍 Приморский край, залив Владимира",
                  "📞 +7 (984) 153-17-11",
                  "💬 WhatsApp / Telegram: 89841531711",
                  "🕐 Администратор: 8:00–22:00",
                ].map((c) => (
                  <div key={c} style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>
                    {c}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
              © 2026 МоёМоре. Все права защищены.
            </span>
            <div className="flex gap-3">
              {["📸", "💙", "✈️"].map((emoji, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all text-sm hover:bg-white/20"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
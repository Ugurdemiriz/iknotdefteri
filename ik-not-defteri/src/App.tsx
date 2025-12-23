import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-bgc text-textc transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-5 pt-6 pb-10 flex flex-col gap-6">
        {/* NAV */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo bubble */}
            <div className="w-9 h-9 rounded-full shadow-soft bg-brand flex items-center justify-center">
              <span className="w-6 h-8 bg-brand-soft rounded-[6px] border border-ink/40" />
            </div>
            <span className="font-semibold text-sm sm:text-base">
              İK Not Defteri
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <a className="px-2 py-1 rounded-pill text-textc-soft hover:bg-border-soft/60 transition">
              Özellikler
            </a>
            <a className="px-2 py-1 rounded-pill text-textc-soft hover:bg-border-soft/60 transition">
              Fiyatlandırma
            </a>
            <button
              onClick={() => setDark((d) => !d)}
              className="border border-border-soft px-3 py-1 rounded-pill text-textc-soft text-xs hover:bg-surface-soft/70 transition flex items-center gap-1"
            >
              {dark ? "☀ Light" : "🌙 Dark"}
            </button>
          </div>
        </header>

        {/* HERO */}
        <main className="grid grid-cols-1 md:grid-cols-[1.2fr,1fr] gap-8 mt-2 items-center">
          {/* Left */}
          <section>
            <div className="inline-flex items-center gap-2 rounded-pill bg-brand-soft/70 text-[10px] sm:text-[11px] font-medium tracking-[0.18em] uppercase text-brand-strong px-3 py-1">
              <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(227,180,28,0.35)]" />
              İnsan Kaynakları için akıllı randevu planlama
            </div>

            <h1 className="mt-4 text-3xl sm:text-[2.4rem] font-bold leading-tight tracking-tight">
              Tüm görüşmelerini{" "}
              <span className="bg-gradient-to-r from-brand to-accent bg-clip-text text-transparent">
                İk Not Defteri
              </span>{" "}
              netliğinde planla.
            </h1>

            <p className="mt-3 text-sm sm:text-base text-textc-soft max-w-xl">
              Aday, yönetici ve İK ekipleri arasındaki takvim trafiğini tek bir
              ekranda yönetin. E-posta trafiğini azaltın, çakışmaları
              engelleyin, profesyonel bir deneyim sunun.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-pill bg-gradient-to-r from-brand to-accent text-white text-xs sm:text-sm px-4 py-2 shadow-soft hover:brightness-105 hover:-translate-y-0.5 transition transform">
                <span className="text-[10px]">●</span>
                Randevu almayı dene
              </button>
              <button className="inline-flex items-center gap-2 rounded-pill border border-border-soft bg-surface-soft/70 text-textc-soft text-xs sm:text-sm px-3 py-2 hover:bg-surface-soft transition">
                ▶ Demo izle (2 dk)
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-textc-soft">
              <div className="inline-flex items-center gap-2 rounded-pill bg-accent-soft/40 text-[11px] px-2 py-1 text-ink-soft">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                İK Not Defteri · Beta erişim
              </div>
              <span>Toplantılar: 2 tıkla, otomatik davet, takvime ekleme.</span>
            </div>
          </section>

          {/* Right – scheduler card */}
          <section className="flex justify-center">
            <div className="w-full max-w-xs sm:max-w-sm rounded-[var(--radius-lg)] bg-surface shadow-soft border border-border-soft/80 p-4 sm:p-5 relative overflow-hidden">
              {/* üst parlama efekti */}
              <div className="pointer-events-none absolute inset-x-0 -top-10 h-16 bg-gradient-to-b from-brand-soft/60 to-transparent opacity-60" />

              <div className="flex items-center justify-between relative z-10">
                <div>
                  <div className="text-xs font-semibold text-textc">
                    İK Görüşmesi – 30 dk
                  </div>
                  <div className="text-[11px] text-textc-soft">
                    Online · Google Meet
                  </div>
                </div>
                <div className="w-8 h-8 rounded-pill bg-ink flex items-center justify-center shadow-soft text-[11px] text-accent-soft font-semibold border border-border/60">
                  İK
                </div>
              </div>

              <div className="mt-3 grid grid-cols-[1.2fr,1fr] gap-3 text-[11px] relative z-10">
                {/* mini takvim */}
                <div className="rounded-[var(--radius-md)] border border-border-soft bg-surface-soft/80 p-2 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-textc-soft">
                    <span>Kasım 2025</span>
                    <div className="flex gap-1">
                      <button className="w-5 h-5 rounded-pill border border-border-soft bg-surface text-[11px]">
                        ‹
                      </button>
                      <button className="w-5 h-5 rounded-pill border border-border-soft bg-surface text-[11px]">
                        ›
                      </button>
                    </div>
                  </div>
                  <div className="mt-1 grid grid-cols-7 gap-1">
                    {["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"].map((d) => (
                      <div
                        key={d}
                        className="text-center text-[10px] font-medium text-textc-soft"
                      >
                        {d}
                      </div>
                    ))}
                    {/* örnek günler */}
                    <div className="text-center text-[10px] text-textc-soft/50">
                      28
                    </div>
                    <div className="text-center text-[10px] text-textc-soft/50">
                      29
                    </div>
                    <div className="text-center text-[10px] text-textc-soft/50">
                      30
                    </div>
                    <div className="text-center text-[10px]">1</div>
                    <div className="text-center text-[10px]">2</div>
                    <div className="text-center text-[10px] rounded-pill bg-gradient-to-r from-brand to-accent text-white font-semibold shadow-soft">
                      3
                    </div>
                    <div className="text-center text-[10px]">4</div>
                  </div>
                </div>

                {/* slotlar */}
                <div className="rounded-[var(--radius-md)] border border-border-soft bg-surface-soft/80 p-2 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-textc-soft">
                    <span>3 Kasım · Pazartesi</span>
                    <span className="border border-dashed border-border-soft rounded-pill px-1.5 py-0.5 text-[9px]">
                      GMT+3 · TR
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {["09:00","09:30","10:00","10:30","11:00","14:00","14:30"].map(
                      (slot) => (
                        <button
                          key={slot}
                          className={
                            "px-2 py-1 rounded-pill border text-[10px] transition " +
                            (slot === "10:00"
                              ? "border-transparent bg-gradient-to-r from-brand to-accent text-white shadow-soft"
                              : "border-border-soft bg-surface hover:border-brand hover:text-brand-strong")
                          }
                        >
                          {slot}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3 text-[10px] text-right text-textc-soft relative z-10">
                İK Not Defteri · Takvim entegrasyonu için hazır
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;

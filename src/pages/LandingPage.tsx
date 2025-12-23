// src/pages/LandingPage.tsx
import Header from "../components/Header";
import React from "react";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-bgc text-textc">
      <Header sticky />

      <Container className="py-12 space-y-10">
        {/* Hero */}
        <section className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center">
          <div className="space-y-4">
            <p className="text-[11px] tracking-[0.25em] uppercase text-textc-soft">
              İNSAN KAYNAKLARI İÇİN AKILLI RANDEVU PLANLAMA
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Tüm görüşmelerini <span className="text-brand">netliğinde</span>{" "}
              planla.
            </h1>

            <p className="text-sm sm:text-base text-textc-soft max-w-xl">
              Aday, yönetici ve İK ekipleri arasındaki takvim trafiğini tek bir
              sade ekrandan yönetin. E-posta trafiğini azaltın, çakışmaları
              engelleyin, profesyonel bir deneyim sunun.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {/* CTA → /app route'una gider */}
              <Link to="/app">
                <Button>Başla</Button>
              </Link>
            </div>
          </div>

          {/* Sağ tarafta mini takvim / kart */}
          <Card
            title="İK Görüşmesi – 30 dk"
            subtitle="Online • Google Meet"
            className="mt-2"
          >
            <p className="text-xs text-textc-soft mb-2">
              İK Not Defteri · Beta erişim · Toplantılar: 2 tıkla, otomatik
              davet, takvime ekleme.
            </p>

            <div className="border border-border-soft rounded-md text-[11px] overflow-hidden">
              <div className="bg-surface-soft px-3 py-2 flex justify-between">
                <span>Kasım 2025</span>
                <span>Haftalık görünüm</span>
              </div>
              <div className="px-3 py-2 flex gap-2 flex-wrap">
                {["09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30"].map(
                  (slot) => (
                    <button
                      key={slot}
                      className="px-2 py-1 rounded-md border border-border-soft bg-surface hover:border-brand hover:text-brand transition text-[10px]"
                    >
                      {slot}
                    </button>
                  )
                )}
              </div>
            </div>
          </Card>
        </section>
      </Container>
    </div>
  );
};

export default LandingPage;

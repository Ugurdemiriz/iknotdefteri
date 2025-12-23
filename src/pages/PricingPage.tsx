// src/pages/PricingPage.tsx
import React from "react";
import Header from "../components/Header";
import Container from "../components/Container";
import Card from "../components/Card";
import Button from "../components/Button";

const PricingPage: React.FC = () => {
  const plans = [
    {
      name: "Başlangıç",
      price: "Ücretsiz",
      period: "",
      badge: "Beta Erişim",
      popular: false,
      variant: "soft" as const,
      description: "Küçük İK ekipleri ve deneme kullanımı için ideal.",
      features: [
        "Tek ekip / organizasyon",
        "Aylık görüşme limiti: 50",
        "Google Calendar entegrasyonu",
        "Temel e-posta daveti ve hatırlatma",
      ],
    },
    {
      name: "Profesyonel",
      price: "₺990",
      period: "/ ay",
      badge: "En Popüler",
      popular: true,
      variant: "primary" as const,
      description:
        "Büyüyen İK ekipleri ve danışmanlık şirketleri için gelişmiş plan.",
      features: [
        "Sınırsız ekip üyesi",
        "Aylık görüşme limiti: 500",
        "Gelişmiş raporlama ve analiz",
        "Özel marka/logo ve e-posta şablonları",
        "Öncelikli destek",
      ],
    },
    {
      name: "Kurumsal",
      price: "Teklif",
      period: "",
      badge: "Enterprise",
      popular: false,
      variant: "outline" as const,
      description:
        "Çok lokasyonlu ve yüksek hacimli kurumsal İK organizasyonları için.",
      features: [
        "Sınırsız organizasyon ve ekip",
        "Aylık görüşme limiti: sınırsız",
        "Özel entegrasyonlar (HRIS, ATS vb.)",
        "Özel SLA ve hesap yöneticisi",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-bgc text-textc">
      <Header />

      <Container className="py-16 space-y-12">
        {/* Başlık */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold">
            Esnek ve şeffaf fiyatlandırma
          </h1>
          <p className="text-textc-soft text-base sm:text-lg">
            İK Not Defteri, ekiplerinizin büyüklüğü ve ihtiyaçlarına göre
            ölçeklenir. İstediğiniz zaman plan yükseltebilir veya
            özelleştirebilirsiniz.
          </p>
        </section>

        {/* Plan Kartları */}
        <section className="grid gap-8 md:grid-cols-3 items-stretch">
          {plans.map((plan) => {
            const cardClasses = [
              "flex flex-col h-full card-soft",
              plan.popular && "border-brand shadow-xl scale-[1.02]",
            ]
              .filter(Boolean)
              .join(" ");

            const buttonClass =
              plan.variant === "primary"
                ? "btn-primary w-full justify-center"
                : plan.variant === "soft"
                ? "btn-primary btn-primary--soft w-full justify-center"
                : "w-full justify-center border border-brand text-brand bg-white rounded-full py-2.5 text-sm font-semibold hover:bg-brand-soft transition";

            const buttonLabel =
              plan.price === "Ücretsiz"
                ? "Ücretsiz Başla"
                : plan.price === "Teklif"
                ? "Satış ile İletişime Geç"
                : "Planı Seç";

            return (
              <Card key={plan.name} className={cardClasses} title={plan.name}>
                {/* Badge */}
                {plan.badge && (
                  <div className="badge-brand-soft mb-3 inline-flex">
                    {plan.badge}
                  </div>
                )}

                {/* Fiyat */}
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="ml-1 text-sm text-textc-soft">
                      {plan.period}
                    </span>
                  )}
                </div>

                {/* Açıklama */}
                <p className="text-sm text-textc-soft mb-4">
                  {plan.description}
                </p>

                {/* Özellikler */}
                <ul className="space-y-2 text-sm text-textc-soft flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-6">
                  <Button label={buttonLabel} className={buttonClass} />
                </div>
              </Card>
            );
          })}
        </section>

        {/* Alt bilgi */}
        <section className="text-center text-xs text-textc-soft space-y-2 pt-4">
          <p>
            Tüm planlarda 14 gün boyunca{" "}
            <span className="font-semibold">ücretsiz deneme</span> mevcuttur.
          </p>
          <p>
            KVKK ve GDPR uyumlu veri saklama, güvenli bulut altyapısı ve detaylı
            erişim logları tüm paketlere dahildir.
          </p>
        </section>
      </Container>
    </div>
  );
};

export default PricingPage;

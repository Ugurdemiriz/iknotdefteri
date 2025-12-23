import React, { useMemo, useState } from "react";

type ViewMode = "day" | "week" | "month";

const START_DATE = (() => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
})();

// 31 Aralık 2048
const END_DATE = new Date(2048, 11, 31);

const HOURS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

type Slot = {
  date: Date;
  time: string;
};

function clampDate(date: Date): Date {
  if (date < START_DATE) return new Date(START_DATE);
  if (date > END_DATE) return new Date(END_DATE);
  return date;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return clampDate(d);
}

function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * 7);
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setDate(1); // ay kaymaları olmasın
  d.setMonth(d.getMonth() + months);
  return clampDate(d);
}

function getWeekStart(date: Date): Date {
  // Haftayı pazartesi başlangıç kabul edelim
  const d = new Date(date);
  const day = d.getDay(); // 0 = Pazar
  const diff = day === 0 ? -6 : 1 - day; // Pazartesiye çek

  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return clampDate(d);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDateTR(date: Date): string {
  return date.toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDayName(date: Date): string {
  return date.toLocaleDateString("tr-TR", { weekday: "short" });
}

function formatMonthHeader(date: Date): string {
  return date.toLocaleDateString("tr-TR", { month: "long", year: "numeric" });
}

const ContentPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [currentDate, setCurrentDate] = useState<Date>(START_DATE);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  // randevu API durumu
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const canGoPrev = useMemo(() => {
    return currentDate > START_DATE;
  }, [currentDate]);

  const canGoNext = useMemo(() => {
    return currentDate < END_DATE;
  }, [currentDate]);

  const handlePrev = () => {
    if (!canGoPrev) return;
    if (viewMode === "day") setCurrentDate((d) => addDays(d, -1));
    if (viewMode === "week") setCurrentDate((d) => addWeeks(d, -1));
    if (viewMode === "month") setCurrentDate((d) => addMonths(d, -1));
  };

  const handleNext = () => {
    if (!canGoNext) return;
    if (viewMode === "day") setCurrentDate((d) => addDays(d, 1));
    if (viewMode === "week") setCurrentDate((d) => addWeeks(d, 1));
    if (viewMode === "month") setCurrentDate((d) => addMonths(d, 1));
  };

  const handleToday = () => {
    setCurrentDate(START_DATE);
  };

  const handleSlotClick = (date: Date, time: string) => {
    setSelectedSlot({ date, time });
    setSubmitError(null);
    setSubmitSuccess(null);
  };

  // ✅ RANDEVU ONAY FONKSİYONU (Artık ContentPage içinde!)
  const handleConfirm = async () => {
    if (!selectedSlot) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: selectedSlot.date.toISOString(), // backend’e ISO string gönderiyoruz
          time: selectedSlot.time,
          source: "iknotdefteri-web",
        }),
      });

      if (!res.ok) {
        throw new Error("API error");
      }

      const data = await res.json();

      setSubmitSuccess(
        `Randevunuz oluşturuldu. ID: ${data.id || "-"} – ${formatDateTR(
          selectedSlot.date
        )} / ${selectedSlot.time}`
      );
    } catch (err) {
      console.error(err);
      setSubmitError(
        "Randevu kaydedilirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Günlük slot listesi
  const renderDaySlots = (date: Date) => {
    return (
      <div className="flex flex-wrap gap-3 mt-4">
        {HOURS.map((h) => {
          const isSelected =
            selectedSlot &&
            isSameDay(selectedSlot.date, date) &&
            selectedSlot.time === h;

          return (
            <button
              key={h}
              onClick={() => handleSlotClick(date, h)}
              className={[
                "px-4 py-2 rounded-full text-sm font-medium border transition",
                "hover:shadow-md",
                isSelected
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-200 hover:bg-blue-50",
              ].join(" ")}
            >
              {h}
            </button>
          );
        })}
      </div>
    );
  };

  const renderDayView = () => {
    return (
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900">
          {formatDayName(currentDate)} – {formatDateTR(currentDate)}
        </h3>
        {renderDaySlots(currentDate)}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekStart = getWeekStart(currentDate);
    const days: Date[] = [];

    for (let i = 0; i < 7; i++) {
      const d = addDays(weekStart, i);
      if (d > END_DATE) break;
      days.push(d);
    }

    return (
      <div className="mt-6 overflow-x-auto">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 min-w-[700px]">
          {days.map((d) => (
            <div
              key={d.toISOString()}
              className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm flex flex-col"
            >
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-semibold uppercase text-gray-500">
                  {formatDayName(d)}
                </span>
                <span className="text-sm text-gray-800">
                  {formatDateTR(d)}
                </span>
              </div>
              {renderDaySlots(d)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const start = getWeekStart(firstDayOfMonth);
    const calendarDays: Date[] = [];
    let d = new Date(start);

    while (d <= lastDayOfMonth || d.getDay() !== 1) {
      calendarDays.push(new Date(d));
      d = addDays(d, 1);
      if (d > END_DATE) break;
      // Güvenlik: çok ileri gitmesin
      if (calendarDays.length > 42) break; // 6 hafta
    }

    const weeks: Date[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }

    return (
      <div className="mt-6">
        <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-gray-500 mb-2">
          {["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"].map((dName) => (
            <div key={dName} className="text-center">
              {dName}
            </div>
          ))}
        </div>
        <div className="grid grid-rows-6 gap-2">
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-2">
              {week.map((day) => {
                const inCurrentMonth = day.getMonth() === month;
                const isDisabled = day < START_DATE || day > END_DATE;
                const isToday = isSameDay(day, START_DATE);
                const isSelected =
                  selectedSlot && isSameDay(selectedSlot.date, day);

                return (
                  <button
                    key={day.toISOString()}
                    disabled={isDisabled}
                    onClick={() => handleSlotClick(day, HOURS[0])} // ay görünümü: gün seçimi için ilk slot gibi düşünebiliriz
                    className={[
                      "min-h-[60px] rounded-2xl border text-xs flex flex-col items-center justify-center px-1 py-1 transition",
                      inCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400",
                      isDisabled
                        ? "opacity-40 cursor-not-allowed"
                        : "hover:shadow-md",
                      isToday && "ring-2 ring-blue-500 ring-offset-2",
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "border-gray-100 hover:bg-blue-50",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className="font-medium">
                      {day.getDate().toString().padStart(2, "0")}
                    </span>
                    <span className="mt-1 rounded-full px-2 py-0.5 text-[10px] bg-blue-50 text-blue-700">
                      Slotlar
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              İK Not Defteri – Randevu Planlayıcı
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Bugünden başlayarak 2048 yılına kadar aylık, haftalık veya günlük
              randevu slotlarını planlayın.
            </p>
          </div>

          {/* View mode toggle */}
          <div className="inline-flex rounded-full bg-slate-100 p-1">
            <button
              onClick={() => setViewMode("day")}
              className={[
                "px-4 py-1 text-xs md:text-sm rounded-full font-medium transition",
                viewMode === "day"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-white",
              ].join(" ")}
            >
              Günlük
            </button>
            <button
              onClick={() => setViewMode("week")}
              className={[
                "px-4 py-1 text-xs md:text-sm rounded-full font-medium transition",
                viewMode === "week"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-white",
              ].join(" ")}
            >
              Haftalık
            </button>
            <button
              onClick={() => setViewMode("month")}
              className={[
                "px-4 py-1 text-xs md:text-sm rounded-full font-medium transition",
                viewMode === "month"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-white",
              ].join(" ")}
            >
              Aylık
            </button>
          </div>
        </div>

        {/* Date navigation */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="inline-flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={!canGoPrev}
              className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
            >
              ← Önceki
            </button>
            <button
              onClick={handleToday}
              className="rounded-full border border-blue-600 px-4 py-1 text-sm text-blue-700 font-medium hover:bg-blue-50 transition"
            >
              Bugün
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext}
              className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
            >
              Sonraki →
            </button>
          </div>

          <div className="text-right">
            <div className="text-sm font-semibold text-slate-900">
              {viewMode === "month"
                ? formatMonthHeader(currentDate)
                : formatDateTR(currentDate)}
            </div>
            <div className="text-xs text-slate-500">
              Aralık: {formatDateTR(START_DATE)} – {formatDateTR(END_DATE)}
            </div>
          </div>
        </div>

        {/* Calendar body */}
        {viewMode === "day" && renderDayView()}
        {viewMode === "week" && renderWeekView()}
        {viewMode === "month" && renderMonthView()}

        {/* Seçilen slot özeti */}
        <div className="mt-8 border-t pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-sm text-slate-600">
            {selectedSlot ? (
              <>
                Seçilen randevu:{" "}
                <span className="font-semibold text-slate-900">
                  {formatDateTR(selectedSlot.date)} – {selectedSlot.time}
                </span>
              </>
            ) : (
              "Bir randevu slotu seçmek için takvimdeki butonlardan birine tıklayın."
            )}
          </div>
          {selectedSlot && (
            <button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm font-semibold bg-blue-600 text-white shadow-md hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "Kaydediliyor..." : "Bu randevuyu onayla"}
            </button>
          )}
        </div>

        {/* Hata / Başarı mesajları */}
        {submitError && (
          <p className="mt-3 text-sm text-red-600">{submitError}</p>
        )}
        {submitSuccess && (
          <p className="mt-3 text-sm text-green-600">{submitSuccess}</p>
        )}
      </div>
    </div>
  );
};

export default ContentPage;

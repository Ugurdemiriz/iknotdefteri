const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// -------------------------------
//  POST /api/appointments
// -------------------------------
app.post("/api/appointments", (req, res) => {
  try {
    const { date, time, name, email, source } = req.body || {};

    // Zorunlu alanlar
    if (!date || !time || !name || !email) {
      return res.status(400).json({
        error: "date, time, name ve email alanları zorunludur.",
      });
    }

    const dateObj = new Date(date);

    if (Number.isNaN(dateObj.getTime())) {
      return res.status(400).json({ error: "Geçersiz tarih." });
    }

    const maxDate = new Date(2048, 11, 31);
    if (dateObj > maxDate) {
      return res
        .status(400)
        .json({ error: "2048 sonrasına randevu alınamaz." });
    }

    // Çok basit e-posta kontrolü
    if (typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ error: "Geçerli bir e-posta giriniz." });
    }

    const dateIso = dateObj.toISOString();

    // 🔴 Double booking: aynı tarih + aynı saat
    const exists = db.findAppointmentByDateTime(dateIso, time);
    if (exists) {
      return res.status(409).json({
        error: "Bu tarih ve saatte zaten bir randevu var.",
        existing: exists,
      });
    }

    // 🔵 Yeni randevu kaydı
    const record = db.createAppointment({
      date_iso: dateIso,
      time,
      name,
      email,
      source: source || "iknotdefteri-web",
    });

    console.log("Yeni randevu:", record);

    return res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});

// -------------------------------
//  GET /api/appointments
// -------------------------------
app.get("/api/appointments", (req, res) => {
  const list = db.getAppointments();
  res.json(list);
});

// -------------------------------
//  SERVER BAŞLAT
// -------------------------------
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Appointment API http://localhost:${PORT} üzerinde çalışıyor`);
});

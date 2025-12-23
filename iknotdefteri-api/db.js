const Database = require("better-sqlite3");

const db = new Database("appointments.db");

// Tablo oluşturuluyor (name + email eklendi)
db.exec(`
  CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date_iso TEXT NOT NULL,
    time TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    source TEXT,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
`);

const insertAppointmentStmt = db.prepare(`
  INSERT INTO appointments (date_iso, time, name, email, source)
  VALUES (@date_iso, @time, @name, @email, @source)
`);

const listAppointmentsStmt = db.prepare(`
  SELECT id, date_iso, time, name, email, source, created_at
  FROM appointments
  ORDER BY date_iso ASC, time ASC
`);

const findByDateTimeStmt = db.prepare(`
  SELECT id, date_iso, time, name, email, source, created_at
  FROM appointments
  WHERE date_iso = ? AND time = ?
`);

module.exports = {
  createAppointment(data) {
    const info = insertAppointmentStmt.run(data);
    return { id: info.lastInsertRowid, ...data };
  },

  getAppointments() {
    return listAppointmentsStmt.all();
  },

  findAppointmentByDateTime(date_iso, time) {
    return findByDateTimeStmt.get(date_iso, time);
  },
};

// src/api/appointments.ts
import type { Appointment } from "../types/appointments";

export async function fetchAppointments(): Promise<Appointment[]> {
  const res = await fetch("/api/appointments");
  if (!res.ok) {
    throw new Error("Randevu listesi alınamadı");
  }
  return res.json();
}

// src/types/appointments.ts

export type Appointment = {
  id: number;
  date_iso: string;
  time: string;
  name: string;
  email: string;
  source: string | null;
  created_at: string;
};

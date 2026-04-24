"use client";

import { useState, useEffect } from "react";
import styles from "./schedule.module.css";

const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const TIME_SLOTS = [
  { time: "10:00 AM", sub: "Morning · 30 min" },
  { time: "1:00 PM",  sub: "Afternoon · 30 min" },
  { time: "3:00 PM",  sub: "Afternoon · 30 min" },
];

type DateChip = { dow: string; dom: number; label: string };

export default function Schedule() {
  const [dates, setDates] = useState<DateChip[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const today = new Date();
    const chips: DateChip[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      chips.push({
        dow: DAYS[d.getDay()],
        dom: d.getDate(),
        label: `${MONTHS[d.getMonth()]} ${d.getDate()}`,
      });
    }
    setDates(chips);
  }, []);

  function book() {
    if (!selectedDate)              { setError("Please select a date."); return; }
    if (!selectedTime)              { setError("Please select a time slot."); return; }
    if (!name.trim())               { setError("Please enter your name."); return; }
    if (!email.includes("@"))       { setError("Please enter a valid email."); return; }
    setError("");
    setConfirmed(true);
  }

  return (
    <div className={styles.page}>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div className={styles.card}>
        {!confirmed ? (
          <>
            <div className={styles.badge}>
              <span className={styles.badgeDot} /> Accepting appointments
            </div>
            <h1>Schedule Your Policy Review</h1>
            <p className={styles.subtitle}>
              30-minute call to review your coverage, identify gaps, and explore options — no obligation.
            </p>

            <div className={styles.sectionLabel}>Select a Date</div>
            <div className={styles.dateStrip}>
              {dates.map((d) => (
                <button
                  key={d.label}
                  className={`${styles.dateChip} ${selectedDate === d.label ? styles.selected : ""}`}
                  onClick={() => setSelectedDate(d.label)}
                >
                  <span className={styles.dow}>{d.dow}</span>
                  <span className={styles.dom}>{d.dom}</span>
                </button>
              ))}
            </div>

            <div className={styles.divider} />

            <div className={styles.sectionLabel}>Available Times</div>
            <div className={styles.timeSlots}>
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot.time}
                  className={`${styles.timeSlot} ${selectedTime === slot.time ? styles.selected : ""}`}
                  onClick={() => setSelectedTime(slot.time)}
                >
                  <div>
                    <div className={styles.timeText}>{slot.time}</div>
                    <div className={styles.timeSub}>{slot.sub}</div>
                  </div>
                  <div className={styles.check}>
                    <svg className={styles.checkIcon} width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            <div className={styles.fields}>
              <div className={styles.fieldGroup}>
                <label htmlFor="fname">Full Name</label>
                <input
                  id="fname"
                  type="text"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="femail">Email Address</label>
                <input
                  id="femail"
                  type="email"
                  placeholder="jane@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {error && <p className={styles.errorMsg}>{error}</p>}

            <button className={styles.cta} onClick={book}>
              Confirm Appointment →
            </button>
            <p className={styles.footerNote}>
              You&apos;ll receive a confirmation with call details shortly.
            </p>
          </>
        ) : (
          <div className={styles.confirmation}>
            <div className={styles.confirmIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>You&apos;re on the calendar.</h2>
            <p>We&apos;ll review your coverage together and make sure everything is working for you.</p>
            <div className={styles.confirmDetails}>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Who</span>
                <span>{name}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Date</span>
                <span>{selectedDate}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Time</span>
                <span>{selectedTime}</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>Type</span>
                <span>Policy Review · 30 min</span>
              </div>
            </div>
            <p className={styles.footerNote} style={{ marginTop: "20px" }}>
              Check your email for a calendar invite and call-in details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

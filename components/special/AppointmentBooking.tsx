'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  FileText,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Stethoscope,
  CalendarPlus,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { doctors } from '@/lib/data/doctors';
import { services } from '@/lib/data/services';

// ── Types ────────────────────────────────────────────────────────────────────

interface BookingData {
  service: string;
  doctorId: string;
  isEmergency: boolean;
  date: Date | null;
  time: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM',
];

const BOOKED_SLOTS = ['10:00 AM', '02:00 PM', '06:00 PM'];
const LIMITED_SLOTS = ['09:00 AM', '11:00 AM'];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// ── Sub-components ────────────────────────────────────────────────────────────

function StepIndicator({ step, total }: { step: number; total: number }) {
  const labels = ['Service & Doctor', 'Date & Time', 'Your Details'];
  const pct = ((step - 1) / (total - 1)) * 100;

  return (
    <div className="mb-8">
      {/* Step labels */}
      <div className="flex justify-between mb-3">
        {labels.map((label, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300',
                i + 1 < step
                  ? 'bg-teal-600 text-white'
                  : i + 1 === step
                  ? 'bg-teal-600 text-white ring-4 ring-teal-200'
                  : 'bg-white/20 text-white/50'
              )}
            >
              {i + 1 < step ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={cn(
                'text-xs font-medium hidden sm:block',
                i + 1 === step ? 'text-white' : 'text-white/50'
              )}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      {/* Progress bar */}
      <div className="relative h-1.5 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
      <div className="text-right mt-1">
        <span className="text-white/60 text-xs">Step {step} of {total}</span>
      </div>
    </div>
  );
}

function MiniCalendar({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (d: Date) => void;
}) {
  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  function isPast(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  }

  function isSelected(day: number) {
    if (!selected) return false;
    return (
      selected.getDate() === day &&
      selected.getMonth() === viewMonth &&
      selected.getFullYear() === viewYear
    );
  }

  function isToday(day: number) {
    return (
      today.getDate() === day &&
      today.getMonth() === viewMonth &&
      today.getFullYear() === viewYear
    );
  }

  return (
    <div className="bg-white/10 rounded-2xl p-4 border border-white/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-white font-semibold text-sm">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center text-white"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center text-white/50 text-xs font-medium py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, idx) =>
          day === null ? (
            <div key={`e-${idx}`} />
          ) : (
            <button
              key={day}
              disabled={isPast(day)}
              onClick={() => onSelect(new Date(viewYear, viewMonth, day))}
              className={cn(
                'w-8 h-8 mx-auto rounded-full text-xs font-medium transition-all duration-200 flex items-center justify-center',
                isPast(day)
                  ? 'text-white/20 cursor-not-allowed'
                  : isSelected(day)
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/40 scale-110'
                  : isToday(day)
                  ? 'ring-2 ring-teal-400 text-teal-300 hover:bg-teal-500/30'
                  : 'text-white hover:bg-white/20'
              )}
            >
              {day}
            </button>
          )
        )}
      </div>
    </div>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────

function Step1({
  data,
  onChange,
}: {
  data: BookingData;
  onChange: (patch: Partial<BookingData>) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Emergency toggle */}
      <div
        className={cn(
          'flex items-center justify-between p-4 rounded-2xl border transition-all duration-300',
          data.isEmergency
            ? 'bg-red-500/20 border-red-400/50'
            : 'bg-white/10 border-white/20'
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center',
              data.isEmergency ? 'bg-red-500' : 'bg-white/20'
            )}
          >
            <Zap className={cn('w-5 h-5', data.isEmergency ? 'text-white' : 'text-white/60')} />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Emergency Appointment</p>
            <p className={cn('text-xs', data.isEmergency ? 'text-red-200' : 'text-white/50')}>
              {data.isEmergency ? '🚨 Priority slot — we\'ll call within 15 mins' : 'Toggle for urgent/emergency dental care'}
            </p>
          </div>
        </div>
        <button
          onClick={() => onChange({ isEmergency: !data.isEmergency })}
          className={cn(
            'relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0',
            data.isEmergency ? 'bg-red-500' : 'bg-white/20'
          )}
        >
          <motion.div
            animate={{ x: data.isEmergency ? 24 : 2 }}
            transition={{ type: "spring" as any, stiffness: 500, damping: 30 }}
            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
          />
        </button>
      </div>

      {/* Service select */}
      <div>
        <label className="text-white/70 text-sm font-medium mb-2 block flex items-center gap-2">
          <Stethoscope className="w-4 h-4 text-teal-400" />
          Select Service
        </label>
        <select
          value={data.service}
          onChange={e => onChange({ service: e.target.value })}
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          style={{ colorScheme: 'dark' }}
        >
          <option value="" className="bg-navy-900 text-white">Choose a service…</option>
          {services.map(s => (
            <option key={s.id} value={s.id} className="bg-navy-900 text-white">
              {s.title} — {s.price}
            </option>
          ))}
        </select>
      </div>

      {/* Doctor cards */}
      <div>
        <label className="text-white/70 text-sm font-medium mb-3 block flex items-center gap-2">
          <User className="w-4 h-4 text-teal-400" />
          Select Doctor
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {doctors.map(doc => {
            const initials = doc.name
              .replace('Dr. ', '')
              .split(' ')
              .map(n => n[0])
              .join('');
            const isSelected = data.doctorId === doc.id;
            return (
              <button
                key={doc.id}
                onClick={() => onChange({ doctorId: doc.id })}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200',
                  isSelected
                    ? 'bg-teal-500/30 border-teal-400 shadow-lg shadow-teal-500/20'
                    : 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/30'
                )}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg,#0d9488,#3b82f6)'
                      : 'rgba(255,255,255,0.2)',
                    color: 'white',
                  }}
                >
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{doc.name}</p>
                  <p className="text-white/60 text-xs truncate">{doc.specialization}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-gold-400 text-xs">★ {doc.rating}</span>
                    <span className="text-white/40 text-xs">· {doc.experience}y exp</span>
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle className="w-4 h-4 text-teal-400 ml-auto flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Step2({
  data,
  onChange,
}: {
  data: BookingData;
  onChange: (patch: Partial<BookingData>) => void;
}) {
  const today = new Date();

  function isLimited(slot: string) {
    if (!data.date) return false;
    const d = new Date(data.date);
    d.setHours(0, 0, 0, 0);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d.getTime() === t.getTime() && LIMITED_SLOTS.includes(slot);
  }

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div>
        <label className="text-white/70 text-sm font-medium mb-3 block flex items-center gap-2">
          <Calendar className="w-4 h-4 text-teal-400" />
          Select Date
        </label>
        <MiniCalendar selected={data.date} onSelect={date => onChange({ date, time: '' })} />
        {data.date && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-teal-300 text-xs mt-2 text-center"
          >
            {data.date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </motion.p>
        )}
      </div>

      {/* Time slots */}
      <div>
        <label className="text-white/70 text-sm font-medium mb-3 block flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal-400" />
          Available Time Slots
          {data.date && (
            <span className="text-xs text-white/40 ml-auto">
              {data.date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
            </span>
          )}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {TIME_SLOTS.map(slot => {
            const booked = BOOKED_SLOTS.includes(slot);
            const limited = isLimited(slot);
            const selected = data.time === slot;
            return (
              <button
                key={slot}
                disabled={booked || !data.date}
                onClick={() => onChange({ time: slot })}
                className={cn(
                  'relative py-2.5 px-3 rounded-xl text-xs font-medium text-center transition-all duration-200',
                  !data.date
                    ? 'bg-white/5 text-white/30 cursor-not-allowed'
                    : booked
                    ? 'bg-white/5 text-white/25 cursor-not-allowed line-through'
                    : selected
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/40 scale-105'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20 hover:border-white/30'
                )}
              >
                {slot}
                {limited && !booked && (
                  <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-white text-[9px] px-1 rounded-full font-bold">
                    Limited
                  </span>
                )}
                {booked && (
                  <span className="absolute -top-1.5 -right-1.5 bg-slate-600 text-white/70 text-[9px] px-1 rounded-full">
                    Booked
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {!data.date && (
          <p className="text-white/40 text-xs mt-2 text-center">← Please select a date first</p>
        )}
      </div>
    </div>
  );
}

function Step3({
  data,
  onChange,
  onSubmit,
}: {
  data: BookingData;
  onChange: (patch: Partial<BookingData>) => void;
  onSubmit: () => void;
}) {
  const fieldClass =
    'w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-teal-400 transition';

  return (
    <div className="space-y-5">
      <div>
        <label className="text-white/70 text-sm font-medium mb-2 block flex items-center gap-2">
          <User className="w-4 h-4 text-teal-400" /> Full Name
        </label>
        <input
          type="text"
          placeholder="Your full name"
          value={data.name}
          onChange={e => onChange({ name: e.target.value })}
          className={fieldClass}
        />
      </div>

      <div>
        <label className="text-white/70 text-sm font-medium mb-2 block flex items-center gap-2">
          <Phone className="w-4 h-4 text-teal-400" /> Phone (WhatsApp)
        </label>
        <input
          type="tel"
          placeholder="+91 98765 43210"
          value={data.phone}
          onChange={e => onChange({ phone: e.target.value })}
          className={fieldClass}
        />
      </div>

      <div>
        <label className="text-white/70 text-sm font-medium mb-2 block flex items-center gap-2">
          <Mail className="w-4 h-4 text-teal-400" /> Email Address
        </label>
        <input
          type="email"
          placeholder="you@example.com"
          value={data.email}
          onChange={e => onChange({ email: e.target.value })}
          className={fieldClass}
        />
      </div>

      <div>
        <label className="text-white/70 text-sm font-medium mb-2 block flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-400" /> Special Notes
          <span className="text-white/40 text-xs ml-auto">Optional</span>
        </label>
        <textarea
          placeholder="Any special concerns, allergies, or information we should know…"
          rows={3}
          value={data.notes}
          onChange={e => onChange({ notes: e.target.value })}
          className={cn(fieldClass, 'resize-none')}
        />
      </div>

      {/* Booking summary */}
      <div className="bg-white/10 rounded-xl p-4 border border-white/20 space-y-2 text-sm">
        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Booking Summary</p>
        <div className="flex justify-between">
          <span className="text-white/60">Service</span>
          <span className="text-white font-medium">
            {services.find(s => s.id === data.service)?.title ?? '—'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">Doctor</span>
          <span className="text-white font-medium">
            {doctors.find(d => d.id === data.doctorId)?.name ?? '—'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">Date & Time</span>
          <span className="text-white font-medium">
            {data.date
              ? `${data.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · ${data.time}`
              : '—'}
          </span>
        </div>
        {data.isEmergency && (
          <div className="flex items-center gap-2 pt-1">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span className="text-red-300 text-xs">Emergency priority booking</span>
          </div>
        )}
      </div>

      <button
        onClick={onSubmit}
        disabled={!data.name || !data.phone}
        className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
        style={{ background: 'linear-gradient(135deg,#0d9488,#3b82f6)' }}
      >
        Confirm Booking →
      </button>
    </div>
  );
}

function SuccessScreen({ data, onReset }: { data: BookingData; onReset: () => void }) {
  const doctor = doctors.find(d => d.id === data.doctorId);
  const service = services.find(s => s.id === data.service);

  function handleAddToCalendar() {
    if (!data.date) return;
    const [timeStr, meridiem] = data.time.split(' ');
    const [hStr, mStr] = timeStr.split(':');
    let h = parseInt(hStr);
    const m = parseInt(mStr);
    if (meridiem === 'PM' && h !== 12) h += 12;
    if (meridiem === 'AM' && h === 12) h = 0;

    const start = new Date(data.date);
    start.setHours(h, m, 0, 0);
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const fmt = (d: Date) =>
      d.toISOString().replace(/[-:]/g, '').replace('.000', '');

    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `Dental Appointment – SmileCraft`,
      dates: `${fmt(start)}/${fmt(end)}`,
      details: `Service: ${service?.title}\nDoctor: ${doctor?.name}\nClinic: SmileCraft Dental Clinic, Connaught Place, New Delhi`,
      location: 'SmileCraft Dental Clinic, Connaught Place, New Delhi - 110001',
    });
    window.open(`https://calendar.google.com/calendar/render?${params.toString()}`, '_blank');
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring" as any, stiffness: 200, damping: 20 }}
      className="text-center py-6"
    >
      {/* Animated check */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" as any, stiffness: 300 }}
        className="w-20 h-20 rounded-full bg-teal-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-teal-500/40"
      >
        <CheckCircle className="w-10 h-10 text-white" />
      </motion.div>

      <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed! 🎉</h3>
      <p className="text-white/60 mb-6 text-sm">
        We&apos;ve sent a confirmation to{' '}
        <span className="text-teal-300">{data.email || data.phone}</span>
      </p>

      {/* Details card */}
      <div className="bg-white/10 rounded-2xl p-5 border border-white/20 mb-6 text-left space-y-3">
        <Row label="Patient" value={data.name} />
        <Row label="Service" value={service?.title ?? '—'} />
        <Row label="Doctor" value={doctor?.name ?? '—'} />
        <Row
          label="Date & Time"
          value={
            data.date
              ? `${data.date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })} · ${data.time}`
              : '—'
          }
        />
        <Row label="Clinic" value="SmileCraft Dental, Connaught Place" />
        {data.isEmergency && <Row label="Priority" value="🚨 Emergency" />}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCalendar}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-teal-400 text-teal-300 font-semibold text-sm hover:bg-teal-500/20 transition"
        >
          <CalendarPlus className="w-4 h-4" /> Add to Calendar
        </button>
        <button
          onClick={onReset}
          className="flex-1 py-3 rounded-xl bg-white/10 text-white font-semibold text-sm hover:bg-white/20 transition border border-white/20"
        >
          Book Another
        </button>
      </div>
    </motion.div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-3">
      <span className="text-white/50 text-sm flex-shrink-0">{label}</span>
      <span className="text-white text-sm font-medium text-right">{value}</span>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function AppointmentBooking() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<BookingData>({
    service: '',
    doctorId: '',
    isEmergency: false,
    date: null,
    time: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  function onChange(patch: Partial<BookingData>) {
    setData(prev => ({ ...prev, ...patch }));
  }

  function canProceed(): boolean {
    if (step === 1) return !!data.service && !!data.doctorId;
    if (step === 2) return !!data.date && !!data.time;
    return true;
  }

  function handleNext() {
    if (step < 3 && canProceed()) setStep(s => s + 1);
  }

  function handleBack() {
    if (step > 1) setStep(s => s - 1);
  }

  function handleSubmit() {
    setSubmitted(true);
  }

  function handleReset() {
    setData({
      service: '', doctorId: '', isEmergency: false, date: null,
      time: '', name: '', phone: '', email: '', notes: '',
    });
    setStep(1);
    setSubmitted(false);
  }

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const [direction, setDirection] = useState(1);

  function next() { setDirection(1); handleNext(); }
  function back() { setDirection(-1); handleBack(); }

  if (!mounted) return null;

  return (
    <div
      className="relative rounded-3xl overflow-hidden shadow-2xl"
      style={{ background: 'linear-gradient(135deg, #0f172a 0%, #0d4f4a 60%, #0f172a 100%)' }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #0d9488, transparent 70%)', transform: 'translate(30%,-30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)', transform: 'translate(-30%,30%)' }}
      />

      <div className="relative z-10 p-6 sm:p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 font-display">
            Book Appointment
          </h2>
          <p className="text-white/60 text-sm">
            SmileCraft Dental Clinic · Connaught Place, New Delhi
          </p>
        </div>

        {!submitted && <StepIndicator step={step} total={3} />}

        {/* Step content */}
        <div className="overflow-hidden min-h-[340px]">
          {submitted ? (
            <SuccessScreen data={data} onReset={handleReset} />
          ) : (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {step === 1 && <Step1 data={data} onChange={onChange} />}
                {step === 2 && <Step2 data={data} onChange={onChange} />}
                {step === 3 && <Step3 data={data} onChange={onChange} onSubmit={handleSubmit} />}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* Navigation */}
        {!submitted && (
          <div className="flex items-center justify-between mt-8 gap-3">
            {step > 1 ? (
              <button
                onClick={back}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition border border-white/20"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 3 && (
              <button
                onClick={next}
                disabled={!canProceed()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
                style={{ background: 'linear-gradient(135deg,#0d9488,#3b82f6)' }}
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

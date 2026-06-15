"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SERVICE_SUBURBS, PRICING_TIERS } from "@/lib/constants";
import { formatZAR } from "@/lib/utils";

type FormData = {
  suburb: string;
  address: string;
  binCount: number;
  binTypes: string[];
  planId: string;
  preferredDate: string;
  preferredTime: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const INITIAL: FormData = {
  suburb: "",
  address: "",
  binCount: 1,
  binTypes: ["General Waste"],
  planId: "biweekly",
  preferredDate: "",
  preferredTime: "08:00-12:00",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

const BIN_TYPE_OPTIONS = ["General Waste", "Recycling", "Garden Waste", "Other"];
const TIME_SLOTS = ["08:00–12:00", "12:00–16:00", "16:00–18:00"];
const STEPS = ["Location", "Bins & Plan", "Date & Time", "Your Details", "Confirm"];

function BookingForm() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    ...INITIAL,
    planId: searchParams.get("plan") || "biweekly",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suburbValid, setSuburbValid] = useState<boolean | null>(null);

  useEffect(() => {
    if (form.suburb) {
      const valid = SERVICE_SUBURBS.some(
        (s) => s.toLowerCase() === form.suburb.toLowerCase()
      );
      setSuburbValid(valid);
    } else {
      setSuburbValid(null);
    }
  }, [form.suburb]);

  const update = (key: keyof FormData, value: FormData[keyof FormData]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleBinType = (type: string) => {
    setForm((f) => ({
      ...f,
      binTypes: f.binTypes.includes(type)
        ? f.binTypes.filter((t) => t !== type)
        : [...f.binTypes, type],
    }));
  };

  const selectedPlan = PRICING_TIERS.find((t) => t.id === form.planId);

  const canNext = [
    form.suburb && form.address && suburbValid,
    form.binCount > 0 && form.binTypes.length > 0 && form.planId,
    form.preferredDate && form.preferredTime,
    form.name && form.email && form.phone,
  ][step];

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: form.name,
          customer_email: form.email,
          customer_phone: form.phone,
          address: form.address,
          suburb: form.suburb,
          bin_count: form.binCount,
          bin_types: form.binTypes,
          plan_id: form.planId,
          preferred_date: form.preferredDate,
          preferred_time: form.preferredTime,
          notes: form.notes,
        }),
      });
      if (!res.ok) throw new Error("Booking failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) return <SuccessScreen form={form} plan={selectedPlan} />;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => i < step && setStep(i)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                  ${i < step ? "bg-mint-500 text-white cursor-pointer hover:bg-mint-400" :
                    i === step ? "bg-aqua-500 text-navy-950" : "bg-white/10 text-white/30"}`}
              >
                {i < step ? "✓" : i + 1}
              </button>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-px mx-1 transition-colors ${i < step ? "bg-mint-500" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-white/30 mt-1">
          {STEPS.map((s) => <span key={s}>{s}</span>)}
        </div>
      </div>

      <div className="glass-card p-6 sm:p-8">
        <h2 className="font-heading font-bold text-2xl text-white mb-6">
          {STEPS[step]}
        </h2>

        {/* Step 0: Location */}
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm text-white/60 mb-2">Suburb *</label>
              <input
                list="suburbs"
                value={form.suburb}
                onChange={(e) => update("suburb", e.target.value)}
                placeholder="Start typing your suburb..."
                className="input-field"
              />
              <datalist id="suburbs">
                {SERVICE_SUBURBS.map((s) => <option key={s} value={s} />)}
              </datalist>
              {suburbValid === false && (
                <p className="text-red-400 text-xs mt-1.5">
                  Sorry, we don&apos;t currently service this area. Contact us — we&apos;re expanding!
                </p>
              )}
              {suburbValid === true && (
                <p className="text-mint-400 text-xs mt-1.5">✓ Great news — we service your area!</p>
              )}
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Street address *</label>
              <input
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="123 Example Street"
                className="input-field"
              />
            </div>
          </div>
        )}

        {/* Step 1: Bins & Plan */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-white/60 mb-2">Number of bins</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => update("binCount", Math.max(1, form.binCount - 1))}
                  className="w-10 h-10 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
                >
                  −
                </button>
                <span className="font-heading font-bold text-3xl text-white w-8 text-center">
                  {form.binCount}
                </span>
                <button
                  onClick={() => update("binCount", form.binCount + 1)}
                  className="w-10 h-10 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Bin types</label>
              <div className="flex flex-wrap gap-2">
                {BIN_TYPE_OPTIONS.map((t) => (
                  <button
                    key={t}
                    onClick={() => toggleBinType(t)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border
                      ${form.binTypes.includes(t)
                        ? "bg-aqua-500/20 border-aqua-500/50 text-aqua-400"
                        : "border-white/10 text-white/40 hover:border-white/20"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-3">Select a plan</label>
              <div className="grid grid-cols-2 gap-3">
                {PRICING_TIERS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => update("planId", t.id)}
                    className={`p-4 rounded-xl border text-left transition-all
                      ${form.planId === t.id
                        ? "border-aqua-500/50 bg-aqua-500/10"
                        : "border-white/10 hover:border-white/20"}`}
                  >
                    <p className="font-semibold text-white text-sm">{t.name}</p>
                    <p className="text-aqua-400 text-xs">{formatZAR(t.price)}/{t.period.replace("per ", "")}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm text-white/60 mb-2">Preferred date *</label>
              <input
                type="date"
                value={form.preferredDate}
                onChange={(e) => update("preferredDate", e.target.value)}
                min={new Date(Date.now() + 48 * 3600000).toISOString().split("T")[0]}
                className="input-field"
              />
              <p className="text-white/30 text-xs mt-1">Minimum 48 hours from today</p>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Preferred time slot *</label>
              <div className="grid grid-cols-3 gap-3">
                {TIME_SLOTS.map((ts) => (
                  <button
                    key={ts}
                    onClick={() => update("preferredTime", ts)}
                    className={`p-3 rounded-xl border text-center text-sm transition-all
                      ${form.preferredTime === ts
                        ? "border-aqua-500/50 bg-aqua-500/10 text-aqua-400"
                        : "border-white/10 text-white/40 hover:border-white/20"}`}
                  >
                    {ts}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Notes (optional)</label>
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Gate code, access instructions, special requests..."
                rows={3}
                className="input-field resize-none"
              />
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-2">Full name *</label>
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Jane Smith"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Email address *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="jane@example.com"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-white/60 mb-2">Phone / WhatsApp *</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+27 XX XXX XXXX"
                className="input-field"
              />
            </div>
          </div>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="space-y-3 text-sm">
              {[
                ["Address", `${form.address}, ${form.suburb}`],
                ["Bins", `${form.binCount} × ${form.binTypes.join(", ")}`],
                ["Plan", selectedPlan ? `${selectedPlan.name} — ${formatZAR(selectedPlan.price)}/${selectedPlan.period.replace("per ", "")}` : ""],
                ["Date", form.preferredDate],
                ["Time", form.preferredTime],
                ["Name", form.name],
                ["Email", form.email],
                ["Phone", form.phone],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-2 border-b border-white/5">
                  <span className="text-white/40">{label}</span>
                  <span className="text-white font-medium text-right">{value}</span>
                </div>
              ))}
            </div>

            {error && (
              <p className="text-red-400 text-sm p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                {error}
              </p>
            )}

            <p className="text-white/30 text-xs">
              By submitting, you agree to our terms of service. We&apos;ll confirm your booking within 2 hours.
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button onClick={() => setStep((s) => s - 1)} className="btn-secondary flex-1">
              Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext}
              className="btn-primary flex-1"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary flex-1"
            >
              {loading ? "Submitting..." : "Confirm Booking"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SuccessScreen({ form, plan }: { form: FormData; plan: typeof PRICING_TIERS[0] | undefined }) {
  const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Safe+Solution+Bin+Wash&dates=${form.preferredDate.replace(/-/g, "")}/${form.preferredDate.replace(/-/g, "")}&details=Bin+wash+by+Safe+Solution&location=${encodeURIComponent(form.address)}`;

  return (
    <div className="max-w-lg mx-auto glass-card p-10 text-center">
      <div className="w-20 h-20 rounded-full bg-mint-500/20 border-2 border-mint-500/40 flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-mint-400" fill="none" viewBox="0 0 40 40" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 20l10 10 14-14" />
        </svg>
      </div>
      <h2 className="font-heading font-bold text-3xl text-white mb-2">You&apos;re booked!</h2>
      <p className="text-white/50 mb-6">
        We&apos;ll confirm your {plan?.name} wash for {form.preferredDate} via email and WhatsApp within 2 hours.
      </p>
      <div className="flex flex-col gap-3">
        <a href={calUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full">
          Add to Google Calendar
        </a>
        <a href="/" className="btn-ghost w-full">Back to Home</a>
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <div className="min-h-screen pt-28 section-padding pb-20 bg-gradient-hero">
      <div className="container-max">
        <div className="text-center mb-12">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-3">
            Book Your Wash
          </h1>
          <p className="text-white/50">Takes less than 2 minutes.</p>
        </div>
        <Suspense fallback={<div className="text-white/40 text-center">Loading...</div>}>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  );
}

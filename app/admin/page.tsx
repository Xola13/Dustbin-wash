"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type Booking = {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: string;
  suburb: string;
  bin_count: number;
  bin_types: string[];
  plan_id: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  confirmed: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

const PLAN_LABELS: Record<string, string> = {
  weekly: "Weekly",
  biweekly: "Bi-Weekly",
  monthly: "Monthly",
  oneoff: "One-Off",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/bookings");
    if (res.status === 401) { router.push("/admin/login"); return; }
    const data = await res.json();
    setBookings(data.bookings || []);
    setLoading(false);
  }, [router]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: status as Booking["status"] } : b))
    );
    setUpdatingId(null);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const filtered = bookings
    .filter((b) => filter === "all" || b.status === filter)
    .filter((b) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        b.customer_name.toLowerCase().includes(q) ||
        b.customer_email.toLowerCase().includes(q) ||
        b.customer_phone.includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.suburb.toLowerCase().includes(q)
      );
    });

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      {/* Header */}
      <header className="bg-navy-900 border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-xl text-white">BinSpa Admin</h1>
            <p className="text-white/30 text-xs">Bookings Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchBookings}
              className="px-3 py-1.5 rounded-lg text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/20 transition-all"
            >
              ↻ Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg text-sm text-white/50 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {[
            { label: "Total Bookings", value: stats.total, color: "text-white" },
            { label: "Pending", value: stats.pending, color: "text-amber-400" },
            { label: "Confirmed", value: stats.confirmed, color: "text-cyan-400" },
            { label: "Completed", value: stats.completed, color: "text-emerald-400" },
            { label: "Cancelled", value: stats.cancelled, color: "text-red-400" },
          ].map((s) => (
            <div key={s.label} className="glass-card p-4 text-center">
              <p className={`font-heading font-bold text-3xl ${s.color}`}>{s.value}</p>
              <p className="text-white/30 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, phone, address..."
            className="input-field sm:max-w-xs"
          />
          <div className="flex flex-wrap gap-2">
            {["all", "pending", "confirmed", "completed", "cancelled"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all capitalize ${
                  filter === f
                    ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-400"
                    : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
                }`}
              >
                {f === "all" ? `All (${stats.total})` : `${f} (${stats[f as keyof typeof stats] ?? 0})`}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings list */}
        {loading ? (
          <div className="text-center text-white/30 py-24">Loading bookings...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-white/30 py-24">
            {search ? "No bookings match your search." : "No bookings yet."}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((b) => (
              <div key={b.id} className="glass-card p-5">
                <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                  {/* Booking details grid */}
                  <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 text-sm">
                    <div>
                      <p className="text-white/30 text-xs mb-0.5">Customer</p>
                      <p className="text-white font-semibold">{b.customer_name}</p>
                      <a href={`tel:${b.customer_phone}`} className="text-cyan-400 text-xs hover:text-cyan-300">
                        {b.customer_phone}
                      </a>
                    </div>

                    <div>
                      <p className="text-white/30 text-xs mb-0.5">Address</p>
                      <p className="text-white">{b.address}</p>
                      <p className="text-white/40 text-xs">{b.suburb}</p>
                    </div>

                    <div>
                      <p className="text-white/30 text-xs mb-0.5">Plan</p>
                      <p className="text-white">{PLAN_LABELS[b.plan_id] || b.plan_id}</p>
                      <p className="text-white/40 text-xs">
                        {b.bin_count} bin{b.bin_count !== 1 ? "s" : ""} · {b.bin_types.join(", ")}
                      </p>
                    </div>

                    <div>
                      <p className="text-white/30 text-xs mb-0.5">Wash Date</p>
                      <p className="text-white font-medium">{b.preferred_date}</p>
                      <p className="text-white/40 text-xs">{b.preferred_time}</p>
                    </div>

                    <div>
                      <p className="text-white/30 text-xs mb-0.5">Email</p>
                      <a href={`mailto:${b.customer_email}`} className="text-cyan-400 text-xs hover:text-cyan-300">
                        {b.customer_email}
                      </a>
                    </div>

                    {b.notes && (
                      <div>
                        <p className="text-white/30 text-xs mb-0.5">Notes</p>
                        <p className="text-white/60 text-xs">{b.notes}</p>
                      </div>
                    )}
                  </div>

                  {/* Status panel */}
                  <div className="flex lg:flex-col items-center lg:items-end gap-3 lg:min-w-[140px]">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${STATUS_STYLES[b.status]}`}>
                      {b.status}
                    </span>

                    <select
                      value={b.status}
                      disabled={updatingId === b.id}
                      onChange={(e) => updateStatus(b.id, e.target.value)}
                      className="text-xs bg-navy-800 border border-white/10 text-white/60 rounded-lg px-2 py-1.5 cursor-pointer hover:border-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    >
                      <option value="pending">Set Pending</option>
                      <option value="confirmed">Confirm</option>
                      <option value="completed">Mark Completed</option>
                      <option value="cancelled">Cancel</option>
                    </select>

                    <p className="text-white/20 text-xs">
                      {new Date(b.created_at).toLocaleDateString("en-ZA", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

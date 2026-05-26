import type { Metadata } from "next";
import ServicesClient from "@/components/services/ServicesClient";
import { ArrowRight, Stethoscope } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Dental Services",
  description:
    "Explore SmileCraft Dental Clinic's complete range of dental services in New Delhi — dental implants, cosmetic dentistry, smile designing, invisible braces, root canal, and more. Premium care at transparent prices.",
  keywords: [
    "dental services Delhi",
    "dental implants",
    "teeth whitening",
    "smile designing",
    "invisible braces",
    "root canal Delhi",
    "cosmetic dentistry",
    "gum treatment Delhi",
  ],
  openGraph: {
    title: "Our Dental Services | SmileCraft Dental Clinic",
    description:
      "Full range of dental treatments — cosmetic, restorative, orthodontic, periodontic & emergency care. Connaught Place, New Delhi.",
    url: "https://smilecraftdental.com/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-24 lg:py-32"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #0d4f4a 50%, #0f172a 100%)",
        }}
      >
        {/* Background decorations */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 50%, rgba(13,148,136,0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(59,130,246,0.3) 0%, transparent 60%)",
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div
            className="absolute top-16 left-16 w-72 h-72 rounded-full opacity-10 blur-3xl"
            style={{ background: "var(--color-teal-400)" }}
          />
          <div
            className="absolute bottom-16 right-16 w-60 h-60 rounded-full opacity-10 blur-3xl"
            style={{ background: "var(--color-blue-500)" }}
          />
        </div>

        {/* Subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            style={{
              background: "rgba(13,148,136,0.2)",
              border: "1px solid rgba(13,148,136,0.35)",
              color: "#5eead4",
            }}
          >
            <Stethoscope className="w-4 h-4" />
            10+ Premium Treatments
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Our{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #5eead4, #93c5fd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Dental Services
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            From routine check-ups to complete smile makeovers — every treatment delivered with
            precision, compassion, and cutting-edge technology at our Connaught Place clinic.
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Cosmetic", "Restorative", "Orthodontics", "Emergency"].map((cat) => (
              <span
                key={cat}
                className="px-4 py-1.5 rounded-full text-sm font-medium"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 mt-10 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            <span>Home</span>
            <ArrowRight className="w-3 h-3" />
            <span style={{ color: "rgba(255,255,255,0.8)" }}>Services</span>
          </div>
        </div>
      </section>

      {/* ─── Services Listing (Client) ────────────────────────── */}
      <ServicesClient />
    </>
  );
}

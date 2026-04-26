import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For patients",
  description:
    "What to expect as a patient participating in pulmonary clinical research at APRIM.",
};

export default function PatientsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-5xl text-teal-700">For patients</h1>
      <p className="mt-6 text-teal-700/80">
        Page stub — drop in the chosen design direction here.
      </p>
    </main>
  );
}

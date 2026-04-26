import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the APRIM research team in Bloomfield Hills, Michigan.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-5xl text-teal-700">Contact</h1>
      <p className="mt-6 text-teal-700/80">
        Page stub — drop in the chosen design direction here.
      </p>
    </main>
  );
}

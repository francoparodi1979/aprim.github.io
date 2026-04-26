import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About APRIM — the Advanced Pulmonary Research Institute of Michigan, led by Dr. Franco Parodi.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="font-display text-5xl text-teal-700">About APRIM</h1>
      <p className="mt-6 text-teal-700/80">
        Page stub — drop in the chosen design direction here.
      </p>
    </main>
  );
}

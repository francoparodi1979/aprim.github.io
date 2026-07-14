import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-clay-300">404</p>
      <h1 className="font-display mt-4 text-5xl text-teal-700">
        That page is out of breath.
      </h1>
      <p className="mt-6 text-teal-700/80">
        We couldn't find what you were looking for. Try the{" "}
        <Link href="/#studies" className="underline">
          current studies
        </Link>{" "}
        or head{" "}
        <Link href="/" className="underline">
          back home
        </Link>
        .
      </p>
    </main>
  );
}

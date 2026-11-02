import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-bold">Page not found</h1>
      <p className="mt-3 text-ink-soft">The page you are looking for has moved or does not exist.</p>
      <Link href="/" className="btn btn-primary mt-6">Back to home</Link>
    </div>
  );
}

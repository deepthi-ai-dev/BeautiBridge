"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-primary text-3xl font-semibold">
          Something went wrong
        </h1>
        <button
          className="bg-primary text-primary-foreground mt-6 rounded-full px-5 py-3"
          onClick={reset}
          type="button"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

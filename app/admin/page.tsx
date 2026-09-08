"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      sessionStorage.setItem("treutis-admin-auth", "1");
      router.push("/admin/dashboard");
    } else {
      setError(true);
    }
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-[400px] flex-col justify-center px-[5vw]">
      <h1 className="font-display mb-8 text-3xl uppercase">Admin</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="Password"
          className="border border-white/20 bg-transparent px-4 py-3.5 text-sm outline-none focus:border-red"
          autoFocus
        />
        {error && (
          <div className="text-xs text-red">Wrong password. Try again.</div>
        )}
        <button
          type="submit"
          className="bg-red px-6 py-3.5 text-[13px] font-bold uppercase tracking-wider hover:bg-fg hover:text-bg"
        >
          Enter
        </button>
      </form>
    </main>
  );
}

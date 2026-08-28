"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, GraduationCap, LogOut, Mail, ShieldCheck } from "lucide-react";

const key = "gradetrack-session-expires";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const expiresAt = Number(params.get("expires_at") || localStorage.getItem(key) || 0);
    if (params.get("access_token") && expiresAt) {
      localStorage.setItem(key, String(expiresAt));
      window.history.replaceState({}, "", window.location.pathname);
    }
    setSignedIn(expiresAt > Date.now() / 1000);
  }, []);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    if (!url || !anonKey) return setMessage("Authentication is being configured. Please try again shortly.");
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`${url}/auth/v1/otp`, {
        method: "POST",
        headers: { apikey: anonKey, "Content-Type": "application/json" },
        body: JSON.stringify({ email, create_user: true, options: { emailRedirectTo: window.location.origin } }),
      });
      if (!response.ok) throw new Error("Unable to send email");
      setMessage("Check your inbox for your secure sign-in link.");
    } catch {
      setMessage("We couldn’t send a sign-in link. Please try again.");
    } finally { setLoading(false); }
  }

  if (signedIn) return <>{children}<button onClick={() => { localStorage.removeItem(key); setSignedIn(false); }} className="fixed bottom-5 right-5 rounded-xl border border-[var(--line)] bg-[var(--card)] p-3 text-[var(--muted)] shadow-sm" aria-label="Sign out"><LogOut size={17}/></button></>;

  return <main className="grid min-h-screen place-items-center bg-[var(--paper)] p-5"><section className="w-full max-w-md rounded-3xl border border-[var(--line)] bg-[var(--card)] p-8 shadow-xl shadow-indigo-950/5"><div className="mb-8 grid h-12 w-12 place-items-center rounded-2xl bg-[var(--accent)] text-white"><GraduationCap size={24}/></div><p className="text-sm font-semibold text-[var(--accent)]">GRADETRACK</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Keep your progress in view.</h1><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Sign in with your email to access your private academic dashboard.</p><form onSubmit={signIn} className="mt-7"><label className="text-sm font-semibold">Email address<input required type="email" value={email} onChange={event=>setEmail(event.target.value)} placeholder="you@example.com" className="mt-2 w-full rounded-xl border border-[var(--line)] bg-transparent px-4 py-3 outline-none focus:ring-2 focus:ring-[var(--accent)]"/></label><button disabled={loading} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-60">{loading?"Sending link…":"Email me a sign-in link"}<ArrowRight size={17}/></button></form>{message&&<p role="status" className="mt-4 rounded-xl bg-[var(--accent-soft)] p-3 text-sm text-[var(--ink)]">{message}</p>}<p className="mt-7 flex items-center gap-2 text-xs text-[var(--muted)]"><ShieldCheck size={15}/>Secure passwordless sign-in · No passwords stored</p></section></main>;
}

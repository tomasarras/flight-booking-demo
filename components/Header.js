import Link from "next/link";
import { PlaneTakeoff } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-white">
            <PlaneTakeoff size={18} />
          </span>
          <span className="text-lg tracking-tight">
            Aero<span className="text-sky-600">Find</span>
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900">
            Buscar vuelos
          </Link>
          <Link href="/my-bookings" className="hover:text-slate-900">
            Mis reservas
          </Link>
        </nav>
      </div>
    </header>
  );
}

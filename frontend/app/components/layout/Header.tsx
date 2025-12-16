"use client";

import Link from "next/link";
import { useIsAuth, useAuthStore } from "@/store/auth.store";
import { useCartCount } from "@/store/cart.store";

export default function Header() {
  const isAuth = useIsAuth();
  const logout = useAuthStore((s) => s.logout);

  const guestActions = (
    <>
      <Link
        href="/login"
        className="px-3 py-1.5 text-xs sm:text-sm rounded border border-slate-900"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="px-3 py-1.5 text-xs sm:text-sm rounded bg-slate-900 text-white"
      >
        Register
      </Link>
    </>
  );

  const userActions = (
    <>
      <Link
        href="/my-products"
        className="px-3 py-1.5 text-xs sm:text-sm rounded border"
      >
        My products
      </Link>
      <Link
        href="/my-orders"
        className="px-3 py-1.5 text-xs sm:text-sm rounded border"
      >
        My orders
      </Link>
      <Link
        href="/account"
        className="px-3 py-1.5 text-xs sm:text-sm rounded border"
      >
        Account
      </Link>
      <button
        onClick={logout}
        className="px-3 py-1.5 text-xs sm:text-sm rounded border border-slate-900"
      >
        Logout
      </button>
    </>
  );

  const cartCount = useCartCount();

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
            FS
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="px-3 py-1.5 text-xs sm:text-sm rounded border"
          >
            Cart {cartCount > 0 ? `(${cartCount})` : ""}
          </Link>

          {!isAuth ? guestActions : userActions}
        </div>
      </div>
    </header>
  );
}

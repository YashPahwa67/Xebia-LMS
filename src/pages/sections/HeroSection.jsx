// Login hero — clear neon photo (no scrim) with the login card on the right.
import LoginCard from "@/features/auth/LoginCard";
import loginBg from "@/assets/images/login-bg.webp";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-57px)] w-full items-center overflow-hidden">
      {/* Neon "XEBIA" brand photo — full-bleed, unblurred. */}
      <img
        src={loginBg}
        alt="Xebia neon signage"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative mx-auto flex w-full max-w-7xl justify-center px-6 py-16 lg:justify-end">
        <LoginCard />
      </div>
    </section>
  );
}

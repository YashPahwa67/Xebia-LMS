// Full-width image banner with dark overlay + centred title (FAQ + Contact headers).
import hero from "@/assets/images/login-bg.webp";

export default function SectionBanner({ title, subtitle }) {
  return (
    <div className="relative overflow-hidden">
      <img src={hero} alt="" className="h-40 w-full object-cover object-center opacity-90" />
      <div className="absolute inset-0 bg-velvet-dark/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
        <h2 className="text-2xl font-bold sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-white/80">{subtitle}</p>}
      </div>
    </div>
  );
}

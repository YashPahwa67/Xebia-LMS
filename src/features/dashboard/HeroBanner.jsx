// "Ready to level up?" gradient banner with CTA.
import Button from "@/components/ui/Button";

export default function HeroBanner({ name = "Khushpreet" }) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-velvet-dark to-velvet p-8 text-white shadow-card">
      <h2 className="text-2xl font-bold">Ready to level up, {name}?</h2>
      <p className="mt-2 max-w-2xl leading-relaxed text-white/85">
        You&apos;re making great progress this week. Your learning pace is at 88% of your weekly
        target. Complete your upcoming AWS Architect module to stay on track!
      </p>
      <Button className="mt-5 !bg-velvet-bright !px-6 !py-3 hover:!brightness-110">
        Explore Learning Path
      </Button>
    </div>
  );
}

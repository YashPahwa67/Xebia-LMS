// Bottom CTA panel.
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function CtaSection() {
  const navigate = useNavigate();
  return (
    <section className="bg-canvas py-20 dark:bg-night-bg">
      <div className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl bg-velvet-soft px-6 py-16 text-center dark:bg-night-surface">
          <h2 className="text-3xl font-bold text-ink dark:text-white">
            Ready to Transform Your Learning Culture?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted dark:text-white/60">
            Join over 1.2 million professionals growing their careers on the world&apos;s most
            sophisticated learning ecosystem.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button className="!bg-cta-orange !px-7 !py-3.5 hover:!brightness-95" onClick={() => navigate("/login")}>
              Get Started Now
            </Button>
            <Button variant="dark" className="!px-7 !py-3.5" onClick={() => navigate("/contact")}>
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Dark velvet section: CTO testimonial + Measurable ROI card.
import { TESTIMONIAL, ROI } from "@/constants/home";

export default function TestimonialSection() {
  return (
    <section className="bg-gradient-to-br from-velvet-dark to-velvet py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
            CTO Perspective
          </p>
          <blockquote className="mt-5 text-2xl font-medium leading-relaxed">
            &ldquo;{TESTIMONIAL.quote}&rdquo;
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-white/20 font-bold">
              SJ
            </div>
            <div>
              <p className="font-bold">{TESTIMONIAL.name}</p>
              <p className="text-sm text-white/60">{TESTIMONIAL.role}</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm">
          <div className="mb-4 h-1 w-12 rounded bg-cta-orange" />
          <h3 className="text-xl font-bold">{ROI.title}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">{ROI.body}</p>
        </div>
      </div>
    </section>
  );
}

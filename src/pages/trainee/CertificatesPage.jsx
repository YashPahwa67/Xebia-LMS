// Certificates — credentials the learner has earned.
import { FiAward, FiDownload } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import { MY_CERTIFICATES } from "@/data/traineeData";

export default function CertificatesPage() {
  return (
    <div>
      <PageHeader title="Certificates" subtitle="Credentials you have earned across completed courses" />

      {MY_CERTIFICATES.length === 0 ? (
        <div className="rounded-2xl border border-line bg-white p-10 text-center text-muted shadow-card dark:border-night-line dark:bg-night-surface dark:text-white/50">
          No certificates yet — complete a course to earn one.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MY_CERTIFICATES.map((c) => (
            <div key={c.credentialId} className="rounded-2xl border border-line bg-white p-5 shadow-card dark:border-night-line dark:bg-night-surface">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-velvet-soft text-velvet dark:bg-velvet/20 dark:text-velvet-bright">
                  <FiAward className="text-lg" />
                </span>
                <button aria-label="Download certificate" className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted hover:bg-canvas dark:border-night-line dark:text-white/60 dark:hover:bg-white/10">
                  <FiDownload />
                </button>
              </div>
              <p className="mt-4 font-bold text-ink dark:text-white">{c.name}</p>
              <p className="mt-1 text-xs text-muted dark:text-white/50">Issued {c.issued}</p>
              <p className="mt-3 text-xs font-medium text-muted dark:text-white/60">ID: {c.credentialId}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

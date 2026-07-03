// Timed test attempt — countdown with auto-lock on timeout, submit → scored result.
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiClock, FiArrowLeft } from "react-icons/fi";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { MY_TESTS } from "@/data/traineeData";

function fmt(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function TestAttemptPage() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const test = MY_TESTS[testId];

  const [answers, setAnswers] = useState({});
  const [left, setLeft] = useState(test ? test.durationMin * 60 : 0);
  const [result, setResult] = useState(null); // { score, total, locked }
  const submittedRef = useRef(false);

  const submit = (locked = false) => {
    if (submittedRef.current || !test) return;
    submittedRef.current = true;
    const correct = test.questions.reduce((n, q) => (answers[q.id] === q.answer ? n + 1 : n), 0);
    setResult({ score: correct, total: test.questions.length, locked });
    toast[locked ? "error" : "success"](locked ? "Time up — attempt auto-locked" : "Attempt submitted");
  };

  useEffect(() => {
    if (!test || result) return;
    if (left <= 0) { submit(true); return; }
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [left, test, result]);

  if (!test) {
    return (
      <div>
        <PageHeader title="Test not found" subtitle="This test isn't assigned to you." />
        <Button variant="outline" onClick={() => navigate("/trainee/assignments")}><FiArrowLeft /> Back to Assignments</Button>
      </div>
    );
  }

  if (result) {
    const pct = Math.round((result.score / result.total) * 100);
    return (
      <div>
        <PageHeader title="Result" subtitle={`${test.title} · ${test.course}`} />
        <div className="mx-auto max-w-md rounded-2xl border border-line bg-white p-8 text-center shadow-card dark:border-night-line dark:bg-night-surface">
          <p className="text-xs uppercase tracking-wide text-muted dark:text-white/50">{result.locked ? "Auto-locked on timeout" : "Submitted"}</p>
          <p className="mt-3 text-5xl font-bold text-velvet dark:text-velvet-bright">{pct}%</p>
          <p className="mt-2 text-sm text-muted dark:text-white/60">{result.score} of {result.total} correct</p>
          <div className="mt-4"><Badge tone={pct >= 60 ? "success" : "danger"}>{pct >= 60 ? "Passed" : "Needs review"}</Badge></div>
          <div className="mt-6 flex justify-center gap-3">
            <Button variant="outline" onClick={() => navigate("/trainee/assignments")}>Assignments</Button>
            <Button onClick={() => navigate("/trainee/results")}>View results</Button>
          </div>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;

  return (
    <div>
      <PageHeader
        title={test.title}
        subtitle={`${test.course} · ${test.questions.length} questions`}
        action={
          <span className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${left <= 30 ? "bg-red-500/10 text-red-500" : "bg-velvet-soft text-velvet dark:bg-velvet/20 dark:text-velvet-bright"}`}>
            <FiClock /> {fmt(left)}
          </span>
        }
      />

      <div className="flex flex-col gap-4">
        {test.questions.map((q, qi) => (
          <div key={q.id} className="rounded-2xl border border-line bg-white p-5 shadow-card dark:border-night-line dark:bg-night-surface">
            <p className="font-semibold text-ink dark:text-white">{qi + 1}. {q.prompt}</p>
            <div className="mt-3 flex flex-col gap-2">
              {q.options.map((opt, oi) => (
                <label key={oi} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 text-sm transition-colors ${
                  answers[q.id] === oi ? "border-velvet bg-velvet-soft text-velvet dark:bg-velvet/20 dark:text-velvet-bright" : "border-line text-ink hover:bg-canvas dark:border-night-line dark:text-white/90 dark:hover:bg-white/5"
                }`}>
                  <input type="radio" name={q.id} checked={answers[q.id] === oi} onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))} className="h-4 w-4 accent-velvet" />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-muted dark:text-white/60">{answeredCount} of {test.questions.length} answered</span>
        <Button onClick={() => submit(false)}>Submit attempt</Button>
      </div>
    </div>
  );
}

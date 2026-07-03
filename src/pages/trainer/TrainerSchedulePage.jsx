// Schedule — the trainer's confirmed sessions (read-only from Scheduling).
import PageHeader from "@/components/common/PageHeader";
import DataTable from "@/components/ui/DataTable";
import Badge from "@/components/ui/Badge";
import { TRAINER_SCHEDULE } from "@/data/trainerData";

const TONE = { ONLINE: "neutral", CLASSROOM: "success" };

export default function TrainerSchedulePage() {
  const columns = [
    { key: "day", header: "Day" },
    { key: "time", header: "Time" },
    { key: "title", header: "Session", render: (r) => <div><p className="font-medium">{r.title}</p><p className="text-xs text-muted">{r.batch}</p></div> },
    { key: "mode", header: "Mode", render: (r) => <Badge tone={TONE[r.mode] || "muted"}>{r.mode}</Badge> },
  ];

  return (
    <div>
      <PageHeader title="Schedule" subtitle="Your confirmed sessions this week" />
      <DataTable columns={columns} rows={TRAINER_SCHEDULE} rowKey="title" paginated pageSize={8} />
    </div>
  );
}

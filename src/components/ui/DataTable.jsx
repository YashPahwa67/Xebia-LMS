// Reusable data table. Columns: [{ key, header, render?, align? }]. Rows: array of objects.
// Opt-in pagination via `paginated` + `pageSize` renders a "Showing x–y of N" footer.
import { useEffect, useState } from "react";

export default function DataTable({ columns, rows, rowKey, empty = "No records found.", paginated = false, pageSize = 10 }) {
  const [page, setPage] = useState(0);
  const total = rows.length;
  const pageCount = paginated ? Math.max(1, Math.ceil(total / pageSize)) : 1;

  // Keep the current page valid when the row set shrinks (e.g. filtering).
  useEffect(() => {
    if (page > pageCount - 1) setPage(pageCount - 1);
  }, [page, pageCount]);

  const view = paginated ? rows.slice(page * pageSize, page * pageSize + pageSize) : rows;
  const from = total === 0 ? 0 : page * pageSize + 1;
  const to = paginated ? Math.min(total, page * pageSize + pageSize) : total;

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card dark:border-night-line dark:bg-night-surface">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-muted dark:border-night-line dark:text-white/50">
              {columns.map((c) => (
                <th key={c.key} className={`px-5 py-3.5 font-semibold ${c.align === "right" ? "text-right" : ""}`}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {view.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-10 text-center text-muted dark:text-white/50">
                  {empty}
                </td>
              </tr>
            ) : (
              view.map((row, i) => (
                <tr
                  key={rowKey ? row[rowKey] : i}
                  className="border-b border-line/70 last:border-0 transition-colors hover:bg-canvas dark:border-night-line/60 dark:hover:bg-white/5"
                >
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className={`px-5 py-4 text-ink dark:text-white/90 ${c.align === "right" ? "text-right" : ""}`}
                    >
                      {c.render ? c.render(row) : row[c.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {paginated && (
        <div className="flex items-center justify-between border-t border-line px-5 py-3 text-xs text-muted dark:border-night-line dark:text-white/50">
          <span>Showing {from}–{to} of {total}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="rounded-md px-2 py-1 font-semibold text-ink transition-colors hover:bg-canvas disabled:cursor-not-allowed disabled:opacity-40 dark:text-white dark:hover:bg-white/10"
            >
              Prev
            </button>
            <span className="font-semibold text-ink dark:text-white">{page + 1} / {pageCount}</span>
            <button
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={page >= pageCount - 1}
              className="rounded-md px-2 py-1 font-semibold text-ink transition-colors hover:bg-canvas disabled:cursor-not-allowed disabled:opacity-40 dark:text-white dark:hover:bg-white/10"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

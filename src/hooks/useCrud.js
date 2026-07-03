// Local CRUD state for admin tables (create/edit/delete against in-memory rows).
import { useState } from "react";
import toast from "react-hot-toast";

export function useCrud(initialRows, keyField) {
  const [rows, setRows] = useState(initialRows);
  const [editing, setEditing] = useState(null); // row being edited, or {} for new, or null (closed)
  const [deleting, setDeleting] = useState(null);

  const openNew = () => setEditing({});
  const openEdit = (row) => setEditing(row);
  const closeForm = () => setEditing(null);

  const save = (values) => {
    setRows((prev) => {
      const exists = editing && editing[keyField] && prev.some((r) => r[keyField] === editing[keyField]);
      if (exists) return prev.map((r) => (r[keyField] === editing[keyField] ? { ...r, ...values } : r));
      return [...prev, values];
    });
  };

  const confirmDelete = () => {
    setRows((prev) => prev.filter((r) => r[keyField] !== deleting[keyField]));
    toast.success("Deleted");
    setDeleting(null);
  };

  const toggle = (row, field = "status", on = "ACTIVE", off = "INACTIVE") => {
    setRows((prev) => prev.map((r) => (r[keyField] === row[keyField] ? { ...r, [field]: r[field] === on ? off : on } : r)));
  };

  return { rows, editing, deleting, openNew, openEdit, closeForm, save, setDeleting, confirmDelete, toggle };
}

// Stateful accordion wrapper — one item open at a time.
import { useState } from "react";
import AccordionItem from "@/components/common/AccordionItem";

export default function Accordion({ items, idPrefix = "acc" }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null);
  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <AccordionItem
          key={`${idPrefix}-${item.id}`}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
        />
      ))}
    </div>
  );
}

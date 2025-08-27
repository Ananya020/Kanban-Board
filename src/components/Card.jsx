import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Card({ card, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-3 mb-2 bg-blue-800 rounded-lg shadow cursor-pointer flex justify-between items-center"
    >
      {/* Card text (wraps on small screens) */}
      <span className="break-words pr-2">{card.content}</span>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          className="px-2 py-1 text-xs sm:text-sm text-white hover:text-gray-200 rounded"
          onClick={(e) => {
            e.stopPropagation();
            const newContent = prompt("Edit card", card.content);
            if (newContent && newContent.trim()) {
              onEdit(card.id, newContent.trim());
            }
          }}
        >
          Edit
        </button>
        <button
          className="px-2 py-1 text-xs sm:text-sm text-red-300 hover:text-red-100 rounded"
          onClick={(e) => {
            e.stopPropagation();
            if (confirm("Are you sure you want to delete this card?")) {
              onDelete(card.id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

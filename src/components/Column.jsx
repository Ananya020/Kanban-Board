import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

import Card from "./Card";
import AddCardForm from "./AddCardForm";

export default function Column({ column, cards, onAddCard, onEditCard, onDeleteCard }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.id });

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
      className="bg-blue-500 rounded-lg p-4 w-72"
    >
      <h2 className="font-semibold mb-3">{column.title}</h2>

      {/* Cards */}
      <SortableContext items={column.cardIds} strategy={verticalListSortingStrategy}>
        {column.cardIds.map((cardId) => (
          <Card
            key={cardId}
            card={cards[cardId]}
            onEdit={onEditCard}
            onDelete={onDeleteCard}
          />
        ))}
      </SortableContext>

      {/* Add Card */}
      <AddCardForm onAdd={(text) => onAddCard(column.id, text)} />
    </div>
  );
}

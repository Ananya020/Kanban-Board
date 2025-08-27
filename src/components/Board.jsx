import { useState, useEffect } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import Column from "./Column";
import initialData from "../data/initialData";

export default function Board({ board, setBoard }) {
    // Use props if provided, otherwise fall back to local state
    const [localBoardData, setLocalBoardData] = useState(initialData);
    const boardData = board || localBoardData;
    const setBoardData = setBoard || setLocalBoardData;

    //sensor setup
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    //fetch board state from backend 
    useEffect(() => {
        if (!board) {
            fetch("http://localhost:4000/board")
                .then((res) => res.json())
                .then((data) => setBoardData(data.data || data))
                .catch(() => console.log("Backend not running, using local state"));
        }
    }, [board, setBoardData]);

    //syncing
    useEffect(() => {
        fetch("http://localhost:4000/board", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: boardData }),
        }).catch(() => { });
    }, [boardData]);

    // Handlers
    const handleAddCard = (columnId, text) => {
        const newCardId = `card-${Date.now()}`;
        const newCard = { id: newCardId, content: text };

        setBoardData((prev) => {
            const newCards = { ...prev.cards, [newCardId]: newCard };
            const newColumn = {
                ...prev.columns[columnId],
                cardIds: [...prev.columns[columnId].cardIds, newCardId],
            };
            return {
                ...prev,
                cards: newCards,
                columns: { ...prev.columns, [columnId]: newColumn },
            };
        });
    };

    const handleEditCard = (cardId, newContent) => {
        setBoardData((prev) => ({
            ...prev,
            cards: {
                ...prev.cards,
                [cardId]: { ...prev.cards[cardId], content: newContent },
            },
        }));
    };

    const handleDeleteCard = (cardId) => {
        setBoardData((prev) => {
            const newCards = { ...prev.cards };
            delete newCards[cardId];

            const newColumns = {};
            for (let colId in prev.columns) {
                newColumns[colId] = {
                    ...prev.columns[colId],
                    cardIds: prev.columns[colId].cardIds.filter((id) => id !== cardId),
                };
            }

            return { ...prev, cards: newCards, columns: newColumns };
        });
    };

    const handleDragEnd = ({ active, over }) => {
        if (!over) return;

        // Column reordering
        if (boardData.columnOrder.includes(active.id) && boardData.columnOrder.includes(over.id)) {
            if (active.id !== over.id) {
                setBoardData((prev) => ({
                    ...prev,
                    columnOrder: arrayMove(prev.columnOrder, prev.columnOrder.indexOf(active.id), prev.columnOrder.indexOf(over.id)),
                }));
            }
            return;
        }

        // Card reordering across columns
        const activeContainer = findContainer(boardData, active.id);
        const overContainer = findContainer(boardData, over.id);

        if (!activeContainer || !overContainer) return;

        if (activeContainer === overContainer) {
            const column = boardData.columns[activeContainer];
            const newCardIds = arrayMove(column.cardIds, column.cardIds.indexOf(active.id), column.cardIds.indexOf(over.id));

            setBoardData((prev) => ({
                ...prev,
                columns: { ...prev.columns, [activeContainer]: { ...column, cardIds: newCardIds } },
            }));
        } else {
            const sourceCol = boardData.columns[activeContainer];
            const destCol = boardData.columns[overContainer];

            const newSourceCards = sourceCol.cardIds.filter((id) => id !== active.id);
            const newDestCards = [...destCol.cardIds];
            const overIndex = newDestCards.indexOf(over.id);
            newDestCards.splice(overIndex >= 0 ? overIndex : newDestCards.length, 0, active.id);

            setBoardData((prev) => ({
                ...prev,
                columns: {
                    ...prev.columns,
                    [activeContainer]: { ...sourceCol, cardIds: newSourceCards },
                    [overContainer]: { ...destCol, cardIds: newDestCards },
                },
            }));
        }
    };

    const findContainer = (data, itemId) => {
        if (data.columnOrder.includes(itemId)) return itemId;
        return Object.keys(data.columns).find((colId) =>
            data.columns[colId].cardIds.includes(itemId)
        );
    };

    // Safety check for boardData
    if (!boardData || !boardData.columnOrder || !boardData.columns || !boardData.cards) {
        return <div className="p-4 text-center">Loading board data...</div>;
    }

    return (
        <div className="p-4 min-h-screen bg-gray-100">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <div className="flex flex-col md:flex-row gap-4 overflow-x-auto min-h-[calc(100vh-2rem)] items-start">
            <SortableContext items={boardData.columnOrder} strategy={horizontalListSortingStrategy}>
                <div className="flex gap-4 overflow-x-auto p-4">
                    {boardData.columnOrder.map((columnId) => {
                        const column = boardData.columns[columnId];
                        const cards = boardData.cards;
                        if (!column) return null;
                        return (
                            <Column
                                key={column.id}
                                column={column}
                                cards={cards}
                                onAddCard={handleAddCard}
                                onEditCard={handleEditCard}
                                onDeleteCard={handleDeleteCard}
                            />
                        );
                    })}
                </div>
            </SortableContext>
            </div>
        </DndContext>
        </div>
    );
}
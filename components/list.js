import React, { useState } from "react";
import Card from "./card";
import Image from "next/image";

function List({ title, handleDrop, id, cards, setDragged, handleAddCardSubmit }) {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [activeListId, setActiveListId] = useState(id);

  function handleDragOver(event) {
    event.preventDefault();
  }

  return (
    <div data-id={id} className="relative flex-1" onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="absolute inset-0 flex flex-col flex-1 gap-4 p-4 text-gray-900 rounded bg-slate-300">
        <div>
          <h2 className="font-bold">{title}</h2>
        </div>
        <div className="flex flex-col flex-1 gap-4 overflow-auto">
          {cards.map((card, index) => (
            <Card key={index} {...card} setDragged={setDragged} />
          ))}
          {isAddingCard && activeListId === id && (
            <div className="flex flex-col max-w-sm gap-2">
              <input className="px-5 py-2 rounded-md"
                type="text"
                placeholder="Nuevo título de tarjeta"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                style={{
                  backgroundImage: 'url("comments.svg")', 
                  backgroundPosition: 'right center',
                  backgroundRepeat: 'no-repeat',
                }}
             />
                
              <button className="w-32 py-3 rounded-md bg-lime-900 text-slate-100"
                onClick={() => {
                  handleAddCardSubmit(activeListId, newCardTitle);
                  setIsAddingCard(false);
                  setNewCardTitle("");
                }}
              >
                Añadir otra tarjeta
              </button>
            </div>
          )}
          {!isAddingCard && (
            <div
              onClick={() => {
                setIsAddingCard(true);
                setActiveListId(id);
              }}
              style={{ cursor: "pointer" }}
            >
              <span className="flex gap-1">
                <Image src="/plus.svg" alt="" width={20} height={20} />
                Añadir otra tarjeta
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default List;
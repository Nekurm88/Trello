import List from "./list"
import Card from "./card"
import { useState } from "react"
import { todoList, inProgressList, doneList  } from "./data"

function Board() {
    const [dragged, setDragged] = useState(null);
  
    const [lists, setLists] = useState({
      todoList,
      inProgressList,
      doneList
    });
  
    function handleDrop(event) {
      const listId = event.currentTarget.dataset.id;
      const listsClone = structuredClone(lists);
  
      const newList = listsClone[dragged.list].filter(item => item.id !== dragged.data.id);
  
      listsClone[dragged.list] = newList;
      listsClone[listId].push(dragged.data);
  
      setLists(listsClone);
    }
  
    function handleAddCardSubmit(listId, newCardTitle) {
      if (newCardTitle.trim() !== "") {
        const listsClone = structuredClone(lists);
        const newCard = { title: newCardTitle, id: Math.random().toString() };
  
        listsClone[listId].push(newCard);
        setLists(listsClone);
      }
    }
  
    return (
        <div className="flex flex-col flex-1 gap-4 p-4">
          <div>
            <h1 className="text-2xl font-bold">Development</h1>
          </div>
          <main className="flex flex-1 gap-6">
            <List
              title="TODO"
              handleDrop={handleDrop}
              id="todoList"
              cards={lists.todoList}
              setDragged={setDragged}
              handleAddCardSubmit={handleAddCardSubmit}
            />
            <List
              title="In Progress"
              handleDrop={handleDrop}
              id="inProgressList"
              cards={lists.inProgressList}
              setDragged={setDragged}
              handleAddCardSubmit={handleAddCardSubmit}
            />
            <List
              title="Done"
              handleDrop={handleDrop}
              id="doneList"
              cards={lists.doneList}
              setDragged={setDragged}
              handleAddCardSubmit={handleAddCardSubmit}
            />
          </main>
        </div>
      );
    }
    
    export default Board;
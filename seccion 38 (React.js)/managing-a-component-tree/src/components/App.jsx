'use client';

import React, { useState } from 'react';
import Item from './Item';
import InputArea from './InputArea';
import Heading from './Heading';

export function App() {
  const [items, setItems] = useState([]);

  function addItem(input) {
    if (input === '') {
      return;
    }

    setItems((prevItems) => {
      return [
        ...prevItems,
        { id: `item-${items.length + 1 || 1}`, value: input }
      ];
    });
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      const newItemsArray = prevItems.filter((e) => e.id !== id);
      return newItemsArray;
    });
  }

  return (
    <div className="container">
      <Heading />
      <InputArea onAdd={addItem} />
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <Item
              value={todoItem.value}
              key={index}
              id={todoItem.id}
              onDelete={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

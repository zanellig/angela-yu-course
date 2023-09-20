import React, { useState } from 'react';

function Item(props) {
  const [style, changeStyle] = useState({});
  const [crossed, changeCrossed] = useState(false);

  function crossItem() {
    function invertCrossed() {
      changeCrossed((previous) => !previous);
    }

    // Guard clause
    if (crossed === false) {
      invertCrossed();
      changeStyle({
        textDecoration: 'line-through'
      });
      return;
    }

    if (crossed === true) {
      invertCrossed();
      changeStyle({
        textDecoration: 'none'
      });
    }
  }
  return (
    <div className="item-container">
      <li style={style} onClick={crossItem}>
        {props.value}
      </li>
      <span
        className="trash-button"
        onClick={() => {
          props.onDelete(props.id);
        }}
      >
        <i className="fa-solid fa-trash"></i>
      </span>
    </div>
  );
}

export default Item;

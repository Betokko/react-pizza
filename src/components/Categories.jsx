import React, { useState } from "react";

export const Categories = (props) => {

  const catrgories = ["Все", "Мясные", "Грилль", "Веганские", "Острые"];

  return (
    <div className="categories">
      <ul>
        {catrgories.map((item, index) => (
          <li
            className={props.id === index ? "active" : null}
            key={index}
            onClick={() => {
              props.onClickCategory(index);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

import React, { useState } from "react";

export const Categories = () => {
  const [categoryActive, setCategoryActive] = useState(0);

  const catrgories = [
    "Все",
    "Mercedes",
    "BMW",
    "Cadillac",
  ];

  return (
    <div className="categories">
      <ul>
        {catrgories.map((item, index) => (
          <li
            className={categoryActive === index ? "active" : null}
            key={index}
            onClick={() => {
              setCategoryActive(index);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories ;

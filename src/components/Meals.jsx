import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  const [meals, setMeals] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/meals`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setMeals(data);
      });
  }, []);
  return (
    <ul id="meals">
      {meals.map((meal) => {
        return <MealItem key={meal.id} meal={meal}></MealItem>;
      })}
    </ul>
  );
}

import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";

const reqConfig = {};

export default function Meals() {
  const {
    data: meals,
    loading,
    error,
  } = useHttp("http://localhost:3000/meals", reqConfig, []);

  return (
    <ul id="meals">
      {meals.map((meal) => {
        return <MealItem key={meal.id} meal={meal}></MealItem>;
      })}
    </ul>
  );
}

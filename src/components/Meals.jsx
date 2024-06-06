import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const reqConfig = {};

export default function Meals() {
  const {
    data: meals,
    loading,
    error,
  } = useHttp("http://localhost:3000/meals", reqConfig, []);

  if (loading) {
    return <p className="center">Fetching meals..</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" msg={error}></Error>;
  }

  return (
    <ul id="meals">
      {meals.map((meal) => {
        return <MealItem key={meal.id} meal={meal}></MealItem>;
      })}
    </ul>
  );
}

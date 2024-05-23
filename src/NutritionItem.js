import React from 'react';

const NutritionItem = ({ item }) => (
  <li>
    {item.quantity} x {item.itemName}: {item.calories} kcal, {item.protein}g protein, {item.carbs}g carbs, {item.fat}g fat, {item.fiber}g fiber
  </li>
);

export default NutritionItem;

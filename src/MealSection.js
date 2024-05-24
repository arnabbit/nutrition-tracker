import React, { Component } from 'react';
import NutritionItem from './NutritionItem';
import nutritionData from './nutritionData';
import axios from 'axios';

class MealSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: '',
      quantity: 1,
      items: [],
      totalNutrition: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0
      }
    };
  }

  componentDidMount() {
    const { mealType, date } = this.props;
    axios.get(`https://famous-valkyrie-c16ef0.netlify.app/.netlify/functions/app/getMeals/${date}`)
      .then(response => {
        const meal = response.data.reverse().find(meal => meal.mealType === mealType);

        if (meal) {
          this.setState({ items: meal.items }, this.updateTotalNutrition);
        }
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAdd = () => {
    const { selectedItem, quantity, items } = this.state;
    const item = nutritionData.find(item => item.itemName === selectedItem);
    if (item) {
      const newItem = {
        ...item,
        calories: item.calories * quantity,
        protein: item.protein * quantity,
        carbs: item.carbs * quantity,
        fat: item.fat * quantity,
        fiber: item.fiber * quantity,
        quantity:quantity
      };
      this.setState(prevState => ({
        items: [...prevState.items, newItem],
        selectedItem: '',
        quantity: 1
      }), this.updateTotalNutrition);
    }
  }

  handleSave = () => {
    const { mealType, date } = this.props;
    const { items } = this.state;
    axios.post('https://famous-valkyrie-c16ef0.netlify.app/.netlify/functions/app/saveMeal', { date, mealType, items })
      .then(response => {
        if (response.data.success) {
          alert('Meal saved successfully!');
        }
      });
  }

  updateTotalNutrition = () => {
    const { items } = this.state;
    const totalNutrition = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0
    };
    items.forEach(item => {
      totalNutrition.calories += item.calories;
      totalNutrition.protein += item.protein;
      totalNutrition.carbs += item.carbs;
      totalNutrition.fat += item.fat;
      totalNutrition.fiber += item.fiber
    });
    this.setState({ totalNutrition });
  }

  render() {
    const { mealType } = this.props;
    const { selectedItem, quantity, items, totalNutrition } = this.state;
    return (
      <div className="meal-section">
        <h2>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}</h2>
        <div className="input-group">
          <select name="selectedItem" value={selectedItem} onChange={this.handleChange}>
            <option value="">Select an item</option>
            {nutritionData.map((item, index) => (
              <option key={index} value={item.itemName}>{item.itemName}</option>
            ))}
          </select>
          Quantity :<input type="number" name="quantity" value={quantity} onChange={this.handleChange} min="1" />
          <button onClick={this.handleAdd}>Add</button>
        </div>
        <p>Total Nutrition:</p>
        <ul>
          <li>Calories: {totalNutrition.calories} kcal</li>
          <li>Protein: {totalNutrition.protein}g</li>
          <li>Carbs: {totalNutrition.carbs}g</li>
          <li>Fat: {totalNutrition.fat}g</li>
          <li>Fiber: {totalNutrition.fiber}</li>
        </ul>
        <ul>
          {items.map((item, index) => (
            <NutritionItem key={index} item={item} />
          ))}
        </ul>
        <button onClick={this.handleSave}>Save Meal</button>
      </div>
    );
  }
}

export default MealSection;

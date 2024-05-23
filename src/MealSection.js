import React, { Component } from 'react';
import NutritionItem from './NutritionItem';
import nutritionData from './nutritionData';

class MealSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: '',
      quantity: 1,
      items: nutritionData
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleAdd = () => {
    const { selectedItem, quantity, items } = this.state;
    const item = items.find(item => item.itemName === selectedItem);
    if (item) {
      const newItem = {
        ...item,
        calories: item.calories * quantity,
        protein: item.protein * quantity,
        carbs: item.carbs * quantity,
        fat: item.fat * quantity,
        fiber: item.fiber * quantity,
        quantity
      };
      this.props.addItem(this.props.mealType, newItem);
      this.setState({ selectedItem: '', quantity: 1 });
    }
  }

  render() {
    const { mealType, items } = this.props;
    const { selectedItem, quantity } = this.state;
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
          Quantity : <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={this.handleChange}
            min="1"
            placeholder="Quantity"
          />
          <button onClick={this.handleAdd}>Add</button>
        </div>
        <ul>
          {items.map((item, index) => (
            <NutritionItem key={index} item={item} />
          ))}
        </ul>
      </div>
    );
  }
}

export default MealSection;

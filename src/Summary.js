import React, { Component } from 'react';

class Summary extends Component {
  calculateTotalNutrition = (meals) => {
    const totals = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    for (let mealType in meals) {
      meals[mealType].forEach(item => {
        totals.calories += parseFloat(item.calories);
        totals.protein += parseFloat(item.protein);
        totals.carbs += parseFloat(item.carbs);
        totals.fat += parseFloat(item.fat);
        totals.fiber += parseFloat(item.fiber)
      });
    }
    return totals;
  }

  getStatus = (value, standard) => {
    if (value >= standard) return 'green';
    if (value >= standard * 0.75) return 'yellow';
    return 'red';
  }

  render() {
    const { meals, standards } = this.props;
    const totals = this.calculateTotalNutrition(meals);
    return (
      <div className="summary">
        <h2>Meal Summary</h2>
        <p>Calories: <span className={this.getStatus(totals.calories, standards.calories)}>{totals.calories}</span></p>
        <p>Protein: <span className={this.getStatus(totals.protein, standards.protein)}>{totals.protein}g</span></p>
        <p>Carbs: <span className={this.getStatus(totals.carbs, standards.carbs)}>{totals.carbs}g</span></p>
        <p>Fat: <span className={this.getStatus(totals.fat, standards.fat)}>{totals.fat}g</span></p>
        <p>Fiber: <span className={this.getStatus(totals.fat, standards.fiber)}>{totals.fiber}g</span></p>
      </div>
    );
  }
}

export default Summary;

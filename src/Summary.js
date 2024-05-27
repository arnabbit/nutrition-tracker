import React, { Component } from 'react';
import axios from 'axios';

class Summary extends Component {
  constructor(props){
    super(props)
    this.state={
      meals: {
        breakfast: [],
        lunch: [],
        snacks: [],
        dinner: []
      },
      totalNutrition: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0
      }
    }
  }
  
  componentDidMount(){
    const { date } = this.props;
    axios.get(`https://famous-valkyrie-c16ef0.netlify.app/.netlify/functions/app/getMeals/${date}`)
      .then(response => {
          let mealList = response.data.reverse()
          let meals= {
            breakfast: [],
            lunch: [],
            snacks: [],
            dinner: []
          }
          mealList.map((meal)=>{
            if(!meals.breakfast.length && meal.mealType==="breakfast"){
              meals.breakfast = meal.items
            }
            if(!meals.lunch.length && meal.mealType==="lunch"){
              meals.lunch = meal.items
            }
            if(!meals.snacks.length && meal.mealType==="snacks"){
              meals.snacks = meal.items
            }
            if(!meals.dinner.length && meal.mealType==="dinner"){
              meals.dinner = meal.items
            }
          })
          this.setState({ meals: meals }, ()=>this.calculateTotalNutrition(meals));
        
      });
  }
  calculateTotalNutrition = (meals) => {
    const totals = { calories: 0, protein: 0, carbs: 0, fat: 0, fiber:0 };
    for (let mealType in meals) {
      meals[mealType].forEach(item => {
        totals.calories += parseFloat(item.calories);
        totals.protein += parseFloat(item.protein);
        totals.carbs += parseFloat(item.carbs);
        totals.fat += parseFloat(item.fat);
        totals.fiber += parseFloat(item.fiber)
      });
    }
    this.setState({
      totalNutrition:totals
    })
  }

  getStatus = (value, standard) => {
    if (value >= standard) return 'green';
    if (value >= standard * 0.75) return 'yellow';
    return 'red';
  }

  render() {
    const { standards } = this.props;
    const {totalNutrition}= this.state
    return (
      <div className="summary">
        <h2>Meal Summary</h2>
        <p>Calories: <span className={this.getStatus(totalNutrition.calories, standards.calories)}>{totalNutrition.calories}</span></p>
        <p>Protein: <span className={this.getStatus(totalNutrition.protein, standards.protein)}>{totalNutrition.protein}g</span></p>
        <p>Carbs: <span className={this.getStatus(totalNutrition.carbs, standards.carbs)}>{totalNutrition.carbs}g</span></p>
        <p>Fat: <span className={this.getStatus(totalNutrition.fat, standards.fat)}>{totalNutrition.fat}g</span></p>
        <p>Fiber: <span className={this.getStatus(totalNutrition.fat, standards.fiber)}>{totalNutrition.fiber}g</span></p>
      </div>
    );
  }
}

export default Summary;

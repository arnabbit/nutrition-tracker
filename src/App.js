import React, { Component } from 'react';
import MealSection from './MealSection';
import Summary from './Summary';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      meals: {
        breakfast: [],
        lunch: [],
        snacks: [],
        dinner: []
      },
      nutritionalStandards: {
        calories: 2000,
        protein: 50,
        carbs: 300,
        fat: 70
      }
    };
  }

  addItem = (mealType, item) => {
    this.setState(prevState => ({
      meals: {
        ...prevState.meals,
        [mealType]: [...prevState.meals[mealType], item]
      }
    }));
  }

  render() {
    const { date, meals, nutritionalStandards } = this.state;
    return (
      <div className="app">
        <h1>Nutrition Tracker</h1>
        <div className="meal-sections">
          {['breakfast', 'lunch', 'snacks', 'dinner'].map(mealType => (
            <MealSection
              key={mealType}
              date={date}
              mealType={mealType}
              items={meals[mealType]}
              addItem={this.addItem}
            />
          ))}
        </div>
        <Summary meals={meals} standards={nutritionalStandards} />
      </div>
    );
  }
}

export default App;

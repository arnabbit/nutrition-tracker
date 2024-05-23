import React, { Component } from 'react';
import MealSection from './MealSection';
import Summary from './Summary';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: {
        meal: [],
        // lunch: [],
        // snacks: [],
        // dinner: []
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
    const { meals, nutritionalStandards } = this.state;
    return (
      <div className="app">
        <h1>Nutrition Tracker</h1>
        <div className="meal-sections">
          {['meal'].map(mealType => (
            <MealSection
              key={mealType}
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

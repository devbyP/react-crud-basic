import { useState } from "react";
import DrinkConfig from "./components/DrinkConfig";
import DrinksContext from "./contexts/DrinksContext";
import './App.css'

function App() {
  const [drinks, setDrinks] = useState<string[]>([]);

  return (
    <DrinksContext.Provider value={{drinks, setDrinks}}>
        <h1>React Basic CRUD Application Challenge</h1>
        <main>
            <DrinkConfig />
        </main>
    </DrinksContext.Provider>
  )
}

export default App

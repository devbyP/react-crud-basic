import { ChangeEvent, useContext, useEffect, useState } from "react";
import DrinksContext from "../contexts/DrinksContext";
import DrinkTable from "./DrinkTable";

function DrinkConfig() {
    const { drinks, setDrinks } = useContext(DrinksContext);

    const [selected, setSelected] = useState<string>("");

    useEffect(() => {
        if (selected) {
            const [ name, price ] = selected.split(", ");
            setDrinkInput(name);
            setPrice(parseFloat(price));
        }
    }, [selected]);


    const [drinkInput, setDrinkInput] = useState<string>("");
    const [price, setPrice] = useState<number>(0);

    function selectDrink(e: ChangeEvent<HTMLSelectElement>) {
        setSelected(e.target.value);
    }

    function handleChangeDrinkInput(e: ChangeEvent<HTMLInputElement>) {
        setDrinkInput(e.target.value);
    }

    function handleChangePriceInput(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.value) {
            setPrice(0);
        }
        const price = parseFloat(e.target.value);
        if (Number.isNaN(price)) {
            setPrice(0);
            return;
        }
        setPrice(price);
    }

    function createDrink() {
        const detail = `${drinkInput}, ${price}`;
        if (hasDrink(drinkInput)) {
            const old = drinks.filter((d) => d.startsWith(drinkInput));
            if (old.length === 0) {
                return;
            }
            setSelected(old[0]);
            return;
        }
        setDrinks((ds) => {
            ds.push(detail);
            return drinks;
        });
        setPrice(0);
        setDrinkInput("");
    }

    function hasDrink(drink: string): boolean {
        return !!drinks.find((d) => d.startsWith(drink));
    }

    function updateDrink() {
        const detail = `${drinkInput}, ${price}`;
        if (!hasDrink(selected)) {
            return;
        }
        setDrinks((ds) => {
            return ds.map((drink) => {
                if (drink.startsWith(selected)) {
                    return detail;
                }
                return drink;
            });
        })
    }

    function deleteDrink() {
        setDrinks((drinks) => {
            return drinks.filter((drink) => drink !== selected);
        })
    }

    return (
    <div className="config-wrapper">
        <DrinkTable drinks={drinks} onSelectDrink={selectDrink} />
        <div className="new-drink">
            <div className="field-inputs">
                <div>
                    <label htmlFor="name">name</label>
                    <input
                        id="name"
                        name="name"
                        placeholder="new drink"
                        value={drinkInput}
                        onChange={handleChangeDrinkInput}
                    />
                </div>
                <div>
                    <label htmlFor="price">price</label>
                    <input
                        id="price"
                        name="price"
                        placeholder="price"
                        value={price}
                        onChange={handleChangePriceInput}
                    />
                </div>
            </div>
            <div className="btn-group">
                <button onClick={createDrink}>Create</button>
                <button onClick={updateDrink}>Update</button>
                <button onClick={deleteDrink}>Delete</button>
            </div>
        </div>
    </div>
    )
}

export default DrinkConfig;

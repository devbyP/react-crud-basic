import { ChangeEvent } from "react";

type Props = {
    drinks: string[];
    onSelectDrink: (e: ChangeEvent<HTMLSelectElement>) => void;
};

function DrinksTable({ drinks, onSelectDrink }: Props) {
    return (
        <>
            <select size={10} onChange={onSelectDrink} className="drinks-table">
                { drinks.length === 0 ? <option className="error" disabled>no drink available</option> :
                    drinks.map((drink) =>
                        <option key={drink} value={drink} className="drink-row">
                            { drink }
                        </option>
                    )
                }
            </select>
        </>
    );
}

export default DrinksTable;

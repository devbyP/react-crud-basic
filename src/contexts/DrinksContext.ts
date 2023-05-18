import { Dispatch, SetStateAction, createContext } from "react";

export type DrinkContextType = {
    drinks: string[];
    setDrinks: Dispatch<SetStateAction<string[]>>;
}

export default createContext<DrinkContextType>({drinks: [], setDrinks: () => {return}});

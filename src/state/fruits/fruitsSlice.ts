import { createSlice } from "@reduxjs/toolkit";
import { Fruit, generateFruits } from "../../mock/fruits";

interface FruitsState {
  fruits: Fruit[];
}

const initialState: FruitsState = {
  fruits: generateFruits()
};

const fruitsSlice = createSlice({
  name: "fruits",
  initialState,
  reducers: {
    decrement: (state, actions) => {
      const fruitToBuy: Fruit = actions.payload as Fruit;

      state.fruits = state.fruits.map((fruit) => {
        if (fruit.code === fruitToBuy.code) {
          fruit.count = fruit.count - 1;
        }

        return fruit;
      });
    }
  }
});

export const { decrement } = fruitsSlice.actions; 
export default fruitsSlice.reducer;

import React from "react";
import Mask from "./Mask";

import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "../utils/cn";
import { BLOCK_STYLES, BUTTON_STYLES, VIEWER_STYLES } from "../common/constants";
import { RootState } from "../state/store";
import { decrement } from "../state/fruits/fruitsSlice";

interface CreditProps {
  fruitCode: string;
  credit: number;
  setCredit: React.Dispatch<React.SetStateAction<number>>;
  setFruitCode: React.Dispatch<React.SetStateAction<string>>;
}

const keyboard: number[] = Array.from(Array(10).keys());
const rows: number[][] = [
  keyboard.slice(1, 4),
  keyboard.slice(4, 7),
  keyboard.slice(7, 10)
];

const Credit: React.FC<CreditProps> = ({ fruitCode, credit, setCredit, setFruitCode }): React.ReactElement => {
  const fruits = useSelector((state: RootState) => state.fruitsSlice.fruits);
  const dispatch = useDispatch();

  const onSetCredit = (value: number): void => {
    setCredit(value);
  };

  const onClearCredit = (): void => {
    setCredit(0);
  };

  const onBuyFruit = (): void => {
    if (fruitCode.length !== 4 || credit <= 0) {
      return;
    }

    const fruitToBuy = fruits.find((fruit) => fruit.code === fruitCode);

    if (!fruitToBuy) {
      return;
    }

    if (fruitToBuy.count === 0) {
      toast.error("Unfortunately, we don't have chosen fruit in our stock anymore for today. We apologize for the inconvenience.");
      return;
    }

    if (credit < fruitToBuy.price) {
      toast.error(`The credit is lower than actual price of the fruit: ${fruitCode}, please type correct price: $${fruitToBuy.price.toFixed(2)}`);
      return;
    }

    if (credit > fruitToBuy.price) {
      toast.error("Unfortunately, you can buy only one item one by one. We apologize for the inconvenience.");
      return;
    }

    dispatch(decrement(fruitToBuy));
    setFruitCode("");
    setCredit(0);

    toast.success("Thank you for buying our fruits, have a great day ;)");
  };

  return (
    <div className={cn(BLOCK_STYLES, "relative")}>
      <div className="flex gap-x-2 items-center">
        <h6 className="text-sm text-white font-semibold uppercase">
          Credit
        </h6>

        <div className={cn(VIEWER_STYLES)}>
          {credit}
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="w-full flex justify-end gap-x-2">
            {row.map((value) => (
              <button
                key={value}
                type="button"
                className={cn(
                  BUTTON_STYLES,
                  "flex-1"
                )}
                onClick={() => onSetCredit(value)}
              >
                {value}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="w-full flex justify-end gap-x-2">
        <button
          type="button"
          className={cn(
            BUTTON_STYLES,
            "bg-yellow-500 hover:bg-yellow-600"
          )}
          onClick={onClearCredit}
        >
          Clear
        </button>
        
        <button
          type="button"
          disabled={fruitCode.length !== 4 || credit <= 0}
          className={cn(
            BUTTON_STYLES,
            "bg-green-500 hover:bg-green-600 disabled:opacity-15 disabled:cursor-not-allowed"
          )}
          onClick={onBuyFruit}
        >
          Buy
        </button>
      </div>

      {!fruits.length && <Mask />}
    </div>
  );
};

export default Credit;

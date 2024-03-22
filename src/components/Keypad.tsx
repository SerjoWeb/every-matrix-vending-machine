import React from "react";
import Mask from "./Mask";

import { cn } from "../utils/cn";
import { BLOCK_STYLES, BUTTON_STYLES, CODE_STRING, VIEWER_STYLES } from "../common/constants";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { RootState } from "../state/store";
import { useSelector } from "react-redux";

interface KeypadProps {
  fruitCode: string;
  setFruitCode: React.Dispatch<React.SetStateAction<string>>;
}

const letters: string[] = CODE_STRING.match(/[A-Z]/g) || [];
const numbers: string[] = CODE_STRING.match(/[0-9]/g) || [];

const Keypad: React.FC<KeypadProps> = ({ fruitCode, setFruitCode }): React.ReactElement => {
  const fruits = useSelector((state: RootState) => state.fruitsSlice.fruits);

  const addCharToCodeString = (char: string): void => {
    if (fruitCode.length >= 4) {
      return;
    }

    setFruitCode((prev) => prev += char);
  };

  const onRemoveLastChar = (): void => {
    const updatedCode = fruitCode.slice(0, -1);
    setFruitCode(updatedCode);
  };

  const onClearCode = (): void => {
    setFruitCode("");
  };

  return (
    <div className="w-full flex flex-col gap-y-2 relative">
      <div
        className={cn(BLOCK_STYLES)}
      >
        <div className="flex gap-x-2 items-center">
          <h6 className="text-sm text-white font-semibold uppercase">
            Fruit code
          </h6>

          <div className={cn(VIEWER_STYLES)}>
            {fruitCode}
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <div className="w-full flex gap-x-2">
            {letters.map((letter) => (
              <button
                key={letter}
                type="button"
                className={cn(BUTTON_STYLES)}
                onClick={() => addCharToCodeString(letter)}
              >
                {letter}
              </button>
            ))}
          </div>

          <div className="w-full flex gap-x-2">
            {numbers.map((number) => (
              <button
                key={number}
                type="button"
                className={cn(BUTTON_STYLES)}
                onClick={() => addCharToCodeString(number)}
              >
                {number}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-end gap-x-2">
          <button
            type="button"
            className={cn(
              BUTTON_STYLES,
              "bg-orange-500 hover:bg-orange-600"
            )}
            onClick={onRemoveLastChar}
          >
            <MdKeyboardDoubleArrowLeft size={24} />
          </button>
          
          <button
            type="button"
            className={cn(
              BUTTON_STYLES,
              "bg-yellow-500 hover:bg-yellow-600"
            )}
            onClick={onClearCode}
          >
            Clear
          </button>
        </div>
      </div>

      {!fruits.length && <Mask />}
    </div>
  );
};

export default Keypad;

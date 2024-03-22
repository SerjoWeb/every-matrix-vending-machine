import React from "react";
import Keypad from "./Keypad";
import Credit from "./Credit";
import Products from "./Products";

const VendingMachine = (): React.ReactElement => {
  const [fruitCode, setFruitCode] = React.useState<string>("");
  const [credit, setCredit] = React.useState<number>(0);
  
  return (
    <div className="w-full flex gap-x-4 bg-black/50 rounded-md p-12 shadow-md shadow-black/65">
      <div className="flex-1">
        <Products fruitCode={fruitCode} />
      </div>

      <div className="flex flex-col gap-y-2">
        <Keypad
          fruitCode={fruitCode}
          setFruitCode={setFruitCode}
        />

        <Credit
          fruitCode={fruitCode}
          credit={credit}
          setCredit={setCredit}
          setFruitCode={setFruitCode}
        />
      </div>
    </div>
  );
};

export default VendingMachine;

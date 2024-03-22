import React from "react";
import Product from "./Product";

import { useSelector } from "react-redux";
import { RootState } from "../state/store";

interface ProductsProps {
  fruitCode: string;
}

const Products: React.FC<ProductsProps> = ({ fruitCode }): React.ReactElement => {
  const fruits = useSelector((state: RootState) => state.fruitsSlice.fruits);
  const numRows = fruits.length ? Math.ceil(fruits.length / 4) : 0;
  const rowIndices = fruits.length && numRows > 0 ? Array.from({ length: numRows }, (_, index) => index) : 0;

  if (!fruits.length || numRows <= 0 || rowIndices === 0) {
    return (
      <div className="border border-black/75 rounded-md h-full bg-black/65 shadow-sm shadow-black/45">
        <div className="h-full bg-white/10 backdrop-blur-sm p-4 shadow-sm flex justify-center items-center">
          <p className="text-lg font-semibold text-white">There are no available fruits today :(</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-black/75 rounded-md h-full bg-black/65 shadow-sm shadow-black/45">
      <div className="h-full bg-white/10 backdrop-blur-sm p-4 shadow-sm">
        <div className="flex flex-col gap-y-4">
          {rowIndices.map((rowIndex) => (
            <div
              key={rowIndex}
              className="w-full flex gap-x-4"
            >
              {fruits.slice(rowIndex * 4, (rowIndex + 1) * 4).map((fruit, index) => (
                <Product key={index} fruitCode={fruitCode} fruit={fruit} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

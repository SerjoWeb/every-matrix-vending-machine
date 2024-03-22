import React from "react";

import { Fruit } from "../mock/fruits";
import { cn } from "../utils/cn";

interface ProductProps {
  fruit: Fruit;
  fruitCode: string;
}

const Product: React.FC<ProductProps> = ({ fruit, fruitCode }): React.ReactElement => {
  return (
    <div
      className={cn(
        `
        min-w-[124.9px] flex flex-col gap-y-4 justify-center items-center 
        p-2 bg-black/75 rounded-md transition-all duration-500 
        border-2
        `,
        fruitCode !== "" && fruit.code === fruitCode ? "border-green-500 shadow-md shadow-green-500/45" : "border-black/75"
      )}
    >
      <div className="h-[65px] w-[65px] flex justify-center items-center relative overflow-hidden rounded-md">
        <img
          src={fruit.image}
          alt={fruit.name}
          height={65}
          width={65}
          className="h-full w-full object-cover aspect-square"
        />
      </div>

      <div className="flex flex-col justify-center items-center">
        <p className="text-base text-white font-semibold">{fruit.name}</p>
        <p className="text-lg font-semibold text-orange-500">{fruit.code}</p>
        <p className="text-base text-white flex items-center gap-x-2">
          <span className="text-green-500">${fruit.price.toFixed(2)}</span>
          <span>/</span>
          <span
            className={cn(
              fruit.count >= 5
                ? "text-green-500"
                : fruit.count <= 4 && fruit.count >= 2
                  ? "text-yellow-500"
                  : "text-red-500"
            )}
          >
            {fruit.count}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Product;

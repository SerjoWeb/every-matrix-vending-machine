import apple from "/fruites/apple.png";
import bananas from "/fruites/bananas.png";
import blueberry from "/fruites/blueberry.png";
import cherries from "/fruites/cherries.png"
import grapes from "/fruites/grapes.png";
import orange from "/fruites/orange.png";
import passionFruit from "/fruites/passion-fruit.png";
import pineapple from "/fruites/pineapple.png";
import strawberry from "/fruites/strawberry.png";
import watermelon from "/fruites/watermelon.png";
import dragonFruit from "/fruites/dragon-fruit.png";
import lemon from "/fruites/lemon.png";

import { CODE_STRING } from "../common/constants";

export interface Fruit {
  name: string;
  image: string;
  code: string;
  count: number;
  maxCountPerSlot: number;
  price: number;
}

const fruitImages: string[] = [
  apple,
  bananas,
  blueberry,
  cherries,
  grapes,
  orange,
  passionFruit,
  pineapple,
  strawberry,
  watermelon,
  dragonFruit,
  lemon
];

const generateFruitCode = (): string => {
  let randomString = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * CODE_STRING.length);
    randomString += CODE_STRING.charAt(randomIndex);
  }

  return randomString;
};

const extractFruitName = (input: string): string | null => {
  let extractedString = "";
  let foundSlash = false;
  let foundDot = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === "/") {
      if (foundSlash) {
        extractedString = "";
      }
      foundSlash = true;
    } else if (char === "." && foundSlash) {
      foundDot = true;
      break;
    } else if (foundSlash) {
      if ((char >= "a" && char <= "z") || (char >= "A" && char <= "Z")) {
        if (!extractedString) {
          extractedString += char.toUpperCase();
        } else {
          extractedString += char.toLowerCase();
        }
      } else {
        extractedString += " ";
      }
    }
  }

  return foundDot ? extractedString : null;
};

const shuffleFruits = (fruits: Fruit[]): Fruit[] => {
  const fruitsArr = [...fruits];

  for (let i = fruitsArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [fruitsArr[i], fruitsArr[j]] = [fruitsArr[j], fruitsArr[i]];
  }

  return fruitsArr;
}

const generateRandomPrice = (fruitName: string): number => {
  let hash = 0;

  for (let i = 0; i < fruitName.length; i++) {
    hash += fruitName.charCodeAt(i);
  }

  return (hash % 9) + 1;
};

export const generateFruits = (): Fruit[] => {
  const fruits: Fruit[] = [];
  const maxFruitCount = Math.floor(Math.random() * 13);
  const availableFruitsStrings: string[] = Object.keys(fruitImages);
  const availableFruitsNumbers: number[] = [];
  const shuffledFruits: number[] = [];

  for (let i = 0; i < availableFruitsStrings.length; i++) {
    availableFruitsNumbers.push(parseInt(availableFruitsStrings[i]));
  }

  while (availableFruitsNumbers.length > 0) {
    const randomIndex: number = Math.floor(Math.random() * availableFruitsNumbers.length);

    shuffledFruits.push(availableFruitsNumbers[randomIndex]);
    availableFruitsNumbers.splice(randomIndex, 1);
  }

  for (let i = 0; i < maxFruitCount; i++) {
    const shuffeledFruit = fruitImages[shuffledFruits[Math.floor(Math.random() * shuffledFruits.length)]];
    const fruit: Fruit = {
      name: extractFruitName(shuffeledFruit) as string,
      code: generateFruitCode(),
      count: Math.floor(Math.random() * 5) + 1,
      maxCountPerSlot: 5,
      price: generateRandomPrice(extractFruitName(shuffeledFruit) as string),
      image: shuffeledFruit
    };

    fruits.push(fruit);
  }

  return shuffleFruits(fruits);
};

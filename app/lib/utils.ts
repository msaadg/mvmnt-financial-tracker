import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function numberToWords(num: number): string {
  const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  const thousands = ["", "thousand", "million", "billion"];

  if (num === 0) return "zero";

  function convertChunk(n: number): string {
    let result = "";
    
    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + " hundred ";
      n %= 100;
    }
    
    if (n >= 20) {
      result += tens[Math.floor(n / 10)] + " ";
      n %= 10;
    } else if (n >= 10) {
      result += teens[n - 10] + " ";
      return result;
    }
    
    if (n > 0) {
      result += ones[n] + " ";
    }
    
    return result;
  }

  let result = "";
  let chunkIndex = 0;
  
  while (num > 0) {
    const chunk = num % 1000;
    if (chunk !== 0) {
      result = convertChunk(chunk) + thousands[chunkIndex] + " " + result;
    }
    num = Math.floor(num / 1000);
    chunkIndex++;
  }
  
  return result.trim();
}

export const numWithCommas = (num:number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

export const roundPrice = (num:number) => Math.round(num / 100) * 100

export function removeItem<T>(arr: Array<T>, value: T): Array<T> { 
    const index = arr.indexOf(value);

    if (index > -1) {
      arr.splice(index, 1);
    }
    
    return arr;
  }
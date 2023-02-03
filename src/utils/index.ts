export const numWithCommas = (num:number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

export const roundPrice = (num:number) => Math.round(num / 100) * 100

export * from './constraints'
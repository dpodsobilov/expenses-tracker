export function formatAmount(amount: number): string {
  // или через regex
  //   return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  let res = "";
  const stringAmount = amount.toString();
  let counter = 0;
  if (stringAmount.length > 3) {
    for (let i = stringAmount.length - 1; i >= 0; i--) {
      res = res + stringAmount[i];
      if ((counter + 1) % 3 === 0) res += ".";
      counter++;
    }
    res = res.split("").reverse().join("");
  } else {
    res = stringAmount;
  }
  return res;
}

import React from "react";

const CURRENCY = [ // List of currencies
  { "acronym": "AUD", "description": "Autralian Dolar" },
  { "acronym": "BGN", "description": "Bulgarian lev" },
  { "acronym": "BRL", "description": "Brazilian Real" },
  { "acronym": "CAD", "description": "Canadian Dolar" },
  { "acronym": "CHF", "description": "Swiss franc" },
  { "acronym": "CNY", "description": "Chinise Yuan" },
  { "acronym": "CZK", "description": "Czech Republic Crown" },
  { "acronym": "DKK", "description": "Danish Crown" },
  { "acronym": "EUR", "description": "Euro" },
  { "acronym": "GBP", "description": "Esterlina Liber" },
  { "acronym": "HKD", "description": "Hong Kong Dolar" },
  { "acronym": "HRK", "description": "Croatian Crown" },
  { "acronym": "HUF", "description": "Hungarian guilder" },
  { "acronym": "IDR", "description": "Indonesian rupiah" },
  { "acronym": "ILS", "description": "Israeli new shekel" },
  { "acronym": "INR", "description": "Indian Rupia" },
  { "acronym": "JPY", "description": "Japanese yen" },
  { "acronym": "KRW", "description": "South Korean won" },
  { "acronym": "MXN", "description": "Mexican peso" },
  { "acronym": "MYR", "description": "Malaysia Ringgit" },
  { "acronym": "NOK", "description": "Norwegian Crown" },
  { "acronym": "NZD", "description": "New Zealand dollar" },
  { "acronym": "PHP", "description": "Philippine peso" },
  { "acronym": "PLN", "description": "Zloty Poland" },
  { "acronym": "RON", "description": "Romanian leu" },
  { "acronym": "RUB", "description": "Belarus Ruble" },
  { "acronym": "SEK", "description": "Swedish Crown" },
  { "acronym": "SGD", "description": "Singapore dollar" },
  { "acronym": "THB", "description": "Baht Thailand" },
  { "acronym": "TRY", "description": "Turkish lira" },
  { "acronym": "USD", "description": "United States dollar" },
  { "acronym": "ZAR", "description": "Rand South Africa" }
];

function compare(currency1, currency2) {
  if (currency1.description < currency2.description) {
    return -1;
  } else if (currency1.description > currency2.description) {
    return 1;
  }
  return 0;
}

// Function to get sorted currency list
export function getSortedCurrencyList() {
  return CURRENCY.sort(compare);
}

// ListCurrency component
function ListCurrency({ displayDescriptions = true }) {
  return getSortedCurrencyList().map((currency) => (
    <option value={currency.acronym} key={currency.acronym}>
      {`${currency.acronym} - ${displayDescriptions ? currency.description : ""}`}
    </option>
  ));
}

export default ListCurrency;

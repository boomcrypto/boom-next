export enum Coins {
  BTC = "BTC",
  BTC_TestNet = "BTC_TestNet",
}

export enum Networks {
  MAINNET = "mainnet",
  TESTNET = "testnet",
}

export enum Currencies {
  USD = "USD",
  EUR = "EUR",
  CNY = "CNY",
  GBP = "GBP",
  RUB = "RUB",
  HKD = "HKD",
  INR = "INR",
  JPY = "JPY",
  PKR = "PKR",
  SEK = "SEK",
  KRW = "KRW",
}

export enum CurrencySymbols {
  BTC = "BTC",
  USD = "$",
  EUR = "€",
  CNY = "¥",
  GBP = "£",
  RUB = "₽",
  HKD = "HK$",
  INR = "₹",
  JPY = "¥",
  PKR = "₨",
  SEK = "kr",
  KRW = "₩",
}

export enum NotificationTypes {
  Default = "default",
  DefaultInvert = "defaultInvert",
  Error = "error",
  Success = "success",
}

export enum ButtonColors {
  red = "red",
  black = "black",
}

export enum TimeOuts {
  OneMinute = 60 * 1000,
  ThreeMinutes = 3 * 60 * 1000,
  FiveMinutes = 5 * 60 * 1000,
  TenMinutes = 10 * 60 * 1000,
  ThirtyMinutes = 30 * 60 * 1000,
}

export enum SendSteps {
  Choose = "choose",
  Confirm = "confirm",
  Success = "success",
}

export enum Statuses {
  Success = "success",
  Fail = "fail",
  InProgress = "inProgress",
}

export enum ActivityTypes {
  Date = "date",
  Update = "update",
  Transaction = "transaction",
}

export enum ActivityFilterTypes {
  ShowAll = "showAll",
  Updates = "updates",
  Account = "account",
}

export enum ChartPeriods {
  Day = "1D",
  Week = "1W",
  Month = "1M",
  ThreeMonth = "3M",
  Year = "1Y",
}

export const appDetails = {
  name: "Boom Desktop",
  icon: "https://boom.money/icons/icon-192x192.png",
};

// api supports 50 assets per page
// using 20 for local paging
export const ASSET_PAGE_LIMIT = 20;

export const Coins = {
  BTC: "BTC",
  BTC_TestNet: "BTC_TestNet",
};

export const Networks = {
  MAINNET: "mainnet",
  TESTNET: "testnet",
};

export const Currencies = {
  USD: "USD",
  EUR: "EUR",
  CNY: "CNY",
  GBP: "GBP",
  RUB: "RUB",
  HKD: "HKD",
  INR: "INR",
  JPY: "JPY",
  PKR: "PKR",
  SEK: "SEK",
  KRW: "KRW",
};

export const CurrencySymbols = {
  BTC: "BTC",
  USD: "$",
  EUR: "€",
  CNY: "¥",
  GBP: "£",
  RUB: "₽",
  HKD: "HK$",
  INR: "₹",
  JPY: "¥",
  PKR: "₨",
  SEK: "kr",
  KRW: "₩",
};

export const NotificationTypes = {
  Default: "default",
  DefaultInvert: "defaultInvert",
  Error: "error",
  Success: "success",
};

export const ButtonColors = {
  red: "red",
  black: "black",
};

export const TimeOuts = {
  OneMinute: 60 * 1000,
  ThreeMinutes: 3 * 60 * 1000,
  FiveMinutes: 5 * 60 * 1000,
  TenMinutes: 10 * 60 * 1000,
  ThirtyMinutes: 30 * 60 * 1000,
};

export const SendSteps = {
  Choose: "choose",
  Confirm: "confirm",
  Success: "success",
};

export const Statuses = {
  Success: "success",
  Fail: "fail",
  InProgress: "inProgress",
};

export const ActivityTypes = {
  Date: "date",
  Update: "update",
  Transaction: "transaction",
};

export const ActivityFilterTypes = {
  ShowAll: "showAll",
  Updates: "updates",
  Account: "account",
};

export const ChartPeriods = {
  Day: "1D",
  Week: "1W",
  Month: "1M",
  ThreeMonth: "3M",
  Year: "1Y",
};

export const TransactionTypes = {
  TOKEN_TRANSFER: "token_transfer",
  SMART_CONTRACT: "smart_contract",
  CONTRACT_CALL: "contract_call",
  POISON_MICROBLOCK: "poison_microblock",
  COINBASE: "coinbase",
};

export const supportedTokens = [
  {
    assetIdentifier:
      "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.xstx-token::xstx",
    contractName: "xstx-token",
    contractAddress: "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
    assetName: "xstx",
    name: "xSTX Token",
    symbol: "xSTX",
    denomination: 1000000,
    icon: "/tokens/generic_token_bg.png",
    value: 0,
    cgId: "",
  },
  {
    assetIdentifier:
      "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.token-apower::apower",
    contractName: "token-apower",
    contractAddress: "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9",
    assetName: "apower",
    name: "APower Token",
    symbol: "APower",
    denomination: 100000000,
    icon: "/tokens/APower_Token.png",
    value: 0,
    cgId: "auto-staked-alex",
  },
  {
    assetIdentifier:
      "SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275.liquidity-token-v5kt9nmle8c::liquidity-token",
    contractName: "liquidity-token-v5kt9nmle8c",
    contractAddress: "SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275",
    assetName: "liquidity-token",
    name: "STX-DIKO",
    symbol: "STX-DIKO",
    denomination: 1000000,
    icon: "/tokens/stx-diko.png",
    value: 0,
    cgId: "",
  },
  {
    assetIdentifier:
      "SP213KNHB5QD308TEESY1ZMX1BP8EZDPG4JWD0MEA.fari-token-mn::fari",
    contractName: "fari-token-mn",
    contractAddress: "SP213KNHB5QD308TEESY1ZMX1BP8EZDPG4JWD0MEA",
    assetName: "fari",
    name: "Fari",
    symbol: "FARI",
    denomination: 100000000,
    icon: "/tokens/fari.png",
    value: 0,
    cgId: "",
  },
  {
    assetIdentifier:
      "SP2H8PY27SEZ03MWRKS5XABZYQN17ETGQS3527SA5.newyorkcitycoin-token::newyorkcitycoin",
    contractName: "newyorkcitycoin-token",
    contractAddress: "SP2H8PY27EZ03MWRKS5XABZYQN17ETGQS3527SA5",
    assetName: "newyorkcitycoin",
    name: "NewYorkCityCoin",
    symbol: "NYC",
    denomination: 1,
    icon: "/tokens/nyc.png",
    value: 0,
    cgId: "newyorkcoin",
  },
  {
    assetIdentifier:
      "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.wrapped-stx-token::wstx",
    contractName: "wrapped-stx-token",
    contractAddress: "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
    assetName: "wstx",
    name: "Wrapped STX",
    symbol: "WSTX",
    denomination: 1000000,
    icon: "/tokens/generic_token_bg.png",
    value: 0,
    cgId: "",
  },
  {
    assetIdentifier:
      "SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275.stsw-token-v4a::stsw",
    contractName: "stsw-token-v4a",
    contractAddress: "SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275",
    assetName: "stsw",
    name: "StackSwap",
    symbol: "STSW",
    denomination: 1000000,
    icon: "/tokens/stsw.svg",
    value: 0,
    cgId: "",
  },
  {
    assetIdentifier:
      "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8.cc-sip010-xck-v1::crosscheck",
    contractName: "cc-sip010-xck-v1",
    contractAddress: "SP3YK7KWMYRCDMV5M4792T0T7DERQXHJJGGEPV1N8",
    assetName: "crosscheck",
    name: "CrossCheck",
    symbol: "XCK",
    denomination: 1000000,
    icon: "/tokens/generic_token_bg.png",
    value: 0,
    cgId: "",
  },
  {
    assetIdentifier:
      "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.age000-governance-token::alex",
    contractName: "age000-governance-token",
    contractAddress: "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9",
    assetName: "alex",
    name: "ALEX Token",
    symbol: "ALEX",
    denomination: 100000000,
    icon: "/tokens/ALEX_Token.png",
    value: 0,
    cgId: "alexgo",
  },
  {
    assetIdentifier:
      "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.fwp-wstx-alex-50-50-v1-01::fwp-wstx-alex-50-50-v1-01",
    contractName: "fwp-wstx-alex-50-50-v1-01",
    contractAddress: "SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9",
    assetName: "fwp-wstx-alex-50-50-v1-01",
    name: "STX/ALEX Pool 50/50",
    symbol: "STX-ALEX-50-50",
    denomination: 100000000,
    icon: "/tokens/STX-ALEX_Token.png",
    value: 0,
    cgId: "",
  },
  {
    assetIdentifier:
      "SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275.tokensoft-token-v4ktqebauw9::tokensoft-token",
    contractName: "tokensoft-token-v4ktqebauw9",
    contractAddress: "SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275",
    assetName: "tokensoft-token",
    name: "Zero Authority DAO",
    symbol: "ZERO",
    denomination: 1000000,
    icon: "/tokens/zero.png",
    value: 0,
    cgId: "",
  },
  {
    assetIdentifier:
      "SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ.micro-nthng::micro-nothing",
    contractName: "micro-nthng",
    contractAddress: "SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ",
    assetName: "micro-nothing",
    name: "Nothing",
    symbol: "MNO",
    denomination: 1,
    icon: "/tokens/logo01_nothing_centered.png",
    value: 0,
    cgId: "",
  },
  {
    assetIdentifier:
      "SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27.miamicoin-token::miamicoin",
    contractName: "miamicoin-token",
    contractAddress: "SP466FNC0P7JWTNM2R9T199QRZN1MYEDTAR0KP27",
    assetName: "miamicoin",
    name: "MiamiCoin",
    symbol: "MIA",
    denomination: 1,
    icon: "/tokens/miamicoin.png",
    value: 0,
    cgId: "",
  },
  {
    assetIdentifier:
      "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-token::diko",
    contractName: "arkadiko-token",
    contractAddress: "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
    assetName: "diko",
    name: "Diko",
    symbol: "DIKO",
    denomination: 1000000,
    icon: "/tokens/diko.svg",
    value: 0,
    cgId: "arkadiko-protocol",
  },
  {
    assetIdentifier:
      "SPN4Y5QPGQA8882ZXW90ADC2DHYXMSTN8VAR8C3X.friedger-token-v1::friedger",
    contractName: "friedger-token-v1",
    contractAddress: "SPN4Y5QPGQA8882ZXW90ADC2DHYXMSTN8VAR8C3X",
    assetName: "friedger",
    name: "FRIE Token",
    symbol: "FRIE",
    denomination: 1000000,
    icon: "/tokens/frie.jpg",
    value: 0,
    cgId: "",
  },
  {
    assetIdentifier:
      "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.usda-token::usda",
    contractName: "usda-token",
    contractAddress: "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR",
    assetName: "usda",
    name: "USDA",
    symbol: "USDA",
    denomination: 1000000,
    icon: "/tokens/usda.svg",
    value: 0,
    cgId: "arkadiko-usda",
  },
  {
    assetIdentifier:
      "SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R.miamicoin-token-v2::miamicoin",
    contractName: "miamicoin-token-v2",
    contractAddress: "SP1H1733V5MZ3SZ9XRW9FKYGEZT0JDGEB8Y634C7R",
    assetName: "miamicoin",
    name: "MiamiCoinv2",
    symbol: "MIA",
    denomination: 1000000,
    icon: "/tokens/miamicoin.png",
    cgId: "miamicoin",
    value: 0,
  },
  {
    assetIdentifier:
      "SPSCWDV3RKV5ZRN1FQD84YE1NQFEDJ9R1F4DYQ11.newyorkcitycoin-token-v2::newyorkcitycoin",
    contractName: "newyorkcitycoin-token-v2",
    contractAddress: "SPSCWDV3RKV5ZRN1FQD84YE1NQFEDJ9R1F4DYQ11",
    assetName: "newyorkcitycoin",
    name: "NewYorkCityCoinv2",
    symbol: "NYC",
    denomination: 1000000,
    icon: "/tokens/nyc.png",
    value: 0,
    cgId: "newyorkcoin",
  },
  {
    assetIdentifier:
      "SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR.Wrapped-Bitcoin::xbtc",
    contractName: "Wrapped-Bitcoin",
    contractAddress: "SP3DX3H4FEYZJZ586MFBS25ZW3HZDMEW92260R2PR",
    assetName: "xBTC",
    name: "Wrapped Bitcoin",
    symbol: "XBTC",
    denomination: 100000000,
    icon: "/tokens/xbtc.png",
    value: 0,
    cgId: "wrapped-bitcoin-stacks",
  },
  {
    assetIdentifier: "SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.mega::mega",
    contractName: "mega",
    contractAddress: "SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335",
    assetName: "mega",
    name: "Mega",
    symbol: "MEGA",
    denomination: 100,
    icon: "/tokens/mega.png",
    value: 0,
    cgId: "",
  },
];

export const NFTTypes = {
  ImageNFT: "ImageNFT",
  VideoNFT: "VideoNFT",
  AudioNFT: "AudioNFT",
};

export const ORD_API_URL = "https://api.hiro.so";

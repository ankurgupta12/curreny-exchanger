export interface ISymbol {
  success: boolean;
  symbols: any;
}
export interface FormDataVal {
  toCurrency: ICurrency;
  fromCurrency: ICurrency;
  amount: number;
  isDisableToDropdown?: boolean;
}
export interface ICurrency {
  val: string;
  key: string;
  title?: string;
}
export interface IConvertData {
  success: boolean;
  date: string;
  result: number;
  query: IQuery;
  info: Information;
}
export interface IQuery {
  from: string;
  to: string;
  amount: number;
}
export interface Information {
  timestamp: number;
  rate: number;
}

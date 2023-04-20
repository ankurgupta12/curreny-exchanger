import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  FormDataVal,
  IConvertData,
  ICurrency,
  ISymbol,
} from '../interfaces/icurrency.interface';
@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  /**
   * Get all symbol from fixer api
   * @returns
   */
  public getSymbol(): Observable<ISymbol> {
    return this.http.get<ISymbol>(`${environment.BASE_URL}symbols`, {
      headers: {
        apikey: environment.ACCESS_KEY,
      },
    });
  }
  /**
   * This method is used to convert the value from currency into to currency
   * @param from from currency
   * @param to to currency
   * @param amount value to which need to convert
   */
  public convertCurrency({
    fromCurrency,
    toCurrency,
    amount,
  }: FormDataVal): Observable<IConvertData> {
    return this.http.get(
      `${environment.BASE_URL}convert?amount=${amount}&to=${toCurrency.val}&from=${fromCurrency.val}`,
      {
        headers: {
          apikey: environment.ACCESS_KEY,
        },
      }
    ) as Observable<IConvertData>;
  }
  /**
   * Method to use the latest rated based on the base currency
   * @param from base Currency
   * @param to For which need to fetch
   * @returns rates
   */
  public getLatest(from: ICurrency, to: string): Observable<any> {
    return this.http.get(
      `${environment.BASE_URL}latest?base=${from.val}&symbols=${to}`,
      {
        headers: {
          apikey: environment.ACCESS_KEY,
        },
      }
    );
  }
}

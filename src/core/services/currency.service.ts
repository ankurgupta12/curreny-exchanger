import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
  FormDataVal,
  IConvertData,
  ICurrency,
  ILatest,
  ISymbol,
} from './../index';
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
    return this.http
      .get<ISymbol>(`${environment.BASE_URL}symbols`, {
        headers: {
          apikey: environment.ACCESS_KEY,
        },
      })
      .pipe(
        catchError((err) =>
          of({
            success: true,
            symbols: {
              AED: 'United Arab Emirates Dirham',
              AFN: 'Afghan Afghani',
              ALL: 'Albanian Lek',
              AMD: 'Armenian Dram',
              EUR: 'EUR',
              USD: 'United States Dollar',
              GBP: 'United Kingdom Pound',
              UYU: 'Uruguay Peso',
              ARS: 'Argentina Peso',
            },
          })
        )
      );
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
    return this.http
      .get<IConvertData>(
        `${environment.BASE_URL}convert?amount=${amount}&to=${toCurrency.val}&from=${fromCurrency.val}`,
        {
          headers: {
            apikey: environment.ACCESS_KEY,
          },
        }
      )
      .pipe(
        catchError(() =>
          of({
            date: '21-04-2023',
            info: { rate: 1.2, timestamp: 2333344 },
            query: {
              amount: amount,
              from: fromCurrency.val,
              to: toCurrency.val,
            },
            result: amount * 1.2,
            success: true,
          })
        )
      );
  }
  /**
   * Method to use the latest rated based on the base currency
   * @param from base Currency
   * @param to For which need to fetch
   * @returns rates
   */
  public getLatest(from: ICurrency, to: string): Observable<ILatest> {
    return this.http
      .get<ILatest>(
        `${environment.BASE_URL}latest?base=${from.val}&symbols=${to}`,
        {
          headers: {
            apikey: environment.ACCESS_KEY,
          },
        }
      )
      .pipe(
        catchError(() =>
          of({
            success: true,
            timestamp: 1519296206,
            base: 'USD',
            date: '2023-04-19',
            rates: {
              AED: 0.25678,
              AFN: 1.5667,
              ALL: 1.2566,
              AMD: 3.76788,
              EUR: 0.813399,
              USD: 0.23566,
              GBP: 0.72007,
              UYU: 4.6666,
              ARS: 12.2552,
            },
            rate: 12,
          })
        )
      );
  }
}

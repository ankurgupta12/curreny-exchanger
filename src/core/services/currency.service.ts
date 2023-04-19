import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {
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
    return of({
      success: true,
      symbols: {
        AED: 'United Arab Emirates Dirham',
        AFN: 'Afghan Afghani',
        ALL: 'Albanian Lek',
        AMD: 'Armenian Dram',
        ANG: 'Netherlands Antillean Guilder',
        AOA: 'Angolan Kwanza',
        USD: 'United States Dollar',
        EUR: 'Euro',
      },
    });
    // return this.http.get(`${environment.BASE_URL}symbols`, {
    //   headers: {
    //   apikey: environment.ACCESS_KEY},
    // });
  }
  /**
   * This method is used to convert the value from currency into to currency
   * @param from from currency
   * @param to to currency
   * @param amount value to which need to convert
   */
  public convertCurrency(
    from: ICurrency,
    to: ICurrency,
    amount: number | null | undefined
  ): Observable<IConvertData> {
    return this.http.get(
      `${environment.BASE_URL}convert?amount=${amount}&to=${to.val}&from=${from.val}`,
      {
        headers: {
          apikey: environment.ACCESS_KEY,
        },
      }
    ) as Observable<IConvertData>;
  }

  public getLatest(from: ICurrency, to: ICurrency): Observable<any> {
    return this.http.get(
      `${environment.BASE_URL}latest?base=${from}&symbols=${to}`,
      {
        headers: {
          apikey: environment.ACCESS_KEY,
        },
      }
    ) as Observable<IConvertData>;
  }
}

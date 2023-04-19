import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { EUR, USD } from 'src/core/constant/currency.constant';
import {
  ICurrency,
  FormDataVal,
} from 'src/core/interfaces/icurrency.interface';
import { CurrencyService } from 'src/core/services/currency.service';
import { BaseComponent } from 'src/shared/components/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  constructor(private currencyService: CurrencyService) {
    super();
  }
  public currencyData: ICurrency[] = [];
  public convertedValue: string = '';
  public defualtFrom = EUR;
  public defualtTo = USD;
  public formData: FormDataVal = {
    fromCurrency: { key: EUR, val: EUR },
    toCurrency: { key: USD, val: USD },
    amount: undefined,
  };

  public ngOnInit(): void {
    this.currencyService
      .getSymbol()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe({
        next: (res) => {
          this.currencyData = Object.keys(res.symbols).map((val) => ({
            val: val,
            key: val,
          }));
          console.log(this.currencyData, 'this.currencyData');
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  /**
   * Convert the value from and to currency
   */
  public convert(): void {
    this.currencyService
      .convertCurrency(
        this.formData?.fromCurrency,
        this.formData?.toCurrency,
        this.formData?.amount
      )
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe({
        next: (res) => {
          this.convertedValue = `${res.result}${res.query.to}`;
          console.log(res);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}

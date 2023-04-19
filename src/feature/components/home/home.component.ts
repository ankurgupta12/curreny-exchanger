import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { EUR, USD } from 'src/core/constant/currency.constant';
import { ICONS } from 'src/core/constant/icon.constant';
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
  public currencyData: ICurrency[] = [];
  public convertedValue: string = '';
  public defualtFrom = EUR;
  public ICONS = ICONS;
  public defualtTo = USD;
  public formData: FormDataVal = {
    fromCurrency: { key: EUR, val: EUR },
    toCurrency: { key: USD, val: USD },
    amount: undefined,
  };
  public basePrice: string = '';
  constructor(private currencyService: CurrencyService) {
    super();
  }

  public ngOnInit(): void {
    this.getSymbol();
  }
  /**
   * Convert the value from and to currency
   */
  public convert(): void {
    this.currencyService
      .convertCurrency(this.formData)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe({
        next: (res) => {
          this.basePrice = `1.00${res.query.from}=${res.info.rate}${res.query.to}`;
          this.convertedValue = `${res.result}${res.query.to}`;
          console.log(res);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  /**
   * Method to swap the values
   */
  public swapValues() {
    let tempVal = this.formData?.toCurrency;
    this.formData.toCurrency = this.formData?.fromCurrency;
    this.formData.fromCurrency = tempVal;
    this.convert();
  }

  /**
   * Get Symbol data for all currency
   */
  private getSymbol(): void {
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
}

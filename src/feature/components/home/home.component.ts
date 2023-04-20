import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { EUR, USD } from 'src/core/constant/currency.constant';
import { GRID } from 'src/core/constant/global.constant';
import { ICONS } from 'src/core/constant/icon.constant';
import { FormDataVal } from 'src/core/interfaces/icurrency.interface';
import { BaseComponent } from 'src/shared/components/base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent implements OnDestroy {
  public defualtFrom = EUR;
  public defualtTo = USD;
  public formData: FormDataVal = {
    fromCurrency: { key: EUR, val: EUR },
    toCurrency: { key: USD, val: USD },
    amount: NaN,
    isDisableToDropdown: false,
  };
  public latestCurrency = new Array(GRID.LENGTH).fill(null);
  constructor(private router: Router) {
    super();
  }

  /**
   * Redirect to details page
   */
  public redirectToDetail(): void {
    console.log('Details');
    this.router.navigateByUrl('/detail', {
      state: { ...this.formData, isDisableToDropdown: true },
    });
  }
  /**
   * Method to show top 9 currency
   * @param $event response from the Api for latest currency
   */
  public getLatestCurrency($event: any) {
    const ratesKeys = Object.keys($event.rates);
    this.latestCurrency = this.latestCurrency.map((res, index) => {
      const val = { currencyName: '', basePrice: '' };
      val.currencyName = ratesKeys[index];
      val.basePrice = $event.rates[val.currencyName];
      return val;
    });
    console.log(this.latestCurrency);
  }

  public calculatePrice(currency: any) {
    return currency?.basePrice * this.formData?.amount;
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.formData = null as unknown as FormDataVal;
  }
}

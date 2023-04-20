import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { EUR, GBP, USD } from 'src/core/constant/currency.constant';
import { ICONS } from 'src/core/constant/icon.constant';
import { FormDataVal } from 'src/core/interfaces/icurrency.interface';
import { CurrencyService } from 'src/core/services/currency.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent {
  public formData: FormDataVal = {
    fromCurrency: { key: EUR, val: EUR },
    toCurrency: { key: USD, val: USD },
    amount: NaN,
    isDisableToDropdown: false,
  };
  public ICONS = ICONS;
  public constructor(
    private currencyServ: CurrencyService,
    private router: Router
  ) {
    super();
  }
  /**
   * Go to Detail page
   */
  public goToDetail(buttonClickEURToUSD?: boolean): void {
    this.currencyServ
      .getLatest({ key: EUR, val: EUR }, buttonClickEURToUSD ? USD : GBP)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/detail', {
            state: { ...this.formData },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}

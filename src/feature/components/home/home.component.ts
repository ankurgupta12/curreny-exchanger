import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class HomeComponent extends BaseComponent implements OnInit, OnDestroy {
  public defualtFrom = EUR;
  public defualtTo = USD;
  public formData: FormDataVal = {
    fromCurrency: { key: EUR, val: EUR },
    toCurrency: { key: USD, val: USD },
    amount: NaN,
  };
  public latestCurrency = new Array(GRID.LENGTH).fill({
    currencyName: '',
    basePrice: null,
  });
  constructor(private router: Router) {
    super();
  }

  public ngOnInit(): void {}

  /**
   * Redirect to details page
   */
  public redirectToDetail(): void {
    this.router.navigateByUrl('/detail', {
      state: this.formData,
    });
  }

  public override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.formData = null as unknown as FormDataVal;
  }
}

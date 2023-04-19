import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormDataVal,
  ICurrency,
} from 'src/core/interfaces/icurrency.interface';
import { BaseComponent } from 'src/shared/components/base.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent extends BaseComponent implements OnInit {
  public formConfig: FormDataVal;
  public title = '';
  public basePrice: any;
  public convertedValue: any;
  public currencyData: any;
  constructor(private router: Router) {
    super();
    this.formConfig = this.router.getCurrentNavigation()?.extras
      .state as FormDataVal;
    console.log(this.formConfig);
  }
  public ngOnInit(): void {}
  /**
   * To show the title
   * @param currencyList CurrencyList
   */
  public getCurrency(currencyList: ICurrency[]) {
    console.log(currencyList);
    const selectedCurrency = currencyList.find(
      (curr) => curr.val === this.formConfig?.fromCurrency?.val
    );
    this.title = `${selectedCurrency?.val} - ${selectedCurrency?.title}` || '';
  }
}

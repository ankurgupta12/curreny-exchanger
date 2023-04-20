import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { finalize, forkJoin, takeUntil } from 'rxjs';
import { EUR, USD } from 'src/core/constant/currency.constant';
import { GRID } from 'src/core/constant/global.constant';
import { ICONS } from 'src/core/constant/icon.constant';
import {
  FormDataVal,
  ICurrency,
} from 'src/core/interfaces/icurrency.interface';
import { CurrencyService } from 'src/core/services/currency.service';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss'],
})
export class FormContainerComponent extends BaseComponent implements OnInit {
  // input config for the form container
  @Input()
  public formConfig!: FormDataVal;
  @Input() @Optional() public isDisabled = false;

  @Output()
  public currencyList: EventEmitter<ICurrency[]> = new EventEmitter();
  @Output()
  public latestCurrencyList: EventEmitter<any> = new EventEmitter();

  public defualtFrom = EUR;
  public showLoader = true;
  public ICONS = ICONS;
  public defualtTo = USD;
  public currencyData: ICurrency[] = [];
  public basePrice = '';
  public convertedValue = '';
  public constructor(
    private currencyService: CurrencyService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit() {
    this.getSymbol();
  }

  /**
   * Method to swap the values
   */
  public swapValues() {
    const tempVal = this.formConfig?.toCurrency;
    this.formConfig.toCurrency = this.formConfig?.fromCurrency;
    this.formConfig.fromCurrency = tempVal;
    this.convert();
  }
  /**
   * Convert the value from and to currency
   */
  public convert(): void {
    this.showLoader = true;
    const convertCurrency$ = this.currencyService.convertCurrency(
      this.formConfig
    );
    const getLatestCurrency$ = this.currencyService.getLatest(
      this.formConfig.fromCurrency,
      Array.prototype.map.call(this.currencyData, (curr) => curr.key).toString()
    );
    forkJoin([convertCurrency$, getLatestCurrency$])
      .pipe(
        takeUntil(this.componentDestroyed),
        finalize(() => {
          this.cdr.detectChanges();
          this.showLoader = false;
        })
      )
      .subscribe({
        next: (response) => {
          const convertedValue = response[0];
          this.basePrice =
            convertedValue &&
            `1.00${convertedValue.query.from}=${convertedValue.info.rate}${convertedValue.query.to}`;
          this.convertedValue = `${convertedValue.result}${convertedValue.query.to}`;
          console.log(response);
          this.latestCurrencyList.next(response[1]);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  /**
   * Get Symbol data for all currency
   */
  private getSymbol(): void {
    this.showLoader = true;
    this.currencyService
      .getSymbol()
      .pipe(
        takeUntil(this.componentDestroyed),
        finalize(() => {
          this.showLoader = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.currencyData = Object.keys(res.symbols).map((val) => ({
            val: val,
            key: val,
            title: res.symbols[val],
          }));
          console.log(this.currencyData, 'this.currencyData');
          this.currencyList.next(this.currencyData);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FormContainerComponent } from './form-container.component';
import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CurrencyService } from 'src/core/services/currency.service';
import { of } from 'rxjs';
import { IConvertData, ILatest } from 'src/core/interfaces/icurrency.interface';

describe('FormContainerComponent', () => {
  let component: FormContainerComponent;
  let fixture: ComponentFixture<FormContainerComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let currencyService: CurrencyService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [FormContainerComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents()
      .then(() => {
        currencyService = TestBed.inject(CurrencyService);
      });

    fixture = TestBed.createComponent(FormContainerComponent);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call the convert method', () => {
    component.formConfig = {
      fromCurrency: { key: 'USD', val: 'USD', title: 'test' },
      amount: 23,
      toCurrency: { key: 'USD', val: 'USD', title: 'test' },
    };
    spyOn(currencyService, 'convertCurrency').and.returnValue(
      of({
        query: { from: 2, to: 2 },
        info: { rate: 2 },
        result: 2,
      } as unknown as IConvertData)
    );
    spyOn(currencyService, 'getLatest').and.returnValue(
      of({ rates: { USD: 1.2, ALL: 1.3 } } as unknown as ILatest)
    );
    component.convert();
    expect(component.basePrice).toBeTruthy();
  });
});

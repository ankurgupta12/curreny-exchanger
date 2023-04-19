import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.development';

import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpTestingController: HttpTestingController;
  let url = environment.BASE_URL;
  let symbols = {
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
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(CurrencyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getSymbol', () => {
    // 1
    service.getSymbol().subscribe((res) => {
      //2
      expect(res).toEqual(symbols);
    });

    //3
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${url}symbols`,
    });

    //4
    req.flush(symbols);
  });
  it('should call getLatest', () => {
    // 1
    service.getLatest({ key: 'USD', val: 'USD' }, 'USD').subscribe((res) => {
      //2
      expect(res).toEqual({ rates: { USD: 1.2 } });
    });

    //3
    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${url}latest?base=USD&symbols=USD`,
    });

    //4
    req.flush({ rates: { USD: 1.2 } });
  });
});

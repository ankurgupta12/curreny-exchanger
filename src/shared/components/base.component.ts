import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class BaseComponent implements OnDestroy {
  public componentDestroyed = new Subject();

  public ngOnDestroy(): void {
    this.componentDestroyed.complete();
    this.componentDestroyed.unsubscribe();
  }
}

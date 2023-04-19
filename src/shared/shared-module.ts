import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent, FormContainerComponent],
  imports: [CommonModule, FormsModule],
  providers: [],
  exports: [HeaderComponent, FormContainerComponent],
})
export class SharedModule {}

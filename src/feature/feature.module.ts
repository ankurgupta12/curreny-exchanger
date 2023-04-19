import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FeatureRoutingModule } from './feature-routing.module';
import { SharedModule } from 'src/shared/shared-module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, FeatureRoutingModule, CommonModule, FormsModule],
})
export class FeatureModule {}

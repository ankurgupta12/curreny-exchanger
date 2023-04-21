import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../feature/feature.module').then((m) => m.FeatureModule),
    canMatch: [
      () => {
        // To prevent the unAuthorized user for the particular guard
        return true;
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

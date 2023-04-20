import { Component } from '@angular/core';
import { ICONS } from 'src/core/constant/icon.constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public ICONS = ICONS;
}

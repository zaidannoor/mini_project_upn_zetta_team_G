import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';

@NgModule({
  declarations: [
    MenuComponent,
    MenuDetailComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
  ]
})
export class MenuModule { }

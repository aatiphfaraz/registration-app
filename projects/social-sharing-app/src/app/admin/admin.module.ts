import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardAdminComponent } from './board-admin/board-admin.component';

@NgModule({
  declarations: [BoardAdminComponent],
  imports: [CommonModule],
  exports: [BoardAdminComponent],
})
export class AdminModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditRoutingModule } from './audit-routing.module';
import { AuditComponent } from './audit.component';
import { LogErrorsComponent } from './log-errors/log-errors.component';
import { LogProcessComponent } from './log-process/log-process.component';


@NgModule({
  declarations: [
    AuditComponent,
    LogErrorsComponent,
    LogProcessComponent
  ],
  imports: [
    CommonModule,
    AuditRoutingModule
  ]
})
export class AuditModule { }

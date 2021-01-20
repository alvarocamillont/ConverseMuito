import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, PoModule, HttpClientModule, ReactiveFormsModule],
  exports: [PoModule, HttpClientModule, ReactiveFormsModule],
})
export class SharedModule {}

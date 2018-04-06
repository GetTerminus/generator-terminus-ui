import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <%= componentName %> } from './<%= kebabName %>.component';

export * from './<%= kebabName %>.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    <%= componentName %>,
  ],
  exports: [
    <%= componentName %>,
  ],
})
export class <%= moduleName %> {}

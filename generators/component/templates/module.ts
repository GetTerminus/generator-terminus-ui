import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <%= componentName %> } from './<%= kebabName %>.component';
export { <%= componentName %> } from './<%= kebabName %>.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    <%= componentName %>,
  ],
  declarations: [
    <%= componentName %>,
  ],
})
export class <%= moduleName %> {}

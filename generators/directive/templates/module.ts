import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { <%= directiveName %> } from './<%= kebabName %>.directive';

export * from './<%= kebabName %>.directive';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    <%= directiveName %>,
  ],
  exports: [
    <%= directiveName %>,
  ],
})
export class <%= moduleName %> {}

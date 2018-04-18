import {
  Component,
} from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  TestModuleMetadata,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  configureTestBedWithoutReset,
  expectNativeEl,
} from '@terminus/ngx-tools/testing';

import { <%= directiveName %> } from './<%= kebabName %>.directive';


@Component({
  template: `
    <div [<%= directiveSelector %>]>
      Foo
    </div>
  `,
})
class TestHostComponent {
}


describe(`<%= directiveName %>`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testComponent: TestHostComponent;
  const moduleDefinition: TestModuleMetadata = {
    declarations: [
      <%= directiveName %>,
      TestHostComponent,
    ],
  };

  configureTestBedWithoutReset(moduleDefinition);

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testComponent = fixture.componentInstance;
  });


  describe(`<%= directiveSelector %>`, () => {

    test(`should exist`, () => {
      fixture.detectChanges();
      expectNativeEl(fixture).toBeTruthy();
    });

  });

});


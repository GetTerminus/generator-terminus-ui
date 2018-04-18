import {
  Component,
  ViewChild,
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

import { <%= componentName %> } from './<%= kebabName %>.component';

@Component({
  template: `
    <div>
      <ts-<%= kebabName %>>
      </ts-<%= kebabName %>>
    </div>
  `,
})
class TestHostComponent {
  @ViewChild(<%= componentName %>)
  public <%= camelCaseComponentName %>: <%= componentName %>;
}

describe(`<%= componentName %>`, () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testComponent: TestHostComponent;
  let component: <%= componentName %>;
  const moduleDefinition: TestModuleMetadata = {
    declarations: [
      <%= componentName %>,
      TestHostComponent,
    ],
  };

  configureTestBedWithoutReset(moduleDefinition);

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testComponent = fixture.componentInstance;
    component = fixture.componentInstance.<%= camelCaseComponentName %>;
  });


  test(`should exist`, () => {
    fixture.detectChanges();
    expectNativeEl(fixture).toBeTruthy();
  });

});

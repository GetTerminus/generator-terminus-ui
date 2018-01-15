import {
  Component,
  ViewChild,
} from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  async,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        <%= componentName %>,
        TestHostComponent,
      ],
    })
      .overrideComponent(<%= componentName %>, {
        set: {
          template: '',
          templateUrl: null,
        }
      })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TestHostComponent);
        this.hostComponent = this.fixture.componentInstance;
        this.component = this.hostComponent.<%= camelCaseComponentName %>;
      });
  }));


  it(`should exist`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });

});

import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
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
class TestHostComponent {}

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
        this.fixture = TestBed.createComponent(<%= componentName %>);
        this.component = this.fixture.componentInstance;
      });
  }));


  it(`should exist`, () => {
    this.fixture.detectChanges();

    expect(this.component).toBeTruthy();
  });

});

import {
  Component,
} from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  async,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        <%= directiveName %>,
        TestHostComponent,
      ],
    })
      .compileComponents().then(() => {
        this.fixture = TestBed.createComponent(TestHostComponent);
        this.testComponent = this.fixture.componentInstance;
      });
  }));


  describe(`<%= directiveSelector %>`, () => {

    it(`should ...`, () => {
      this.fixture.detectChanges();

      expect(true).toEqual(false);
    });

  });

});


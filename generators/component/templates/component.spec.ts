import { <%= componentName %> } from './<%= kebabName %>.component';


describe(`<%= componentName %>`, () => {

  beforeEach(() => {
    this.component = new <%= componentName %>();
  });


  test(`should exist`, () => {
    expect(this.component).toBeTruthy();
  });

});

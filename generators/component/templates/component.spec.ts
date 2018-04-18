import { <%= componentName %> } from './<%= kebabName %>.component';


describe(`<%= componentName %>`, () => {
  let component: <%= componentName %>;

  beforeEach(() => {
    component = new <%= componentName %>();
  });


  test(`should exist`, () => {
    expect(component).toBeTruthy();
  });

});

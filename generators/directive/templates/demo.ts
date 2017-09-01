import { Component } from '@angular/core';

@Component({
  selector: 'demo-<%= kebabName %>',
  template: `
    <div <%= directiveSelector %>>
      Foo
    </div>
  `,
})
export class <%= pascalName %>Component {
}

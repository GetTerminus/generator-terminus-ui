import { Component } from '@angular/core';

@Component({
  selector: 'demo-<%= kebabName %>',
  template: `
    <<%= selector %>
    ></<%= selector %>>
  `,
})
export class <%= pascalName %>Component {
}

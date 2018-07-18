import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';


/**
 * TODO: Fill this section out
 * This is the <%= kebabName %> UI Component
 *
 * #### QA CSS CLASSES
 * - `qa-<%= kebabName %>`: Placed on the primary container
 *
 * @example
 * <ts-<%= kebabName %>
 *              item="Value"
 * ></ts-<%= kebabName %>>
 *
 * <example-url>https://goo.gl/ieUPaG</example-url>
 */
@Component({
  selector: 'ts-<%= kebabName %>',
  templateUrl: './<%= kebabName %>.component.html',
  styleUrls: ['./<%= kebabName %>.component.scss'],
  host: {
    class: 'ts-<%= kebabName %>',
  },
  exportAs: 'ts<%= pascalName %>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class <%= componentName %> {

}

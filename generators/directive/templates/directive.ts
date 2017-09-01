import {
  Directive,
  ElementRef,
  Input,
} from '@angular/core';


/**
 * TODO: Fill this section out
 * This is the <%= directiveSelector %> UI Directive
 *
 * @example
 * <div [<%= directiveSelector %>]></div>
 */
@Directive({
  selector: '[<%= directiveSelector %>]',
})
export class <%= directiveName %> {

  constructor(
    private elementRef: ElementRef,
  ) {
    console.log(`in <%= directiveName %>!`);
  }

}

import {VNode, VTree} from 'virtual-dom';
import h = require('virtual-dom/h');
import diff = require('virtual-dom/diff');
import patch = require('virtual-dom/patch');
import create = require('virtual-dom/create-element');

export class Widget {
  /**
  parentNode: an existing DOM Node, usually an HTMLElement
  renderFunction: a function from a single value to a virtual-hyperscript VNode
  */
  constructor(private parentNode: Node,
              private renderFunction: Function,
              private vtree?: VTree,
              private element?: HTMLElement) { }
  update(value) {
    if (this.vtree === undefined) {
      this.vtree = this.renderFunction(value);
      this.element = <HTMLElement>create(<VNode>this.vtree);
      // attach to the dom on the first draw
      this.parentNode.appendChild(this.element);
    }
    else {
      var new_vtree = this.renderFunction(value);
      var patches = diff(this.vtree, new_vtree);
      this.element = patch(this.element, patches);
      this.vtree = new_vtree;
    }
  }
}

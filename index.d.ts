import { VTree } from 'virtual-dom';
export declare class Widget {
    private parentNode;
    private renderFunction;
    private vtree;
    private element;
    /**
    parentNode: an existing DOM Node, usually an HTMLElement
    renderFunction: a function from a single value to a virtual-hyperscript VNode
    */
    constructor(parentNode: Node, renderFunction: Function, vtree?: VTree, element?: HTMLElement);
    update(value: any): void;
}

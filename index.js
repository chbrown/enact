var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var create = require('virtual-dom/create-element');
var Widget = (function () {
    /**
    parentNode: an existing DOM Node, usually an HTMLElement
    renderFunction: a function from a single value to a virtual-hyperscript VNode
    */
    function Widget(parentNode, renderFunction, vtree, element) {
        this.parentNode = parentNode;
        this.renderFunction = renderFunction;
        this.vtree = vtree;
        this.element = element;
    }
    Widget.prototype.update = function (value) {
        if (this.vtree === undefined) {
            this.vtree = this.renderFunction(value);
            this.element = create(this.vtree);
            // attach to the dom on the first draw
            this.parentNode.appendChild(this.element);
        }
        else {
            var new_vtree = this.renderFunction(value);
            var patches = diff(this.vtree, new_vtree);
            this.element = patch(this.element, patches);
            this.vtree = new_vtree;
        }
    };
    return Widget;
})();
exports.Widget = Widget;

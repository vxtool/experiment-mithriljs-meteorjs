export default class Component {

  // Rebind the controller scope to allow use of class based
  // methods to be called on the component scope.
  constructor() {
    this.controller = this.controller.bind(this);
  }

  // Declare to satisfy mithril requirements
  controller(props) {
  }

  // Force the declaration of the view in the component
  view(ctrl, props) {
    throw "View Not Implemented";
  }
}

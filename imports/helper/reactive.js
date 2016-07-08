import m from 'mithril';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'
import Component from './component';

export class ReactiveComponent extends Component {

  // Initialize component data
  constructor() {
    super();
    this.data = m.prop({});
  }

  // Update component data with incoming data subscription changes
  runComputation() {
    return Tracker.autorun((c) => {
      m.startComputation();
      this.data(this.getState());
      m.endComputation();
    });
  }

  // Run once per controller load, to subscribe to any publications required
  getPublications() {
    // this.subscribe('publication-name-here');
  }

  // Meteor subscribe to publications
  subscribe(publication, ...params) {
    return Meteor.subscribe(publication, ...params);
  }

  // Component calculated state from subscriptions
  getState() {
    return {};
  }

  // Base controller to automatically handle data subscription lifecycle
  controller(props) {
    this.getPublications();
    const reactive = this.runComputation();

    return {
      onunload: () => {
        reactive.stop();
        this.data({});
      }
    }
  }
}

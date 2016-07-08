import m from 'mithril';
import {Meteor} from 'meteor/meteor';
import App from '../imports/ui/app.js';

Meteor.startup(() => {
  m.mount(document.getElementById('app'), m(new App));
});

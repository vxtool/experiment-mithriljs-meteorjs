import { Meteor } from 'meteor/meteor';
import { Tasks } from '../imports/api/tasks';
Meteor.publish('tasks', () => Tasks.find());

import { Mongo } from 'meteor/mongo';

export const Tasks = new Mongo.Collection('tasks');

Meteor.methods({
  'tasks.insert'(title) {
    Tasks.insert({
      title,
      createdAt: new Date(), // current time
    });
  },

  'tasks.setChecked'(id, checked) {
    Tasks.update(id, {
     $set: {
       checked: !checked,
       updatedAt: new Date()
     }
    });
  },

  'tasks.remove'(id) {
    Tasks.remove(id);
  }
});

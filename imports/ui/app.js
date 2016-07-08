import m from 'mithril';
import { ReactiveComponent } from '../helper/reactive';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks';
import TaskList from './task/list.js';

export default class App extends ReactiveComponent {

  constructor() {
    // Ensure to call parent constructor to handle reactive data
    super();

    // Component specific data
    this.newTask = m.prop('');
    this.hideCompleted = m.prop(false);
    this.title = m.prop('Mithril and Meteor');
    // Subcomponents
    this.taskList = new TaskList;
  }

  // Subscribe to publications
  getPublications() {
    this.subscribe('tasks');
  }

  // Get App state reactively from mongo
  getState() {
    return {
      tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
      incompleteCount: Tasks.find({ checked: { $ne: true } }).count()
    }
  }

  // Handle the submission of a new task
  submitTask(e) {
    e.preventDefault();
    const title = this.newTask();

    // Insert task
    Meteor.call('tasks.insert', title);

    // Clear form input
    this.newTask('');
  }

  // Toggle the visibility of completed tasks
  toggleCompleted() {
    this.hideCompleted(!this.hideCompleted());
  }

  // Component view
  view(ctrl, props) {
    const {tasks, incompleteCount} = this.data();

    return m('.container', [
      m('header', [
        m('h1.title', `${this.title()} ${incompleteCount}`),
        m('label.hide-completed', [
          m('input', {
            type: 'checkbox',
            readonly: true,
            checked: this.hideCompleted(),
            onclick: this.toggleCompleted.bind(this)
          }),
          'Hide Completed Tasks'
        ]),
        m('form.new-task', {onsubmit: this.submitTask.bind(this)} , [
          m('input', {
            type: 'text',
            onchange: m.withAttr('value', this.newTask.bind(this)),
            value: this.newTask(),
            placeholder: 'Enter a new task'
          })
        ])
      ]),
      m(this.taskList, {tasks, hideCompleted: this.hideCompleted.bind(this)})
    ])
  }
}

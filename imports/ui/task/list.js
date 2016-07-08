import m from 'mithril';
import { Meteor } from 'meteor/meteor';
import Component from '../../helper/component';

export default class TaskList extends Component {

  deleteTask(taskId) {
    Meteor.call('tasks.remove', taskId);
  }

  toggleTask(task) {
    Meteor.call('tasks.setChecked', task._id, task.checked);
  }

  view(ctrl, props) {
    let {tasks} = props;

    if (props.hideCompleted()) {
      tasks = tasks.filter(task => !task.checked);
    }

    return m('.todo-list',
      m('ul', tasks.map(task =>
        m(`li${task.checked ? '.checked': ''}`, {key: task._id}, [
          m('button.delete', {
            onclick: () => this.deleteTask(task._id)
          }, m.trust('&times;')),
          m('input', {
            type: 'checkbox',
            readonly: true,
            checked: task.checked,
            onclick: () => this.toggleTask(task)
          }),
          m('span.text', task.title),
        ])
      ))
    )
  }
}

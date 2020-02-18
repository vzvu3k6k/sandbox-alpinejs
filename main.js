import 'alpinejs';

class App {
  constructor() {
    this.tasks = [];
    this.newTaskLabel = '';
  }

  addTask(label) {
    if (label) {
      this.tasks = [...this.tasks, { label, id: Date.now() }];
      this.newTaskLabel = '';
    }
  }

  updateTask(task) {
    this.tasks = this.tasks.map(t => t.id !== task.id ? t : { ...t, ...task });
  }
}

window.App = App;

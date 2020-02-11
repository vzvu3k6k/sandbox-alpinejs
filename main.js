import 'alpinejs';

window.addTask = (label, tasks) => (
  label ? [...tasks, { label }] : tasks
);

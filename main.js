import 'alpinejs';

window.addTask = (label, tasks) => (
  [...tasks, { label }]
);

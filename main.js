import 'alpinejs';

window.addTask = (label, tasks) => (
  label ? [...tasks, { label, id: Date.now() }] : tasks
);


window.updateTask = (task, tasks) => (
  tasks.map(t => t.id !== task.id ? t : { ...t, ...task })
);

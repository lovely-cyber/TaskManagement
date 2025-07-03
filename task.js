
let lastId = 0;

function createTask(task) {
  return {
    id: ++lastId,
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
  };
}


function updateTask(task, changes) {
  return {
    ...task,
    ...changes
  };
}

function deleteTask(tasks, id) {
  return tasks.filter(t => t.id !== id);
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasksJSON = localStorage.getItem('tasks');
  if (!tasksJSON) return [];
  try {
    return JSON.parse(tasksJSON);
  } catch {
    return [];
  }
}

module.exports = { createTask, updateTask, deleteTask, saveTasks, loadTasks };


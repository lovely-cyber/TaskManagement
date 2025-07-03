let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.sort((a, b) => {
    const p = { high: 3, medium: 2, low: 1 };
    return p[b.priority] - p[a.priority];
  });

  tasks.forEach((task, index) => {
    const priorityColor = {
      high: 'border-l-8 border-pink-600 bg-pink-50 shadow-md',
      medium: 'border-l-8 border-pink-400 bg-pink-50 shadow-sm',
      low: 'border-l-8 border-pink-200 bg-pink-50',
    }[task.priority];

    const li = document.createElement('li');
    li.className = `p-5 rounded-3xl ${priorityColor} transition hover:shadow-xl`;
    li.innerHTML = `
      <h3 class="text-xl font-semibold text-pink-700 mb-1">${task.title}</h3>
      <p class="text-pink-600 mb-3">${task.description}</p>
      <p class="text-sm text-pink-400 italic">Status: ${task.status}</p>
      <div class="mt-3 flex gap-3">
        <button onclick="editTask(${index})" class="text-pink-600 bg-pink-200 hover:bg-pink-300 px-4 py-1 rounded-2xl font-medium transition">Edit</button>
        <button onclick="deleteTask(${index})" class="text-white bg-pink-600 hover:bg-pink-700 px-4 py-1 rounded-2xl font-medium transition">Hapus</button>
      </div>
    `;
    list.appendChild(li);
  });
}


document.getElementById('taskForm').addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const priority = document.getElementById('priority').value;
  const status = document.getElementById('status').value;

  tasks.push({ title, description, priority, status });
  saveTasks();
  renderTasks();
  e.target.reset();
});

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById('title').value = task.title;
  document.getElementById('description').value = task.description;
  document.getElementById('priority').value = task.priority;
  document.getElementById('status').value = task.status;
  deleteTask(index);
}

renderTasks();

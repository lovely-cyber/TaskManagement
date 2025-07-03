const { createTask, updateTask , deleteTask} = require('../task');

describe('createTask function', () => {
  test('should create a task with a unique id and correct properties', () => {
    const newTask = {
      title: 'Belajar XP',
      description: 'Pelajari test-driven development',
      priority: 'medium',
      status: 'to-do',
    };

    const result = createTask(newTask);

    expect(result).toHaveProperty('id');
    expect(result.title).toBe('Belajar XP');
    expect(result.priority).toBe('medium');
    expect(result.status).toBe('to-do');
  });
});

describe('updateTask function', () => {
  test('should update the title and status of an existing task', () => {
    const task = createTask({
      title: 'Awal',
      description: 'Desc',
      priority: 'low',
      status: 'to-do',
    });

    const updated = updateTask(task, { title: 'Baru', status: 'done' });

    expect(updated.id).toBe(task.id);
    expect(updated.title).toBe('Baru');
    expect(updated.status).toBe('done');
    expect(updated.description).toBe('Desc');
  });
}



);

describe('deleteTask function', () => {
  test('should remove the task with the given id from the list', () => {
    const task1 = createTask({
      title: 'Tugas 1',
      description: 'Desc 1',
      priority: 'low',
      status: 'to-do',
    });
    const task2 = createTask({
      title: 'Tugas 2',
      description: 'Desc 2',
      priority: 'medium',
      status: 'to-do',
    });

    const tasks = [task1, task2];

    const remaining = deleteTask(tasks, task1.id);

    expect(remaining).toHaveLength(1);
    expect(remaining[0].id).toBe(task2.id);
  });
});


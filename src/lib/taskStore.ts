export type Priority = 'high' | 'medium' | 'low';
export type Status = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  notes: string;
  priority: Priority;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'taskflow-tasks';

export const generateId = (): string => {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getDefaultTasks = (): Task[] => [
  {
    id: generateId(),
    title: 'Design system review',
    description: 'Review and update the design system components',
    notes: 'Focus on button variants and form elements',
    priority: 'high',
    status: 'in-progress',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: 'API integration',
    description: 'Integrate the new payment gateway API',
    notes: '',
    priority: 'high',
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: 'User feedback analysis',
    description: 'Analyze user feedback from the last sprint',
    notes: 'Create summary report for stakeholders',
    priority: 'medium',
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: 'Update documentation',
    description: 'Update the API documentation with new endpoints',
    notes: '',
    priority: 'low',
    status: 'done',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: 'Performance optimization',
    description: 'Optimize database queries for better performance',
    notes: 'Focus on the user dashboard queries',
    priority: 'medium',
    status: 'in-progress',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const loadTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    const defaults = getDefaultTasks();
    saveTasks(defaults);
    return defaults;
  } catch {
    return getDefaultTasks();
  }
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task => {
  const tasks = loadTasks();
  const newTask: Task = {
    ...task,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.unshift(newTask);
  saveTasks(tasks);
  return newTask;
};

export const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>): Task | null => {
  const tasks = loadTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return null;
  
  tasks[index] = {
    ...tasks[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveTasks(tasks);
  return tasks[index];
};

export const deleteTask = (id: string): boolean => {
  const tasks = loadTasks();
  const filtered = tasks.filter(t => t.id !== id);
  if (filtered.length === tasks.length) return false;
  saveTasks(filtered);
  return true;
};

export const getTask = (id: string): Task | null => {
  const tasks = loadTasks();
  return tasks.find(t => t.id === id) || null;
};

import { useState, useCallback, useEffect } from 'react';
import { Task, loadTasks, saveTasks, addTask as storeAddTask, updateTask as storeUpdateTask, deleteTask as storeDeleteTask } from '@/lib/taskStore';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loaded = loadTasks();
    setTasks(loaded);
    setIsLoading(false);
  }, []);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask = storeAddTask(task);
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    const updated = storeUpdateTask(id, updates);
    if (updated) {
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
    }
    return updated;
  }, []);

  const deleteTask = useCallback((id: string) => {
    const success = storeDeleteTask(id);
    if (success) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
    return success;
  }, []);

  const getTask = useCallback((id: string) => {
    return tasks.find(t => t.id === id) || null;
  }, [tasks]);

  const stats = {
    total: tasks.length,
    done: tasks.filter(t => t.status === 'done').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
    highPriority: tasks.filter(t => t.priority === 'high').length,
  };

  return {
    tasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    getTask,
    stats,
  };
};

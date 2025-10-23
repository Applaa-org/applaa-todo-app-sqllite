import { useState, useEffect, useCallback } from 'react';
import { showError } from '@/utils/toast';

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch todos from database
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      // This would typically be an API call to your backend
      // For now, we'll simulate the data
      const mockTodos: Todo[] = [
        {
          id: 1,
          title: "Complete project documentation",
          description: "Write comprehensive documentation for the new feature release",
          completed: false,
          created_at: "1704067200",
          updated_at: "1704067200"
        },
        {
          id: 2,
          title: "Review pull requests",
          description: "Check and approve pending PRs from the development team",
          completed: true,
          created_at: "1703980800",
          updated_at: "1703980800"
        },
        {
          id: 3,
          title: "Update dependencies",
          description: "Upgrade all npm packages to their latest stable versions",
          completed: false,
          created_at: "1703894400",
          updated_at: "1703894400"
        },
        {
          id: 4,
          title: "Team meeting preparation",
          description: "Prepare agenda and slides for weekly team sync",
          completed: false,
          created_at: "1703808000",
          updated_at: "1703808000"
        },
        {
          id: 5,
          title: "Code refactoring",
          description: "Refactor the authentication module for better performance",
          completed: true,
          created_at: "1703721600",
          updated_at: "1703721600"
        },
        {
          id: 6,
          title: "Bug fixes",
          description: "Fix critical bugs reported in the last sprint",
          completed: false,
          created_at: "1703635200",
          updated_at: "1703635200"
        }
      ];
      setTodos(mockTodos);
    } catch (error) {
      showError('Failed to load todos');
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Add new todo
  const addTodo = useCallback(async (title: string, description: string) => {
    try {
      const newTodo: Todo = {
        id: Date.now(), // Temporary ID
        title,
        description,
        completed: false,
        created_at: Math.floor(Date.now() / 1000).toString(),
        updated_at: Math.floor(Date.now() / 1000).toString()
      };
      setTodos(prev => [newTodo, ...prev]);
    } catch (error) {
      showError('Failed to add todo');
      console.error('Error adding todo:', error);
    }
  }, []);

  // Update todo
  const updateTodo = useCallback(async (id: number, data: { title?: string; description?: string; completed?: boolean }) => {
    try {
      setTodos(prev => prev.map(todo => 
        todo.id === id 
          ? { ...todo, ...data, updated_at: Math.floor(Date.now() / 1000).toString() }
          : todo
      ));
    } catch (error) {
      showError('Failed to update todo');
      console.error('Error updating todo:', error);
    }
  }, []);

  // Delete todo
  const deleteTodo = useCallback(async (id: number) => {
    try {
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      showError('Failed to delete todo');
      console.error('Error deleting todo:', error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    refreshTodos: fetchTodos
  };
};
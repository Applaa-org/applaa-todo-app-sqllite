import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import TodoForm from '@/components/TodoForm';
import TodoItem from '@/components/TodoItem';
import TodoStats from '@/components/TodoStats';
import { useTodos } from '@/hooks/useTodos';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { MadeWithApplaa } from '@/components/made-with-applaa';

const TodoApp: React.FC = () => {
  const { todos, loading, addTodo, updateTodo, deleteTodo } = useTodos();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');

  // Filter and search todos
  const filteredTodos = useMemo(() => {
    let filtered = todos;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    } else if (filterStatus === 'pending') {
      filtered = filtered.filter(todo => !todo.completed);
    }

    return filtered;
  }, [todos, searchTerm, filterStatus]);

  // Calculate statistics
  const stats = useMemo(() => {
    const completed = todos.filter(todo => todo.completed).length;
    const pending = todos.filter(todo => !todo.completed).length;
    return {
      total: todos.length,
      completed,
      pending
    };
  }, [todos]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Statistics */}
          <TodoStats {...stats} />

          {/* Add Todo Form */}
          <TodoForm onAdd={addTodo} />

          {/* Search and Filter */}
          <Card className="p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search todos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === 'pending' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('pending')}
                >
                  Pending
                </Button>
                <Button
                  variant={filterStatus === 'completed' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('completed')}
                >
                  Completed
                </Button>
              </div>
            </div>
          </Card>

          {/* Todo List */}
          <div className="space-y-3">
            {filteredTodos.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="text-gray-500">
                  {searchTerm || filterStatus !== 'all' ? (
                    <>
                      <p className="text-lg font-medium mb-2">No todos found</p>
                      <p>Try adjusting your search or filter criteria</p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg font-medium mb-2">No todos yet</p>
                      <p>Add your first todo to get started!</p>
                    </>
                  )}
                </div>
              </Card>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>
        </div>
      </main>

      <footer className="mt-16">
        <MadeWithApplaa />
      </footer>
    </div>
  );
};

export default TodoApp;
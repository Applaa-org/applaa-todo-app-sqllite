import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

interface TodoFormProps {
  onAdd: (title: string, description: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showError('Please enter a title');
      return;
    }
    onAdd(title, description);
    setTitle('');
    setDescription('');
    setIsExpanded(false);
    showSuccess('Todo added successfully');
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <Card className="p-4 mb-6 cursor-pointer hover:shadow-md transition-shadow">
        <div
          className="flex items-center space-x-3 text-gray-500 hover:text-gray-700"
          onClick={() => setIsExpanded(true)}
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add a new todo...</span>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="font-medium"
          autoFocus
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description (optional)"
          rows={3}
        />
        <div className="flex space-x-2">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-1" />
            Add Todo
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default TodoForm;
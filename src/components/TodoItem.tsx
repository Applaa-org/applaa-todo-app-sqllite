import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Save, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { showSuccess, showError } from '@/utils/toast';

interface TodoItemProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
  onUpdate: (id: number, data: { title?: string; description?: string; completed?: boolean }) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  description,
  completed,
  createdAt,
  onUpdate,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  const handleToggleComplete = () => {
    onUpdate(id, { completed: !completed });
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      showError('Title cannot be empty');
      return;
    }
    onUpdate(id, { title: editTitle, description: editDescription });
    setIsEditing(false);
    showSuccess('Todo updated successfully');
  };

  const handleCancelEdit = () => {
    setEditTitle(title);
    setEditDescription(description);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this todo?')) {
      onDelete(id);
      showSuccess('Todo deleted successfully');
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(parseInt(timestamp) * 1000).toLocaleDateString();
  };

  return (
    <Card className={cn(
      "p-4 mb-3 transition-all duration-200",
      completed ? "opacity-75 bg-green-50 dark:bg-green-900/20" : "bg-white dark:bg-gray-800",
      "hover:shadow-md"
    )}>
      <div className="flex items-start space-x-3">
        <Checkbox
          checked={completed}
          onCheckedChange={handleToggleComplete}
          className="mt-1"
        />
        
        <div className="flex-1 space-y-2">
          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Todo title"
                className="font-medium"
              />
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description (optional)"
                rows={2}
              />
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={handleSaveEdit}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCancelEdit}
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={cn(
                    "font-medium text-lg",
                    completed && "line-through text-gray-500"
                  )}>
                    {title}
                  </h3>
                  {description && (
                    <p className={cn(
                      "text-gray-600 dark:text-gray-300 mt-1",
                      completed && "line-through"
                    )}>
                      {description}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Badge variant={completed ? "secondary" : "default"}>
                    {completed ? "Completed" : "Pending"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {createdAt ? `Created: ${formatDate(createdAt)}` : ''}
                </span>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsEditing(true)}
                    className="hover:bg-blue-100 dark:hover:bg-blue-900/20"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleDelete}
                    className="hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TodoItem;
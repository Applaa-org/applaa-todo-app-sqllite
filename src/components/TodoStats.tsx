import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Target } from 'lucide-react';

interface TodoStatsProps {
  total: number;
  completed: number;
  pending: number;
}

const TodoStats: React.FC<TodoStatsProps> = ({ total, completed, pending }) => {
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Tasks</p>
            <p className="text-2xl font-bold">{total}</p>
          </div>
          <Target className="w-8 h-8 text-blue-500" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-green-600">{completed}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-orange-600">{pending}</p>
          </div>
          <Clock className="w-8 h-8 text-orange-500" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Completion Rate</p>
            <p className="text-2xl font-bold text-purple-600">{completionRate}%</p>
          </div>
          <Badge variant="secondary" className="text-lg">
            {completionRate >= 80 ? 'Excellent' : completionRate >= 60 ? 'Good' : completionRate >= 40 ? 'Fair' : 'Needs Work'}
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default TodoStats;
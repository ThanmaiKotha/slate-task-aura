import { motion } from 'framer-motion';
import { Task } from '@/lib/taskStore';
import { PriorityBadge } from './PriorityBadge';
import { StatusBadge } from './StatusBadge';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TaskCardProps {
  task: Task;
  index: number;
}

export const TaskCard = ({ task, index }: TaskCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link 
        to={`/tasks/${task.id}`}
        className="group flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:bg-secondary/50"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-medium text-foreground truncate">{task.title}</h3>
            <PriorityBadge priority={task.priority} />
          </div>
          <p className="text-sm text-muted-foreground truncate">{task.description}</p>
        </div>
        <div className="flex items-center gap-4 ml-4">
          <StatusBadge status={task.status} />
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </div>
      </Link>
    </motion.div>
  );
};

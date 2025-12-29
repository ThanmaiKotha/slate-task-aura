import { Status } from '@/lib/taskStore';

interface StatusBadgeProps {
  status: Status;
}

const statusConfig = {
  'todo': {
    label: 'To Do',
    className: 'bg-muted text-muted-foreground border-border',
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-primary/15 text-primary border-primary/30',
  },
  'done': {
    label: 'Done',
    className: 'bg-success/15 text-success border-success/30',
  },
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const config = statusConfig[status];
  
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

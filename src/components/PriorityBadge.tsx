import { Priority } from '@/lib/taskStore';

interface PriorityBadgeProps {
  priority: Priority;
}

const priorityConfig = {
  high: {
    label: 'High',
    className: 'bg-priority-high/15 text-priority-high border-priority-high/30',
  },
  medium: {
    label: 'Medium',
    className: 'bg-priority-medium/15 text-priority-medium border-priority-medium/30',
  },
  low: {
    label: 'Low',
    className: 'bg-priority-low/15 text-priority-low border-priority-low/30',
  },
};

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const config = priorityConfig[priority];
  
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
};

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'primary';
  delay?: number;
}

const variantStyles = {
  default: 'bg-card border-border',
  success: 'bg-success/10 border-success/20',
  warning: 'bg-warning/10 border-warning/20',
  primary: 'bg-primary/10 border-primary/20',
};

const iconStyles = {
  default: 'text-muted-foreground',
  success: 'text-success',
  warning: 'text-warning',
  primary: 'text-primary',
};

export const StatCard = ({ title, value, icon: Icon, variant = 'default', delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`rounded-xl border p-6 ${variantStyles[variant]}`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <motion.p 
            className="mt-2 text-3xl font-bold text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
          >
            {value}
          </motion.p>
        </div>
        <div className={`rounded-lg bg-secondary p-3 ${iconStyles[variant]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
};

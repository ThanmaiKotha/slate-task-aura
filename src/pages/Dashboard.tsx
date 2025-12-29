import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { StatCard } from '@/components/StatCard';
import { ProgressRing } from '@/components/ProgressRing';
import { TaskCard } from '@/components/TaskCard';
import { CreateTaskDialog } from '@/components/CreateTaskDialog';
import { useTasks } from '@/hooks/useTasks';
import { CheckCircle2, Clock, ListTodo, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { tasks, stats, addTask, isLoading } = useTasks();
  const [createOpen, setCreateOpen] = useState(false);
  const { toast } = useToast();

  const progress = stats.total > 0 ? (stats.done / stats.total) * 100 : 0;
  const recentTasks = tasks.slice(0, 5);

  const handleCreateTask = (task: Parameters<typeof addTask>[0]) => {
    addTask(task);
    toast({
      title: "Task created",
      description: "Your new task has been added successfully.",
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout onAddClick={() => setCreateOpen(true)}>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Track your progress and manage tasks efficiently</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Tasks" value={stats.total} icon={ListTodo} delay={0} />
          <StatCard title="Completed" value={stats.done} icon={CheckCircle2} variant="success" delay={0.1} />
          <StatCard title="In Progress" value={stats.inProgress} icon={Clock} variant="primary" delay={0.2} />
          <StatCard title="High Priority" value={stats.highPriority} icon={AlertCircle} variant="warning" delay={0.3} />
        </div>

        {/* Progress Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h2 className="mb-6 text-lg font-semibold text-foreground">Overall Progress</h2>
            <div className="flex items-center justify-center">
              <ProgressRing progress={progress} size={180} strokeWidth={12} />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.todo}</p>
                <p className="text-xs text-muted-foreground">To Do</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.inProgress}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{stats.done}</p>
                <p className="text-xs text-muted-foreground">Done</p>
              </div>
            </div>
          </motion.div>

          {/* Recent Tasks */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h2 className="mb-4 text-lg font-semibold text-foreground">Recent Tasks</h2>
            <div className="space-y-3">
              {recentTasks.length > 0 ? (
                recentTasks.map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
                ))
              ) : (
                <p className="py-8 text-center text-muted-foreground">No tasks yet. Create your first task!</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <CreateTaskDialog 
        open={createOpen} 
        onOpenChange={setCreateOpen} 
        onSubmit={handleCreateTask} 
      />
    </Layout>
  );
};

export default Dashboard;

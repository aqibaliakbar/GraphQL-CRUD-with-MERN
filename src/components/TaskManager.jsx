import { useState, useEffect } from "react";
import { Plus } from "lucide-react";



import { useToast } from "@/hooks/use-toast";
import TaskCard from "./TaskCard";
import TaskDialog from "./TaskDialog";
import { Button } from "./ui/button";
import { fetchGraphQL, queries } from "@/lib/graphql";

const TaskManager= () => {
  const [tasks, setTasks] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchGraphQL(queries.getTasks);
      setTasks(data.tasks);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch tasks",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (data) => {
    try {
      await fetchGraphQL(queries.createTask, {
        title: data.title,
        description: data.description,
      });
      await fetchTasks();
      toast({
        title: "Success",
        description: "Task created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateTask = async (data) => {
    try {
      await fetchGraphQL(queries.updateTask, {
        id: selectedTask.id,
        ...data,
      });
      await fetchTasks();
      setSelectedTask(null);
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await fetchGraphQL(queries.deleteTask, { id });
        await fetchTasks();
        toast({
          title: "Success",
          description: "Task deleted successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={(task) => {
                setSelectedTask(task);
                setIsDialogOpen(true);
              }}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>

        <TaskDialog
          open={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedTask(null);
          }}
          onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
          task={selectedTask}
        />
      </div>
    </div>
  );
}


export default TaskManager;
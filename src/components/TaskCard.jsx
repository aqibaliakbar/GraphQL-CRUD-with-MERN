import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

 const  TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <h3 className="text-lg font-semibold leading-none tracking-tight">
              {task.title}
            </h3>
            <p className="text-sm text-muted-foreground">{task.description}</p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="h-8 w-8 p-0"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Badge variant={task.status === "completed" ? "success" : "secondary"}>
          {task.status}
        </Badge>
        <span className="text-sm text-muted-foreground">
          {format(new Date(task.createdAt), "MMM d, yyyy")}
        </span>
      </CardFooter>
    </Card>
  );
}

export default TaskCard
import { useState } from "react";
import { useApp } from "../context";
import { canAccess } from "../permissions";
import TaskItem from "./TaskItem";

export default function ProjectDetails() {
  const {
    user,
    projects,
    setProjects,
    selectedProjectId,
  } = useApp();

  const project = projects.find((p) => p.id === selectedProjectId);
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState("");

  if (!project) return null;

  const updateTasks = (tasks: any[]) => {
    setProjects(
      projects.map((p) =>
        p.id === project.id ? { ...p, tasks } : p
      )
    );
  };

  const addTask = () => {
    if (!taskName.trim()) {
      setError("Task name is required");
      return;
    }

    updateTasks([
      ...project.tasks,
      { id: Date.now(), title: taskName.trim(), status: "PENDING" },
    ]);

    setTaskName("");
    setError("");
  };

  return (
    <div>
      <h3>{project.name}</h3>

      {user && canAccess(user.role, "CREATE_TASK") && (
        <div>
          <input
            placeholder="Task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button disabled={!taskName.trim()} onClick={addTask}>
            Add Task
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      )}

      {project.tasks.length === 0 && (
        <p className="empty">No tasks added yet</p>
      )}

      {project.tasks.map((task) => (
        <TaskItem key={task.id} task={task} project={project} />
      ))}
    </div>
  );
}

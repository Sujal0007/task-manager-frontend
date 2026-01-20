import { Task, Project, TaskStatus } from "../types";
import { useApp } from "../context";

interface Props {
  task: Task;
  project: Project;
}

export default function TaskItem({ task, project }: Props) {
  const { user, projects, setProjects } = useApp();

  const updateStatus = (status: TaskStatus) => {
    setProjects(
      projects.map((p) =>
        p.id === project.id
          ? {
              ...p,
              tasks: p.tasks.map((t) =>
                t.id === task.id ? { ...t, status } : t
              ),
            }
          : p
      )
    );
  };

  return (
    <div className="task-row">
      <span>{task.title}</span>
      <span className={`badge ${task.status.toLowerCase()}`}>
        {task.status}
      </span>

      {user?.role === "DEVELOPER" && (
        <>
          <button
            disabled={task.status !== "PENDING"}
            onClick={() => updateStatus("IN_PROGRESS")}
          >
            Start
          </button>
          <button
            disabled={task.status !== "IN_PROGRESS"}
            onClick={() => updateStatus("COMPLETED")}
          >
            Complete
          </button>
        </>
      )}

      {user?.role === "MANAGER" && (
        <button onClick={() => updateStatus("PENDING")}>
          Mark Not Completed
        </button>
      )}
    </div>
  );
}

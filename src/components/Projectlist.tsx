import { useState } from "react";
import { useApp } from "../context";
import { canAccess } from "../permissions";

export default function ProjectList() {
  const { user, projects, setProjects, setSelectedProjectId } = useApp();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const addProject = () => {
    if (!name.trim()) {
      setError("Project name is required");
      return;
    }

    setProjects([...projects, { id: Date.now(), name: name.trim(), tasks: [] }]);
    setName("");
    setError("");
  };

  return (
    <>
      {user && canAccess(user.role, "CREATE_PROJECT") && (
        <div>
          <input
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button disabled={!name.trim()} onClick={addProject}>
            Create
          </button>
          {error && <p className="error">{error}</p>}
        </div>
      )}

      {projects.length === 0 && (
        <div className="empty">
          <h3>No projects yet</h3>
          <p>Create your first project</p>
          </div>
      )}

      <div className="project-grid">
        {projects.map((p) => (
          <div
            key={p.id}
            className="project-card"
            onClick={() => setSelectedProjectId(p.id)}
          >
            <h4>{p.name}</h4>
            <p>{p.tasks.length} tasks</p>
          </div>
        ))}
      </div>
    </>
  );
}

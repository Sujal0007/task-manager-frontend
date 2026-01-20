import { useApp } from "../context";

export default function Header() {
  const { user, setUser, selectedProjectId, setSelectedProjectId } = useApp();

  return (
    <header className="header">
      {selectedProjectId && (
        <button onClick={() => setSelectedProjectId(null)}>← Back</button>
      )}

      <h2>Task Manager</h2>

      {user && (
        <div>
          <span>{user.role}</span>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      )}
    </header>
  );
}

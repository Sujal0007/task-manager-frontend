import { useApp } from "../context";
import { Role } from "../types";

export default function Login() {
  const { setUser } = useApp();

  return (
    <div className="center">
      <h3>Select Role</h3>
      <select onChange={(e) => setUser({ id: Date.now(), role: e.target.value as Role })}>
        <option value="">Select</option>
        <option value="ADMIN">Admin</option>
        <option value="MANAGER">Manager</option>
        <option value="DEVELOPER">Developer</option>
      </select>
    </div>
  );
}

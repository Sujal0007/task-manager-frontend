export type Role = "ADMIN" | "MANAGER" | "DEVELOPER";

export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface User {
  id: number;
  role: Role;
}

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

export interface Project {
  id: number;
  name: string;
  tasks: Task[];
}

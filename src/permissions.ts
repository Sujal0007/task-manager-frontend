import { Role } from "./types";

export const canAccess = (role: Role, action: string) => {
  const rules: Record<Role, string[]> = {
    ADMIN: ["CREATE_PROJECT"],
    MANAGER: ["CREATE_TASK", "RESET_TASK"],
    DEVELOPER: ["START_TASK", "COMPLETE_TASK"],
  };

  return rules[role].includes(action);
};

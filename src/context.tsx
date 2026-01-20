import React, { createContext, useContext, useState } from "react";
import { User, Project } from "./types";

interface AppContextType {
  user: User | null;
  setUser: (u: User | null) => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  selectedProjectId: number | null;
  setSelectedProjectId: (id: number | null) => void;
}

const AppContext = createContext<AppContextType>(null!);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  return (
    <AppContext.Provider
      value={{ user, setUser, projects, setProjects, selectedProjectId, setSelectedProjectId }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

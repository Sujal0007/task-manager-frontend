import { AppProvider, useApp } from "./context";
import Header from "./components/Header";
import Login from "./components/Login";
import ProjectList from "./components/Projectlist";
import ProjectDetails from "./components/ProjectDetails";
import "./styles.css";

function Content() {
  const { user, selectedProjectId } = useApp();

  if (!user) return <Login />;
  if (selectedProjectId) return <ProjectDetails />;
  return <ProjectList />;
}

export default function App() {
  return (
    <AppProvider>
      <Header />
      <div className="container">
        <Content />
      </div>
    </AppProvider>
  );
}

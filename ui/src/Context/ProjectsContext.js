import { createContext, useEffect, useState } from "react";

const ProjectsContext = createContext({
  projects: null,
});

export const ProjectsContextProvider = (props) => {
  const [projects, setProjects] = useState(null);

  const fetchProjects = async () => {
    console.log("fetching...");
    const response = await fetch("http://localhost:5000/projects");
    const projects = await response.json();
    setProjects([...projects]);
  };

  const deleteProject = (id) => {
    fetch(`http://localhost:5000/projects/${id}`, { method: "DELETE" });
    fetchProjects();
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

    if (storedIsLoggedIn === "true") {
      fetchProjects();
    }

    return () => {
      setProjects(null);
    };
  }, []);

  return (
    <ProjectsContext.Provider
      value={{
        projects: projects,
        fetchProjects: fetchProjects,
        deleteProject: deleteProject,
      }}
    >
      {props.children}
    </ProjectsContext.Provider>
  );
};

export default ProjectsContext;

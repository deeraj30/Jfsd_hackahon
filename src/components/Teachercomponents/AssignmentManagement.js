import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import TeacherHome from "./TeacherHome";
import "./AssignmentManagement.css";

const AssignmentManagement = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    projectName: "", // Updated to match backend field name
    projectDescription: "", // Updated to match backend field name
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/assignments") // API endpoint
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddProject = () => {
    if (newProject.projectName && newProject.projectDescription) {
      axios
        .post("http://localhost:8080/assignments", newProject) // API endpoint
        .then((response) => {
          setProjects([...projects, response.data]);
          setNewProject({ projectName: "", projectDescription: "" });
          setError("");
          setSuccessMessage("Project added successfully!");
        })
        .catch((error) => {
          console.error("Error adding project:", error);
          setError("Failed to add project. Please try again later.");
        });
    } else {
      setError("Both project name and description are required.");
      setSuccessMessage("");
    }
  };

  const handleDeleteProject = (id) => {
    axios
      .delete(`http://localhost:8080/assignments/${id}`) // API endpoint
      .then(() => setProjects(projects.filter((p) => p.id !== id)))
      .catch((error) => console.error("Error deleting project:", error));
  };

  const currentProject = projects[currentIndex];

  return (
    <TeacherHome>
      <div className="assignment-management-container">
        <h1>Project Management</h1>

        {/* Display error */}
        {error && <div className="error-message">{error}</div>}

        {/* Display success message */}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <div className="project-form">
          <input
            type="text"
            name="projectName" // Updated to match backend field name
            placeholder="Project Name"
            value={newProject.projectName}
            onChange={handleChange}
          />
          <textarea
            name="projectDescription" // Updated to match backend field name
            placeholder="Project Description"
            value={newProject.projectDescription}
            onChange={handleChange}
          />
          <button className="add-btn" onClick={handleAddProject}>
            Add Project
          </button>
        </div>

        <div className="projects-list">
          <h2>Projects</h2>
          {currentProject ? (
            <div key={currentProject.id} className="project-card">
              <p>
                <strong>Name:</strong> {currentProject.projectName}
              </p>
              <p>
                <strong>Description:</strong> {currentProject.projectDescription}
              </p>
              <button
                className="delete-btn"
                onClick={() => handleDeleteProject(currentProject.id)}
              >
                Delete
              </button>
              
            </div>
          ) : (
            <p>No projects available.</p>
          )}
        </div>

        <div className="pagination">
          <button
            className="pagination-button"
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentIndex === 0}
          >
            Prev
          </button>
          <button
            className="pagination-button"
            onClick={() =>
              setCurrentIndex((prev) => Math.min(prev + 1, projects.length - 1))
            }
            disabled={currentIndex === projects.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </TeacherHome>
  );
};

export default AssignmentManagement;

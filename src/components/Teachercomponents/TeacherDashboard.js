import React, { useState } from 'react';

const TeacherDashboard = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Cancer Prediction', reviewed: false },
    { id: 2, name: 'Online Course Management System', reviewed: true },
    { id: 3, name: 'Image Recognition App', reviewed: false },
    { id: 4, name: 'Online Book Store', reviewed: true },
    { id: 5, name: 'Student Learning Management System', reviewed: false }, // New project added
  ]);

  const handleReviewChange = (id) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === id
          ? { ...project, reviewed: !project.reviewed }
          : project
      )
    );
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '20px auto',
        padding: '20px',
        border: '2px solid blue',
        borderRadius: '10px',
        textAlign: 'center',
        backgroundColor: '#f0f8ff',
      }}
    >
      <h3 style={{ color: 'blue' }}>Teacher Dashboard</h3>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginTop: '20px',
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: '8px', borderBottom: '1px solid blue' }}>
              Project Name
            </th>
            <th style={{ padding: '8px', borderBottom: '1px solid blue' }}>
              Reviewed
            </th>
            <th style={{ padding: '8px', borderBottom: '1px solid blue' }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
                {project.name}
              </td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
                {project.reviewed ? 'Reviewed' : 'Not Reviewed'}
              </td>
              <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
                <button
                  onClick={() => handleReviewChange(project.id)}
                  style={{
                    backgroundColor: project.reviewed ? '#FF6347' : '#4CAF50',
                    color: 'white',
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  {project.reviewed ? 'Unmark as Reviewed' : 'Mark as Reviewed'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherDashboard;

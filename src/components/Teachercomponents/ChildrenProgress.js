import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TeacherHome from "./TeacherHome"; // Import TeacherHome

const ChildrenProgress = () => {
  const { email } = useParams(); // Get email from URL parameters
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [grades, setGrades] = useState({}); // Track grades entered for each assignment
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch assignments for the specific student
    axios
      .get(`http://localhost:8080/api/assignments/submissions`, {
        params: { email },
      })
      .then((response) => {
        setAssignments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching assignments:", error);
        setError("Failed to fetch assignments. Please try again later.");
        setLoading(false);
      });
  }, [email]);

  const handleGradeChange = (assignmentName, value) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [assignmentName]: value,
    }));
  };

  const submitGrade = (assignmentName) => {
    const grade = grades[assignmentName];
    if (!grade) {
      alert("Please enter a grade before submitting.");
      return;
    }

    axios
      .post(`http://localhost:8080/api/assignments/grade`, null, {
        params: {
          studentEmail: email,
          assignmentName: assignmentName,
          grade: grade,
        },
      })
      .then(() => {
        setSuccessMessage(`Grade submitted for ${assignmentName}`);
        setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
      })
      .catch((error) => {
        console.error("Error submitting grade:", error);
        alert("Failed to submit grade. Please try again.");
      });
  };

  if (loading) {
    return (
      <TeacherHome>
        <p>Loading assignments...</p>
      </TeacherHome>
    );
  }

  if (error) {
    return (
      <TeacherHome>
        <p className="error">{error}</p>
      </TeacherHome>
    );
  }

  return (
    <TeacherHome>
      <div>
        <h1>Student Progress for {email}</h1>
        {successMessage && <p className="success">{successMessage}</p>}
        {assignments.length === 0 ? (
          <p>No assignments found for this student.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Assignment Name</th>
                <th>Completed At</th>
                <th>File</th>
                <th>Grade</th>
                <th>Submit Grade</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td>{assignment.assignmentName}</td>
                  <td>{new Date(assignment.completedAt).toLocaleString()}</td>
                  <td>
                    <a
                      href={`data:application/octet-stream;base64,${assignment.fileData}`}
                      download={assignment.assignmentName}
                    >
                      Download File
                    </a>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={grades[assignment.assignmentName] || ""}
                      onChange={(e) =>
                        handleGradeChange(assignment.assignmentName, e.target.value)
                      }
                      placeholder="Enter grade"
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => submitGrade(assignment.assignmentName)}
                    >
                      Submit Grade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </TeacherHome>
  );
};

export default ChildrenProgress;

import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentHome from "./StudentHome";
import "./StudentAssignment.css";

const StudentAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [userDetails, setUserDetails] = useState({});
  const [fileContent, setFileContent] = useState({});

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("userDetails"));
    if (details) {
      setUserDetails(details);
    } else {
      alert("User details not found. Please sign in.");
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/assignments")
      .then((response) => setAssignments(response.data))
      .catch((error) => console.error("Error fetching assignments:", error));
  }, []);

  const indexOfLastAssignment = currentPage * itemsPerPage;
  const indexOfFirstAssignment = indexOfLastAssignment - itemsPerPage;
  const currentAssignments = assignments.slice(
    indexOfFirstAssignment,
    indexOfLastAssignment
  );

  const totalPages = Math.ceil(assignments.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFileSelection = (e, assignmentId) => {
    const file = e.target.files[0];
    
    // If a file is selected and it's not a previously uploaded file, replace it
    if (file) {
      setUploadedFiles((prevFiles) => ({
        ...prevFiles,
        [assignmentId]: file,
      }));

      if (file && file.type === "text/plain") {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFileContent((prevContent) => ({
            ...prevContent,
            [assignmentId]: e.target.result,
          }));
        };
        reader.readAsText(file);
      } else {
        setFileContent((prevContent) => ({
          ...prevContent,
          [assignmentId]: "",
        }));
      }
    }
  };

  const handleFileContentChange = (e, assignmentId) => {
    const newContent = e.target.value;
    setFileContent((prevContent) => ({
      ...prevContent,
      [assignmentId]: newContent,
    }));
  };

  const handleRemoveFile = (assignmentId) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = { ...prevFiles };
      delete updatedFiles[assignmentId];
      return updatedFiles;
    });

    setFileContent((prevContent) => {
      const updatedContent = { ...prevContent };
      delete updatedContent[assignmentId];
      return updatedContent;
    });

    // Reset the file input field
    const fileInput = document.getElementById(`file-input-${assignmentId}`);
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleMarkAsDone = (assignmentId, assignmentName) => {
    const file = uploadedFiles[assignmentId];
    if (!file) {
      alert("Please upload a file before marking as done.");
      return;
    }

    const formData = new FormData();
    formData.append("studentName", userDetails.name);
    formData.append("studentEmail", userDetails.email);
    formData.append("assignmentName", assignmentName);
    formData.append("file", file);

    axios
      .post("http://localhost:8080/api/assignments/mark-done", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Assignment marked as done and saved successfully!");
        setAssignments((prevAssignments) =>
          prevAssignments.map((assignment) =>
            assignment.id === assignmentId
              ? { ...assignment, status: "Done" }
              : assignment
          )
        );
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message ===
            "Assignment already submitted by this student."
        ) {
          alert("This assignment has already been submitted!");
        } else {
          console.error("Error marking assignment as done:", error);
          alert("Failed to mark assignment as done. Please try again.");
        }
      });
  };

  return (
    <StudentHome>
      <div className="assignments-container">
        <h1>Assignments</h1>
        {assignments.length === 0 ? (
          <p className="no-assignments">No Assignments available yet.</p>
        ) : (
          <>
            <div className="assignments-grid">
              {currentAssignments.map((assignment) => (
                <div key={assignment.id} className="assignment-card">
                  <h2>{assignment.projectName}</h2>
                  <p>
                    <strong>Description:</strong> {assignment.projectDescription}
                  </p>

                  <input
                    type="file"
                    id={`file-input-${assignment.id}`}
                    onChange={(e) => handleFileSelection(e, assignment.id)}
                    className="upload-input"
                    disabled={assignment.status === "Done" || uploadedFiles[assignment.id]}
                  />

                  {uploadedFiles[assignment.id] && (
                    <button
                      onClick={() => handleRemoveFile(assignment.id)}
                      className="remove-file-button"
                    >
                      Remove File
                    </button>
                  )}

                  {uploadedFiles[assignment.id] &&
                    uploadedFiles[assignment.id].type === "text/plain" && (
                      <textarea
                        value={fileContent[assignment.id] || ""}
                        onChange={(e) => handleFileContentChange(e, assignment.id)}
                        className="file-edit-textarea"
                        disabled={assignment.status === "Done"}
                      />
                    )}

                  {uploadedFiles[assignment.id] &&
                    uploadedFiles[assignment.id].type.startsWith("image/") && (
                      <div className="image-preview">
                        <img
                          src={URL.createObjectURL(uploadedFiles[assignment.id])}
                          alt="File preview"
                          className="preview-img"
                        />
                      </div>
                    )}

                  <button
                    className={`mark-done-button ${
                      assignment.status === "Done" ? "done" : ""
                    }`}
                    onClick={() =>
                      handleMarkAsDone(assignment.id, assignment.projectName)
                    }
                    disabled={
                      assignment.status === "Done" || !uploadedFiles[assignment.id]
                    }
                  >
                    {assignment.status === "Done" ? "Done" : "Mark as Done"}
                  </button>
                </div>
              ))}
            </div>

            <div className="pagination">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </StudentHome>
  );
};

export default StudentAssignment;

import React, { useState, useEffect } from "react";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]); // Store current team members
  const [newMembers, setNewMembers] = useState({ member1: "", member2: "" }); // Inputs for new members
  const [tasks, setTasks] = useState({}); // Store tasks for team members
  const [savedTasks, setSavedTasks] = useState(false); // Track if tasks have been saved
  const [successMessage, setSuccessMessage] = useState(""); // Success feedback message
  const [teamLeader, setTeamLeader] = useState(""); // Store Team Leader name
  const [viewMembers, setViewMembers] = useState(false); // Toggle view of team members

  // Get the logged-in user's name from localStorage or any other authentication method
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("userDetails"));
    if (loggedInUser && loggedInUser.name) {
      setTeamLeader(loggedInUser.name); // Set the team leader's name from logged-in user
    }
  }, []);

  // Handle input changes for new members
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMembers((prev) => ({ ...prev, [name]: value }));
  };

  // Handle task input change
  const handleTaskChange = (e, member) => {
    const { value } = e.target;
    setTasks((prev) => ({
      ...prev,
      [member]: value,
    }));
  };

  // Handle form submission for adding members
  const handleAddMembers = () => {
    if (!newMembers.member1 || !newMembers.member2) {
      alert("Please fill out both member names.");
      return;
    }

    // Add team leader and new members to the team list
    setTeamMembers([teamLeader, newMembers.member1, newMembers.member2]);
    setNewMembers({ member1: "", member2: "" }); // Reset input fields
    setSuccessMessage("Team members added successfully!"); // Success message
  };

  // Save tasks for all team members
  const handleSaveTasks = () => {
    if (Object.keys(tasks).length === teamMembers.length) {
      setSavedTasks(true); // Mark that tasks have been saved
    } else {
      alert("Please assign tasks to all team members.");
    }
  };

  // Toggle visibility of team members
  const toggleViewMembers = () => {
    setViewMembers((prev) => !prev);
  };

  return (
    <div className="team-container">
      <h1>Team Management</h1>

      {/* Add Remaining Members */}
      <div className="add-members-form">
        <h3>Add Remaining Team Members</h3>
        <div>
          <label>
            Member 1 Name:
            <input
              type="text"
              name="member1"
              value={newMembers.member1}
              onChange={handleInputChange}
              placeholder="Enter Member 1 name"
            />
          </label>
        </div>
        <div>
          <label>
            Member 2 Name:
            <input
              type="text"
              name="member2"
              value={newMembers.member2}
              onChange={handleInputChange}
              placeholder="Enter Member 2 name"
            />
          </label>
        </div>
        <button onClick={handleAddMembers}>Add Members</button>
      </div>

      {/* Success Message */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      {/* Button to View Team Members */}
      <button onClick={toggleViewMembers}>
        {viewMembers ? "Hide Team Members" : "View Team Members"}
      </button>

      {/* Display Team Members */}
      {viewMembers && (
        <div>
          <h3>Current Team Members:</h3>
          {teamMembers.length > 0 ? (
            <ul>
              {teamMembers.map((member, index) => (
                <li key={index}>
                  {member}{" "}
                  {/* Add Task Input for each member */}
                  <input
                    type="text"
                    placeholder={`Enter task for ${member}`}
                    value={tasks[member] || ""}
                    onChange={(e) => handleTaskChange(e, member)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p>No team members added yet.</p>
          )}

          {/* Save Tasks Button */}
          <button onClick={handleSaveTasks}>Save Tasks</button>
        </div>
      )}

      {/* Show Saved Tasks */}
      {savedTasks && (
        <div>
          <h3>Team Details with Tasks:</h3>
          <p><strong>Team Leader:</strong> {teamLeader}</p>
          <ul>
            {teamMembers.map((member, index) => (
              <li key={index}>
                <strong>{member}:</strong> {tasks[member] || "No task assigned"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Team;

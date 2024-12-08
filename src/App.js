import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn"; // Correct casing
import Signup from "./components/Signup";
import TeacherHome from "./components/Teachercomponents/TeacherHome";
import StudentHome from "./components/Studentcomponents/StudentHome";
import Resources from "./components/Teachercomponents/Resources";
import AssignmentManagement from "./components/Teachercomponents/AssignmentManagement";
import StudentAssignment from "./components/Studentcomponents/StudentAssignment";
import ClassOverview from "./components/Teachercomponents/ClassOverview";
import TeacherProfile from "./components/Teachercomponents/TeacherProfile";
import StudentProfile from "./components/Studentcomponents/StudentProfile";
import ChildrenProgress from "./components/Teachercomponents/ChildrenProgress";
import Team from "./components/Studentcomponents/Team"; // Added import for Team component
import Progress from "./components/Studentcomponents/Progress"; // Import Progress component
import Git from "./components/Studentcomponents/Git"; // Import Progress component
import FeedBack from "./components/Studentcomponents/Feedback"; // Import Progress component
import TeacherDashboard from "./components/Teachercomponents/TeacherDashboard";

import { Monitor } from "@mui/icons-material";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} /> {/* Redirect to Signup */}
          <Route path="/signup" element={<Signup />} /> {/* Signup page */}
          <Route path="/signin" element={<SignIn />} /> {/* Signin page */}
          <Route path="/teacherhome" element={<TeacherHome />} />
          <Route path="/studenthome" element={<StudentHome />} />
          <Route path="/team" element={<Team />} /> {/* Fixed casing in path */}
          <Route path="/progress" element={<Progress />} /> {/* Fixed casing in path */}
          <Route path="/git" element={<Git />} /> {/* Fixed casing in path */}
          <Route path="/feedback" element={<FeedBack />} /> {/* Fixed casing in path */}

          <Route path="/Teacher-Dashboard" element={<TeacherDashboard />} />
          <Route path="/project-assignment" element={<AssignmentManagement />} />
          <Route path="/project-management" element={<StudentAssignment />} />
          <Route path="/class-overview" element={<ClassOverview />} />
          <Route path="/teacherprofile" element={<TeacherProfile />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/children-progress/:email" element={<ChildrenProgress />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

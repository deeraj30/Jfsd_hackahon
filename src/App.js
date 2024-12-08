import React from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SignIn from "./components/SignIn";
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
import Team from "./components/Studentcomponents/Team";
import Progress from "./components/Studentcomponents/Progress";
import Git from "./components/Studentcomponents/Git";
import FeedBack from "./components/Studentcomponents/Feedback";
import TeacherDashboard from "./components/Teachercomponents/TeacherDashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/teacherhome" element={<TeacherHome />} />
          <Route path="/studenthome" element={<StudentHome />} />
          <Route path="/team" element={<Team />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/git" element={<Git />} />
          <Route path="/feedback" element={<FeedBack />} />
          <Route path="/Teacher-Dashboard" element={<TeacherDashboard />} />
          <Route path="/project-assignment" element={<AssignmentManagement />} />
          <Route path="/project-management" element={<StudentAssignment />} />
          <Route path="/class-overview" element={<ClassOverview />} />
          <Route path="/teacherprofile" element={<TeacherProfile />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/children-progress/:email" element={<ChildrenProgress />} />
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

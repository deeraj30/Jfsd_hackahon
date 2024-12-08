import React from 'react';
import { Link } from 'react-router-dom';
import './StudentHome.css';

const StudentHome = ({ children }) => {
    return (
        <div className="student-dashboard">
            <header className="navbar">
                <h1 className="navbar-title">Student Dashboard</h1>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/Team"><pre>Team Details</pre></Link></li>
                        <li><Link to="/Progress"><pre>Progress Tracking</pre></Link></li>
                        <li><Link to="/Project-Management"><pre>Project Submission</pre></Link></li>

                        <li><Link to="/git"><pre>Git-Hub Link Submission Portal</pre></Link></li>
                        <li><Link to="/feedback"><pre>FeedBack</pre></Link></li>
                        <li><Link to="/studentprofile">Profile</Link></li>
                        <Link to="/signin" className="logout">Logout</Link>
                    </ul>
                </nav>
            </header>
            <main className="dashboard-content">
                {children}
            </main>
        </div>
    );
};

export default StudentHome;

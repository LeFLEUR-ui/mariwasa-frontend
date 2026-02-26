import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn"; // adjust the path
import CreateAccount from "./pages/CreateAccount";
import CareersPage from "./pages/CareersPage";
import LandingPage from "./pages/LandingPage";
import ApplyPage from "./pages/ApplyPage";
import HRDashboard from "./pages/HRDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/*USER MANAGEMENT*/}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<CreateAccount />} />

        {/*BEN ETLOGAN*/}
        {/* PUTANGINAMO TALAGA RICHARD GAGO KA! */}
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply/:jobId" element={<ApplyPage />} />
        <Route path="/hrdashboard" element={<HRDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
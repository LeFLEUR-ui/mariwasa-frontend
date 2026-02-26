import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn"; // adjust the path
import CreateAccount from "./pages/CreateAccount";
import CareersPage from "./pages/CareersPage";
import LandingPage from "./pages/LandingPage";
import ApplyPage from "./pages/ApplyPage";
import HRDashboard from "./pages/HRDashboard";
import SubmissionSuccess from "./pages/SubmissionSuccess";

function App() {
  return (
    <Router>
      <Routes>
        {/*USER MANAGEMENT*/}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<CreateAccount />} />

        {/*BEN ETLOGAN*/}
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply/:jobId" element={<ApplyPage />} />
        <Route path="/hrdashboard" element={<HRDashboard />} />
        <Route path="/success" element={<SubmissionSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
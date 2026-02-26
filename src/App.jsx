// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn"; // adjust the path
import CreateAccount from "./pages/CreateAccount";
import CareersPage from "./pages/CareersPage";
import LandingPage from "./pages/LandingPage";
import ApplyPage from "./pages/ApplyPage";

function App() {
  return (
    <Router>
      <Routes>
        /** USER REGISTRATIONN */
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<CreateAccount />} />

        /** betlogs */
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/apply/:jobId" element={<ApplyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
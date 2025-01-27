import "./App.css";
import { Box } from "@mui/material";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import CreateCampaignWrapper from "./pages/campaigns/CreateCampaignWrapper";
import FillCampaignDetails from "./pages/campaigns/FillCampaignDetails";
import ReviewCampaignDetails from "./pages/campaigns/ReviewCampaignDetails";
import HomePage from "./pages/HomePage";
import ActiveCampaigns from "./pages/campaigns/ActiveCampaigns";
import AuthProvider from "./contexts/AuthContext";
import Profile from "./pages/Profile";
import ViewCampaign from "./pages/campaigns/ViewCampaign";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProtectedRoute from "./components/AuthProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import { UseWalletProvider } from "use-wallet";

function App() {
  return (
    <UseWalletProvider
      chainId={31337}
      connectors={{
        walletconnect: {
          rpcUrl: "http://127.0.0.1:8545",
        },
      }}
    >
      <Router>
        <AuthProvider>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/profile"
              element={
                <AuthProtectedRoute>
                  <Profile />
                </AuthProtectedRoute>
              }
            />
            <Route
              path="/create-campaign"
              element={
                <FillCampaignDetails />
              }
            />
            <Route path="/active-campaigns" element={<ActiveCampaigns />} />
            <Route path="/campaign/*" element={<ViewCampaign />} />
          </Routes>
        </AuthProvider>
      </Router>
    </UseWalletProvider>
  );
}

export default App;

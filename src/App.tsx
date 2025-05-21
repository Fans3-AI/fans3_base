import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { initMessage } from "./utils/message";

const App: React.FC = () => {
  const messageContextHolder = initMessage();

  return (
    <>
      {messageContextHolder}
      <Router>
        <AppRoutes />
      </Router>
    </>
  );
};

export default App;

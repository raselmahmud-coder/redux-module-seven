import Layout from "./components/Layout";
import Balance from "./components/Balance";
import Form from "./components/Form";
import Transactions from "./components/Transactions/Transactions";
import "./app.css";
import { Routes, Route } from "react-router-dom";
import ViewAll from "./components/ViewAll";
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Balance />
            <Form />
            <Transactions />
          </Layout>
        }
      />
      <Route
        path="/view-all"
        element={
          <Layout>
            <ViewAll />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;

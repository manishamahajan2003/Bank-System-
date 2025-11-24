import { BrowserRouter, Routes, Route } from "react-router-dom";
import BankerLogin from "./pages/BankerLogin";
import BankerAccounts from "./pages/BankerAccounts";
import CustomerTransactions from "./pages/CustomerTransactions.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BankerLogin />} />
        <Route path="/accounts" element={<BankerAccounts />} />
        <Route path="/customer/:id/transactions" element={<CustomerTransactions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

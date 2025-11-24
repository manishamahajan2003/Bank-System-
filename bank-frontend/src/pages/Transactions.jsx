import { useEffect, useState } from "react";
import { getTransactions, setAuthToken } from "../api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [balance, setBalance] = useState(0);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalAmount, setModalAmount] = useState("");
  const [modalError, setModalError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    setAuthToken(token);
    fetchTransactions();
  }, [navigate, token]);

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data.transactions || []);
      let bal = 0;
      res.data.transactions.forEach((txn) => {
        bal += txn.type === "Deposit" ? txn.amount : -txn.amount;
      });
      setBalance(bal);
    } catch (err) {
      console.error(err);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (type) => {
    setModalType(type);
    setModalAmount("");
    setModalError("");
    setIsModalOpen(true);
    setMessage("");
  };

  const handleAmountChange = (value) => {
    setModalAmount(value);
    const amount = Number(value);

    if (!amount || amount <= 0) {
      setModalError("Enter a valid amount");
    } else if (modalType === "Withdraw" && amount > balance) {
      setModalError("Insufficient Funds");
    } else {
      setModalError("");
    }
  };

  const handleTransaction = async () => {
    const amount = Number(modalAmount);
    if (modalError) return;

    try {
      const res = await axios.post(
        "bank-system-pq3p.onrender.com/api/transactions",
        { type: modalType, amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBalance(modalType === "Deposit" ? balance + amount : balance - amount);
      setTransactions([res.data.transaction, ...transactions]);
      setMessage(`${modalType} successful!`);
      setIsModalOpen(false);
      setModalAmount("");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Transaction failed");
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-50 flex flex-col items-center p-8">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <h2 className="text-4xl font-bold text-center mb-6 text-blue-700">
          My Bank Transactions
        </h2>

        {/* Balance Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-6 flex justify-between items-center border-l-4 border-blue-600">
          <div>
            <p className="text-gray-500">Available Balance</p>
            <p className="text-3xl font-bold text-blue-700">{balance}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => openModal("Deposit")}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Deposit
            </button>
            <button
              onClick={() => openModal("Withdraw")}
              className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition"
            >
              Withdraw
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <p className="text-center text-blue-600 font-semibold mb-4">{message}</p>
        )}

        {/* Transactions List */}
        <div className="bg-white shadow-lg rounded-2xl p-6 max-h-[400px] overflow-y-auto border border-blue-200">
          {loading ? (
            <p className="text-center text-gray-500">Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p className="text-center text-gray-500">No transactions yet.</p>
          ) : (
            <div className="space-y-3">
              {transactions.map((txn) => (
                <div
                  key={txn._id}
                  className="flex justify-between items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition"
                >
                  <div>
                    <p className="text-gray-500 text-sm">
                      {new Date(txn.date).toLocaleString()}
                    </p>
                    <p
                      className={`font-semibold ${
                        txn.type === "Deposit" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {txn.type}
                    </p>
                  </div>
                  <p className="font-bold text-lg text-blue-700">{txn.amount}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-center text-blue-700">{modalType}</h3>
            <p className="mb-4 text-center text-gray-700">
              Available Balance: <span className="font-semibold">{balance}</span>
            </p>
            <input
              type="number"
              placeholder="Enter amount"
              value={modalAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none mb-2"
            />
            {modalError && (
              <p className="text-red-600 font-semibold text-center mb-4">
                {modalError}
              </p>
            )}
            <div className="flex justify-between gap-4">
              <button
                onClick={handleTransaction}
                disabled={!!modalError}
                className={`flex-1 p-3 rounded-xl transition text-white ${
                  modalError
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                Confirm
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-300 text-gray-700 p-3 rounded-xl hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

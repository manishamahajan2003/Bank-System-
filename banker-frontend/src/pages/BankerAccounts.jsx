// import { useEffect, useState } from "react";
// import { getAllAccounts } from "../api";
// import { useNavigate } from "react-router-dom";

// export default function BankerAccounts() {
//   const [accounts, setAccounts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("bankerToken");

//   useEffect(() => {
//     if (!token) {
//       window.location.href = "/";
//       return;
//     }

//     loadAccounts();
//   }, []);

//   const loadAccounts = async () => {
//     try {
//       const res = await getAllAccounts(token);
//       setAccounts(res.data);
//     } catch (err) {
//       console.error("Error loading accounts:", err);
//     }
//     setLoading(false);
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen text-xl font-semibold">
//         Loading...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
//         <h1 className="text-3xl font-bold mb-6 text-center">
//           All Customer Accounts
//         </h1>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left border border-gray-300 rounded-xl overflow-hidden">
//             <thead className="bg-blue-600 text-white">
//               <tr>
//                 <th className="p-3">Full Name</th>
//                 <th className="p-3">Mobile</th>
//                 <th className="p-3">Aadhar</th>
//                 <th className="p-3">Email</th>
//                 <th className="p-3">Account Number</th>
//               </tr>
//             </thead>

//             <tbody className="bg-white">
//               {accounts.map((acc, idx) => (
//                 <tr
//                   key={acc._id}
//                   className={`border-b cursor-pointer transition ${
//                     idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                   } hover:bg-blue-50`}
//                   onClick={() =>
//                     navigate(`/customer/${acc._id}/transactions`)
//                   }
//                 >
//                   <td className="p-3">{acc.fullName}</td>
//                   <td className="p-3">{acc.mobile}</td>
//                   <td className="p-3">{acc.aadhar}</td>
//                   <td className="p-3">{acc.email}</td>
//                   <td className="p-3 font-semibold">{acc.accountNumber}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }









import { useEffect, useState } from "react";
import { getAllAccounts } from "../api";
import { useNavigate } from "react-router-dom";

export default function BankerAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("bankerToken");

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
      return;
    }

    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const res = await getAllAccounts(token);
      setAccounts(res.data);
    } catch (err) {
      console.error("Error loading accounts:", err);
    }
    setLoading(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6">
        
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          All Customer Accounts
        </h1>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border border-gray-300 rounded-xl overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Full Name</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Aadhar</th>
                <th className="p-3">Email</th>
                <th className="p-3">Account Number</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {accounts.map((acc, idx) => (
                <tr
                  key={acc._id}
                  className={`border-b cursor-pointer transition ${
                    idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50`}
                  onClick={() => navigate(`/customer/${acc._id}/transactions`)}
                >
                  <td className="p-3">{acc.fullName}</td>
                  <td className="p-3">{acc.mobile}</td>
                  <td className="p-3">{acc.aadhar}</td>
                  <td className="p-3">{acc.email}</td>
                  <td className="p-3 font-semibold">{acc.accountNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {accounts.map((acc) => (
            <div
              key={acc._id}
              className="bg-gray-50 p-4 rounded-xl shadow cursor-pointer hover:bg-blue-50 transition"
              onClick={() => navigate(`/customer/${acc._id}/transactions`)}
            >
              <p className="text-lg font-semibold text-blue-700">
                {acc.fullName}
              </p>
              <p className="text-gray-700"><span className="font-semibold">Mobile:</span> {acc.mobile}</p>
              <p className="text-gray-700"><span className="font-semibold">Aadhar:</span> {acc.aadhar}</p>
              <p className="text-gray-700"><span className="font-semibold">Email:</span> {acc.email}</p>
              <p className="text-gray-800 font-bold mt-1">
                A/C: {acc.accountNumber}
              </p>

              <div className="mt-3 text-right">
                <span className="text-blue-600 font-semibold underline">
                  View Transactions →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

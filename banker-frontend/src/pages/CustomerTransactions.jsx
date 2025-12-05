// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { getCustomerTransactions } from "../api";

// export default function CustomerTransactions() {
//   const { id } = useParams();
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadTxns = async () => {
//       try {
//         const res = await getCustomerTransactions(id);
//         setTransactions(res.data.transactions);
//       } catch (err) {
//         console.error("Error loading transactions:", err);
//       }
//       setLoading(false);
//     };
//     loadTxns();
//   }, [id]);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen text-xl font-semibold">
//         Loading...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        
//         {/* Back Button */}
//         <Link
//           to="/accounts"
//           className="inline-block px-4 py-2 mb-6 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition"
//         >
//           ⬅ Back to Accounts
//         </Link>

//         <h1 className="text-3xl font-bold mb-6 text-center">
//           Customer Transaction History
//         </h1>

//         {transactions.length === 0 ? (
//           <p className="text-center text-gray-600 p-4">
//             No transactions found.
//           </p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-left border border-gray-300 rounded-xl overflow-hidden">
//               <thead className="bg-blue-600 text-white">
//                 <tr>
//                   <th className="p-3">Type</th>
//                   <th className="p-3">Amount</th>
//                   <th className="p-3">Date</th>
//                 </tr>
//               </thead>

//               <tbody className="bg-white">
//                 {transactions.map((txn, idx) => (
//                   <tr
//                     key={txn._id}
//                     className={`border-b ${
//                       idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                     }`}
//                   >
//                     <td className="p-3 font-semibold">
//                       <span
//                         className={`px-3 py-1 rounded-full text-white ${
//                           txn.type === "Deposit"
//                             ? "bg-green-600"
//                             : "bg-red-600"
//                         }`}
//                       >
//                         {txn.type}
//                       </span>
//                     </td>

//                     <td className="p-3 text-lg font-semibold">
//                       ₹{txn.amount}
//                     </td>

//                     <td className="p-3 text-gray-600">
//                       {new Date(txn.date).toLocaleString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }










import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCustomerTransactions } from "../api";

export default function CustomerTransactions() {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTxns = async () => {
      try {
        const res = await getCustomerTransactions(id);
        setTransactions(res.data.transactions);
      } catch (err) {
        console.error("Error loading transactions:", err);
      }
      setLoading(false);
    };
    loadTxns();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">

        {/* Back Button */}
        <Link
          to="/accounts"
          className="inline-block px-4 py-2 mb-6 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition"
        >
          ⬅ Back to Accounts
        </Link>

        <h1 className="text-3xl font-bold mb-6 text-center">
          Customer Transaction History
        </h1>

        {transactions.length === 0 ? (
          <p className="text-center text-gray-600 p-4">No transactions found.</p>
        ) : (
          <>
            {/* Mobile Cards */}
            <div className="space-y-4 md:hidden">
              {transactions.map((txn) => (
                <div
                  key={txn._id}
                  className="border rounded-xl p-4 bg-gray-50 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        txn.type === "Deposit" ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {txn.type}
                    </span>
                    <p className="font-bold text-lg text-blue-700">
                      ₹{txn.amount}
                    </p>
                  </div>

                  <p className="text-gray-600 text-sm">
                    {new Date(txn.date).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full text-left border border-gray-300 rounded-xl overflow-hidden">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-3">Type</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>

                <tbody className="bg-white">
                  {transactions.map((txn, idx) => (
                    <tr
                      key={txn._id}
                      className={`border-b ${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      <td className="p-3 font-semibold">
                        <span
                          className={`px-3 py-1 rounded-full text-white ${
                            txn.type === "Deposit"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {txn.type}
                        </span>
                      </td>

                      <td className="p-3 text-lg font-semibold">₹{txn.amount}</td>

                      <td className="p-3 text-gray-600">
                        {new Date(txn.date).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


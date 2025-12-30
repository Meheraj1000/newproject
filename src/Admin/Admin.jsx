import React from "react";
import Swal from "sweetalert2";

const Admin = ({
  requests = [],        // Default empty array
  setRequests,
  setBalance,
  virtues = [],
  setVirtues,
  products = [],
  setProducts,
}) => {

  // --- ব্যবহারকারীর ক্রয় অনুরোধ অনুমোদন বা বাতিল ---
  const handleDecision = (index, approve) => {
    const request = requests[index];

    if (!request) return; // safety check

    if (approve) {
      // অনুমোদন হলে
      setBalance((prev) => prev - request.price); // ব্যালেন্স কেটে দাও
      setVirtues([...virtues, request]);         // virtues এ যোগ করো
      Swal.fire("সফল!", "পণ্য ক্রয় অনুমোদিত হয়েছে।", "success");
    } else {
      // বাতিল হলে
      Swal.fire("বাতিল!", "পণ্য ক্রয় অনুমোদিত হয়নি।", "error");
    }

    // অনুরোধ remove করা
    const updatedRequests = [...requests];
    updatedRequests.splice(index, 1);
    setRequests(updatedRequests);
  };

  return (
    <div className="p-5 space-y-10">

      {/* --- ব্যবহারকারীর ক্রয় অনুরোধ --- */}
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-5">ক্রয় অনুরোধসমূহ</h2>

        {requests.length === 0 ? (
          <p>কোনো অনুরোধ নেই।</p>
        ) : (
          <div className="space-y-3">
            {requests.map((req, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center p-3 border rounded bg-white shadow"
              >
                <div>
                  <p className="font-semibold">{req.name}</p>
                  <p>মূল্য: Tk {req.price}</p>
                  <p>স্ট্যাটাস: {req.userAction}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision(idx, true)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    অনুমোদন
                  </button>
                  <button
                    onClick={() => handleDecision(idx, false)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    বাতিল
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

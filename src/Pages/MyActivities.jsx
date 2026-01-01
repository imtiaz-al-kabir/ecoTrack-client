import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Loading from "../Components/Loading";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";

const STATUS_OPTIONS = ["Not Started", "Ongoing", "Finished"];

const getChallengeIdString = (challengeId) => {
  if (!challengeId) return "";
  if (typeof challengeId === "string") return challengeId;
  if (challengeId.$oid) return challengeId.$oid;
  return challengeId.toString();
};

const MyActivities = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosInstance();
  const [joined, setJoined] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJoined = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/userChallenges/${user.email}`);
      setJoined(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load joined challenges");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoined();
  }, [user?.email]);

  const handleStatusChange = async (jcId, jcItem, newStatus) => {
    const prev = joined;
    setJoined((s) =>
      s.map((j) => (j._id === jcId ? { ...j, status: newStatus } : j))
    );

    const challengeIdStr = getChallengeIdString(jcItem.challengeId);

    try {
      await axiosInstance.patch(
        `/userChallenges/${encodeURIComponent(user.email)}/${encodeURIComponent(
          challengeIdStr
        )}`,
        { status: newStatus }
      );
      toast.success("Status updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
      setJoined(prev);
    }
  };

  if (!user)
    return <p className="p-4 text-center text-gray-700">Please log in to view your joined challenges.</p>;
  if (loading) return <Loading />;
  if (!joined.length)
    return <p className="p-4 text-center text-gray-700">You haven't joined any challenges yet.</p>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Activities</h2>
          <p className="text-gray-500 text-sm">Track your progress on joined challenges.</p>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-gray-50 text-gray-500 font-semibold uppercase text-xs">
            <tr>
              <th className="py-4 pl-6">Challenge</th>
              <th>Joined Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {joined.map((jc) => {
              const challengeIdStr = getChallengeIdString(jc.challengeId);
              // In a real app we might want to fetch challenge details to show title instead of ID
              return (
                <tr key={jc._id} className="hover:bg-gray-50 transition-colors">
                  <td className="pl-6 py-4">
                    <div className="font-bold text-gray-800 break-all">{challengeIdStr}</div>
                    <div className="text-xs text-gray-400">ID Reference</div>
                  </td>
                  <td>
                    {jc.joinDate ? new Date(jc.joinDate).toLocaleDateString() : "—"}
                  </td>
                  <td>
                    <span className={`badge border-0 font-medium ${jc.status === "Finished" ? "bg-green-100 text-green-600" :
                        jc.status === "Ongoing" ? "bg-blue-100 text-blue-600" :
                          "bg-gray-100 text-gray-600"
                      }`}>
                      {jc.status || "Not Started"}
                    </span>
                  </td>
                  <td>
                    <select
                      value={jc.status || "Not Started"}
                      onChange={(e) => handleStatusChange(jc._id, jc, e.target.value)}
                      className="select select-bordered select-sm w-full max-w-xs focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyActivities;

import { useContext, useEffect, useState } from "react";
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
    return <p className="p-4">Please log in to view your joined challenges.</p>;
  if (loading) return <Loading />;
  if (!joined.length)
    return <p className="p-4">You haven't joined any challenges yet.</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-4">
      <h2 className="text-2xl font-bold">My Joined Challenges</h2>

      <div className="grid grid-cols-1  gap-4">
        {joined.map((jc) => {
          const challengeIdStr = getChallengeIdString(jc.challengeId);
          return (
            <div
              key={jc._id}
              className="p-4  rounded-lg bg-green-200 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between "
            >
              <div className="mb-3 md:mb-0">
                <p>
                  <span className="font-semibold">Challenge ID:</span>{" "}
                  <span className="break-all">{challengeIdStr}</span>
                </p>
                <p>
                  <span className="font-semibold">Joined:</span>{" "}
                  {jc.joinDate
                    ? new Date(jc.joinDate).toLocaleDateString()
                    : "—"}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <div>
                  <label className="block text-sm text-gray-700 font-semibold">
                    Status
                  </label>
                  <select
                    value={jc.status || "Not Started"}
                    onChange={(e) =>
                      handleStatusChange(jc._id, jc, e.target.value)
                    }
                    className="mt-1 block rounded-md border px-3 py-1"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyActivities;

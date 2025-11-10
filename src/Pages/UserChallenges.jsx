import { useEffect, useState } from "react";
import useAxiosInstance from "../Hook/useAxiosInstance";

const UserChallenges = () => {
  const axiosInstance = useAxiosInstance();
  const [joined, setJoined] = useState([]);

  useEffect(() => {
    axiosInstance.get("/userChallenges").then((res) => setJoined(res.data));
  }, [axiosInstance]);

  const statusColors = {
    "Not Started": "text-gray-500",
    Ongoing: "text-yellow-500",
    Finished: "text-green-500",
  };

  return (
    <div className="container mx-auto py-10 space-y-4 px-5">
      <h2 className="text-2xl font-bold">All Joined Challenges</h2>
      <div className="grid grid-cols-1  nd:grid-cols-2 lg:grid-cols-3 gap-5">
        {joined.map((jc) => (
          <div key={jc._id} className="p-4 g rounded-lg shadow-sm bg-green-200 ">
            <p>
              <span className="font-semibold">User:</span> {jc.userId}
            </p>
            <p>
              <span className="font-semibold">Challenge ID:</span>{" "}
              {jc.challengeId}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className={statusColors[jc.status] || "text-gray-500"}>
                {jc.status}
              </span>
            </p>
            <p>
              <span className="font-semibold">Joined:</span>{" "}
              {new Date(jc.joinDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserChallenges;

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";

const UserChallenges = () => {
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosInstance();
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);
    // Fetch all challenges and filter client-side for now, or use a specific query if available
    axiosInstance.get("/challenges")
      .then((res) => {
        const myChallenges = res.data.filter(c => c.createdBy === user.email);
        setChallenges(myChallenges);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user, axiosInstance]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the challenge!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`/challenges/${id}`);
          setChallenges(prev => prev.filter(c => c._id !== id));
          Swal.fire("Deleted!", "Challenge has been deleted.", "success");
        } catch (err) {
          console.error("Error deleting challenge:", err);
          Swal.fire("Error", "Failed to delete challenge.", "error");
        }
      }
    });
  };

  if (loading) return <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg text-primary"></span></div>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Created Challenges</h2>
          <p className="text-sm text-gray-500">Manage challenges you have posted.</p>
        </div>
        <Link to="/dashboard/add-challenge" className="btn btn-primary text-white btn-sm gap-2">
          <FaPlus /> Create New
        </Link>
      </div>

      {challenges.length === 0 ? (
        <div className="text-center py-10 bg-base-100 rounded-2xl border border-dashed border-gray-300">
          <h3 className="text-lg font-medium text-gray-500">You haven't created any challenges yet.</h3>
          <Link to="/dashboard/add-challenge" className="btn btn-link no-underline text-primary">Create your first challenge</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map(challenge => (
            <div key={challenge._id} className="card bg-base-100 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <figure className="h-48 overflow-hidden relative">
                <img src={challenge.photo} alt={challenge.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 badge badge-secondary">{challenge.category}</div>
              </figure>
              <div className="card-body p-4">
                <h3 className="card-title text-base font-bold truncate">{challenge.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{challenge.description}</p>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded">{challenge.participants || 0} Joined</div>
                  <div className="flex gap-2">
                    <Link to={`/dashboard/update-challenge/${challenge._id}`} className="btn btn-square btn-xs btn-outline btn-info">
                      <FaEdit />
                    </Link>
                    <button onClick={() => handleDelete(challenge._id)} className="btn btn-square btn-xs btn-outline btn-error">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserChallenges;

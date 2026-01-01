import { motion } from "motion/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";

const UpdateChallenge = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const { data } = await axiosInstance.get(`/challenges/${id}`);
        setChallenge(data);
      } catch (err) {
        console.error("Error fetching challenge:", err);
        Swal.fire("Error", "Failed to load challenge data", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchChallenge();
  }, [id, axiosInstance]);


  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedChallenge = {
      title: e.target.title.value,
      category: e.target.category.value,
      description: e.target.description.value,
      duration: e.target.duration.value,
      target: e.target.target.value,
      impact: e.target.impact.value,
      photo: e.target.photo.value,
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
    };

    try {
      const res = await axiosInstance.patch(
        `/challenges/${id}`,
        updatedChallenge
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", "Challenge updated successfully.", "success");
        navigate(`/challenges/${id}`);
      } else {
        Swal.fire("No Changes", "No updates were made.", "info");
      }
    } catch (err) {
      console.error("Error updating challenge:", err);
      Swal.fire("Error", "Failed to update challenge", "error");
    }
  };

  if (loading) return <Loading />;
  if (!challenge)
    return (
      <p className="text-center py-10 text-gray-600">Challenge not found.</p>
    );


  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Update Challenge</h2>
          <p className="text-gray-500 text-sm">Modify existing challenge details.</p>
        </div>
        <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm">Cancel</button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto bg-white shadow-sm border border-gray-100 rounded-2xl p-8"
      >
        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              name="title"
              defaultValue={challenge.title}
              required
              className="input input-bordered w-full focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              placeholder="Enter challenge title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              name="category"
              defaultValue={challenge.category}
              required
              className="input input-bordered w-full focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              placeholder="Enter category"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={challenge.description}
              required
              className="textarea textarea-bordered w-full focus:ring-2 focus:ring-emerald-400 focus:outline-none text-base"
              rows="4"
              placeholder="Enter description"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (days)
            </label>
            <input
              name="duration"
              type="number"
              defaultValue={challenge.duration}
              required
              className="input input-bordered w-full focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target
            </label>
            <input
              name="target"
              defaultValue={challenge.target}
              required
              className="input input-bordered w-full focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Impact Metric
            </label>
            <input
              name="impact"
              defaultValue={challenge.impact}
              required
              className="input input-bordered w-full focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo URL
            </label>
            <input
              name="photo"
              defaultValue={challenge.photo}
              required
              className="input input-bordered w-full focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              name="startDate"
              type="date"
              defaultValue={
                new Date(challenge.startDate).toISOString().split("T")[0]
              }
              required
              className="input input-bordered w-full focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              name="endDate"
              type="date"
              defaultValue={
                new Date(challenge.endDate).toISOString().split("T")[0]
              }
              required
              className="input input-bordered w-full focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-4 pt-4">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-ghost">Cancel</button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn btn-primary text-white px-8"
            >
              Update Challenge
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateChallenge;

import { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import useAxiosSecure from "../Hook/useAxiosSecure";

const AddNewChallenge = () => {
  const { user } = use(AuthContext);
  const categories = [
    "Waste Reduction",
    "Energy Conservation",
    "Water Conservation",
    "Sustainable Transport",
    "Green Living",
  ];

  const axiosSecure = useAxiosSecure();

  const [duration, setDuration] = useState(0);
  const [errors, setErrors] = useState({});

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Auto-calculate duration
  useEffect(() => {
    if (startDate && endDate) {
      const s = new Date(startDate);
      const e = new Date(endDate);
      const diff = Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1;
      setDuration(diff > 0 ? diff : 0);
    }
  }, [startDate, endDate]);

  const validate = (form) => {
    const newErrors = {};
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const createdBy = form.createdBy.value.trim();
    const start = form.startDate.value;
    const end = form.endDate.value;

    if (!title) newErrors.title = "Title is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!start) newErrors.startDate = "Start date is required.";
    if (!end) newErrors.endDate = "End date is required.";
    if (start && end && new Date(end) < new Date(start))
      newErrors.endDate = "End date must be the same or after start date.";
    if (!createdBy || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(createdBy))
      newErrors.createdBy = "A valid email is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!validate(form)) return;

    const challengeData = {
      title: form.title.value,
      category: form.category.value,
      description: form.description.value,
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      duration,
      target: form.target.value,
      participants: 0,
      impact: form.impact.value,
      createdBy: form.createdBy.value,
      photo: form.photo.value,
    };

    try {
      axiosSecure.post("/challenges", challengeData).then((data) => {
        const result = data.data;
        if (result) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Challenge has been created",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Server error occurred.");
    }
  };

  return (
    <div className="container mx-auto pb-12 px-5">
      <h2 className="text-2xl font-semibold text-center py-10 ">
        Add New Challenge
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md space-y-6 "
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium">Title *</label>
            <input
              name="title"
              className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.title ? "border-red-400" : "border-gray-200"
              }`}
              placeholder="Plastic-Free July"
            />
            {errors.title && (
              <p className="text-xs text-red-600 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              name="category"
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Description *</label>
            <textarea
              name="description"
              rows={4}
              className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.description ? "border-red-400" : "border-gray-200"
              }`}
              placeholder="Describe the challenge and rules..."
            />
            {errors.description && (
              <p className="text-xs text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium">Start Date *</label>
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.startDate ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.startDate && (
              <p className="text-xs text-red-600 mt-1">{errors.startDate}</p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium">End Date *</label>
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.endDate ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.endDate && (
              <p className="text-xs text-red-600 mt-1">{errors.endDate}</p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium">Duration (days)</label>
            <input
              type="number"
              name="duration"
              value={duration}
              readOnly
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 bg-gray-50"
            />
            <p className="text-xs text-gray-500 mt-1">
              Auto-calculated from dates.
            </p>
          </div>

          {/* Target */}
          <div>
            <label className="block text-sm font-medium">Target</label>
            <input
              name="target"
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2"
              placeholder="Reduce plastic waste"
            />
          </div>

          {/* Impact */}
          <div>
            <label className="block text-sm font-medium">Impact Metric</label>
            <input
              name="impact"
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2"
              placeholder="kg plastic saved"
            />
          </div>

          {/* Created By */}
          <div>
            <label className="block text-sm font-medium">
              Created By (email) *
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              name="createdBy"
              readOnly
              className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                errors.createdBy ? "border-red-400" : "border-gray-200"
              }`}
              placeholder="admin@ecotrack.com"
            />
            {errors.createdBy && (
              <p className="text-xs text-red-600 mt-1">{errors.createdBy}</p>
            )}
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Image URL</label>
            <input
              name="photo"
              className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 font-medium shadow-sm"
            >
              Create Challenge
            </button>

            <button
              type="reset"
              onClick={() => {
                setStartDate("");
                setEndDate("");
                setDuration(0);
                setErrors({});
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewChallenge;

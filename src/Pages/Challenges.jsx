import { useEffect, useState, useContext } from "react";
import { ChallengeCard } from "../Components/ChallengeCard";
import SkeletonLoader from "../Components/SkeletonLoader";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";

const Challenges = () => {
  const axiosInstance = useAxiosInstance();
  const { loading } = useContext(AuthContext);

  // State
  const [challenges, setChallenges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minParticipants, setMinParticipants] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");

  const categories = [
    "Waste Reduction",
    "Energy Conservation",
    "Water Conservation",
    "Sustainable Transport",
    "Green Living",
  ];

  // Fetch challenges from backend
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const params = {};

        if (categoryFilter !== "all") params.categories = categoryFilter;
        if (startDate) params.startDate = startDate;
        if (endDate) params.endDate = endDate;
        if (minParticipants) params.minParticipants = minParticipants;
        if (maxParticipants) params.maxParticipants = maxParticipants;

        const res = await axiosInstance.get("/challenges", { params });
        setChallenges(res.data);
      } catch (err) {
        console.error("Error fetching challenges:", err);
      }
    };

    fetchChallenges();
  }, [axiosInstance, categoryFilter, startDate, endDate, minParticipants, maxParticipants]);

  // Filter search term client-side
  const filteredChallenges = challenges.filter((c) =>
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Filters Panel */}
      <div className="bg-white shadow-lg rounded-2xl p-6 mb-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative col-span-1 md:col-span-2">
          <input
            type="text"
            placeholder="Search challenges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle cx={11} cy={11} r={8} />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </div>

        {/* Category */}
        <select
          className="select w-full rounded-xl focus:ring-2 focus-within:outline-0 focus:ring-emerald-400"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Date Range */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="input input-bordered w-full rounded-xl focus:ring-2 focus-within:outline-0 focus:ring-emerald-400"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="input input-bordered w-full rounded-xl focus-within:outline-0 focus:ring-2 focus:ring-emerald-400"
        />

        {/* Participants Range */}
        <input
          type="number"
          placeholder="Min Participants"
          value={minParticipants}
          onChange={(e) => setMinParticipants(e.target.value)}
          className="input input-bordered w-full rounded-xl focus-within:outline-0 focus:ring-2 focus:ring-emerald-400"
        />
        <input
          type="number"
          placeholder="Max Participants"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(e.target.value)}
          className="input input-bordered w-full rounded-xl focus-within:outline-0 focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      {/* Challenges Grid */}
      {loading ? (
        <SkeletonLoader />
      ) : filteredChallenges.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No challenges found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge._id} challenge={challenge} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Challenges;

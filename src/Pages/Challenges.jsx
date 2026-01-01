import { useContext, useEffect, useState } from "react";
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
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = [
    "Waste Reduction",
    "Energy Conservation",
    "Water Conservation",
    "Sustainable Transport",
    "Green Living",
  ];

  // Fetch challenges
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const res = await axiosInstance.get("/challenges");
        setChallenges(res.data);
      } catch (err) {
        console.error("Error fetching challenges:", err);
      }
    };
    fetchChallenges();
  }, [axiosInstance]);

  // Derived state for filtering and sorting
  let processedChallenges = challenges.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || c.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Sorting
  processedChallenges.sort((a, b) => {
    if (sortBy === "duration_asc") return parseFloat(a.duration) - parseFloat(b.duration);
    if (sortBy === "duration_desc") return parseFloat(b.duration) - parseFloat(a.duration);
    if (sortBy === "participants_desc") return parseFloat(b.participants) - parseFloat(a.participants);
    if (sortBy === "participants_asc") return parseFloat(a.participants) - parseFloat(b.participants);
    return 0; // relevance
  });

  // Pagination
  const totalPages = Math.ceil(processedChallenges.length / itemsPerPage);
  const paginatedChallenges = processedChallenges.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto py-12 px-5 min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4 tracking-tight">
          Explore <span className="text-primary">Challenges</span>
        </h1>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Join a community of eco-conscious individuals and make a real difference.
        </p>
      </div>

      {/* Filters & Controls */}
      <div className="bg-base-100 shadow-xl border border-base-200 rounded-3xl p-6 mb-12 transform hover:scale-[1.01] transition-transform duration-300">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">

          {/* Search */}
          <div className="relative w-full lg:w-1/3 group">
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-12 rounded-full border-base-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-base-200/50 focus:bg-base-100"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40 group-focus-within:text-primary transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx={11} cy={11} r={8} />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </div>

          {/* Filters Group */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Category Filter */}
            <select
              className="select select-bordered rounded-full w-full sm:w-auto focus:outline-none focus:border-primary border-base-300"
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              className="select select-bordered rounded-full w-full sm:w-auto focus:outline-none focus:border-primary border-base-300"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="duration_asc">Duration: Shortest</option>
              <option value="duration_desc">Duration: Longest</option>
              <option value="participants_desc">Most Popular</option>
              <option value="participants_asc">Least Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Challenges Grid */}
      {loading ? (
        <SkeletonLoader />
      ) : processedChallenges.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-base-content">No challenges found</h3>
          <p className="text-base-content/60 mt-2">Try adjusting your filters or search terms.</p>
          <button
            className="btn btn-primary mt-6 rounded-full px-8 text-white"
            onClick={() => { setSearchTerm(""); setCategoryFilter("all"); }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {paginatedChallenges.map((challenge) => (
              <ChallengeCard key={challenge._id} challenge={challenge} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-2">
              <button
                className="btn btn-circle btn-sm btn-ghost"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                ❮
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`btn btn-circle btn-sm ${currentPage === i + 1 ? "btn-primary text-white" : "btn-ghost"}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="btn btn-circle btn-sm btn-ghost"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                ❯
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Challenges;

import { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";
import { FaFlag, FaUsers, FaTrophy, FaCalendarCheck, FaEdit, FaTrash } from "react-icons/fa";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Link } from "react-router";

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
        <div className={`p-4 rounded-xl ${color} text-white`}>
            {icon}
        </div>
        <div>
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
    </div>
);

const DashboardOverview = () => {
    const { user } = use(AuthContext);
    const axiosInstance = useAxiosInstance();
    const [stats, setStats] = useState({
        joined: 0,
        created: 0,
        completed: 0
    });
    const [challenges, setChallenges] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [pieData, setPieData] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        const fetchData = async () => {
            try {
                const [joinedRes, challengesRes] = await Promise.all([
                    axiosInstance.get(`/userChallenges/${user.email}`),
                    axiosInstance.get("/challenges")
                ]);

                const joinedChallenges = joinedRes.data;
                const allChallenges = challengesRes.data;
                const userCreatedChallenges = allChallenges.filter(c => c.createdBy === user.email);

                // Calculate stats
                const joinedCount = joinedChallenges.length;
                const createdCount = userCreatedChallenges.length;
                const completedCount = joinedChallenges.filter(c => c.status === "Finished").length;

                setStats({
                    joined: joinedCount,
                    created: createdCount,
                    completed: completedCount
                });

                // Set challenges for table (show user's created challenges)
                setChallenges(userCreatedChallenges.slice(0, 5));

                // Prepare chart data - challenges by category
                const categoryCount = {};
                allChallenges.forEach(challenge => {
                    const category = challenge.category || "Other";
                    categoryCount[category] = (categoryCount[category] || 0) + 1;
                });

                const barChartData = Object.entries(categoryCount).map(([category, count]) => ({
                    category,
                    count
                }));
                setChartData(barChartData);

                // Prepare pie chart data - user's challenge status
                const statusCount = {
                    Ongoing: joinedChallenges.filter(c => c.status === "Ongoing").length,
                    Finished: joinedChallenges.filter(c => c.status === "Finished").length,
                    Pending: joinedChallenges.filter(c => !c.status || c.status === "Pending").length,
                };

                const pieChartData = Object.entries(statusCount)
                    .filter(([_, count]) => count > 0)
                    .map(([status, count]) => ({
                        name: status,
                        value: count
                    }));
                setPieData(pieChartData);

            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchData();
    }, [user, axiosInstance]);

    const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.displayName?.split(' ')[0]}! 👋</h1>
                <p className="text-gray-500 text-sm mt-1">Here's what's happening with your eco-activities today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Joined Challenges"
                    value={stats.joined}
                    icon={<FaFlag size={20} />}
                    color="bg-blue-500"
                />
                <StatCard
                    title="Created Challenges"
                    value={stats.created}
                    icon={<FaUsers size={20} />}
                    color="bg-emerald-500"
                />
                <StatCard
                    title="Completed"
                    value={stats.completed}
                    icon={<FaTrophy size={20} />}
                    color="bg-orange-500"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart - Challenges by Category */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-6">Challenges by Category</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart - Your Challenge Status */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-6">Your Challenge Status</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Data Table - Your Created Challenges */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800">Your Created Challenges</h3>
                    <Link to="/dashboard/my-challenges" className="text-emerald-500 text-sm font-medium hover:underline">
                        View All
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Target
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {challenges.length > 0 ? (
                                challenges.map((challenge) => (
                                    <tr key={challenge._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{challenge.title}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800">
                                                {challenge.category || "General"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {challenge.target}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link
                                                to={`/dashboard/update-challenge/${challenge._id}`}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                <FaEdit className="inline" />
                                            </Link>
                                            <button className="text-red-600 hover:text-red-900">
                                                <FaTrash className="inline" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                        No challenges created yet. <Link to="/dashboard/add-challenge" className="text-emerald-500 hover:underline">Create one now!</Link>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;

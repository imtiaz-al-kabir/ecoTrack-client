import { use, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import useAxiosInstance from "../Hook/useAxiosInstance";
import { FaFlag, FaUsers, FaTrophy, FaCalendarCheck } from "react-icons/fa";

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

    useEffect(() => {
        if (!user?.email) return;

        // Fetch stats - simulated for now by fetching lists
        const fetchData = async () => {
            try {
                const [joinedRes, challengesRes] = await Promise.all([
                    axiosInstance.get(`/userChallenges/${user.email}`),
                    axiosInstance.get("/challenges")
                ]);

                const joinedCount = joinedRes.data.length;
                const createdCount = challengesRes.data.filter(c => c.createdBy === user.email).length;
                const completedCount = joinedRes.data.filter(c => c.status === "Finished").length;

                setStats({
                    joined: joinedCount,
                    created: createdCount,
                    completed: completedCount
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchData();
    }, [user, axiosInstance]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user?.displayName?.split(' ')[0]}! 👋</h1>
                <p className="text-gray-500 text-sm mt-1">Here's what's happening with your eco-activities today.</p>
            </div>

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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity Mockup */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-gray-800">Recent Activity</h3>
                        <button className="text-emerald-500 text-sm font-medium hover:underline">View All</button>
                    </div>
                    <div className="space-y-6">
                        {/* Placeholder items */}
                        <div className="flex items-start gap-4">
                            <div className="bg-green-100 p-2 rounded-lg text-green-600 mt-1"><FaCalendarCheck /></div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">Joined "Plastic Free July"</p>
                                <p className="text-xs text-gray-500">2 days ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-2 rounded-lg text-blue-600 mt-1"><FaFlag /></div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">Updated status on "Cycle to Work"</p>
                                <p className="text-xs text-gray-500">5 days ago</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-purple-100 p-2 rounded-lg text-purple-600 mt-1"><FaUsers /></div>
                            <div>
                                <p className="text-sm font-medium text-gray-800">Created "Community Garden"</p>
                                <p className="text-xs text-gray-500">1 week ago</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Tip or Promo */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-2xl text-white flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-2">Did you know?</h3>
                    <p className="opacity-90 mb-6">Recycling one aluminum can saves enough energy to run a TV for three hours.</p>
                    <button className="btn btn-white text-emerald-600 border-none hover:bg-gray-100 w-fit">Learn More Tips</button>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;

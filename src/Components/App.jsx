import React, { useState, useEffect, createContext, useContext } from 'react';

// --- MOCKED DEPENDENCIES & DATA (To make it runnable in one file) ---

// Mocking external libraries and hooks:
// 1. Mocking react-hot-toast (toasts will show up in console)
const toast = {
  success: (msg) => console.log(`TOAST SUCCESS: ${msg}`),
  error: (msg) => console.error(`TOAST ERROR: ${msg}`),
};

// 2. Mocking react-router-dom: useParams and Link
const useParams = (id) => ({ id: 'mock-challenge-id-123' });
const Link = ({ to, children, className }) => <a href="#" className={className} onClick={() => console.log(`Navigating to ${to}`)}>{children}</a>;

// 3. Mocking useAuth (Provides logged-in user details)
const AuthContext = createContext(null);
const MOCK_USER = { email: 'testuser@example.com', uid: 'user123' };

const useAuth = () => {
  const [user, setUser] = useState(MOCK_USER);
  const [loading, setLoading] = useState(false);
  
  // In a real app, this would handle Firebase auth state change
  return { user, loading }; 
};

// 4. Mocking useAxiosInstance (Simulates API calls to the backend)
const MOCK_API_BASE = 'http://localhost:3000'; // Match your backend port

const MOCK_CHALLENGES = [
  {
    _id: 'mock-challenge-id-123',
    photo: 'https://placehold.co/600x400/047857/ffffff?text=Eco+Challenge',
    title: '30-Day No Plastic Pledge',
    category: 'Sustainability',
    description: 'Commit to eliminating single-use plastic for 30 consecutive days. Track your progress daily and share tips with the community.',
    duration: 30,
    target: 'Reduce plastic waste by 90%',
    participants: 154,
    impact: 'Waste Reduction (Lbs)',
    startDate: '2025-10-01',
    endDate: '2025-10-30',
    createdBy: 'EcoTrack Admin',
  },
];

const MOCK_USER_CHALLENGES = [
  {
    _id: 'user-challenge-id-001',
    userId: MOCK_USER.email,
    challengeId: 'mock-challenge-id-123',
    status: 'Ongoing',
    progress: 50,
    joinDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    challengeDetails: MOCK_CHALLENGES[0], // Aggregation result mock
  },
  {
    _id: 'user-challenge-id-002',
    userId: MOCK_USER.email,
    challengeId: 'mock-challenge-id-456',
    status: 'Finished',
    progress: 100,
    joinDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    challengeDetails: {
      photo: 'https://placehold.co/600x400/059669/ffffff?text=Finished+Challenge',
      title: 'Meatless Mondays',
      category: 'Diet',
      description: 'A completed challenge to skip meat once a week.',
      duration: 8,
      createdBy: 'Community Health',
    },
  },
];

const useAxiosInstance = () => {
  return {
    get: async (url) => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
      if (url.startsWith('challenges/')) {
        const id = url.split('/')[1];
        const data = MOCK_CHALLENGES.find(c => c._id === id);
        return { data: data || null };
      }
      if (url.startsWith('/user-challenges?userId=')) {
        return { data: MOCK_USER_CHALLENGES.filter(uc => uc.userId === MOCK_USER.email) };
      }
      return { data: [] };
    },
    post: async (url, data) => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate delay
      if (url === '/user-challenges') {
        // Mock duplicate join error
        const isDuplicate = MOCK_USER_CHALLENGES.some(uc => uc.challengeId === data.challengeId && uc.userId === data.userId);
        if (isDuplicate) {
          throw { response: { data: { message: "You have already joined this challenge." } } };
        }
        // Mock success
        const newJoin = { ...data, _id: `user-challenge-id-${Date.now()}`, challengeDetails: MOCK_CHALLENGES[0] };
        MOCK_USER_CHALLENGES.push(newJoin);
        return { data: newJoin };
      }
      return { data: {} };
    }
  };
};

// --- UTILITY COMPONENTS ---

const Loading = () => (
  <div className="flex items-center justify-center p-10 text-emerald-500 font-medium">
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Loading...
  </div>
);

// --- 1. JoinedChallengeCard Component ---

const getStatusColor = (status) => {
  switch (status) {
    case 'Ongoing':
      return 'bg-blue-100 text-blue-800';
    case 'Finished':
      return 'bg-green-100 text-green-800';
    case 'Not Started':
    default:
      return 'bg-yellow-100 text-yellow-800';
  }
};

const JoinedChallengeCard = ({ userChallenge }) => {
  const challenge = userChallenge.challengeDetails || {}; 
  const { status, joinDate } = userChallenge;
  
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col sm:flex-row">
      <img
        src={challenge.photo || 'https://placehold.co/150x120/cccccc/333333?text=Challenge'}
        alt={challenge.title}
        className="w-full sm:w-1/3 h-32 sm:h-auto object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
        style={{ minWidth: '100px' }}
      />
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{challenge.title || 'Challenge Title'}</h3>
        <p className="text-sm text-gray-500 mb-2">{challenge.category}</p>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{challenge.description}</p>
        
        <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
          <span
            className={`px-3 py-1 rounded-full font-semibold text-xs ${getStatusColor(status)}`}
          >
            {status}
          </span>
          <p className="text-gray-500 text-xs">
            Joined: {new Date(joinDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};


// --- 2. ChallengeCardDetails Component (with Join Logic) ---

const ChallengeCardDetails = () => {
  // Mocking useParams to get a static ID for this demo
  

const DetailItem = ({ label, value }) => (
  <p>
    <span className="font-semibold">{label}:</span> {value}
  </p>
);

// --- 3. MyJoinedChallenges Component (User's private list) ---

const MyJoinedChallenges = () => {
  const { user, loading: userLoading } = useAuth();
  const axiosInstance = useAxiosInstance();
  const [joinedChallenges, setJoinedChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch if user is loaded and logged in
    if (!user || userLoading) return;

    const fetchMyJoinedChallenges = async () => {
      setLoading(true);
      try {
        // Backend endpoint: /user-challenges?userId=...
        const response = await axiosInstance.get(`/user-challenges?userId=${user.email}`); 
        setJoinedChallenges(response.data);
      } catch (error) {
        console.error("Error fetching my joined challenges:", error);
        toast.error("Could not load your challenges.");
      } finally {
        setLoading(false);
      }
    };
    fetchMyJoinedChallenges();
  }, [axiosInstance, user, userLoading]);

  if (loading || userLoading) {
    return <Loading />;
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-3">
        Your Challenges <span className="text-sm font-normal text-emerald-600">({joinedChallenges.length} total)</span>
      </h1>
      {joinedChallenges.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-xl shadow-md border border-gray-200">
          <p className="text-lg text-gray-600 font-medium">You haven't joined any active challenges yet.</p>
          <p className="text-sm text-gray-500 mt-2">Time to find an eco-friendly goal!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {joinedChallenges.map(uc => (
            <JoinedChallengeCard key={uc._id} userChallenge={uc} />
          ))}
        </div>
      )}
    </div>
  );
};


// --- MAIN APP COMPONENT ---

const App = () => {
  const [view, setView] = useState('details'); // 'details' or 'myChallenges'

  const NavButton = ({ target, label }) => (
    <button
      onClick={() => setView(target)}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        view === target 
          ? 'bg-emerald-600 text-white shadow-md' 
          : 'text-gray-600 hover:bg-emerald-100'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="font-sans antialiased bg-gray-100">
      <div className="p-4 border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex gap-4">
          <NavButton target="details" label="Challenge Details (Join Demo)" />
          <NavButton target="myChallenges" label="My Joined Challenges" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto">
        {view === 'details' && <ChallengeCardDetails />}
        {view === 'myChallenges' && <MyJoinedChallenges />}
      </main>
    </div>
  );
};

// Apply Tailwind config for better aesthetics
const setupTailwind = () => {
  if (typeof window !== 'undefined') {
    const script = document.createElement('script');
    script.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(script);
  }
};
// setupTailwind(); // Not necessary in the execution environment

export default App;
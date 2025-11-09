export function ChallengeCard({ challenge }) {
  console.log(challenge);
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src={challenge.photo}
        alt="image"
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">
          {challenge.title}
        </h3>
        <p className="text-sm text-emerald-600 font-medium">
          {challenge.category}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2">
          {challenge.description}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
          <span>
            ⏱{challenge.duration}
            days
          </span>
          <span>
            👥
            {challenge.participants}
            joined
          </span>
        </div>
        <div className="pt-3">
          <button
            // onClick={() => onViewDetails && onViewDetails(challenge)}
            className="w-full rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

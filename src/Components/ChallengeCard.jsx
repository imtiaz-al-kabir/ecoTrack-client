import { Link } from "react-router";

export function ChallengeCard({ challenge }) {
  const { category, description, duration, participants, photo, title, _id } =
    challenge;

  return (
    <div className="max-w-sm  bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img src={photo} alt="image" className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-emerald-600 font-medium">{category}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
          <span>
            ⏱{duration}
            days
          </span>
          <span>
            👥
            {participants}
            joined
          </span>
        </div>
        <div className="pt-3">
          <Link
            to={`/challenges/${_id}`}
            className="w-full btn rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium py-2 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

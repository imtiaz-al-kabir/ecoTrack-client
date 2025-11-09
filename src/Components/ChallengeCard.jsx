export function ChallengeCard() {
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img
        src='https://media.istockphoto.com/id/1489061272/photo/crystal-earth-on-ferns-in-green-grass-forest-with-sunlight-environment-save-the-world-earth.jpg?s=2048x2048&w=is&k=20&c=_uHuhjg4EdXMUMsnw-uc-gHuvQGiFQ7LD7C9GptcFaM='
        alt='image'
        className="w-full h-48 object-cover"
      />
      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold text-gray-800">
          {/* {challenge.title} */} heloow
        </h3>
        <p className="text-sm text-emerald-600 font-medium">
          {/* {challenge.category} */} made in 
        </p>
        <p className="text-sm text-gray-600 line-clamp-2">
          {/* {challenge.description} */} Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil aut commodi eum excepturi ratione obcaecati incidunt odio suscipit placeat animi?
        </p>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
          <span>⏱ 
            {/* {challenge.duration}  */} 20
            days</span>
          <span>👥 
            {/* {challenge.participants}  */} 5
            joined</span>
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
export function ChallengeCardDetails({ challenge, onJoin }) {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        <img
          src="https://media.istockphoto.com/id/1489061272/photo/crystal-earth-on-ferns-in-green-grass-forest-with-sunlight-environment-save-the-world-earth.jpg?s=2048x2048&w=is&k=20&c=_uHuhjg4EdXMUMsnw-uc-gHuvQGiFQ7LD7C9GptcFaM="
          alt="image"
          className="w-full md:w-1/2 h-60 object-cover"
        />
        <div className="p-6 flex-1 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {/* {challenge.title} */} title
            </h2>
            <p className="text-emerald-600 font-medium">
              {/* {challenge.category} */} category
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {/* {challenge.description} */} description
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
            <p><span className="font-semibold">Duration:</span> 
            {/* {challenge.duration}  */} 30
            days
            </p>
            <p><span className="font-semibold">Target:</span> 
            
            {/* {challenge.target} */} men
            </p>
            <p><span className="font-semibold">Participants:</span> 
            
            {/* {challenge.participants} */} 5
            
            </p>
            <p><span className="font-semibold">Impact Metric:
                </span> 
                {/* {challenge.impactMetric} */} raw
                
                
                </p>
            <p><span className="font-semibold">Start Date:</span> 
            {/* {challenge.startDate} */} 10/1/111
            </p>
            <p><span className="font-semibold">End Date:</span> 

            {/* {challenge.endDate} */} 13/3/3
            
            </p>
          </div>

          <div className="pt-2 border-t text-sm text-gray-600">
            <p><span className="font-semibold">Created By:</span> 
            {/* {challenge.createdBy} */} imtiaz
            </p>
          </div>

          <div className="pt-4">
            <button
            //   onClick={() => onJoin && onJoin(challenge)}
              className="w-full md:w-auto rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium px-6 py-2 transition-colors"
            >
              Join Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
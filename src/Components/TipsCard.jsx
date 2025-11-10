import React from "react";

const TipsCard = ({ tip }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-5 m-3">
      <div className="font-bold text-xl mb-2">{tip.title}</div>
      <p className="text-gray-700 text-base mb-2">{tip.content}</p>
      <p className="text-sm text-gray-500 mb-1">Category: {tip.category}</p>
      <p className="text-sm text-gray-500 mb-1">
        By: {tip.authorName} ({tip.author})
      </p>
      <p className="text-sm text-gray-500">Upvotes: {tip.upvotes}</p>
      <p className="text-xs text-gray-400">
        Created At: {new Date(tip.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default TipsCard;

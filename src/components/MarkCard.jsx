import React from "react";
import { Link } from "react-router";

const MarkCard = ({ mark }) => {
  const isNew = (createdAt) => {
    if (!createdAt) return false;
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffInDays = (now - createdDate) / (1000 * 60 * 60 * 24);
    return diffInDays < 5;
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure className="relative">
        <img
          src={mark.imageUrl || "https://placehold.co/600x400?text=No+Image"}
          alt={mark.title}
          className="w-full h-48 object-cover"
        />

        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {mark.category && (
            <div className="badge badge-primary">{mark.category}</div>
          )}
          {mark.tag && (
            <div className="badge badge-secondary">{mark.tag}</div>
          )}
        </div>
      </figure>

      <div className="card-body p-6">
        <h2 className="card-title font-bold text-xl">
          {mark.title}
          {isNew(mark.createdAt) && (
            <div className="badge badge-accent ml-2">NEW</div>
          )}
        </h2>

        <p className="text-gray-700 mt-2">{mark.description}</p>

        <div className="flex items-center mt-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-sm text-gray-600">{mark.location}</span>
        </div>

        <div className="mt-4">
          <Link to={`/mark/${mark.id}`} className="w-full">
            <button className="btn btn-primary w-full">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarkCard;

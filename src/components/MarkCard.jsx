import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAllCategories } from "../services/apiCategory";
import { getAllTags } from "../services/apiTags";

import { 
  FaLeaf, FaHandsHelping, FaBook, FaUsers, 
  FaPalette, FaUtensils, FaHeart, FaGraduationCap 
} from "react-icons/fa";
import { MdEco, MdPets, MdChildCare, MdSportsBasketball } from "react-icons/md";

let categoriesCache = null;
let tagsCache = null;

const categoryIcons = {
  1: { icon: FaLeaf, color: "bg-green-500" },
  2: { icon: FaHandsHelping, color: "bg-blue-500" },
  3: { icon: FaUsers, color: "bg-purple-500" },
  4: { icon: FaPalette, color: "bg-pink-500" },
  5: { icon: FaBook, color: "bg-yellow-500" },
  6: { icon: MdEco, color: "bg-emerald-500" },
  default: { icon: FaLeaf, color: "bg-gray-500" }
};

const tagIcons = {
  1: { icon: MdPets, color: "bg-amber-500" },
  2: { icon: FaUtensils, color: "bg-red-500" },
  3: { icon: FaHeart, color: "bg-rose-500" },
  4: { icon: FaGraduationCap, color: "bg-indigo-500" },
  5: { icon: MdChildCare, color: "bg-cyan-500" },
  6: { icon: MdSportsBasketball, color: "bg-orange-500" },  
  
  default: { icon: FaHeart, color: "bg-gray-500" }
};

const MarkCard = ({ mark }) => {
  const [categoryData, setCategoryData] = useState({ name: "", id: null });
  const [tagData, setTagData] = useState({ name: "", id: null });
  
  useEffect(() => {
    const getNames = async () => {
      try {
        if (!categoriesCache) {
          categoriesCache = await getAllCategories();
        }
        if (!tagsCache) {
          tagsCache = await getAllTags();
        }
        
        if (mark.category) {
          const category = categoriesCache.find(c => c.categoryId === mark.category);
          setCategoryData({ 
            name: category ? category.category : "Unknown",
            id: mark.category
          });
        }
        
        if (mark.tag) {
          const tag = tagsCache.find(t => t.tagId === mark.tag);
          setTagData({ 
            name: tag ? tag.tag : "Unknown",
            id: mark.tag
          });
        }
      } catch (error) {
        console.error("Error loading names:", error);
      }
    };
    
    getNames();
  }, [mark.category, mark.tag]);

  const getCategoryIcon = () => {
    const iconData = categoryIcons[categoryData.id] || categoryIcons.default;
    const IconComponent = iconData.icon;
    return { IconComponent, color: iconData.color };
  };
  
  const getTagIcon = () => {
    const iconData = tagIcons[tagData.id] || tagIcons.default;
    const IconComponent = iconData.icon;
    return { IconComponent, color: iconData.color };
  };

  const isNew = (createdAt) => {
    if (!createdAt) return false;
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffInDays = (now - createdDate) / (1000 * 60 * 60 * 24);
    return diffInDays < 5;
  };

  const { IconComponent: CategoryIcon, color: categoryColor } = getCategoryIcon();
  const { IconComponent: TagIcon, color: tagColor } = getTagIcon();

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <figure className="relative">
        <img
          src={mark.imageUrl || "https://placehold.co/600x400?text=No+Image"}
          alt={mark.title}
          className="w-full h-48 object-cover"
        />

        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {categoryData.name && (
            <div className={`badge gap-1 text-white ${categoryColor}`}>
              <CategoryIcon className="h-3.5 w-3.5" />
              {categoryData.name}
            </div>
          )}
          {tagData.name && (
            <div className={`badge gap-1 text-white ${tagColor}`}>
              <TagIcon className="h-3.5 w-3.5" />
              {tagData.name}
            </div>
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

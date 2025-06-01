import Link from "next/link";
import React from "react";

import { Calendar } from "lucide-react";
import moment from "moment";
import { Card } from "../ui/card";

interface BlogCardProps {
  image: string;
  title: string;
  desc: string;
  id: string;
  time: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  image,
  title,
  desc,
  id,
  time,
}) => {
  return (
    <Link href={`/blog/${id}`}>
      <Card className="group overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 transition-all duration-300 hover:bg-gray-900/60 hover:border-gray-700/50 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
        <div className="relative w-full h-[200px] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar size={14} className="text-blue-400" />
            <span>{moment(time).format("DD-MM-YYYY")}</span>
          </div>

          <h2 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
            {title}
          </h2>

          <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
            {desc.length > 100 ? `${desc.slice(0, 100)}...` : desc}
          </p>

          <div className="pt-2">
            <div className="inline-flex items-center text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
              Read more
              <svg
                className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;

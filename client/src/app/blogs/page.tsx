"use client";
import BlogCard from "@/components/shared/blog-card";
import Loading from "@/components/shared/loading";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useAppData } from "@/context/AppContext";
import { Filter } from "lucide-react";

const BlogsPage = () => {
  const { toggleSidebar } = useSidebar();
  const { loading, blogLoading, blogs } = useAppData();

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center my-8">
            <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text">
              Latest Blogs
            </h1>
            <Button
              onClick={toggleSidebar}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 border-0"
            >
              <Filter size={18} />
              <span className="font-medium">Filter Blogs</span>
            </Button>
          </div>

          {blogLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {blogs?.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm border border-gray-700/50">
                    <Filter className="w-10 h-10 text-gray-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">
                    No Blogs Found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or category filters
                  </p>
                </div>
              )}
              {blogs &&
                blogs.map((e, i) => {
                  return (
                    <BlogCard
                      key={i}
                      image={e.image}
                      title={e.title}
                      desc={e.description}
                      id={e.id}
                      time={e.created_at}
                    />
                  );
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogsPage;

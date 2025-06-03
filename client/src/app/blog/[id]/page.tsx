"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { author_service, blog_service, useAppData } from "@/context/AppContext";
import { Blog, User } from "@/types";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Bookmark,
  BookmarkCheck,
  Edit,
  Eye,
  Heart,
  MessageCircle,
  RefreshCw,
  Send,
  Share2,
  Trash2,
  Trash2Icon,
  User2
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Comment {
  id: string;
  userid: string;
  comment: string;
  create_at: string;
  username: string;
}

const BlogPage = () => {
  const { isAuth, user, fetchBlogs, savedBlogs, getSavedBlogs } = useAppData();
  const router = useRouter();
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  async function fetchSingleBlog() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${blog_service}/api/v1/blog/${id}`);
      setBlog(data.blog);
      setAuthor(data.author);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deletBlog() {
    if (confirm("Are you sure you want to delete this blog")) {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const { data } = await axios.delete(
          `${author_service}/api/v1/blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(data.message);
        router.push("/blogs");
        setTimeout(() => {
          fetchBlogs();
        }, 4000);
      } catch (error) {
        toast.error("Problem while deleting blog");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }

  async function fetchComment() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${blog_service}/api/v1/comment/${id}`);
      setComments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function addComment() {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${blog_service}/api/v1/comment/${id}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      setComment("");
      fetchComment();
    } catch (error) {
      toast.error("Problem while adding comment");
    } finally {
      setLoading(false);
    }
  }

  const deleteComment = async (id: string) => {
    if (confirm("Are you sure you want to delete this comment")) {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const { data } = await axios.delete(
          `${blog_service}/api/v1/comment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(data.message);
        fetchComment();
      } catch (error) {
        toast.error("Problem while deleting comment");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  async function saveBlog() {
    const token = Cookies.get("token");
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${blog_service}/api/v1/save/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      setSaved(!saved);
      getSavedBlogs();
    } catch (error) {
      toast.error("Problem while saving blog");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchComment();
  }, [id]);

  useEffect(() => {
    fetchSingleBlog();
  }, [id]);

  useEffect(() => {
    if (savedBlogs && savedBlogs.some((b) => b.blogid === id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [savedBlogs, id]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-950 p-6 flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="w-12 h-12 text-blue-400 animate-spin mx-auto" />
          <p className="text-gray-400 text-lg">Loading your story...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        {/* Main Blog Content */}
        <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:bg-gray-900/60 transition-all duration-300 hover:border-gray-700/50 rounded-2xl overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-80 overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>

            {/* Action Buttons Overlay */}
            <div className="absolute top-6 right-6 flex gap-3">
              {isAuth && (
                <Button
                  onClick={saveBlog}
                  disabled={loading}
                  className={`${
                    saved
                      ? "bg-yellow-500/90 hover:bg-yellow-600/90 text-yellow-900"
                      : "bg-gray-800/90 hover:bg-gray-700/90 text-white"
                  } backdrop-blur-sm border-0 rounded-xl px-4 py-2 shadow-lg transition-all duration-300 hover:scale-105`}
                >
                  {saved ? (
                    <BookmarkCheck className="w-5 h-5" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </Button>
              )}

              {blog.author === user?._id && (
                <>
                  <Button
                    onClick={() => router.push(`/blog/edit/${id}`)}
                    className="bg-blue-500/90 hover:bg-blue-600/90 text-white backdrop-blur-sm border-0 rounded-xl px-4 py-2 shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <Edit className="w-5 h-5" />
                  </Button>
                  <Button
                    onClick={deletBlog}
                    disabled={loading}
                    className="bg-red-500/90 hover:bg-red-600/90 text-white backdrop-blur-sm border-0 rounded-xl px-4 py-2 shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <Trash2Icon className="w-5 h-5" />
                  </Button>
                </>
              )}
            </div>
          </div>

          <CardContent className="p-8">
            {/* Blog Header */}
            <div className="space-y-6 mb-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent leading-tight">
                {blog.title}
              </h1>

              {/* Author Info */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <Link
                  className="flex items-center gap-3 group"
                  href={`/profile/${author?._id}`}
                >
                  <div className="relative">
                    <img
                      src={author?.image}
                      className="w-12 h-12 rounded-full border-2 border-gray-700/50 group-hover:border-blue-500/50 transition-all duration-300"
                      alt={author?.name}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <p className="text-white font-semibold group-hover:text-blue-400 transition-colors duration-300">
                      {author?.name}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {new Date(
                        blog.created_at || Date.now()
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </Link>

                {/* Blog Stats */}
                <div className="flex items-center gap-4 text-gray-400">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">2.3k views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{comments.length} comments</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl text-gray-300 leading-relaxed border-l-4 border-blue-500/50 pl-6 bg-gray-800/30 p-4 rounded-r-xl">
                {blog.description}
              </p>
            </div>

            {/* Blog Content */}
            <div
              className="prose prose-lg text-white prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400 prose-strong:text-white prose-code:text-pink-400 prose-pre:bg-gray-800/50 prose-pre:border prose-pre:border-gray-700/50 prose-blockquote:border-l-blue-500/50 prose-blockquote:bg-gray-800/30"
              dangerouslySetInnerHTML={{ __html: blog.blogcontent }}
            />

            {/* Engagement Section */}
            <div className="mt-8 pt-8 border-t border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button className="bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/40 hover:to-pink-500/40 text-red-400 border border-red-500/30 rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105">
                    <Heart className="w-5 h-5 mr-2" />
                    Like
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/40 hover:to-cyan-500/40 text-blue-400 border border-blue-500/30 rounded-xl px-6 py-3 transition-all duration-300 hover:scale-105">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share
                  </Button>
                </div>
                <p className="text-gray-400 text-sm">
                  Category:{" "}
                  <span className="text-blue-400 font-medium">
                    {blog.category}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comment Form */}
        {isAuth && (
          <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:bg-gray-900/60 transition-all duration-300 hover:border-gray-700/50 rounded-2xl">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-700/50">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Join the Discussion
                </h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label className="text-lg font-semibold text-gray-200">
                  Share your thoughts
                </Label>
                <Input
                  placeholder="What do you think about this story?"
                  className="bg-gray-800/60 border-gray-700/50 text-white placeholder-gray-400 focus:border-green-500/50 focus:ring-green-500/20 rounded-xl h-14 text-lg transition-all duration-300"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <Button
                onClick={addComment}
                disabled={loading || !comment.trim()}
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white border-0 rounded-xl px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                    Post Comment
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Comments Section */}
        <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:bg-gray-900/60 transition-all duration-300 hover:border-gray-700/50 rounded-2xl">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-gray-700/50">
                <MessageCircle className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Comments</h3>
                <p className="text-gray-400">
                  {comments.length > 0
                    ? `${comments.length} ${
                        comments.length === 1 ? "comment" : "comments"
                      }`
                    : "Be the first to comment"}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {comments && comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map((comment, index) => (
                  <div
                    key={comment.id}
                    className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-gray-600/50">
                            <User2 className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                              {comment.username}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(comment.create_at).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed pl-13">
                          {comment.comment}
                        </p>
                      </div>

                      {comment.userid === user?._id && (
                        <Button
                          onClick={() => deleteComment(comment.id)}
                          disabled={loading}
                          className="bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/30 rounded-lg px-3 py-2 transition-all duration-300 hover:scale-105 opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No comments yet</p>
                <p className="text-gray-500 text-sm">
                  {isAuth
                    ? "Be the first to share your thoughts!"
                    : "Sign in to join the conversation"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
    </div>
  );
};

export default BlogPage;

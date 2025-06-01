"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { author_service, blogCategories } from "@/context/AppContext";
import axios from "axios";
import Cookies from "js-cookie";
import {
  FileText,
  PenTool,
  RefreshCw,
  Send,
  Sparkles,
  Upload,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const AddBlog = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [aiTitle, setAiTitle] = useState(false);
  const [aiDescripiton, setAiDescription] = useState(false);
  const [aiBlogLoading, setAiBlogLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: null,
    blogcontent: "",
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const fromDataToSend = new FormData();
    fromDataToSend.append("title", formData.title);
    fromDataToSend.append("description", formData.description);
    fromDataToSend.append("blogcontent", formData.blogcontent);
    fromDataToSend.append("category", formData.category);

    if (formData.image) {
      fromDataToSend.append("file", formData.image);
    }

    try {
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${author_service}/api/v1/blog/new`,
        fromDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      setFormData({
        title: "",
        description: "",
        category: "",
        image: null,
        blogcontent: "",
      });
      setContent("");
    } catch (error) {
      toast.error("Error while adding blog");
    } finally {
      setLoading(false);
    }
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typings...",
    }),
    []
  );

  const aiTitleResponse = async () => {
    try {
      setAiTitle(true);
      const { data } = await axios.post(`${author_service}/api/v1/ai/title`, {
        text: formData.title,
      });
      setFormData({ ...formData, title: data });
    } catch (error) {
      toast.error("Problem while fetching from ai");
      console.log(error);
    } finally {
      setAiTitle(false);
    }
  };

  const aiDescriptionResponse = async () => {
    try {
      setAiDescription(true);
      const { data } = await axios.post(
        `${author_service}/api/v1/ai/descripiton`,
        {
          title: formData.title,
          description: formData.description,
        }
      );
      setFormData({ ...formData, description: data });
    } catch (error) {
      toast.error("Problem while fetching from ai");
      console.log(error);
    } finally {
      setAiDescription(false);
    }
  };

  const aiBlogResponse = async () => {
    try {
      setAiBlogLoading(true);
      const { data } = await axios.post(`${author_service}/api/v1/ai/blog`, {
        blog: formData.blogcontent,
      });
      setContent(data.html);
      setFormData({ ...formData, blogcontent: data.html });
    } catch (error: any) {
      toast.error("Problem while fetching from ai");
      console.log(error);
    } finally {
      setAiBlogLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <Card className="bg-gray-900/50 backdrop-blur-xl border-gray-800/50 shadow-2xl hover:bg-gray-900/60 transition-all duration-300 hover:border-gray-700/50 rounded-2xl">
          <CardHeader className="text-center space-y-6 pb-8">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-lg border border-gray-700/50 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 group">
              <PenTool className="w-10 h-10 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
            </div>
            <div className="space-y-3">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Create Your Story
              </h2>
              <p className="text-gray-400 text-lg">
                Share your thoughts with the world through powerful storytelling
              </p>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Title Section */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  Blog Title
                </Label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      name="title"
                      placeholder="Enter an engaging title for your blog..."
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`bg-gray-800/60 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl h-14 text-lg transition-all duration-300 ${
                        aiTitle ? "animate-pulse placeholder:opacity-60" : ""
                      }`}
                      required
                    />
                  </div>
                  {formData.title !== "" && (
                    <Button
                      type="button"
                      onClick={aiTitleResponse}
                      disabled={aiTitle}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 rounded-xl h-14 px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group"
                    >
                      <Sparkles
                        className={`w-5 h-5 ${
                          aiTitle ? "animate-spin" : "group-hover:rotate-12"
                        } transition-transform duration-300`}
                      />
                    </Button>
                  )}
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-3">
                <Label className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-400" />
                  Description
                </Label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <Input
                      name="description"
                      placeholder="Write a compelling description..."
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`bg-gray-800/60 border-gray-700/50 text-white placeholder-gray-400 focus:border-green-500/50 focus:ring-green-500/20 rounded-xl h-14 text-lg transition-all duration-300 ${
                        aiDescripiton
                          ? "animate-pulse placeholder:opacity-60"
                          : ""
                      }`}
                      required
                    />
                  </div>
                  {formData.title !== "" && (
                    <Button
                      onClick={aiDescriptionResponse}
                      type="button"
                      disabled={aiDescripiton}
                      className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white border-0 rounded-xl h-14 px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group"
                    >
                      <Sparkles
                        className={`w-5 h-5 ${
                          aiDescripiton
                            ? "animate-spin"
                            : "group-hover:rotate-12"
                        } transition-transform duration-300`}
                      />
                    </Button>
                  )}
                </div>
              </div>

              {/* Category and Image Upload Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Category */}
                <div className="space-y-3">
                  <Label className="text-lg font-semibold text-gray-200">
                    Category
                  </Label>
                  <Select
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger className="bg-gray-800/60 border-gray-700/50 text-white focus:border-blue-500/50 focus:ring-blue-500/20 rounded-xl h-14 text-lg">
                      <SelectValue
                        placeholder={formData.category || "Choose a category"}
                        className="text-gray-400"
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800/95 backdrop-blur-xl border-gray-700/50 rounded-xl">
                      {blogCategories?.map((e, i) => (
                        <SelectItem
                          key={i}
                          value={e}
                          className="text-white hover:bg-gray-700/50 focus:bg-gray-700/50 rounded-lg"
                        >
                          {e}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Image Upload */}
                <div className="space-y-3">
                  <Label className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                    <Upload className="w-5 h-5 text-purple-400" />
                    Featured Image
                  </Label>
                  <div className="relative">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="bg-gray-800/60 border-gray-700/50 text-white file:bg-purple-600 file:text-white file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 hover:file:bg-purple-700 focus:border-purple-500/50 focus:ring-purple-500/20 rounded-xl h-14 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Blog Content Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-blue-400" />
                    Blog Content
                  </Label>
                  <Button
                    type="button"
                    onClick={aiBlogResponse}
                    disabled={aiBlogLoading}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0 rounded-xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group"
                  >
                    <Sparkles
                      className={`w-4 h-4 mr-2 ${
                        aiBlogLoading ? "animate-spin" : "group-hover:rotate-12"
                      } transition-transform duration-300`}
                    />
                    <span>AI Grammar Fix</span>
                  </Button>
                </div>

                <div className="bg-gray-800/30 rounded-xl p-1 border border-gray-700/50">
                  <p className="text-sm text-gray-400 mb-3 px-3 pt-2">
                    Create your content using the rich text editor. Use AI to
                    improve grammar and style.
                  </p>

                  <div className="bg-white rounded-lg overflow-hidden min-h-[400px]">
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1}
                      onBlur={(newContent) => {
                        setContent(newContent);
                        setFormData({ ...formData, blogcontent: newContent });
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 hover:from-blue-700 hover:via-purple-700 hover:to-blue-700 text-white font-bold text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-1 border-0 group bg-[length:200%_100%] hover:bg-[position:100%_0] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-3 animate-spin" />
                      Publishing Your Story...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform duration-300" />
                      Publish Blog Post
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-blue-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
    </div>
  );
};

export default AddBlog;

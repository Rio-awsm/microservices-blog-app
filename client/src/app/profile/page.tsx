"use client";
import Loading from "@/components/shared/loading";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppData, user_service } from "@/context/AppContext";
import axios from "axios";
import Cookies from "js-cookie";
import { Camera, Facebook, Instagram, Linkedin, User } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, setUser, logoutUser } = useAppData();
  if (!user) return redirect("/login");
  
  const logoutHandler = () => {
    logoutUser();
  };
  
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    instagram: user?.instagram || "",
    facebook: user?.facebook || "",
    linkedin: user?.linkedin || "",
    bio: user?.bio || "",
  });
  
  const InputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  const clickHandler = () => {
    InputRef.current?.click();
  };

  const changeHandler = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append("file", file);
      try {
        setLoading(true);
        const token = Cookies.get("token");
        const { data } = await axios.post(
          `${user_service}/api/v1/user/update/pic`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(data.message);
        setLoading(false);
        Cookies.set("token", data.token, {
          expires: 5,
          secure: true,
          path: "/",
        });
        setUser(data.user);
      } catch (error) {
        toast.error("Image Update Failed");
        setLoading(false);
      }
    }
  };

  const handleFormSubmit = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("token");
      const { data } = await axios.post(
        `${user_service}/api/v1/user/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(data.message);
      setLoading(false);
      Cookies.set("token", data.token, {
        expires: 5,
        secure: true,
        path: "/",
      });
      setUser(data.user);
      setOpen(false);
    } catch (error) {
      toast.error("Update Failed");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>

          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

          <Card className="w-full max-w-xl bg-gray-900/50 backdrop-blur-xl border-gray-800/50 shadow-2xl relative z-10 hover:bg-gray-900/60 transition-all duration-300 hover:border-gray-700/50 rounded-2xl">
            <CardHeader className="text-center space-y-6 pb-8">
              <div className="mx-auto w-16 h-16 bg-gray-800/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-gray-700/50 hover:bg-gray-700/80 transition-colors duration-300 group">
                <User className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
              </div>

              <CardTitle className="text-3xl font-bold text-white">Profile</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center space-y-6">
              {/* Avatar Section */}
              <div className="relative group">
                <Avatar
                  className="w-28 h-28 border-4 border-gray-700/50 shadow-xl cursor-pointer hover:border-blue-400/50 transition-all duration-300 group-hover:scale-105"
                  onClick={clickHandler}
                >
                  <AvatarImage src={user?.image} alt="profile pic" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 rounded-full">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </Avatar>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  ref={InputRef}
                  onChange={changeHandler}
                />
              </div>

              {/* User Info */}
              <div className="w-full space-y-4 text-center">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 uppercase tracking-wide">Name</label>
                  <p className="text-lg font-medium text-white">{user?.name}</p>
                </div>

                {user?.bio && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 uppercase tracking-wide">Bio</label>
                    <p className="text-gray-300 leading-relaxed">{user.bio}</p>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                {user?.instagram && (
                  <a
                    href={user.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800/60 hover:bg-pink-500/20 border border-gray-700/50 hover:border-pink-500/50 rounded-xl transition-all duration-300 hover:scale-110 group"
                  >
                    <Instagram className="text-pink-400 group-hover:text-pink-300 w-6 h-6 transition-colors duration-300" />
                  </a>
                )}

                {user?.facebook && (
                  <a
                    href={user.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800/60 hover:bg-blue-500/20 border border-gray-700/50 hover:border-blue-500/50 rounded-xl transition-all duration-300 hover:scale-110 group"
                  >
                    <Facebook className="text-blue-400 group-hover:text-blue-300 w-6 h-6 transition-colors duration-300" />
                  </a>
                )}

                {user?.linkedin && (
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800/60 hover:bg-blue-600/20 border border-gray-700/50 hover:border-blue-600/50 rounded-xl transition-all duration-300 hover:scale-110 group"
                  >
                    <Linkedin className="text-blue-500 group-hover:text-blue-400 w-6 h-6 transition-colors duration-300" />
                  </a>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full justify-center">
                <Button 
                  onClick={logoutHandler}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border-0"
                >
                  Logout
                </Button>
                
                <Button 
                  onClick={() => router.push("/blog/new")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border-0"
                >
                  Add Blog
                </Button>

                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline"
                      className="bg-gray-800/60 hover:bg-gray-700/80 border-gray-600/50 hover:border-gray-500/50 text-gray-200 hover:text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Edit
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[500px] bg-gray-900/95 backdrop-blur-xl border-gray-800/50 shadow-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-white">Edit Profile</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-300">Name</Label>
                        <Input
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="bg-gray-800/60 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-300">Bio</Label>
                        <Input
                          value={formData.bio}
                          onChange={(e) =>
                            setFormData({ ...formData, bio: e.target.value })
                          }
                          className="bg-gray-800/60 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-300">Instagram</Label>
                        <Input
                          value={formData.instagram}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              instagram: e.target.value,
                            })
                          }
                          className="bg-gray-800/60 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-300">Facebook</Label>
                        <Input
                          value={formData.facebook}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              facebook: e.target.value,
                            })
                          }
                          className="bg-gray-800/60 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-300">LinkedIn</Label>
                        <Input
                          value={formData.linkedin}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              linkedin: e.target.value,
                            })
                          }
                          className="bg-gray-800/60 border-gray-700/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20 rounded-lg"
                        />
                      </div>

                      <Button
                        onClick={handleFormSubmit}
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border-0"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-blue-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
        </div>
      )}
    </>
  );
};

export default ProfilePage;
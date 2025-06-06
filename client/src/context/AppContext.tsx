"use client";
import { AppContextType, Blog, SavedBlogType, User } from "@/types";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast, { Toaster } from "react-hot-toast";

const googleClientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export const user_service = "http://localhost:5000";
export const author_service = "http://localhost:5001";
export const blog_service = "http://localhost:5002";

export const blogCategories = [
  "Techonlogy",
  "Health",
  "Finance",
  "Travel",
  "Education",
  "Entertainment",
  "Study",
];

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savedBlogs, setSavedBlogs] = useState<SavedBlogType[] | null>(null);
  const [blogLoading, setBlogLoading] = useState(true);

  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const [category, setCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  async function fetchUser() {
    try {
      const token = Cookies.get("token");

      const { data } = await axios.get(`${user_service}/api/v1/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data);
      setIsAuth(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function logoutUser() {
    Cookies.remove("token");
    setUser(null);
    setIsAuth(false);

    toast.success("user Logged Out");
  }

  async function fetchBlogs() {
    setBlogLoading(true)
    try {
      const { data } = await axios.get(
        `${blog_service}/api/v1/blog/all?searchQuery=${searchQuery}&category=${category}`
      );

      setBlogs(data);
    } catch (error) {
       console.log(error);
    } finally {
      setBlogLoading(false);
    }
  }

  async function getSavedBlogs() {

  }
  useEffect(() => {
    fetchUser();
    getSavedBlogs();
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [searchQuery, category]);

  return (
    <AppContext.Provider
      value={{
        user,
        setIsAuth,
        isAuth,
        setLoading,
        getSavedBlogs,
        loading,
        setUser,
        logoutUser,
        blogs,
        blogLoading,
        setCategory,
        setSearchQuery,
        searchQuery,
        fetchBlogs,
        savedBlogs,
      }}
    >
      <GoogleOAuthProvider clientId={googleClientID || " "}>
        {children}
        <Toaster />
      </GoogleOAuthProvider>
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useappdata must be used within AppProvider");
  }

  return context;
};

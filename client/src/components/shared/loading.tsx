import { BookOpen, Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Animated logo */}
        <div className="relative">
          <div className="w-20 h-20 bg-gray-800/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl border border-gray-700/50 animate-pulse">
            <BookOpen className="w-10 h-10 text-blue-400 animate-pulse" />
          </div>

          {/* Spinning loader */}
          <div className="absolute -inset-2 rounded-3xl">
            <Loader2 className="w-24 h-24 text-blue-500/60 animate-spin" />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-white animate-pulse">
            Loading...
          </h2>
          <p className="text-gray-400 text-lg">Preparing your fresh reads</p>
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-blue-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
    </div>
  );
};

export default Loading;

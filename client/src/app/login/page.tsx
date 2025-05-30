"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <Card className="w-full max-w-md bg-gray-900/50 backdrop-blur-xl border-gray-800/50 shadow-2xl relative z-10 hover:bg-gray-900/60 transition-all duration-300 hover:border-gray-700/50">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="mx-auto w-16 h-16 bg-gray-800/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg border border-gray-700/50 hover:bg-gray-700/80 transition-colors duration-300 group">
            <BookOpen className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
          </div>

          <div className="space-y-3">
            <CardTitle className="text-3xl font-bold text-white">
              Fresh Reads
            </CardTitle>
            <CardDescription className="text-gray-400 text-base">
              Your go-to blog app for fresh content
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Button
            onClick={() => {}}
            className="w-full h-12 bg-white hover:bg-gray-100 text-gray-900 font-medium text-base rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group border-0"
          >
            Continue with Google
          </Button>

          <div className="text-center pt-2">
            <p className="text-gray-500 text-sm">
              Join thousands of readers discovering amazing content
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-gradient-to-t from-blue-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />
    </div>
  );
};

export default LoginPage;


import ReagentSimulator from "@/components/ReagentSimulator";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-gray-200 flex flex-col">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src="https://tripsit.me/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.081b8d2e.png&w=3840&q=75" 
            alt="TripSit Logo" 
            className="h-10 mr-4 animate-pulse"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Reagent Test Kit Simulator
          </h1>
        </div>
        <Link to="/drugle">
          <Button 
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105"
          >
            <Target className="h-4 w-4" />
            Play Drugle
          </Button>
        </Link>
      </div>
      <ReagentSimulator />
    </div>
  );
};

export default Index;

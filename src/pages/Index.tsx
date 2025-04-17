
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-gray-200 flex flex-col items-center justify-center">
      <div className="container mx-auto p-4 flex flex-col items-center">
        <div className="flex items-center justify-center mb-8">
          <img 
            src="https://tripsit.me/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.081b8d2e.png&w=3840&q=75" 
            alt="TripSit Logo" 
            className="h-14 mr-4"
          />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Reagent Test Kit
          </h1>
        </div>
        
        <Link to="/drugle">
          <Button 
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-105 text-xl px-8 py-6"
          >
            <Target className="h-5 w-5" />
            Play Drugle
          </Button>
        </Link>
        
        <p className="mt-6 text-gray-400 text-center max-w-md">
          Drugle is a reagent test kit themed word game. Try to identify the mystery substance based on reagent test reactions!
        </p>
      </div>
      
      <div className="mt-auto text-center p-4 text-sm text-gray-500">
        <p>
          THIS IS FOR ENTERTAINMENT PURPOSES ONLY. <br />
          THE TEST DATA MAY NOT BE ACCURATE OR UP TO DATE.
        </p>
      </div>
    </div>
  );
};

export default Index;

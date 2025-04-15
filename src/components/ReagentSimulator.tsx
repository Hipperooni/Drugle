
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { BeakerIcon, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { reagents, substances } from "@/data/testData";
import { Substance } from "@/types/reagent";

const ReagentSimulator = () => {
  const { toast } = useToast();
  const [currentSubstance, setCurrentSubstance] = useState<Substance | null>(null);
  const [selectedReagents, setSelectedReagents] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [userGuess, setUserGuess] = useState<string>("");

  const randomizeSubstance = () => {
    const randomIndex = Math.floor(Math.random() * substances.length);
    setCurrentSubstance(substances[randomIndex]);
    setSelectedReagents([]);
    setShowResults(false);
    setUserGuess("");
  };

  useEffect(() => {
    randomizeSubstance();
  }, []);

  const toggleReagent = (reagentId: string) => {
    setSelectedReagents(prev =>
      prev.includes(reagentId)
        ? prev.filter(id => id !== reagentId)
        : [...prev, reagentId]
    );
  };

  const handleSubmit = () => {
    if (!userGuess) {
      toast({
        title: "Please select a substance",
        description: "You need to make a guess before submitting",
        variant: "destructive",
      });
      return;
    }
    setShowResults(true);
    
    if (userGuess === currentSubstance?.id) {
      toast({
        title: "Correct!",
        description: "Your analysis was accurate!",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The substance was ${currentSubstance?.name}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-900">Reagent Test Kit Simulator</h1>
          <Button onClick={randomizeSubstance} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            New Sample
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Reagent Selection */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Available Reagents</h2>
            <div className="grid grid-cols-2 gap-2">
              {reagents.map(reagent => (
                <Button
                  key={reagent.id}
                  variant={selectedReagents.includes(reagent.id) ? "default" : "outline"}
                  className="gap-2"
                  onClick={() => toggleReagent(reagent.id)}
                >
                  <BeakerIcon className="h-4 w-4" />
                  {reagent.name}
                </Button>
              ))}
            </div>
          </Card>

          {/* Results Display */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Test Results</h2>
            <ScrollArea className="h-[200px] rounded-md border p-4">
              {selectedReagents.map(reagentId => {
                const reagent = reagents.find(r => r.id === reagentId);
                const result = currentSubstance?.reactions[reagentId];
                return (
                  <div key={reagentId} className="mb-2 p-2 bg-purple-50 rounded">
                    <span className="font-semibold">{reagent?.name}: </span>
                    <span className="text-purple-700">{result}</span>
                  </div>
                );
              })}
            </ScrollArea>
          </Card>
        </div>

        {/* Substance Selection */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Make Your Analysis</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {substances.map(substance => (
              <Button
                key={substance.id}
                variant={userGuess === substance.id ? "default" : "outline"}
                onClick={() => setUserGuess(substance.id)}
                className="gap-2"
              >
                {userGuess === substance.id && showResults && (
                  {currentSubstance?.id === substance.id ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                )}
                {substance.name}
              </Button>
            ))}
          </div>
          <Button 
            className="mt-4 w-full"
            onClick={handleSubmit}
            disabled={!userGuess || showResults}
          >
            Submit Analysis
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ReagentSimulator;

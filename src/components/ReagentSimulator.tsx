
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { BeakerIcon, RefreshCw, CheckCircle, XCircle, Shuffle, PaletteIcon } from "lucide-react";
import { reagents, substances } from "@/data/testData";
import { Substance } from "@/types/reagent";
import { Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ReagentSimulator = () => {
  const { toast } = useToast();
  const [currentSubstance, setCurrentSubstance] = useState<Substance | null>(null);
  const [actualSubstance, setActualSubstance] = useState<Substance | null>(null);
  const [selectedReagents, setSelectedReagents] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [userGuess, setUserGuess] = useState<string>("");
  const [isRandom, setIsRandom] = useState(true);
  const [showColorChart, setShowColorChart] = useState(false);

  const getRandomSubstance = () => {
    const randomIndex = Math.floor(Math.random() * substances.length);
    return substances[randomIndex];
  };

  const getSimilarSubstances = (substance: Substance) => {
    return substances.filter(s => {
      if (s.id === substance.id) return false;
      let similarReactions = 0;
      Object.keys(s.reactions).forEach(reagentId => {
        if (s.reactions[reagentId] === substance.reactions[reagentId]) {
          similarReactions++;
        }
      });
      return similarReactions >= 1; // Changed from 2 to 1
    });
  };

  const randomizeSubstance = () => {
    const selectedSubstance = getRandomSubstance();
    
    const shouldShowDifferent = Math.random() < 0.5;
    
    if (shouldShowDifferent) {
      const similarSubstances = getSimilarSubstances(selectedSubstance);
      if (similarSubstances.length > 0) {
        const randomSimilar = similarSubstances[Math.floor(Math.random() * similarSubstances.length)];
        setActualSubstance(randomSimilar);
        setCurrentSubstance(selectedSubstance);
      } else {
        setActualSubstance(selectedSubstance);
        setCurrentSubstance(selectedSubstance);
      }
    } else {
      setActualSubstance(selectedSubstance);
      setCurrentSubstance(selectedSubstance);
    }
    
    setSelectedReagents([]);
    setShowResults(false);
    setUserGuess("");
    setIsRandom(true);
  };

  const handleSubstanceSelect = (substanceId: string) => {
    const selectedSubstance = substances.find(s => s.id === substanceId);
    if (selectedSubstance) {
      const shouldShowDifferent = Math.random() < 0.5;
      
      if (shouldShowDifferent) {
        const similarSubstances = getSimilarSubstances(selectedSubstance);
        if (similarSubstances.length > 0) {
          const randomSimilar = similarSubstances[Math.floor(Math.random() * similarSubstances.length)];
          setActualSubstance(randomSimilar);
          setCurrentSubstance(selectedSubstance);
        } else {
          setActualSubstance(selectedSubstance);
          setCurrentSubstance(selectedSubstance);
        }
      } else {
        setActualSubstance(selectedSubstance);
        setCurrentSubstance(selectedSubstance);
      }
      
      setSelectedReagents([]);
      setShowResults(false);
      setUserGuess("");
      setIsRandom(false);
    }
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
    
    if (userGuess === actualSubstance?.id) {
      toast({
        title: "Correct!",
        description: "Your analysis was accurate!",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The substance was ${actualSubstance?.name}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                Reagent Test Kit Simulator
              </h1>
              <Link to="/drugle">
                <Button variant="outline" size="sm" className="gap-2 transition-all hover:scale-105 bg-gradient-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600/50 hover:to-pink-600/50 border-purple-500/50">
                  <BeakerIcon className="h-4 w-4" />
                  Play Drugle
                </Button>
              </Link>
            </div>
            <div className="flex gap-2">
              <Dialog open={showColorChart} onOpenChange={setShowColorChart}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 transition-all hover:scale-105 bg-black/40 text-gray-200 border-gray-700">
                    <PaletteIcon className="h-4 w-4" />
                    Color Chart
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full bg-black/95 border-gray-800">
                  <DialogHeader>
                    <DialogTitle className="text-gray-200">Reagent Color Chart</DialogTitle>
                  </DialogHeader>
                  <div className="w-full">
                    <img 
                      src="https://landmarkrecovery.com/wp-content/uploads/2022/09/2022-color-chart-1-1536x966.png" 
                      alt="Reagent Color Chart" 
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={randomizeSubstance} variant="outline" className="gap-2 transition-all hover:scale-105 bg-black/40 text-gray-200 border-gray-700">
                <RefreshCw className="h-4 w-4" />
                New Sample
              </Button>
            </div>
          </div>

          <Card className="p-4 bg-black/40 backdrop-blur-xl border-gray-800">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <Select
                value={currentSubstance?.id || ""}
                onValueChange={handleSubstanceSelect}
              >
                <SelectTrigger className="w-[200px] bg-black/60 text-gray-200 border-gray-700">
                  <SelectValue placeholder="Select substance to test" className="text-gray-300" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-gray-800 text-gray-200">
                  {substances.map((substance) => (
                    <SelectItem key={substance.id} value={substance.id} className="text-gray-200 focus:bg-purple-900/30 focus:text-white">
                      {substance.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button onClick={randomizeSubstance} variant="outline" className="gap-2 transition-all hover:scale-105 bg-black/40 text-gray-200 border-gray-700">
                <Shuffle className="h-4 w-4" />
                Random Sample
              </Button>
              
              {!isRandom && (
                <p className="text-sm text-muted-foreground">
                  Testing: {currentSubstance?.name}
                </p>
              )}
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-4 bg-black/40 backdrop-blur-xl border-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Available Reagents</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {reagents.map(reagent => (
                <Button
                  key={reagent.id}
                  variant={selectedReagents.includes(reagent.id) ? "default" : "outline"}
                  className={`gap-2 transition-all hover:scale-105 ${
                    selectedReagents.includes(reagent.id)
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-black/40 text-gray-200 border-gray-700 hover:bg-purple-600/20"
                  }`}
                  onClick={() => toggleReagent(reagent.id)}
                  title={reagent.description}
                >
                  <BeakerIcon className="h-4 w-4" />
                  {reagent.name}
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-4 bg-black/40 backdrop-blur-xl border-gray-800">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Test Results</h2>
            <ScrollArea className="h-[300px] rounded-md border border-gray-800 p-4 bg-black/60">
              {selectedReagents.map(reagentId => {
                const reagent = reagents.find(r => r.id === reagentId);
                const result = actualSubstance?.reactions[reagentId];
                return (
                  <div key={reagentId} className="mb-2 p-2 bg-purple-900/20 rounded backdrop-blur-sm">
                    <span className="font-semibold text-purple-200">{reagent?.name}: </span>
                    <span className="text-gray-300">{result}</span>
                  </div>
                );
              })}
            </ScrollArea>
          </Card>
        </div>

        <Card className="p-4 bg-black/40 backdrop-blur-xl border-gray-800">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">Make Your Analysis</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {substances.map(substance => (
              <Button
                key={substance.id}
                variant={userGuess === substance.id ? "default" : "outline"}
                onClick={() => setUserGuess(substance.id)}
                className={`gap-2 transition-all hover:scale-105 ${
                  userGuess === substance.id
                    ? "bg-purple-600 hover:bg-purple-700"
                    : "bg-black/40 text-gray-200 border-gray-700 hover:bg-purple-600/20"
                }`}
              >
                {userGuess === substance.id && showResults && (
                  actualSubstance?.id === substance.id ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )
                )}
                {substance.name}
              </Button>
            ))}
          </div>
          <Button 
            className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-[1.01]"
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

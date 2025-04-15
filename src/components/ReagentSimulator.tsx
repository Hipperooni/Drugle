import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { BeakerIcon, RefreshCw, CheckCircle, XCircle, Shuffle, PaletteIcon } from "lucide-react";
import { reagents, substances } from "@/data/testData";
import { Substance } from "@/types/reagent";
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
      return similarReactions >= 2;
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
            <h1 className="text-2xl font-bold text-purple-900">Reagent Test Kit Simulator</h1>
            <div className="flex gap-2">
              <Dialog open={showColorChart} onOpenChange={setShowColorChart}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <PaletteIcon className="h-4 w-4" />
                    Color Chart
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl w-full">
                  <DialogHeader>
                    <DialogTitle>Reagent Color Chart</DialogTitle>
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
              <Button onClick={randomizeSubstance} variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                New Sample
              </Button>
            </div>
          </div>

          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <Select
                value={currentSubstance?.id || ""}
                onValueChange={handleSubstanceSelect}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select substance to test" />
                </SelectTrigger>
                <SelectContent>
                  {substances.map((substance) => (
                    <SelectItem key={substance.id} value={substance.id}>
                      {substance.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button onClick={randomizeSubstance} variant="outline" className="gap-2">
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
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Available Reagents</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {reagents.map(reagent => (
                <Button
                  key={reagent.id}
                  variant={selectedReagents.includes(reagent.id) ? "default" : "outline"}
                  className="gap-2"
                  onClick={() => toggleReagent(reagent.id)}
                  title={reagent.description}
                >
                  <BeakerIcon className="h-4 w-4" />
                  {reagent.name}
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Test Results</h2>
            <ScrollArea className="h-[300px] rounded-md border p-4">
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
                  currentSubstance?.id === substance.id ? (
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

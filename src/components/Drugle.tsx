
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { 
  BeakerIcon, 
  RefreshCw, 
  ArrowLeftCircle, 
  HelpCircle, 
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  BookOpen
} from "lucide-react";
import { reagents, substances } from "@/data/testData";
import { Substance } from "@/types/reagent";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReactionColorChart from "./ReactionColorChart";

type GuessResult = {
  substance: Substance;
  results: {
    reagentId: string;
    match: "exact" | "present" | "absent";
  }[];
};

const MAX_ATTEMPTS = 6;

const Drugle = () => {
  const { toast } = useToast();
  const [targetSubstance, setTargetSubstance] = useState<Substance | null>(null);
  const [availableReagents, setAvailableReagents] = useState<string[]>([]);
  const [guesses, setGuesses] = useState<GuessResult[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSubstanceSelect, setShowSubstanceSelect] = useState(false);
  const [selectedSubstances, setSelectedSubstances] = useState<string[]>([]);

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Pick a random substance as the target
    const randomIndex = Math.floor(Math.random() * substances.length);
    const target = substances[randomIndex];
    setTargetSubstance(target);

    // Use all reagents for the game
    const selectedReagents = reagents.map(r => r.id);
    setAvailableReagents(selectedReagents);
    
    // Reset game state
    setGuesses([]);
    setCurrentGuess("");
    setGameOver(false);
    setWon(false);
    
    console.log("Target substance:", target.name);
    console.log("Selected reagents:", selectedReagents);
  };

  const handleGuess = () => {
    if (!currentGuess || !targetSubstance) return;
    
    // Find the substance object for the guessed substance
    const guessedSubstance = substances.find(s => 
      s.name.toLowerCase() === currentGuess.toLowerCase()
    );
    
    if (!guessedSubstance) {
      toast({
        title: "Invalid substance",
        description: "Please enter a valid substance name",
        variant: "destructive",
      });
      return;
    }
    
    // Determine the results for each reagent
    const results = availableReagents.map(reagentId => {
      const targetReaction = targetSubstance.reactions[reagentId];
      const guessedReaction = guessedSubstance.reactions[reagentId];
      
      let match: "exact" | "present" | "absent" = "absent";
      
      // Exact match
      if (targetReaction === guessedReaction) {
        match = "exact";
      } 
      // Both have a reaction, but different
      else if (
        targetReaction !== "No reaction" && 
        guessedReaction !== "No reaction"
      ) {
        match = "present";
      }
      
      return { reagentId, match };
    });
    
    // Add the guess to the list
    const newGuess: GuessResult = {
      substance: guessedSubstance,
      results
    };
    
    setGuesses(prev => [...prev, newGuess]);
    setCurrentGuess("");
    
    // Check if the player won
    if (guessedSubstance.id === targetSubstance.id) {
      setWon(true);
      setGameOver(true);
      toast({
        title: "Congratulations!",
        description: `You identified the substance in ${guesses.length + 1} guesses!`,
        variant: "default",
      });
    } 
    // Check if the player lost
    else if (guesses.length + 1 >= MAX_ATTEMPTS) {
      setGameOver(true);
      toast({
        title: "Game Over",
        description: `The substance was ${targetSubstance.name}`,
        variant: "destructive",
      });
    }
  };

  const handleSubstanceSelect = (substanceId: string) => {
    const substance = substances.find(s => s.id === substanceId);
    if (substance) {
      setCurrentGuess(substance.name);
      setShowSubstanceSelect(false);
    }
  };

  // Toggle substance selection
  const toggleSubstanceSelect = () => {
    setShowSubstanceSelect(prev => !prev);
  };

  const getMatchColor = (match: "exact" | "present" | "absent") => {
    switch (match) {
      case "exact": return "bg-green-500/80 border-green-400";
      case "present": return "bg-yellow-500/80 border-yellow-400";
      case "absent": return "bg-gray-700/80 border-gray-600";
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl min-h-screen flex flex-col bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      <div className="flex flex-col gap-6 flex-grow">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2 transition-all hover:scale-105 bg-black/40 text-gray-200 border-gray-700">
                <ArrowLeftCircle className="h-4 w-4" />
                Back to Simulator
              </Button>
            </Link>
            <div className="flex items-center">
              <img 
                src="https://tripsit.me/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.081b8d2e.png&w=3840&q=75" 
                alt="TripSit Logo" 
                className="h-10 mr-4 animate-pulse"
              />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Drugle
              </h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 transition-all hover:scale-105 bg-black/40 text-gray-200 border-gray-700"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Color Chart</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[90%] sm:w-[540px] bg-black/95 border-gray-800 text-gray-200">
                <SheetHeader>
                  <SheetTitle className="text-xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">Reagent Color Chart</SheetTitle>
                  <SheetDescription className="text-gray-400">
                    Reference color reactions for different substances
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-4">
                  <ReactionColorChart />
                </div>
              </SheetContent>
            </Sheet>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2 transition-all hover:scale-105 bg-black/40 text-gray-200 border-gray-700"
                    onClick={() => setShowHelp(true)}
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">How to Play</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-black/90 border-gray-700 text-gray-200">
                  <p>Learn how to play Drugle</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button 
              onClick={startNewGame} 
              variant="outline" 
              size="sm" 
              className="gap-2 transition-all hover:scale-105 bg-black/40 text-gray-200 border-gray-700"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">New Game</span>
            </Button>
          </div>
        </div>

        <Card className="p-4 bg-black/40 backdrop-blur-xl border-gray-800 flex-grow animate-fade-in">
          <div className="flex flex-col h-full">
            <div className="mb-4 flex flex-wrap justify-center gap-3">
              {availableReagents.map(reagentId => {
                const reagent = reagents.find(r => r.id === reagentId);
                return (
                  <div key={reagentId} className="flex flex-col items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="w-9 h-9 rounded-full bg-purple-900/40 flex items-center justify-center border border-purple-800 transition-all hover:bg-purple-800/40 hover:scale-110">
                            <BeakerIcon className="h-5 w-5 text-purple-200" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-black/90 border-gray-700 text-gray-200">
                          <p>{reagent?.name} Reagent</p>
                          <p className="text-xs text-gray-400">{reagent?.description}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span className="text-xs mt-1 text-gray-300">{reagent?.name}</span>
                  </div>
                );
              })}
            </div>
            
            <ScrollArea className="flex-grow mb-4 rounded-md border border-gray-800 p-4 bg-black/60 max-h-[400px]">
              {guesses.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-80">
                  <BrainCircuit className="h-12 w-12 text-purple-400 mb-2 animate-pulse" />
                  <p className="text-gray-400 text-center">
                    Guess a substance to see how it reacts with the test reagents.
                    <br />
                    <span className="text-sm">Green = exact match, Yellow = similar reaction, Gray = different</span>
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {guesses.map((guess, index) => (
                    <div key={index} className="p-3 rounded-md bg-gray-900/50 border border-gray-800 animate-fade-in">
                      <div className="mb-2 font-medium text-gray-200">{guess.substance.name}</div>
                      <div className="flex flex-wrap gap-2">
                        {guess.results.map((result, i) => {
                          const reagent = reagents.find(r => r.id === result.reagentId);
                          return (
                            <TooltipProvider key={i}>
                              <Tooltip>
                                <TooltipTrigger>
                                  <div 
                                    className={`w-8 h-8 rounded-md flex items-center justify-center border ${getMatchColor(result.match)} transition-all hover:scale-105`}
                                  >
                                    <BeakerIcon className="h-4 w-4 text-white/90" />
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent className="bg-black/90 border-gray-700 text-gray-200">
                                  <p>{reagent?.name}</p>
                                  <p className="text-xs text-gray-400">
                                    {result.match === "exact" 
                                      ? "Exact match" 
                                      : result.match === "present" 
                                        ? "Both react (different colors)" 
                                        : "Different reaction pattern"
                                    }
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
            
            <div className="mt-auto">
              <div className="flex gap-2 items-center">
                <div className="relative flex-grow">
                  <Input
                    className="bg-black/50 border-gray-700 focus:ring-1 focus:ring-purple-500 text-gray-200 pr-10"
                    placeholder="Enter substance name..."
                    value={currentGuess}
                    onChange={(e) => setCurrentGuess(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleGuess()}
                    disabled={gameOver}
                  />
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    onClick={toggleSubstanceSelect}
                  >
                    {showSubstanceSelect ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                  
                  {showSubstanceSelect && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-black/95 border border-gray-700 rounded-md z-10 shadow-lg max-h-48 overflow-y-auto">
                      {substances.map((substance) => (
                        <div
                          key={substance.id}
                          className="px-3 py-2 hover:bg-purple-900/30 cursor-pointer text-gray-200"
                          onClick={() => handleSubstanceSelect(substance.id)}
                        >
                          {substance.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleGuess}
                  disabled={!currentGuess || gameOver}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-[1.01]"
                >
                  Guess
                </Button>
              </div>
              
              <div className="mt-3 flex justify-between items-center">
                <div className="text-gray-400 text-sm">
                  Attempts: {guesses.length}/{MAX_ATTEMPTS}
                </div>
                
                {gameOver && (
                  <div className={`text-sm ${won ? "text-green-400" : "text-red-400"}`}>
                    {won ? "You won!" : `The correct substance was ${targetSubstance?.name}`}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="bg-black/95 border-gray-800 text-gray-200 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">How to Play Drugle</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-300">
            <div className="space-y-4">
              <p>
                Drugle is a drug testing themed word game, inspired by Wordle.
              </p>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-200">Rules:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The game selects a random substance and uses all available reagent tests.</li>
                  <li>Your goal is to guess the substance in {MAX_ATTEMPTS} or fewer attempts.</li>
                  <li>After each guess, you'll see how your substance's reactions compare to the target substance.</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-200">Feedback Colors:</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-green-500/80 border border-green-400"></div>
                    <span>Green: Exact match - the reaction is identical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-yellow-500/80 border border-yellow-400"></div>
                    <span>Yellow: Similar - both substances react, but with different colors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-gray-700/80 border border-gray-600"></div>
                    <span>Gray: Different - one substance reacts while the other doesn't (or vice versa)</span>
                  </div>
                </div>
              </div>
              
              <p>
                Use your chemistry knowledge and deduction skills to identify the mystery substance!
              </p>
              
              <p>
                Check the Color Chart button to see how different substances react with various reagents.
              </p>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Drugle;

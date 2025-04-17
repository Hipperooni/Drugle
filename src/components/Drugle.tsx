
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { 
  BeakerIcon, 
  RefreshCw, 
  HelpCircle, 
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  BookOpen,
  AlertTriangle,
  Copy,
  Share2
} from "lucide-react";
import { reagents, substances } from "@/data/testData";
import { Substance } from "@/types/reagent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  const [showColourChart, setShowColourChart] = useState(false);
  const [animateGuess, setAnimateGuess] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Animation refs
  const reagentRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    setShowResults(false);
    
    console.log("Target substance:", target.name);
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
    
    // Add fill animation
    triggerFillAnimation();
    
    setGuesses(prev => [...prev, newGuess]);
    setCurrentGuess("");
    
    // Check if the player won
    if (guessedSubstance.id === targetSubstance.id) {
      setWon(true);
      setGameOver(true);
      setShowResults(true);
      toast({
        title: "Congratulations!",
        description: `You identified the substance in ${guesses.length + 1} guesses!`,
        variant: "default",
      });
    } 
    // Check if the player lost
    else if (guesses.length + 1 >= MAX_ATTEMPTS) {
      setGameOver(true);
      setShowResults(true);
      toast({
        title: "Game Over",
        description: `The substance was ${targetSubstance.name}`,
        variant: "destructive",
      });
    }
  };

  const triggerFillAnimation = () => {
    // Add animation class to reagent icons
    setAnimateGuess(true);
    setTimeout(() => setAnimateGuess(false), 800);
  };

  const handleSubstanceSelect = (substanceName: string) => {
    setCurrentGuess(substanceName);
    setShowSubstanceSelect(false);
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

  // Get the latest guess for displaying on reagent icons
  const latestGuess = guesses.length > 0 ? guesses[guesses.length - 1] : null;
  
  // Filter substances based on current input for autocomplete
  const filteredSubstances = substances.filter(s => 
    currentGuess ? s.name.toLowerCase().includes(currentGuess.toLowerCase()) : true
  );

  // Generate result text for sharing
  const generateResultText = () => {
    if (!targetSubstance) return "";
    
    const resultEmojis = guesses.map(guess => {
      const matches = guess.results.map(r => {
        switch (r.match) {
          case "exact": return "🟩";
          case "present": return "🟨";
          case "absent": return "⬛";
        }
      });
      
      return matches.join("");
    });
    
    const attemptsText = won 
      ? `I solved today's Drugle in ${guesses.length}/${MAX_ATTEMPTS} attempts!` 
      : `I failed today's Drugle. The substance was ${targetSubstance.name}.`;
    
    return `Drugle ${new Date().toLocaleDateString('en-AU')}\n${attemptsText}\n\n${resultEmojis.join("\n")}`;
  };
  
  // Copy results to clipboard
  const copyResults = () => {
    navigator.clipboard.writeText(generateResultText());
    toast({
      title: "Copied to clipboard",
      description: "Results copied to your clipboard!",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-gray-200 overflow-x-hidden flex flex-col">
      <div className="container mx-auto px-4 pt-4 pb-20 max-w-4xl flex flex-col flex-grow">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <img 
              src="https://tripsit.me/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.081b8d2e.png&w=3840&q=75" 
              alt="TripSit Logo" 
              className="h-10 mr-4"
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Drugle
            </h1>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="default" 
              size="sm" 
              className={`gap-2 transition-all hover:scale-105 ${showColourChart ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-600 to-purple-600 opacity-90'}`}
              onClick={() => setShowColourChart(!showColourChart)}
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Colour Chart</span>
            </Button>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="gap-2 transition-all hover:scale-105 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"
                    onClick={() => setShowHelp(true)}
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span className="hidden sm:inline">Help</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-black/90 border-gray-700 text-gray-200">
                  <p>Learn how to play Drugle</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button 
              onClick={startNewGame} 
              variant="default" 
              size="sm" 
              className="gap-2 transition-all hover:scale-105 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">New Game</span>
            </Button>
          </div>
        </header>

        {showColourChart && (
          <Card className="mb-6 p-4 bg-black/40 backdrop-blur-xl border-gray-800 animate-fade-in">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Reagent Colour Chart
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowColourChart(false)}
                className="h-8 w-8 p-0 rounded-full"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
            <div className="max-h-[300px]">
              <ReactionColorChart />
            </div>
          </Card>
        )}

        <div className="flex-grow">
          <Card className="p-4 bg-black/40 backdrop-blur-xl border-gray-800 animate-fade-in mb-6">
            <div className="mb-4">
              <div className="flex flex-wrap justify-center gap-8 mb-4">
                {availableReagents.map((reagentId, index) => {
                  const reagent = reagents.find(r => r.id === reagentId);
                  const result = latestGuess?.results.find(r => r.reagentId === reagentId);
                  const matchStyle = result ? getMatchColor(result.match) : "";
                  
                  return (
                    <div key={reagentId} className="flex flex-col items-center">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <div 
                              ref={el => reagentRefs.current[index] = el}
                              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${animateGuess ? 'animate-scale-in' : 'hover:scale-110'} ${latestGuess ? matchStyle : 'bg-purple-900/40 border-purple-800 hover:bg-purple-800/40'}`}
                            >
                              <BeakerIcon className="h-5 w-5 text-purple-200" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-black/90 border-gray-700 text-gray-200">
                            <p>{reagent?.name} Reagent</p>
                            <p className="text-xs text-gray-400">{reagent?.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <span className="text-xs mt-1 text-gray-300 text-center">{reagent?.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <ScrollArea className="rounded-md border border-gray-800 p-4 bg-black/60 max-h-[350px]">
              {guesses.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[200px] opacity-80">
                  <BrainCircuit className="h-12 w-12 text-purple-400 mb-2 animate-pulse" />
                  <div className="text-sm text-gray-300 text-center max-w-md mx-auto space-y-4">
                    <p className="font-medium text-gray-200">How to Play Drugle:</p>
                    
                    <ul className="list-disc pl-5 space-y-1 text-left">
                      <li>The game selects a random substance and uses all available reagent tests.</li>
                      <li>Your goal is to guess the substance in {MAX_ATTEMPTS} or fewer attempts.</li>
                      <li>After each guess, you'll see how your substance's reactions compare to the target substance.</li>
                    </ul>
                    
                    <div className="space-y-2">
                      <p className="font-medium text-gray-200">Feedback Colours:</p>
                      <div className="flex flex-col items-start gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-sm bg-green-500/80 border border-green-400"></div>
                          <span>Green: Exact match - the reaction is identical</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-sm bg-yellow-500/80 border border-yellow-400"></div>
                          <span>Yellow: Similar - both substances react, but with different colours</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-sm bg-gray-700/80 border border-gray-600"></div>
                          <span>Grey: Different - one substance reacts while the other doesn't</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-400">Previous Guesses</h3>
                    <div className="text-sm font-medium px-2 py-1 rounded-md bg-gradient-to-r from-blue-600/40 to-purple-600/40 border border-purple-500/30 text-gray-300">
                      Attempt {guesses.length}/{MAX_ATTEMPTS}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {guesses.map((guess, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-md bg-gray-900/50 border border-gray-800 ${index === guesses.length - 1 && animateGuess ? 'animate-scale-in' : 'animate-fade-in'}`}
                      >
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
                                          ? "Both react (different colours)" 
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
                </div>
              )}
            </ScrollArea>
            
            <div className="mt-4">
              <div className="flex gap-2 items-center">
                <div className="relative flex-grow">
                  <Input
                    className="bg-black/50 border-gray-700 focus:ring-1 focus:ring-purple-500 text-gray-200 pr-10"
                    placeholder="Enter substance name..."
                    value={currentGuess}
                    onChange={(e) => setCurrentGuess(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleGuess()}
                    onFocus={() => setShowSubstanceSelect(true)}
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
                    <div className="absolute top-full left-0 right-0 mt-1 bg-black/95 border border-gray-700 rounded-md z-10 shadow-lg max-h-48 overflow-y-auto text-gray-200">
                      {filteredSubstances.map((substance) => (
                        <div
                          key={substance.id}
                          className="px-3 py-2 hover:bg-purple-900/30 cursor-pointer text-gray-200"
                          onClick={() => handleSubstanceSelect(substance.name)}
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
              
              {gameOver && !showResults && (
                <div className={`mt-3 p-2 rounded-md text-center ${won ? "bg-green-900/40 border border-green-800" : "bg-red-900/40 border border-red-800"}`}>
                  {won ? "You won!" : `The correct substance was ${targetSubstance?.name}`}
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <footer className="w-full bg-black/70 border-t border-gray-800 p-4 mt-auto">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 mb-2 text-yellow-500">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="font-semibold">Disclaimer</h3>
          </div>
          <p className="text-sm text-gray-400">
            <span>
              THIS IS FOR ENTERTAINMENT PURPOSES ONLY. THE COLOUR CHART MAY NOT BE ACCURATE. NOTHING ON THIS PAGE SHOULD BE USED AS A REFERENCE FOR SUBSTANCE IDENTIFICATION.
            </span>
            <span className="ml-1">
              <a
                href="https://dancesafe.org/testing-kit-instructions/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline hover:text-blue-300"
              >
                For up-to-date information on reagents click here.
              </a>
            </span>
          </p>
        </div>
      </footer>

      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="bg-black/95 border-gray-800 text-gray-200 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">How to Play Drugle</DialogTitle>
          </DialogHeader>
          <div className="text-gray-300">
            <div className="space-y-4">
              <p>
                Drugle is a drug testing themed word game, inspired by Wordle.
              </p>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-200">Rules:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The game selects a random substance.</li>
                  <li>Your goal is to guess the substance in {MAX_ATTEMPTS} or fewer attempts.</li>
                  <li>After each guess, you'll see how your guess substance's reactions compare to the target substance.</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-200">Feedback Colours:</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-green-500/80 border border-green-400"></div>
                    <span>Green: Exact match - the reaction is identical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-yellow-500/80 border border-yellow-400"></div>
                    <span>Yellow: Similar - both substances react, but with different colours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-gray-700/80 border border-gray-600"></div>
                    <span>Grey: Different - one substance reacts while the other doesn't (or vice versa)</span>
                  </div>
                </div>
              </div>
              
              <p>
                Use your chemistry knowledge and deduction skills to identify the mystery substance!
              </p>
              
              <p>
                Check the Colour Chart button to see how different substances react with various reagents.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Results dialog */}
      <Dialog open={showResults} onOpenChange={setShowResults}>
        <DialogContent className="bg-black/95 border-gray-800 text-gray-200 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              {won ? "Congratulations!" : "Game Over"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-center text-gray-300">
              {won 
                ? `You identified the substance in ${guesses.length}/${MAX_ATTEMPTS} attempts!` 
                : `The substance was ${targetSubstance?.name}`
              }
            </p>
            
            <div className="bg-gray-900/60 p-4 rounded-md border border-gray-800">
              <div className="text-sm font-mono whitespace-pre-line mb-4">
                {generateResultText()}
              </div>
            </div>
            
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={copyResults}
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Copy className="h-4 w-4" />
                Copy Results
              </Button>
              
              <Button 
                onClick={() => {
                  startNewGame();
                  setShowResults(false);
                }}
                className="gap-2 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <RefreshCw className="h-4 w-4" />
                Play Again
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Drugle;


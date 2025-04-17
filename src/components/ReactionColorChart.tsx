
import React from "react";
import { reagents, substances } from "@/data/testData";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const ReactionColorChart = () => {
  // Group reactions by colour for better visualization
  const getReactionClass = (reaction: string) => {
    if (reaction === "No reaction") return "bg-gray-800 text-gray-400";
    
    // Handle multi-colour reactions with gradients
    if (reaction.includes("/")) {
      const colours = reaction.split("/");
      
      // Create a gradient class based on the colours
      if (colours.length === 2) {
        const firstColour = getColourClass(colours[0], true);
        const secondColour = getColourClass(colours[1], true);
        return `bg-gradient-to-r ${firstColour} ${secondColour} text-gray-100`;
      }
    }
    
    return getColourClass(reaction);
  };
  
  // Helper function to get colour classes
  const getColourClass = (reaction: string, forGradient: boolean = false) => {
    const baseClass = forGradient ? "from-" : "bg-";
    const textClass = forGradient ? "" : "text-";
    
    if (reaction.includes("Purple")) return `${baseClass}purple-800/40 ${textClass}purple-200`;
    if (reaction.includes("Blue")) return `${baseClass}blue-800/40 ${textClass}blue-200`;
    if (reaction.includes("Green")) return `${baseClass}green-800/40 ${textClass}green-200`;
    if (reaction.includes("Yellow")) return `${baseClass}yellow-800/40 ${textClass}yellow-200`;
    if (reaction.includes("Orange")) return `${baseClass}orange-800/40 ${textClass}orange-200`;
    if (reaction.includes("Red")) return `${baseClass}red-800/40 ${textClass}red-200`;
    if (reaction.includes("Brown")) return `${baseClass}amber-800/40 ${textClass}amber-200`;
    if (reaction.includes("Black")) return `${baseClass}gray-900 ${textClass}gray-200`;
    if (reaction.includes("White")) return `${baseClass}gray-200/20 ${textClass}gray-100`;
    
    return `${baseClass}gray-700/40 ${textClass}gray-200`;
  };

  return (
    <div className="flex flex-col gap-3">
      <ScrollArea className="h-[250px]">
        <div className="overflow-x-auto">
          <Table className="text-xs">
            <TableHeader className="sticky top-0 bg-black/80 backdrop-blur-sm z-10">
              <TableRow>
                <TableHead className="text-gray-400 w-24">Substance</TableHead>
                {reagents.map(reagent => (
                  <TableHead key={reagent.id} className="text-gray-400 px-1">
                    {reagent.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {substances.map(substance => (
                <TableRow key={substance.id} className="hover:bg-gray-900/50">
                  <TableCell className="font-medium text-gray-200">{substance.name}</TableCell>
                  {reagents.map(reagent => {
                    const reaction = substance.reactions[reagent.id] || "No data";
                    return (
                      <TableCell 
                        key={reagent.id} 
                        className={`${getReactionClass(reaction)} text-center px-1 py-2 rounded-sm transition-colors`}
                      >
                        {reaction}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ReactionColorChart;

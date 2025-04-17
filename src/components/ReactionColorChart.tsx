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
    if (reaction === "No reaction") {
      return { backgroundColor: "#374151", color: "#d1d5db" }; // Default Gray
    }
    return getColourClass(reaction);
  };

  const getColourClass = (reaction: string) => {
    // Split the reaction string by "→" and trim whitespace
    const colors = reaction.split("→").map(color => color.trim());
  
    // Map color names to their corresponding hex codes
    const colorMap: { [key: string]: string } = {
      Purple: "#6b21a8",
      Blue: "#1e3a8a",
      Green: "#166534",
      Yellow: "#ca8a04",
      Orange: "#ea580c",
      Red: "#b91c1c",
      Brown: "#78350f",
      Black: "#111827",
      White: "#f3f4f6",
    };
  
    // Convert color names to hex codes
    const hexColors = colors.map(color => colorMap[color]).filter(Boolean);
  
    if (hexColors.length === 0) {
      // Default color for "No data" or unrecognized reactions
      return { backgroundColor: "#374151", color: "#d1d5db" }; // Gray
    }
  
    if (hexColors.length === 1) {
      // Single color
      return { backgroundColor: hexColors[0], color: "#ffffff" }; // White text
    }
  
    // Multiple colors: Create a gradient
    const gradient = `linear-gradient(to right, ${hexColors.join(", ")})`;
    return { backgroundImage: gradient, color: "#ffffff" }; // White text
  };

  return (
    <div className="flex flex-col gap-3">
      <ScrollArea className="h-[250px]" orientation="both">
        <div className="min-w-[600px]">
          <Table className="text-xs shadow-lg rounded-lg overflow-hidden">
                        <TableHeader className="sticky top-0 bg-gradient-to-r from-gray-800 to-black shadow-md z-10">
              <TableRow className="border-b border-gray-700">
                <TableHead className="text-gray-300 w-24 bg-black/60">Substance</TableHead>
                {reagents.map(reagent => (
                  <TableHead 
                    key={reagent.id} 
                    className="text-gray-300 px-2 text-center bg-black/60 w-[100px]" // Set a fixed width
                  >
                    {reagent.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {substances.map(substance => (
                <TableRow key={substance.id} className="hover:bg-gray-800/50 border-b border-gray-700">
                  <TableCell className="font-semibold text-gray-200 bg-black/40 sticky left-0 w-24">{substance.name}</TableCell>
                  {reagents.map(reagent => {
                    const reaction = substance.reactions[reagent.id] || "No data";
                    return (
                      <TableCell
                        key={reagent.id}
                        style={getReactionClass(reaction)} // Apply dynamic styles
                        className="text-center px-2 py-2 transition-transform transform hover:scale-105 border border-gray-700 w-[100px]"
                      >
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
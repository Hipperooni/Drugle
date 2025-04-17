
import React, { useState } from "react";
import { reagents, substances } from "@/data/testData";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

const ReactionColorChart = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredSubstances = substances.filter(substance => 
    substance.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group reactions by color for better visualization
  const getReactionClass = (reaction: string) => {
    if (reaction === "No reaction") return "bg-gray-800 text-gray-400";
    
    if (reaction.includes("Purple")) return "bg-purple-800/40 text-purple-200";
    if (reaction.includes("Blue")) return "bg-blue-800/40 text-blue-200";
    if (reaction.includes("Green")) return "bg-green-800/40 text-green-200";
    if (reaction.includes("Yellow")) return "bg-yellow-800/40 text-yellow-200";
    if (reaction.includes("Orange")) return "bg-orange-800/40 text-orange-200";
    if (reaction.includes("Red")) return "bg-red-800/40 text-red-200";
    if (reaction.includes("Brown")) return "bg-amber-800/40 text-amber-200";
    if (reaction.includes("Black")) return "bg-gray-900 text-gray-200";
    if (reaction.includes("White")) return "bg-gray-200/20 text-gray-100";
    
    return "bg-gray-700/40 text-gray-200";
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search substances..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 bg-black/60 border-gray-700 text-gray-200"
        />
      </div>
      
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
              {filteredSubstances.map(substance => (
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

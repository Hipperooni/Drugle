
import { Substance, Reagent } from "../types/reagent";

export const reagents: Reagent[] = [
  {
    id: "marquis",
    name: "Marquis",
    description: "Sulfuric acid and formaldehyde"
  },
  {
    id: "mecke",
    name: "Mecke",
    description: "Selenious acid"
  },
  {
    id: "mandelin",
    name: "Mandelin",
    description: "Ammonium vanadate in sulfuric acid"
  },
  {
    id: "liebermann",
    name: "Liebermann",
    description: "Sodium nitrite in sulfuric acid"
  }
];

export const substances: Substance[] = [
  {
    id: "mdma",
    name: "MDMA",
    reactions: {
      marquis: "Purple → Black",
      mecke: "Green → Blue",
      mandelin: "Blue → Black",
      liebermann: "Black"
    }
  },
  {
    id: "amphetamine",
    name: "Amphetamine",
    reactions: {
      marquis: "Orange",
      mecke: "Brown",
      mandelin: "Green",
      liebermann: "Yellow"
    }
  },
  {
    id: "methamphetamine",
    name: "Methamphetamine",
    reactions: {
      marquis: "Orange → Brown",
      mecke: "Green → Brown",
      mandelin: "Orange → Brown",
      liebermann: "Yellow → Brown"
    }
  }
];

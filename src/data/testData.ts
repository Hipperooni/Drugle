
import { Substance, Reagent } from "../types/reagent";

export const reagents: Reagent[] = [
  {
    id: "marquis",
    name: "Marquis",
    description: "Sulfuric acid and formaldehyde"
  },
  {
    id: "simons",
    name: "Simon's",
    description: "Sodium nitroprusside"
  },
  {
    id: "froehde",
    name: "Froehde",
    description: "Molybdic acid"
  },
  {
    id: "liebermann",
    name: "Liebermann",
    description: "Sodium nitrite in sulfuric acid"
  },
  {
    id: "morris",
    name: "Morris",
    description: "Ferric chloride"
  },
  {
    id: "ehrlich",
    name: "Ehrlich",
    description: "p-DMAB in ethanol/hydrochloric acid"
  },
  {
    id: "mandelin",
    name: "Mandelin",
    description: "Ammonium vanadate in sulfuric acid"
  },
  {
    id: "mecke",
    name: "Mecke",
    description: "Selenious acid"
  },
  {
    id: "folin",
    name: "Folin",
    description: "Phosphomolybdic acid"
  }
];

export const substances: Substance[] = [
  {
    id: "mdma",
    name: "MDMA",
    reactions: {
      marquis: "Purple → Black",
      simons: "Blue",
      froehde: "Black",
      liebermann: "Black",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Black",
      mecke: "Green → Black",
      folin: "Pink"
    }
  },
  {
    id: "mda",
    name: "MDA",
    reactions: {
      marquis: "Purple → Black",
      simons: "No reaction",
      froehde: "Black",
      liebermann: "Black",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Black",
      mecke: "Green → Black",
      folin: "Yellow"
    }
  },
  {
    id: "5apb",
    name: "5-APB/6-APB",
    reactions: {
      marquis: "Black",
      simons: "Blue",
      froehde: "Black",
      liebermann: "Black",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Black",
      mecke: "Blue",
      folin: "Tan"
    }
  },
  {
    id: "methamphetamine",
    name: "Methamphetamine",
    reactions: {
      marquis: "Orange",
      simons: "Blue",
      froehde: "No reaction",
      liebermann: "Orange",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Green",
      mecke: "Black",
      folin: "Pink"
    }
  },
  {
    id: "amphetamine",
    name: "Amphetamine",
    reactions: {
      marquis: "Orange",
      simons: "No reaction",
      froehde: "No reaction",
      liebermann: "Orange",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Green",
      mecke: "Black",
      folin: "Tan"
    }
  },
  {
    id: "methylone",
    name: "Methylone",
    reactions: {
      marquis: "Yellow",
      simons: "Blue",
      froehde: "Yellow → Green",
      liebermann: "Green → Black",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Yellow → Brown",
      mecke: "Yellow → Brown",
      folin: "No reaction"
    }
  },
  {
    id: "pentylone",
    name: "N-Ethyl-Pentylone",
    reactions: {
      marquis: "Yellow",
      simons: "Blue",
      froehde: "Yellow",
      liebermann: "No reaction",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Green → Brown",
      mecke: "Yellow → Brown",
      folin: "No reaction"
    }
  },
  {
    id: "mephedrone",
    name: "Mephedrone",
    reactions: {
      marquis: "No reaction",
      simons: "Blue",
      froehde: "No reaction",
      liebermann: "Yellow",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Light Brown",
      mecke: "Light Brown",
      folin: "No reaction"
    }
  },
  {
    id: "alphapvp",
    name: "Alpha-PVP",
    reactions: {
      marquis: "No reaction",
      simons: "No reaction",
      froehde: "No reaction",
      liebermann: "Light Yellow",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "No reaction",
      mecke: "No reaction",
      folin: "Tan"
    }
  },
  {
    id: "cocaine",
    name: "Cocaine",
    reactions: {
      marquis: "No reaction",
      simons: "No reaction",
      froehde: "No reaction",
      liebermann: "Yellow",
      morris: "Blue",
      ehrlich: "No reaction",
      mandelin: "Orange",
      mecke: "No reaction",
      folin: "No reaction"
    }
  },
  {
    id: "ketamine",
    name: "Ketamine",
    reactions: {
      marquis: "No reaction",
      simons: "No reaction",
      froehde: "No reaction",
      liebermann: "Light Yellow",
      morris: "Purple",
      ehrlich: "No reaction",
      mandelin: "Brown",
      mecke: "No reaction",
      folin: "No reaction"
    }
  },
  {
    id: "dck",
    name: "DCK/2F-DCK",
    reactions: {
      marquis: "No reaction",
      simons: "No reaction",
      froehde: "No reaction",
      liebermann: "No reaction",
      morris: "Navy",
      ehrlich: "No reaction",
      mandelin: "No reaction",
      mecke: "No reaction",
      folin: "No reaction"
    }
  },
  {
    id: "2cb",
    name: "2C-B",
    reactions: {
      marquis: "Yellow → Green",
      simons: "No reaction",
      froehde: "Yellow",
      liebermann: "Yellow → Black",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Light Green",
      mecke: "Brown",
      folin: "White"
    }
  },
  {
    id: "2ci",
    name: "2C-I",
    reactions: {
      marquis: "Yellow → Green → Blue",
      simons: "No reaction",
      froehde: "Green",
      liebermann: "Yellow → Black",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Brown",
      mecke: "Brown",
      folin: "No reaction"
    }
  },
  {
    id: "mescaline",
    name: "Mescaline",
    reactions: {
      marquis: "Orange",
      simons: "No reaction",
      froehde: "Yellow → Brown",
      liebermann: "Yellow → Black",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Brown",
      mecke: "Brown",
      folin: "No reaction"
    }
  },
  {
    id: "lsd",
    name: "LSD",
    reactions: {
      marquis: "No reaction",
      simons: "No reaction",
      froehde: "No reaction",
      liebermann: "No reaction",
      morris: "No reaction",
      ehrlich: "Purple",
      mandelin: "No reaction",
      mecke: "No reaction",
      folin: "No reaction"
    }
  },
  {
    id: "tfmpp",
    name: "TFMPP",
    reactions: {
      marquis: "No reaction",
      simons: "No reaction",
      froehde: "No reaction",
      liebermann: "Yellow",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Yellow",
      mecke: "No reaction",
      folin: "Red"
    }
  },
  {
    id: "pma",
    name: "PMA",
    reactions: {
      marquis: "No reaction",
      simons: "No reaction",
      froehde: "Light Green",
      liebermann: "Purple → Brown",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Green → Brown",
      mecke: "No reaction",
      folin: "Tan"
    }
  },
  {
    id: "pmma",
    name: "PMMA",
    reactions: {
      marquis: "No reaction",
      simons: "Blue",
      froehde: "Light Green",
      liebermann: "Purple → Brown",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Green → Brown",
      mecke: "No reaction",
      folin: "Pink"
    }
  },
  {
    id: "oxycodone",
    name: "Oxycodone",
    reactions: {
      marquis: "Light Purple",
      simons: "No reaction",
      froehde: "Yellow",
      liebermann: "No reaction",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Green → Olive",
      mecke: "Light Brown",
      folin: "No reaction"
    }
  },
  {
    id: "heroin",
    name: "Heroin",
    reactions: {
      marquis: "Dark Red",
      simons: "No reaction",
      froehde: "Dark Purple",
      liebermann: "Black",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Brown",
      mecke: "Green",
      folin: "No reaction"
    }
  },
  {
    id: "aspirin",
    name: "Aspirin",
    reactions: {
      marquis: "Red",
      simons: "No reaction",
      froehde: "Violet",
      liebermann: "Brown",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Black",
      mecke: "No reaction",
      folin: "No reaction"
    }
  },
  {
    id: "sugar",
    name: "Sugar",
    reactions: {
      marquis: "Yellow → Brown",
      simons: "No reaction",
      froehde: "Light Brown",
      liebermann: "White",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Brown",
      mecke: "Yellow → Black",
      folin: "No reaction"
    }
  }
];

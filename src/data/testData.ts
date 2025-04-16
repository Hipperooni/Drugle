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
      mandelin: "Blue → Black",
      mecke: "Green → Blue → Black",
      folin: "Blue"
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
      mandelin: "Blue → Black",
      mecke: "Green → Blue → Black",
      folin: "Blue"
    }
  },
  {
    id: "cocaine",
    name: "Cocaine",
    reactions: {
      marquis: "No reaction",
      simons: "No reaction",
      froehde: "No reaction",
      liebermann: "Orange → Yellow",
      morris: "Blue",
      ehrlich: "No reaction",
      mandelin: "White → Yellow",
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
      liebermann: "No reaction",
      morris: "Orange",
      ehrlich: "No reaction",
      mandelin: "Orange",
      mecke: "No reaction",
      folin: "No reaction"
    }
  },
  {
    id: "2cb",
    name: "2C-B",
    reactions: {
      marquis: "Green → Blue",
      simons: "No reaction",
      froehde: "Green",
      liebermann: "Brown",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Green",
      mecke: "Yellow → Green",
      folin: "No reaction"
    }
  },
  {
    id: "mescaline",
    name: "Mescaline",
    reactions: {
      marquis: "Orange",
      simons: "No reaction",
      froehde: "Yellow",
      liebermann: "Brown",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Orange",
      mecke: "Olive",
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
    id: "pma",
    name: "PMA",
    reactions: {
      marquis: "Orange → Brown",
      simons: "No reaction",
      froehde: "Yellow",
      liebermann: "Yellow → Brown",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Brown",
      mecke: "Green → Brown",
      folin: "Orange"
    }
  },
  {
    id: "oxycodone",
    name: "Oxycodone",
    reactions: {
      marquis: "Purple → Violet",
      simons: "No reaction",
      froehde: "Purple → Violet",
      liebermann: "Brown",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Green → Blue",
      mecke: "Green → Blue",
      folin: "No reaction"
    }
  },
  {
    id: "heroin",
    name: "Heroin",
    reactions: {
      marquis: "Purple → Violet",
      simons: "No reaction",
      froehde: "Purple → Green",
      liebermann: "Purple → Brown",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Green → Blue",
      mecke: "Blue → Dark blue",
      folin: "No reaction"
    }
  },
  {
    id: "aspirin",
    name: "Aspirin",
    reactions: {
      marquis: "No reaction",
      simons: "No reaction",
      froehde: "No reaction",
      liebermann: "No reaction",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "No reaction",
      mecke: "No reaction",
      folin: "No reaction"
    }
  },
  {
    id: "sugar",
    name: "Sugar",
    reactions: {
      marquis: "No reaction",
      simons: "No reaction",
      froehde: "No reaction",
      liebermann: "No reaction",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "No reaction",
      mecke: "No reaction",
      folin: "No reaction"
    }
  },
  {
    id: "caffeine",
    name: "Caffeine",
    reactions: {
      marquis: "No reaction",
      simons: "No reaction",
      froehde: "No reaction",
      liebermann: "Yellow",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Orange",
      mecke: "No reaction",
      folin: "No reaction"
    }
  },
  {
    id: "amphetamine",
    name: "Amphetamine",
    reactions: {
      marquis: "Orange",
      simons: "No reaction",
      froehde: "Yellow",
      liebermann: "Yellow",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Green",
      mecke: "Brown",
      folin: "Orange"
    }
  },
  {
    id: "methamphetamine",
    name: "Methamphetamine",
    reactions: {
      marquis: "Orange → Brown",
      simons: "Blue",
      froehde: "Yellow → Brown",
      liebermann: "Yellow → Brown",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Orange → Brown",
      mecke: "Green → Brown",
      folin: "Orange"
    }
  },
  {
    id: "methylone",
    name: "Methylone",
    reactions: {
      marquis: "Yellow → Brown",
      simons: "Blue",
      froehde: "Yellow",
      liebermann: "Yellow → Brown",
      morris: "No reaction",
      ehrlich: "No reaction",
      mandelin: "Yellow → Brown",
      mecke: "Yellow → Green",
      folin: "Orange"
    }
  }
];

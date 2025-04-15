
export type Substance = {
  id: string;
  name: string;
  reactions: {
    [reagent: string]: string; // reagent name -> color result
  };
};

export type Reagent = {
  id: string;
  name: string;
  description: string;
};

export interface Game {
   data:GamesIdentity[];
  }

  export interface GamesIdentity{
    logicalName:string;
    physicalFieldList:string[];
    start:string;
    end:string;
  }
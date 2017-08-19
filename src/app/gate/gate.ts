export class Gate {
    typeId: number;
    typeName: string;
    description: string;
    connector: string;
    bitIdx: number = -1; 
    spotIdx: number = -1; 

    constructor(typeId?: number, typeName?: string, description?: string, connector?: string){
        typeId ? this.typeId = typeId : this.typeId = 0;
        typeName ? this.typeName = typeName : this.typeName = "No Gate";
        description ? this.description = description : this.description = "";
        connector ? this.connector = connector : this.connector = "";
    }
  }
  
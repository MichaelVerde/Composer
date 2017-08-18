export class Gate {
    typeId: number;
    typeName: string;
    description: String;

    constructor(typeId?: number, typeName?: string, description?: string){
        typeId ? this.typeId = typeId : this.typeId = 0;
        typeName ? this.typeName = typeName : this.typeName = "No Gate";
        description ? this.description = description : this.description = "";
    }
  }
  
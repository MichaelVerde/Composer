export class Gate {
    //gate type
    isMeasurement: boolean = false;
    typeId: number;
    typeName: string;
    description: string;

    //gate couple/ connectors
    coupled: number;
    connector: string;

    //gate settings 
    paramReal: number = 0;
    paramComplex: number = 0;
    phase: number = 0;
    transmittivity: number = 0;

    //gate location
    bitIdx: number; 
    spotIdx: number; 

    constructor(typeId?: number, typeName?: string, description?: string, connector?: string,coupled?: number){
        typeId ? this.typeId = typeId : this.typeId = 0;
        typeName ? this.typeName = typeName : this.typeName = "No Gate";
        description ? this.description = description : this.description = "";
        connector ? this.connector = connector : this.connector = "";
        coupled ? this.coupled = coupled : this.coupled = 0;

        this.bitIdx = -1;
        this.spotIdx = -1;

        if(typeId === 20){
            this.isMeasurement = true;
        }
    }
  }


  
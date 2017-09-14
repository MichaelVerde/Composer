export class Gate {
    //gate type
    isMeasurement: boolean = false;
    typeId: number;
    typeName: string;
    icon: string = "";
    description: string;
    conjugate: boolean;

    //gate couple/ connectors
    coupled: number;
    connector: string;

    //gate settings 
    parameters: GateParameter[] = [];

    //measurment settings
    measurementType: number = 0;
    measurementInt: number = 0;

    //remeber if the settings modal has been openened
    modalOpened = false;

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
        this.conjugate = false;

        if(typeId === 20){
            this.isMeasurement = true;
            this.measurementType = 1;
            this.icon = "dashboard";
        }

        if([1,12].indexOf(typeId) !== -1){
            this.parameters.push(new GateParameter("Squeezing Factor", 0, 0, null, null, null));
        }
        if([2].indexOf(typeId) !== -1){
            this.parameters.push(new GateParameter("Displacement", 0, 0, null, null, null));
        }
        if([3,4,5].indexOf(typeId) !== -1){
            this.parameters.push(new GateParameter("Value", 0, null, null, null, null));
        }
        if([7,8,10,11].indexOf(typeId) !== -1){
            this.parameters.push(new GateParameter("Phase", null, null, null, 0, null));
        }
        if([11].indexOf(typeId) !== -1){
            this.parameters.push(new GateParameter("Transmittivity", 0, null, null, null, null));
        }
    }
  }

  export class GateParameter{
      name: string;
      a: number;
      b: number;
      r: number;
      phi: number;
      gateIdx: number;

      constructor(name: string, a: number, b :number, r :number, phi :number, gateIdx :number){
        this.name = name;
        this.a = a;
        this.b = b;
        this.r = r;
        this.phi = phi;
        this.gateIdx = gateIdx;
      }
  }


  
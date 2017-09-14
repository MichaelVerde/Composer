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
            this.parameters.push(new GateParameter("Squeezing Factor", 0, 0, null, null));
        }
        if([2].indexOf(typeId) !== -1){
            this.parameters.push(new GateParameter("Displacement", 0, 0, null, null));
        }
        if([3,4,5].indexOf(typeId) !== -1){
            this.parameters.push(new GateParameter("Value", 0, null, null, null));
        }
        if([7,8,10,11].indexOf(typeId) !== -1){
            this.parameters.push(new GateParameter("Phase", null, null, null, 0));
        }
        if([11].indexOf(typeId) !== -1){
            this.parameters.push(new GateParameter("Transmittivity", 0, null, null, null));
        }
    }
  }

  export class GateParameter{
      name: string;
      phaseMode: boolean;
      a: GateParameterItem;
      b: GateParameterItem;
      r: GateParameterItem;
      phi: GateParameterItem;

      constructor(name: string, a: number, b :number, r :number, phi :number){
        this.name = name;
        if(a !== null)this.a = new GateParameterItem(a);
        if(b !== null)this.b = new GateParameterItem(b);
        if(r !== null)this.r = new GateParameterItem(r);
        if(phi !== null)this.phi = new GateParameterItem(phi);

        if(a !== null || b !== null){
            this.phaseMode = false;
        }
        else{
            this.phaseMode = true;
        }
      }
  }

  export class GateParameterItem{
      value: number;
      link: number;
      linkMode: boolean = false;

      constructor(value: number){
        this.value = value;
      }
  }


  
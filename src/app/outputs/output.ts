import { QBit } from "../gate-canvas/canvas-classes";

export class Output {
    typeId: number;
    typeName: string;
    charts: any[]; 
    code: string; 

    constructor(typeId: number, typeName: string, bits: QBit[], sampling?: boolean){
        this.typeId = typeId;
        this.typeName = typeName;
        this.charts = [];    
        if (typeId === 4){
            this.charts = null;
            this.code = " ";
        }
        else if(typeId === 3 || typeId === 2){
            let idx = 0;
            for(let i = 0; i<bits.length; i++){
                let hasMeasure = false;
                for(let j = 0; j<bits[i].spots.length; j++){
                    if(bits[i].spots[j].gate.isMeasurement()){
                        hasMeasure = true;
                        break;
                    }
                }
                if(typeId === 3 && !sampling && !hasMeasure){ 
                    this.charts.push(this.createEmpty3d());
                    this.charts[idx].layout.qbit = i;
                    idx++;
                }
                else if(typeId === 2 && ((!sampling && !hasMeasure) || (sampling && hasMeasure))){ 
                    this.charts.push(this.createEmptyMultiLine());
                    this.charts[idx].layout.qbit = i;
                    idx++;
                }
            }
        }
        else if(typeId === 1){
            this.charts.push(this.createEmptyMultiBar());
        }
    }

    gaussian (x: number, y:number) :number {
        var exponent = -(Math.pow(x, 2) / (2) + Math.pow(y, 2) / (2));
        return Math.pow(Math.E, exponent);
    }

    createEmpty3d(){
        let empty3d = {
            layout:{
                width: 835,
                height: 500,
                margin: {
                    l: 5,
                    r: 5,
                    b: 5,
                    t: 5,
                    pad: 4
                },
                paper_bgcolor: '#efefef',
                plot_bgcolor: '#efefef',
                scene: {
                  bgcolor: '#efefef', 
                  xaxis: {
                    gridcolor: '#fff', 
                    gridwidth: 2, 
                  }, 
                  yaxis: {
                    gridcolor: '#fff', 
                    gridwidth: 2, 
                  }, 
                  zaxis: {
                    autorange: true, 
                    gridcolor: '#fff', 
                    gridwidth: 2, 
                  }
                }, 
                showTitle: false
            }
        };
        return empty3d;
    }

    createEmptyMultiLine(){
        let emptyMultiLine = {
            layout:{
                width: 835,
                height: 500,
                margin: {
                    l: 50,
                    r: 5,
                    b: 50,
                    t: 5,
                    pad: 4
                },
                paper_bgcolor: '#efefef',
                plot_bgcolor: '#efefef',
                xaxis: {
                    autorange: true,
                    autotick: true
                }, 
                yaxis: {
                    autorange: true,
                    autotick: true
                }, 
                showTitle: false
            }
        };
        return emptyMultiLine;
    }

    createEmptyMultiBar(){
        let emptyMultiBar = {
        layout: {
            paper_bgcolor: '#efefef',
            plot_bgcolor: '#efefef',
            autosize: true,
            yaxis: {
                type: "linear",
                autorange: true,
                title: "probability"
            },
            xaxis: {
                type: "category",
                autorange: true,
                title: "q[0]"
            },
            showlegend: false
        }
        };
        return emptyMultiBar;
    }
}


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
            data: [{
                cmin: -1,
                cmax: 1,
                contours: {z: {show: true}}, 
                type: 'surface',
                x: [],
                y: [],
                z: []
            }],
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
        for(let i = -2; i<=2; i+=0.1){
            empty3d.data[0].x.push(i);
            empty3d.data[0].y.push(i);
            let z = [];
            for(let j = -2; j<=2; j+=0.1){  
                z.push(0);     
            }
            empty3d.data[0].z.push(z);
        }
        return empty3d;
    }

    createEmptyMultiLine(){
        let emptyMultiLine = {
            data: [{
                type: 'scatter',
                x: [],
                y: []
            }],
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
                    range: [0, 1],
                    autotick: true
                }, 
                showTitle: false
            }
        };
        for(let i = -2; i<=2; i+=0.1){
            emptyMultiLine.data[0].x.push(i);
            emptyMultiLine.data[0].y.push(0);
        }
        return emptyMultiLine;
    }

    createEmptyMultiBar(){
        let emptyMultiBar = {
        data: [
            {
                y: [],
                x: [],
                type: "bar",
                name: "q[0]"
            }
        ],
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
        for(let i = 0; i<=5; i++){
            emptyMultiBar.data[0].x.push("|" + i + "⟩");
            emptyMultiBar.data[0].y.push(0);
        }
        return emptyMultiBar;
    }
}


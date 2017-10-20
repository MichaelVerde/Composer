export class Output {
    typeId: number;
    typeName: string;
    chart: any; 
    code: string; 

    constructor(typeId: number, typeName: string, length: number){
        this.typeId = typeId;
        this.typeName = typeName;
        this.chart = {
            data: [{
                colorscale: [['0.0', 'rgb(255,0,0)'], ['0.125', 'rgb(255,127,0)'], ['0.25', 'rgb(255,255,0)'], ['0.375', 'rgb(127,255,0)'], ['0.5', 'rgb(0,255,0)'], ['0.625', 'rgb(0,255,127)'], ['0.75', 'rgb(0,255,255)'], ['0.875', 'rgb(0,127,255)'], ['1.0', 'rgb(0,0,255)']], 
                contours: {z: {show: true}}, 
                type: 'surface',
                x: [],
                y: [],
                z: []
            }],
            layout:{
                width: 835,
                height: 600,
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
        for(let i = -length; i<=length; i+=0.01){
            this.chart.data[0].x.push(i);
            this.chart.data[0].y.push(i);
            let z = [];
            for(let j = -length; j<=length; j+=0.01){  
                z.push(this.gaussian(i,j));     
            }
            this.chart.data[0].z.push(z);
        }
 
        if (typeId === 4){
            this.chart = null;
            this.code = " ";
        }
    }

    gaussian (x: number, y:number) :number {
        var exponent = -(Math.pow(x, 2) / (2) + Math.pow(y, 2) / (2));
        return Math.pow(Math.E, exponent);
    }
}


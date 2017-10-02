export class Output {
    typeId: number;
    typeName: string;
    chart: Chart; 


    constructor(typeId: number, typeName: string, length: number){
        this.typeId = typeId;
        this.typeName = typeName;
          // options
        this.chart = {
            type: "",
            data: [],
            showXAxis: true,
            showYAxis: true,
            gradient: false,
            showLegend: false,
            showXAxisLabel: false,
            xAxisLabel: 'Bit',
            showYAxisLabel: true,
            yAxisLabel: 'Probability'
        }
        
        if(typeId === 3){ 
            this.chart.type = "line";
            this.chart.data = [{
                "name": "Wigner Function",
                "series": []
            }];
            for(let i = -length; i < length; i+= 0.1){
                this.chart.data[0].series.push({                    
                    "name": i,
                    "value": this.gaussian(i)             
                });
            }  
        }
        else{
            this.chart.type = "vbar";
            this.chart.data = [];
            for(let i = 0; i < length; i++){
                this.chart.data.push({                    
                    "name": i+1,
                    "value": i              
                });
            }         
        }
    }

    gaussian (x: number) :number {
        var exponent = -(Math.pow(x, 2) / (2));
        return Math.pow(Math.E, exponent);
    }
}

interface Chart{
    type: string;
    data: any[];
    showXAxis: boolean;
    showYAxis: boolean;
    gradient: boolean;
    showLegend: boolean;
    showXAxisLabel: boolean;
    xAxisLabel: string;
    showYAxisLabel: boolean;
    yAxisLabel: string;
}
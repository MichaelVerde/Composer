export class Output {
    typeId: number;
    typeName: string;
    chartType: string;
    chartData: any[];

    constructor(typeId: number, typeName: string){
        this.typeId = typeId;
        this.typeName = typeName;
        
        if(typeId === 3){ 
            this.chartType = "line";
            this.chartData = [
            {
                "name": "Germany",
                "series": [
                {
                    "name": "2010",
                    "value": 7300000
                },
                {
                    "name": "2011",
                    "value": 8940000
                }
                ]
            }
            ]
        }
        else{
            this.chartType = "vbar";
            this.chartData = [
                {
                    "name": "Germany",
                    "value": 8940000
                },
                {
                    "name": "USA",
                    "value": 5000000
                },
                {
                    "name": "France",
                    "value": 7200000
                }
                ];
        }
    }
}
class Scatter {
    constructor(globalApplicationState){
        //this.data = d3.csv('UTA_Stop_Boardings_-_Bus.csv', function(){});
        this.globalApplicationState = globalApplicationState;
        this.
        this.svg = d3.select('#chart2');
        this.height = 500;
        this.width = 700;
        this.yAxisPadding = 80;
        this.xAxisPadding = 50;

        // this.xAxis = d3.scale;
        this.yAxis = d3.scaleLinear()
            .domain()
            .range([this.height - this.xAxisPadding, 10])
            .nice();


    }
}
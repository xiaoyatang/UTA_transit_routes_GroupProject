class Scatter {
    constructor(globalApplicationState){
        //this.data = d3.csv('UTA_Stop_Boardings_-_Bus.csv', function(){});
        this.globalApplicationState = globalApplicationState;
        this.data = globalApplicationState.stopBoardData;
        this.svg = d3.select('#chart2');
        this.height = 500;
        this.width = 700;
        this.yAxisPadding = 80;
        this.xAxisPadding = 50;

        // for (let d of this.data) {
        //     d.AvgBoard = +d.AvgBoard; //unary operator converts string to number
        //     d.AvgAlight = +d.AvgAlight; //unary operator converts string to number
        // }

        this.xAxis = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => d.AvgBoard)])
            .range([this.height - this.xAxisPadding, 10])
            .nice();
        this.yAxis = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => d.AvgAlight)])
            .range([this.height - this.xAxisPadding, 10])
            .nice();
        
        // this.scatter = this.svg
        //     .selectAll("circle")
        //     .data(this.data);

        this.wkdata = this.data.filter((d) => d.ServiceType.includes('WKD'));
        this.wkndata = this.data.filter((d) => d.ServiceType.includes('SAT', 'SUN'));


        //d3.select('#metric2').node().value === "weekday" : this.wkdata ? this.wkndata;
        
        let scatter = this.svg
            .selectAll("circle")
            //.data(this.data)
            .data(if (d3.select('#metric2').node().value === "weekday"){
                return this.wkdata;
            } 
            else {
                this.wkndata
            })
            .join("circle")
            .attr("cx", (d) => this.xAxis(d.AvgBoard))
            .attr("cy", (d) => this.yScale(d.AvgBoard))
            .attr("r", 5)
            .attr('stroke', 'black')
            .attr('stroke-width', 0.1)
            .style("opacity", 0);
        
        // scatter.exit()
        //     .style("opacity", 1)
        //     .transition()
        //     .duration(2000)
        //     .style("opacity", 0)
        //     .remove();
                    
        // scatter = newscatter.merge(scatter);
    
        // scatter
        //     .transition()
        //     .duration(2000)
        //     .attr("cx", (d) => aScale(d.a))
        //     .attr("cy", (d) => bScale(d.b))
        //     .attr("r", 5)
        //     .style("opacity", 1);


    }
}
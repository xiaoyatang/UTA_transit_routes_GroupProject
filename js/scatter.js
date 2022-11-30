class Scatter {
    constructor(globalApplicationState){
        //this.data = d3.csv('UTA_Stop_Boardings_-_Bus.csv', function(){});
        this.globalApplicationState = globalApplicationState;
        this.data = globalApplicationState.stopBoardData;
        this.svg = d3.select("#chart3")
            .attr("width", this.width)
            .attr('height', this.height);
        this.height = 500;
        this.width = 700;
        // this.yAxisPadding = 80;
        // this.xAxisPadding = 50;
        this.margin = ({top: 20, right: 20, bottom: 20, left: 20});

        this.colors = d3.scaleOrdinal()
            .domain(this.data.map( (d,i) => d.Month[i] ))
            .range(['red', 'orange', 'yellow', 'green', 'darkgreen', 'blue', 'darkblue', 'violet', 'purple', 'pink', 'magenta', 'grey']);


        // for (let d of this.data) {
        //     d.AvgBoard = +d.AvgBoard; //unary operator converts string to number
        //     d.AvgAlight = +d.AvgAlight; //unary operator converts string to number
        // }

        this.xAxis = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => d.AvgBoard)])
            .range([this.margin.left, this.width - this.margin.left - this.margin.right])
            .nice();
        this.yAxis = d3.scaleLinear()
            .domain([0, d3.max(this.data, d => d.AvgAlight)])
            .range([this.margin.left, this.height - this.margin.top - this.margin.bottom])
            .nice();
        
        this.svg.select('#x-axis')
            //.append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.width - this.margin.right})`)
            .call(d3.axisBottom(this.xAxis)
            //.tickFormat(d3.timeFormat('%b %Y'))
            );

        this.svg.select('#x-axis')
            .append('text')
            .text('Average Boarding')
            .attr('x', 350)
            .attr('y', this.height);

        this.svg.select('#y-axis')
            //.append('g')
            .attr('transform', `translate(${this.margin.top},0)`)
            .call(d3.axisLeft(this.yAxis));
      
        // Append y axis text
        this.svg.select('#y-axis')
            .append('text')
            .text('Average Alighting')
            .attr('x', -280)
            .attr('y', 20)
            .attr('transform', 'rotate(-90)');




        // this.scatter = this.svg
        //     .selectAll("circle")
        //     .data(this.data);

        this.wkdata = this.data.filter((d) => d.ServiceType.includes('WKD'));
        this.wkndata = this.data.filter((d) => d.ServiceType.includes('SAT', 'SUN'));


        //d3.select('#metric2').node().value === "weekday" : this.wkdata ? this.wkndata;
        
        let scatter = this.svg
            .select("#circles")
            .selectAll("circle")
            .data((d3.select('#metric2').node().value === "weekday") ? this.wkdata : this.wkndata)
            //.data(this.data)
            // .data(d => {(if (d3.select('#metric2').node().value === "weekday"){
            //     return this.wkdata.map();
            // } 
            // else {
            //     this.wkndata
            // })})
            .join("circle")
            .transition()
            .duration(3600)
            .attr("cx", (d) => this.xAxis(d.AvgBoard))
            .attr("cy", (d) => this.yAxis(d.AvgBoard))
            .attr("r", 5) 
            // change r to size encoding if needed
            // .fill('fill', (d, i) => this.colors(d.Month))
            .fill('fill', 'red')
            .attr('stroke', 'black')
            .attr('stroke-width', 0.1)
            .style("opacity", 1);
        
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
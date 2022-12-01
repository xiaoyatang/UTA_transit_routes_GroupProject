class Scatter {

    constructor(globalApplicationState){
        this.globalApplicationState = globalApplicationState;
        this.data = globalApplicationState.stopBoardData;
        this.height = 300;
        this.width = 300;
        this.svg = d3.select("#chart3")
            .attr("width", this.width)
            .attr('height', this.height);
        // this.yAxisPadding = 80;
        // this.xAxisPadding = 50;
        this.margin = ({top: 20, right: 20, bottom: 20, left: 40});

        this.colors = d3.scaleOrdinal()
            .domain(this.data.map( (d,i) => d.Month[i] ))
            .range(['red', 'orange', 'yellow', 'green', 'darkgreen', 'blue', 'darkblue', 'violet', 'purple', 'pink', 'magenta', 'grey']);


        // for (let d of this.data) {
        //     d.AvgBoard = +d.AvgBoard; //unary operator converts string to number
        //     d.AvgAlight = +d.AvgAlight; //unary operator converts string to number
        // }


        let boardMax = 0;
        let alightMax = 0;
        for (let i = 0; i < this.data.length; ++i) {
            boardMax = Math.max(boardMax, this.data[i].AvgBoard)
            alightMax = Math.max(alightMax, this.data[i].AvgAlight)
        }

        this.xAxis = d3.scaleLinear()
            .domain([0, boardMax])
            .range([this.margin.left, this.width - this.margin.right])
            .nice();
        this.yAxis = d3.scaleLinear()
            .domain([alightMax, 0])
            .range([this.margin.top, this.height - this.margin.bottom])
            .nice();
        
        this.svg.select('#x-axis')
            //.append('g')
            .attr('transform', `translate(0, ${this.width - this.margin.right})`)
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
            .attr('transform', `translate(${this.margin.left},0)`)
            .call(d3.axisLeft(this.yAxis));
      
        // Append y axis text
        this.svg.select('#y-axis')
            .append('text')
            .text('Average Alighting')
            // .attr('x', -280)
            // .attr('y', -40)
            .attr('transform', 'rotate(-90)');

        // this.scatter = this.svg
        //     .selectAll("circle")
        //     .data(this.data);

        this.wkdata = this.data.filter((d) => d.ServiceType.includes('WKD'));
        this.wkndata = this.data.filter((d) => d.ServiceType.includes('SAT', 'SUN'));
        // this.wkdata = this.data.filter((d) => d.ServiceType('WKD'));
        // this.wkndata = this.data.filter((d) => d.ServiceType('SAT', 'SUN'));


        //d3.select('#metric2').node().value === "weekday" : this.wkdata ? this.wkndata;


        let scatter = this.svg
            .select("#circles")
            .attr("transform", `translate(this.margin.top, 120)`)
            .selectAll("circle")
            // .data((d3.select('#metric2').node().value === "weekday") ? this.wkdata : this.wkndata)
            .data(globalApplicationState.stopBoardData)
            // .data(d => {(if (d3.select('#metric2').node().value === "weekday"){
            //     return this.wkdata.map();
            // } 
            // else {
            //     this.wkndata
            // })})
            .join("circle")
            // .transition()
            // .duration(3600)
            .attr("cx", (d) => this.xAxis(d.AvgBoard))
            .attr("cy", (d) => this.yAxis(d.AvgAlight))
            .attr("r", 1)
            // change r to size encoding if needed
            // .fill('fill', (d, i) => this.colors(d.Month))
            .attr('fill', 'black')
            // .attr('stroke', 'black')
            // .attr('stroke-width', 0.1)
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

    updateCircles(){
        
    }
}

class Scatter {

    constructor(globalApplicationState){
        this.globalApplicationState = globalApplicationState;
        this.data = globalApplicationState.stopBoardData;
        this.height = 500;
        this.width = 500;
        this.svg = d3.select("#chart3")
            .attr("width", this.width)
            .attr('height', this.height);
        // this.yAxisPadding = 80;
        // this.xAxisPadding = 50;
        this.margin = ({top: 20, right: 20, bottom: 20, left: 40});

        this.colors = d3.scaleOrdinal()
            .domain(this.data.map( (d,i) => d.Month[i] ))
            .range(['beige', 'orange', 'yellow', 'green', 'aqua', 'blue', 'darkblue', 'violet', 'purple', 'pink', 'magenta', 'grey']);

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

        let year = d3.select('#Year').node().value;
        this.update(year);
    }

    update(year) {
        let filteredData = this.data.filter(d => d.Year === year)
        console.log(filteredData)
       this.svg
            .select("#circles")
            .attr("transform", `translate(this.margin.top, 120)`)
            .selectAll("circle")
            .data(filteredData)
            .join("circle")
            .attr("cx", (d) => this.xAxis(d.AvgBoard))
            .attr("cy", (d) => this.yAxis(d.AvgAlight))
            .attr("r", 2)
            // change r to size encoding if needed
            .attr('fill', (d, i) => this.colors(d.Month))
            .attr('stroke', 'black')
            .attr('stroke-width', 0.1)
            .style("opacity", 0.8);
    }
}

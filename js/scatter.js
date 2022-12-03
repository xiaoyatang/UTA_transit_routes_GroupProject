class Scatter {

    constructor(globalApplicationState){
        this.globalApplicationState = globalApplicationState;
        this.data = globalApplicationState.stopBoardData;
        this.height = 420;
        this.width = 420;
        this.space = 20;
        this.svg = d3.select("#chart3")
            .attr("width", this.width)
            .attr('height', this.height);
        // this.yAxisPadding = 80;
        // this.xAxisPadding = 50;
        this.margin = ({top: 20, right: 20, bottom: 62, left: 62});

        this.colors = d3.scaleOrdinal()
            .domain(this.data.map( (d,i) => d.Month[i] ))
            .range(['beige', 'orange', 'yellow', 'green', 'aqua', 'blue', 'darkblue', 'violet', 'purple', 'pink', 'magenta', 'black']);
    }

    updateScales() {
        let year = d3.select('#Year').node().value;
        let busType = d3.select('#BusType').node().value;
        let dayType = d3.select('#metric2').node().value;
        let filteredData = this.data.filter(d => d.Year === year)
            .filter(d => dayType === 'all' ? true : dayType === 'weekday' ? d.ServiceType === 'WKD' : d.ServiceType === 'SAT' || d.ServiceType === 'SUN')
        let boardMax = 0;
        let alightMax = 0;
        for (let i = 0; i < filteredData.length; ++i) {
            boardMax = Math.max(boardMax, filteredData[i].AvgBoard)
            alightMax = Math.max(alightMax, filteredData[i].AvgAlight)
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
            .attr('transform', `translate(0, ${this.width - this.margin.bottom})`)
            .call(d3.axisBottom(this.xAxis)
            //.tickFormat(d3.timeFormat('%b %Y'))
            );

        // this.svg.select('#x-axis')
        //     .append('text')
        //     .text('Average Boarding')
        //     .attr('x', 350)
        //     .attr('y', this.height);

        this.svg.select('#y-axis')
            // .append('g')
            .attr('transform', `translate(${this.margin.left},0)`)
            .call(d3.axisLeft(this.yAxis));
      
        // Append y axis text
        // this.svg.select('#y-axis')
        //     .append('text')
        //     .text('Average Alighting')
        //     .attr('x', -280)
        //     .attr('y', -40)
        //     .attr('transform', 'rotate(-90)');


        this.svg.select('#x-axis')
            .call(d3.axisBottom(this.xAxis))
            .attr('transform',`translate(0, ${this.width - this.margin.bottom})`)
            .append('text')
            .text('Average Boarding')
            .attr('x', (this.width)/2 + this.margin.right)
            .attr('y', this.margin.bottom/2 + 10)
            .attr("stroke","black")
            .attr("font-size","15px");
        this.svg.select('#y-axis')
            .call(d3.axisLeft(this.yAxis))
            .attr('transform',`translate(${this.margin.left}, 0)`)
            .append('text')
            .text('Average Alighting')
            .attr('x', -120)
            .attr('y', -45)
            .attr('transform', 'rotate(-90)')
            .attr("stroke","black")
            .attr("font-size","15px");   

    }

    update(year, dayType) {
        this.updateScales();
        let filteredData = this.data.filter(d => d.Year === year)
            .filter(d => dayType === 'all' ? true : dayType === 'weekday' ? d.ServiceType === 'WKD' : d.ServiceType === 'SAT' || d.ServiceType === 'SUN')
       this.svg
            .select("#circles")
            .attr("transform", `translate(this.margin.top, 120)`)
            .selectAll("circle")
            .data(filteredData)
            .join("circle")
            .attr("class", "scatters")
            .attr("cx", (d) => this.xAxis(d.AvgBoard))
            .attr("cy", (d) => this.yAxis(d.AvgAlight))
            .attr("r", 2.5)
            // change r to size encoding if needed
            .attr('fill', (d, i) => this.colors(d.Month))
            .attr('stroke', 'black')
            .attr('stroke-width', 0.2)
            .style("opacity", 0.8)
            .transition()
            .duration('2000');
            // .on("mouseover", function(d){
            //     d3.select("#circles").select("circle")
            //     .style("fill", "#979696")
            //     .attr("r", 3.5);
            //     })
            // .on("mouseout", function(d){
            //     d3.select("#circles").selectAll("circle")
            //     // .style("fill", (d, i) => that.colors(d.Month))
            //     .style("fill", (d, i) => this.colors(d.Month))
            //     .attr("r", 2.5);
            //     });
    }
}

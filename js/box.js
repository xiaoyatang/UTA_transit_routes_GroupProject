class Box {
    constructor(globalApplicationState){
        // set the dimensions and margins of the graph
        this.margin = {top: 10, right: 30, bottom: 30, left: 40},
        this.width = 460 - this.margin.left - this.margin.right,
        this.height = 400 - this.margin.top - this.margin.bottom;

        // append the svg object to the body of the page
        this.svg = d3.select("#chart1")
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        this.globalApplicationState = globalApplicationState;
        this.data = globalApplicationState.stopBoardData;

        // Read the data and compute summary statistics for each specie
        // d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv", function(data) {
        d3.csv("data/UTA_Stop_Boardings_-_Bus.csv", function(data) {


        // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
        this.sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
            .key(function(d) { return d.Month;})
            .rollup(function(d) {
                q1 = d3.quantile(d.map(function(g) { return g.AvgBoard;}).sort(d3.ascending),.25)
                median = d3.quantile(d.map(function(g) { return g.AvgBoard;}).sort(d3.ascending),.5)
                q3 = d3.quantile(d.map(function(g) { return g.AvgBoard;}).sort(d3.ascending),.75)
                interQuantileRange = q3 - q1
                min = q1 - 1.5 * interQuantileRange
                max = q3 + 1.5 * interQuantileRange
                return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
            })
            .entries(data)

        // Show the X scale
        this.x = d3.scaleBand()
            .range([ 0, this.width ])
            .domain(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
            .paddingInner(1)
            .paddingOuter(.5)
        this.svg.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.x))

        // Show the Y scale
        this.y = d3.scaleLinear()
            .domain([3,9])
            .range([this.height, 0])
        this.svg.append("g").call(d3.axisLeft(this.y))

        // Show the main vertical line
        this.svg
            .selectAll("vertLines")
            .data(this.sumstat)
            .enter()
            .append("line")
            .attr("x1", function(d){return(x(d.key))})
            .attr("x2", function(d){return(x(d.key))})
            .attr("y1", function(d){return(y(d.value.min))})
            .attr("y2", function(d){return(y(d.value.max))})
            .attr("stroke", "black")
            .style("width", 40)

        // rectangle for the main box
        this.boxWidth = 100
        this.svg
            .selectAll("boxes")
            .data(this.sumstat)
            .enter()
            .append("rect")
            .attr("x", function(d){return(x(d.key)-this.boxWidth/2)})
            .attr("y", function(d){return(y(d.value.q3))})
            .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
            .attr("width", this.boxWidth )
            .attr("stroke", "black")
            .style("fill", "#69b3a2")

        // Show the median
        this.svg
            .selectAll("medianLines")
            .data(this.sumstat)
            .enter()
            .append("line")
            .attr("x1", function(d){return(x(d.key)-this.boxWidth/2) })
            .attr("x2", function(d){return(x(d.key)+this.boxWidth/2) })
            .attr("y1", function(d){return(y(d.value.median))})
            .attr("y2", function(d){return(y(d.value.median))})
            .attr("stroke", "black")
            .style("width", 80)

        // Add individual points with jitter
        this.jitterWidth = 50
        this.svg
            .selectAll("indPoints")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d){return(x(d.Month) - this.jitterWidth/2 + Math.random()*this.jitterWidth )})
            .attr("cy", function(d){return(y(d.AvgBoard))})
            .attr("r", 4)
            .style("fill", "white")
            .attr("stroke", "black")


        })
    }
}
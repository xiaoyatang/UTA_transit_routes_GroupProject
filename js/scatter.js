// import {Legend, Swatches} from "@d3/color-legend"
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
        this.margin = ({top: 20, right: 20, bottom: 90, left: 62});

        this.colors = d3.scaleOrdinal()
            //.domain(this.data.map( (d,i) => d.Month[i] ))
            .domain(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'])
            .range(['beige', 'orange', 'yellow', 'green', 'aqua', 'blue', 'darkblue', 'violet', 'purple', 'pink', 'magenta', 'black']);

        let year=d3.select('#Year').property('value');
        let dayType = d3.select('#metric2').property('value');
        this.colorScale();
        this.setText();
        this.update(year, dayType);
    }

    updateScales() {
        let year = d3.select('#Year').node().value;
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
            );

        this.svg.select('#y-axis')
            // .append('g')
            .attr('transform', `translate(${this.margin.left},0)`)
            .call(d3.axisLeft(this.yAxis));
    }

    setText() {
        let year = d3.select('#Year').node().value;
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
            .call(d3.axisBottom(this.xAxis))
            .attr('transform',`translate(0, ${this.width - this.margin.bottom})`)
            .append('text')
            .text('Average Boarding')
            .attr('x', (this.width)/2 + this.margin.right)
            .attr('y', this.margin.bottom/2 - 10)
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
            .transition()
            .duration('2000')
            .attr("cx", (d) => this.xAxis(d.AvgBoard))
            .attr("cy", (d) => this.yAxis(d.AvgAlight))
            .attr("r", 3)
            // change r to size encoding if needed
            .attr('fill', (d, i) => this.colors(d.Month))
            .attr('stroke', 'black')
            .attr('stroke-width', 0.2)
            .style("opacity", 0.8);
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

    colorScale(){
        let Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let colorDist = ['beige', 'orange', 'yellow', 'green', 'aqua', 'blue', 'darkblue', 'violet', 'purple', 'pink', 'magenta', 'black'];

        let square = this.svg
            .select('#colorScale')
            .attr('transform',`translate(10, ${this.width - this.margin.top - 20})`)

        let diff1 = 75;
        // let diff2 = 85;
        
        // this.svg.select('#colorScale')
        //     .attr('transform',`translate(10, ${this.width - this.margin.top - 20})`)
        square
            // .attr("transform", `translate(this.margin.top, 120)`)
            // .selectAll("rect")
            // .data(this.colors)
            .append('g')
            .append('rect')
            .attr('width', 8)
            .attr('height', 8)
            .attr('fill', colorDist[0])
            .attr('stroke', 'black')
            .attr('stroke-width', 0.2)
            .style("opacity", 1);

        square.select('g')
            .append("text")
            .attr("x", 16)
            .attr("y", 10)
            .text(Labels[0])
            .attr("font-size","12.5px");
        
        square
            .append('g')
            .append('rect')
            .attr('transform',`translate(73, 0)`)
            .attr('width', 8)
            .attr('height', 8)
            .attr('fill', colorDist[1])
            .attr('stroke', 'black')
            .attr('stroke-width', 0.2)
            .style("opacity", 1);

        square.select('g')
            .append("text")
            .attr("x", 16 + diff1)
            .attr("y", 10)
            .text(Labels[1])
            .attr("font-size","12.5px");

        square
            .append('g')
            .append('rect')
            .attr('transform',`translate(146, 0)`)
            .attr('width', 8)
            .attr('height', 8)
            .attr('fill', colorDist[2])
            .attr('stroke', 'black')
            .attr('stroke-width', 0.2)
            .style("opacity", 1);

        square.select('g')
            .append("text")
            .attr("x", 16 + diff1*2)
            .attr("y", 10)
            .text(Labels[2])
            .attr("font-size","12.5px");

        square
            .append('g')
            .append('rect')
            .attr('transform',`translate(219, 0)`)
            .attr('width', 8)
            .attr('height', 8)
            .attr('fill', colorDist[3])
            .attr('stroke', 'black')
            .attr('stroke-width', 0.2)
            .style("opacity", 1);

        square.select('g')
            .append("text")
            .attr("x", 16 + diff1*3)
            .attr("y", 10)
            .text(Labels[3])
            .attr("font-size","12.5px");
            
        square
            .append('g')
            .append('rect')
            .attr('transform',`translate(292, 0)`)
            .attr('width', 8)
            .attr('height', 8)
            .attr('fill', colorDist[4])
            .attr('stroke', 'black')
            .attr('stroke-width', 0.2)
            .style("opacity", 1);

        square.select('g')
            .append("text")
            .attr("x", 16 + diff1*4)
            .attr("y", 10)
            .text(Labels[4])
            .attr("font-size","12.5px");

        square
            .append('g')
            .append('rect')
            .attr('transform',`translate(365, 0)`)
            .attr('width', 8)
            .attr('height', 8)
            .attr('fill', colorDist[5])
            .attr('stroke', 'black')
            .attr('stroke-width', 0.2)
            .style("opacity", 1);

        square.select('g')
            .append("text")
            .attr("x", 16 + diff1*5)
            .attr("y", 10)
            .text(Labels[5])
            .attr("font-size","12.5px");

            square
            .append('g')
            .append('rect')
            .attr('transform',`translate(438, 0)`)
            .attr('width', 8)
            .attr('height', 8)
            .attr('fill', colorDist[6])
            .attr('stroke', 'black')
            .attr('stroke-width', 0.2)
            .style("opacity", 1);

        square.select('g')
            .append("text")
            .attr("x", 16 + diff1*6)
            .attr("y", 10)
            .text(Labels[6])
            .attr("font-size","12.5px");

            square
            .append('g')
            .append('rect')
            .attr('transform',`translate(511, 0)`)
            .attr('width', 8)
            .attr('height', 8)
            .attr('fill', colorDist[7])
            .attr('stroke', 'black')
            .attr('stroke-width', 0.2)
            .style("opacity", 1);

        square.select('g')
            .append("text")
            .attr("x", 16 + diff1*7)
            .attr("y", 10)
            .text(Labels[7])
            .attr("font-size","12.5px");

            square
            .append('g')
            .append('rect')
            .attr('transform',`translate(680, 0)`)
            .attr('width', 8)
            .attr('height', 8)
            .attr('fill', colorDist[8])
            .attr('stroke', 'black')
            .attr('stroke-width', 0.2)
            .style("opacity", 1);

        square.select('g')
            .append("text")
            .attr("x", 16 + diff1*8)
            .attr("y", 10)
            .text(Labels[8])
            .attr("font-size","12.5px");

        square
            .append('g')
            .append('rect')
            .attr('transform',`translate(765, 0)`)
            .attr('width', 8)
            .attr('height', 8)
            .attr('fill', colorDist[9])
            .attr('stroke', 'black')
            .attr('stroke-width', 0.2)
            .style("opacity", 1);

        square.select('g')
            .append("text")
            .attr("x", 16 + diff1*9)
            .attr("y", 10)
            .text(Labels[9])
            .attr("font-size","12.5px");

        //     square
        //     .append('g')
        //     .append('rect')
        //     .attr('transform',`translate(diff2*2, 0)`)
        //     .attr('width', 10)
        //     .attr('height', 10)
        //     .attr('fill', colorDist[2])
        //     .attr('stroke', 'black')
        //     .attr('stroke-width', 0.2)
        //     .style("opacity", 1);

        // square.select('g')
        //     .append("text")
        //     .attr("x", 18 + diff1*2)
        //     .attr("y", 10)
        //     .text(Labels[2])
        //     .attr("font-size","15px");

        //     square
        //     .append('g')
        //     .append('rect')
        //     .attr('transform',`translate(diff2*2, 0)`)
        //     .attr('width', 10)
        //     .attr('height', 10)
        //     .attr('fill', colorDist[2])
        //     .attr('stroke', 'black')
        //     .attr('stroke-width', 0.2)
        //     .style("opacity", 1);

        // square.select('g')
        //     .append("text")
        //     .attr("x", 18 + diff1*2)
        //     .attr("y", 10)
        //     .text(Labels[2])
        //     .attr("font-size","15px");

        //     square
        //     .append('g')
        //     .append('rect')
        //     .attr('transform',`translate(diff2*2, 0)`)
        //     .attr('width', 10)
        //     .attr('height', 10)
        //     .attr('fill', colorDist[2])
        //     .attr('stroke', 'black')
        //     .attr('stroke-width', 0.2)
        //     .style("opacity", 1);

        // square.select('g')
        //     .append("text")
        //     .attr("x", 18 + diff1*2)
        //     .attr("y", 10)
        //     .text(Labels[2])
        //     .attr("font-size","15px");

    }
    // colorScale(){
        // console.log(d3.schemeSet3);
        // console.log(this.colors);
        // let scale = Legend(d3.scaleOrdinal(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], d3.schemeSpectral[13]), {
        //     title: "Months",
        //     tickSize: 0
        // });
        // d3.select("#colorScale").attr('', scale);
    // }

    // // Copyright 2021, Observable Inc.
    // // Released under the ISC license.
    // // https://observablehq.com/@d3/color-legend
    // Legend(color, {
    //     title,
    //     tickSize = 6,
    //     width = 320, 
    //     height = 44 + tickSize,
    //     marginTop = 18,
    //     marginRight = 0,
    //     marginBottom = 16 + tickSize,
    //     marginLeft = 0,
    //     ticks = width / 64,
    //     tickFormat,
    //     tickValues
    // } = {}) {
    
    //     function ramp(color, n = 256) {
    //     const canvas = document.createElement("canvas");
    //     canvas.width = n;
    //     canvas.height = 1;
    //     const context = canvas.getContext("2d");
    //     for (let i = 0; i < n; ++i) {
    //         context.fillStyle = color(i / (n - 1));
    //         context.fillRect(i, 0, 1, 1);
    //     }
    //     return canvas;
    //     }
    
    //     let svg = d3.create("svg")
    //         .attr("width", width)
    //         .attr("height", height)
    //         .attr("viewBox", [0, 0, width, height])
    //         .style("overflow", "visible")
    //         .style("display", "block");
    
    //     let tickAdjust = g => g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);
    //     let x;
    
    //     // Threshold
    //     else if (color.invertExtent) {
    //     const thresholds
    //         = color.thresholds ? color.thresholds() // scaleQuantize
    //         : color.quantiles ? color.quantiles() // scaleQuantile
    //         : color.domain(); // scaleThreshold
    
    //     const thresholdFormat
    //         = tickFormat === undefined ? d => d
    //         : typeof tickFormat === "string" ? d3.format(tickFormat)
    //         : tickFormat;
    
    //     x = d3.scaleLinear()
    //         .domain([-1, color.range().length - 1])
    //         .rangeRound([marginLeft, width - marginRight]);
    
    //     svg.append("g")
    //         .selectAll("rect")
    //         .data(color.range())
    //         .join("rect")
    //         .attr("x", (d, i) => x(i - 1))
    //         .attr("y", marginTop)
    //         .attr("width", (d, i) => x(i) - x(i - 1))
    //         .attr("height", height - marginTop - marginBottom)
    //         .attr("fill", d => d);
    
    //     tickValues = d3.range(thresholds.length);
    //     tickFormat = i => thresholdFormat(thresholds[i], i);
    //     }
    
    //     // Ordinal
    //     else {
    //     x = d3.scaleBand()
    //         .domain(color.domain())
    //         .rangeRound([marginLeft, width - marginRight]);
    
    //     svg.append("g")
    //         .selectAll("rect")
    //         .data(color.domain())
    //         .join("rect")
    //         .attr("x", x)
    //         .attr("y", marginTop)
    //         .attr("width", Math.max(0, x.bandwidth() - 1))
    //         .attr("height", height - marginTop - marginBottom)
    //         .attr("fill", color);
    
    //     tickAdjust = () => {};
    //     }
    
    //     svg.append("g")
    //         .attr("transform", `translate(0,${height - marginBottom})`)
    //         .call(d3.axisBottom(x)
    //         .ticks(ticks, typeof tickFormat === "string" ? tickFormat : undefined)
    //         .tickFormat(typeof tickFormat === "function" ? tickFormat : undefined)
    //         .tickSize(tickSize)
    //         .tickValues(tickValues))
    //         .call(tickAdjust)
    //         .call(g => g.select(".domain").remove())
    //         .call(g => g.append("text")
    //         .attr("x", marginLeft)
    //         .attr("y", marginTop + marginBottom - height - 6)
    //         .attr("fill", "currentColor")
    //         .attr("text-anchor", "start")
    //         .attr("font-weight", "bold")
    //         .attr("class", "title")
    //         .text(title));
    
    //     return svg.node();
    // }
}

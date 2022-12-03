class Line {
    constructor(globalApplicationState){
        this.firstRun = true;
        // this.data = globalApplicationState.busBoardData.filter(d => d.Year === "2020" || d.Year === "2021" || d.Year === "2022");
        this.data = globalApplicationState.monthlyBusData.filter(d => d.Year === "2020" || d.Year === "2021" || d.Year === "2022");
        this.uniqueCateg = [...new Set(this.data.map(item => item.Mode))];

        this.CHART_WIDTH = 400;
        this.CHART_HEIGHT = 400;
        this.MARGIN = { left: 60, bottom: 20, top: 20, right: 20 };
        // this.drawLegend();

        let year = d3.select('#Year').property('value');
        let busType = d3.select('#BusType').property('value');
        let dayType = d3.select('#metric2').property('value');
        this.setText();
        this.update(year, busType, dayType);

        // this.myColor = d3.scaleOrdinal()
        //     .domain(this.uniqueCateg)
        //     .range(["lightseagreen", "navy", "orange", "pink", "darkgreen",  "slateblue","steelblue",'red']);
    }

    // filterMonths(data) {
    //     let months = [data.filter(d => d.Month==="January"), data.filter(d => d.Month==="February"), data.filter(d => d.Month==="March"),
    //                   data.filter(d => d.Month==="April"), data.filter(d => d.Month==="May"), data.filter(d => d.Month==="June"),
    //                   data.filter(d => d.Month==="July"), data.filter(d => d.Month==="August"), data.filter(d => d.Month==="September"),
    //                   data.filter(d => d.Month==="October"), data.filter(d => d.Month==="November"), data.filter(d => d.Month==="December")];
    //     let sum = [];
    //     for (let i = 0; i < 12; ++i)
    //         sum.push(d3.sum(d3.map(months[i], d=> d.AvgBoardings)));
    //     return sum;
    // }

    setText(){
        let year = d3.select('#Year').node().value;
        let busType = d3.select('#BusType').property('value');
        let dayType = d3.select('#metric2').node().value;
        let filteredData = this.data.filter(d => d.Year === year && d.Mode === busType)
            .filter(d => dayType === 'all' ? true : dayType === 'weekday' ? d.ServiceType === 'WKD' : d.ServiceType === 'SAT' || d.ServiceType === 'SUN')
        // let sum = this.filterMonths(filteredData);
        // let sum = this.data;
        let labelData = ['Jan', 'Feb', 'Mar', "Apr", 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let svg = d3.select('#chart2')
            .attr('width',this.CHART_WIDTH)
            .attr('height',this.CHART_HEIGHT);

        this.yScale = d3.scaleLinear()
            // .domain([0, d3.max(sum, c => c)])
            .domain([0, d3.max(filteredData, c => c)])
            .range([this.CHART_HEIGHT - this.MARGIN.bottom - this.MARGIN.top, 15]);
        this.xScale = d3.scaleBand()
            .domain(labelData)
            .range([this.MARGIN.left, this.CHART_WIDTH - this.MARGIN.right])
            .padding(0.3);
        
        svg.select('#x-axis')
            .append('text')
            .text('Date')
            .attr('x', (this.CHART_WIDTH-this.MARGIN.right)/2)
            .attr('y', this.CHART_HEIGHT-3) //397
            .attr("stroke","black")
            .attr('stroke-width', 0.75)
            .attr("font-size","15px")
            .attr('fill', 'white');

        svg.select('#y-axis')
            .call(d3.axisLeft(this.yScale))
            .attr('transform',`translate(${this.MARGIN.left}, 0)`)
            .append('text')
            .text('Sum Avg Boarding')
            .attr('x', -100)
            .attr('y', -45)
            .attr('transform', 'rotate(-90)')
            .attr("stroke","black")
            .attr("font-size","15px");
    }

    updateBar(year, busType, dayType){
        let filteredData = this.data.filter(d => d.Year === year && d.Mode === busType)
            .filter(d => dayType === 'all' ? true : dayType === 'weekday' ? d.ServiceType === 'WKD' : d.ServiceType === 'SAT' || d.ServiceType === 'SUN')
        // let sum = this.filterMonths(filteredData);
        // let sum = this.data;
        let labelData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let svg = d3.select('#chart2')
            .attr('width', this.CHART_WIDTH)
            .attr('height', this.CHART_HEIGHT);
        this.yScale = d3.scaleLinear()
            // .domain([0,d3.max(sum,c=>c)])
            .domain([0, d3.max(filteredData, c => c)])
            .range([this.CHART_HEIGHT - this.MARGIN.bottom - this.MARGIN.top,15]);
        this.xScale = d3.scaleBand()
            .domain(labelData)
            .range([this.MARGIN.left, this.CHART_WIDTH - this.MARGIN.right])
            .padding(0.3);
        // let svg=d3.select('#chart2')
        //         .attr('width',this.CHART_WIDTH)
        //         .attr('height',this.CHART_HEIGHT);
        svg.select('#x-axis')
            .append('g')
            .attr('transform',`translate(0, ${this.CHART_HEIGHT - this.MARGIN.bottom - this.MARGIN.top})`)
            .call(d3.axisBottom(this.xScale))

        // svg.select('#x-axis')
        //     .append('text')
        //     .text('Date')
        //     .attr('x', (this.CHART_WIDTH-this.MARGIN.right)/2)
        //     .attr('y', this.CHART_HEIGHT-10)
        //     .attr("stroke","black")
        //     .attr("font-size","15px");
        // svg.select('#y-axis')
        //     .call(d3.axisLeft(this.yScale))
        //     .attr('transform',`translate(${this.MARGIN.left}, 0)`)
        //     .append('text')
        //     .text('Sum Avg Onborading')
        //     .attr('x', -100)
        //     .attr('y', -45)
        //     .attr('transform', 'rotate(-90)')
        //     .attr("stroke","black")
        //     .attr("font-size","15px");           
    }

    update(year, busType, dayType) {
        this.updateBar(year, busType, dayType)
        let barWidth = this.xScale.bandwidth() * 1.32 + 2;
        let filteredData = this.data.filter(d => d.Year === year && d.Mode === busType)
            .filter(d => dayType === 'all' ? true : dayType === 'weekday' ? d.ServiceType === 'WKD' : d.ServiceType === 'SAT' || d.ServiceType === 'SUN')
        // let sum = this.filterMonths(filteredData);
        let rects = d3.select('#chart2 #bars')
            .selectAll('rect')
            // .data(sum)
            .data(filteredData)
            .join('rect')
            .attr('x', function(d,i) { return barWidth * i + 65; })
            .attr('width', 1.32 * this.xScale.bandwidth())
            .attr('class', 'bar')
        if (this.firstRun) {
            rects.attr('y', d => this.yScale(0))
            this.firstRun = false;
        }
        rects.transition()
            .duration(4000)
            .attr('y', d => this.yScale(d))
            .attr('height',d => this.CHART_HEIGHT - this.MARGIN.bottom - this.MARGIN.top - this.yScale(d))
    }
}

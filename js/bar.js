class Bar {
    constructor(globalApplicationState){
        this.firstRun = true;
        this.CHART_WIDTH = 400;
        this.CHART_HEIGHT = 400;
        this.MARGIN = { left: 60, bottom: 20, top: 20, right: 20 };
        // this.drawLegend();

        this.data = []
        for (let i = 0; i < 12; ++i)
            this.data.push(globalApplicationState.monthlyBusData[i].filter(d => d.Year === globalApplicationState.year && d.Mode === globalApplicationState.busType
                              && (globalApplicationState.dayType === 'all' ? true : globalApplicationState.dayType === 'weekday' ?
                                  d.ServiceType === 'WKD' : d.ServiceType === 'SAT' || d.ServiceType === 'SUN')))
        this.update();

        // this.myColor = d3.scaleOrdinal()
        //     .domain(this.uniqueCateg)
        //     .range(["lightseagreen", "navy", "orange", "pink", "darkgreen",  "slateblue","steelblue",'red']);
    }

    setText(sums){
        let labelData = ['Jan', 'Feb', 'Mar', "Apr", 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let svg = d3.select('#chart2')
            .attr('width',this.CHART_WIDTH)
            .attr('height',this.CHART_HEIGHT);

        this.yScale = d3.scaleLinear()
            // .domain([0, d3.max(sum, c => c)])
            .domain([0, d3.max(sums, c => c)])
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

    updateBar(sums){
        let labelData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let svg = d3.select('#chart2')
            .attr('width', this.CHART_WIDTH)
            .attr('height', this.CHART_HEIGHT);
        this.yScale = d3.scaleLinear()
            .domain([0, d3.max(sums)])
            .range([this.CHART_HEIGHT - this.MARGIN.bottom - this.MARGIN.top,15])
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

        svg.select('#y-axis')
            .call(d3.axisLeft(this.yScale))
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

    update(data = this.data) {
        this.data = data; // update this.data only if parameter was passed
        let filteredData = []; // filter by map brushing
        if (globalApplicationState.selectedRoutesLineAbbrs.length > 1)
            for (let i = 0; i < 12; ++i)
                filteredData.push(this.data[i].filter(d =>
                    globalApplicationState.selectedRoutesLineAbbrs.find(el => el === d.LineAbbr)))
        else
            filteredData = this.data

        let sums = []
        for (let i = 0; i < 12; ++i)
            sums.push(d3.sum(d3.map(filteredData[i], d => d.AvgBoardings)));

        this.updateBar(sums)
        this.setText(sums)

        let barWidth = this.xScale.bandwidth() * 1.32 + 2;
        let rects = d3.select('#chart2 #bars')
            .selectAll('rect')
            .data(sums)
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

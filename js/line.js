class Line {
    constructor(globalApplicationState){
        this.busBoardData=globalApplicationState.busBoardData
        console.log(this.busBoardData);
        this.updateData=this.busBoardData.filter(d=>d.Year==="2020"|| d.Year==="2021"|| d.Year==="2022");
        this.CateData = d3.groups(this.updateData,d=>d.Mode)
        this.uniqueCateg = [...new Set(this.updateData.map(item => item.Mode))];
        console.log(this.updateData,this.CateData,this.uniqueCateg);
     
        this.vizWidth = 300;
        this.vizHeight= 500;
        // this.drawLegend();
        this.drawBar();
    }
    // drawLegend(){
    //     let that=this;
    //     let labelData=['Jan','Feb','Mar',"Apr",'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    //     let svg=d3.select('#chart2')
    //         .append('svg')
    //         .attr('width',that.vizWidth)
    //         .attr('height',that.vizHeight);
    //     // let group=svg.selectAll('g')
    //     //     .data(labelData)
    //     //     .join('g')
    //     let label=svg.selectAll('text')
    //         .data(labelData)
    //         .join('text')
    //         .attr('x',function(i){
    //             return 20+5*i;
    //         })
    //         .attr('y',10)
    //         .text(d=>d)
    // }
    drawBar(){
        const CHART_WIDTH = 500;
        const CHART_HEIGHT = 250;
        const MARGIN = { left: 50, bottom: 20, top: 20, right: 20 };
        // let that=this;
        let newData=this.changeData();
        let myColor = d3.scaleOrdinal().domain(this.uniqueCateg)
         .range(["lightseagreen", "navy", "orange", "pink", "darkgreen",  "slateblue"])
        let svg=d3.select('#chart2')
            .append('svg')
        svg.append('g')  
        .classed('shape', true)
        .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`);
        svg.append('g')  
        .classed('axisX', true)
        .attr('transform', `translate(${MARGIN.left}, ${CHART_HEIGHT-MARGIN.top})`);
        svg.append('g')  
        .classed('axisY', true)
        .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top})`);

        d3.select('#BusType').on('change', this.changeData);
        d3.select('#Year').on('change', this.changeData);
        // this.changeData;
    //         .attr('width',that.vizWidth)
    //         .attr('height',that.vizHeight);
        // console.log(myColor("Fixed Route Bus - Regular"))
        // const lineData=this.busBoardData.filter(d=>d.LineAbbr==="451" )
        // const lineDataYear=lineData.filter(d=>d.Year==="2020")
        // console.log(lineData);
        // console.log(lineDataYear);
    }
    changeData(){
        let that =this;
        let year=d3.select('#Year').property('value');
        let busType = d3.select('#BusType').property('value');
        console.log(busType,year);
        that.upData1=that.updateData.filter(d=>d.Mode===d3.select('#BusType').property('value'));
        that.upData2=that.upData1.filter(d=>d.Year===d3.select('#Year').property('value'))
        console.log(that.upData2);
        return that.upData2
    }
    
}
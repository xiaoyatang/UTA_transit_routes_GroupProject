class Line {
    constructor(globalApplicationState){
        this.busBoardData=globalApplicationState.busBoardData
        console.log(this.busBoardData);
        this.updateData=this.busBoardData.filter(d=>d.Year==="2020"|| d.Year==="2021"|| d.Year==="2022");
        this.CateData = d3.groups(this.updateData,d=>d.Mode)
        this.uniqueCateg = [...new Set(this.updateData.map(item => item.Mode))];
        console.log(this.updateData,this.CateData,this.uniqueCateg);
     
        this.CHART_WIDTH= 400;
        this.CHART_HEIGHT = 400;
        this.MARGIN = { left: 20, bottom: 20, top: 20, right: 20 };
        // this.drawLegend();
        this.setup();
    }
    // drawLegend(){
    //     let that=this;
    //     let labelData=['Jan','Feb','Mar',"Apr",'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    //     let svg=d3.select('#chart1')
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
    setup(){
        let myColor = d3.scaleOrdinal().domain(this.uniqueCateg)
         .range(["lightseagreen", "navy", "orange", "pink", "darkgreen",  "slateblue"])
        d3.select('#BusType').on('change',()=>{let res = this.changeData()});
        // d3.select('#BusType').on('change',this.changeData); 
        d3.select('#Year').on('change',()=>{let res = this.changeData()});
        let res = this.changeData();
        console.log(res);
    }
    changeData(){
        let that =this;
        let year=d3.select('#Year').property('value');
        let busType = d3.select('#BusType').property('value');
        let upData1=that.updateData.filter(d=>d.Mode===busType);
        let upData2=upData1.filter(d=>d.Year===year);
        
        console.log(upData2);
        that.updateBar(upData2);
        return upData2
    }
    updateBar(d){
        let that=this;
        console.log(that.MARGIN);
        let JanData=d.filter(d=>d.Month==="January");
        let FebData=d.filter(d=>d.Month==="February");
        let MarData=d.filter(d=>d.Month==="March");
        let AprData=d.filter(d=>d.Month==="April");
        let MayData=d.filter(d=>d.Month==="May");
        let JunData=d.filter(d=>d.Month==="June");
        let JulData=d.filter(d=>d.Month==="July");
        let AugData=d.filter(d=>d.Month==="August");
        let SepData=d.filter(d=>d.Month==="September");
        let OctData=d.filter(d=>d.Month==="October");
        let NovData=d.filter(d=>d.Month==="November");
        let DecData=d.filter(d=>d.Month==="December");
        const monthData=[];
        monthData.push(JanData,FebData,MarData,AprData,MayData,JunData,JulData,AugData,SepData,OctData,NovData,DecData);
        let sum1 =0;let sum2 = 0;let sum3 = 0;let sum4 = 0;let sum5 = 0;let sum6 = 0;let sum7 = 0;let sum8 = 0;let sum9 = 0;let sum10 = 0;let sum11 = 0;let sum12 = 0;
        for (let arr of JanData)
        {
            sum1 += parseFloat(arr.AvgBoardings);
        }
        for (let arr of FebData)
        {
            sum2 += parseFloat(arr.AvgBoardings);
        }
        for (let arr of MarData)
        {
            sum3+= parseFloat(arr.AvgBoardings);
        }
        for (let arr of AprData)
        {
            sum4+= parseFloat(arr.AvgBoardings);
        }
        for (let arr of MayData)
        {
            sum5+= parseFloat(arr.AvgBoardings);
        }
        for (let arr of JunData)
        {
            sum6+= parseFloat(arr.AvgBoardings);
        }
        for (let arr of JulData)
        {
            sum7+= parseFloat(arr.AvgBoardings);
        }
        for (let arr of AugData)
        {
            sum8+= parseFloat(arr.AvgBoardings);
        }
        for (let arr of SepData)
        {
            sum9+= parseFloat(arr.AvgBoardings);
        }
        for (let arr of OctData)
        {
            sum10+= parseFloat(arr.AvgBoardings);
        }
        for (let arr of NovData)
        {
            sum11+= parseFloat(arr.AvgBoardings);
        }
        for (let arr of DecData)
        {
            sum12+= parseFloat(arr.AvgBoardings);
        }
        const sum=[];
        sum.push(sum1,sum2,sum3,sum4,sum5,sum6,sum7,sum8,sum9,sum10,sum11,sum12);
        monthData.push(sum);
        console.log(monthData,sum);

        let labelData=['Jan','Feb','Mar',"Apr",'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        let yScale=d3.scaleLinear()
            .domain([0,d3.max(sum,c=>c)])
            .range([that.CHART_HEIGHT-that.MARGIN.bottom-that.MARGIN.top,0]);
        let xScale=d3.scaleBand()
            .domain(labelData)
            .range([that.MARGIN.left,that.CHART_WIDTH-that.MARGIN.right])
            .padding(0.3);
        let svg=d3.select('#chart2')
                .attr('width',that.CHART_WIDTH)
                .attr('height',that.CHART_HEIGHT);
        svg.select('#x-axis')
            .append('g')
            .attr('transform',`translate(0, ${that.CHART_HEIGHT-that.MARGIN.bottom-that.MARGIN.top})`)
            .call(d3.axisBottom(xScale))

        svg.select('#x-axis')
            .append('text')
            .text('Date')
            .attr('x', that.CHART_WIDTH-that.MARGIN.right-that.MARGIN.left)
            .attr('y', that.CHART_HEIGHT-that.MARGIN.bottom-that.MARGIN.top)
            .attr("stroke","black")
            .attr("font-size","15px");
        svg.select('#y-axis')
            .call(d3.axisLeft(yScale))
            .attr('transform','translate(50, 0)')
            .append('text')
            .text('Avg Onborading Sum')
            .attr('x', 0)
            .attr('y', that.MARGIN.left)
            .attr('transform', 'rotate(-90)')
            .attr("stroke","black")
            .attr("font-size","15px")            
            ;
        svg.selectAll('#bar')
            .data(sum)
            .join('rect')
            .attr('x',function(d,i){
                return 31*(i-0.25)+5;
            })
            .attr('y',d=>yScale(d))
            .attr('width',xScale.bandwidth())
            .attr('height',d=>that.CHART_HEIGHT-that.MARGIN.bottom-that.MARGIN.top-yScale(d))
            .attr('class','bar')
    }  
}
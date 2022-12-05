// ******* DATA LOADING *******
// We took care of that for you
async function loadData () {
    const routesData = await d3.json('data/map.json');
    const stopsData = await d3.json('data/stops.json');
    const busBoardData = await d3.csv('data/UTA_Route_Level_Boardings_Monthly_Counts.csv');
    const stopBoardData = await d3.csv('data/UTA_Stop_Boardings_-_Bus.csv');
    // const monthlyData = await d3.csv('data/UTA_Route_Level_Boardings_Monthly_Counts.csv');
    return { routesData, stopsData, busBoardData, stopBoardData };
  }

function getFilteredMonthly(year, busType, dayType) {
    let data = [];
    for (let i = 0; i < 12; ++i)
        data.push(globalApplicationState.monthlyBusData[i].filter(d => d.Year === globalApplicationState.year && d.Mode === globalApplicationState.busType
                                                                  && (globalApplicationState.dayType === 'all' ? true : globalApplicationState.dayType === 'weekday' ?
                                                                      d.ServiceType === 'WKD' : d.ServiceType === 'SAT' || d.ServiceType === 'SUN')))
    return data;
}
  
  // ******* STATE MANAGEMENT *******
  // This should be all you need, but feel free to add to this if you need to 
  // communicate across the visualizations
  const globalApplicationState = {
    //selectedLocations: [],
    routesData: null,
    stopsData: null,
    busBoardData: null,
    stopBoardData : null,
    monthlyStopData: null, 
    monthlyBusData: null,
    selectedRoutesLineAbbrs : [],
    selectedRoutesIds : [],
    selectedStops : [],
    map: null,
    chart1: null,
    chart2: null,
    chart3: null,
    year: null,
    busType: null,
    dayType: null
  };
  
  
  //******* APPLICATION MOUNTING *******
  loadData().then((loadedData) => {
    //console.log('Here is the imported data:', loadedData.covidData);
    // console.log('Routes:', loadedData.routesData);
    // console.log('Stops:', loadedData.stopsData);
    // console.log('Route Boardings:', loadedData.busBoardData);
    // console.log('Stop Boardings:', loadedData.stopBoardData);
    // console.log('Monthly Boardings:', loadedData.monthlyData);

  
    // Store the loaded data into the globalApplicationState
    globalApplicationState.routesData = loadedData.routesData;
    globalApplicationState.stopsData = loadedData.stopsData;
    globalApplicationState.busBoardData = loadedData.busBoardData;
    globalApplicationState.stopBoardData = loadedData.stopBoardData;
    globalApplicationState.lineAbbrs = loadedData.routesData.features.map(d => d.properties.LineAbbr);


    // globalApplicationState.selectedMonths = loadedData.
    globalApplicationState.monthlyBusData =
          [loadedData.busBoardData.filter(d => d.Month==="January"), loadedData.busBoardData.filter(d => d.Month==="February"),
           loadedData.busBoardData.filter(d => d.Month==="March"), loadedData.busBoardData.filter(d => d.Month==="April"),
           loadedData.busBoardData.filter(d => d.Month==="May"), loadedData.busBoardData.filter(d => d.Month==="June"),
           loadedData.busBoardData.filter(d => d.Month==="July"), loadedData.busBoardData.filter(d => d.Month==="August"),
           loadedData.busBoardData.filter(d => d.Month==="September"), loadedData.busBoardData.filter(d => d.Month==="October"),
           loadedData.busBoardData.filter(d => d.Month==="November"), loadedData.busBoardData.filter(d => d.Month==="December")];
    for (let i = 0; i < 12; ++i)
        globalApplicationState.monthlyBusData[i].filter(d => d.Year === "2020" || d.Year === "2021" || d.Year === "2022");

    globalApplicationState.monthlyStopData =
          [loadedData.stopBoardData.filter(d => d.Month==="January"), loadedData.stopBoardData.filter(d => d.Month==="February"),
           loadedData.stopBoardData.filter(d => d.Month==="March"), loadedData.stopBoardData.filter(d => d.Month==="April"),
           loadedData.stopBoardData.filter(d => d.Month==="May"), loadedData.stopBoardData.filter(d => d.Month==="June"),
           loadedData.stopBoardData.filter(d => d.Month==="July"), loadedData.stopBoardData.filter(d => d.Month==="August"),
           loadedData.stopBoardData.filter(d => d.Month==="September"), loadedData.stopBoardData.filter(d => d.Month==="October"),
           loadedData.stopBoardData.filter(d => d.Month==="November"), loadedData.stopBoardData.filter(d => d.Month==="December")];

    globalApplicationState.year = d3.select('#Year').node().value;
    globalApplicationState.busType = d3.select('#BusType').node().value;
    globalApplicationState.dayType = d3.select('#metric2').node().value;

    // Creates the view objects with the global state passed in
    const map = new MapVis(globalApplicationState, "data/map.json", "data/stops.json");
    const chart1 = new Box(globalApplicationState);
    const chart2 = new Bar(globalApplicationState);
    const chart3 = new Scatter(globalApplicationState);

    globalApplicationState.map = map;
    globalApplicationState.chart1 = chart1;
    globalApplicationState.chart2 = chart2;
    globalApplicationState.chart3 = chart3;

      d3.select('#BusType').on('change', function() {
          globalApplicationState.year = d3.select('#Year').node().value;
          globalApplicationState.busType = d3.select('#BusType').node().value;
          globalApplicationState.dayType = d3.select('#metric2').node().value;
          let data = getFilteredMonthly();
          globalApplicationState.chart2.update(data);
      });
      d3.select('#metric2').on('change', function() {
          globalApplicationState.year = d3.select('#Year').node().value;
          globalApplicationState.busType = d3.select('#BusType').node().value;
          globalApplicationState.dayType = d3.select('#metric2').node().value;
          let data = getFilteredMonthly();
          globalApplicationState.chart2.update(data);
          globalApplicationState.chart3.update(globalApplicationState.year, globalApplicationState.dayType);
      });
      d3.select('#Year').on('change', function() {
          globalApplicationState.year = d3.select('#Year').node().value;
          globalApplicationState.busType = d3.select('#BusType').node().value;
          globalApplicationState.dayType = d3.select('#metric2').node().value;
          let data = getFilteredMonthly();
          globalApplicationState.chart2.update(data);
          globalApplicationState.chart3.update(globalApplicationState.year, globalApplicationState.dayType);
      });
    // Allow clear button to clear selection
    // d3.select('#clear-button').on('click', () => {
    //   globalApplicationState.selectedLocations = [];
    //   globalApplicationState.worldMap.updateSelectedCountries();
    //   globalApplicationState.lineChart.updateSelectedCountries();
    // });
  });

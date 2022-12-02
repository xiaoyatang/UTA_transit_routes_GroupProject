// ******* DATA LOADING *******
// We took care of that for you
async function loadData () {
    const routesData = await d3.json('data/map.json');
    const stopsData = await d3.json('data/stops.json');
    const busBoardData = await d3.csv('data/UTA_Route_Level_Boardings_Monthly_Counts.csv');
    const stopBoardData = await d3.csv('data/UTA_Stop_Boardings_-_Bus.csv');
    return { routesData, stopsData, busBoardData, stopBoardData };
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
    selectedRoutes : [],
    selectedStops : [],
    map: null,
    chart1: null,
    chart2: null,
    chart3: null,
  };
  
  
  //******* APPLICATION MOUNTING *******
  loadData().then((loadedData) => {
    //console.log('Here is the imported data:', loadedData.covidData);
    console.log('Routes:', loadedData.routesData);
    console.log('Stops:', loadedData.stopsData);
    console.log('Route Boardings:', loadedData.busBoardData);
    console.log('Stop Boardings:', loadedData.stopBoardData);

  
    // Store the loaded data into the globalApplicationState
    globalApplicationState.routesData = loadedData.routesData;
    globalApplicationState.stopsData = loadedData.stopsData;
    globalApplicationState.busBoardData = loadedData.busBoardData;
    globalApplicationState.stopBoardData = loadedData.stopBoardData;

  
    // Creates the view objects with the global state passed in 
    const map = new MapVis(globalApplicationState, "data/map.json", "data/stops.json");
    const chart1 = new Box(globalApplicationState);
    const chart2 = new Line(globalApplicationState);
    // const chart3 = new Scatter(globalApplicationState);


  
    globalApplicationState.map = map;
    globalApplicationState.chart1 = chart1;
    globalApplicationState.chart2 = chart2;
    // globalApplicationState.chart3 = chart3;


  
    // Allow clear button to clear selection
    // d3.select('#clear-button').on('click', () => {
    //   globalApplicationState.selectedLocations = [];
    //   globalApplicationState.worldMap.updateSelectedCountries();
    //   globalApplicationState.lineChart.updateSelectedCountries();
    // });
  });
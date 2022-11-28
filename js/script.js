// ******* DATA LOADING *******
// We took care of that for you
async function loadData () {
    const routesData = await d3.json('data/map.json');
    const stopsData = await d3.json('data/stops.json');
    return { routesData, stopsData };
  }
  
  
  // ******* STATE MANAGEMENT *******
  // This should be all you need, but feel free to add to this if you need to 
  // communicate across the visualizations
  const globalApplicationState = {
    //selectedLocations: [],
    routesData: null,
    stopsData: null,
    map: null,
    chart1: null,
    chart2: null
  };
  
  
  //******* APPLICATION MOUNTING *******
  loadData().then((loadedData) => {
    //console.log('Here is the imported data:', loadedData.covidData);
    console.log('Routes:', loadedData.routesData);
    console.log('Stops:', loadedData.stopsData);
  
    // Store the loaded data into the globalApplicationState
    globalApplicationState.routesData = loadedData.routesData;
    globalApplicationState.stopsData = loadedData.stopsData;
  
    // Creates the view objects with the global state passed in 
    const map = new MapVis("data/map.json", "data/stops.json");
    const chart1 = new Line(globalApplicationState);
    const chart2 = new Scatter(globalApplicationState);

  
    globalApplicationState.map = map;
    globalApplicationState.chart1 = chart1;
    globalApplicationState.chart2 = chart2;

  
    // Allow clear button to clear selection
    // d3.select('#clear-button').on('click', () => {
    //   globalApplicationState.selectedLocations = [];
    //   globalApplicationState.worldMap.updateSelectedCountries();
    //   globalApplicationState.lineChart.updateSelectedCountries();
    // });
  });
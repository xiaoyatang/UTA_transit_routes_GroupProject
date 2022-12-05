class MapVis {

    // Used this example from the ArcGIS documentation to implement brushing
    // https://developers.arcgis.com/javascript/latest/sample-code/highlight-features-by-geometry/
  constructor(appState, routesJson, stopsJson) {
      require(
        [
        "esri/Map",
        "esri/layers/GeoJSONLayer",
        "esri/views/MapView",
        "esri/layers/CSVLayer",
        "esri/layers/FeatureLayer",
        "esri/layers/GraphicsLayer",
        "esri/layers/support/FeatureFilter",
        "esri/widgets/Sketch/SketchViewModel",
        "esri/Graphic",
        "esri/widgets/FeatureTable",
        "esri/Basemap",
        "esri/geometry/geometryEngineAsync"
        ], (
        Map,
        GeoJSONLayer,
        MapView,
        CSVLayer,
        FeatureLayer,
        GraphicsLayer,
        FeatureFilter,
        SketchViewModel,
        Graphic,
        FeatureTable,
        Basemap,
        geometryEngineAsync
      ) => {
        let routeTemplate = {
          title: "UTA Route",
          content: "Line Name: {LineName}\n Route Type: {RouteType}\n Frequency: {Frequency}\n City: {City}\n County: {County}"
        };
        let pointsTemplate = {
          title: "UTA Stop",
          content: "Stop Name: {StopName}"
        };
      
        let lineRenderer = {
          type: "simple",
          symbol: {
            type: "simple-line",
            color: "#2CBCF0",
            width: 2}};
        let pointsRenderer = {
          type: "simple",
          symbol: {
            type: "simple-marker",
            color: "#77DD77",
            size: 5}};

        let routesLayer = new GeoJSONLayer({
          url: routesJson,
          popupTemplate: routeTemplate,
          renderer: lineRenderer});

        let stopsLayer = new GeoJSONLayer({
          url: stopsJson,
          popupTemplate: pointsTemplate,
          renderer: pointsRenderer});

        // make layer views for stops and routes
        let routesLayerView;
        routesLayer.when(() => {
            view.whenLayerView(routesLayer).then(function (layerView) {
              routesLayerView = layerView;});})

        let stopsLayerView;
        stopsLayer.when(() => {
            view.whenLayerView(stopsLayer).then(function (layerView) {
              stopsLayerView = layerView;});})

        // make map and set view
        let map = new Map({
          basemap: "gray-vector",
          layers: [routesLayer, stopsLayer]});
      
        let view = new MapView({
          container: "map",
          center: [-111.9, 40.76],
          zoom: 11,
          map: map});

        // Generate feature tables for stops and routes
        let routesFeatureTable = new FeatureTable({
          view: view,
          layer: routesLayer,
          highlightOnRowSelectEnabled: false,
          container: document.getElementById("tableDiv")});
        let stopsFeatureTable = new FeatureTable({
          view: view,
          layer: stopsLayer,
          highlightOnRowSelectEnabled: false,
          container: document.getElementById("tableDiv")});

        routesFeatureTable.on("selection-change", (changes) => {
          // Removed items are take nout of the feature list
          changes.removed.forEach((item) => {
            let data = appState.selectedRoutesIds.find((d) => { return d === item.objectId; });
            if (data) {
              appState.selectedRoutesIds.splice(appState.selectedRoutesIds.indexOf(data), 1);
              appState.selectedRoutesLineAbbrs.splice(appState.selectedRoutesLineAbbrs.indexOf(appState.lineAbbrs[data]), 1);
            }
          });

          // Add changed items to feature list
          changes.added.forEach((item) => {
            appState.selectedRoutesLineAbbrs.push(appState.lineAbbrs[item.objectId]);
            appState.selectedRoutesIds.push(item.objectId);});

        // Add visual changes for removed items
          routesLayerView.featureEffect = {
            filter: {objectIds: appState.selectedRoutesIds},
            excludedEffect: "blur(5px) grayscale(50%) opacity(30%)"};

          let data = [];
            for (let i = 0; i < 12; ++i)
              data.push(globalApplicationState.monthlyBusData[i].filter(d => d.Year === appState.year && d.Mode === appState.busType
                                                                       && (appState.dayType === 'all' ? true : appState.dayType === 'weekday' ? d.ServiceType === 'WKD' : d.ServiceType === 'SAT' || d.ServiceType === 'SUN')))
            appState.chart2.update(data)
        });

        stopsFeatureTable.on("selection-change", (changes) => {
          // Removed items are take nout of the feature list
          changes.removed.forEach((item) => {
            let data = appState.selectedStopsIds.find((d) => { return d === item.objectId; });
            if (data) {
              appState.selectedStopsIds.splice(appState.selectedStopsIds.indexOf(data), 1);
              appState.selectedStopsAbbrs.splice(appState.selectedStopsAbbrs.indexOf(appState.stopAbbrs[data]), 1);
            }
          });

          // Add visual changed items to feature list
          changes.added.forEach((item) => {
            appState.selectedStopsAbbrs.push(appState.stopAbbrs[item.objectId]);
            appState.selectedStopsIds.push(item.objectId);});

        // Add changes for removed items
          stopsLayerView.featureEffect = {
            filter: { objectIds: appState.selectedStopsIds},
            excludedEffect: "blur(5px) grayscale(50%) opacity(30%)"};
          let data = globalApplicationState.stopBoardData.filter(d => d.Year === globalApplicationState.year
                                                                 && (globalApplicationState.dayType === 'all' ? true : globalApplicationState.dayType === 'weekday' ?
                                                                     d.ServiceType === 'WKD' : d.ServiceType === 'SAT' || d.ServiceType === 'SUN'))
          appState.chart3.update(data)
        });

        let gl = new GraphicsLayer();
        map.add(gl);

        // Add button for brushing
        view.ui.add("select-by-rectangle", "top-left");
        let selectButton = document.getElementById("select-by-rectangle");
        selectButton.addEventListener("click", () => {
          view.popup.close();
          sketchViewModel.create("rectangle");});

        // Add button for clearing the selection
        view.ui.add("clear-selection", "top-left");
        document.getElementById("clear-selection")
          .addEventListener("click", () => {
            routesFeatureTable.highlightIds.removeAll();
            routesFeatureTable.filterGeometry = null;
            stopsFeatureTable.highlightIds.removeAll();
            stopsFeatureTable.filterGeometry = null;
            gl.removeAll();
          });

        // Select geometry based on selection
        let sketchViewModel = new SketchViewModel({ view: view, layer: gl });
        sketchViewModel.on("create", async (event) => {
          if (event.state === "complete") {
            const geometries = gl.graphics.map(function (graphic) { return graphic.geometry; });
            const queryGeometry = await geometryEngineAsync.union(geometries.toArray());
            selectFeatures(queryGeometry);
          }
        });

        // Sets selection of features based on the user-drawn geometry
        function selectFeatures(geometry) {
          if (routesLayerView) {
            const query = {
              geometry: geometry,
              outFields: ["*"]};

            routesLayerView.queryFeatures(query)
              .then((results) => {
                  routesFeatureTable.filterGeometry = geometry;
                  routesFeatureTable.selectRows(results.features);})
            stopsLayerView.queryFeatures(query)
              .then((results) => {
                  stopsFeatureTable.filterGeometry = geometry;
                  stopsFeatureTable.selectRows(results.features);})
          }
        }
      });
    }

}

class MapVis {

    constructor(routesJson, stopsJson) {
      require(["esri/Map", "esri/layers/GeoJSONLayer", "esri/views/MapView"], (
        Map,
        GeoJSONLayer,
        MapView
      ) => {
        const routeTemplate = {
          title: "UTA Route",
          content: "Line Name: {LineName}\n Route Type: {RouteType}\n Frequency: {Frequency}\n City: {City}\n County: {County}"
        };
        const pointsTemplate = {
          title: "UTA Stop",
          content: "Stop Name: {StopName}"
        };
      
        const lineRenderer = {
          type: "simple",
          symbol: {
            type: "simple-line",
            color: "#FF6464",
            width: 2}};
        const pointsRenderer = {
          type: "simple",
          symbol: {
            type: "simple-marker",
            color: "#FFEF82",
            size: 5}};
      
        const routesGeojsonLayer = new GeoJSONLayer({
          url: routesJson,
          popupTemplate: routeTemplate,
          renderer: lineRenderer});
      
        const stopsGeojsonLayer = new GeoJSONLayer({
          url: stopsJson,
          popupTemplate: pointsTemplate,
          renderer: pointsRenderer});
      
        const map = new Map({
          basemap: "gray-vector",
          layers: [routesGeojsonLayer, stopsGeojsonLayer]});
      
        const view = new MapView({
          container: "map",
          center: [-111.9, 40.76],
          zoom: 11,
          map: map});
      });
    }

}
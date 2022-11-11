class MapVis {

    constructor(globalApplicationState) {
        this.globalApplicationState = globalApplicationState;
    
        // Set up the map projection
        const projection = d3.geoWinkel3()
          .scale(150) // This set the size of the map
          .translate([400, 250]); // This moves the map to the center of the SVG
    
        // -------------------- BEGIN CUT ---------------------
        const path = d3.geoPath()
          .projection(projection);

        svg.append("path").attr("d",geoGenerator(countryData)).style("stroke","black").style("fill", "none");

    }

}
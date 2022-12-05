# Final-Project-VIS-2022
## Basic Information
**Project Title**: “Traffic routes in the state of Utah”.

**Contributors**: Milena Belianovich, Tark Patel, Xiaoya Tang.

**Emails**: u1419504@umail.utah.edu, tpat@sci.utah.edu, u1368791@umail.utah.edu.

**UIDs**: u1419504, u0893472, u1368791.

## Description: 
This project visualizes the traffic routes and other relative information in Salt Lake City in Utah.
Main point of this visualization is letting the user find interesting data correlations between different choices of routes on the map.

## Milestone 1, a Functional project prototype：
  Hand in the code and our process book in its current state.

    ~You must have a working visualization prototype. The direction and the content must be clear.
      - The map graph with routes is built. When click on a routes, a info box will appear.
      
    ~Should have completed your data acquisition. You must have your data structures in place.
      -Update map, stops, route-level boardings and stop boarding data in right structures. Historical routes data unfound but have send request to transit staff.
      
    ~The milestone will be submitted by creating a release in GitHub.
      -Process book.pdf
    
  Review with the staff.\
  upload feedback exercise(feedback to their feedback to us).
  
 ## Final project submission: 
 ~ Code: Contained in 'js' folder along with 'index.html'(html code) and 'style.css' (for styling).  

 ~ Libraries used are d3 and arcgis, linked in 'index.html'.   

 ~ Website of the project:  [https://xiaoyatang.github.io/UTA_transit_routes_GroupProject/](https://xiaoyatang.github.io/UTA_transit_routes_GroupProject/).

 ~ Youtube link for the explanation video:  []().

 ~ Features in detail:

    - Map:

      1. Brushing can be achieved by clicking the brushing button on the map, then clicking on the map itself and dragging the cursor.

      2. Multiple rectangles might be chosen at ones by using the brushing button on the map again.

      3. Clicking on the chosen rectangle and pressing the 'delete' button clears the rectangle shape, but let's the selection stay as is.

      4. In order to fully clear the selection, the clearing button (eraser) should be pressed.

      5. Clicking the cursor at any point on the map allows the user to see the closest routes and stops to the chosen spot on the map. THe tooltip shows arrows for going between possible routes/stops of interest, while the selection in the background changes accordingly.

    - Graphs:

      1. While the brush on the map is selecting routes, those will be mirrored on the graphs provided. However, additional filtering is allowed through drop-down choices.

      2. When the brush is removed, the selection for the graph data goes to its initial (starting) selection.
~ Interesting information:  

      1. One interesting observation is that by choosing the “Fixed Bus Route - Ski”, we can see the usage of it reaches the top in December of every 
      
      year. Salt Lake City contains famous ski resorts, so the ski lines are frequently used during the winter holiday season, especially in December,
      
      January, February and  sometimes even March.
      
      2. You can also see the usage of “Fixed Route Bus - Regular”. There is no obvious difference in its usage over months, partly due to the fact that
      
      it is one of the busiest lines in the city.

      3. The most frequently used type is  “Fixed Route Bus - Regular”. 
      
      
      4.Most stops have low average onboardings and alightings in December, while several stops are frequently used at the same time. We can estimate
      
      these stops are near the ski places in Salt Lake City.
      
      5. Stops are most frequently used in September, November and August. The following are July and January. That may be connected to special events in
      
      the city like the school events.
      
      6. The usage of stops in 2021 is obviously lower than 2020 and 2022. It may be influenced by the spread of the Coronavirus.
      
~ Conclusion and potential extensions for our work:

      We hope people can find a lot of fun on our website.
      
      We can advance the map with special positions to see the connections between stops and positions. We can also work on implementing the division of
      
      the map into neighborhoods to further analyze the possible connections between most populated neighborhoods and route’s use and availability.
      
      we are open to discuss our work with the UTA or others.
      
      



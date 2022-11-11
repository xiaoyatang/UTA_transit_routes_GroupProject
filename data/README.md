Data sources:
====
[UTA Routes and Most Recent Ridership](https://data-rideuta.opendata.arcgis.com/datasets/rideuta::uta-routes-and-most-recent-ridership/about), [UTA Stops and Most Recent Ridership](https://data-rideuta.opendata.arcgis.com/datasets/rideuta::uta-stops-and-most-recent-ridership/about)

Data descriptions(star indicates unused in our vis):  
====
---map.json---(Aug. 2022)  
==
        -*Route abbreviation *   
        -Route name   
        -Frequency(minutes)  
        -Route type  
        -City(only SLC used here)  
        -County   
        -*Most recent AVG WKD boading

---stops.json---(Nov. 2022)\
==
    	-*Stop abbreviation \
    	-Stop name\
    	-City(only SLC used here)\
    	-*Zip code \
    	-County\
    	-Latitude\
    	-Longitude\
    	-*October 2022 AVG WKD boarding

---UTA_Stop_Boardings_-_Bus.csv(2020-2022)\
==
    -Service type(WKD,SAT,SUN)\
    -Month(12 months)\
    -Year(2020-2022)\
    -*Stop abbreviation\
    -Stop name\
    -City(only SLC used here)\
    -County\
    -AVG boarding\
    -AVG alighting

---UTA_Route-Level_Boardings%2C_Monthly_Counts.csv(2017-2022)\
==
    -Mode(fixed route bus included-regular, express,ski,UTA rapid)\
    -*Route abbreviation\
    -Month(12 months)\
    -Year(2017-2022)\
    -Service type(WKD,SAT and SUN used)\
    -AVG boardings\
    -City(only SLC used)\
    -County

---Utah_Health_Small_Statistical_Areas_Obesity_and_Activity.csv/json(Optional)\
==
    -Population2017(only this attribute used here)


Absent data:\
==
---historical routes data(only Aug 2022 found)\
---highlight locations

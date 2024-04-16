# Dryland
This GitHub repository includes python scripts for calculating lake area/elevation/storage in global drylands.

**1_GEE_lakeAreas.js**

Surface area enhancement algorithm based on [Google Earth Engine](https://code.earthengine.google.com/).

This algorithm uses data from [JRC global surface water (GSW)](https://doi.org/10.1038/nature20584) dataset, which contains global surface water dynamics at 30m resolution and monthly time scale from Mar 1984 to the present. However, the GSW is frequently contaminated by cloud, cloud shadow, and sensor failure. Thus, we have developed an automatic image enhancement algorithm to repaire such images.

Full description about this algirthm can be found in [Zhao and Gao 2018](https://doi.org/10.1029/2018GL078343) and [Zhao et al. 2020](https://doi.org/10.1016/j.semcancer.2018.06.006).

**2_monthly_area.ipynb**

Post-processing the area time series

This code describes the processing steps to generate consistent monthly area time series for each lake. The main process is designed to filter the outliers (caused by uncertainties in the water classification algorithm from GSW or in the enhancement algorithm). Also, for months that have no data, a climatological value is interpolated. 

**3_occr_elevation.ipynb**

Calculating the area-elevation-storage relationship

This code describes the calculation process to generate the one-to-one relationship between surface area, surface elevation, and active storage. This calculation is based on multiple DEMs (SRTM DEM, ALOS, ASTER, and COPDEM) and the water occurrence image from GSW. 

**4_storage_calc.ipynb**

Conversion of the area time series to elevation and storage time series

This code describes the conversion of area values to elevation and storage values based on the above one-to-one relationship. At the end of these steps, three monthly time series from 1984 to 2020 can be generated including the lake surface area, lake surface elevation, and active storage.
Then such steps are looped over for all lakes and reservoirs in global drylands to create the final data product (GDLS).

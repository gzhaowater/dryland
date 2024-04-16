var Wtenhance = require('users/zeternity/modules:Water_enhance');
var jrc_mth = ee.ImageCollection("JRC/GSW1_4/MonthlyHistory");
var occr = ee.Image("JRC/GSW1_4/GlobalSurfaceWater").select('occurrence').selfMask();

var lake_shp = ee.FeatureCollection("users/ee_zhao/HydroLAKES_v10_voro_buffer_area1");
var lake = ee.Feature(lake_shp.filterMetadata('Hylak_id','equals', 9490).first())

var image = jrc_mth.filterDate('2004-5-1', '2005-1-1').first();
var prj = image.projection();

var img_bands = image.eq(0).addBands(image.eq(2)).addBands(image.gte(0));
var nd_wt = img_bands.multiply(ee.Image.pixelArea()).reduceRegion(ee.Reducer.sum(), 
                  lake.geometry(), prj.nominalScale(), null, null, true, 1e7, 16);
var nd_pct = ee.Number(nd_wt.get('water')).divide(nd_wt.get('water_2'));
var wt_pct = ee.Number(nd_wt.get('water_1')).divide(nd_wt.get('water_2'));

var water = ee.Algorithms.If(wt_pct.eq(0), image.eq(3),
             ee.Algorithms.If(nd_pct.lte(0.05), image.eq(2),
              ee.Algorithms.If(nd_pct.gte(0.95), image.eq(3),
                occr.gte(Wtenhance.edge_matching(image, occr, lake, prj))
                  .select(['occurrence'],['water']))));

var wt_area = ee.Image(water).add(1);
    
Map.addLayer(occr, {min: 0, max: 100, palette: ['ff0000', '00ff00','0000ff']}, 'Occurrence', false);
Map.addLayer(image, {min:0, max:2, palette:['709959','F2CE85','0070FF']}, 'Original', false);
Map.addLayer(wt_area, {min:0, max:2, palette:['709959','F2CE85','0070FF']}, 'Enhanced');
Map.centerObject(lake)

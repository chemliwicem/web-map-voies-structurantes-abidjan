ol.proj.proj4.register(proj4);
//ol.proj.get("EPSG:32630").setExtent([394529.934003, 590540.038711, 407476.752283, 596864.101101]);
var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var lyr_ImageVoieN1Partie1_1 = new ol.layer.Image({
        opacity: 1,
        
    title: 'Orthophoto Partie 1',
        
        
        source: new ol.source.ImageStatic({
            url: "./layers/orthophoto_partie1_web.png",
            attributions: ' ',
            projection: 'EPSG:32630',
            alwaysInRange: true,
            imageExtent: [393255.654470, 596013.220826, 400288.254470, 597582.620826]
        })
    });
var lyr_ImageVoie1Partie2_2 = new ol.layer.Image({
        opacity: 1,
        
    title: 'Orthophoto Partie 2',
        
        
        source: new ol.source.ImageStatic({
            url: "./layers/orthophoto_partie2_web.png",
            attributions: ' ',
            projection: 'EPSG:32630',
            alwaysInRange: true,
            imageExtent: [399604.539572, 591249.961247, 409545.939572, 596263.361247]
        })
    });
var format_EMPRISE_3 = new ol.format.GeoJSON();
var features_EMPRISE_3 = format_EMPRISE_3.readFeatures(json_EMPRISE_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:32630'});
var jsonSource_EMPRISE_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_EMPRISE_3.addFeatures(features_EMPRISE_3);
var lyr_EMPRISE_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_EMPRISE_3, 
                style: style_EMPRISE_3,
                popuplayertitle: 'EMPRISE',
                interactive: true,
                title: 'EMPRISE'
            });

lyr_OpenStreetMap_0.setVisible(true);lyr_ImageVoieN1Partie1_1.setVisible(false);lyr_ImageVoie1Partie2_2.setVisible(false);lyr_EMPRISE_3.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_ImageVoieN1Partie1_1,lyr_ImageVoie1Partie2_2,lyr_EMPRISE_3];
lyr_EMPRISE_3.set('fieldAliases', {'FID_': 'FID_', 'Entity': 'Entity', 'Layer': 'Layer', 'Color': 'Color', 'Linetype': 'Linetype', 'Elevation': 'Elevation', 'LineWt': 'LineWt', 'RefName': 'RefName', });
lyr_EMPRISE_3.set('fieldImages', {'FID_': 'TextEdit', 'Entity': 'TextEdit', 'Layer': 'TextEdit', 'Color': 'Range', 'Linetype': 'TextEdit', 'Elevation': 'TextEdit', 'LineWt': 'Range', 'RefName': 'TextEdit', });
lyr_EMPRISE_3.set('fieldLabels', {'FID_': 'no label', 'Entity': 'no label', 'Layer': 'no label', 'Color': 'no label', 'Linetype': 'no label', 'Elevation': 'no label', 'LineWt': 'no label', 'RefName': 'no label', });
lyr_EMPRISE_3.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});


ol.proj.proj4.register(proj4);
//ol.proj.get("EPSG:32630").setExtent([352143.519058, 568645.218272, 418936.674686, 613652.221308]);
var wms_layers = [];


        var lyr_OpenStreetMap_0 = new ol.layer.Tile({
            'title': 'OpenStreetMap',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_Coucherefactorise_1 = new ol.format.GeoJSON();
var features_Coucherefactorise_1 = format_Coucherefactorise_1.readFeatures(json_Coucherefactorise_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:32630'});
var jsonSource_Coucherefactorise_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Coucherefactorise_1.addFeatures(features_Coucherefactorise_1);
var lyr_Coucherefactorise_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Coucherefactorise_1, 
                style: style_Coucherefactorise_1,
                popuplayertitle: 'Couche refactorisée',
                interactive: true,
    title: 'Couche refactorisée<br />\
    <img src="styles/legend/Coucherefactorise_1_4.png" /> Très Haute<br />\
    <img src="styles/legend/Coucherefactorise_1_1.png" /> Haute<br />\
    <img src="styles/legend/Coucherefactorise_1_2.png" /> Moyenne<br />\
    <img src="styles/legend/Coucherefactorise_1_0.png" /> Faible<br />' });

lyr_OpenStreetMap_0.setVisible(true);lyr_Coucherefactorise_1.setVisible(true);
var layersList = [lyr_OpenStreetMap_0,lyr_Coucherefactorise_1];
lyr_Coucherefactorise_1.set('fieldAliases', {'tessellate': 'tessellate', 'Section N°': 'Section N°', 'Nom de la section': 'Nom de la section', 'Nom de la Voie': 'Nom de la Voie', 'Priorite': 'Priorite', 'Longueur de la voie (m)': 'Longueur de la voie (m)', 'Score AHP': 'Score AHP', 'Taux de rentabilité en %': 'Taux de rentabilité en %', });
lyr_Coucherefactorise_1.set('fieldImages', {'tessellate': 'Range', 'Section N°': 'TextEdit', 'Nom de la section': 'TextEdit', 'Nom de la Voie': 'TextEdit', 'Priorite': 'TextEdit', 'Longueur de la voie (m)': 'TextEdit', 'Score AHP': 'TextEdit', 'Taux de rentabilité en %': 'TextEdit', });
lyr_Coucherefactorise_1.set('fieldLabels', {'tessellate': 'no label', 'Section N°': 'inline label - always visible', 'Nom de la section': 'inline label - always visible', 'Nom de la Voie': 'inline label - always visible', 'Priorite': 'inline label - always visible', 'Longueur de la voie (m)': 'inline label - always visible', 'Score AHP': 'inline label - always visible', 'Taux de rentabilité en %': 'inline label - always visible', });
lyr_Coucherefactorise_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
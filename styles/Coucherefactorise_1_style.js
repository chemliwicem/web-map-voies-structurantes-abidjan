var size = 0;
var placement = 'point';

var priorityStyles_Coucherefactorise_1 = {
    'Faible': 'rgba(60,231,71,1.0)',
    'Moyenne': 'rgba(229,235,29,1.0)',
    'Haute': 'rgba(237,140,10,1.0)',
    'Très Haute': 'rgba(248,2,5,1.0)'
};

function lineStyle_Coucherefactorise_1(feature, resolution, labelText, labelFont,
                       labelFill, placement, bufferColor, bufferWidth, color) {
    return [new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(255,255,255,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 7.6}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    }), new ol.style.Style({
        stroke: new ol.style.Stroke({color: color, lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 4.787999999999999}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    }), new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(35,35,35,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 0.988}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })];
}

function categories_Coucherefactorise_1(feature, value, size, resolution, labelText,
                       labelFont, labelFill, bufferColor, bufferWidth,
                       placement) {
    var valueStr = (value !== null && value !== undefined) ? value.toString() : 'default';
    var color = priorityStyles_Coucherefactorise_1[valueStr];
    if (color) {
        return lineStyle_Coucherefactorise_1(feature, resolution, labelText, labelFont,
            labelFill, placement, bufferColor, bufferWidth, color);
    }
    return [new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(215,158,83,1.0)', lineDash: null, lineCap: 'square', lineJoin: 'bevel', width: 0.988}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })];
}

var style_Coucherefactorise_1 = function(feature, resolution){
    var labelText = '';
    var value = feature.get('Priorite');
    var labelFont = '10px, sans-serif';
    var labelFill = '#000000';
    var bufferColor = '';
    var bufferWidth = 0;
    var placement = 'line';

    return categories_Coucherefactorise_1(feature, value, size, resolution, labelText,
        labelFont, labelFill, bufferColor, bufferWidth, placement);
};

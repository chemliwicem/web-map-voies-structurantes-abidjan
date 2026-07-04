(function () {
    var sectionExtent = [0, 0, 1, 1];
    var sectionFeature = null;

    if (typeof proj4 !== 'undefined' && ol.proj && ol.proj.proj4) {
        ol.proj.proj4.register(proj4);
    }

    var osmLayer = new ol.layer.Tile({
        title: 'OpenStreetMap',
        visible: true,
        source: new ol.source.XYZ({
            attributions: ' ',
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        })
    });

    var esriLayer = new ol.layer.Tile({
        title: 'Esri World Imagery',
        visible: false,
        source: new ol.source.XYZ({
            attributions: 'Tiles © Esri',
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
        })
    });

    var format = new ol.format.GeoJSON();
    var allFeatures = format.readFeatures(json_Coucherefactorise_1, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:32630'
    });
    var sectionFeatures = allFeatures.filter(function (feature) {
        var sectionValue = feature.get('Section NÂ°');
        if (sectionValue === undefined) sectionValue = feature.get('Section N°');
        return String(sectionValue) === '1';
    });

    if (sectionFeatures.length) {
        sectionFeature = sectionFeatures[0];
        sectionExtent = sectionFeature.getGeometry().getExtent();
    }

    var sectionSource = new ol.source.Vector({
        features: sectionFeatures
    });

    var amenagementLayer = new ol.layer.Vector({
        title: 'Aménagement Section 1',
        source: sectionSource,
        visible: true,
        style: function (feature, resolution) {
            return typeof style_Coucherefactorise_1 === 'function'
                ? style_Coucherefactorise_1(feature, resolution)
                : null;
        }
    });

    var orthoExtent = ol.extent.buffer(sectionExtent, Math.max(
        ol.extent.getWidth(sectionExtent),
        ol.extent.getHeight(sectionExtent)
    ) * 0.08 || 1000);

    function makeOrthoLayer(title, url, extent) {
        return new ol.layer.Image({
            title: title,
            visible: false,
            opacity: 0.82,
            source: new ol.source.ImageStatic({
                url: url,
                imageExtent: extent,
                projection: 'EPSG:32630'
            })
        });
    }

    var orthoWidth = ol.extent.getWidth(orthoExtent);
    var orthoPart1 = makeOrthoLayer(
        'Orthophoto Partie 1',
        'images/ImageVoie1Partie1.tif',
        [orthoExtent[0], orthoExtent[1], orthoExtent[0] + orthoWidth / 2, orthoExtent[3]]
    );
    var orthoPart2 = makeOrthoLayer(
        'Orthophoto Partie 2',
        'images/ImageVoie1Partie2.tif',
        [orthoExtent[0] + orthoWidth / 2, orthoExtent[1], orthoExtent[2], orthoExtent[3]]
    );

    var map = new ol.Map({
        target: 'section-map',
        renderer: 'canvas',
        layers: [osmLayer, esriLayer, orthoPart1, orthoPart2, amenagementLayer],
        view: new ol.View({
            maxZoom: 28,
            minZoom: 1,
            projection: new ol.proj.Projection({
                code: 'EPSG:32630',
                units: 'm'
            })
        })
    });

    if (sectionFeatures.length) {
        map.getView().fit(ol.extent.buffer(sectionExtent, 900), {
            size: map.getSize(),
            padding: [72, 34, 44, 34],
            nearest: true
        });
    } else {
        map.getView().fit([352143.519058, 568645.218272, 418936.674686, 613652.221308], map.getSize());
    }

    function setBasemap(name) {
        var useEsri = name === 'esri';
        osmLayer.setVisible(!useEsri);
        esriLayer.setVisible(useEsri);
        document.getElementById('basemap-osm').classList.toggle('active', !useEsri);
        document.getElementById('basemap-esri').classList.toggle('active', useEsri);
    }

    window.addEventListener('load', function () {
        var legend = document.getElementById('amenagement-legend');
        var legendToggle = document.getElementById('amenagement-legend-toggle');
        var amenagementToggle = document.getElementById('toggle-amenagement');
        var orthoToggle = document.getElementById('toggle-orthos');
        var osmButton = document.getElementById('basemap-osm');
        var esriButton = document.getElementById('basemap-esri');

        if (legend && legendToggle) {
            legendToggle.addEventListener('click', function () {
                legend.classList.toggle('collapsed');
                legendToggle.textContent = legend.classList.contains('collapsed') ? '+' : '−';
            });
        }

        if (amenagementToggle) {
            amenagementToggle.addEventListener('change', function () {
                amenagementLayer.setVisible(amenagementToggle.checked);
            });
        }

        if (orthoToggle) {
            orthoToggle.checked = false;
            orthoToggle.addEventListener('change', function () {
                orthoPart1.setVisible(orthoToggle.checked);
                orthoPart2.setVisible(orthoToggle.checked);
            });
        }

        if (osmButton) osmButton.addEventListener('click', function () { setBasemap('osm'); });
        if (esriButton) esriButton.addEventListener('click', function () { setBasemap('esri'); });
        setTimeout(function () { map.updateSize(); }, 80);
    });
})();

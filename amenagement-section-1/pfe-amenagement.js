(function () {
    function addEsriBasemap() {
        if (typeof ol === 'undefined' || typeof map === 'undefined') return null;

        var esriLayer = new ol.layer.Tile({
            title: 'Esri World Imagery',
            visible: false,
            source: new ol.source.XYZ({
                attributions: 'Tiles © Esri',
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            })
        });

        map.getLayers().insertAt(1, esriLayer);
        return esriLayer;
    }

    function setupAmenagementControls() {
        if (typeof map === 'undefined') return;

        var esriLayer = addEsriBasemap();
        var legend = document.getElementById('amenagement-legend');
        var legendToggle = document.getElementById('amenagement-legend-toggle');
        var backButton = document.getElementById('back-button');
        var amenagementToggle = document.getElementById('toggle-amenagement');
        var orthoToggle = document.getElementById('toggle-orthos');
        var osmButton = document.getElementById('basemap-osm');
        var esriButton = document.getElementById('basemap-esri');
        var orthoLayers = [
            typeof lyr_ImageVoieN1Partie1_1 !== 'undefined' ? lyr_ImageVoieN1Partie1_1 : null,
            typeof lyr_ImageVoie1Partie2_2 !== 'undefined' ? lyr_ImageVoie1Partie2_2 : null
        ].filter(Boolean);
        var amenagementLayer = typeof lyr_EMPRISE_3 !== 'undefined' ? lyr_EMPRISE_3 : null;

        orthoLayers.forEach(function (layer) { layer.setVisible(false); });
        if (orthoToggle) orthoToggle.checked = false;
        if (amenagementLayer && amenagementToggle) amenagementToggle.checked = amenagementLayer.getVisible();

        if (legend && legendToggle) {
            legend.classList.add('collapsed');
            legendToggle.textContent = '+';
            legendToggle.addEventListener('click', function () {
                legend.classList.toggle('collapsed');
                legendToggle.textContent = legend.classList.contains('collapsed') ? '+' : '−';
            });
        }

        if (backButton) {
            backButton.addEventListener('click', function () {
                window.location.href = '../index.html?map=1';
            });
        }

        if (amenagementToggle && amenagementLayer) {
            amenagementToggle.addEventListener('change', function () {
                amenagementLayer.setVisible(amenagementToggle.checked);
            });
        }

        if (orthoToggle) {
            orthoToggle.addEventListener('change', function () {
                orthoLayers.forEach(function (layer) { layer.setVisible(orthoToggle.checked); });
            });
        }

        function setBasemap(name) {
            var useEsri = name === 'esri';
            if (typeof lyr_OpenStreetMap_0 !== 'undefined') lyr_OpenStreetMap_0.setVisible(!useEsri);
            if (esriLayer) esriLayer.setVisible(useEsri);
            if (osmButton) osmButton.classList.toggle('active', !useEsri);
            if (esriButton) esriButton.classList.toggle('active', useEsri);
        }

        if (osmButton) osmButton.addEventListener('click', function () { setBasemap('osm'); });
        if (esriButton) esriButton.addEventListener('click', function () { setBasemap('esri'); });
        setBasemap('osm');
        setTimeout(function () { map.updateSize(); }, 80);
    }

    window.addEventListener('load', setupAmenagementControls);
})();

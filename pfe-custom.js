(function () {
    var voies = [
        { name: 'Voie du Port (VDP)', label: 'Voie du Port (VDP)', color: 'rgba(229,235,29,1)' },
        { name: 'Voie Express de Jacqueville', label: 'Voie Express de Jacqueville', color: 'rgba(237,140,10,1)' },
        { name: 'Contournement de Bingerville', label: 'Contournement de Bingerville', color: 'rgba(60,231,71,1)' },
        { name: 'Ancienne Y4', label: 'Ancienne Y4', color: 'rgba(229,235,29,1)' },
        { name: 'Boulevard de France Redressé', label: 'Boulevard de France Redressé', color: 'rgba(248,2,5,1)' },
        { name: 'Liaison Échangeur Akwaba - Bd Aéroport', label: 'Liaison Échangeur Akwaba - Bd Aéroport', color: 'rgba(237,140,10,1)' }
    ];

    var activeVoies = new Set(voies.map(function (voie) { return voie.name; }));

    function closePopupIfPossible() {
        var popup = document.getElementById('popup');
        if (popup) popup.style.display = 'none';
        if (typeof collection !== 'undefined' && collection.clear) collection.clear();
    }

    function getFeatureValue(feature, keys) {
        for (var i = 0; i < keys.length; i++) {
            var value = feature.get(keys[i]);
            if (value !== undefined && value !== null) return value;
        }
        return '';
    }

    function buildAttributeTable(feature) {
        var keys = [
            'Section NÂ°',
            'Section N°',
            'Nom de la section',
            'Nom de la Voie',
            'Priorite',
            'Longueur de la voie (m)',
            'Score AHP',
            'Taux de rentabilitÃ© en %',
            'Taux de rentabilité en %'
        ];
        var labels = {
            'Section NÂ°': 'Section N°',
            'Section N°': 'Section N°',
            'Nom de la section': 'Nom de la section',
            'Nom de la Voie': 'Nom de la voie',
            'Priorite': 'Priorité',
            'Longueur de la voie (m)': 'Longueur de la voie (m)',
            'Score AHP': 'Score AHP',
            'Taux de rentabilitÃ© en %': 'Taux de rentabilité en %',
            'Taux de rentabilité en %': 'Taux de rentabilité en %'
        };
        var rows = keys.map(function (key) {
            var value = feature.get(key);
            if (value === undefined || value === null || value === '') return '';
            return '<tr><th>' + labels[key] + '</th><td>' + String(value) + '</td></tr>';
        }).join('');

        return '<div class="section-action-card section-attributes">' +
            '<h3>Détails de la section - Section 1</h3>' +
            '<table>' + rows + '</table>' +
            '<button type="button" class="section-action-secondary" data-section-actions>Retour aux options</button>' +
            '</div>';
    }

    function showSectionActions(feature, coordinate) {
        var title = getFeatureValue(feature, ['Nom de la section']) || 'Section 1';
        var popup = document.getElementById('popup');
        var content = document.getElementById('popup-content');
        if (!popup || !content || typeof overlayPopup === 'undefined') return;

        content.innerHTML = '<div class="section-action-card">' +
            '<h3>' + title + '</h3>' +
            '<p>Choisissez une action pour la Section 1.</p>' +
            '<div class="section-action-buttons">' +
            '<button type="button" data-section-table>Détails de la section</button>' +
            '<a href="file:///D:/PFE_MASTER_TPT/WEB_MAPING/PAGE_WEB_VOIES_STRUCTURANTES/qgis2web_2026_07_04-10_22_43_404100/index.html">Page Aménagement</a>' +
            '</div>' +
            '</div>';
        popup.style.display = 'block';
        overlayPopup.setPosition(coordinate);

        var tableButton = content.querySelector('[data-section-table]');
        if (tableButton) {
            tableButton.addEventListener('click', function () {
                content.innerHTML = buildAttributeTable(feature);
                var backButton = content.querySelector('[data-section-actions]');
                if (backButton) {
                    backButton.addEventListener('click', function () {
                        showSectionActions(feature, coordinate);
                    });
                }
            });
        }
    }

    function setupHomeScreen() {
        var home = document.getElementById('home-screen');
        var button = document.getElementById('enter-map');
        if (!home || !button) return;

        var params = new URLSearchParams(window.location.search);
        if (params.get('map') === '1' || window.location.hash === '#map') {
            home.classList.add('hidden');
            home.style.display = 'none';
            if (typeof map !== 'undefined') setTimeout(function () { map.updateSize(); }, 80);
            return;
        }

        button.addEventListener('click', function () {
            home.classList.add('hidden');
            setTimeout(function () {
                home.style.display = 'none';
                if (typeof map !== 'undefined') map.updateSize();
            }, 460);
        });
    }

    function setupVoiesLayer() {
        if (typeof lyr_Coucherefactorise_1 === 'undefined') return;

        var originalStyle = lyr_Coucherefactorise_1.getStyle();
        lyr_Coucherefactorise_1.setVisible(true);
        lyr_Coucherefactorise_1.set('interactive', true);
        lyr_Coucherefactorise_1.set('popuplayertitle', 'Voies structurantes');
        lyr_Coucherefactorise_1.set('fieldAliases', {
            'tessellate': 'tessellate',
            'Section N°': 'Section N°',
            'Nom de la section': 'Nom de la section',
            'Nom de la Voie': 'Nom de la voie',
            'Priorite': 'Priorité',
            'Longueur de la voie (m)': 'Longueur de la voie (m)',
            'Score AHP': 'Score AHP',
            'Taux de rentabilité en %': 'Taux de rentabilité en %'
        });
        lyr_Coucherefactorise_1.setStyle(function (feature, resolution) {
            var voie = String(feature.get('Nom de la Voie'));
            if (!activeVoies.has(voie)) return null;
            return typeof originalStyle === 'function' ? originalStyle(feature, resolution) : originalStyle;
        });
        lyr_Coucherefactorise_1.changed();

        if (typeof doHover !== 'undefined') doHover = false;
        if (typeof preDoHover !== 'undefined') preDoHover = false;
    }

    function setupLegend() {
        var list = document.getElementById('route-list');
        if (!list) return;

        voies.forEach(function (voie) {
            var label = document.createElement('label');
            label.className = 'route-item';

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = voie.name;
            checkbox.checked = true;

            var swatch = document.createElement('span');
            swatch.className = 'route-swatch';
            swatch.style.background = voie.color;

            var text = document.createElement('span');
            text.className = 'route-label';
            text.textContent = voie.label;

            checkbox.addEventListener('change', function () {
                if (checkbox.checked) activeVoies.add(voie.name);
                else activeVoies.delete(voie.name);
                closePopupIfPossible();
                if (typeof lyr_Coucherefactorise_1 !== 'undefined') lyr_Coucherefactorise_1.changed();
            });

            label.appendChild(checkbox);
            label.appendChild(swatch);
            label.appendChild(text);
            list.appendChild(label);
        });

        var legend = document.getElementById('route-legend');
        var toggle = document.getElementById('legend-toggle');
        if (legend && toggle) {
            toggle.addEventListener('click', function () {
                legend.classList.toggle('collapsed');
                toggle.textContent = legend.classList.contains('collapsed') ? '+' : '−';
            });
        }
    }

    function patchFeaturePicking() {
        if (typeof map === 'undefined' || typeof lyr_Coucherefactorise_1 === 'undefined') return;

        map.on('singleclick', function (evt) {
            var sectionOneFeature = null;
            var visibleVoieFound = false;
            map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
                if (layer === lyr_Coucherefactorise_1 && activeVoies.has(String(feature.get('Nom de la Voie')))) {
                    visibleVoieFound = true;
                    var sectionValue = feature.get('Section NÂ°');
                    if (sectionValue === undefined) sectionValue = feature.get('Section N°');
                    if (String(sectionValue) === '1') sectionOneFeature = feature;
                }
            }, {
                layerFilter: function (layer) {
                    return layer === lyr_Coucherefactorise_1;
                }
            });

            if (sectionOneFeature) {
                setTimeout(function () {
                    showSectionActions(sectionOneFeature, evt.coordinate);
                }, 0);
            }
            if (!visibleVoieFound) closePopupIfPossible();
        });
    }

    window.addEventListener('load', function () {
        setupHomeScreen();
        setupVoiesLayer();
        setupLegend();
        patchFeaturePicking();
    });
})();

import React from 'react';
import ChartistGraph from 'react-chartist';
import 'chartist/dist/chartist.css';
import 'chartist-plugin-tooltips-updated/dist/chartist-plugin-tooltip.css';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';

const donneesLocales = [
    { timestamp: 1706862348727, value: 31727 },
    { timestamp: 1706861148775, value: 31722 },
    { timestamp: 1706859948822, value: 31718.8 },
    { timestamp: 1706827550120, value: 31650.2 },
    { timestamp: 1706481965610, value: 29210.8 },
    { timestamp: 1706741154079, value: 31056.1 },
    { timestamp: 1704062858575, value: 7807.3 }
];

const Durand = () => {
    // Transformer les données en un format utilisable par Chartist
    const labels = donneesLocales.map(item => new Date(item.timestamp).toLocaleString());
    const series = [donneesLocales.map(item => item.value)];

    const data = {
        labels: labels,
        series: series
    };

    const options = {
        low: 0,
        showArea: true,
        axisX: {
            labelInterpolationFnc: function(value) {
                return value.split(', ').join('\n');  // Pour afficher les dates et heures sur des lignes séparées
            }
        },
        plugins: [
            ChartistTooltip({
                appendToBody: true
            })
        ]
    };

    return (
        <div>
            <h2>Consommation d'eau</h2>
            
            <ChartistGraph 
            
                data={data} 
                options={options} 
                type="Line"
            />
        </div>
    );
};

export default Durand;

import React from "react";
import Chartist from "react-chartist";
import * as ChartistTooltip from 'chartist-plugin-tooltips-updated';


export const BarValueChart = () => {
    const data = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [[3, 5, 7, 6, 4, 3, 2]]
    };
  
    const options = {
      low: 0,
      showArea: true,
      fullWidth: true,
      axisX: {
        position: 'end',
        showGrid: true
      },
      axisY: {
        // On the y-axis start means left and end means right
        showGrid: false,
        showLabel: false,
        labelInterpolationFnc: value => `$${value / 1}k`
      }
    };
  
    const plugins = [
      ChartistTooltip()
    ];
  
    return (
      <Chartist data={data} options={{...options, plugins}} type="Bar" className="ct-series-g ct-double-octave" />
    );
  };
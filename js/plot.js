import Chart from './lib/auto.esm.js';

export const COLORS = {
  red: 'rgba(255, 99, 132, 1)',
  orange: 'rgba(255, 159, 64, 1)',
  yellow: 'rgba(255, 205, 86, 1)',
  green: 'rgba(75, 192, 192, 1)',
  blue: 'rgba(54, 162, 235, 1)',
  purple: 'rgba(153, 102, 255, 1)',
  grey: 'rgba(201, 203, 207, 1)'
};

function transparent(color) {
  return color.replace(/, *1 *\)/, ', 0.4)');
}
 
let currentChart;

export function plot(source,borderColor) {
//  console.log(">plot",chart.offsetHeight,chart.offsetWidth);
  const backgroundColor = borderColor.map(c => transparent(c));

  memoryChart.parentNode.style.height = source.length * 50 + "px";
 // console.log(">plot2",chart.offsetHeight,chart.offsetWidth);
  const data = {
    labels: source.map(([label, mbs]) => label),
    datasets: [
      {
        label: '',
        data: source.map(([label, mbs]) => mbs),
        backgroundColor,
        borderColor,
        borderWidth: 1,
        //barThickness: 20,
        // categoryPercentage:1,
        // barPercentage:1
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      animation: false,
      indexAxis: 'y',
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          display: false
        },
        title: {
          display: false,
          text: 'Chart.js Horizontal Bar Chart',
          font: {
            size: 24
          }
        },
        tooltip: {
          enabled: false
        }
      },
      scales: {
        x: {
          title: {
            text: 'total used memory, MB',
            display: true,

          },
          ticks: {
            stepSize: 1
          }
        },
        y: {
          title: {
            text: 'statements executed from top to bottom',
            display: true
          }
        }
      }


    },
  };
  if (currentChart) currentChart.destroy();
  currentChart = new Chart(memoryChart, config);
}
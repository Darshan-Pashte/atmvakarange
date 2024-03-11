import React from 'react';
import Chart from 'react-apexcharts';

const ChartComponent = ({
  series,
  type = 'bar',
  disableZoom,
  yProps = null,
  hideXAxis = false,
  hideYAxis = false,
  colors,
  showGridLines = false,
  disableFill,graphSucess,graphFail
}) => {
  const xAxisLabels = ['M','T','W',"T",'F',"S","S"]; // Define X-axis labels statically
  let options = {
    chart: {
      zoom: {
        enabled: !disableZoom,
      },
      toolbar: {
        show: false,
      },
      foreColor: '#9aa8c0',
    },
    grid: {
      show: showGridLines,
    },
    
    xaxis: {
      categories: xAxisLabels,
      labels: {
        
        style: {
          fontSize: '0.825vw',
          opacity: 0.8,
          color: '#535E71',
        },
        showDuplicates: false,
        show: !hideXAxis,
      },
      axisBorder: {
        show: !hideXAxis, // hide the X axis line
      },
      axisTicks: {
        show: !hideXAxis, // hide the X axis ticks
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '0.825vw',
        },
        show: !hideYAxis,
      },
      axisBorder: {
        show: !hideYAxis, // hide the X axis line
      },
      axisTicks: {
        show: !hideYAxis, // hide the X axis ticks
      },
      ...yProps,
    },
    colors,
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    dataLabels: { enabled: false },
    tooltip: {
      style: {
        fontSize: '1vw',
      },
    },

    plotOptions: {
      bar: {
        columnWidth: '30%', // Adjust the width of the bars (you can adjust the percentage as needed)
      },
      area: {
        fillTo: 'end',
      },
    },
    fill: disableFill
      ? {
          gradient: {
            enabled: true,
            opacityFrom: 0,
            opacityTo: 0,
          },
        }
      : {},
  };

  if (type === 'radialBar') {
    options = {
      ...options,
      chart: {
        height: '100%',
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: '60%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: '#ff4949', // Change to danger red color
            strokeWidth: '100%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: '#888',
              fontSize: '2vw',
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: '#111',
              fontSize: '2vw',
              show: true,
            },
          },
        },
      },
      fill: {
        type: 'solid', // Change fill type to 'solid'
        colors: ['#22bb33'], // Specify a single color for the fill
        // type: 'gradient',
        gradient: {
          // shade: 'dark',
          // type: 'horizontal',
          // shadeIntensity: 0.5,
          // gradientToColors: ['#ABE5A1'],
          shade: 'light', // Change 'dark' to 'light'
          type: 'horizontal',
          shadeIntensity: 0.7, // Adjust shade intensity if needed
          gradientToColors: ['green'], // Change gradient colors
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        // lineCap: 'round',
      },
      labels: ['Percent'],
      subtitle: {
        text: 'Success Rate',
        align: 'center',
        margin: 20,
        offsetY: 25,
        style: {
          color: '#222',
          fontSize: '1.5vw',
          fontWeight: 'bold',
        },
      },
    };
  }

  return <Chart options={options} series={series} type={type} height={type === 'radialBar' ? '300' : '300'} width='100%' />;
};

export default ChartComponent;

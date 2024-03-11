
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = ({graph}) => {
  const hourLabels = graph?.map(entry => `${entry.hourStr}hrs`);
  const countValues = graph?.map(entry => entry.cnt);
  const chartData = {
    series: [
      {
        name: 'Count',
        data: countValues,
      },
     
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
    
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '30%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: hourLabels,
      },
      yaxis: {
        title: {
          text: '(Count)'
        }
      },
      fill: {
        opacity: 1,
        colors: ['#C6426E'], // Change this to the desired color code
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return  val 
          }
        }
      }
      
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={300} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;



// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// const LocalTransactionChart = ({graph}) => {

//   const hourLabels = graph?.map(entry => `${entry.hourStr}hrs`);
//   const countValues = graph?.map(entry => entry.cnt);
//   const chartData = {
//     series: [
//       {
//         name: 'Count',
//         // data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
//         data: countValues,
//       },
//     ],
//     options: {
//       chart: {
//         height: 350,
//         type: 'line',
//         zoom: {
//           enabled: false,
//         },
//         background: '#ffffff',
//         contextmenu: {
//           enabled: false, // Set this to false to hide the menu option
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         curve: 'straight',
//         colors: ['#FDB73B'], // Specify the color you want here
//       },
//     //   title: {
//     //     text: 'Product Trends by Month',
//     //     align: 'left',
//     //   },
//       grid: {
//         row: {
//           colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
//           opacity: 0.5,
//         },
//       },
//       xaxis: {
//         // categories: ['0hrs', '3hrs', '6hrs', '9hrs', '12hrs', '15hrs', '18hrs', '21hrs', '24hrs'],
//         categories: hourLabels,
//       },
//       toolbar: {
//         show: false, 
//         export: {
//           enabled: false, // Disable export options, including download icon
//         },// Hide the toolbar (including download icon)
//       },



//     },
//   };

//   return (
//     <div>
//       <div id="chart">
//         <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={250} />
//       </div>
//       <div id="html-dist"></div>
//     </div>
//   );
// };

// export default LocalTransactionChart;



import React from 'react';
import ReactApexChart from 'react-apexcharts';

const AcquireTransactionChart = ({dayList}) => {

    const Day=dayList && dayList?.map((item)=>item.dayOfWeek)
    const FailCount=dayList && dayList?.map((item)=>item.failCount)
    const SucessCount=dayList && dayList?.map((item)=>item.successCount)
    const FailAmount=dayList && dayList?.map((item)=>item.failAmount)
    const SuccessAmount=dayList && dayList?.map((item)=>item.successAmount)

//   const hourLabels = graph?.map(entry => `${entry.hourStr}hrs`);
//   const countValues = graph?.map(entry => entry.cnt);
  const chartData = {
    series: [
      {
        name: 'Success Amount',
        // data: [10, 41, 35, 51, 49, 62, 69,],
        data:SuccessAmount,
        
        // data: countValues,
        color:'#22bb33'
      },
      {
        name: 'Fail Amount',
        // data: [5, 21, 15, 21, 29, 42, 39,],
        data:FailAmount,
        // data: countValues,
        color:'#ff4949'
      },
     
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
        background: '#ffffff',
        contextmenu: {
          enabled: false, // Set this to false to hide the menu option
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '60%', // Adjust the width of the bars (percentage or pixel value)
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
        colors:['transparent']
        // colors: ['#FDB73B'], // Specify the color you want here
      },
    //   title: {
    //     text: 'Product Trends by Month',
    //     align: 'left',
    //   },
      grid: {
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        // categories: ['0hrs', '3hrs', '6hrs', '9hrs', '12hrs', '15hrs','18hrs'],
        categories: Day,
      },
      toolbar: {
        show: false, 
        export: {
          enabled: false, // Disable export options, including download icon
        },// Hide the toolbar (including download icon)
      },


    //   colors: ['red', 'green'], // Set colors for each bar
    },
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={285} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default AcquireTransactionChart;

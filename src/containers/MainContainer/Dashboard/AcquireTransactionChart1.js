import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'react-apexcharts';

const YourChartComponent  = ({dayList}) => {

    const Day=dayList && dayList?.map((item)=>item.dayOfWeek)
    const FailCount=dayList && dayList?.map((item)=>item.failCount)
    const SucessCount=dayList && dayList?.map((item)=>item.successCount)
    const FailAmount=dayList && dayList?.map((item)=>item.failAmount)
    const SuccessAmount=dayList && dayList?.map((item)=>item.successAmount)
  const options = {
    series: [
        {
            name: 'Success Count',
            group: 'budget',
            // data: [44000, 55000, 41000, 67000, 22000, 43000]
           
            data:SucessCount
          },
        {
            name: 'Success Amount',
            group: 'actual',
            // data: [48000, 50000, 40000, 65000, 25000, 40000]
       
            data:SuccessAmount
          },
          {
       
            name: 'Fail Count',
            group: 'budget',
            // data: [13000, 36000, 20000, 8000, 13000, 27000]
            data:FailCount
            
          },
          {
            name: 'Fail Amount',
            group: 'actual',
            // data: [20000, 40000, 25000, 10000, 12000, 28000]
            data:FailAmount
          },
        

    
    
     
     
    ],
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    dataLabels: {
      formatter: (val) => {
        // return val / 1000 + 'K'
        return val
      }
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    xaxis: {
    //   categories: [
    //  'M',
    //  'M',
    //  'M',
    //  'M',
    //  'M',
    //  'M',
    //  'M',
    //   ]
    categories:Day
    },
    fill: {
      opacity: 1,
      colors: ['green', 'red', 'yellow', 'pink'],
    },
    
    yaxis: {
      labels: {
        formatter: (val) => {
        //   return val / 1000 + 'K'
        return val
        }
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    }
  };

  useEffect(() => {
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }, []); // Empty dependency array ensures useEffect runs only once after the initial render

  return (
    <div>
    <div id="chart">
      <ReactApexChart options={options} series={options.series} type="bar" height={285} />
    </div>
    <div id="html-dist"></div>
  </div>
  );
};

export default YourChartComponent;

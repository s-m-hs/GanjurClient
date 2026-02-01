import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';
import './CircleChart.css'


export default function CircleChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['ارسال جهت استعلام', 'در انتظار تایید مشتری', 'تایید مشتری','درحال درحال تامین','تحویل داده شده','لغو شده',],
            datasets: [
                {
                    data: [540, 325, 702,350,120,630],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--teal-500'),
                        documentStyle.getPropertyValue('--pink-500'),
                        documentStyle.getPropertyValue('--orange-500'), 
                        documentStyle.getPropertyValue('--red-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--pink-400'),
                        documentStyle.getPropertyValue('--teal-400'),
                        documentStyle.getPropertyValue('--red-400'),
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

  return (
    <div className="card flex  circlechart-div ">
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem circlechart-div-chart" />
        </div>
  )
}

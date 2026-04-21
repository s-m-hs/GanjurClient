import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart';
import './CircleChart.css'
import ApiGetX2 from '../../../../utils/ApiServicesX/ApiGetX2';


export default function CircleChart(props) {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});


    useEffect(() => {
        if (props.list?.length != 0) {
            const documentStyle = getComputedStyle(document.documentElement);
            const data = {
                // labels: ['ارسال جهت استعلام', 'در انتظار تایید مشتری', 'تایید مشتری','درحال درحال تامین','تحویل داده شده','لغو شده',],
                labels: props.list?.labels,
                datasets: [
                    {
                        data: props.list?.data,
                        backgroundColor: [
                            documentStyle.getPropertyValue('--teal-500'),
                            documentStyle.getPropertyValue('--blue-500'),
                            documentStyle.getPropertyValue('--green-500'),
                            documentStyle.getPropertyValue('--pink-500'),
                            documentStyle.getPropertyValue('--orange-500'),
                            documentStyle.getPropertyValue('--yellow-500'),
                            documentStyle.getPropertyValue('--gray-500'),
                            documentStyle.getPropertyValue('--red-500'),
                            documentStyle.getPropertyValue('--red-300'),
                            documentStyle.getPropertyValue('--blue-300'),
                            documentStyle.getPropertyValue('--orange-300'),
                            documentStyle.getPropertyValue('--green-300'),
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--teal-500'),
                            documentStyle.getPropertyValue('--blue-500'),
                            documentStyle.getPropertyValue('--green-500'),
                            documentStyle.getPropertyValue('--pink-500'),
                            documentStyle.getPropertyValue('--orange-500'),
                            documentStyle.getPropertyValue('--yellow-500'),
                            documentStyle.getPropertyValue('--gray-500'),
                            documentStyle.getPropertyValue('--red-500'),
                            documentStyle.getPropertyValue('--red-300'),
                            documentStyle.getPropertyValue('--blue-300'),
                            documentStyle.getPropertyValue('--orange-300'),
                            documentStyle.getPropertyValue('--green-300'),
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
        }

    }, [props.list]);

    return (
        <div className="card flex  circlechart-div ">
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem circlechart-div-chart" />
        </div>
    )
}

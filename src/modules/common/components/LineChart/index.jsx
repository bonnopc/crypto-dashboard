import { Line } from "react-chartjs-2";

export default function LineChart({
    datasets, labels, ...restProps
}){
    const chartData = {
        labels,
        datasets: datasets.map(dataset => ({
            ...dataset,
            fill: false,
            backgroundColor: 'rgb(46, 134, 222)',
            borderColor: 'rgba(46, 134, 222, 0.8)',
            cubicInterpolationMode: 'monotone',
            tension: 1.2,
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointBorderColor: 'rgba(0,0,0,0)',
            pointHoverBackgroundColor: 'rgba(46, 134, 222, 0.9)',
        })),
    };

    const options = {
        legend: {
            display: false
        },
        scales: {
            ticks: {
                display: false
            },
            yAxes: {
                display: false,
                ticks: {
                    beginAtZero: false,
                    // display: false,
                },
                gridLines: {
                    // color: "green",
                    display: false,
                    drawBorder: false,
                    // drawOnChartArea: false,
                    // drawOnArea: false,
                }
            },
            xAxes: {
                display: false,
                ticks: {
                    display: true,
                },
                grid: {
                    // drawBorder: false,
                    drawOnChartArea: false,
                    drawOnArea: false,
                }
            },
        },
    };

    return <Line data={chartData} options={options} {...restProps} />
}
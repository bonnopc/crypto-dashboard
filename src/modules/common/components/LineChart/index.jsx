import { Line } from "react-chartjs-2";

export default function LineChart({
    datasets, labels, ...restProps
}){
    const chartData = {
        labels,
        datasets: datasets.map(dataset => ({
            ...dataset,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            cubicInterpolationMode: 'monotone',
            tension: 0.8
        })),
    };

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                },
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
            xAxes: [{
                gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                }
            }],
        },
    };

    return <Line data={chartData} options={options} {...restProps} />
}
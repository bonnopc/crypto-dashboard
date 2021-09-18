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
            borderColor: 'rgba(255, 99, 132, 0.8)',
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
                grids: {
                    color: "rgba(0, 0, 0, 0)",
                    display: false
                }
            }],
            xAxes: [{
                grids: {
                    color: "rgba(0, 0, 0, 0)",
                    drawBorder: false
                }
            }],
        },
    };

    return <Line data={chartData} options={options} {...restProps} />
}
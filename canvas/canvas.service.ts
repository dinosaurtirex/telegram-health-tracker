import { ChartJSNodeCanvas } from "chartjs-node-canvas";
import { ChartConfiguration, ChartTypeRegistry } from "chart.js";
import {HEADACHE_KEYS, MENTAL_STATE_KEYS} from "../bot/data/keys";
import { registerFont } from "canvas";

registerFont("./fonts/Gilroy/Gilroy-Light.otf", { family: "Gilroy" });

const STATUS_MAPPING: Record<string, number> = {
    [HEADACHE_KEYS.STRONG]: 3,
    [HEADACHE_KEYS.MEDIUM]: 2,
    [HEADACHE_KEYS.LOW]: 1,
    [HEADACHE_KEYS.CLEAR]: 0,
    [MENTAL_STATE_KEYS.PERFECT]: 3,
    [MENTAL_STATE_KEYS.GOOD]: 2,
    [MENTAL_STATE_KEYS.BAD]: 1,
    [MENTAL_STATE_KEYS.DEPRESSION]: 0
};


export async function generateCanvasGraph(
    graphData: { date: Date; status: string }[],
    graphType: string
): Promise<Buffer | null> {

    console.log(graphData);

    const formattedLabels = graphData.map(entry => {
        const date = new Date(entry.date);
        return date.toLocaleDateString("en-US", { weekday: "long" }); // Конвертируем в день недели
    });

    const width = 1280 * 1.5;
    const height = 340 * 1.5;
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, backgroundColour: "#121212" });

    if (graphData.length === 0) return null;

    const smoothedData = smoothData(graphData.map(entry => STATUS_MAPPING[entry.status] || 0));

    const configuration: ChartConfiguration<keyof ChartTypeRegistry> = {
        type: "line",
        data: {
            labels: formattedLabels,
            datasets: [
                {
                    label: graphType,
                    data: smoothedData,
                    borderColor: "#37008d",
                    backgroundColor: "rgba(55,0,141,0.2)",
                    pointRadius: 0,
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                },
            ],
        },
        options: {
            layout: {
                padding: {
                    top: 60,
                    bottom: 30,
                    left: 30,
                    right: 30
                }
            },
            responsive: false,
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: "#ffffff",
                        padding: 10,
                        font: {
                            size: 8,
                            weight: "light",
                            family: "Gilroy",
                        },
                        maxRotation: 0,
                        minRotation: 0,
                    },
                    grid: { display: false },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        color: "#ffffff",
                        font: {
                            size: 8,
                            weight: "light",
                            family: "Gilroy",
                        },
                        callback: (value) => {
                            const reverseMapping = { 3: "Strong", 2: "Medium", 1: "Low", 0: "Clear" };
                            return reverseMapping[value] || "";
                        },
                    },
                    grid: { display: false },
                },
            },
            backgroundColor: "#121212",
        },
    };

    return chartJSNodeCanvas.renderToBuffer(configuration);
}

function smoothData(data: number[]): number[] {
    const smoothed = [];
    for (let i = 0; i < data.length; i++) {
        if (i === 0 || i === data.length - 1) {
            smoothed.push(data[i]);
        } else {
            smoothed.push((data[i - 1] + data[i] + data[i + 1]) / 3);
        }
    }
    return smoothed;
}

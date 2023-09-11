document.addEventListener('DOMContentLoaded', () => {
    const ctx = document
        .getElementById('statusBot')
        .getContext('2d');
    let datosDePing = [];

    fetch('/data-client')
        .then((response) => response.json())
        .then((data) => {
            const { clientPing } = data;

            const obtenerEstadoDelBot = () => {
                const estadoDelBot = {
                    fecha: new Date(),
                    ping: clientPing,
                };

                return estadoDelBot;
            };

            const gradientePurpura = ctx.createLinearGradient(
                0,
                0,
                0,
                400
            );
            gradientePurpura.addColorStop(
                0,
                'rgba(149, 76, 233, 1)'
            );
            gradientePurpura.addColorStop(
                0.5,
                'rgba(149, 76, 233, 0.5)'
            );
            gradientePurpura.addColorStop(
                1,
                'rgba(149, 76, 233, 0)'
            );

            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [
                        {
                            label: 'Bot Ping',
                            data: [],
                            borderColor: 'rgba(149, 76, 233, 1)',
                            borderWidth: 2,
                            pointRadius: 5,
                            pointBackgroundColor: gradientePurpura,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                const dataIndex = tooltipItem.index;
                                const fecha = new Date(
                                    datosDePing[dataIndex].fecha
                                );
                                return `${fecha.toLocaleString()} - Ping: ${tooltipItem.yLabel
                                    }`;
                            },
                        },
                    },
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'second',
                                displayFormats: {
                                    second: 'HH:mm:ss',
                                },
                            },
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });

            const actualizarEstado = async () => {
                const datos = await obtenerEstadoDelBot();
                datosDePing.push(datos);

                if (datosDePing.length > 10) {
                    datosDePing.shift();
                }

                chart.data.labels = datosDePing.map(
                    (item) => new Date(item.fecha)
                );
                chart.data.datasets[0].data = datosDePing.map(
                    (item) => item.ping
                );
                chart.update();
                document.getElementById('statusBot').textContent =
                    new Date(datos.fecha).toLocaleString();
            };

            setInterval(actualizarEstado, 5000);
            actualizarEstado();
        });
});
/* The code snippet is adding an event listener to the 'DOMContentLoaded' event, which fires when the
initial HTML document has been completely loaded and parsed. */
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document
        .getElementById('botChart')
        .getContext('2d');
    fetch('/data')
        .then((response) => response.json())
        .then((data) => {
            const { usersAll, botsAll, All, clientStatus } =
                data;

            const obtenerEstadoDelBot = () => {
                const estadoDelBot = {
                    botStatus: clientStatus,
                    usuarios: usersAll,
                    bots: botsAll,
                    total: All,
                };

                return estadoDelBot;
            };

            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [
                        'Total Users',
                        'Total Bots',
                        'Registered Members',
                    ],
                    datasets: [
                        {
                            label: 'User Measurements',
                            data: [0, 0, 0],
                            backgroundColor: [
                                'rgba(75, 192, 192, 0.7)',
                                'rgba(255, 206, 86, 0.7)',
                                'rgba(255, 99, 132, 0.7)',
                            ],
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });

            const actualizarEstado = async () => {
                const botStatus = await obtenerEstadoDelBot();
                document.getElementById('botChart').textContent =
                    botStatus.botStatus;
                chart.data.datasets[0].data = [
                    botStatus.usuarios,
                    botStatus.bots,
                    botStatus.total,
                ];
                chart.update();
            };

            setInterval(actualizarEstado, 5000);
            actualizarEstado();
        });
});
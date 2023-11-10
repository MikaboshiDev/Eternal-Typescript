const playerData = {
    labels: [],
    datasets: [
        {
            label: 'Jugadores en línea',
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
        },
    ],
};

const ctx = document.getElementById('playerChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: playerData,
});

async function fetchData() {
    try {
        const response = await axios.get('https://api.mcstatus.io/v2/status/java/demonscraft.lol');
        const { players, online, version, server, motd } = response.data;

        document.getElementById('playerCount').textContent = players.online ? players.online : "Disconnected";
        document.getElementById('serverStatus').textContent = online === true ? 'Online' : 'Offline';
        document.getElementById('serverVersion').textContent = version.name_raw ? version.name_raw : "Disconnected";
        document.getElementById('serverMotd').textContent = motd.clean ? motd.clean : "Disconnected";
        updateChart();
    } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
    }
}

function updateChart() {
    const time = new Date().toLocaleTimeString();
    playerData.labels.push(time);
    playerData.datasets[0].data.push(Math.floor(Math.random() * 50));
    chart.update();
}

setInterval(fetchData, 10000);
fetchData();
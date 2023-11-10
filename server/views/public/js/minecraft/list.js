async function getPlayerNames() {
    const response = await axios.get('https://api.mcstatus.io/v2/status/java/demonscraft.lol');
    const { players } = response.data;
    return players.list;
}

let playerListVisible = false;
function showPlayerList() {
    const playerList = document.getElementById("playerList");
    const playerCount = parseInt(document.getElementById("playerCount").innerText, 10);

    if (playerCount > 0) {
        playerList.innerHTML = "";
        getPlayerNames().then((playerNames) => {
            if (!playerListVisible) {
                playerList.style.display = "block"; // Mostrar la lista
                playerListVisible = true;

                playerNames.forEach((player, index) => {
                    const playerName = player.name_raw;
                    const playerUUID = player.uuid;

                    const playerListItem = document.createElement("li");
                    playerListItem.innerText = `${index + 1}. ${playerName}               ${playerUUID}`;
                    playerList.appendChild(playerListItem);
                });
            } else {
                playerList.style.display = "none"; // Ocultar la lista
                playerListVisible = false;
            }
        });
    }
}

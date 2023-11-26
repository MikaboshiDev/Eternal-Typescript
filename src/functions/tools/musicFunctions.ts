export function formatDuration(duration: number) {
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    const timeStr = [];

    if (hours > 0) {
        timeStr.push(hours);
    }

    if (minutes > 0) {
        timeStr.push(`${minutes}`);
    }

    if (seconds > 0) {
        timeStr.push(`:${seconds}`);
    }

    return timeStr.join('');
}

export function spotifyURL(url: string) {

    if (url.includes("/intl-es/")) {
        url = url.replace("/intl-es", "");
    } else if (url.includes("/intl-en/")) {
        url = url.replace("/intl-en", "");
    } else if (url.includes("/intl-es/album/")) {
        url = url.replace("/intl-es/album/", "/album/");
    }

    return url;
}
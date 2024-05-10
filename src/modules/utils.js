export function getDateFromTimestamp(timestamp) {
    return timestamp.split("T")[0];
}

export function getTimeFromTimestamp(timestamp) {
    return timestamp.split("T")[1].slice(0, 5);
}

function formatFloat(num, pos) {
    let size = Math.pow(10, pos);
    return Math.round(num * size) / size;
}
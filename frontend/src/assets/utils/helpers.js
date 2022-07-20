const secondsFormatter = (_seconds) => {
    const seconds = +_seconds;
    // Format to minutes:seconds
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds - minutes * 60;
    return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
}

const numberFormatter = (_number) => {
    // format 1000 to 1k or 1000000 to 1m etc
    const number = +_number;
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixIndex = Math.floor(Math.log10(number) / 3);
    return `${Math.round(number / Math.pow(10, suffixIndex * 3))}${suffixes[suffixIndex]}`;
}

export {
    secondsFormatter,
    numberFormatter
};
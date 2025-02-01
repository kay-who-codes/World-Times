// Predefined offsets relative to GMT
const countries = [
    { name: "🇺🇸 USA", city: "Los Angeles", tz: "America/Los_Angeles", offsetGMT: -8 },
    { name: "🇧🇷 Brazil", city: "São Paulo", tz: "America/Sao_Paulo", offsetGMT: -3 },
    { name: "🇺🇸 USA", city: "New York", tz: "America/New_York", offsetGMT: -5 },
    { name: "🇨🇦 Canada", city: "Toronto", tz: "America/Toronto", offsetGMT: -5 },
    { name: "🇩🇪 Germany", city: "Berlin", tz: "Europe/Berlin", offsetGMT: 1 },
    { name: "🇫🇷 France", city: "Paris", tz: "Europe/Paris", offsetGMT: 1 },
    { name: "🇮🇹 Italy", city: "Rome", tz: "Europe/Rome", offsetGMT: 1 },
    { name: "🇷🇺 Russia", city: "Moscow", tz: "Europe/Moscow", offsetGMT: 3 },
    { name: "🇦🇪 UAE", city: "Dubai", tz: "Asia/Dubai", offsetGMT: 4 },
    { name: "🇮🇳 India", city: "Delhi", tz: "Asia/Kolkata", offsetGMT: 5.5 },
    { name: "🇨🇳 China", city: "Beijing", tz: "Asia/Shanghai", offsetGMT: 8 },
    { name: "🇯🇵 Japan", city: "Tokyo", tz: "Asia/Tokyo", offsetGMT: 9 },
    { name: "🇦🇺 Australia", city: "Sydney", tz: "Australia/Sydney", offsetGMT: 11 },
    { name: "🇦🇶 Antarctica", city: "Rothera Station", tz: "Antarctica/Rothera", offsetGMT: -3 },
    { name: "🇿🇦 South Africa", city: "Cape Town", tz: "Africa/Johannesburg", offsetGMT: 2 },
    { name: "🇬🇷 Greece", city: "Athens", tz: "Europe/Athens", offsetGMT: 2 }
];


function updateTime() {
    const now = new Date();

    // Get London time
    const londonTime = now.toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    document.getElementById("london-time").innerText = londonTime;

    // Get London's GMT offset dynamically in case of daylight savings
    const londonOffset = new Date().getTimezoneOffset() / -60; // Offset in hours

    // Sort countries from earliest to latest based on actual GMT offset
    const sortedCountries = countries
        .map(country => {
            const time = now.toLocaleTimeString("en-GB", { timeZone: country.tz, hour: "2-digit", minute: "2-digit" });
            const offset = country.offsetGMT - londonOffset;
            return { ...country, time, offset };
        })
        .sort((a, b) => a.offset - b.offset); // Sort by actual offset

    const beforeLondon = [];
    const afterLondon = [];

    sortedCountries.forEach(country => {
        const offsetText = country.offset > 0 ? `+${country.offset}` : country.offset;
        const countryHTML = `<div class="country-time">${country.name} ${offsetText} (${country.city}): ${country.time}</div>`;

        if (country.offset < 0) {
            beforeLondon.push(countryHTML);
        } else {
            afterLondon.push(countryHTML);
        }
    });

    document.getElementById("before-london").innerHTML = beforeLondon.join("");
    document.getElementById("after-london").innerHTML = afterLondon.join("");
}

updateTime();
setInterval(updateTime, 1000);
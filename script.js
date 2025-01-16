document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([0, 0], 15);
    const etaElement = document.getElementById('eta');

    // Add tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const userMarker = L.marker([0, 0]).addTo(map);
    const driverMarker = L.marker([0, 0], { icon: L.icon({
        iconUrl: 'https://via.placeholder.com/30x30',
        iconSize: [30, 30],
    })}).addTo(map);

    // Simulated driver location
    const driverLocation = [51.505, -0.09]; // Replace with actual data

    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            userMarker.setLatLng([latitude, longitude]);
            map.setView([latitude, longitude]);

            const distance = map.distance([latitude, longitude], driverLocation);
            const eta = Math.round(distance / 500); // Assuming 500 meters/minute speed
            etaElement.textContent = eta;
        },
        (error) => {
            console.error('Geolocation error:', error);
            alert('Unable to retrieve your location');
        },
        { enableHighAccuracy: true }
    );

    driverMarker.setLatLng(driverLocation);
});

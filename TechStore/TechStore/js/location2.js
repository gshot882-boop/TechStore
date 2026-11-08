// Location page for TechStore
let map2;
let markers2 = [];

const locations2 = [
    { name: 'Asosiy Ofis', lat: 41.2844, lng: 69.2042, phone: '+998 71 123 45 67' },
    { name: 'Filial 1 - Yunusobod', lat: 41.3111, lng: 69.2797, phone: '+998 71 234 56 78' },
    { name: 'Filial 2 - Mirzo Ulug\'bek', lat: 41.2995, lng: 69.2401, phone: '+998 71 345 67 89' },
    { name: 'Filial 3 - Sergeli', lat: 41.2153, lng: 69.2401, phone: '+998 71 456 78 90' },
    { name: 'Filial 4 - Shayxontohur', lat: 41.2646, lng: 69.2162, phone: '+998 71 567 89 01' },
    { name: 'Filial 5 - Olmazor', lat: 41.3381, lng: 69.3322, phone: '+998 71 678 90 12' }
];

function initMap2() {
    if (typeof L !== 'undefined') {
        map2 = L.map('map').setView([41.2844, 69.2042], 12);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map2);

        locations2.forEach((location, index) => {
            const marker = L.marker([location.lat, location.lng])
                .addTo(map2)
                .bindPopup(`
                    <strong>${location.name}</strong><br>
                    Tel: ${location.phone}
                `);
            
            markers2.push(marker);
            
            if (index === 0) {
                map2.setView([location.lat, location.lng], 13);
            }
        });
    } else {
        const mapDiv = document.getElementById('map');
        if (mapDiv) {
            mapDiv.innerHTML = `
                <iframe 
                    width="100%" 
                    height="500" 
                    style="border:0; border-radius: 10px;" 
                    loading="lazy" 
                    allowfullscreen
                    referrerpolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0!2d69.2042!3d41.2844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE3JzAzLjgiTiA2OcKwMTInMTUuMSJF!5e0!3m2!1sen!2s!4v1234567890">
                </iframe>
            `;
        }
    }
}

window.showLocation2 = function(lat, lng, name) {
    if (map2 && typeof L !== 'undefined') {
        map2.setView([lat, lng], 15);
        markers2.forEach(marker => {
            const markerLat = marker.getLatLng().lat;
            const markerLng = marker.getLatLng().lng;
            if (Math.abs(markerLat - lat) < 0.001 && Math.abs(markerLng - lng) < 0.001) {
                marker.openPopup();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = function() {
        setTimeout(initMap2, 100);
    };
    document.body.appendChild(script);
});

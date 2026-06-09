<?php
$pageTitle = "Location Tracker";
include 'includes/header.php';
?>

<section class="card">
    <h2>📍 Location Tracker</h2>

    <button onclick="getLocation()" class="btn-primary">
        Share My Location
    </button>

    <p id="status"></p>

   <div
    id="map"
    style="
        height:500px;
        width:100%;
        margin-top:20px;
        border-radius:16px;
        overflow:hidden;">
</div>
</section>

<script>

function getLocation() {

    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(function(position) {

        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        document.getElementById("status").innerHTML =
            "Latitude: " + lat +
            "<br>Longitude: " + lng;

        // Create map
        const map = L.map('map').setView([lat, lng], 16);

        L.tileLayer(
            'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution: '&copy; OpenStreetMap'
            }
        ).addTo(map);

        // Red Icon
        const redIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
        });

        // Blue Icon
        const blueIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
        });

        // Green Icon
        const greenIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
        });

        // Orange Icon
        const orangeIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
        });

        // Yellow Icon
        const yellowIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
        });

        // Violet Icon
        const violetIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41]
        });

        // Members
        const members = [

            {
                name: "🔵 Amirah",
                lat: lat + 0.001,
                lng: lng + 0.001,
                icon: blueIcon
            },

            {
                name: "🟣 Hafiz",
                lat: lat - 0.0015,
                lng: lng + 0.0005,
                icon: greenIcon
            },

            {
                name: "🟠 Liyana",
                lat: lat + 0.0008,
                lng: lng - 0.001,
                icon: orangeIcon
            },

            {
                name: "🟡 Sara",
                lat: lat - 0.001,
                lng: lng - 0.001,
                icon: yellowIcon
            },

            {
                name: "🔴 Daniel",
                lat: lat + 0.0015,
                lng: lng + 0.002,
                icon: violetIcon
            }

        ];

        // Add markers
        members.forEach(member => {

            L.marker(
                [member.lat, member.lng],
                { icon: member.icon }
            )
            .addTo(map)
            .bindTooltip(member.name, {
                permanent: true,
                direction: "top"
            });

        });

    });

}

</script>
<?php include 'includes/footer.php'; ?>
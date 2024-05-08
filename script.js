document.addEventListener("DOMContentLoaded", function () {
    fetch("https://ericguz1.github.io/SD330/parking.json")
        .then(response => response.json())
        .then(data => {
            if (data && Array.isArray(data.parkingLots)) {
                displayParkingLots(data.parkingLots);
            } else {
                console.error("Invalid JSON format: 'parkingLots' property not found.");
            }
        })
        .catch(error => console.error("Error fetching data:", error));
});


function displayParkingLots(parkingLots) {
    const parkingLotsContainer = document.getElementById("parkingLotsContainer");
    if (parkingLots && parkingLots.length > 0) {
        parkingLots.forEach(parkingLot => {
            const lotDiv = document.createElement("div");
            let mapImageUrl;
            switch (parkingLot.name) {
                case "Foy":
                    mapImageUrl = "https://ericguz1.github.io/SD330/foymap.jpg";
                    break;
                case "Donnelly":
                    mapImageUrl = "https://ericguz1.github.io/SD330/donnellymap.jpg";
                    break;
                case "Fontaine":
                    mapImageUrl = "https://ericguz1.github.io/SD330/fontainemap.jpg";
                    break;
                case "McCann":
                    mapImageUrl = "https://ericguz1.github.io/SD330/mccannmap.jpg";
                    break;
                case "Midrise":
                    mapImageUrl = "https://ericguz1.github.io/SD330/midrisemap.jpg";
                    break;
                case "Riverview":
                    mapImageUrl = "https://ericguz1.github.io/SD330/riverviewmap.jpg";
                    break;
                default:
                    mapImageUrl = "https://via.placeholder.com/400x300?text=Map+Not+Available";
            }
            lotDiv.innerHTML = `
                <h3>${parkingLot.name}</h3>
                <img src="${mapImageUrl}" alt="${parkingLot.name}" style="max-width: 400px;">
                <p>${parkingLot.comments}</p>
                <p>Total Spaces: ${parkingLot.totalSpaces}</p>
                <p>Peak Usage Hours: ${parkingLot.PeakUsageHours}</p>
                <p><a href="spots.html?lot=${encodeURIComponent(parkingLot.name)}">View Parking Spots</a></p>
            `;
            parkingLotsContainer.appendChild(lotDiv);
        });
    } else {
        console.error("No parking lots found in JSON data.");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const parkingLotName = urlParams.get('lot');
    if (parkingLotName) {
        document.getElementById("parkingLotName").textContent = parkingLotName;
        fetch("https://ericguz1.github.io/SD330/parking.json")
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data.parkingLots)) {
                    const parkingLot = data.parkingLots.find(lot => lot.name === parkingLotName);
                    if (parkingLot) {
                        displayParkingSpots(parkingLot.spaces);
                    } else {
                        console.error(`Parking lot '${parkingLotName}' not found.`);
                    }
                } else {
                    console.error("Invalid JSON format: 'parkingLots' property not found.");
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    }
});

function displayParkingSpots(parkingSpots) {
    const parkingSpotsContainer = document.getElementById("parkingSpotsContainer");
    if (parkingSpots && parkingSpots.length > 0) {
        parkingSpots.forEach(spot => {
            const spotDiv = document.createElement("div");
            spotDiv.innerHTML = `
                <p>Parking Spot Number: ${spot.number}</p>
                <p>Type: ${spot.type}</p>
                <p>Status: ${spot.status}</p>
                <p>Handicap Accessible: ${spot.handicap ? 'Yes' : 'No'}</p>
                <p>Filled Date Time: ${spot.filledDateTime ? new Date(spot.filledDateTime).toLocaleString() : 'N/A'}</p>
                <p>Reserved Date Time: ${spot.reservedDateTime ? new Date(spot.reservedDateTime).toLocaleString() : 'N/A'}</p>
            `;
            parkingSpotsContainer.appendChild(spotDiv);
        });
    } else {
        console.error("No parking spots found in JSON data.");
    }
}

const API_KEY = "579b464db66ec23bdd00000104d6f2045de8423859ac6167a9cb9825";
const RESOURCE_ID = "3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69";

const API_URL =
`https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=1000`;

const cities = [
    "Delhi",
    "Mumbai",
    "Bengaluru",
    "Chennai",
    "Hyderabad",
    "Kolkata",
    "Pune",
    "Ahmedabad"
];

async function loadAQI(){

    try{

        const response = await fetch(API_URL);

        const data = await response.json();

        const container = document.getElementById("cityCards");

        container.innerHTML = "";

        cities.forEach(city=>{

            const cityData = data.records.filter(
                record=>record.city===city
            );

            if(cityData.length===0) return;

            const getValue = pollutant=>{

                const p = cityData.find(
                    x=>x.pollutant_id===pollutant
                );

                return p ? p.avg_value : "--";

            };

            const pm25 = Number(getValue("PM2.5"));

            let status = "Good";
            let statusClass = "good";

            if(pm25>60){

                status="Poor";
                statusClass="poor";

            }

            else if(pm25>30){

                status="Moderate";
                statusClass="moderate";

            }

            const lastUpdate = cityData[0].last_update;

            container.innerHTML += `

            <div class="city-card">

                <h2>${city}</h2>

                <p>🌫 PM2.5 : <b>${getValue("PM2.5")}</b></p>

                <p>🌪 PM10 : <b>${getValue("PM10")}</b></p>

                <p>🧪 SO₂ : <b>${getValue("SO2")}</b></p>

                <p>🚗 NO₂ : <b>${getValue("NO2")}</b></p>

                <p>🕒 ${lastUpdate}</p>

                <span class="status ${statusClass}">
                    ${status}
                </span>

            </div>

            `;

        });

    }

    catch(error){

        console.log(error);

    }

}

loadAQI();

setInterval(loadAQI,300000);
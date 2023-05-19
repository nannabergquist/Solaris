const apiKey = 'solaris-2ngXkR6S02ijFrTP';

let bodies = [];

async function getData() {
    let baseUrl = 'https://fathomless-shelf-54969.herokuapp.com/bodies';

    try {
        let data = await fetch(`${baseUrl}`, {
                method: 'GET',
                headers: {
                    'x-zocom': apiKey
                }
            })
            .then(response => response.json())
            .then(data => {
                bodies = data.bodies
                window.localStorage.setItem("bodies", JSON.stringify(bodies));
                return data
            })
    } catch (err) {
        window.location.href = "404.html";
    }
    return data
}


getData()

// välkomstknappen för att komma till galaxen med planeterna

let btn = document.getElementById('btn-1');

btn.addEventListener('click', (e) => {
    let spaceRocket = document.getElementById('space-rocket');
    spaceRocket.classList.add('rocketInSpace');
    setTimeout(function () {
        document.body.style.backgroundImage = "url('img/stars.png')";
        document.body.style.backgroundRepeat = "repeat";

        document.getElementById('welcome-section').style.display = "none";

        let allplanets = document.querySelectorAll('.allplanets');
        allplanets.forEach(planet => {
            planet.classList.add('planetInSpace');
            console.log(planet);
        });
    }, 4000);

})


// Sökfunktionen för planeten

let choosePlanet = document.getElementById('submit');

choosePlanet.addEventListener('keyup', async (e) => {
    if (e.key === "Enter") {
        let input = choosePlanet.value.toLowerCase();
        let found = false;
        //skapar en if sats för att man ska kunna söka på sol & jord så det inte blir nekat.
        if (input === "sol" || input === "jord") {
            input += "en"
        }
        for (let i = 0; i < bodies.length; i++) {

            if (bodies[i].name.toLowerCase() === input) {

                let thePlanet = document.createElement('article');
                document.querySelector('body').appendChild(thePlanet);

                window.localStorage.setItem("body", JSON.stringify(bodies[i]));
                location.href = "planetsPage.html";

                found = true;


                console.log(bodies[i])
            };
        }
        console.log(input);
        if (!found) {
            alert('Ordet som du sökte efter finns ej, vänligen testa igen');
        }
    }
})

//när du klickar på bilderna så ska du kunna gå in till en ny sida om planeten. 

let planets = document.querySelectorAll('.allplanets');
for (planet of planets) {
    planet.addEventListener('click', (e) => {

        let id = e.target.id;
        console.log(id);
        id = id.replace('planet', '');
        id = id.replace('img', '');
        console.log(id);

        window.localStorage.setItem("body", JSON.stringify(bodies[id]));
        window.location.href = "planetsPage.html";
        console.log(id);
    })
}
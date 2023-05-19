let paginationContainer = document.getElementById('pagination');

// hämta children via paginationscontainern kom ihåg: /https://attacomsian.com/blog/javascript-dom-get-all-child-nodes-of-an-element 
const paginationList = Array.from(paginationContainer.children);

let planetData = window.localStorage.getItem('body');

planetData = JSON.parse(planetData); //för att få ett objekt och inte en sträng
function fillPageFromData(planetID) {
    planetData = planetID;
    //hämtar ut data om varje planet till sidan
    document.getElementById('name-of-the-planet').innerText = planetID.name;
    document.getElementById('desc').innerText = planetID.desc;
    document.getElementById('tempday').innerText = planetID.temp.day;
    document.getElementById('tempnight').innerText = planetID.temp.night;
    document.getElementById('latin-name').innerText = planetID.latinName;
    document.getElementById('distance').innerText = planetID.distance;
    document.getElementById('moons').innerHTML = ""; //inga dubbletter 
    for (moon of planetID.moons) {
        document.getElementById('moons').innerHTML += `<p>${moon}</p>`;
    }
    paginationList.forEach(listItem => {
        if (listItem.id == "") {
            listItem.classList.remove("active");

            const planetNumber = parseInt(listItem.innerText);
            if (planetNumber == planetID.id + 1) {
                listItem.classList.add("active");
            }
        }

    });
}

fillPageFromData(planetData);

let bodies = window.localStorage.getItem('bodies');
bodies = JSON.parse(bodies);
console.log(bodies);

//när du trycker på knappen så går du till startsida
let returnBtn = document.getElementById('return-topage');
returnBtn.addEventListener('click', function () {
    window.location.href = "index.html";
})

//när du trycker på knappen "läs mer" så ska du komma till wikipedia koppla till resterande planet. 

let wikiPage = document.getElementById('wikipedia-page');

wikiPage.addEventListener('click', function () {
    names = planetData.name;
    window.location.href = `https://sv.wikipedia.org/wiki/${names}`;
})

//när du trycker på knappen så ska vidare till nästa planet i indexet. 

paginationList.forEach(li => {
    //för knappar med nummer 
    if (li.id == "") {
        li.addEventListener('click', function () {
            const planetNumber = parseInt(li.innerText);
            fillPageFromData(bodies[planetNumber - 1]);
        })
    }
    //för framåt knappen
    if (li.id == "forward") {
        li.addEventListener('click', function () {
            let planetNumber = 1 + parseInt(planetData.id);
            if (planetNumber > 8) {
                planetNumber = 8;
            }
            fillPageFromData(bodies[planetNumber]);

        });
    }
    //för bakåt knappen
    if (li.id == "back") {
        console.log(li.innerText);
        console.log("back");
        li.addEventListener('click', function () {
            let planetNumber = parseInt(planetData.id) - 1;
            if (planetNumber < 0) {
                planetNumber = 0;
            }
            console.log(planetNumber);
            fillPageFromData(bodies[planetNumber]);

        });
    }

})




const apiKey = 'solaris-2ngXkR6S02ijFrTP';

async function getData() {
    let baseUrl = 'https://fathomless-shelf-54969.herokuapp.com/bodies';
    let data = await fetch(`${baseUrl}`, {
            method: 'GET',
            headers: {
                'x-zocom': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            bodies = data.bodies
            return data
        })
        .catch(err => console.log(err))
    return data
}
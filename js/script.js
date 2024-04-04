var contador = 1

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function fetchUrl(id){
    document.querySelector(".lds-ring").style.display = "grid";
    document.querySelector(".main").style.display = "none";
    document.querySelector(".searchBar").style.display = "none";
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    document.querySelector(".lds-ring").style.display = "none";
    document.querySelector(".main").style.display = "grid";
    document.querySelector(".searchBar").style.display = "grid";
    
    return data;

}

async function fetchSpecificPokemon(namePokemon){
    document.querySelector(".lds-ring").style.display = "grid";
    document.querySelector(".main").style.display = "none";
    document.querySelector(".searchBar").style.display = "none";
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${namePokemon}`);
    const data = await response.json();
    var pokemonId = data.id
    

    const newDiv = document.createElement("div");
    newDiv.classList.add("pokemon-div")
    document.querySelector(".main").appendChild(newDiv);

    sleep(100);
    const newName = document.createElement("p");
    newName.classList.add("pokeName");
    newName.textContent = "Name: " + await data.name[0].toUpperCase() + data.name.substring(1);
    document.querySelector('.pokemon-div').appendChild(newName);
    
    const newImg = document.createElement("img");
    newImg.classList.add("pokeImg");
    newImg.src = await data.sprites.front_default;
    document.querySelector('.pokemon-div').appendChild(newImg)
    
    const newID = document.createElement("p");
    newID.classList.add("pokeID");
    newID.textContent = "#" + await data.id.toString().padStart(3,0)
    document.querySelector('.pokemon-div').appendChild(newID)  
  
    document.querySelector(".pokemon-div").setAttribute("onclick", `showCard('${pokemonId}')`);

    document.querySelector(".lds-ring").style.display = "none";
    document.querySelector(".main").style.display = "grid";
    document.querySelector(".searchBar").style.display = "grid";

}



async function createPokemon(num){

    //Creates the Divs and others for the pokemon
    if (num < 1000) {
        for (let i = num; i <= (num + 9); i++) {
            const newDiv = document.createElement("div");
            newDiv.classList.add("pokemon-div")
            document.querySelector(".main").appendChild(newDiv);
    
            const newName = document.createElement("p");
            newName.classList.add("pokeName");
            newName.textContent = "Name: " + await fetchUrl(i).then(val => val.name[0].toUpperCase() + val.name.substring(1));
            document.getElementsByClassName("pokemon-div")[(i - num)].appendChild(newName)
        
            const newImg = document.createElement("img");
            newImg.classList.add("pokeImg");
            newImg.src = await fetchUrl(i).then(val => val.sprites.front_default)
            document.getElementsByClassName("pokemon-div")[(i - num)].appendChild(newImg)
        
            const newID = document.createElement("p");
            newID.classList.add("pokeID");
            newID.textContent = "#" + await fetchUrl(i).then(val => val.id.toString().padStart(3,0));
            document.getElementsByClassName("pokemon-div")[(i - num)].appendChild(newID) 
            
            document.getElementsByClassName("pokemon-div")[(i - num)].setAttribute("onclick", `showCard(${i})`);

        }
    }else{
        for (let i = num; i <= (num + 7); i++) {
            const newDiv = document.createElement("div");
            newDiv.classList.add("pokemon-div")
            document.querySelector(".main").appendChild(newDiv);
    
            const newName = document.createElement("p");
            newName.classList.add("pokeName");
            newName.textContent = "Name: " + await fetchUrl(i).then(val => val.name[0].toUpperCase() + val.name.substring(1));
            document.getElementsByClassName("pokemon-div")[(i - num)].appendChild(newName)
        
            const newImg = document.createElement("img");
            newImg.classList.add("pokeImg");
            newImg.src = await fetchUrl(i).then(val => val.sprites.front_default)
            document.getElementsByClassName("pokemon-div")[(i - num)].appendChild(newImg)
        
            const newID = document.createElement("p");
            newID.classList.add("pokeID");
            newID.textContent = "#" + await fetchUrl(i).then(val => val.id.toString().padStart(3,0));
            document.getElementsByClassName("pokemon-div")[(i - num)].appendChild(newID)  

            document.getElementsByClassName("pokemon-div")[(i - num)].setAttribute("onclick", "showCard('event')")
        }
    }
    
    
    sleep(100);
}


function removePokemon(){
    var divPokemon = document.getElementById('main');
    var divPokemonChildren = divPokemon.children;

    for (let i = 0; i = divPokemonChildren.length; i++) {
        divPokemon.removeChild(divPokemon.lastChild);
        
    }
    
}



async function nextIndex(){
    if (contador == 1001) {
        return
    }
    
    if (document.querySelector(".main").children.length < 2) {
        removePokemon();
        createPokemon(1)
        contador = 1
    } else {
        removePokemon();
        createPokemon(contador + 10)
        contador = contador + 10;
    }

}


async function previousIndex(){
    if (contador == 1) {
        return
    }

    if (document.querySelector(".main").children.length < 2) {
        removePokemon();
        createPokemon(1)
        contador = 1
    } else {
        removePokemon();
        createPokemon(contador - 10)
        contador = contador - 10;
    }

    
    
}



function reload(){
    removePokemon();
    createPokemon(1)

}

async function optionSearch(event){
    input.value = event.target.value[0].toUpperCase() + event.target.value.substring(1);
    removePokemon();
    fetchSpecificPokemon(event.target.value);



}

async function showCard(event) {
    var typesCount = await fetchUrl(event).then(val => val.types.length)

    var card = document.querySelector(".card");
    var cardTitle = document.querySelector(".card-title-p");
    var cardPhoto = document.querySelector(".card-photo-img");

    var typeIcon1 = document.querySelector(".icon1");
    var typeIcon2 = document.querySelector(".icon2");
    var hp = document.querySelector(".hp");
    var atk = document.querySelector(".atk");
    var def = document.querySelector(".def");
    var specAtk = document.querySelector(".spec-atk");
    var specDef = document.querySelector(".spec-def");
    var spd = document.querySelector(".speed");
    var ability = document.querySelector(".ability");
    var hiddenAbility = document.querySelector(".hiddenAbility");


    card.classList.toggle("open")
    card.querySelector(".card-content").style.display = "grid";
    card.querySelector(".card-content2").style.display = "none";

    cardTitle.textContent = await fetchUrl(event).then(val => val.name[0].toUpperCase() + val.name.substring(1));
    cardPhoto.setAttribute("src", await fetchUrl(event).then(val => val.sprites.front_default))
    
    if (typesCount == 1) { 
        typeIcon1.src =  "img/types/" + await fetchUrl(event).then(val => val.types[0].type.name) + ".ico"
        typeIcon2.src = ""
    }else{
        typeIcon1.src =  "img/types/" + await fetchUrl(event).then(val => val.types[0].type.name) + ".ico" 
        typeIcon2.src = "img/types/" + await fetchUrl(event).then(val => val.types[1].type.name) + ".ico"
    }
    hp.textContent = "Health: " + await fetchUrl(event).then(val => val.stats[0].base_stat);
    atk.textContent = "Attack: " + await fetchUrl(event).then(val => val.stats[1].base_stat);
    def.textContent = "Defense: " + await fetchUrl(event).then(val => val.stats[2].base_stat);
    specAtk.textContent = "Special Attack: " + await fetchUrl(event).then(val => val.stats[3].base_stat);
    specDef.textContent = "Special Defense: " + await fetchUrl(event).then(val => val.stats[4].base_stat);
    spd.textContent = "Speed: " + await fetchUrl(event).then(val => val.stats[5].base_stat);
    ability.textContent = "Ability: " + await fetchUrl(event).then(val => val.abilities[0].ability.name[0].toUpperCase() + val.abilities[0].ability.name.substring(1));
    hiddenAbility.textContent = "Hidden Ability: " + await fetchUrl(event).then(val => val.abilities[1].ability.name[0].toUpperCase() + val.abilities[1].ability.name.substring(1));


    toggleBlurry()

    
    const newDiv = document.createElement("div");
    newDiv.classList.add("noclick")
    newDiv.style.minWidth = "100%";
    newDiv.style.minHeight = "100%";
    newDiv.style.position = "fixed";
    newDiv.style.zIndex = "9";
    newDiv.style.top= "0";
    newDiv.style.opacity = "0";
    document.querySelector("body").appendChild(newDiv);






}

function showCardTypes() {

    var card = document.querySelector(".card");
    card.classList.toggle("open")
    card.querySelector(".card-content").style.display = "none";
    card.querySelector(".card-content2").style.display = "grid";

    toggleBlurry()

    const newDiv = document.createElement("div");
    newDiv.classList.add("noclick")
    newDiv.style.minWidth = "100%";
    newDiv.style.minHeight = "100%";
    newDiv.style.position = "fixed";
    newDiv.style.zIndex = "9";
    newDiv.style.top= "0";
    newDiv.style.opacity = "0";
    document.querySelector("body").appendChild(newDiv);






}

function toggleBlurry() {
    document.querySelector(".navbg").style.filter = "blur(5px)"
    document.querySelector(".searchBar").style.filter = "blur(5px)"
    document.querySelector(".main").style.filter = "blur(5px)"
    document.querySelector(".index").style.filter = "blur(5px)"
    document.querySelector(".footer").style.filter = "blur(5px)"
    document.querySelector(".padding").style.filter = "blur(5px)"
}

function hideCard() {
    document.querySelector(".card").classList.toggle("open");
    document.querySelector(".navbg").style.filter = "blur(0px)"
    document.querySelector(".searchBar").style.filter = "blur(0px)"
    document.querySelector(".main").style.filter = "blur(0px)"
    document.querySelector(".index").style.filter = "blur(0px)"
    document.querySelector(".footer").style.filter = "blur(0px)"
    document.querySelector(".padding").style.filter = "blur(0px)"

    var elem = document.querySelector(".noclick"); 
    elem.parentNode.removeChild(elem);
}



createPokemon(1);

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

const input = document.querySelector('#searchInput');
const datalist = document.querySelector('#options');
const body = document.querySelector('body');
const option = datalist.querySelector("option");
var optionExist;
var child = datalist.lastElementChild; 


let pokemonNames = [];
    for (let i = 1; i <= 1008; i++) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(res => res.json())
            .then(data => pokemonNames.push(data.name))
        
    }



input.addEventListener("input", e => {
    const value = e.target.value
    const valueLenght = e.target.value.length
    

    let hasInput = pokemonNames.filter(element => element.slice(0, valueLenght) === value.slice(0, valueLenght));

        child = datalist.lastElementChild;
        while (child) {
            datalist.removeChild(child);
            child = datalist.lastElementChild;
    }

    sleep(20)

    hasInput.forEach(element => {
            const temp = document.getElementsByTagName("template")[0].content.cloneNode(true);
            const optionTemplate = temp.querySelector("option")
            optionTemplate.value = element;
            optionTemplate.textContent = element[0].toUpperCase() + element.substring(1);
            optionTemplate.removeAttribute("id")
    
            datalist.append(temp);
    });


        
})






body.addEventListener("click", e => {
    if (e.target.id === "searchInput" || e.target.id === "options" || e.target.id === "option") {
        datalist.style.display = "block";
        document.querySelector(".main").style.zIndex = -1;
    }else{
        datalist.style.display = "none";
        document.querySelector(".main").style.zIndex = 0;
    }
    
})


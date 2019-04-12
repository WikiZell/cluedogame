document.addEventListener("DOMContentLoaded", function(event) {
    
  
// Characters
var Characters = {

    mrGreen: {
        first_name: "Jacob",
        last_name: "Green",
        color: "green",
        description: "He has a lot of connections",
        age: "45",
        image: "https://pbs.twimg.com/profile_images/506787499331428352/65jTv2uC.jpeg",
        occupation: "Entrepreneur"
    },

    drOrchid: {
        first_name: "Doctor",
        last_name: "Orchid",
        color: "white",
        description: "PhD in plant toxicology. Adopted daughter of Mr. Boddy",
        age: "26",
        image: "http://www.radiotimes.com/uploads/images/Original/111967.jpg",
        ocupation: "Scientist"
    },
    profPlum: {
        first_name: "Victor",
        last_name: "Plum",
        color: "purple",
        description: "Billionare video game designer",
        age: "22",
        image: "https://metrouk2.files.wordpress.com/2016/07/professor-plum.jpg",
        occupation: "Designer"
    },
    missScarlet: {
        first_name: "Kasandra",
        last_name: "Scarlet",
        color: "red",
        description: "She is an A-list movie star with a dark past",
        age: "31",
        image: "https://metrouk2.files.wordpress.com/2016/07/miss-scarlett.jpg",
        occupation: "Actor"
    },
    mrsPeacock: {
        first_name: "Eleanor",
        last_name: "Peacock",
        color: "blue",
        description: "She is from a wealthy family and uses her status and money to earn popularity",
        age: "36",
        image: "https://metrouk2.files.wordpress.com/2016/07/mrs-peacock.jpg",
        occupation: "Socialité"
    },
    mrMustard: {
        first_name: "Jack",
        last_name: "Mustard",
        color: "yellow",
        description: "He is a former football player who tries to get by on his former glory",
        age: "62",
        image: "https://metrouk2.files.wordpress.com/2016/07/colonel-mustard.jpg",
        occupation: "Retired Football player"
    }


}


// Weapons
var Weapons = [
    { name: "rope", weight: 10 },
    { name: "knife", weight: 8 },
    { name: "candlestick", weight: 2 },
    { name: "dumbbell", weight: 30 },
    { name: "poison", weight: 2 },
    { name: "axe", weight: 15 },
    { name: "bat", weight: 13 },
    { name: "trophy", weight: 25 },
    { name: "pistol", weight: 20 }   
]

// Rooms
var Rooms = [
    { name: "Dinning Room" },
    { name: "Conservatory" },
    { name: "Kitchen" },
    { name: "Study" },
    { name: "Library" },
    { name: "Billiard Room" },
    { name: "Lounge" },
    { name: "Ballroom" },
    { name: "Hall" },
    { name: "Spa" },
    { name: "Living Room" },
    { name: "Observatory" },
    { name: "Theater" },
    { name: "Guest House" },
    { name: "Patio" }
]

// Characters Collection
var charactersArray = Characters;

// Rooms' Collection
var roomsArray = Rooms;

// Weapons Collection
var weaponsArray = Weapons;


//My FUnctions

//ON CLICK
document.getElementById("btn-reveal").addEventListener("click", function(){
    //
    
    if(this.getAttribute("function") === "REVEAL"){
        clueGame.playClue("SCREEN");
        this.setAttribute("function", "RESTART");
        this.value = "RESTART"
    } else if (this.getAttribute("value") === "RESTART"){
        location.reload();
    }
    });

//Function to generate Li element for character
function createLi(char,selector){
    //console.log(char)
    
    var li, item


    Object.keys(char).forEach(key => {
        
        
        let value = char[key];
        //use key and value here
        if(key !== "image"){
            
            switch (key) {
                case "first_name":
                    li = document.createElement("LI");
                    //li = li.innerHTML = "Name: " + value;
                    item = document.createTextNode("Name: " + value);                    
                    li.appendChild(item);
                    document.getElementById(selector).appendChild(li);              
                    break;

                case "last_name":
                var li = document.createElement("LI");
                var item = document.createTextNode("Surname: " + value);
                li.appendChild(item);

                document.getElementById(selector).appendChild(li); 
                    break;

                default:
                var li = document.createElement("LI");
                var item = document.createTextNode(key + ": " + value);
                li.appendChild(item);

                document.getElementById(selector).appendChild(li);      
                    break;
            }

        }

      }); //end for loop

}   //end function

function insertHTML(data,selector){
    var el = document.querySelector(selector);
    var text = document.createTextNode(data);
    
    el.appendChild(text);
}

function changeImg(className,imgUrl){

    var el = document.querySelector("." + className);
    el.setAttribute('src', imgUrl)
    el.setAttribute('width', '234px')
    el.setAttribute('height', '350px')
}



var clueGame = {
    characters: charactersArray,
    rooms: roomsArray,
    weapons: weaponsArray,
    misteryEnvelope: [],

    randomSelector: function(deck) {
        //function to pick 1 card from each deck the clue
        //pick the killer from characters
        if(Array.isArray(deck)){
            return parseInt(Math.floor(Math.random() * parseInt(deck.length )));
        } else if (typeof deck === 'object' && deck !== null){
            return parseInt(Math.floor(Math.random() * parseInt(Object.keys(deck).length) ));
        } else {
            throw new Error("Deck is not a valid. Check your code!")
        }    
    },
    createMistery: function() {
        //function to create the envelope
        var killer = this.characters[Object.keys(this.characters)[this.randomSelector(this.characters)]];
        do {
            //murder cant be the killer
            var murder = this.characters[Object.keys(this.characters)[this.randomSelector(this.characters)]];
        }
        while (murder.first_name === killer.first_name);

        var KillLocation = this.rooms[this.randomSelector(this.rooms)];
        var killWeapon = this.weapons[this.randomSelector(this.weapons)];
        this.misteryEnvelope.push(killer, murder, KillLocation, killWeapon); //pushing everyting in array        
    },
    reveal: function (where) {
        //function to reveal the clue

        if (where) {
            var clue = this.misteryEnvelope;
            //clue[0] --> Killer (OBJECT)
            //clue[1] --> Murder (OBJECT)
            //clue[3].name --> weapon (STRING)
            //clue[2].name --> place (STRING)

            //alert("HERE WILL BE SCREEN OUTPUT CODE")
            //SCREEN CODE GOES HERE
            
            //CREATE KILLER LI
            createLi(clue[0],"li-killer");
            
            changeImg("img-killer",clue[0].image);
            
            
            //document.getElementById("li-killer").appendChild(liKiller);
            //CREATE MURDER LI
            createLi(clue[1],"li-murder");

            changeImg("img-murder",clue[1].image);
            
            
            //document.getElementById("li-murder").appendChild(liMurder);
            var clueString = clue[0].first_name + " " + clue[0].last_name + " killed " + clue[1].first_name + " using the " + clue[3].name + " in the " + clue[2].name + " !!!!"
            insertHTML(clueString,".story-text");


        } else {
            var clue = this.misteryEnvelope;
            var clueString = clue[0].first_name + " " + clue[0].last_name + " killed " + clue[1].first_name + " using the " + clue[3].name + " in the " + clue[2].name + " !!!!"
            console.log(clueString);
        }
    },
    playClue: function (where) {

        if (where === "SCREEN") {
            this.createMistery();
            this.reveal("SCREEN")
        } else if (where === "CONSOLE") {
            this.createMistery();
            this.reveal()
        } else {
            throw new Error("ARGUMENT MUST BE: SCREEN or CONSOLE")
        }

    }

}


});

const data = []

let playerName ;
let post ;
let playerNumber;
let valid = true;

// div generator
const field = document.querySelector("section");
 for (let i = 0 ; i < 82 ; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("grid-square") ;
    field.appendChild(newDiv);
 }

 // opening and closing the modal 
 const myModal = document.querySelector("#Modal-Ajout-overlay")
 const openBtn = document.querySelector("#openBtn") 
 const closeBtn = document.querySelector("#closeBtn")
openBtn.addEventListener('click', () => myModal.classList.remove("hidden")); 
closeBtn.addEventListener('click', () => myModal.classList.add("hidden"));

// input validation
const form = document.querySelector("#ajouter-joueur");
form.addEventListener("submit",function (event) {
   event.preventDefault();
const PlayerName = document.querySelector("input[type='text']");
const postIsChecked = document.querySelector("input[type='radio']:checked");
const PlayerNumber= document.querySelector('input[type="number"]');
const NameError = document.querySelector("#name-err-msg");
const NumberError = document.querySelector("#number-err-msg");

if (postIsChecked) {
   post = postIsChecked.value;
}
const NameRgex = /^[a-zA-Z]{45,}$/;
const NumRgex = /^(?:[1-9][0-9]?)$/;

if (NameRgex.test(PlayerName.value.trim())) {
   playerName = PlayerName.value ;
}
else {
   NameError.textContent="le nom est invalide";
   valid = false;
} 
if (NumRgex.test(PlayerNumber.value.trim())) {
  playerNumber = PlayerNumber.value;
}
else {
   NumberError.textContent="le numero est invalide"
   valid = false
}
})


// add player
if (valid) {
   data.push({name : playerName , Post : post , numero : playerNumber});
}

// assign & show players 
for (let player of data ) {
   const aside = document.querySelector('aside') 
   const playerCard = createElement("div")
   playerCard.classList.add("player-card","rounded-lg","flex",
      "justify-between", "m-[10px]" ,"items-center", "border-2")
   const numero_cercle = createElement("div");
}
const options = [
   "sur le banc",
   "Gardien",
   "defenseur gauche",
   "defenseur central 1",
   "defenseur central 2",

]

// modify player

// delete player
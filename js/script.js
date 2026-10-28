let data = JSON.parse(localStorage.getItem("playersData")) || [];

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

// show_players 
const asideContainer = document.querySelector("aside");
const playerCounter = document.querySelector("#player-count");

function showPlayers() {
   asideContainer.querySelectorAll(".player-card").forEach(card => card.remove());

   for (let i = 0; i < data.length; i++) {
   const playerCard = document.createElement("div")
   playerCard.dataset.index = i; 
   playerCard.classList.add("player-card","rounded-lg","flex",
      "justify-between", "m-[10px]" ,"items-center", "border-2")
   const info_div = document.createElement("div")
   const P_name = document.createElement("p");
   P_name.classList.add("text-white");
   const P_post = document.createElement("p");
   P_post.classList.add("text-white")
   P_name.textContent=`name : ${data[i].name}`;
   P_post.textContent=`Post : ${data[i].Post}`
   const P_ID = document.createElement("span");
   P_ID.classList.add("text-white")
   P_ID.textContent=`ID : #${playerCard.dataset.index}`;

   const numero_cercle = document.createElement("div");
   numero_cercle.classList.add("flex" ,"items-center" ,"justify-center","w-10","h-10",
      "border-2","text-white" ,"rounded-full","font-semibold")
   numero_cercle.textContent=data[i].numero;

   const edit_div = document.createElement("div")
   edit_div.classList.add("flex", "flex-col",);

   const mod_btn = document.createElement("button");
   mod_btn.textContent="modifier";
   mod_btn.classList.add("mod-btn", "text-yellow-700");
   const sup_btn = document.createElement("button");
   sup_btn.classList.add("text-red-700")
   sup_btn.textContent="supprimer"
   sup_btn.classList.add("sup-btn", "text-red-400");

const select = document.createElement("select");
select.classList.add("position-select", "bg-slate-800", "text-white",
   "text-sm", "rounded", "border", "border-gray-500", "mt-1");

const options = {
   gardien:   ["sur le banc", "GB"],
   defenseur: ["sur le banc", "DG", "DC1", "DC2", "DD"],
   milieu:    ["sur le banc", "MG", "MC1", "MC2", "MD"],
   attaquant: ["sur le banc", "BU1", "BU2"]
};

options[data[i].Post].forEach(opt => {
   const option = document.createElement("option");
   option.value = opt;
   option.textContent = opt;
   select.appendChild(option);
});

select.value = data[i].position;
   info_div.appendChild
   info_div.appendChild(P_ID)
   info_div.appendChild(P_name);
   info_div.appendChild(P_post);
   info_div.appendChild(select)
   edit_div.appendChild(mod_btn);
   edit_div.appendChild(sup_btn);
   playerCard.appendChild(numero_cercle);
   playerCard.appendChild(info_div);
   playerCard.appendChild(edit_div);
   asideContainer.appendChild(playerCard)
}
   playerCounter.textContent = data.length;
}
// show Players at startup
showPlayers();
// modify EventListener :  
asideContainer.addEventListener("click", function (event) {
   if (!event.target.classList.contains("mod-btn")) return;

   const card = event.target.closest(".player-card");
   modIndex = Number(card.dataset.index)
   const player = data[modIndex];
   document.querySelector("#name").value = player.name;
   document.querySelector("#numero").value = player.numero;
   document.querySelector(`input[name='poste'][value='${player.Post}']`).checked = true;
   myModal.classList.remove("hidden");

})
//adding player & input validation & modify :
let modIndex = null;
const form = document.querySelector("#ajouter-joueur");

form.addEventListener("submit",function (event) {
   event.preventDefault();
const PlayerName = document.querySelector("input[type='text']");
const postIsChecked = document.querySelector("input[name='poste']:checked");
const PlayerNumber= document.querySelector('#numero');
const NameError = document.querySelector("#name-err-msg");
const NumberError = document.querySelector("#number-err-msg");

NameError.textContent = "";
NumberError.textContent = "";

let valid = true;

if (postIsChecked) {
   post = postIsChecked.value;
}
const NameRgex = /^[A-Za-zÀ-ÿ]+(?:[\s'-][A-Za-zÀ-ÿ]+)*$/;
const NumRgex = /^[1-9][0-9]?$/;
if (!NameRgex.test(PlayerName.value.trim())) {
   NameError.textContent = "le nom est invalide";
   valid = false;
}
if (!NumRgex.test(PlayerNumber.value.trim())) {
   NumberError.textContent = "le numero est invalide";
   valid = false;
}
if (!valid) return;
if (modIndex === null) {
data.push({
   name: PlayerName.value.trim(),
   Post: postIsChecked.value,
   numero: PlayerNumber.value.trim(),
   position: "sur le banc"
}); 
showSuccess("Joueur ajouté avec succès")
}
else {
const player = data[modIndex];
  if (player.Post !== postIsChecked.value) {
      if (player.position !== "sur le banc") {
         const PositionInField = document.querySelector("." + player.position.toLowerCase());
         PositionInField.querySelector(".text-sm").textContent = "libre";
      }
   player.position = "sur le banc"; 
   }
   player.name = PlayerName.value.trim();
   player.Post = postIsChecked.value;
   player.numero = PlayerNumber.value.trim();

   editIndex = null;
   showSuccess("Joueur modifié avec succès");
}
localStorage.setItem("playersData", JSON.stringify(data));
form.reset()
showPlayers()
})
closeBtn.addEventListener('click', () => {
   myModal.classList.add("hidden");
   editIndex = null;
   form.reset();
});

// restore position of players in grid at startup :
function restorePlayersPositionInField() {
 const AllPositionsInField = document.querySelectorAll(".border-dashed");
 for (let i of AllPositionsInField ){
   const target = i.querySelector(".text-sm")
   for (let j of data) {
      if (i.classList.contains(j.position.toLowerCase()))
      {
         target.textContent=j.name ;
      }
   }
} 
}
restorePlayersPositionInField()

const selection_err = document.createElement("p");
selection_err.classList.add("text-red-500","text-center");
asideContainer.appendChild(selection_err);

asideContainer.addEventListener("change", function (event) {

   if (!event.target.classList.contains("position-select")) return;
   const opt = event.target.value;
   if (opt != "sur le banc") {
   const card = event.target.closest(".player-card"); 
   const index = Number(card.dataset.index);
   const player = data[index].name ;
   const PositionInFieldClass = "."+opt.toLowerCase();
   const PositionInField = document.querySelector(PositionInFieldClass);
   const target_P = PositionInField.querySelector(".text-sm")
   const AllPositionsInField = document.querySelectorAll(".border-dashed") 
   for (let i of AllPositionsInField) {
      const target = i.querySelector(".text-sm");
      if (target.textContent.trim() === player) {
         target.textContent="libre"
      }
   }
   if (target_P.textContent === "libre") {
   data[index].position = opt;
   localStorage.setItem("playersData", JSON.stringify(data));
   target_P.textContent=player;
   } 
   else { 
      selection_err.textContent="cette position est deja occupee"
      setTimeout(() => selection_err.textContent = "", 3000);
   }
}
   else {
   const card = event.target.closest(".player-card");  
   const index = Number(card.dataset.index);
   const oldPosition = data[index].position;
   data[index].position = opt;
   localStorage.setItem("playersData", JSON.stringify(data));
   if (oldPosition !== "sur le banc") {
   const PositionInFieldClass = "."+oldPosition.toLowerCase();
   const PositionInField = document.querySelector(PositionInFieldClass);
   const target_P = PositionInField.querySelector(".text-sm")
      target_P.textContent="libre"; 
   }
   }
});

// supprimer :
asideContainer.addEventListener("click", function (event) {
   if (!event.target.classList.contains("sup-btn")) return;
   const card = event.target.closest(".player-card");
   const index = Number(card.dataset.index);
   const player = data[index];
   if (!confirm(`Voulez-vous vraiment supprimer ${player.name} ?`)) return;
   if (player.position !== "sur le banc") {
      const slot = document.querySelector("." + player.position.toLowerCase());
      slot.querySelector(".text-sm").textContent = "libre";
   }
   data.splice(index, 1);
   localStorage.setItem("playersData", JSON.stringify(data));
   showPlayers();
   showSuccess("Joueur supprimé");
});

const successMsg = document.querySelector("#success-msg");

function showSuccess(message) {
   successMsg.textContent = message;
   successMsg.classList.remove("hidden");
   setTimeout(() => successMsg.classList.add("hidden"), 3000);
}
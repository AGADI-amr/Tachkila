const data = []


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
   P_name.textContent=data[i].name;
   P_post.textContent=data[i].Post;

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
   sup_btn.classList.add("sup-btn", "text-red-500");

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

// input validation
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

data.push({
   name: PlayerName.value.trim(),
   Post: postIsChecked.value,
   numero: PlayerNumber.value.trim(),
   position: "sur le banc"
});
form.reset()
showPlayers()
})
const selection_menu = document.querySelector(".position-select")

asideContainer.addEventListener("change", function (event) {
   if (!event.target.classList.contains("position-select")) return;

   const opt = event.target.value;
   const card = event.target.closest(".player-card");  
   const index = Number(card.dataset.index);            

   data[index].position = opt;                       
   console.log(opt, data[index]);
   const PositionInFieldClass = opt.toLowerCase();
   console.log(PositionInFieldClass);
   const PositionInField = document.querySelector()
});
const field = document.querySelector("section");
 for (let i = 0 ; i < 82 ; i++) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("grid-square") ;
    field.appendChild(newDiv);
 }

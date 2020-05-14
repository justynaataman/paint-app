
//import tools from './tools.js';

button = document.querySelector("[title = Pallete]")

button.addEventListener("click", c => { 
    x=document.getElementById("whole");
    if(x.style.display === "none") {
        x.style.display = "block";

    }
    else x.style.display = "none"
}); 
//thats for colors button 

brush = document.querySelector("[title = Paintbrush]")
brush.classList.add("clicked");
brush.addEventListener("click", q => { 
    console.log("brush");
    
   
}); 

document.querySelectorAll("[data-t = tool]").forEach(
    item => {
            item.addEventListener("click", e=> {
            document.querySelector("[data-t = tool].clicked").classList.toggle("clicked"); //remove highlight if it is there
            item.classList.add("clicked");
            console.log(item.getAttribute("title"));
        });
    }
)
one = document.querySelector("[title = Size]")
one.classList.add("clicked");

document.querySelectorAll("[data-width]").forEach(
    item => {
            item.addEventListener("click", e=> {
            document.querySelector("[data-width].clicked").classList.toggle("clicked"); //remove highlight if it is there
            item.classList.add("clicked");
            console.log(item.getAttribute("title"));
        });
    }
)
black = document.querySelector("[title = black]")
black.classList.add("clicked");
document.querySelectorAll("[data-c]").forEach(
    item => {
            item.addEventListener("click", e=> {
            document.querySelector("[data-c].clicked").classList.toggle("clicked"); //remove highlight if it is there
            item.classList.add("clicked");
            console.log(item.getAttribute("title"));
        });
    }
)





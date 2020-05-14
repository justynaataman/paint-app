button = document.querySelector("[data-command=button]")

button.addEventListener("click", function(whole){ 
  
    x=document.getElementById("whole");
    if(x.style.display === "none") {
        x.style.display = "block";

    }
    else x.style.display = "none"
}); 


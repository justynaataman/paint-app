var button = document.getElementById("paa");

button.addEventListener("click", function(whole){ 
    console.log('dupa');
    x=document.getElementById("whole");
    if(x.style.display === "none") {
        x.style.display = "block";

    }
    else x.style.display = "none"
}); 

/*
function op(obj) {
    x=document.getElementById(obj);
    if(x.style.display === "none") {
        x.style.display = "block";

    }
    else x.style.display = "none"
}

*/
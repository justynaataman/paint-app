const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');



let drawing = 0;
let selected_color = 'black'; 
let brush_size = 4;
let active_tool = 'Brush'; 
clear_all = document.querySelector("[title = Clear]");
download= document.querySelector("[title = Download]");
Eraser = document.querySelector("[title = Eraser]");
let er = 0;

Eraser.addEventListener('click', function (e) {
   er = 1; 
});
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
/*
brush.addEventListener("click", q => { 
    console.log("brush");
    
   
});
*/
//TOOLS CLICKED
document.querySelectorAll("[data-t = tool]").forEach(
    item => {
            item.addEventListener("click", e=> {
            document.querySelector("[data-t = tool].clicked").classList.toggle("clicked"); //remove highlight if it is there
            item.classList.add("clicked");
            console.log(item.getAttribute("title"));

            let selected = item.getAttribute("title");
            console.log(selected)
            active_tool =  item.getAttribute("title");
    
        });
    }
)

//WIDTH CLICKED
one = document.querySelector("[title = Size]")
one.classList.add("clicked");

document.querySelectorAll("[data-width]").forEach(
    item => {
            item.addEventListener("click", e=> {
            document.querySelector("[data-width].clicked").classList.toggle("clicked"); //remove highlight if it is there
            item.classList.add("clicked");
            brush_size = item.getAttribute("data-width");
            console.log(brush_size);
           
        });
    }
)

//COLORS CLICKED
black = document.querySelector("[title = black]")
black.classList.add("clicked");
document.querySelectorAll("[data-c]").forEach(
    item => {
            item.addEventListener("click", e=> {
            document.querySelector("[data-c].clicked").classList.toggle("clicked"); //remove highlight if it is there
            item.classList.add("clicked");
            console.log(item.getAttribute("title"));
            selected_color = item.getAttribute("title");

        });
    }
)

canvas.addEventListener('mousedown', e => {
    x = e.offsetX;
    y = e.offsetY;
    drawing = 1;
    console.log(x); 
    console.log(y);

  });

canvas.addEventListener('mousemove', e => {
    if (drawing === 1) {
      draw(context, x, y, e.offsetX, e.offsetY);
      x = e.offsetX;
      y = e.offsetY;
    }
  });

  window.addEventListener('mouseup', e => {
    if (drawing === 1) {
      draw(context, x, y, e.offsetX, e.offsetY);
      x = 0;
      y = 0;
      drawing = 0;
    }
  });

function draw(context, x1, y1, x2, y2) {
    context.beginPath();
    let color2 = selected_color;
    if(active_tool === 'Eraser'){
        color2 = 'white';
    }
    context.strokeStyle = color2;
    console.log(selected_color);
    context.lineWidth = brush_size;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  }

clear_all.addEventListener("click", q => { 
        console.log("hihih");
        context.clearRect(0, 0, canvas.width, canvas.height);


   
});


download.addEventListener('click', e => {
    let image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    let link = document.createElement('a');
    link.download = "drawing.png";
    link.href = image;
    link.click();
});



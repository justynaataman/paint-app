const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');



let drawing = 0;
let selected_color = 'black'; 
let brush_size = 4;
let active_tool = 'Brush'; 
clear_all = document.querySelector("[title = Clear]");
download= document.querySelector("[title = Download]");
fill= document.querySelector("[title = Fill]");
undo= document.querySelector("[title = Undo]");
Eraser = document.querySelector("[title = Eraser]");
let er = 0;
let do_fill = 0;
let selected = 0;
let element = null;    
let cx = 0; 
let cy = 0; 


Eraser.addEventListener('click', function (e) {
   er = 1; 
});

fill.addEventListener('click', function (e) {
    do_fill = 1; 

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
          //  console.log(item.getAttribute("title"));

            selected = item.getAttribute("title");
           // console.log(selected)
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


/*
p1|n|p2
-- -- --
w|cur|e
-- -- --
p3|s|p4
*/
function Pixel(x, y) {
  this.x = x;
  this.y = y;
}


canvas.addEventListener('mousedown', e => {
    x = e.offsetX;
    y = e.offsetY;
    drawing = 1;


    if(do_fill == 1){
        
      context.fillStyle = rgba;
      context.fillRect( 1, 1, 1, 1 );

      var curr_pixel = new Pixel(x,y);
      var next_pixel = new Pixel(x,y);
      let p1 = 0; 
      let p2 = 0; 
      let p3 = 0; 
      let p4 = 0; 
      let w = 0; 
      let n = 0; 
      let e = 0;
      let s = 0; 
      let filled = 0; 
      
      context.fillStyle = rgba;
      context.fillRect( x+1, y, 1, 1 );
      let pixel_click = context.getImageData(curr_pixel.x, curr_pixel.y, 1, 1);
      let data_click = pixel_click.data;
      
      while(filled == 0){
        let next_pixel = context.getImageData(x+1, y, 1, 1);
        let next_data = next_pixel.data;
        console.log(next_data[0]); 
          console.log(next_data[1]);
        
        if(next_data[0] != data_click[0] || next_data[1] != data_click[1] || next_data[2] != data_click[2] || (next_data[3] / 255) != (data_click[3] / 255)){
          console.log("tutaj"); 
          console.log(next_data[0]); 
          console.log(next_data[1]);
          context.fillStyle = rgba;
          ee = x; 
          context.fillRect( ee, y, 1, 1 );
          ee +=1;

          filled = 1;

        }
        else{
          filled = 1;
        }


      }

    }



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
        console.log("clear");
        context.clearRect(0, 0, canvas.width, canvas.height);

});




//for working image downloading
download.addEventListener('click', e => {

    //white rectangle for not transparent background
    context.globalCompositeOperation = 'destination-over';

    context.fillStyle = 'white';

    context.fillRect(0, 0, canvas.width, canvas.height);

    let image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    let link = document.createElement('a');
    link.download = "drawing.png";
    link.href = image;
    link.click();
    //for drawing on existing thinks again bc destination over draws under them
    context.globalCompositeOperation = 'source-over';
});

//pick color of current pixel - for fill func

let rgba = 0;
let array_rgba = [];
function pick(event) {
    array_rgba = [];
    let x = event.layerX;
    let y = event.layerY;
    let pixel = context.getImageData(x, y, 1, 1);
    let data = pixel.data;
    let rgba = 'rgba(' + data[0] + ', ' + data[1] +
               ', ' + data[2] + ', ' + (data[3] / 255) + ')';
    array_rgba.push(data[0]); 
    array_rgba.push(data[1]);
    array_rgba.push(data[2]);
    array_rgba.push((data[3] / 255));
    //console.log(rgba);
    //console.log(array_rgba);
  }

  canvas.addEventListener('mousedown', pick);




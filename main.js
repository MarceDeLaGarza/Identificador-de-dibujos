color="";
weight=0;

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  background("white");
  canvas.mouseReleased(classifyCanvas);
  synth = window.speechSynthesis;
}

function preload() {


  classifier = ml5.imageClassifier('DoodleNet');
}



function clearCanvas() {

  background("white");
}

function draw() {

  // Establece el grosor del stroke (trazo) a 13.
  strokeWeight(13);
  // Establece el color del stroke (trazo) a negro.
  color=document.getElementById("AddColor").value;
    if(color!="")
    {
      stroke(color); //inside the stroke() function pass the variable color.
    }
    else{
      stroke(0);
    }
    weight=document.getElementById("weight").value;
    if(weight!="") //check if the weight is not equal to empty
    {
      strokeWeight(weight); // set the weight value to the strokeWeight()
    }
    else{
      strokeWeight(0); // set the default value of the strokeWeight()
    }
  // Si el mouse está presionado, dibuja una línea entre la posición previa y la actual del mouse.
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function classifyCanvas() {
  classifier.classify(canvas, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results);
  document.getElementById('label').innerHTML = 'Etiqueta: ' + results[0].label;

  document.getElementById('confidence').innerHTML = 'Confianza: ' + Math.round(results[0].confidence * 100) + '%';

  utterThis = new SpeechSynthesisUtterance(results[0].label);
  synth.speak(utterThis);
}



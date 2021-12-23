prediction_1=""; 
prediction_2="";
Webcam.set({
width:300,
height:300,
image_format:'png',
png_quality:95
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function Snapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML="<img id='js_img' src='"+data_uri+"'/>";
});
}
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/OlDZetsak/model.json',modelloaded)
function modelloaded(){
    console.log("modelloaded");
}
function speak(){
    var synth=window.speechSynthesis;
    speak_1="The first Prediction is "+prediction_1;
    speak_2="The second Prediction is "+prediction_2;
    var utterThis=new SpeechSynthesisUtterance( speak_1+ speak_2);
    synth.speak(utterThis);
}
function capturedImage(){
img_1=document.getElementById("js_img");
classifier.classify(img_1,gotResult);
}
function gotResult(error,result){
if(error){
    console.error(error);
}else{
  console.log(result);
  document.getElementById("prediction1").innerHTML=result[0].label;
  document.getElementById("prediction2").innerHTML=result[1].label;
  prediction_1=result[0].label;
  prediction_2=result[1].label;
  speak();
  if(prediction_1=="happy"){
      document.getElementById("emoji1").innerHTML="&#128522;";
  }
  if(prediction_1=="Sad"){
    document.getElementById("emoji1").innerHTML="&#128532;";
}
if(prediction_1=="Angry"){
    document.getElementById("emoji1").innerHTML="&#128548;";
}
if(prediction_2=="happy"){
    document.getElementById("emoji2").innerHTML="&#128522;";
    
}
if(prediction_2=="Sad"){
    document.getElementById("emoji2").innerHTML="&#128532;";
}
if(prediction_2=="Angry"){
    document.getElementById("emoji2").innerHTML="&#128548;";
}
}
}
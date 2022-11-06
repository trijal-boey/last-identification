img=""
status=""
objects=[]


function preload(){
    img=loadImage("nedroom.jpg");
}

function setup(){
    canvas= createCanvas(400,500);
    canvas.position(550,150);
    video=createCapture(VIDEO);
    video.size(400,500);
    video.hide()

}

function modelLoaded(){
    console.log("cocossd model is loaded");
    status=true
}

function gotResult(error,result){
    if(error){
        console.log(error)
    }
    console.log(result)
    objects=result
}

function draw(){
    image(video,0,0,400,500);
    /*fill("#ae4a60")
    text("dog",45,75);
    noFill();
    stroke("#ae4a60");
    rect(30,60,450,350);
    fill("#ae4a60")
    text("cat",320,120)
    noFill();
    stroke("#ae4a60");
    rect(300,90,270,320);*/
    if(status!=""){
        r=random(200)
        g=random(205)
        b=random(215)
        objDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="now enjoy playing with  it"
            fill(r,g,b)
            percent=floor(objects[i].confidence*100)
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y)
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function start(){
    objDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status is detecting";

}
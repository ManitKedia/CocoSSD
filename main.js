video = "";
status = "";
objects = [];

function preload()
{
    video = createVideo('video.mp4');
    video.hide();
}

function setup()
{
    canvas = createCanvas(450, 380);
    canvas.center();
}

function draw()
{
    image(video, 0, 0, 500, 450);
    if(status != "") {
        objectDetector.detect(video, gotResults);
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error, results)
{
    if(error) {
        console.error(error);
    }
    console.log(results);
    objects = results;
    for(i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        document.getElementById("number_of_objects").innerHTML = "No. of objects detected are : " + objects.length;

        fill("#FF0000");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[1].x + 15, objects[1].y + 15);
        noFill();
        stroke("#FF0000");
        rect(objects[1].x, objects[1].y, objects[1].width, objects[1].height);
    }
}
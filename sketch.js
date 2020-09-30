//Create variables here
var heading;
var Name;
var write;
var nameLabel;
var submit;

var database;
var userCountRef;
var userCount;

var bg3;
function preload() {
  //load images here
  bg3 = loadImage("bg4.jpg");
}

function setup() {
  database = firebase.database();

  createCanvas(800, 600);

  heading = createElement("h1");
  heading.html("Welcome to Message Sender App!");
  heading.position(480, 60);
  heading.style("font-size", "40px");
  heading.style("text-align", "center");
  heading.style("text-font", "Helvetica");
  heading.style("textColor", "black");

  Name = createInput("Name Pls !");
  Name.position(570, 200);
  Name.size(350, 30);
  Name.style("text-align", "center");
  Name.style("font-size", "25px");
  Name.style("border-radius", "10px");
  Name.style("border-color", "black");
  Name.style("background-color", "transparent");
  Name.style("color", "yellow");

  write = createElement("textarea");
  write.size(400, 180);
  write.position(550, 300);
  write.style("font-size", "20px");
  write.style("border-radius", "10px");
  write.style("text-font", "Georgia");
  write.style("border-color", "black");
  write.style("background-color", "black");
  write.style("color", "green");
  write.html("Write Your Messages here");

  submit = createButton("Submit");
  submit.size(145, 50);
  submit.position(width / 2 + 270, 550);
  submit.style("text-align", "center");
  submit.style("background-color", "black");
  submit.style("border-radius", "10px");
  submit.style("color", "green");
  submit.style("font-size", "27px");

  // Started the database work
  userCountRef = database.ref("userCount");
  userCountRef.on("value", (data) => {
    userCount = data.val();
    console.log(userCount);
  });

  submit.mousePressed(() => {
    Update();
    userCount++;
    database.ref("/").update({
      userCount: userCount,
    });
  });
}

function draw() {
  background(bg3);
  drawSprites();
  //add styles here
}

function Update() {
  var PlayerIndex = "Users/userData";
  var PlayerIndexRef = database.ref(PlayerIndex);
  var data = {
    name: Name.value(),
    message: write.value(),
  };

  PlayerIndexRef.push(data);
}

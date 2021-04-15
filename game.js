var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameOver = false;

function gameRestart() {
  if (gameOver) {
    gameOver = false;
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    anwserIndex = 0;

    nextSequence();
  }
}

function gameEnd() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Wrong! Press a key to restart!");
  playSound("wrong");
  gameOver = true;
}

var anwserIndex = 0;
function checkAnwser() {
  console.log(gamePattern[anwserIndex] + userClickedPattern[anwserIndex]);
  if (gamePattern[anwserIndex] === userClickedPattern[anwserIndex]) {
    // Correct
    // Check if completed the sequence
    if (gamePattern.length === (anwserIndex + 1)) {
      // Completed sequence
      console.log("seq correct");
      anwserIndex = 0;
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    } else {
      anwserIndex++;
      console.log("correct");
    }
  } else {
    // Incorrect
    console.log("incorrect");
    gameEnd();
  }

}

$(document).keydown(function(event)  {
  if (level === 0) {
    nextSequence();
  } else if (gameOver) {
    gameRestart();
  }
});

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

$(".btn").click(function (){
  if (level != 0 && !gameOver) {
    var userChosenColour = $(this).attr('id');
    console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnwser();
  }
});

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

// Start the game:
$(document).on("keydown", function () {
    if (!gameStarted) {
        gameStarted = true;
        nextSequence();
    }
});

// Add click event listener to buttons:
$(".btn").click(function () {
    var userChosenColour = this.id;
    playSound(userChosenColour);
    animateButton(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

// Check answer:
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong"); 
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

// Create the level pattern:
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").html("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Animate buttons:
function animateButton(colour) {
    $("#" + colour).addClass("pressed");
    setTimeout(function () { $("#" + colour).removeClass("pressed"); }, 100);
}

// Add sound to buttons:
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Restart the game:
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
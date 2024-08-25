class SimonGame {
    constructor() {
        this.buttonColours = ["red", "blue", "green", "yellow"];
        this.gamePattern = [];
        this.userClickedPattern = [];
        this.gameStarted = false;
        this.level = 0;

        this.init();
    }

    // Initialize event listeners
    init() {
        $(document).on("keydown", () => {
            if (!this.gameStarted) {
                this.gameStarted = true;
                this.nextSequence();
            }
        });

        $(".btn").click((event) => {
            let userChosenColour = event.target.id;
            this.playSound(userChosenColour);
            this.animateButton(userChosenColour);
            this.userClickedPattern.push(userChosenColour);
            this.checkAnswer(this.userClickedPattern.length - 1);
        });
    }

    // Check if user's answer is correct
    checkAnswer(currentLevel) {
        if (this.gamePattern[currentLevel] === this.userClickedPattern[currentLevel]) {
            if (this.userClickedPattern.length === this.gamePattern.length) {
                setTimeout(() => {
                    this.nextSequence();
                }, 1000);
            }
        } else {
            this.playSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 200);
            this.startOver();
        }
    }

    // Generate the next sequence
    nextSequence() {
        this.userClickedPattern = [];
        this.level++;
        $("h1").html("Level " + this.level);
        let randomNumber = Math.floor(Math.random() * 4);
        let randomChosenColour = this.buttonColours[randomNumber];
        this.gamePattern.push(randomChosenColour);
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        this.playSound(randomChosenColour);
    }

    // Animate the button
    animateButton(colour) {
        $("#" + colour).addClass("pressed");
        setTimeout(() => {
            $("#" + colour).removeClass("pressed");
        }, 100);
    }

    // Play sound corresponding to the button
    playSound(name) {
        let audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }

    // Restart the game
    startOver() {
        this.level = 0;
        this.gamePattern = [];
        this.gameStarted = false;
    }
}

// Instantiate and start the game
let simonGame = new SimonGame();

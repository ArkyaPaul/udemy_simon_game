var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var started=false;
var level=0;

$(document).on('keypress', function(){
    if(!started){
        $("#level-title").text('Level '+level);
        nextSequence();
        started=true;
    }
});

$('.btn').on('click',function () {
    var userChosenColour=$(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));
})

function nextSequence(){
    level++;
    $("#level-title").text('Level '+level);
    randomNumber=Math.floor(Math.random()*4);   
    randomChosenColour=buttonColours[randomNumber];   
    gamePattern.push(randomChosenColour);
    $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);     
    playSound(randomChosenColour);
    //console.log('game started');
}

function playSound(name){
    new Audio(`./sounds/${name}.mp3`).play();
}

function animatePress(currentColour){
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(() => {
        $(`#${currentColour}`).removeClass("pressed");
    }, 100);
}

function startOver() {
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
    new Audio(`./sounds/wrong.mp3`).play();
    $('body').addClass("game-over");
    $("#level-title").text('Game Over, Press Any Key To Restart');
    setTimeout(() => {
        $('body').removeClass("game-over");
    }, 2000);
}

function checkAnswer(currentLevel){
    if (gamePattern.length==userClickedPattern.length){
        var i=0;
        var attempt=true;
        while(i<currentLevel+1){
            if(gamePattern[i]==userClickedPattern[i]){
                i++;
                continue;
            }else{
                attempt=false;
                console.log('fail');      
                startOver();
                break;
            }
        }
        console.log('Game: '+gamePattern);
        console.log('User: '+userClickedPattern);
        if(attempt){
            console.log('success');
            userClickedPattern=[];
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
}

function showDialog(type) {
    /* check if another dialog is open */
    if (!isDialogOpen) {

        if (type == "start") {
            isDialogOpen = true;

            $("#pauseMenu .hidden").children().remove();
            $("#pauseMenu .hidden").append('<h3 class="char">Pick Character:</h3>');
            $("#pauseMenu .hidden").append('<button id="charChewie">Chewie</button>');
            $("#pauseMenu .hidden").append('<button id="charHan">Han</button>');
            $("#pauseMenu .hidden").append('<div id="charDiv"></div>');
            $("#pauseMenu .hidden").append('<h3 class="map">Pick Map:</h3>');
            $("#pauseMenu .hidden").append('<button id="mapTatooine">Tatooine</button>');
            $("#pauseMenu .hidden").append('<div id="mapDiv"></div>');
            $("#pauseMenu .hidden").append('<button id="start">Start</button>');
            $("#pauseMenu .hidden").append('<button id="controls">Controls</button>');
            $("#pauseMenu .hidden").append('<div class="introCheck"><label><input type="checkbox" id="introPlay"> Skip Intro</label></div>');

            $("html").css("cursor", "pointer");
            $("#pauseMenu .hidden").css("display", "block");

            $("#charChewie").click(function () {
                /* set character variable */
                character = "chewie";
                changeCharacter("chewie", true);
            });

            $("#charHan").click(function () {
                character = "han";
                changeCharacter("han", true);
            });

            $("#mapTatooine").click(function () {
                map = "tatooine";
                changeBackground("tatooine", true);
            });

            $("#controls").click(function () {
                controlDialog();
            });

            $("#pauseMenu").dialog({
                title: "Star Wars",
                resizable: false,
                minWidth: 600,
                minHeight: 750
            })

            $("#start").click(function () {

                /* Select Map/Char if none selected */
                if(character == null){
                    changeCharacter("chewie", true);
                }
                if(map == null){
                    changeBackground("tatooine", true);
                }

                /* Roll credits */
                if(!$("input:checked").length){
                    introCredits();

                    $('.crawl').on('animationend webkitAnimationEnd', function () {
                        initGame();
                        $("#introCrawl").remove();
                        $("#introCSS").remove();
                    });
                }else{
                    initGame();
                }
                
                $("#pauseMenu").dialog("destroy");
                $("#pauseMenu .hidden").children().remove();
                $("#pauseMenu .hidden").css("display", "none");
                isDialogOpen = false;
            });

        } else if (type == "pause") {
            isDialogOpen = true;
            $("#pauseMenu .hidden").children().remove();
            $("#pauseMenu").dialog();
            $("#pauseMenu .hidden").append('<button id="continue">Continue</button>');
            $("#pauseMenu .hidden").append('<button id="restart">Restart</button>');
            $("#pauseMenu .hidden").append('<button id="controlsPause">Controls</button>');
            $("#pauseMenu .hidden").append('<button id="startMenu">Start Menu</button>');

            $("#pauseMenu").dialog({
                title: "Game Paused",
                resizable: false,
                minWidth: 100,
                minHeight: 200
            })

            $("#continue").click(function () {
                pauseGame();
                isDialogOpen = false;
            });

            $("#controlsPause").click(function () {
                controlDialog();
            });

            $("#startMenu").click(function () {
                backToMenu();
            });

            $("#restart").click(function () {
                /* Reset boolean variables */
                isGamePaused = false;
                isKeyHandlerActive = true;

                initGame(false);

                $("#pauseMenu .hidden").children().remove();
                $("#pauseMenu").dialog("destroy");
                $("#pauseMenu .hidden").css("display", "none");
                isDialogOpen = false;
            });

            $("html").css("cursor", "pointer");
            $("#pauseMenu .hidden").css("display", "block");

        } else {
            isKeyHandlerActive = false;
            isDialogOpen = true;

            $("#pauseMenu .hidden").children().remove();

            $("#pauseMenu .hidden").append('<h3>Statistics:</h3>');
            $("#pauseMenu .hidden").append('<p>Score: ' + score + '</p>');
            $("#pauseMenu .hidden").append('<p>Enemies: ' + enemies + '</p>');
            $("#pauseMenu .hidden").append('<p>Highest Combo: ' + highestCombo + '</p>');
            $("#pauseMenu .hidden").append('<p>Waves Completed: ' + waves + '</p>');
            $("#pauseMenu .hidden").append('<button id="try">Try Again</button>');
            $("#pauseMenu .hidden").append('<button id="startMenuEnd">Start Menu</button>');
            $("html").css("cursor", "pointer");
            $("#pauseMenu .hidden").css("display", "block");

            $("#pauseMenu").dialog({
                title: "Game Over",
                resizable: false,
                minWidth: 400,
                minHeight: 400
            });

            $("#try").click(function () {
                /* Reset boolean variables */
                isGamePaused = false;
                isKeyHandlerActive = true;

                initGame(false);

                $("#pauseMenu").dialog("destroy");
                $("#pauseMenu .hidden").children().remove();
                $("#pauseMenu .hidden").css("display", "none");
                isDialogOpen = false;
            });

            $("#startMenuEnd").click(function () {
                backToMenu();
            });
        }
    }
}

function controlDialog(){
    $("#pauseMenu").after('<div id="controlDialog"><div class="hidden"></div></div>');
    $("#controlDialog .hidden").append('<p><span class="title">Move:</span> <span class="key">A</span> / <span class="key">D</span></p>');
    $("#controlDialog .hidden").append('<p><span class="title">Shoot:</span> <span class="key">Space</span></p>');
    $("#controlDialog .hidden").append('<p><span class="title">Jump:</span> <span class="key">E</span></p>');
    $("#controlDialog .hidden").append('<p><span class="title">Crouch:</span> <span class="key">Q</span></p>');
    $("#controlDialog .hidden").append('<p><span class="title">Reload:</span> <span class="key">R</span></p>');
    $("#controlDialog .hidden").append('<p><span class="title">Pause:</span> <span class="key">P</span></p>');
    $("#controlDialog .hidden").append('<p><span class="title">Aim:</span>Mouse / TrackPad</p>');
    $("#controlDialog .hidden").append('<button id="closeControls">Close</button>');

    $("html").css("cursor", "pointer");
    $("#controlDialog .hidden").css("display", "block");

    $("#controlDialog").dialog({
        title: "Controls",
        resizable: false,
        minWidth: 400,
        minHeight: 400
    });

    $("#closeControls").click(function () {
        $("#controlDialog .hidden").children().remove();
        $("#controlDialog").remove();
        $("#controlDialog").dialog("destroy");
    });
}

function showWave(message, isWave) {
    let animationType;

    if (isWave) {
        animationType = "announceMove";
    } else {
        animationType = "announceText";
    }

    /* Announce Wave */
    $(".announce").text(message);
    $(".announce").addClass(animationType);

    /* Remove once finished */
    $('.announce').on('animationend webkitAnimationEnd', function () {
        $(".announce").removeClass(animationType);
    });
}
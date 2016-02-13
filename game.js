$('img').each(function () {
    $(this).bind('dragstart', function (e) {
        if (window.event) event.preventDefault();
        e.cancelBubble = true; return false;
    });
});

ion.sound({
    sounds: [
        { name: "hey" }
    ],
    path: "",
    preload: true,
    multiplay: true,
    volume: 0.6
});

var arrSet = document.cookie.split('|');

if (arrSet.length > 1) { scoreB = parseInt(arrSet[0]); bestS.innerHTML = "Лучший счёт: " + scoreB; } else { scoreB = 0; }
window.sound = true;
if ((arrSet.length > 1) && (arrSet[1] === "false")) {
    sound = false;
    soundB.innerHTML = "♫ выключен";
    soundB.style.background = "#E67753";
}

var sndC = function () {
    if (sound) {
        sound = false;
        soundB.innerHTML = "♫ выключен";
        soundB.style.background = "#E67753";
        document.cookie = scoreB + "|false";
    } else {
        sound = true;
        soundB.innerHTML = "♫ включён";
        soundB.style.background = "#53E677";
        document.cookie = scoreB + "|true";
    }
}

var getrand = function (min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}

var scor = document.getElementById('scor');

var changeWord = function () {
    if (score === 15 && game == false) {
        //enCount = 3;
        tecmob = 2;
        prevMob = 2;
        game = true;
        image = "boss";
        roateMax;
    }
    if (vigovor && score < 15) { scor.innerHTML = "Выговор, БЛЕАТЬ!"; vigovor = false; } else scor.innerHTML = "";
    scor.innerHTML += " Счёт: " + score;
    if (score > 9 && score < 15) scor.innerHTML += " Сессия через: " + (15 - score);
    if (game) { scor.innerHTML += " Пересдачи: " + (4 - lifes) };
    if (lifes < 1) {
        startB.style.display = 'block';
        if (score > scoreB) {
            scor.innerHTML = "Ты не сдал экзамен. Ну извини.";
            scoreB = score;
            document.cookie = scoreB + "|" + sound;
            bestS.innerHTML = "Новый лучший счёт: " + scoreB;
        } else {
            bestS.innerHTML = "Лучший: " + scoreB;
        }
    }
}

var plate = document.getElementById('plate');
var mybody = document.getElementById('mybody');

var updateDifficultyTimer = function () {
    time = 750 - Math.sqrt(1000 * score);
    time = time - (time % 1);
}

var killmob = function (mid, pos) {
    if (mid === tecmob) {
        if (score < 15)
            allEn[mid - 1].style.background = "url('blin java.png')";
        else
            allEn[mid - 1].style.background = "url('boss java.png')";
        score++;
        updateDifficultyTimer();
        changeWord();
        tecmob = 0;
    }
}

var allEn = [mob1, mob2, mob3, mob4, mob5, mob6];
var hidemob = function (mid) {
    allEn[mid - 1].style.background = "url('non.gif')";
}

var snowmob = function (mid) {
    allEn[mid - 1].style.background = "url('" + image + ".png')";
    $("#mob" + mid).rotate({ animateTo: getrand(0, roateMax) });
}

var snowhide = function () {
    if (tecmob != 0 && score > 0) {
        score--;
        updateDifficultyTimer();
        if (game) {
            lifes--; if (sound) { ion.sound.play("hey"); } if (score == 14) {game = false; lifes = 4; image = "blin";}
        } else {
            vigovor = true;
        }
        changeWord();
    }
    for (var i = 6; i >= 1; i--) {
        hidemob(i);
    }
    if (game) {
        switch (getrand(0, 1)) {
            case 0: if (prevMob === 1) { prevMob++ } else { prevMob-- }
                break
            case 1: if (prevMob === 6) { prevMob-- } else { prevMob++ }
                break
        }
        tecmob = prevMob;
    } else {
        tecmob = getrand(1, enCount);
    }
    snowmob(tecmob);
    if (lifes != 0) {
        window.timeC = setTimeout(snowhide, time);
    }
}

var setRoateAngleForDevice = function (obj, mid) {
    if (device.mobile()) {
        window.roateMax = 90;
        obj.addEventListener('touchstart', function (event) {
            killmob(mid);
        }, false);
    } else {
        window.roateMax = 180;
        obj.addEventListener('click', function (event) {
            killmob(mid);
        }, false);
    }
}

var startGame = function () {
    for (var i = allEn.length - 1; i >= 0; i--) {
        allEn[i].src = "non.gif";
    };
    if (typeof timeC != 'undefined') { clearTimeout(timeC) };
    window.enCount = 6;
    window.tecmob = getrand(1, enCount);
    window.score = 0;
    window.time = 850;
    window.image = "blin";
    window.lifes = 4;
    window.vigovor = false;
    window.game = false;
    for (var i = allEn.length - 1; i >= 0; i--) {
        setRoateAngleForDevice(allEn[i], i + 1);
    }
    for (var i = 6; i >= 1; i--) {
        hidemob(i);
    }
    snowhide();
}

window.onload = loadingDiv.style.display = "none";
window.onload = startB.style.display = "block";
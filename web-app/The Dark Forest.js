const DarkForest = Object.create(null); //define the null function collection

function spawnVillain() {
    let villain = document.createElement('div');
    villain.className = 'villain';
    // Randomly position the villain along the x-axis at the top of the game area
    villain.style.left = Math.random() * (gameArea.offsetWidth - villain.offsetWidth) + 'px';
    villain.style.top = '0px';
    gameArea.appendChild(villain);
}

function moveVillains() {
    let villains = document.getElementsByClassName('villain');
    for (let i = 0; i < villains.length; i++) {
        let villain = villains[i];
    // Move the villain down the screen
        villain.style.top = (parseInt(villain.style.top) + 1) + 'px';
}
}

document.getElementById("startButton").onclick = function() {
    document.getElementById("splashScreen").style.display = "none";
    document.getElementById("gameContainer").style.display = "flex";
    document.getElementById("calibrationText").style.display = "block";
    setTimeout(function() {
        document.getElementById("calibrationText").style.display = "none";
    }, 5000); // Text will be hidden after 5 seconds
    startGame();
};




document.getElementById("retryButton").onclick = function() {
    location.reload();
};

let techLevel = 1;
let time = 2023;
let timer = 0;
let health = 100;
let weaponInGame = document.getElementById("weaponInGame");
let bulletInterval;


function startGame() {
    setInterval(function() {
        techLevel += 1;
        time += 10;
        document.getElementById("techLevel").textContent = "Level: " + techLevel;
        document.getElementById("time").textContent = "Year: " + time;


        let weaponImage = document.getElementById("weapon");
        if (techLevel >= 1 && techLevel <= 3) {
            weaponImage.src = "spaceship_lv1.png";
        } else if (techLevel >= 4 && techLevel <= 8) {
            weaponImage.src = "spaceship_lv2.png";
        } else if (techLevel >= 9 && techLevel <= 15) {
            weaponImage.src = "spaceship_lv3.png";
        }
        weaponInGame.src = weapon.src;
    }, 30000);

    // Spawn a new villain every 10 seconds
    setInterval(spawnVillain, 1000);

    // Move villains every 50ms
    setInterval(moveVillains, 50);

    setInterval(checkCollision, 50);
    
    
    setInterval(function() {
        timer++;
        if (timer === 30) {
            timer = 0;
        }
        document.getElementById("timer").textContent = (timer < 10 ? "0" : "") + timer + ":00";
    }, 1000);
    const weaponInGame = document.getElementById("weaponInGame");
    const weaponSpeed = 10;

let keys = { w: false, a: false, s: false, d: false };
document.addEventListener('keydown', function(event) {
    if (event.key in keys) {
        keys[event.key] = true;
}
});

document.addEventListener('keyup', function(event) {
    if (event.key in keys) {
        keys[event.key] = false;
}
});

let gameArea = document.getElementById("gameArea");
let gameAreaRect = gameArea.getBoundingClientRect();

setInterval(function() {
let rect = weaponInGame.getBoundingClientRect();

if (keys.w && rect.top > gameAreaRect.top) {
weaponInGame.style.top = (rect.top - weaponSpeed - gameAreaRect.top) + "px";
}
if (keys.s && rect.bottom < gameAreaRect.bottom) {
weaponInGame.style.top = (rect.top + weaponSpeed) + "px";
}
if (keys.a && rect.left > gameAreaRect.left) {
weaponInGame.style.left = (rect.left - weaponSpeed - gameAreaRect.left) + "px";
}
if (keys.d && rect.right < gameAreaRect.right) {
weaponInGame.style.left = (rect.left + weaponSpeed) + "px";
}
}, 80); // Change this number to change the movement speed




document.addEventListener('keydown', function(event) {
    let gameArea = document.getElementById("gameArea");
    let gameAreaRect = gameArea.getBoundingClientRect();
    let rect = weaponInGame.getBoundingClientRect();

    switch (event.key) {
        case "w":
            if (rect.top > gameAreaRect.top) weaponInGame.style.top = (rect.top - weaponSpeed - gameAreaRect.top) + "px";
            break;
        case "s":
            if (rect.bottom < gameAreaRect.bottom) weaponInGame.style.top = (rect.top + weaponSpeed) + "px";
            break;
        case "a":
            if (rect.left > gameAreaRect.left) weaponInGame.style.left = (rect.left - weaponSpeed - gameAreaRect.left) + "px";
            break;
        case "d":
            if (rect.right < gameAreaRect.right) weaponInGame.style.left = (rect.left + weaponSpeed) + "px";
            break;
    }
});


    bulletInterval = setInterval(function() {
        let bulletNumber;
        if (techLevel >= 1 && techLevel <= 3) {
            bulletNumber = 1;
        } else if (techLevel >= 4 && techLevel <= 8) {
            bulletNumber = 2;
        } else if (techLevel >= 9 && techLevel <= 1000000) {
            bulletNumber = 4;
        }

        for (let i = 0; i < bulletNumber; i++) {
            let bullet = document.createElement('div');
            bullet.className = 'bullet';
            let offset = i * 10 - ((bulletNumber - 1) * 10) / 2; // This will arrange the bullets in different trajectories
            bullet.style.left = (parseInt(weaponInGame.style.left) + weaponInGame.offsetWidth / 2 + offset) + 'px';
            bullet.style.top = (parseInt(weaponInGame.style.top) - 10) + 'px';
            document.getElementById('gameArea').appendChild(bullet);

            let bulletInterval = setInterval(function() {
                if (parseInt(bullet.style.top) > 0) {
                    bullet.style.top = (parseInt(bullet.style.top) - 10) + 'px';
                } else {
                    bullet.remove();
                    clearInterval(bulletInterval);
                }
            }, 50);
        }
    }, 150); // bullets will be fired every 150ms
    

    document.addEventListener('keydown', function(event) {
    });
}


function checkCollision() {
    let villains = document.getElementsByClassName('villain');
    let bullets = document.getElementsByClassName('bullet');

    for (let i = 0; i < villains.length; i++) {
        let villain = villains[i];
        let villainRect = villain.getBoundingClientRect();

for (let j = 0; j < bullets.length; j++) {
    let bullet = bullets[j];
    let bulletRect = bullet.getBoundingClientRect();
    
    // check if the bullet and villain rectangles overlap
    if (!(villainRect.right < bulletRect.left || 
        villainRect.left > bulletRect.right || 
        villainRect.bottom < bulletRect.top || 
        villainRect.top > bulletRect.bottom)) {
        
        // remove the bullet
        bullet.remove();
        
        // increase hit counter and check if villain has been hit 3 times
        villain.hitCounter = (villain.hitCounter || 0) + 1;
        if (villain.hitCounter >= 3) {
            villain.style.backgroundImage = "url('explode.gif')";
            setTimeout(function() {
                villain.remove();
            }, 1000); // remove the villain after 1 second
        }

        break; // no need to check other bullets since this one has already hit the villain
    }
}
}
}
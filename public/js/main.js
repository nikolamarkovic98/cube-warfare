let engine = new Engine(600, cubes);

let player = new Player(engine.CUBE * Math.floor(Math.random() * (engine.SIZE/engine.CUBE)),
                        engine.CUBE * Math.floor(Math.random() * (engine.SIZE/engine.CUBE)),
                        '#19070B', 10);

let walls = new Walls((engine.SIZE * 2) / engine.CUBE);
walls.init();

function init(){
    document.addEventListener('keydown', (e) => {
        player.move(e.keyCode);
    });

    engine.draw();
}

setInterval(() => {
    engine.draw();
}, 40);

init();
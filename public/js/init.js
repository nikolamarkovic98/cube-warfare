let ARROW_DOWN = 40,
ARROW_UP = 38,
ARROW_LEFT = 37,
ARROW_RIGHT = 39,
W = 87,
S = 83,
A = 65,
D = 68;

let bg_color = '#000';
let bg_colors = [ [ 'rgb(4, 4, 4)', 'rgb(6, 6, 6)' ], [ 'rgb(8, 8, 8)', 'rgb(10, 10, 10)'] ]

let colors = [
    // gray
    [ 'rgb(0, 0, 0)', 'rgb(8, 8, 8)', 'rgb(6, 6, 6)'],

    // green
    [ '#071907', '#0B3B0B' ],
    
    // sky-blue
    [ '#071918', '#0B3B39' ],

    // pink
    [ '#190718', '#3B0B39' ],

    // red
    [ '#190707', '#3B0B0B' ],

    // yellow
    [ '#181907', '#393B0B' ],

    // orange
    [ '#191007', '#3B240B' ],

    // dark-blue
    [ '#070719', '#0B0B3B' ],

    // punky-red
    [ '#19070B', '#3B0B17' ],

    // grass-green
    [ '#101907', '#2E3B0B' ]
]

class Engine{
    constructor(SIZE, CUBE){
        this.gameLoop = 1;
        this.SIZE = SIZE;
        this.HALF_CUBE = CUBE/2;
        this.CUBE = CUBE;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = this.canvas.height = SIZE;
        document.body.appendChild(this.canvas);

        this.numOfCubes = document.getElementById('numOfCubes');
    }

    drawSelf(){
        // draw blocks and lines n stuff
        for(let i = 0; i < this.SIZE; i += this.CUBE){
            for(let j = 0; j < this.SIZE; j += this.CUBE){
                this.ctx.fillStyle = bg_color;
                let range = player.Range(i, j);
                if(range){
                    this.drawInHalf(i, j, player.Side(i, j), range);
                } else {
                    this.ctx.fillRect(i, j, this.CUBE, this.CUBE);
                }
            }
        }
    }

    drawInHalf(x, y, side, range){
        switch(range){
            case 1:
                this.range_one(x, y, side);
            break;
            case 2:
                this.range_two(x, y, side);
            break;
            default:
                return;
        }
    }

    DRAW_LEFT(x, y, draw_style){
        this.ctx.fillStyle = draw_style[0];
        this.ctx.fillRect(x, y, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillRect(x, y+this.HALF_CUBE, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillStyle = draw_style[1];
        this.ctx.fillRect(x+this.HALF_CUBE, y, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillRect(x+this.HALF_CUBE, y+this.HALF_CUBE, this.HALF_CUBE, this.HALF_CUBE);
    }

    DRAW_RIGHT(x, y, draw_style){
        this.ctx.fillStyle = draw_style[1];
        this.ctx.fillRect(x, y, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillRect(x, y + this.HALF_CUBE, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillStyle = draw_style[0];
        this.ctx.fillRect(x + this.HALF_CUBE, y, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillRect(x + this.HALF_CUBE, y + this.HALF_CUBE, this.HALF_CUBE, this.HALF_CUBE);
    }

    DRAW_TOP(x, y, draw_style){
        this.ctx.fillStyle = draw_style[0];
        this.ctx.fillRect(x, y, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillRect(x + this.HALF_CUBE, y, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillStyle = draw_style[1];
        this.ctx.fillRect(x, y + this.HALF_CUBE, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillRect(x + this.HALF_CUBE, y + this.HALF_CUBE, this.HALF_CUBE, this.HALF_CUBE);
    }

    DRAW_BOTTOM(x, y, draw_style){
        this.ctx.fillStyle = draw_style[0];
        this.ctx.fillRect(x, y + this.HALF_CUBE, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillRect(x + this.HALF_CUBE, y + this.HALF_CUBE, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillStyle = draw_style[1];
        this.ctx.fillRect(x, y, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillRect(x + this.HALF_CUBE, y, this.HALF_CUBE, this.HALF_CUBE);
    }

    DRAW_TOP_LEFT(x, y, draw_style){
        this.ctx.fillStyle = draw_style[0];
        this.ctx.fillRect(x, y, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillRect(x + this.HALF_CUBE, y, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillRect(x, y + this.HALF_CUBE, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillStyle = draw_style[1];
        this.ctx.fillRect(x + this.HALF_CUBE, y + this.HALF_CUBE, this.HALF_CUBE, this.HALF_CUBE);
    }

    DRAW_TOP_RIGHT(x, y, draw_style){
        this.ctx.fillStyle = draw_style[0];
        this.ctx.fillRect(x, y, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillRect(x + this.HALF_CUBE, y, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillRect(x + this.HALF_CUBE, y + this.HALF_CUBE, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillStyle = draw_style[1];
        this.ctx.fillRect(x, y + this.HALF_CUBE, this.HALF_CUBE, this.HALF_CUBE);
    }

    DRAW_BOTTOM_LEFT(x, y, draw_style){
        this.ctx.fillStyle = draw_style[0];
        this.ctx.fillRect(x, y, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillRect(x, y + this.HALF_CUBE, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillRect(x + this.HALF_CUBE, y + this.HALF_CUBE, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillStyle = draw_style[1];
        this.ctx.fillRect(x + this.HALF_CUBE, y, this.HALF_CUBE, this.HALF_CUBE);
    }

    DRAW_BOTTOM_RIGHT(x, y, draw_style){
        this.ctx.fillStyle = draw_style[0];
        this.ctx.fillRect(x, y + this.HALF_CUBE, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillRect(x + this.HALF_CUBE, y + this.HALF_CUBE, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillRect(x + this.HALF_CUBE, y, this.HALF_CUBE, this.HALF_CUBE);
        this.ctx.fillStyle = draw_style[1];
        this.ctx.fillRect(x, y, this.HALF_CUBE, this.HALF_CUBE);
    }

    range_one(x, y, side){
        switch(side){
            case 'LEFT':
                this.DRAW_LEFT(x, y, bg_colors[1]);
            break;
            case 'RIGHT':
                this.DRAW_RIGHT(x, y, bg_colors[1]);
            break;
            case 'TOP':
                this.DRAW_TOP(x, y, bg_colors[1]);
            break;
            case 'BOTTOM':
                this.DRAW_BOTTOM(x, y, bg_colors[1]);
            break;
            case 'TOP_LEFT':
                this.DRAW_TOP_LEFT(x, y, bg_colors[1]);
            break;
            case 'TOP_RIGHT':
                this.DRAW_TOP_RIGHT(x, y, bg_colors[1]);
            break;
            case 'BOTTOM_LEFT':
                this.DRAW_BOTTOM_LEFT(x, y, bg_colors[1]);
            break;
            case 'BOTTOM_RIGHT':
                this.DRAW_BOTTOM_RIGHT(x, y, bg_colors[1]);
            break;
        }
    }

    range_two(x, y, side){
        switch(side){
            case 'TOP_LEFT':
                this.DRAW_TOP_LEFT(x, y, bg_colors[0]);
            break;
            case 'TOP_RIGHT':
                this.DRAW_TOP_RIGHT(x, y, bg_colors[0]);
            break;
            case 'BOTTOM_LEFT':
                this.DRAW_BOTTOM_LEFT(x, y, bg_colors[0]);
            break;
            case 'BOTTOM_RIGHT':
                this.DRAW_BOTTOM_RIGHT(x, y, bg_colors[0]);
            break;
            case 'LEFT':
                this.DRAW_LEFT(x, y, bg_colors[0]);
            break;
            case 'RIGHT':
                this.DRAW_RIGHT(x, y, bg_colors[0]);
            break;
            case 'TOP':
                this.DRAW_TOP(x, y, bg_colors[0]);
            break;
            case 'BOTTOM':
                this.DRAW_BOTTOM(x, y, bg_colors[0]);
        }
    }

    draw(){
        if(!this.gameLoop)
            return;
        // clear everything and redraw
        this.ctx.clearRect(0, 0, this.SIZE, this.SIZE);
        
        // redraw objects
        this.drawSelf();
        walls.draw();
        player.draw();
        this.updateText();

        if(walls.walls.length <= 0){
            this.gameLoop = 0;
            alert('You win!');
        }
    }

    updateText(){
        this.numOfCubes.innerHTML = 'Cubes left: ' + walls.walls.length;
    }
}

class Brick{
    constructor(x, y, style, xMove, yMove){
        this.x = x;
        this.y = y;
        this.xMove = xMove;
        this.yMove = yMove;
        this.width = engine.CUBE;
        this.height = engine.CUBE;
        this.style = style;
        this.max_hp = 10;
        this.damage_received = 0;    
        this.current_hp = this.max_hp - this.damage_received;
    }

    applyDamage(){ this.current_hp = this.max_hp - this.damage_received; }
}

class Player extends Brick{
    constructor(x, y, style){
        super(x, y, style);
        this.range = 2;
        this.damage = 2;
        this.last_direction = W;
    }

    // When the player presses key this f is called, player position changes and then canvas updates (draw again)
    move(key){
        if(S == key || key == ARROW_DOWN){
            this.last_direction = S;
            if(this.collision(this.x, this.y + this.height))
                return;

            this.y = this.y >= engine.SIZE - this.height ? this.y = engine.SIZE - this.height : this.y += this.height;
            engine.draw();
        } else if(W == key || key == ARROW_UP){
            this.last_direction = W;
            if(this.collision(this.x, this.y - this.height))
                return;

            this.y = this.y <= 0 ? this.y = 0 : this.y -= this.height;
            engine.draw();
        } else if(A == key || key == ARROW_LEFT){
            this.last_direction = A;
            if(this.collision(this.x - this.width, this.y))
                return;

            this.x = this.x <= 0 ? this.x = 0 : this.x -= this.width;
            engine.draw();
        } else if(D == key || key == ARROW_RIGHT){
            this.last_direction = D;
            if(this.collision(this.x + this.width, this.y))
                return;

            this.x = this.x >= engine.SIZE - this.width ? this.x = engine.SIZE - this.width : this.x += this.width; 
            engine.draw();
        } else if(key == 74){
            this.fire();
        }
    }

    // checks last direction, finds the closest cube and shots it
    fire(){
        switch(this.last_direction){
            case W: {
                let target = null;
                let enemies = [];
                
                for(let i = 0; i < walls.walls.length; i++)
                    if(walls.walls[i].x == this.x && walls.walls[i].y < this.y)
                        enemies.push(i);

                if(enemies.length > 1){
                    target = enemies[0];
                    for(let i = 1; i < enemies.length; i++){
                        if(walls.walls[target].y < walls.walls[enemies[i]].y)
                            target = enemies[i];
                    }
                } else{
                    target = enemies[0];
                }

                let summit = target == null ? 0 : walls.walls[target].y;

                for(let x = this.x, y = this.y; y > summit; y -= engine.CUBE){
                        engine.ctx.beginPath();
                        engine.ctx.arc(x + engine.CUBE/2, y, engine.CUBE * 0.2, 2 * Math.PI, false);
                        engine.ctx.strokeStyle = 'red';
                        engine.ctx.stroke();
                }

                this.attack(target);
                break;
            }
            case S: {
                let target = null;
                let enemies = [];
                
                for(let i = 0; i < walls.walls.length; i++)
                    if(walls.walls[i].x == this.x && walls.walls[i].y > this.y)
                        enemies.push(i);

                if(enemies.length > 1){
                    target = enemies[0];
                    for(let i = 1; i < enemies.length; i++){
                        if(walls.walls[target].y > walls.walls[enemies[i]].y)
                            target = enemies[i];
                    }
                } else{
                    target = enemies[0];
                }

                let summit = target == null ? engine.SIZE : walls.walls[target].y;

                for(let x = this.x, y = this.y; y < summit; y += engine.CUBE){
                        engine.ctx.beginPath();
                        engine.ctx.arc(x + engine.CUBE/2, y + engine.CUBE, engine.CUBE * 0.2, 2 * Math.PI, false);
                        engine.ctx.strokeStyle = 'red';
                        engine.ctx.stroke();
                }

                this.attack(target);
                break;
            }
            case A: {
                let target = null;
                let enemies = [];
                
                for(let i = 0; i < walls.walls.length; i++)
                    if(walls.walls[i].x < this.x && walls.walls[i].y == this.y)
                        enemies.push(i);

                if(enemies.length > 1){
                    target = enemies[0];
                    for(let i = 1; i < enemies.length; i++){
                        if(walls.walls[target].x < walls.walls[enemies[i]].x)
                            target = enemies[i];
                    }
                } else{
                    target = enemies[0];
                }

                let summit = target == null ? 0 : walls.walls[target].x + engine.CUBE;

                for(let x = this.x, y = this.y; x >= summit; x -= engine.CUBE){
                    engine.ctx.beginPath();
                    engine.ctx.arc(x, y + engine.CUBE/2, engine.CUBE * 0.2, 2 * Math.PI, false);
                    engine.ctx.strokeStyle = 'red';
                    engine.ctx.stroke();
                }

                this.attack(target);
                break;
            }
            case D: {
                let target = null;
                let enemies = [];

                for(let i = 0; i < walls.walls.length; i++)
                    if(walls.walls[i].x > this.x && walls.walls[i].y == this.y)
                        enemies.push(i);

                if(enemies.length > 1){
                    target = enemies[0];
                    for(let i = 1; i < enemies.length; i++){
                        if(walls.walls[target].x > walls.walls[enemies[i]].x)
                            target = enemies[i];
                    }
                } else{
                    target = enemies[0];
                }

                let summit = target == null ? engine.SIZE : walls.walls[target].x;

                for(let x = this.x, y = this.y; x < summit; x += engine.CUBE){
                    engine.ctx.beginPath();
                    engine.ctx.arc(x + engine.CUBE, y + engine.CUBE / 2, engine.CUBE * 0.2, 2 * Math.PI, false);
                    engine.ctx.strokeStyle = 'red';
                    engine.ctx.stroke();
                }

                this.attack(target);
                
                break;
            }
        }
    }

    attack(id){
        if(walls.walls[id].current_hp <= 0){
            walls.walls.splice(id, 1);
        } else {
            walls.walls[id].damage_received += player.damage;
            walls.walls[id].applyDamage();
        }
    }

    draw(){
        engine.ctx.fillStyle = this.style;
        engine.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    collision(f_x, f_y){
        // function for collision, if the wall position matches the player's position it won't draw there
        for(let i = 0; i < walls.walls.length; i++)
            if(f_x == walls.walls[i].x && f_y == walls.walls[i].y){
                if(walls.walls[i].current_hp <= 0){
                    walls.walls.splice(i, 1);
                }
                else{
                    this.attack(i);
                }

                return walls.walls[i];
            }

        return;
    }

    Range(x, y){
        if((this.y - engine.CUBE <= y && this.y + engine.CUBE >= y) &&
            (this.x - engine.CUBE <= x && this.x + engine.CUBE >= x))
            return 1;

        if((this.y - engine.CUBE * 2 <= y && this.y + engine.CUBE * 2 >= y) &&
            (this.x - engine.CUBE * 2 <= x && this.x + engine.CUBE * 2 >= x))
            return 2;

        return false;
    }

    // this will determine side of cube
    Side(x, y){
        if(this.y == y && this.x - engine.CUBE == x)
            return 'LEFT';
        if(this.y == y && this.x + engine.CUBE == x)
            return 'RIGHT';
        if(this.y - engine.CUBE == y && this.x == x)
            return 'TOP';
        if(this.y + engine.CUBE == y && this.x == x)
            return 'BOTTOM';
        if(this.y - engine.CUBE == y && this.x - engine.CUBE == x)
            return 'TOP_LEFT';
        if(this.y - engine.CUBE == y && this.x + engine.CUBE == x)
            return 'TOP_RIGHT';
        if(this.y + engine.CUBE == y && this.x - engine.CUBE == x)
            return 'BOTTOM_LEFT';
        if(this.y + engine.CUBE == y && this.x + engine.CUBE == x)
            return 'BOTTOM_RIGHT';
        if(this.y - engine.CUBE * 2 == y && this.x - engine.CUBE * 2 == x)
            return 'TOP_LEFT';
        if(this.y - engine.CUBE * 2 == y && this.x + engine.CUBE * 2 == x)
            return 'TOP_RIGHT';
        if(this.y + engine.CUBE * 2 == y && this.x - engine.CUBE * 2 == x)
            return 'BOTTOM_LEFT'
        if(this.y + engine.CUBE * 2 == y && this.x + engine.CUBE * 2 == x)
            return 'BOTTOM_RIGHT';
        if((this.y - engine.CUBE <= y && this.y + engine.CUBE >= y) &&
            this.x - engine.CUBE * 2 == x)
            return 'LEFT';
        if((this.y - engine.CUBE <= y && this.y + engine.CUBE >= y) &&
            this.x + engine.CUBE * 2 == x)
            return 'RIGHT';
        if((this.x - engine.CUBE <= x && this.x + engine.CUBE >= x) &&
            this.y - engine.CUBE * 2 == y)
             return 'TOP';
        if((this.x - engine.CUBE <= x && this.x + engine.CUBE >= x) &&
            this.y + engine.CUBE * 2 == y)
             return 'BOTTOM';

        return;
    }
}

class Walls{
    constructor(len){
        this.len = len;
        // walls is array of Bricks
        this.walls = [];
    }

    init(){
        // create all the Walls
        for(let i = 0; i < this.len; i++){
            if(this.walls.length == 0){
                // if there are none enemies created yet create one so I can use the previous coordinate
                let _x, _y; _x = _y = engine.CUBE * Math.floor(Math.random() * (engine.SIZE/engine.CUBE));
                this.walls.push(new Brick(_x, _y, colors[Math.floor(Math.random() * 10)],
                                Math.floor(Math.random() * 10),
                                Math.floor(Math.random() * 10)));
            } else {
                let _x, _y;

                for(let j = 0; j < this.walls.length; j++){
                    do {
                        _x = engine.CUBE * Math.floor(Math.random() * (engine.SIZE/engine.CUBE));
                        _y = engine.CUBE * Math.floor(Math.random() * (engine.SIZE/engine.CUBE));
                    } while(!((_x != this.walls[j].x || _y != this.walls[j].y) && (_x != player.x || _y != player.y)))
            }

            this.walls.push(new Brick(_x, _y, colors[Math.floor(Math.random() * 10)],
                                Math.floor(Math.random() * 10),
                                Math.floor(Math.random() * 10)));
            }
        }
    }

    draw(){
        for(let i = 0; i < this.walls.length; i++){
            engine.ctx.fillStyle = this.walls[i].style[0];
            
            if(player.Range(this.walls[i].x, this.walls[i].y))
                engine.ctx.fillStyle = this.walls[i].style[1];
            engine.ctx.fillRect(this.walls[i].x, this.walls[i].y + 2, this.walls[i].width, this.walls[i].height - 2);
            
            // 40 width, hp = 10
            let hp = engine.CUBE / walls.walls[i].max_hp;

            // hp bar
            engine.ctx.fillStyle = '#8A0808';
            engine.ctx.fillRect(this.walls[i].x, this.walls[i].y, this.walls[i].width, 2);
            engine.ctx.fillStyle = '#3B0B0B';
            engine.ctx.fillRect(this.walls[i].x, this.walls[i].y, this.walls[i].width - (this.walls[i].current_hp * hp), 2);
        }
    }
}
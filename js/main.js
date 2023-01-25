/********* VAR & FONCTIONS DE BASE *********/

function randomPosX(){
    let r = Math.round(Math.random()*85);
    return r+"%";
}
function randomPosY(){
    let r = Math.round(Math.random()*85);
    return r+"%";
}
function randomSize(min,max){
    let r = Math.round(Math.random()*(max-min))+min;
    return r+"px";
}

function moveComete(x,direction){   // on récupère la comète + la direction
    let timer=setInterval(move,30,x);
    let r = (Math.random()*18)+2;   // vitesse de déplacement aléatoire
    let rX;
    let rY;
    let timesRun = 0;               // mise en place du clear interval
    switch (direction){             // en fonction de la direction on change les valeurs du translate
        case "topRight":
            rX = r;
            rY = -r;
            break;
        case "topLeft":
            rX = -r;
            rY = -r;
            break;
        case "bottomLeft":
            rX = -r;
            rY = r;
            break;
        default:
            rX = r;
            rY = r;
    }

    function move(x){
        x.style.transform+="translate("+(rX)+"px , "+(rY)+"px)";    // translate avec les valeurs adaptées en fonction de la dir
        timesRun++;
        if (timesRun > (innerHeight/r)){    // reset quand il dépasse la hauteur de la fenêtre
            timesRun = 0;
            x.style.transform = "translate(0)";
            r=0;
            rX=0;
            rY=0;
            moveComete(x,direction);
        }
    }
}

/********* ITEMS *********/

class Item{       // constructor pour 1 item
    constructor(img_, posX_, posY_, width_, type_, dir_=""){
        this.img = img_;
        this.posX = posX_;
        this.posY = posY_;
        this.width = width_;
        this.type = type_;
        this.dir = dir_;
    }
}
        // création des items
let Planet1 = new Item("./img/planet1.png", randomPosX(), randomPosY(), randomSize(50,200), "planet");
let Planet2 = new Item("./img/planet2.png", randomPosX(), randomPosY(), randomSize(50,200), "planet");
let Planet3 = new Item("./img/planet3.png", randomPosX(), randomPosY(), randomSize(50,200), "planet");
let Planet4 = new Item("./img/planet4.png", randomPosX(), randomPosY(), randomSize(50,200), "planet");
let Sun = new Item("./img/sun.png", randomPosX(), randomPosY(), randomSize(40,120), "planet");
let Moon = new Item("./img/moon.png", randomPosX(), randomPosY(), randomSize(150,300), "planet");
let Asteroid = new Item("./img/asteroid.png", randomPosX(), randomPosY(), randomSize(40,200), "object");
let Sat1 = new Item("./img/sat1.png", randomPosX(), randomPosY(), randomSize(70,120), "object");
let Sat2 = new Item("./img/sat2.png", randomPosX(), randomPosY(), randomSize(70,120), "object");
let Sat3 = new Item("./img/sat3.png", randomPosX(), randomPosY(), randomSize(70,120), "object");
let Comete = new Item("./img/comete.png", "0px", (innerHeight-100)+"px", "90px", "comete", "topRight");
let Comete2 = new Item("./img/comete2.png", (innerWidth-100)+"px", "0px", "90px", "comete", "bottomLeft");


let items = [Planet1 , Planet2, Planet3, Planet4, Sun, Moon, Asteroid, Sat1, Sat2, Sat3, Comete, Comete2];

/********* CHOIX DES ITEMS *********/

function majInterface(askedType){

    let skyElements = document.querySelectorAll("img");
    skyElements.forEach(
        (e) => {
            e.remove();
        }
    )

    if (askedType == ""){
        var itemsFiltrés = items;
    }else{
        var itemsFiltrés = items.filter(
            (item,i) => {
                return item.type == askedType;
            }
        );
    }

    itemsFiltrés.forEach(        // construction de chaque item
    (itemFiltré,i) => {
        let addItem = document.createElement("img");
        addItem.src = itemFiltré.img;
        addItem.style.left = itemFiltré.posX;
        addItem.style.top = itemFiltré.posY;
        addItem.style.width = itemFiltré.width;
        
        
        if (itemFiltré.type == "object"){     // rotation si c'est un object
            addItem.className="rotation";
        }
        document.body.appendChild(addItem); // ajout au DOM

        if (itemFiltré.type == "comete"){         // mouvement si c'est une comète
            moveComete(addItem,itemFiltré.dir);   // appel mouvement de comète en fonction de sa direction
        }
    }
)
}

majInterface("");
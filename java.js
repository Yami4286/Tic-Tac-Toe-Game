


const btn = document.querySelector("#btn");

btn.addEventListener("click", () =>{
const name = prompt("Size");

forGrid(name);
});

function blackhover(e){
    e.target.style.backgroundColor = "white";
}

function forGrid(size) {
    let remov = document.querySelectorAll(".column, .row");
    remov.forEach(element => {element.remove();});
  let screen = document.querySelector(".Inside");
  const screenWidth = screen.clientWidth;
  let b = 1;
  for(let i = 0; i < size; i++){
    let column = document.createElement("div");
    column.classList.add("column");
    for(let j = 1 ; j <= size ; j++){
      let row = document.createElement("div");
      let Siz = screenWidth/size;
      row.style.width = Siz + "px";
      row.style.height = Siz+ "px";
    
      row.classList.add("row")
      row.setAttribute("data-value", b);
      row.addEventListener("mouseenter", blackhover);
      row.addEventListener("click", Moves.Signs);
     column.appendChild(row);
    b++
    }
    screen.appendChild(column);
  }
}



function Pubsub(){
    const events = {};

  function  Subscribe(Event, handler){
      if(!events[Event]) events[Event] = [];
      events[Event].push(handler);
    }
  
    function Publish(Event, data){
      if(!events[Event]) return;
      events[Event].forEach(handler => handler(data));
    }
    
    return{Subscribe, Publish};
}


function CreatePlayer(){
    const Players = [];
    function Create(Play ,sign){
         Players[Play] = {Play, sign};
    }

    function GetPlayers(){
           ubsub.Subscribe("PlayerWon", (Winner) => {alert(`${Winner} has won`);});
           forGrid(3);
        return Players;
    }

 
     
   return{Create,GetPlayers};
}

function Moves(){
    const pla = pl.GetPlayers();
    const mov = [];
    const cells = document.querySelectorAll(".row");
     let first = true;
    let curr = pla[0];

     function Signs(e){
         const player = MakeMove(e.target.dataset.value);
    e.target.textContent =  curr.sign; }

    function MakeMove(num){
        
     mov.push(num);
      first = false;
     if(!first){ first = false; curr = pla[1];} else { curr = pla[0];}
     e.target.style.pointerEvents = "none";
     }

     return {MakeMove, Signs};
}

const ubsub = Pubsub();
const pl = CreatePlayer();

pl.Create("Ali","X");

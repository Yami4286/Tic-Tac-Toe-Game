const ubsub = Pubsub();
const pl = CreatePlayer();
pl.Create("Ali","X");
pl.Create("Abaid","Y");
const moves = Moves();
forGrid(3)
pl.GetPlayers();





const btn = document.querySelector("#btn");

btn.addEventListener("click", () =>{
const name = prompt("Size");

forGrid(name);
});

function blackhover(e){
    e.target.style.backgroundColor = "Black";
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
      row.addEventListener("click", moves.Signs);
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
        Players.push({name, sign});
    }

    function GetPlayers(){
           ubsub.Subscribe("PlayerWon", (Winner) => {alert(`${Winner} has won`);});
        return Players;
    }

 
     
   return{Create,GetPlayers};
}




  

function Moves(){
    const pla = pl.GetPlayers();
    const Xmov = [];
    const Ymov = [];
    const cells = document.querySelectorAll(".row");
     let first = true;
      const Xo = [];
    let curr = pla[0];
    let x = 1;
    let y = 1;

     function Signs(e){
         MakeMove(e); }

    function MakeMove(e){
              e.target.textContent =  curr.sign;
     
     if(first){ 
      first = false; 
      Xmov.push(e.target.dataset.value); 
      
      curr = pla[1];
      if(x == 3){
       
      Xo.push({Xmov});


      x = 1;
      }
      x++;
    } 
     
     else { first = true; Ymov.push(e.target.dataset.value); curr = pla[0]; }
     e.target.style.pointerEvents = "none";
     }

     return {MakeMove, Signs};
}





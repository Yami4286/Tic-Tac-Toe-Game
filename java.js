const ubsub = Pubsub();
const pl = CreatePlayer();
pl.Create("Ali","X");
pl.Create("Abaid","Y");
const moves = Moves();
forGrid(3)
pl.GetPlayers();
const robot = Robot();






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
    function Create(name ,sign){
        Players.push({name, sign});
    }

    function GetPlayers(){
           ubsub.Subscribe("PlayerWon", (Winner) => {alert(`${Winner} has won`);});
        return Players;
    }

 
     
   return{Create,GetPlayers};
}




  

function Moves(){
const winningSets = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7]
];
    const pla = pl.GetPlayers();
    const Xmov = [];
    const Ymov = [];
     let first = true;
      const Xo = [];
    let curr = pla[0];
    let x = 1;
    let y = 1;

     function Signs(e){
         MakeMove(e); }

    function MakeMove(e){
      let current = curr.name;
      let corr = curr.sign;
      console.log(current);
         console.log(corr);
              e.target.textContent =  curr.sign;
              //here starts x logic

     if(first){ 
      first = false; 
      Xmov.push(Number(e.target.dataset.value)); 
      if(x >= 3){ 
        for(const set of winningSets){
          const HasWon = set.every(num => Xmov.includes(num));
          if(HasWon){
             //timeout logic so dome updates
          setTimeout(() => {
    ubsub.Publish("PlayerWon", current);
  }, 0);
            break;
          }
           //timeout logic so dome updates
        }
    
      }
      x++;
       curr = pla[1];
       robot.MaketheM();
    } 
     //this is second player turning logic for moves, above is x logic
     else { 
      first = true; 
      Ymov.push(Number(e.target.dataset.value)); 
       
                 if(y >= 3){ 
        for(const set of winningSets){
          const HasWon = set.every(num => Ymov.includes(num));

          //timeout logic so dome updates
          if(HasWon){
             setTimeout(() => {
    ubsub.Publish("PlayerWon", current);
  }, 0);
            break;
          }
 //timeout logic so dome updates

        }
      }
      y++;
       curr = pla[0];  
             }
// till here lies y logic
     e.target.style.pointerEvents = "none";
     

     }

     return {MakeMove, Signs};
}


function Robot(){
const cells = document.querySelectorAll(".row");

function check(){
  return[...cells].filter(cell => cell.textContent === '');
}

function MaketheM(){
  const empty = check();
  if(empty.length === 0) return;
  let Ran = Math.floor(Math.random() * empty.length);
  let Chose = empty[Ran];

  Chose.click();
}

return{MaketheM, check};
}





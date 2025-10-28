let Ps1;
let S1;
let Ps2;
let S2;
Start();


function Start(){
  const First = document.querySelector("#btn");
  const form = document.querySelector("#Start");
const isrt = document.querySelector("#bt");
const data = document.querySelectorAll(".add");

function GetThe(){
  const values = Array.from(data).map(input => input.value.trim());
  return values; 
}

  First.addEventListener("click", ()=>{ form.classList.remove("hidden");})
  isrt.addEventListener("click", ()=>{  [Ps1, S1, Ps2, S2] = GetThe();
    
    form.classList.add("hidden");

    if(!Ps1 || !S1 || !Ps2 || !S2){
    alert("Fill in all boxes");
    return;
  }
  Game();
    
  })
  
}
///separate the start function for a clean and good approach or smack your head in the wall

function Game(){
  const popup = document.querySelector("#Start");
  const form = document.querySelectorAll(".add");
    console.log( `${Ps1}, ${S1}`);
   const ubsub = Pubsub();
   const pl = CreatePlayer();
    pl.Create(Ps1, S1);
   pl.Create(Ps2,S2);
 const moves = Moves();
const robot = Robot();
 
  
  
   pl.forGrid(3)
   pl.GetPlayers();
  





function blackhover(e){
    e.target.style.backgroundColor = "Black";
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
           ubsub.Subscribe("Draw",()=>{"Game Has Been Drawn"});
           ubsub.Subscribe("GameOver",()=>{alert("Game Over");})
        return Players;
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

 
     
   return{Create,GetPlayers, forGrid};
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
let IsWon = false;
    const pla = pl.GetPlayers();
    let Xmov = [];
    let Ymov = [];
     let first = true;
      const Xo = [];
    let curr = pla[0];
    let x = 1;
    let y = 1;
    let z = 1;

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
    IsWon = true;
    clear();
            break;
          }
           //timeout logic so dome updates
        }
    
      }
      x++;
       curr = pla[1];
       if(!IsWon)robot.MaketheM();
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
  }, 110);
  IsWon = true;
  clear();
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
     let noEmpty = robot.check();
             if(noEmpty.length === 0 && !IsWon){ubsub.Publish("Draw"); clear(); }else{return;}
 
            
  return;
}

     function clear(){
      Xmov = [];
      Ymov = [];
      x = 1;
      y = 1;
      curr = pla[0];
      pl.forGrid(3);
      IsWon = false;
      z++;
        Round(z);
     }

     return {MakeMove, Signs, clear};
}


function Robot(){


function check(){
  const cells = document.querySelectorAll(".row");
  return[...cells].filter(cell => cell.textContent === '');
}

function MaketheM(){
  const empty = check();
  if(empty.length === 0) return;
  let Ran = Math.floor(Math.random() * empty.length);
  let Chose = empty[Ran];

 setTimeout(()=> { Chose.click();},100);
}

return{MaketheM, check};
}

function Round(s){
   if( s >= 3){   setTimeout(() => {
    ubsub.Publish("GameOver");
  }, 110);  }
}


}

var numbers;
var canvas_id = 0;
var firstRun = true;
var turn_number = 0;
var throw_number = 0;
var total = 0;
var _isAnnotated = false;
var language_variations = [["Shuffle","Mezclar"],
                          ["Start Game","Empezar Juego"],
                          ["Help","Ayuda"],
                          ["Configuration","Configurar"],
                          ["Turn", "Turno"],
                          ["Throwed", "Tirada"],
                          ["Language","Idioma"],
                          ["Theme","Tema"],
                          ["Dice Sound","Sonido de Dados"],
                          ["Stair","Escalera"],
                          ["Yahtzee","Generala"],
                          ["Double Yahtzee","Doble Generala"]
                          ["Scoreboard","Marcador"],
                          ["- To separate dices, click, hold down the mouse button over the specific dice, and drag it over to leftover space in the second container","Para separar los dados, clickea y manten bajo el boton del mouse sobre el dado especifico, y arrastralo hacia el espacio libre en el segundo contenedor."],
                          ["- To cross a row, fill the input value with a hyphen (-) and press the OK button next to it.","Para tachar una fila del marcador, llena el valor de entrada con un guion (-) y presiona el boton OK al lado de el."]];
  
  
//import { readFile } from 'fs';

function changeLanguage(){

}

function setTheme(type){
  let _default = document.getElementsByClassName("default");
  let _length = _default.length
  for(let i = 0; i < _length; i++){
    _default.item(0).classList.remove("default")
    _default.item(0).classList.add("dark");
  }
}

function getRandomBetween(from, to){
    return Math.random() * (to - from) + from;
}

function addTurn(){
  turn_number++;
  document.getElementById("turn_num").innerText = turn_number;
}

function addThrowed(){
  throw_number++;
  if(throw_number === 4){
    addTurn();
    throw_number = 1;
  } 
  document.getElementById("throw_num").innerText = throw_number;
}

function displayConfig(){
  document.getElementById("div_config").className = "visible-config"
}

function displayHelp(){
  document.getElementById("div_help").className = "visible-help"
}

function help(){
  let div_help = document.createElement("div")
  div_help.id = "div_help"
  div_help.className = "hidden"
  let but_help_close = document.createElement("button");
  but_help_close.id = "but_help_close";
  but_help_close.innerHTML = "X";
  but_help_close.onclick = (event) => {
    div_help.className = "hidden"
  }
  let first_para_help_title = document.createElement("span");
  first_para_help_title.innerHTML = "Separating the dices";
  let crossing_row_title = document.createElement("span");
  crossing_row_title.innerHTML = "Crossing a row";
  first_para_help_title.setAttribute("style","font-weight: bold;");
  crossing_row_title.setAttribute("style","font-weight: bold;");
  let first_para_help = document.createElement("p")
  first_para_help.innerHTML = "- To separate dices, click, hold down the mouse button over the specific dice, and drag it over to leftover space in the second container"
  let second_para_help = document.createElement("p")
  second_para_help.innerHTML = "- To cross a row, fill the input value with a hyphen (-) and press the OK button next to it."
  div_help.append(but_help_close,first_para_help_title,first_para_help,crossing_row_title, second_para_help)
  document.body.append(div_help)
}

function configuration(){
  let div_config = document.createElement("div");
  div_config.id = "div_config";
  div_config.className = "hidden"
  let but_config_close = document.createElement("button");
  but_config_close.id = "but_config_close";
  but_config_close.innerHTML = "X";
  but_config_close.onclick = (event) => {
    div_config.className = "hidden"
  }
  //but_config_close.setAttribute("onclick","")
  div_config.append(but_config_close);
  let div_config_table = document.createElement("table");
  div_config_table.id = "config_table"
  const div_config_thead = document.createElement("thead");
  const div_config_tbody = document.createElement("tbody");
  div_config_tbody.id = "config_table_tbody"
  div_config_table.append(div_config_thead);
  div_config_table.append(div_config_tbody);
  let div_config_tr_tds = [];
  for(let i = 0; i < 4; i++){
    const div_config_tr = document.createElement("tr");
    const div_config_tr_td_1 = document.createElement("td")
    const div_config_tr_td_2 = document.createElement("td")
    div_config_tr_tds.push(div_config_tr_td_1, div_config_tr_td_2)
    div_config_tr.append(div_config_tr_td_1);
    div_config_tr.append(div_config_tr_td_2);
    div_config_tbody.append(div_config_tr)
  }
  div_config_tr_tds[0].innerHTML = "Dice Sound"
  let input_radio_1 = document.createElement("input");
  let fieldset = document.createElement("fieldset")
  fieldset.id = "fieldset_1"
  input_radio_1.id = "input_radio_yes";
  input_radio_1.setAttribute("type","radio");
  input_radio_1.setAttribute("checked","")
  input_radio_1.value = "input_radio_yes_value"
  input_radio_1.name = "input_radio"
  let input_radio_2 = document.createElement("input");
  input_radio_2.id = "input_radio_no";
  input_radio_2.setAttribute("type","radio");
  input_radio_2.value = "input_radio_no_value"
  input_radio_2.name = "input_radio"
  let text_yes = document.createElement("label");
  let text_no = document.createElement("label");
  text_yes.innerHTML = "Yes"
  text_yes.className = "lbl_soundDice"
  text_no.innerHTML = "No"
  text_no.className = "lbl_soundDice"
  let select_language = document.createElement("select")
  
  const select_language_spanish = document.createElement("option");
  const select_language_english = document.createElement("option");
  select_language_english.innerHTML = "English"
  select_language_spanish.innerHTML = "Spanish"
  const select_theme = document.createElement("select");
  const select_theme_default = document.createElement("option");
  const select_theme_dark = document.createElement("option");
  select_theme.onchange = (event) => {
    if(document.body.className === "default") {
      let _default = document.getElementsByClassName("default");
      let _length = _default.length
      for(let i = 0; i < _length; i++){
        _default.item(0).classList.add("dark");
        _default.item(0).classList.remove("default")
      }
      let _default_div = document.getElementsByClassName("default-div");
      let _length_defDiv = _default_div.length;
      for(let i = 0; i < _length_defDiv; i++){
        _default_div.item(0).classList.add("dark-div");
        _default_div.item(0).classList.remove("default-div")
      }
    } else {
      let _dark = document.getElementsByClassName("dark");
      let _length = _dark.length
      for(let i = 0; i < _length; i++){
        _dark.item(0).classList.add("default");
        _dark.item(0).classList.remove("dark")
      }
      let _dark_div = document.getElementsByClassName("dark-div");
      let _length_darkDiv = _dark_div.length;
      for(let i = 0; i < _length_darkDiv; i++){
        _dark_div.item(0).classList.add("default-div");
        _dark_div.item(0).classList.remove("dark-div")
      }
  }
}
  select_theme_default.innerHTML = "Default"
  select_theme_dark.innerHTML = "Dark"
  select_theme.append(select_theme_default, select_theme_dark);
  div_config_tr_tds[5].append(select_theme)
  select_language.append(select_language_english, select_language_spanish)
  div_config_tr_tds[7].append(select_language);
  fieldset.append(input_radio_1, text_yes, input_radio_2, text_no)
  div_config_tr_tds[1].append(fieldset)
  div_config_tr_tds[2].innerHTML  = "Track"
  div_config_tr_tds[4].innerHTML  = "Theme"
  div_config_tr_tds[6].innerHTML  = "Language"

  div_config.append(div_config_table);
  document.body.append(div_config)
}

function isAnnotated(){
  return _isAnnotated;
}

function nextTurn(){
  addTurn();
  eraseAllCanvases();
}

function getNumbers(){
  for(let i = 0; i < 5; i++){
    numbers[i] = Math.round((getRandomBetween(0.5,6.5)));
  }
}

function shuffle(){
    let times = 1;
    if(document.getElementById("input_radio_yes").checked) {
      reproduce_shuffleSound();
    }
    let id = window.setInterval(() => {
      for(let i = 0; i < 5; i++){
        numbers[i] = Math.round((getRandomBetween(0.5,6.5)));
      }
      draw();
      if (times === 4){
        if(document.getElementById("input_radio_yes").checked){
          reproduce_rollSound();
        }
      }
      if (times == 5) {
        window.clearInterval(id)
      }
      times++        
    }, 350);
  if(turn_number === 0) addTurn();
  addThrowed();
}

window.onload = (event) => {

    configuration()
    help();
    numbers = [0,0,0,0,0]
    //shuffle();
    let tr_s = document.getElementsByTagName('tbody').item(0).getElementsByTagName('tr')
    for(let i = 0; i < tr_s.length; i++){
      tr_s[i].addEventListener("click", (event) => {
        let regex_td = /td\_\d/
        let regex_bt = /but\_\d/
        let id_tr = ""
        let input_value = ''
        if(regex_td.test(event.target.parentElement.id) || (regex_bt.test(event.target.id))){
          id_tr = event.target.parentElement.parentElement.id
          id_tr = id_tr.charAt(id_tr.length-1)
          if(event.target.parentElement.parentElement.className.includes("selected")){
            event.target.parentElement.parentElement.className = ""
            // document.getElementById("input_" + id_tr).setAttribute("disabled","true");
          } else {
            event.target.parentElement.parentElement.className += " selected"
          }
        } else {
          id_tr = event.target.parentElement.id;
          id_tr = id_tr.charAt(id_tr.length-1)
          if(event.target.parentElement.className.includes("selected")){
            event.target.parentElement.className = ""
            // document.getElementById("but_" + id_tr).setAttribute("disabled","true");
            // document.getElementById("input_" + id_tr).setAttribute("disabled","true");
          } else {
            event.target.parentElement.className += " selected"
            // document.getElementById("but_" + id_tr).setAttribute("disabled","false");
            // document.getElementById("input_" + id_tr).setAttribute("disabled","false");
          }
        }
        console.log(id_tr)
      });
    }
    for(let i = 0; i < tr_s.length-1; i++){
      document.getElementById("but_" + (i+1)).addEventListener("click", (event) => {
        input_value = document.getElementById("input_" + (i+1)).value;
          let _input = document.getElementById("input_" + (i+1))
          let _td_left = document.getElementById("tr_"+(i+1)).getElementsByTagName("td").item(0);
          let b = document.getElementById("td_" + (i+1));
          if (input_value !== "") {
            _input.remove();
            if(input_value.includes("-")){
              _td_left.remove();
              b.setAttribute("colspan","2");
              input_value = "aaaaaa     "
              b.setAttribute("style","text-decoration:line-through;")
            }
          }
          b.innerHTML = input_value;
          total += parseInt(input_value);
          document.getElementById("td_12").innerHTML = total; 
         // b.append(c);
      })
    }
    
}

function reproduce_shuffleSound(){
  let audioEl = document.getElementById("shuffleSound");
  audioEl.play();
}

function reproduce_rollSound(){
  let audioEl = document.getElementById("rollSound");
  audioEl.play();
}

function eraseAllCanvases(){
    let div_1 = document.getElementById("div_1");
    let _length = div_1.getElementsByTagName('canvas').length;
    if(div_1.getElementsByTagName('canvas').length > 0){
        for(let i = 0; i < _length; i++){
            div_1.getElementsByTagName('canvas').item(0).remove();
        }
    }
    return _length;
}

function draw(){
    let numDices = eraseAllCanvases();
    if(firstRun){
        numDices = 5;
        firstRun = false;
    }
    for(let i = 0; i < numDices; i++){
        switch(numbers[i]) {
                case 1:
                drawFaceOne();
                break;
                case 2:
                drawFaceTwo();
                break;
                case 3:
                drawFaceThree();
                break;
                case 4:
                drawFaceFour();
                break;
                case 5:
                drawFaceFive();
                break;
                case 6:
                drawFaceSix();
                break;
        }
    }
}

function createCanvas(){
    let canvas = document.createElement('canvas');
    canvas.setAttribute("width","140px");
    canvas.setAttribute("height","140px");
    canvas.setAttribute("draggable","true")
    canvas.id = canvas_id;
    canvas_id++;
    return canvas;
}

function createContextAndRect(_canvas){
  let ctx = _canvas.getContext('2d');
  ctx.strokeStyle = "#000000";
  ctx.strokeRect(10, 20, 75, 75)
  return ctx;
}

function createDot(_ctx, _x, _y){
  _ctx.fillStyle = "#000000"
  _ctx.moveTo(_x, _y);
  _ctx.arc(_x,_y,4,0,Math.PI*2);
  _ctx.fill();
}

function drawFaceOne(){
    let canvas = createCanvas()
    let ctx = createContextAndRect(canvas)
    
    createDot(ctx,47,55);

    document.getElementById("div_1").append(canvas);
}

function drawFaceTwo(){
    let canvas = createCanvas()
    let ctx = createContextAndRect(canvas)

    createDot(ctx,27,37);
    createDot(ctx,69,77);

    document.getElementById("div_1").append(canvas);
}

function drawFaceThree(){
    let canvas = createCanvas()
    let ctx = createContextAndRect(canvas)

    createDot(ctx,23,32);
    createDot(ctx,47,54);
    createDot(ctx,72,80);
    
    document.getElementById("div_1").append(canvas);
}

function drawFaceFour(){
    let canvas = createCanvas()
    let ctx = createContextAndRect(canvas)

    createDot(ctx,27,32);
    createDot(ctx,27,82);
    createDot(ctx,70,32);
    createDot(ctx,70,82);

    document.getElementById("div_1").append(canvas);
}

function drawFaceFive(){
    let canvas = createCanvas()
    let ctx = createContextAndRect(canvas)

    createDot(ctx,26,32);
    createDot(ctx,26,82);
    createDot(ctx,48,54);
    createDot(ctx,70,32);
    createDot(ctx,70,82);

    document.getElementById("div_1").append(canvas);
}

function drawFaceSix(){
    let canvas = createCanvas()
    let ctx = createContextAndRect(canvas)

    createDot(ctx,25,35);
    createDot(ctx,49,35);
    createDot(ctx,70,35);
    createDot(ctx,25,82);
    createDot(ctx,48,82);
    createDot(ctx,71,82);

    document.getElementById("div_1").append(canvas);
}

document.addEventListener("dragstart", function(event) {
    // The dataTransfer.setData() method sets the data type and the value of the dragged data
    event.dataTransfer.setData("Text", event.target.id);
    
    // Output some text when starting to drag the p element
    // document.getElementById("demo").innerHTML = "Started to drag the p element.";
    
    // Change the opacity of the draggable element
    event.target.style.opacity = "0.4";
  });
  
  // While dragging the p element, change the color of the output text
//   document.addEventListener("drag", function(event) {
    // document.getElementById("demo").style.color = "red";
//   });
  
  // Output some text when finished dragging the p element and reset the opacity
  document.addEventListener("dragend", function(event) {
    //document.getElementById("demo").innerHTML = "Finished dragging the p element.";
    event.target.style.opacity = "1";
  });
  
  /* Events fired on the drop target */
  
  // When the draggable p element enters the droptarget, change the DIVS's border style
  document.addEventListener("dragenter", function(event) {
    if (event.target.className == "droptarget default-div" || event.target.className == "droptarget dark-div" ) {
      event.target.style.border = "3px dotted red";
    }
  });
  
  // By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
  document.addEventListener("dragover", function(event) {
    event.preventDefault();
  });
  
  // When the draggable p element leaves the droptarget, reset the DIVS's border style
  document.addEventListener("dragleave", function(event) {
    if ( event.target.className == "droptarget default-div" || event.target.className == "droptarget dark-div" ) {
      event.target.style.border = "";
    }
  });
  
  /* On drop - Prevent the browser default handling of the data (default is open as link on drop)
     Reset the color of the output text and DIV's border color
     Get the dragged data with the dataTransfer.getData() method
     The dragged data is the id of the dragged element ("drag1")
     Append the dragged element into the drop element
  */
  document.addEventListener("drop", function(event) {
    event.preventDefault();
    if ( event.target.className == "droptarget default-div" || event.target.className == "droptarget dark-div"  ) {
      //document.getElementById("demo").style.color = "";
      event.target.style.border = "";
      var data = event.dataTransfer.getData("Text");
      event.target.appendChild(document.getElementById(data));
    }
  });
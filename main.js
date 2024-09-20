var max_fps = 60;
var frame_count = 0;
var update_count =0;
var player_hp = 5;
var forearm_hp = [3,3,3,3];
var keys_pressed = {}

const worker = new Worker('worker.js');

function updateFrameRate(newFrameRate)
{
	max_fps = newFrameRate;
	document.getElementById("FrameRateLabel").innerHTML=max_fps;
}

function min(a,b){
  if (a<b)
    return a;
  return b;
}

window.onload = function() {

  var input_state ={
    mouse_clicks : [],
    order_pressed : [],
  }

  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");

  const time_step = 1000/60 ;
  let last_time = 0;
  let surplus = 0;

  var fps = 60;
  var framesThisSecond = 0;

  original_x = 320;
  original_y = 230;
  original_vx = 0.2;
  original_vy = 0;

  var general_grievous = new grievous(original_x, original_y, original_vx, original_vy);

  setInterval(function() { fps = framesThisSecond; framesThisSecond = 0; }, 1000);
  
  //draw the first frame
  requestAnimationFrame(mainLoop);
            
  //Game/simulation Loop
  // interval = 1000/fps;

  function mainLoop(current_time) {

    if (current_time < last_time + (1000 / max_fps)) {
      requestAnimationFrame(mainLoop);
      return;
    }
    processInput();

    delta = current_time - last_time;
    last_time = current_time;
    surplus += delta;

    while(surplus >= time_step)
    {
      update(time_step);
      if(frame_count < 100){
        console.log("general_grievous.x :",update_count, general_grievous.x);
        update_count += 1;
      }
      surplus -= time_step;
    }

    interpolation_factor = surplus / time_step;
    draw(interpolation_factor);
           
    requestAnimationFrame(mainLoop);
  }

  function handle_click(event){
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    input_state.mouse_clicks.push({
      p : new point(x,y)
    });
  }

  function processInput(){
    // order_pressed = [];
    canvas.addEventListener('click', handle_click);
    window.addEventListener('keydown', function(event){
      keys_pressed[event.key] = true;
      if(!input_state.order_pressed.includes(event.key))
        input_state.order_pressed.push(event.key);
      general_grievous.order_pressed = input_state.order_pressed;
    })
    window.addEventListener('keyup', function(event){
      keys_pressed[event.key] = false;
    })
  }

  function reset_state(){
    player_hp = 5;
    forearm_hp = [3,3,3,3];
    general_grievous.reset_state(original_x, original_y, original_vx, original_vy);
  }

  function handle_keyboard(){
    
    // console.log("input state", input_state.order_pressed);
    if(input_state.order_pressed[0] == "1")
    {
      reset_state();
      input_state.order_pressed = [];
    }

    if(!general_grievous.dpsable){
      input_state.order_pressed = [];
      return;
    }
    for (let i=0; i<input_state.order_pressed.length; i++)
    {
      if(general_grievous.start_index == general_grievous.end_index){
        console.log("in death state", general_grievous.end_index);
        return
      }
        
      if(input_state.order_pressed[i] == general_grievous.char_array[general_grievous.start_index]){
        // console.log(general_grievous.hp);
        // console.log("in desired function");
        // console.log("prv start index", general_grievous.start_index);
        general_grievous.hp -= 1;
        general_grievous.start_index += 1;
        // console.log("after start index", general_grievous.start_index);
      }
      else
        return;
    }
  }
  
  function handle_input(){

    result_list = []
    if(!general_grievous.dpsable){
      handle_keyboard();
      if(input_state.mouse_clicks.length > 0){
      worker.postMessage({'type' : "compute", 'data' : general_grievous, 'input_list' : input_state.mouse_clicks, 'health_list' : forearm_hp});
      input_state.mouse_clicks = [];
      
      worker.onmessage = function(event){
        result_list = event.data.result_list;
        // console.log("in main", result_list);

        result_list.forEach(element => {
          if(element == 0)
            player_hp -= 1;

          else
            forearm_hp[element - 1] -= 1;
        });

        // console.log(forearm_hp);
        general_grievous.forearm_hp = forearm_hp;
      }
      }
    }
    else{
      handle_keyboard();
      input_state.order_pressed = [];
      // console.log(order_pressed);
    }
  }

  function update(time_step) {
    handle_input();
    general_grievous.update(time_step);	
  }

  //this function mainly used for visualizing bounding boxes and debugging
  // function draw_rectangle(rect, line_width, strokestyle){
  //   context.beginPath();
  //   context.lineWidth = line_width;
  //   context.strokeStyle = strokestyle;
  //   context.moveTo(rect.p1.x, rect.p1.y);
  //   context.lineTo(rect.p2.x, rect.p2.y);
  //   context.moveTo(rect.p2.x, rect.p2.y);
  //   context.lineTo(rect.p3.x, rect.p3.y);
  //   context.moveTo(rect.p3.x, rect.p3.y);
  //   context.lineTo(rect.p4.x, rect.p4.y);
  //   context.moveTo(rect.p4.x, rect.p4.y);
  //   context.lineTo(rect.p1.x, rect.p1.y);
  //   context.stroke();
  // }
  
  function draw(interpolation_factor) {	
    
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      if(player_hp <= 0){
        context.font = '30px Ariel';
        context.fillStyle = 'red';
        context.fillText("general grievous defeats another", canvas.width/2 - 175, canvas.height/2);
      }
      
      if(!(general_grievous.hp == 0 && player_hp > 0))
        general_grievous.draw_full(interpolation_factor);
      context.restore();

      context.font = '15px Ariel';
      context.fillStyle = 'blue';

      context.fillText("FPS: " + fps, 20, 20);
      context.fillText("HP :" + player_hp, canvas.width / 2, 20);

      

      if(general_grievous.hp == 0 && player_hp > 0){
        context.font = '60px Ariel';
        context.fillStyle = 'green';
        context.fillText("you won", canvas.width/2 - 75, canvas.height/2);
      }

      else if(general_grievous.dpsable){
        context.font = '30px Ariel';
        context.fillStyle = 'blue';
        // console.log("in context text fill", general_grievous.start_index, general_grievous.start_index + 4);
        req_array = general_grievous.char_array;
        start_idx = general_grievous.start_index;
        // console.log(req_array[start_idx]);
        end_idx = min(general_grievous.end_index, general_grievous.start_index + 4);
        new_req_array = []
        for(let i=start_idx; i<end_idx;i++)
        {
          new_req_array.push(req_array[i]);
        }
        // console.log(input_state);
        context.fillText(new_req_array, canvas.width/2 - 40, canvas.height/2);
      }
      ++framesThisSecond;
      ++frame_count;
      if(frame_count < 100)
        console.log("frame: ", frame_count);
    
  }
  
}
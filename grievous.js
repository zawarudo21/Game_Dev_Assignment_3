var forearm_length = 50;
var lightsaber_length = 100;

var saved_x = 0
var saved_y = 0
var saved_velocity_x = 0
var saved_velocity_y = 0

function getRandomChar() {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  return characters.charAt(Math.floor(Math.random() * characters.length));
}

function generateRandomCharArray(length) {
  const result = [];
  for (let i = 0; i < length; i++) {
      result.push(getRandomChar());
  }
  return result;
}

function point(x,y)
{
  this.x = x;
  this.y = y;
}

point.prototype.translate_pt = function(tx, ty){
  this.x += tx;
  this.y += ty;
}

point.prototype.rotate_pt = function(angle){
  x_prime = this.x * Math.cos(angle) - this.y * Math.sin(angle);
  y_prime = this.x * Math.sin(angle) + this.y * Math.cos(angle);

  this.x = x_prime;
  this.y = y_prime;
}

point.prototype.dot_product = function(p){
  sum = 0;
  sum += this.x * p.x;
  sum += this.y * p.y;
  return sum;
}

function custom_rectangle(p1,p2,p3,p4)
{
  this.p1 = p1;
  this.p2 = p2;
  this.p3 = p3;
  this.p4 = p4;
}

custom_rectangle.prototype.rotate_rect = function(angle){
  this.p1.rotate_pt(angle);
  this.p2.rotate_pt(angle);
  this.p3.rotate_pt(angle);
  this.p4.rotate_pt(angle);
}

custom_rectangle.prototype.translate_rect = function(x1,y1){
  this.p1.translate_pt(x1, y1);
  this.p2.translate_pt(x1, y1);
  this.p3.translate_pt(x1, y1);
  this.p4.translate_pt(x1, y1);
}

custom_rectangle.prototype.check_inside = function(p){
  vector_ab = new point(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
  vector_am = new point(p.x - this.p1.x, p.y - this.p1.y);
  vector_ad = new point(this.p4.x - this.p1.x, this.p4.y - this.p1.y);

  dp1 = vector_ab.dot_product(vector_am);
  dp2 = vector_ab.dot_product(vector_ab);

  dp3 = vector_ad.dot_product(vector_am);
  dp4 = vector_ad.dot_product(vector_ad);

  if(dp1 >= 0 && dp1 <= dp2 && dp3 >=0 && dp3 <= dp4)
    return true;
  return false;
}

function grievous(x, y, vx, vy)
  {
    this.x = x;
    this.y = y;
    this.velocity_x = vx;
    this.velocity_y = vy;

    this.upper_left_forearm_angle = Math.PI * 3 / 2;
    this.lower_left_forearm_angle = Math.PI * 1 / 2;

    this.upper_left_forearm_velocity = - 1 * Math.PI / 60;
    this.lower_left_forearm_velocity = 1 * Math.PI / 60;

    this.upper_right_forearm_angle = Math.PI * 1 / 2;
    this.lower_right_forearm_angle = -1 * Math.PI * 1 / 2;

    this.upper_right_forearm_velocity = 1 * Math.PI / 60;
    this.lower_right_forearm_velocity = -1 * Math.PI / 60;

    this.lightsaber1_pos = Math.PI;

    this.lightsaber2_pos = Math.PI/2;

    this.lightsaber3_pos = Math.PI;
    this.lightsaber4_pos = Math.PI/ 2;
    this.forearm_hp = [3,3,3,3];

    this.hp = 10;
    this.char_array = generateRandomCharArray(this.hp);
    this.order_pressed = [];
    this.dpsable = false;
    this.time_started = false;
    this.start_index = 0;
    this.end_index = 10;
  }

  grievous.prototype.save_state = function(){
    saved_x = this.x
    saved_y = this.y
    saved_velocity_x = this.velocity_x
    saved_velocity_y = this.velocity_y
  }

  grievous.prototype.load_state = function(){
    this.x = saved_x
    this.y = saved_y
    this.velocity_x = saved_velocity_x
    this.velocity_y = saved_velocity_y
    this.forearm_hp = [3,3,3,3]

    this.upper_left_forearm_angle = Math.PI * 3 / 2;
    this.lower_left_forearm_angle = Math.PI * 1 / 2;

    this.upper_left_forearm_velocity = - 1 * Math.PI / 60;
    this.lower_left_forearm_velocity = 1 * Math.PI / 60;

    this.upper_right_forearm_angle = Math.PI * 1 / 2;
    this.lower_right_forearm_angle = -1 * Math.PI * 1 / 2;

    this.upper_right_forearm_velocity = 1 * Math.PI / 60;
    this.lower_right_forearm_velocity = -1 * Math.PI / 60;

    this.lightsaber1_pos = Math.PI;

    this.lightsaber2_pos = Math.PI/2;

    this.lightsaber3_pos = Math.PI;
    this.lightsaber4_pos = Math.PI/ 2;
  }

  grievous.prototype.reset_state = function(x, y, vx, vy){
    this.x = x;
    this.y = y;
    this.velocity_x = vx;
    this.velocity_y = vy;

    this.upper_left_forearm_angle = Math.PI * 3 / 2;
    this.lower_left_forearm_angle = Math.PI * 1 / 2;

    this.upper_left_forearm_velocity = - 1 * Math.PI / 60;
    this.lower_left_forearm_velocity = 1 * Math.PI / 60;

    this.upper_right_forearm_angle = Math.PI * 1 / 2;
    this.lower_right_forearm_angle = -1 * Math.PI * 1 / 2;

    this.upper_right_forearm_velocity = 1 * Math.PI / 60;
    this.lower_right_forearm_velocity = -1 * Math.PI / 60;

    this.lightsaber1_pos = Math.PI;

    this.lightsaber2_pos = Math.PI/2;

    this.lightsaber3_pos = Math.PI;
    this.lightsaber4_pos = Math.PI/ 2;
    this.forearm_hp = [3,3,3,3];

    this.hp = 10;
    this.char_array = generateRandomCharArray(this.hp);
    this.order_pressed = [];
    this.dpsable = false;
    this.start_index = 0;
    this.end_index = 10;
  }

  grievous.prototype.draw_line = function(line_width, strokestyle, move_to_x, move_to_y, line_to_x, line_to_y){
    context.beginPath();
    context.lineWidth = line_width;
    context.strokeStyle = strokestyle;
    context.moveTo(move_to_x, move_to_y);
    context.lineTo(line_to_x, line_to_y);
    context.stroke();
  }

  grievous.prototype.rotate_pts = function(angle, x, y){
    x_prime = x * Math.cos(angle) - y * Math.sin(angle);
    y_prime = x * Math.sin(angle) + y* Math.cos(angle);

    return [x_prime, y_prime];
  }

  grievous.prototype.translate_pts = function(distance_x, distance_y, x, y){
    x_prime = x + distance_x;
    y_prime = y + distance_y;

    return [x_prime, y_prime];
  }
  
  grievous.prototype.draw_head = function() {
    context.translate(0, -130);
    context.beginPath();
    context.fillStyle = "black";
    context.arc(0, 0, 30, 0, Math.PI * 2, true);
    context.fill(); //fill the circle 
    context.translate(0, 130);
  }
  
  grievous.prototype.draw_body = function() {
    this.draw_line(6, "black", 0, -100, 0, 0);
  }
  
  grievous.prototype.draw_legs = function() {
    this.draw_line(6, "black", 0, 0, -50, 100);
    this.draw_line(6, "black", 0, 0, 50, 100);
  }
  
  grievous.prototype.draw_lightsaber = function(color, angle)
  {
    context.translate(forearm_length, 0);
    context.rotate(angle);

    this.draw_line(4, color, 0, 0, lightsaber_length, 0);
    this.draw_line(2, color, lightsaber_length/10, lightsaber_length/10, lightsaber_length/10, -1 * lightsaber_length/10);
  }

  grievous.prototype.draw_arms = function() {
    this.draw_left_arms();
    this.draw_right_arms();
  }
  
  grievous.prototype.draw_left_arms = function() {
    if(this.forearm_hp[0] > 0)
      this.draw_upper_left_arm();
    if(this.forearm_hp[1] > 0)
      this.draw_lower_left_arm();
  }

  grievous.prototype.draw_right_arms = function() {
    if(this.forearm_hp[2] > 0)
      this.draw_upper_right_arm();
    if(this.forearm_hp[3] > 0)
      this.draw_lower_right_arm();
  }
  
  grievous.prototype.draw_upper_left_arm = function() {
    this.draw_line(6, 'black', 0, -80, -50, -100);
    context.save();
    this.draw_upper_left_forearm();
    context.restore();
  }
  
  grievous.prototype.draw_upper_left_forearm = function()
  {
    translate_by_x = -50;
    translate_by_y = -100;
    context.translate(translate_by_x, translate_by_y);
    context.rotate(this.interpolated_upper_left_forearm_angle);

    this.draw_line(6, 'gray', 0, 0, forearm_length, 0);

    context.save();
    this.draw_lightsaber("blue", this.interpolated_lightsaber1_pos);
    context.restore();
  }

  grievous.prototype.draw_lower_left_arm = function() {
    this.draw_line(6, 'black', 0, -80, -80, -50);
    context.save();
    this.draw_lower_left_forearm();
    context.restore();
  }
  
  grievous.prototype.draw_lower_left_forearm = function()
  {
    translate_by_x = -80;
    translate_by_y = -50;

    context.translate(translate_by_x, translate_by_y);
    
    context.rotate(this.interpolated_lower_left_forearm_angle);
    this.draw_line(6, 'gray', 0, 0, forearm_length, 0);
    
    context.save();
    this.draw_lightsaber("green", this.interpolated_lightsaber2_pos);
    context.restore();
  }
  
  grievous.prototype.draw_upper_right_arm = function() {
    this.draw_line(6, 'black', 0, -80, 50, -100);
    
    context.save();
    this.draw_upper_right_forearm();
    context.restore();
  }
  
  grievous.prototype.draw_upper_right_forearm = function(){
    translate_by_x = 50;
    translate_by_y = -100;
    
    context.translate(translate_by_x, translate_by_y);
    
    context.rotate(this.interpolated_upper_right_forearm_angle);
    this.draw_line(6, 'gray', 0, 0, forearm_length, 0);
    
    context.save();
    this.draw_lightsaber("green", this.interpolated_lightsaber3_pos);
    context.restore();
  }

  grievous.prototype.draw_lower_right_arm = function() {
    this.draw_line(6, 'black', 0, -80, 80, -50);
    
    context.save();
    this.draw_lower_right_forearm();
    context.restore();
  }
  
  grievous.prototype.draw_lower_right_forearm = function(){
    // context.translate(80, -50);
    translate_by_x = 80;
    translate_by_y = -50;
    context.translate(translate_by_x, translate_by_y);
    context.rotate(this.interpolated_lower_right_forearm_angle);
    this.draw_line(6, 'gray', 0, 0, forearm_length, 0);
    
    context.save();
    this.draw_lightsaber("blue", this.interpolated_lightsaber4_pos);
    context.restore();
  }

  grievous.prototype.update_upper_left = function(){
    this.lightsaber1_bounding_box = new custom_rectangle(new point(10,10), new point(10,-10), new point(lightsaber_length, -10), new point(lightsaber_length, 10));
    this.upper_left_forearm_bounding_box = new custom_rectangle(new point(0,20), new point(0,-20), new point(forearm_length,-20), new point(forearm_length,20));
    
    this.lightsaber1_bounding_box.rotate_rect(this.lightsaber1_pos);
    this.lightsaber1_bounding_box.translate_rect(forearm_length,0);
    this.lightsaber1_bounding_box.rotate_rect(this.upper_left_forearm_angle);
    this.lightsaber1_bounding_box.translate_rect(-50 + this.x, -100 + this.y);

    this.upper_left_forearm_bounding_box.rotate_rect(this.upper_left_forearm_angle);
    this.upper_left_forearm_bounding_box.translate_rect(-50 + this.x, -100 + this.y);

  }

  grievous.prototype.update_lower_left = function(){
    this.lightsaber2_bounding_box = new custom_rectangle(new point(10,10), new point(10,-10), new point(lightsaber_length, -10), new point(lightsaber_length, 10));
    this.lower_left_forearm_bounding_box = new custom_rectangle(new point(0,20), new point(0,-20), new point(forearm_length,-20), new point(forearm_length,20));
    
    this.lightsaber2_bounding_box.rotate_rect(this.lightsaber2_pos);
    this.lightsaber2_bounding_box.translate_rect(forearm_length,0);
    this.lightsaber2_bounding_box.rotate_rect(this.lower_left_forearm_angle);
    this.lightsaber2_bounding_box.translate_rect(-80 + this.x, -50 + this.y);

    this.lower_left_forearm_bounding_box.rotate_rect(this.lower_left_forearm_angle);
    this.lower_left_forearm_bounding_box.translate_rect(-80 + this.x, -50 + this.y);
  }

  grievous.prototype.update_upper_right = function(){
    this.lightsaber3_bounding_box = new custom_rectangle(new point(10,10), new point(10,-10), new point(lightsaber_length, -10), new point(lightsaber_length, 10));
    this.upper_right_forearm_bounding_box = new custom_rectangle(new point(0,20), new point(0,-20), new point(forearm_length,-20), new point(forearm_length,20));
    
    this.lightsaber3_bounding_box.rotate_rect(this.lightsaber3_pos);
    this.lightsaber3_bounding_box.translate_rect(forearm_length,0);
    this.lightsaber3_bounding_box.rotate_rect(this.upper_right_forearm_angle);
    this.lightsaber3_bounding_box.translate_rect(50 + this.x, -100 + this.y);

    this.upper_right_forearm_bounding_box.rotate_rect(this.upper_right_forearm_angle);
    this.upper_right_forearm_bounding_box.translate_rect(50 + this.x, -100 + this.y);

  }

  grievous.prototype.update_lower_right = function(){
    this.lightsaber4_bounding_box = new custom_rectangle(new point(10,10), new point(10,-10), new point(lightsaber_length, -10), new point(lightsaber_length, 10));
    this.lower_right_forearm_bounding_box = new custom_rectangle(new point(0,20), new point(0,-20), new point(forearm_length,-20), new point(forearm_length,20));
    
    this.lightsaber4_bounding_box.rotate_rect(this.lightsaber4_pos);
    this.lightsaber4_bounding_box.translate_rect(forearm_length,0);
    this.lightsaber4_bounding_box.rotate_rect(this.lower_right_forearm_angle);
    this.lightsaber4_bounding_box.translate_rect(80 + this.x, -50 + this.y);

    this.lower_right_forearm_bounding_box.rotate_rect(this.lower_right_forearm_angle);
    this.lower_right_forearm_bounding_box.translate_rect(80 + this.x, -50 + this.y);

  }

  // grievous.prototype.draw_rectangle()

  // grievous.prototype.draw_bounding_boxes = function(){
  //   X_min = Math.min(this.lightsaber1_bounding_box[0], this.lightsaber1_bounding_box[2]);
  //   Y_min = Math.min(this.lightsaber1_bounding_box[1], this.lightsaber1_bounding_box[3]);

  //   width = Math.
  // }
  
  grievous.prototype.draw_full = function(interpolation_factor) {
    this.interpolation_factor = interpolation_factor;
    this.interpolated_x = this.prev_x + (this.x - this.prev_x) * this.interpolation_factor;
    this.interpolated_y = this.prev_y + (this.y - this.prev_y) * this.interpolation_factor;

    this.interpolated_upper_left_forearm_angle = this.prev_upper_left_forearm_angle + (this.upper_left_forearm_angle - this.prev_upper_left_forearm_angle) * this.interpolation_factor;
    this.interpolated_lower_left_forearm_angle = this.prev_lower_left_forearm_angle + (this.lower_left_forearm_angle - this.prev_lower_left_forearm_angle) * this.interpolation_factor;
    this.interpolated_upper_right_forearm_angle = this.prev_upper_right_forearm_angle + (this.upper_right_forearm_angle - this.prev_upper_right_forearm_angle) * this.interpolation_factor;
    this.interpolated_lower_right_forearm_angle = this.prev_lower_right_forearm_angle + (this.lower_right_forearm_angle - this.prev_lower_right_forearm_angle) * this.interpolation_factor;

    this.interpolated_lightsaber1_pos = this.prev_lightsaber1_pos + (this.lightsaber1_pos - this.prev_lightsaber1_pos) * this.interpolation_factor;
    this.interpolated_lightsaber2_pos = this.prev_lightsaber2_pos + (this.lightsaber2_pos - this.prev_lightsaber2_pos) * this.interpolation_factor;
    this.interpolated_lightsaber3_pos = this.prev_lightsaber3_pos + (this.lightsaber3_pos - this.prev_lightsaber3_pos) * this.interpolation_factor;
    this.interpolated_lightsaber4_pos = this.prev_lightsaber4_pos + (this.lightsaber4_pos - this.prev_lightsaber4_pos) * this.interpolation_factor;

    context.translate(this.interpolated_x, this.interpolated_y);

    context.save();
    this.draw_head();
    context.restore();

    this.draw_arms();
    this.draw_body();
    this.draw_legs();
    // this.lightsaber1_bounding_box = [x1[0] - this.x, x1[1] - this.y, x2[0] - this.x, x2[1] - this.y];
  }
  
  grievous.prototype.update = function(timestep) {

    check_wounded = (this.forearm_hp.every(function (element){
      return element == 0;
    }))

    if(check_wounded && !this.dpsable)
    {
      this.dpsable = true
      this.save_state()
      if(!this.time_started)
      {
        this.dps_timer_start = Date.now();
        this.time_started = true;
      }
    }

    if(!this.dpsable)
    {
      this.prev_x = this.x;
      this.prev_y = this.y;
      this.prev_upper_left_forearm_angle = this.upper_left_forearm_angle;
      this.prev_lower_left_forearm_angle = this.lower_left_forearm_angle;
      this.prev_upper_right_forearm_angle = this.upper_right_forearm_angle;
      this.prev_lower_right_forearm_angle = this.lower_right_forearm_angle;

      this.prev_lightsaber1_pos = this.lightsaber1_pos;
      this.prev_lightsaber2_pos = this.lightsaber2_pos;
      this.prev_lightsaber3_pos = this.lightsaber3_pos;
      this.prev_lightsaber4_pos = this.lightsaber4_pos;

      this.x += this.velocity_x * timestep;
      this.y += this.velocity_y * timestep;

      this.upper_left_forearm_angle += this.upper_left_forearm_velocity * timestep / 60;
      this.lightsaber1_pos += Math.PI * timestep/ 1200;

      this.lower_left_forearm_angle += this.lower_left_forearm_velocity * timestep/60;
      this.lightsaber2_pos -= Math.PI * timestep / 1000;

      this.upper_right_forearm_angle += this.upper_right_forearm_velocity * timestep/60;
      this.lightsaber3_pos -= Math.PI * timestep / 1000;

      this.lower_right_forearm_angle += this.lower_right_forearm_velocity * timestep/ 60 ;
      this.lightsaber4_pos += Math.PI * timestep / 1200;

      this.update_upper_left();
      this.update_lower_left();
      this.update_upper_right();
      this.update_lower_right();
    }
    else
    { 
      curr_timer = Date.now()
      elapsed_time = curr_timer - this.dps_timer_start
      // print("elapsed_time", elapsed_time)
      // console.log("elapsed_time: ", elapsed_time)
      if(elapsed_time > 2000){
        this.dpsable = false;
        this.time_started = false;
        this.load_state()
        forearm_hp = [3,3,3,3]
      }

    }

    if(this.x - 100 < 0){
    this.velocity_x *= -1;
    }
    
    if(this.x + 100 > canvas.width){
    this.velocity_x *= -1;
    }
    
    if(this.y - 150 < 0){
    this.velocity_y *= -1;
    }

    if(this.y + 130 > canvas.height){
    this.velocity_y *= -1;
    }

    if(this.upper_left_forearm_angle > Math.PI * 3 /2 || this.upper_left_forearm_angle < Math.PI / 2)
        this.upper_left_forearm_velocity *= -1;

    if(this.lower_left_forearm_angle > Math.PI * 3 /2 || this.lower_left_forearm_angle < Math.PI / 2)
        this.lower_left_forearm_velocity *= -1;

    if(this.upper_right_forearm_angle > Math.PI * 1 /2 || this.upper_right_forearm_angle < -1 * Math.PI / 2)
        this.upper_right_forearm_velocity *= -1;

    if(this.lower_right_forearm_angle > Math.PI * 1 /2 || this.lower_right_forearm_angle < -1 * Math.PI / 2)
        this.lower_right_forearm_velocity *= -1;
  }
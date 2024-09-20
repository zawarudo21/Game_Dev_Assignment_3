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

self.onmessage = function(event){
    // console.log("received msg from main", event.data);

    result = check_collisions(event.data);
    // console.log("result in worker", result);
    self.postMessage({result_list : result});
}

function check_collisions(data){

    // console.log(data);
    general_grievous = data.data;
    input_state = data.input_list;
    health_state = data.health_list;

    // console.log("in worker", general_grievous, input_state);

    result_list= [];

    input_state.forEach(click_point => {
    if(health_state[0] > 0 && custom_check_inside(general_grievous.lightsaber1_bounding_box, click_point.p))
        result_list.push(0);
    else if(health_state[1] > 0 && custom_check_inside(general_grievous.lightsaber2_bounding_box, click_point.p))
        result_list.push(0);
    else if(health_state[2] > 0 && custom_check_inside(general_grievous.lightsaber3_bounding_box, click_point.p))
        result_list.push(0);
    else if(health_state[3] > 0 && custom_check_inside(general_grievous.lightsaber4_bounding_box, click_point.p))
        result_list.push(0);
    else if(health_state[0] > 0 && custom_check_inside(general_grievous.upper_left_forearm_bounding_box, click_point.p))
        result_list.push(1)
    else if(health_state[1] > 0 && custom_check_inside(general_grievous.lower_left_forearm_bounding_box, click_point.p))
        result_list.push(2);
    else if(health_state[2] > 0 && custom_check_inside(general_grievous.upper_right_forearm_bounding_box, click_point.p))
        result_list.push(3);
    else if(health_state[3] > 0 && custom_check_inside(general_grievous.lower_right_forearm_bounding_box, click_point.p))
        result_list.push(4);
    else
        result_list.push(0);
    });

    // console.log("initial result_list", result_list);
    return result_list;
}

function custom_check_inside(rect, p){
    p1 = rect.p1;
    p2 = rect.p2;
    p4 = rect.p4;
    vector_ab = new point(p2.x - p1.x, p2.y - p1.y);
    vector_am = new point(p.x - p1.x, p.y - p1.y);
    vector_ad = new point(p4.x - p1.x, p4.y - p1.y);
  
    dp1 = vector_ab.dot_product(vector_am);
    dp2 = vector_ab.dot_product(vector_ab);
  
    dp3 = vector_ad.dot_product(vector_am);
    dp4 = vector_ad.dot_product(vector_ad);
  
    if(dp1 >= 0 && dp1 <= dp2 && dp3 >=0 && dp3 <= dp4)
      return true;
    return false;
}
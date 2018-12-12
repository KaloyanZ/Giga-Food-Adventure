var global = {
	resources: {
		food: {
			name: "Food",
			amount: 0,
			storage: 10,
			efficiency: 2,
			luck: 0.2,
			fortune: 0.2,
			progress_min: 0,
			progress_act: 0,
			progress_max: 100,
			progress_int: 10
		},
		wood: {
			name: "Wood",
			amount: 0,
			storage: 10,
			efficiency: 1,
			luck: 0.3,
			fortune: 0.2,
			progress_min: 0,
			progress_act: 0,
			progress_max: 100,
			progress_int: 10
		},
		metal: {
			name: "Metal",
			amount: 0,
			storage: 5,
			efficiency: 1,
			luck: 0.3,
			fortune: 0.5,
			progress_min: 0,
			progress_act: 0,
			progress_max: 100,
			progress_int: 5
		}
	},
	player: {
		level: {
            amount: 1,
            storage: 10
        },
        experience: {
            amount: 0,
            storage: 15,
            required_array: [0, 15, 30, 50, 80, 120, 175, 250, 400, 600, 900, 1400, 2000]
        },
        health: {
			amount: 10,
			storage: 10
		},
		hunger: {
			name: "Hunger",
			amount: 100,
			storage: 100,
			efficiency: 8,
			tick_decay: 0.2,
			progress_min: 0,
			progress_act: 0,
			progress_max: 100,
			progress_int: 20
		},
		stats: {
			strength: 2,
			dexterity: 2,
			intelligence: 2
		},
		busy: false,
		ready_to_set_out: false,
		activity: "Idle",
		activity_type: "Foraging"
	},
	upgrades: {
		
	},
    alive: true,
    html_vars: {
        level_up_flash: {
            amount: 0,
            storage: 15,
            timer: 100,
            color: "rgb(200,204,101)",
            original_color: "rgb(156,204,101)"
        }
    },
	timer_interval: 200
}

var intro_text_progress = 0;
var intro_div = document.getElementById("introText");
function intro_text(){
    switch(intro_text_progress){
        case 0:
            intro_div.innerHTML += "<br><br>...";
            break;
        case 1:
            intro_div.innerHTML += "<br><br>Feeling tufts of grass soft under your body, a steady breeze washes over your right side.";
            break;
        case 2:
            intro_div.innerHTML += "<br><br>You struggle to open your eyes. Peaceful greens, modest browns, and expansive blues quickly fill your vision.";
            break;
        case 3:
            intro_div.innerHTML += "<br><br>You appear to be in a forest.";
            break;
        case 4:
            intro_div.innerHTML += "<br><br>You can't quite remember how you got here, and trying to only serves to give you a headache. Best not worry about it for now.";
            break;
        case 5:
            intro_div.innerHTML += "<br><br>Regardless of how you got here, you know one thing for certain.";
            break;
        case 6:
            intro_div.innerHTML += "<br><br>You will be hungry soon.";
            document.getElementById("introNextButton").style.display = "none";
            document.getElementById("startButton").style.display = "block";
            break;
            
    }
    intro_text_progress++;
}

function pause_game()
{
	if(global.player.alive){
        if(isPaused){
            isPaused = false;
            document.getElementById("pauseButton").innerHTML = "PAUSE";
        }else{
            isPaused = true;
            document.getElementById("pauseButton").innerHTML = "UNPAUSE";
        }
    }
}

function start_game()
{
	document.getElementById("startButton").style.display = "none";
    document.getElementById("introText").style.display = "none";
	document.getElementById("mainGame").style.visibility = "visible";
	document.getElementById("pauseButton").style.visibility = "visible";
	init();
	pause_game();
}

//window.onload = init();

function init()
{
	var r = global.resources;
	var p = global.player;
    
	r.food.amount = 0;
	r.wood.amount = 0;
	r.metal.amount = 0;
	
	r.food.storage = 10;
	r.wood.storage = 10;
	r.metal.storage = 10;
	
    p.level.amount = 1;
    p.level.storage = 10;
    p.experience.amount = 0;
    p.experience.storage = p.experience.required_array[p.level.amount];
	p.health.amount = 10;
	p.health.storage = 10;
	p.hunger.amount = 100;
	p.hunger.storage = 100;
	p.busy = false;
	p.ready_to_set_out = false;
	p.activity = "Idle";
    p.alive = true;
	
	//var timer = setInterval(function(){update();}, global.timer_interval);
	
	//document.getElementById("Food").innerHTML = prettify(global.resources.food.amount) + " / " + prettify(global.resources.food.storage);


	document.getElementById("food").innerHTML = prettify(global.resources.food.amount)
	document.getElementById("foodstorage").innerHTML = prettify(global.resources.food.storage);
	document.getElementById("wood").innerHTML = prettify(global.resources.wood.amount);
	document.getElementById("woodstorage").innerHTML = prettify(global.resources.wood.storage);
	document.getElementById("metal").innerHTML = prettify(global.resources.metal.amount);
	document.getElementById("metalstorage").innerHTML = prettify(global.resources.metal.storage);
	
    document.getElementById("level").innerHTML = prettify(global.player.level.amount);
    document.getElementById("experience").innerHTML = prettify(global.player.experience.amount);
    document.getElementById("experiencestorage").innerHTML = prettify(global.player.experience.storage);
	document.getElementById("health").innerHTML = prettify(global.player.health.amount);
	document.getElementById("healthstorage").innerHTML = prettify(global.player.health.storage);
	document.getElementById("hunger").innerHTML = prettify(global.player.hunger.amount);
	document.getElementById("hungerstorage").innerHTML = prettify(global.player.hunger.storage);
	document.getElementById("activity").innerHTML = global.player.activity;
	
	console.log("Initilization Complete.");
}

var progbar_activities = {
	element: document.getElementById("progbarActivities"),
	element_back: document.getElementById("progbarActivitiesBack"),
	width: 0
}

function update()
{
	//console.log("Update: tick");
	if (global.player.busy == false && global.player.ready_to_set_out == true){
		global.player.busy = true;
		global.player.ready_to_set_out = false;
		console.log("Update: Not busy and ready to set out!");
	}
	
	if (global.player.busy == true){
		do_activity(global.player.activity);
	}
	global.player.hunger.amount -= global.player.hunger.tick_decay;
	html_update("hunger");
    if (global.player.hunger.amount <= 0){
        die();
    }
    if (global.player.level.amount < global.player.level.storage && global.player.experience.amount >= global.player.experience.storage){
        level_up();
    }
}

//MAIN GAME TIMER
var isPaused = true;
var time = new Date();
var offset = 0;
var t = window.setInterval(function(){
	if(!isPaused){
		var milisec = offset + (new Date()).getTime() - time.getTime();
		//console.log(parseInt(milisec / 1000) + "s " + (milisec % 1000));
		update();
	}
}, global.timer_interval);

function set_out(activity)
{
	if(!isPaused){
		if (global.player.busy == false){
			global.player.activity = activity;
			global.player.ready_to_set_out = true;
			html_update("activity");
		}
		console.log("Set out to do: " + activity);
	}
}

function do_activity(activity)
{
	switch (activity){
		case "Foraging for Food":
			var r = global.resources.food;
			global.player.activity_type = "Foraging";
			break;
		case "Foraging for Wood":
			var r = global.resources.wood;
			global.player.activity_type = "Foraging";
			break;
		case "Foraging for Metal":
			var r = global.resources.metal;
			global.player.activity_type = "Foraging";
			break;
		case "Eating Food":
			var r = global.player.hunger;
			global.player.activity_type = "Eating";
		case "Idle":
			break;
	}
	switch(global.player.activity_type){
		case "Foraging":
			if(r.amount >= r.storage){
				alert_update("red", "Not enough storage!");
				finish_activity();
			}else{
				console.log("Progressing activity: " + activity);
				progress_activity(activity);
			}
			break;
		case "Eating":
			if(r.amount >= r.storage || global.resources.food.amount < 1){
				alert_update("red", "Not enough storage or food!");
				finish_activity();
			}else{
				console.log("Progressing activity: " + activity);
				progress_activity(activity);
			}
			break;
	}
}

function progress_activity(activity)
{
	switch (activity){
		case "Foraging for Food":
			var r = global.resources.food;
			break;
		case "Foraging for Wood":
			var r = global.resources.wood;
			break;
		case "Foraging for Metal":
			var r = global.resources.metal;
			break;
		case "Eating Food":
			var r = global.player.hunger;
			break;
	}
	
	if(r.progress_act + r.progress_int >= r.progress_max){
		r.progress_act = r.progress_max;
	}else{
		r.progress_act += r.progress_int;
	}
	if(r.progress_act == r.progress_max){
		reward_activity(activity);
		finish_activity();
		r.progress_act = r.progress_min;
		//progbar_activities.width = r.progress_act;
	}
	progbar_activities.width = r.progress_act;
	progbar_activities.element.style.width = prettify(progbar_activities.width) + "%";
	progbar_activities.element.innerHTML = " " + prettify(progbar_activities.width) + "%";
	if(progbar_activities.width != 0){
		progbar_activities.element.style.visibility = "visible";
		console.log("visible");
	}else{
		progbar_activities.element.style.visibility = "hidden";
		console.log("hidden");
	}
}

function finish_activity()
{
	console.log("Finishing activity: " + global.player.activity);
	global.player.activity = "Idle";
	html_update("activity");
	global.player.busy = false;
	global.player.ready_to_set_out = false;
	console.log("Finished activity: " + global.player.activity);
}

function reward_activity(activity)
{
	switch (activity){
		case "Foraging for Food":
			add_reward(global.resources.food, true);
            global.player.experience.amount += 3;
			html_update("food");
			break;
		case "Foraging for Wood":
			add_reward(global.resources.wood, true);
            global.player.experience.amount += 3;
			html_update("wood");
			break;
		case "Foraging for Metal":
			add_reward(global.resources.metal, true);
            global.player.experience.amount += 3;
			html_update("metal");
			break;
		case "Eating Food":
			add_reward(global.player.hunger, false);
            global.player.experience.amount += 2;
			global.resources.food.amount -= 1;
			html_update("hunger");
			html_update("food");
			break;
	}
    html_update("experience");
	console.log("Rewarding activity: " + activity);
}

function add_reward(r, has_luck)
{
	if (has_luck){
		var bonus = luck_reward_multiplier(r.luck, r.fortune);
		console.log(bonus);
	}else{var bonus=1}
	if (r.amount + r.efficiency * bonus >= r.storage){
		alert_update("green", "You capped your storages with " + prettify(r.storage - r.amount) + " " + r.name + "!");
		r.amount = r.storage
	}else{
		r.amount += r.efficiency * bonus
		if(bonus == 1){
			alert_update("green", "You gained " + prettify(r.efficiency * bonus) + " " + r.name + "!");
			console.log(bonus);
		}else{
			alert_update("lucky green", "You gained " + prettify(r.efficiency) + " + " + prettify(r.efficiency * bonus - r.efficiency) + " " + r.name + "! Lucky!");
			console.log(bonus);
		}
		
	}
}

function luck_reward_multiplier(luck, fortune)
{
	var final_mult = 1
	var temp_luck = luck
	while (luck > 0)
	{
		console.log(luck + " " + fortune);
		if (luck > 1){
			temp_luck = luck - Math.floor(luck);
		}else{
			temp_luck = luck;
		}
		if (temp_luck > Math.random()){
				final_mult += fortune;
				console.log("Lucky!");
			}
		luck -= 1;
	}
	return final_mult
}

function die()
{
    pause_game();
    global.player.alive = false;
    alert_update("red", "You have died! Oh no!");
}

function level_up()
{
    global.player.level.amount++;
    global.player.experience.amount -= global.player.experience.storage;
    global.player.experience.storage = global.player.experience.required_array[global.player.level.amount];
    var ele = document.getElementById("player");
    var original_color = "rgb(156,204,101)";
    console.log(original_color);
    html_update("experience");
    var level_up_visual = window.setInterval(
        function(){
            if(global.html_vars.level_up_flash.amount <= global.html_vars.level_up_flash.storage){
                if(global.html_vars.level_up_flash.amount % 2 == 0){
                    ele.style.backgroundColor = global.html_vars.level_up_flash.color;
                }else{
                    ele.style.backgroundColor = global.html_vars.level_up_flash.original_color;
                }
                global.html_vars.level_up_flash.amount++;
            }else{
                window.clearInterval(level_up_visual);
                global.html_vars.level_up_flash.amount = 0;
            }
        }, global.html_vars.level_up_flash.timer);
}

function html_update(what)
{
	switch (what){
		case "hunger":
			document.getElementById("hunger").innerHTML = prettify(global.player.hunger.amount);
			document.getElementById("hungerstorage").innerHTML = prettify(global.player.hunger.storage);
			break;
		case "food":
			document.getElementById("food").innerHTML = prettify(global.resources.food.amount);
			document.getElementById("foodstorage").innerHTML = prettify(global.resources.food.storage);
			break;
		case "wood":
			document.getElementById("wood").innerHTML = prettify(global.resources.wood.amount);
			document.getElementById("woodstorage").innerHTML = prettify(global.resources.wood.storage);
			break;
		case "metal":
			document.getElementById("metal").innerHTML = prettify(global.resources.metal.amount);
			document.getElementById("metalstorage").innerHTML = prettify(global.resources.metal.storage);
			break;
		case "activity":
			document.getElementById("activity").innerHTML = global.player.activity;
			break;
        case "experience":
            document.getElementById("experience").innerHTML = prettify(global.player.experience.amount);
            document.getElementById("experiencestorage").innerHTML = prettify(global.player.experience.storage);
            document.getElementById("level").innerHTML = prettify(global.player.level.amount);
            break;
	}
}

function alert_update(color, text)
{
	//document.getElementById("alertText").style.backgroundColor = "white";
    document.getElementById("alertText").innerHTML = text;
	switch (color){
		case "green":
			color = "#40b440";
            secondary_color = "#60d460";
			break;
		case "lucky green":
			color = "#40c440"
            secondary_color = "#60d460";
			break;
		case "red":
			color = "#f44336";
            secondary_color = "#ff6356";
			break;
		case "purple":
			color = "#4444f4";
            secondary_color = "#6464ff";
			break;
        case "white":
            color = "#ffffff";
            secondary_color = "#ffffff";
            break;
        case "blue":
            color = "#4080ff";
            secondary_color = "#60a0ff";
	}
	document.getElementById("alertText").style.backgroundColor = secondary_color;
    setTimeout(function(){document.getElementById("alertText").style.backgroundColor = color;},200);
	// #4336f4 purple
	// #f44336 red
	// #40c440 green
}

function prettify(input)
{
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

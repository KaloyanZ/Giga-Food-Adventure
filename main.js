var global = {
	resources: {
		food: {
			amount: 0,
			storage: 10,
			efficiency: 2,
			luck: 0.2,
			fortune: 0.2,
			progress_min: 0,
			progress_act: 0,
			progress_max: 100,
			progress_int: 20
		},
		wood: {
			amount: 0,
			storage: 10,
			efficiency: 3,
			luck: 0.3,
			fortune: 0.2,
			progress_min: 0,
			progress_act: 0,
			progress_max: 100,
			progress_int: 20
		},
		metal: {
			amount: 0,
			storage: 5,
			efficiency: 1,
			luck: 0.4,
			fortune: 0.5,
			progress_min: 0,
			progress_act: 0,
			progress_max: 100,
			progress_int: 10
		}
	},
	player: {
		health: {
			amount: 10,
			storage: 10
		},
		hunger: {
			amount: 100,
			storage: 100,
			efficiency: 8,
			tick_decay: 0.1,
			progress_min: 0,
			progress_act: 0,
			progress_max: 100,
			progress_int: 25
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
	timer_interval: 200,
	
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

function pause_game()
{
	if(isPaused){
		isPaused = false;
		document.getElementById("pauseButton").innerHTML = "PAUSE";
	}else{
		isPaused = true;
		document.getElementById("pauseButton").innerHTML = "UNPAUSE";
	}
}

function start_game()
{
	//document.getElementById("startGame").style.display = "none";
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
	
	p.health.amount = 10;
	p.health.storage = 10;
	p.hunger.amount = 100;
	p.hunger.storage = 100;
	p.busy = false;
	p.ready_to_set_out = false;
	p.activity = "Idle";
	
	//var timer = setInterval(function(){update();}, global.timer_interval);
	
	//document.getElementById("Food").innerHTML = prettify(global.resources.food.amount) + " / " + prettify(global.resources.food.storage);


	document.getElementById("food").innerHTML = prettify(global.resources.food.amount)
	document.getElementById("foodstorage").innerHTML = prettify(global.resources.food.storage);
	document.getElementById("wood").innerHTML = prettify(global.resources.wood.amount);
	document.getElementById("woodstorage").innerHTML = prettify(global.resources.wood.storage);
	document.getElementById("metal").innerHTML = prettify(global.resources.metal.amount);
	document.getElementById("metalstorage").innerHTML = prettify(global.resources.metal.storage);
	
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
}

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
				console.log("Not enough storage!");
				finish_activity();
			}else{
				console.log("Progressing activity: " + activity);
				progress_activity(activity);
			}
			break;
		case "Eating":
			if(r.amount >= r.storage || global.resources.food.amount < 1){
				console.log("Not enough storage or food!");
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
			html_update("food");
			break;
		case "Foraging for Wood":
			add_reward(global.resources.wood, true);
			html_update("wood");
			break;
		case "Foraging for Metal":
			add_reward(global.resources.metal, true);
			html_update("metal");
			break;
		case "Eating Food":
			add_reward(global.player.hunger, false);
			global.resources.food.amount -= 1;
			html_update("hunger");
			html_update("food");
			break;
	}
	console.log("Rewarding activity: " + activity);
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

function add_reward(r, has_luck)
{
	if (has_luck){
		var bonus = luck_reward_multiplier(r.luck, r.fortune);
		console.log(bonus);
	}else{var bonus=1}
	if (r.amount + r.efficiency * bonus >= r.storage){
		r.amount = r.storage
	}else{
		r.amount += r.efficiency * bonus
	}
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
	}
}

function prettify(input)
{
    var output = Math.round(input * 1000000)/1000000;
	return output;
}

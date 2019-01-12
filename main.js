var gl = {
	resources: {
		food: {
			name: "Food",
			amount: 0,
			storage: 10,
			efficiency: 2,
			luck: 0.1,
			fortune: 0.2,
			progress_min: 0,
			progress_act: 0,
			progress_max: 100,
			progress_int: 10,
            energy_cost: 1
		},
		wood: {
			name: "Wood",
			amount: 0,
			storage: 10,
			efficiency: 1,
			luck: 0.1,
			fortune: 0.2,
			progress_min: 0,
			progress_act: 0,
			progress_max: 100,
			progress_int: 10,
            energy_cost: 1
		},
		metal: {
			name: "Metal",
			amount: 0,
			storage: 5,
			efficiency: 1,
			luck: 0.1,
			fortune: 0.5,
			progress_min: 0,
			progress_act: 0,
			progress_max: 100,
			progress_int: 5,
            energy_cost: 1
		}
	},
	player: {
		level: {
            amount: 1,
            storage: 20
        },
        experience: {
            amount: 0,
            storage: 15,
            required_array: [0, 15, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 150, 200, 250, 300, 350, 400, 450, 500]
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
			tick_decay: 0.1,
			progress_min: 0,
			progress_act: 0,
			progress_max: 100,
			progress_int: 20
		},
        energy: {
            name: "Energy",
            amount: 10,
            storage: 10,
            efficiency: 5,
            progress_min: 0,
            progress_act: 0,
            progress_max: 100,
            progress_int: 5,
            unlocked: false
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
		hunger_storage_01: {
            name: "Breathing Exercises",
            purchased: false
        },
        food_storage_01: {
            name: "Passive Cooler",
            purchased: false
        },
        wood_storage_01: {
            name: "Lumber Stockpile",
            purchased: false
        },
        metal_storage_01: {
            name: "Wooden Chest",
            purchased: false
        },
        hunger_efficiency_01: {
            name: "Culinary Techniques",
            purchased: false
        },
        food_efficiency_01: {
            name: "Improved Traps",
            purchased: false
        },
        wood_efficiency_01: {
            name: "Wooden Hatchet",
            purchased: false
        },
        metal_efficiency_01: {
            name: "Smelting Techniques",
            purchased: false
        },
        hunger_speed_01: {
            name: "Sharpened Canines",
            purchased: false
        },
        food_speed_01: {
            name: "Keen Eyes",
            purchased: false
        },
        wood_speed_01: {
            name: "Boreal Scouting",
            purchased: false
        },
        metal_speed_01: {
            name: "Wooden Pickaxe",
            purchased: false
        }
        
	},
    alive: true,
    html_vars: {
        level_up_flash: {
            amount: 0,
            storage: 15,
            timer: 100,
            color: "rgb(200,204,101)",
            original_color: "rgb(156,204,101)"
        },
        button_unlock_color: "rgb(255, 255, 50)"
    },
    tooltips: {
        foraging_food: ``, foraging_wood: ``, foraging_metal: ``, eating_food: ``, resting: ``,
        breathing_exercises: "Practice breathing exercises to\nincrease stomach capacity.\nRequires Level 2\nFood - 5\nHunger Storage + 20",
        passive_cooler: "Build a passive cooling structure\nthat allows you to store additional food.\nRequires Level 3\nWood - 5\nMetal - 5\nFood Storage + 5",
        lumber_stockpile: "Practice stacking logs to improve\nwood storage capacity.\nRequires Level 4\nWood - 8\nWood Storage + 5",
        wooden_chest: "Build a wooden chest designed\nspecifically for storing metal.\nRequires Level 4\nWood - 8\nMetal - 2\nMetal Storage + 5",
        culinary_techniques: "Train in proper food preparation practices\nto increase hunger restored per meal.\nRequires Level 6\nHunger - 10\nFood - 12\nHunger Efficiency + 2\n*Be wary not to starve when purchasing!*",
        improved_traps: "Improve trap efficiency in order\nto gather food more efficiently.\nRequires Level 7\nFood - 5\nWood - 10\nMetal - 2\nFood Efficiency + 1",
        wooden_hatchet: "Build a wooden hatchet to\ngather wood more efficiently.\nRequires Level 5\nWood - 12\nWood Efficiency + 1",
        smelting_techniques: "Train in proper metal smelting\ntechniques to get more out of your metal.\nRequires Level 7\nWood - 5\nMetal - 12\nMetal Efficiency + 1",
        sharpened_canines: "Chisel your canines to\ndevour food more quickly.\nRequires Level 5\nFood - 5\nMetal - 5\nEating Speed + 5",
        keen_eyes: "Sharper eyes means faster food.\nRequires Level 6\nFood - 5\nWood - 10\nFood Foraging Speed + 10",
        boreal_scouting: "Spot vulnerable spots on trees\nto strike them down more quickly.\nRequires Level 7\nFood - 5\nWood - 12\nWood Foraging Speed + 10",
        wooden_pickaxe: "Build a wooden pickaxe to\ngather metal more quickly.\nRequires Level 8\nWood - 10\nMetal - 10\nMetal Foraging Speed +5"
    },
	timer_interval: 200
}

document.getElementById("defaultOpen").click();

function tooltip_update_var(tt_id)
{
    switch (tt_id){
        case "foraging_food":
            gl.tooltips.foraging_food = `Set out to gather food.\nUses ${gl.resources.food.energy_cost} energy.\nEfficiency: ${gl.resources.food.efficiency}\nSpeed: ${(gl.resources.food.progress_max / gl.resources.food.progress_int) / (1000 / gl.timer_interval)} sec.`;
            break;
        case "foraging_wood":
            gl.tooltips.foraging_wood = `Set out to gather wood.\nUses ${gl.resources.wood.energy_cost} energy.\nEfficiency: ${gl.resources.wood.efficiency}\nSpeed: ${(gl.resources.wood.progress_max / gl.resources.wood.progress_int) / (1000 / gl.timer_interval)} sec.`;
            break;
        case "foraging_metal":
            gl.tooltips.foraging_metal = `Set out to gather metal.\nUses ${gl.resources.metal.energy_cost} energy.\nEfficiency: ${gl.resources.metal.efficiency}\nSpeed: ${(gl.resources.metal.progress_max / gl.resources.metal.progress_int) / (1000 / gl.timer_interval)} sec.`;
            break;
        case "eating_food":
            gl.tooltips.eating_food = `Eat some food to restore hunger.\nFood - 1\nEfficiency: ${gl.player.hunger.efficiency}\nSpeed: ${(gl.player.hunger.progress_max / gl.player.hunger.progress_int) / (1000 / gl.timer_interval)} sec.`
            break;
        case "resting":
            gl.tooltips.resting = `Rest up to recover your energy.\nEnergy + ${gl.player.energy.efficiency}\nSpeed: ${(gl.player.energy.progress_max / gl.player.energy.progress_int) / (1000 / gl.timer_interval)} sec.`
        default:
            break;
    }
}

function create_tooltips()
{
    console.log(Object.keys(gl.tooltips).length);
    for(var k in gl.tooltips){
        tooltip_update_var(k);
        console.log(k);
    }
}

var story_progress = 0;
var story_div = document.getElementById("story");
function story() 
{
    switch(story_progress){
        case 0:
            story_div.innerHTML += "<br><br>...";
            story_progress++;
            //soundFile.play();
            //soundFile.volume = 1;
            break;
        case 1:
            story_div.innerHTML += "<br><br>Feeling tufts of grass soft under your body, a steady breeze washes over your right side.";
            story_progress++;
            break;
        case 2:
            story_div.innerHTML += "<br><br>You struggle to open your eyes. Peaceful greens, modest browns, and expansive blues quickly fill your vision.";
            story_progress++;
            break;
        case 3:
            story_div.innerHTML += "<br><br>You appear to be in a forest.";
            story_progress++;
            break;
        case 4:
            story_div.innerHTML += "<br><br>You can't quite remember how you got here, and trying to only serves to give you a headache. Best not worry about it for now.";
            story_progress++;
            break;
        case 5:
            story_div.innerHTML += "<br><br>Regardless of how you got here, you know one thing for certain.";
            story_progress++;
            break;
        case 6:
            story_div.innerHTML += "<br><br>You will be hungry soon.";
            document.getElementById("storyNextButton").style.display = "none";
            document.getElementById("startButton").style.display = "block";
            story_progress++;
            break;
        case 8: //level 2
            something_new("button[tooltipid='gl.tooltips.foraging_wood']");
            something_new("button[tooltipid='gl.tooltips.foraging_metal']");
            $("button[idt='tabButtonUpgrades']").css("display", "inline-block");
            something_new("button[tooltipid='gl.tooltips.breathing_exercises']");
            break;
        case 9: //level 3
            something_new("button[tooltipid='gl.tooltips.passive_cooler']");
            //$("button[idt='tabButtonUpgrades']").css("background-color", gl.html_vars.button_unlock_color);
            break;
        case 10: //level 4
            something_new("button[tooltipid='gl.tooltips.lumber_stockpile']");
            something_new("button[tooltipid='gl.tooltips.wooden_chest']");
            //$("button[idt='tabButtonUpgrades']").css("background-color", gl.html_vars.button_unlock_color);
            break;
        case 11: //level 5
            something_new("button[tooltipid='gl.tooltips.wooden_hatchet']");
            something_new("button[tooltipid='gl.tooltips.sharpened_canines']");
            //$("button[idt='tabButtonUpgrades']").css("background-color", gl.html_vars.button_unlock_color);
            break;
        case 12: //level 6
            something_new("button[tooltipid='gl.tooltips.culinary_techniques']");
            something_new("button[tooltipid='gl.tooltips.keen_eyes']");
            //$("button[idt='tabButtonUpgrades']").css("background-color", gl.html_vars.button_unlock_color);
            break;
        case 13: //level 7
            something_new("button[tooltipid='gl.tooltips.improved_traps']");
            something_new("button[tooltipid='gl.tooltips.smelting_techniques']");
            something_new("button[tooltipid='gl.tooltips.boreal_scouting']");
            //$("button[idt='tabButtonUpgrades']").css("background-color", gl.html_vars.button_unlock_color);
            break;
        case 14: //level 8
            something_new("button[tooltipid='gl.tooltips.wooden_pickaxe']");
            //$("button[idt='tabButtonUpgrades']").css("background-color", gl.html_vars.button_unlock_color);
            break;
        case 15: //level 9
            
            break;
        case 16: //level 10
            $("button[idt='tabButtonTravel']").css("display", "inline-block");
            break;
        
        
        default:
            break;
    }
}

function pause_game()
{
	if(gl.player.alive){
        if(isPaused){
            isPaused = false;
            document.getElementById("pauseButton").innerHTML = "PAUSE";
            document.getElementById("pauseButton").style.backgroundColor = "white";
        }else{
            isPaused = true;
            document.getElementById("pauseButton").innerHTML = "UNPAUSE";
            document.getElementById("pauseButton").style.backgroundColor = "crimson";
        }
    }
}

function start_game()
{
	document.getElementById("startButton").style.display = "none";
    document.getElementById("story").style.display = "none";
	document.getElementById("mainGame").style.visibility = "visible";
	document.getElementById("pauseButton").style.visibility = "visible";
    create_tooltips();
	init();
	pause_game();
}

//window.onload = init();


$(document).ready(
    function()
    {
        $(":button,[id!='tabButton']").hover(function(){
            if($(this).css("background-color") == 'rgb(255, 255, 50)'){
                $(this).css("background-color", 'white')
            }
        }, function(){
            //MOUSELEAVE EVENT
    })
})

function init()
{
	var r = gl.resources;
	var p = gl.player;
    
	r.food.amount = 0;
	r.wood.amount = 0;
	r.metal.amount = 0;
	
	r.food.storage = 10;
	r.wood.storage = 10;
	r.metal.storage = 10;
	
    p.level.amount = 1;
    p.level.storage = 20;
    p.experience.amount = 0;
    p.experience.storage = p.experience.required_array[p.level.amount];
	p.health.amount = 10;
	p.health.storage = 10;
    p.energy.amount = 10;
    p.energy.storage = 10;
	p.hunger.amount = 100;
	p.hunger.storage = 100;
	p.busy = false;
	p.ready_to_set_out = false;
	p.activity = "Idle";
    p.alive = true;
    
    //$( "button[tooltipid='gl.tooltips.foraging_food']" ).get(0).setAttribute("tooltip", gl.tooltips.foraging_food);
    
    var tooltip_array = $("button[tooltipid]");
    for (i = 0; i < tooltip_array.length; i++) {
        var tt_id = tooltip_array[i].getAttribute("tooltipid");
        tooltip_array[i].setAttribute("tooltip", eval(tt_id));
    }
    
    //*
    //HIDE BUTTONS ON START
    $("button[tooltipid='gl.tooltips.foraging_wood']").css("display", "none");
    $("button[tooltipid='gl.tooltips.foraging_metal']").css("display", "none");
    $("button[tooltipid='gl.tooltips.resting']").css("display", "none");
    $("button[id='gl.upgrades.hunger_storage_01']").css("display", "none");
    $("button[id='gl.upgrades.food_storage_01']").css("display", "none");
    $("button[id='gl.upgrades.wood_storage_01']").css("display", "none");
    $("button[id='gl.upgrades.metal_storage_01']").css("display", "none");
    $("button[id='gl.upgrades.hunger_efficiency_01']").css("display", "none");
    $("button[id='gl.upgrades.food_efficiency_01']").css("display", "none");
    $("button[id='gl.upgrades.wood_efficiency_01']").css("display", "none");
    $("button[id='gl.upgrades.metal_efficiency_01']").css("display", "none");
    $("button[id='gl.upgrades.hunger_speed_01']").css("display", "none");
    $("button[id='gl.upgrades.food_speed_01']").css("display", "none");
    $("button[id='gl.upgrades.wood_speed_01']").css("display", "none");
    $("button[id='gl.upgrades.metal_speed_01']").css("display", "none");
    
    
    $("button[idt='tabButtonUpgrades']").css("display", "none");
    $("button[idt='tabButtonTravel']").css("display", "none");
    /*/
    /*
    var withProperty = [],
        els = document.getElementsByTagName('button'), // or '*' for all types of element
        i = 0;

    for (i = 0; i < els.length; i++) {
        if (els[i].hasAttribute('property')) {
            withProperty.push(els[i]);
        }
    }
    */
    
	//var timer = setInterval(function(){update();}, gl.timer_interval);
	
	//document.getElementById("Food").innerHTML = prettify(gl.resources.food.amount) + " / " + prettify(gl.resources.food.storage);


	document.getElementById("food").innerHTML = prettify(r.food.amount)
	document.getElementById("foodstorage").innerHTML = prettify(r.food.storage);
	document.getElementById("wood").innerHTML = prettify(r.wood.amount);
	document.getElementById("woodstorage").innerHTML = prettify(r.wood.storage);
	document.getElementById("metal").innerHTML = prettify(r.metal.amount);
	document.getElementById("metalstorage").innerHTML = prettify(r.metal.storage);
	
    document.getElementById("level").innerHTML = prettify(p.level.amount);
    document.getElementById("experience").innerHTML = prettify(p.experience.amount);
    document.getElementById("experiencestorage").innerHTML = prettify(p.experience.storage);
	document.getElementById("health").innerHTML = prettify(p.health.amount);
	document.getElementById("healthstorage").innerHTML = prettify(p.health.storage);
    document.getElementById("energy").innerHTML = prettify(p.energy.amount);
	document.getElementById("energystorage").innerHTML = prettify(p.energy.storage);
	document.getElementById("hunger").innerHTML = prettify(p.hunger.amount);
	document.getElementById("hungerstorage").innerHTML = prettify(p.hunger.storage);
	document.getElementById("activity").innerHTML = p.activity;
	
    progbar_activities.width = 0;
    progbar_activities.element.innerHTML = "";
    progbar_activities.element.style.visibility = "visible";
    //progbar_activities.element.innerHTML = "";
    
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
	if (gl.player.busy == false && gl.player.ready_to_set_out == true){
        gl.player.busy = true;
		gl.player.ready_to_set_out = false;
		console.log("Update: Not busy and ready to set out!");
	}
	
	if (gl.player.busy == true){
		do_activity(gl.player.activity);
	}
	gl.player.hunger.amount -= gl.player.hunger.tick_decay;
	html_update("hunger");
    if (gl.player.hunger.amount <= 0){
        die();
    }
    if (gl.player.level.amount < gl.player.level.storage && gl.player.experience.amount >= gl.player.experience.storage){
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
}, gl.timer_interval);

function set_out(activity)
{
	if(!isPaused){
		if (gl.player.busy == false){
			gl.player.activity = activity;
			gl.player.ready_to_set_out = true;
			html_update("activity");
		}
		console.log("Set out to do: " + activity);
	}
}

function do_activity(activity)
{
	switch (activity){
		case "Foraging for Food":
			var r = gl.resources.food;
			gl.player.activity_type = "Foraging";
			break;
		case "Foraging for Wood":
			var r = gl.resources.wood;
			gl.player.activity_type = "Foraging";
			break;
		case "Foraging for Metal":
			var r = gl.resources.metal;
			gl.player.activity_type = "Foraging";
			break;
		case "Eating Food":
			var r = gl.player.hunger;
			gl.player.activity_type = "Eating";
            break;
        case "Resting":
            var r = gl.player.energy;
            gl.player.activity_type = "Resting"
		case "Idle":
			break;
	}
	switch(gl.player.activity_type){
		case "Foraging":
			if(r.amount >= r.storage){
				alert_update("red", "Not enough storage!");
				finish_activity();
			}else if(gl.player.energy.amount < 1){
                alert_update("red", "Too tired! Rest up before continuing...");
                finish_activity();
            }else{
				console.log("Progressing activity: " + activity);
				progress_activity(activity);
			}
			break;
		case "Eating":
			if(r.amount >= r.storage || gl.resources.food.amount < 1){
				alert_update("red", "Not enough storage or food!");
				finish_activity();
			}else{
				console.log("Progressing activity: " + activity);
				progress_activity(activity);
			}
			break;
        case "Resting":
            if(r.amount >= r.storage){
                alert_update("red", "You are already fully rested.");
                finish_activity();
            }else{
                console.log("Progressing activity: " + activity);
                progress_activity(activity);
            }
	}
}

function progress_activity(activity)
{
	switch (activity){
		case "Foraging for Food":
			var r = gl.resources.food;
			break;
		case "Foraging for Wood":
			var r = gl.resources.wood;
			break;
		case "Foraging for Metal":
			var r = gl.resources.metal;
			break;
		case "Eating Food":
			var r = gl.player.hunger;
			break;
        case "Resting":
            var r = gl.player.energy;
            break;
	}
	if(r.progress_act + r.progress_int >= r.progress_max){
		r.progress_act = r.progress_max;
	}else{
		r.progress_act += r.progress_int;
	}
	if(r.progress_act >= r.progress_max){
		progbar_activities.width = r.progress_max;
        progbar_activities.element.style.width = prettify(progbar_activities.width) + "%";
        progbar_activities.element.innerHTML = " ";
        reward_activity(activity);
		finish_activity();
        var done = true;
        //window.setTimeout(function(){r.progress_act = r.progress_min;}, 500);
		r.progress_act = r.progress_min;
		//progbar_activities.width = r.progress_act;
	}
    if(!done){
        progbar_activities.width = r.progress_act;
        progbar_activities.element.style.width = prettify(progbar_activities.width) + "%";
        progbar_activities.element.innerHTML = " " + prettify(progbar_activities.width) + "%";
    }
}

function finish_activity()
{
	console.log("Finishing activity: " + gl.player.activity);
	gl.player.activity = "Idle";
	html_update("activity");
	gl.player.busy = false;
	gl.player.ready_to_set_out = false;
	console.log("Finished activity: " + gl.player.activity);
}

function reward_activity(activity)
{
	switch (activity){
		case "Foraging for Food":
			add_reward(gl.resources.food, true);
            gl.player.experience.amount += 3;
            gl.player.energy.amount -= 1;
			html_update("food");
            html_update("energy");
            if(gl.player.energy.amount <= 5 && !gl.player.energy.unlocked){
                $("button[tooltipid='gl.tooltips.resting']").css("display", "inline-block");
                $("button[tooltipid='gl.tooltips.resting']").css("background-color", gl.html_vars.button_unlock_color);
                gl.player.energy.unlocked = true;
            }
			break;
		case "Foraging for Wood":
			add_reward(gl.resources.wood, true);
            gl.player.experience.amount += 3;
            gl.player.energy.amount -= 1;
			html_update("wood");
            html_update("energy");
			break;
		case "Foraging for Metal":
			add_reward(gl.resources.metal, true);
            gl.player.experience.amount += 3;
            gl.player.energy.amount -= 1;
			html_update("metal");
            html_update("energy");
			break;
		case "Eating Food":
			add_reward(gl.player.hunger, false);
            gl.player.experience.amount += 2;
			gl.resources.food.amount -= 1;
			html_update("hunger");
			html_update("food");
			break;
        case "Resting":
            add_reward(gl.player.energy, false);
            gl.player.experience.amount += 1;
            html_update("energy");
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

function buy_upgrade(upgrade)
{
    if(gl.player.alive){
        var upgrade_processed = false;
        var upgr = eval(upgrade);
        var r = gl.resources;
        var p = gl.player;
        if (!(upgr.purchased)){
            switch (upgr){
                case gl.upgrades.hunger_storage_01:
                    if(p.level.amount >= 2 && r.food.amount >= 5){
                        r.food.amount -= 5;
                        p.hunger.storage += 20;
                        html_update("hunger");
                        html_update("food");
                        upgrade_processed = true;
                    }
                    break;
                case gl.upgrades.food_storage_01:
                    if(p.level.amount >= 3 && r.wood.amount >= 5 && r.metal.amount >= 5){
                        r.wood.amount -= 5;
                        r.metal.amount -= 5;
                        r.food.storage += 5;
                        html_update("wood");
                        html_update("metal");
                        html_update("food");
                        upgrade_processed = true;
                    }
                    break;
                case gl.upgrades.wood_storage_01:
                    if(p.level.amount >= 4 && r.wood.amount >= 8){
                        r.wood.amount -= 8;
                        r.wood.storage += 5;
                        html_update("wood");
                        upgrade_processed = true;
                    }
                    break;
                case gl.upgrades.metal_storage_01:
                    if(p.level.amount >= 4 && r.wood.amount >= 8 && r.metal.amount >= 2 ){
                        r.wood.amount -= 8;
                        r.metal.amount -= 2;
                        r.metal.storage += 5;
                        html_update("wood");
                        html_update("metal");
                        upgrade_processed = true;
                    }
                    break;
                case gl.upgrades.hunger_efficiency_01:
                    if(p.level.amount >= 6 && p.hunger.amount > 10 && r.food.amount >= 12){
                        p.hunger.amount -= 10;
                        r.food.amount -= 12;
                        p.hunger.efficiency += 2;
                        html_update("hunger");
                        html_update("food");
                        tooltip_update_var("eating_food");
                        tooltip_update_html("gl.tooltips.eating_food");
                        upgrade_processed = true;
                    }
                    break;
                case gl.upgrades.food_efficiency_01:
                    if(p.level.amount >= 5 && r.food.amount >= 7 && r.wood.amount >= 10 && r.metal.amount >= 2){
                        r.food.amount -= 5;
                        r.wood.amount -= 10;
                        r.metal.amount -= 2;
                        r.food.efficiency += 1;
                        html_update("food");
                        html_update("wood");
                        html_update("metal");
                        tooltip_update_var("foraging_food");
                        tooltip_update_html("gl.tooltips.foraging_food");
                        upgrade_processed = true;
                    }
                    break;
                case gl.upgrades.wood_efficiency_01:
                    if(p.level.amount >= 5 && r.wood.amount >= 12){
                        r.wood.amount -= 12;
                        r.wood.efficiency += 1;
                        html_update("wood");
                        tooltip_update_var("foraging_wood");
                        tooltip_update_html("gl.tooltips.foraging_wood");
                        upgrade_processed = true;
                    }
                    break;
                case gl.upgrades.metal_efficiency_01:
                    if(p.level.amount >= 7 && r.wood.amount >= 5 && r.metal.amount >= 12){
                        r.wood.amount -= 5;
                        r.metal.amount -= 12;
                        r.metal.efficiency += 1;
                        html_update("wood");
                        html_update("metal");
                        tooltip_update_var("foraging_metal");
                        tooltip_update_html("gl.tooltips.foraging_metal");
                        upgrade_processed = true;
                    }
                    break;
                case gl.upgrades.hunger_speed_01:
                    if(p.level.amount >= 5 && r.food.amount >= 5 && r.metal.amount >= 5){
                        r.food.amount -= 5;
                        r.metal.amount -= 5;
                        p.hunger.progress_int += 10;
                        html_update("food");
                        html_update("metal");
                        tooltip_update_var("eating_food");
                        tooltip_update_html("gl.tooltips.eating_food");
                        upgrade_processed = true;
                    }
                    break;
                case gl.upgrades.food_speed_01:
                    if(p.level.amount >= 6 && r.food.amount >= 5 && r.wood.amount >= 10){
                        r.food.amount -= 5;
                        r.wood.amount -= 10;
                        r.food.progress_int += 10;
                        html_update("food");
                        html_update("wood");
                        tooltip_update_var("foraging_food");
                        tooltip_update_html("gl.tooltips.foraging_food");
                        upgrade_processed = true;
                    }
                    break;
                case gl.upgrades.wood_speed_01:
                    if(p.level.amount >= 7 && r.food.amount >= 5 && r.wood.amount >= 12){
                        r.food.amount -= 5;
                        r.wood.amount -= 12;
                        r.wood.progress_int += 5;
                        html_update("food");
                        html_update("wood");
                        tooltip_update_var("foraging_wood");
                        tooltip_update_html("gl.tooltips.foraging_wood");
                        upgrade_processed = true;
                    }
                    break;
                case gl.upgrades.metal_speed_01:
                    if(p.level.amount >= 8 && r.wood.amount >= 10 && r.metal.amount >= 10){
                        r.wood.amount -= 10;
                        r.metal.amount -= 10;
                        r.metal.progress_int += 5;
                        html_update("wood");
                        html_update("metal");
                        tooltip_update_var("foraging_metal");
                        tooltip_update_html("gl.tooltips.foraging_metal");
                        upgrade_processed = true;
                    }
                    break;
                default:
                    break;
            }
        }

        if (upgrade_processed){
            upgr.purchased = true;
            alert_update("blue", "Upgrade Complete!");
            document.getElementById(upgrade).setAttribute("disabled", true);
            document.getElementById(upgrade).style.backgroundColor = "darkgray";
            var message = document.getElementById(upgrade);
            setTextContent(message, message.innerHTML.strike());
        }else{
            alert_update("red", "Requirements not met for selected upgrade!");
        }
    }
}

function cheat_button()
{
    gl.player.hunger.amount = 100;
    gl.resources.food.amount = 10;
    gl.resources.wood.amount = 10;
    gl.resources.metal.amount = 10;
    gl.player.experience.amount += 5;
    if (gl.player.level.amount < gl.player.level.storage && gl.player.experience.amount >= gl.player.experience.storage){
        level_up();
    }
    html_update("level");
    html_update("hunger");
    html_update("food");
    html_update("wood");
    html_update("metal");
}

function die()
{
    pause_game();
    gl.player.alive = false;
    alert_update("red", "You have died! Oh no!");
    document.getElementById("pauseButton").innerHTML = "GAME OVER";
}

function level_up()
{
    gl.player.level.amount++;
    gl.player.experience.amount -= gl.player.experience.storage;
    gl.player.experience.storage = gl.player.experience.required_array[gl.player.level.amount];
    var ele = document.getElementById("playerLevel");
    var original_color = "rgb(140,204,101)";
    console.log(original_color);
    html_update("experience");
    var level_up_visual = window.setInterval(
        function(){
            if(gl.html_vars.level_up_flash.amount <= gl.html_vars.level_up_flash.storage){
                if(gl.html_vars.level_up_flash.amount % 2 == 0){
                    ele.style.backgroundColor = gl.html_vars.level_up_flash.color;
                }else{
                    ele.style.backgroundColor = gl.html_vars.level_up_flash.original_color;
                }
                gl.html_vars.level_up_flash.amount++;
            }else{
                window.clearInterval(level_up_visual);
                gl.html_vars.level_up_flash.amount = 0;
            }
        }, gl.html_vars.level_up_flash.timer);
    if(gl.player.level.amount <= 10){
        story_progress++;
        story();
    }
}



function open_tab(evt, tabName)
{
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i=0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function something_new(str)
{
    $(str).css("background-color", gl.html_vars.button_unlock_color);
    $(str).css("display", "inline-block");
}

function html_update(what)
{
	switch (what){
		case "hunger":
			document.getElementById("hunger").innerHTML = prettify(gl.player.hunger.amount);
			document.getElementById("hungerstorage").innerHTML = prettify(gl.player.hunger.storage);
			break;
		case "food":
			document.getElementById("food").innerHTML = prettify(gl.resources.food.amount);
			document.getElementById("foodstorage").innerHTML = prettify(gl.resources.food.storage);
			break;
		case "wood":
			document.getElementById("wood").innerHTML = prettify(gl.resources.wood.amount);
			document.getElementById("woodstorage").innerHTML = prettify(gl.resources.wood.storage);
			break;
		case "metal":
			document.getElementById("metal").innerHTML = prettify(gl.resources.metal.amount);
			document.getElementById("metalstorage").innerHTML = prettify(gl.resources.metal.storage);
			break;
		case "activity":
			document.getElementById("activity").innerHTML = gl.player.activity;
			break;
        case "experience":
            document.getElementById("experience").innerHTML = prettify(gl.player.experience.amount);
            document.getElementById("experiencestorage").innerHTML = prettify(gl.player.experience.storage);
            document.getElementById("level").innerHTML = prettify(gl.player.level.amount);
            break;
        case "energy":
            document.getElementById("energy").innerHTML = prettify(gl.player.energy.amount);
            document.getElementById("energystorage").innerHTML = prettify(gl.player.energy.storage);
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

function tooltip_update_html(tooltip_id)
{
    var tooltip_array = $("button[tooltipid]");
    for (i = 0; i < tooltip_array.length; i++) {
        if (tooltip_array[i].getAttribute("tooltipid") == tooltip_id) {
            tooltip_array[i].setAttribute("tooltip",eval(tooltip_id));
        }
    }    
}

function setTextContent(msg, str) {
    msg.innerHTML = str;
}

function prettify(input)
{
    var output = Math.round(input * 1000000)/1000000;
	return output;
}










/*
myAudio = new Audio('forest_music.mp3'); 
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
myAudio.play();
myAudio.volume = 1;

//Create the audio tag
var soundFile = document.createElement("audio");
soundFile.preload = "auto";

//Load the sound file (using a source element for expandability)
var src = document.createElement("source");
src.src = "forest_music.mp3";
soundFile.appendChild(src);

//Load the audio tag
//It auto plays as a fallback
soundFile.load();
soundFile.volume = 0.000000;
//soundFile.play();

//Plays the sound
function play() {
   //Set the current time for the audio file to the beginning
   soundFile.currentTime = 0.01;
   soundFile.volume = 1;

   //Due to a bug in Firefox, the audio needs to be played after a delay
   setTimeout(function(){soundFile.play();},1);
}
*/
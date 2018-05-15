class Character {

	//sets the stats that are only set during character load from json.
	//attacks, modifiers, currentHp, spells, resources, showNotepad, 
	//showResources, showSpells, notes
	constructor(input) {
		this.setStats(input);
		this.attacks = [];
		if (input.attacks) {
			for (var j=0;j<input.attacks.length;j++) {
				this.addAttack(input.attacks[j]);
			}
		}
		this.modifiers = [];
		if (input.modifiers) {
			for (var j=0;j<input.modifiers.length;j++) {
				this.addModifier(input.modifiers[j]);
			}			
		}
		if (input.currentHp) {
			this.currentHp = input.currentHp;
		} else {
			this.currentHp = this.maxHp;
		}

		this.spells = new Spell;
		if (input.spells) {
			this.addSpells(input.spells);
		}

		this.resources = [];
		if (input.resources) {
			for (var j=0;j<input.resources.length;j++) {
				this.addResource(input.resources[j]);
			}
		}
		this.showNotepad = 'Show';
		if (input.showNotepad) {
			this.showNotepad = input.showNotepad;
		}
		this.showResources = 'Show';
		if (input.showResources) {
			this.showResources = input.showResources;
		}
		this.showSpells = 'Show';
		if (input.showSpells) {
			this.showSpells = input.showSpells;
		}
		this.notes = (input.notes) ? input.notes : '';
	}

	//resets stats to the new input for an existing character.
	updateCharacter(input) {
		this.setStats(input);
	}

	//sets all of the characters stats based using input received from vue character-creator.
	setStats(input) {
		this.name = input.name;
		this.level = input.level;
		this.maxHp = input.maxHp;
		this.ac = input.ac;
		this.initiative = input.initiative;
		this.strength = input.strength;
		this.strengthModifier = input.strengthModifier;
		this.strengthSave = input.strengthSave;
		this.athletics = input.athletics;
		this.dexterity = input.dexterity;
		this.dexterityModifier = input.dexterityModifier;
		this.dexteritySave = input.dexteritySave;
		this.acrobatics = input.acrobatics;
		this.sleightOfHand = input.sleightOfHand;
		this.stealth = input.stealth;
		this.constitution = input.constitution;
		this.constitutionModifier = input.constitutionModifier;
		this.constitutionSave = input.constitutionSave;
		this.intelligence = input.intelligence;
		this.intelligenceModifier = input.intelligenceModifier;
		this.intelligenceSave = input.intelligenceSave;
		this.arcana = input.arcana;
		this.history = input.history;
		this.investigation = input.investigation;
		this.nature = input.nature;
		this.religion = input.religion;
		this.wisdom = input.wisdom;
		this.wisdomModifier = input.wisdomModifier;
		this.wisdomSave = input.wisdomSave;
		this.animalHandling = input.animalHandling;
		this.insight = input.insight;
		this.medicine = input.medicine;
		this.perception = input.perception;
		this.survival = input.survival;
		this.charisma = input.charisma;
		this.charismaModifier = input.charismaModifier;
		this.charismaSave = input.charismaSave;
		this.deception = input.deception;
		this.intimidation = input.intimidation;
		this.performance = input.performance;
		this.persuasion = input.persuasion;
	}

	//creates a new instance of the Spell class to hold all the data for a charactor's spells.
	addSpells(input) {
		this.spells = new Spell(input);

	}

	//creates a new instance of the Attack class to hold all the data and functions for an attack.
	//Sorts the attacks array alphabetically. 
	addAttack(attackData) {
		this.attacks.push(new Attack(attackData));
		this.attacks.sort(sort_by('name', false, function(a){return a.toUpperCase()}));
	}

	//removes a given attack from the attacks array.
	deleteAttack(removingAttack) {
		console.log(removingAttack);
		var index = this.attacks.indexOf(removingAttack);
		console.log(index);
		delete this.attacks[index];
		var newArray = [];
		for (var i=0;i<this.attacks.length;i++) {
			if (this.attacks[i]) {
				newArray.push(this.attacks[i]);
			}
		}
		this.attacks = newArray;
	}

	//creates a new instance of the Modifier class to hold all the data and functions for an attack modifier.
	//Sorts the modifiers array alphabetically. 
	addModifier(modifierData) {
		this.modifiers.push(new Modifier(modifierData));
		this.modifiers.sort(sort_by('name', false, function(a){return a.toUpperCase()}));
	}

	//removes a given modifier from the modifiers array.
	deleteModifier(removingModifier) {
		console.log(removingModifier);
		var index = this.modifiers.indexOf(removingModifier);
		console.log(index);
		delete this.modifiers[index];
		var newArray = [];
		for (var i=0;i<this.modifiers.length;i++) {
			if (this.modifiers[i]) {
				newArray.push(this.modifiers[i]);
			}
		}
		this.modifiers = newArray;
	}

	//creates a new instance of the Resource class to hold all the data and functions for a resource.
	//Sorts the resources array alphabetically. 
	addResource(resourceData) {
		this.resources.push(new Counter(resourceData));
		this.resources.sort(sort_by('name', false, function(a){return a.toUpperCase()}));
	}

	//removes a given resource from the resources array.
	deleteResource(removingResource) {
		console.log(removingResource);
		var index = this.resources.indexOf(removingResource);
		console.log(index);
		delete this.resources[index];
		var newArray = [];
		for (var i=0;i<this.resources.length;i++) {
			if (this.resources[i]) {
				newArray.push(this.resources[i]);
			}
		}
		this.resources = newArray;
	}

	//Calls the make attack function for a given instance of the attack class.
	//If modifiersIndexArray is not null, it finds the proper modifiers and calls their makeAttack functions.
	//Sends the results to app.
	attack(attack, type = 'normal', modifiersIndexArray = null){
		var results = attack.makeAttack(type);
		if (modifiersIndexArray && results.roll != 1) {
			for(var i=0;i<modifiersIndexArray.length;i++) {
				results.resultsArray = this.modifiers[modifiersIndexArray[i]].makeAttack(results.resultsArray, results.roll);
			}
		}
		console.log(results);
		app.addToFeed(results.resultsArray, results.roll);
	}

	//Rolls a given stat and sends the results to app.
	rollStat(stat, statModifier, rollModifier) {
		var roll = dice.d20();
		if (rollModifier == 'advantage') {
			var rollTwo = dice.d20();
			var winningRoll = (( roll > rollTwo ) ? roll : rollTwo);
			var output = stat + ' with advantage: [' + roll + ', ' + rollTwo + '] + ' + statModifier + ' = ' + (winningRoll + statModifier);
		} else if (rollModifier == 'disadvantage') {
			var rollTwo = dice.d20();
			var winningRoll = (( roll < rollTwo ) ? roll : rollTwo);
			var output = stat + ' with disadvantage: [' + roll + ', ' + rollTwo + '] + ' + statModifier + ' = ' + (winningRoll + statModifier);
		} else {
			var output = stat + ': [' + roll + '] + ' + statModifier + ' = ' + (roll + statModifier);
		}
		app.addToFeed(output);
	}

}

//Slot class is used for spell slots, spell counters, and resources.
//Slot class is used by the Spell and Counter classes.
class Slot {

	constructor(used = false) {
		this.used = false;
		this.value = "\u26AA";
		if (this.used) {
			this.value = "\u26AB";
		}
	}
}

//Contains all of the spell variables and functions for a character
class Spell {

	constructor(input = false) {
		this.spellType = 'no';
		this.maxSpellPoints = 0;
		this.maxSpellLevel = 0;
		this.currentSpellPoints = 0;
		this.spellCounters = [];
		if(! this.spellSlots) {
			this.spellSlots = [];
			for(var i=1;i<10;i++) {
				this.spellSlots[i] = [];
			}
		}

		if (input) {
			this.setSpells(input);
			if (input.spellCounters) {
				for (var j=0;j<input.spellCounters.length;j++) {
					this.addCounter(input.spellCounters[j]);
				}
			}
		} 
	}

	//Sets all of the spells variables when given an input.
	//Input comes from the constructor or edit functions.
	setSpells(input) {
		this.spellType = input.spellType;
		if(this.spellType == 'slots') {
			if (Array.isArray(input.spellSlots) && input.spellSlots.length > 0) {
				this.spellSlots = input.spellSlots;
			} else {
				this.addSpellSlots(1, input.oneSpells);
				this.addSpellSlots(2, input.twoSpells);
				this.addSpellSlots(3, input.threeSpells);
				this.addSpellSlots(4, input.fourSpells);
				this.addSpellSlots(5, input.fiveSpells);
				this.addSpellSlots(6, input.sixSpells);
				this.addSpellSlots(7, input.sevenSpells);
				this.addSpellSlots(8, input.eightSpells);
				this.addSpellSlots(9, input.nineSpells);
			}
		} else if (this.spellType == 'points') {
			this.maxSpellPoints = input.maxSpellPoints;
			this.maxSpellLevel = input.maxSpellLevel;
			if (input.currentSpellPoints) {
				this.currentSpellPoints = input.currentSpellPoints;
			} else if (! this.currentSpellPoints) {
				this.currentSpellPoints = this.maxSpellPoints;
			}
		}
	}

	//Receives input from spell-form and calls setSpells.
	edit(input) {
		this.setSpells(input);
	}

	//Adds new instances of the Slot class to the spellSlots array
	addSpellSlots(level, counter) {
		if(this.spellSlots && this.spellSlots[level]) {
			if(counter > this.spellSlots[level].length) {
				for(var j=this.spellSlots[level].length;j<counter;j++) {
					this.spellSlots[level].push(new Slot);
				}
			} else if(counter < this.spellSlots[level].length) {
				for(var j=this.spellSlots[level].length;j>counter;j--) {
					this.spellSlots[level].pop();
				}
			}

		} else {
			this.spellSlots[level] = [];
			for (var i=0;i<counter;i++) {
				this.spellSlots[level].push(new Slot);
			}
		}
	}

	//Adds a new instance of the Counter class to the spellCounters array.
	//Sorts spellCounters alphabetically.
	//Receives input from counter-field and the constructor.
	addCounter(input) {
		this.spellCounters.push(new Counter(input));
		this.spellCounters.sort(sort_by('name', false, function(a){return a.toUpperCase()}));
	}

	//removes a given counter from the spellCounters array.
	deleteCounter(removingCounter) {
		console.log(removingCounter);
		var index = this.spellCounters.indexOf(removingCounter);
		console.log(index);
		delete this.spellCounters[index];
		var newArray = [];
		for (var i=0;i<this.spellCounters.length;i++) {
			if (this.spellCounters[i]) {
				newArray.push(this.spellCounters[i]);
			}
		}
		this.spellCounters = newArray;
	}
}

class Attack {

	constructor(attackData) {
		this.setStats(attackData);
		console.log(this.name + " has been added");
	}

	//Called from the Character class.
	//Calls the rollArrack/rollSave and rollDamage functions.
	//Returns the results. 
	makeAttack(type = 'normal') {
		var attackRoll = null;
		var results = [];
		if (this.type == 'attack') {
			var fromRollAttack = this.rollAttack(type);
			attackRoll = fromRollAttack[0];
			fromRollAttack.shift();
			results = fromRollAttack;
		} else if (this.type == 'save') {
			results = this.rollSave();
		}
		if (attackRoll == 1) {
			results.push('You critically failed...');
			return {
				resultsArray: results, 
				roll: attackRoll
			};
		}
		for(var i=0;i<this.damageArray.length;i++) {
			results = this.rollDamage(this.damageArray[i], results, attackRoll);
		}

		console.log(results.join('\n'));
		return {
			resultsArray: results, 
			roll: attackRoll
		};
	}

	//Called from the makeAttack function.
	//Rolls the attack roll(s) and returns the results.
	rollAttack(type) {
		var output = [];
		var rollOne = null;
		var rollTwo = null;
		var attackRoll = null;
		switch(type) {
			case 'normal':
				attackRoll = dice.d20();
				var total = attackRoll + this.attackModifier;
				output.push(attackRoll);
				output.push(this.name + ':');
				output.push('Attack roll: [' + attackRoll + '] + ' + this.attackModifier + ' = ' + total);
				break;
			case 'advantage':
				rollOne = dice.d20();
				rollTwo = dice.d20();
				attackRoll = (( rollOne > rollTwo ) ? rollOne : rollTwo); 
				var total = attackRoll + this.attackModifier;
				output.push(attackRoll);
				output.push(this.name + ' with advantage:');
				output.push('Attack roll [' + rollOne + ', ' + rollTwo + '] + ' + this.attackModifier + ' = ' + total);
				break;
			case 'disadvantage':
				rollOne = dice.d20();
				rollTwo = dice.d20();
				attackRoll = (( rollOne < rollTwo ) ? rollOne : rollTwo);
				var total = attackRoll + this.attackModifier;
				output.push(attackRoll);
				output.push(this.name + ' with disadvantage:');
				output.push('Attack roll: [' + rollOne + ', ' + rollTwo + '] + ' + this.attackModifier + ' = ' + total);
				break;		
		}
		return output;
	}

	//Called from the makeAttack function.
	//Returns a string about a DC save.
	rollSave(){
		var output = [];
		output.push(this.name + ':');
		output.push('Target(s) make a DC ' + this.saveDC + ' ' + this.saveType + ' saving throw.');
		return output;
	}

	//Called from the makeAttack function.
	//Rolls the damage and returns the results.
	rollDamage(damageObject, results, attackRoll = null) {
		var damageRoll = null
		var damageTotal = damageObject.damageModifier;
		var damageRollsArray = [];
		if (attackRoll == 20) {
			results.push('You crit!');
			for(var i=0;i<2;i++) {
				console.log(i + ' time through crit loop');
				for(var x=0;x<damageObject.damageDiceNum;x++) { 
					damageRoll = dice.roll(damageObject.damageDice);
					damageTotal = damageTotal + damageRoll;
					damageRollsArray.push(damageRoll);
				}
			}
		} else {
			for(var i=0;i<damageObject.damageDiceNum;i++) { 
					damageRoll = dice.roll(damageObject.damageDice);
					damageTotal = damageTotal + damageRoll;
					damageRollsArray.push(damageRoll);
			}
		}
		var resultArray = [];
		resultArray.push(damageObject.damageType + ' Damage: [' + damageRollsArray.join(', ') + ']');
		if (damageObject.damageModifier != 0) {
			resultArray.push('+ ' + damageObject.damageModifier);
		}
		resultArray.push('= ' + damageTotal);

		results.push(resultArray.join(' ')); 
		//results.push(damageObject.damageType + ' Damage: [' + damageRollsArray.join(', ') + '] + ' + damageObject.damageModifier + ' = ' + damageTotal);

		return results;
	}

	//Called from attack-modifier-form.
	//Calls setStats in order to update variables.
	edit(attackData) {
		this.setStats(attackData);
		
		console.log(this.name + " has been edited");
	}

	//Sets all of the variables for this instance.
	setStats(attackData) {
		this.name = attackData.name;
		this.type = attackData.type;
		if(attackData.type == 'attack') {
			this.attackModifier = attackData.attackModifier;
		} else if (attackData.type == 'save' ) {
			this.saveDC = attackData.saveDC;
			this.saveType = attackData.saveType;
		}
		this.damageArray = attackData.damageArray;
	}
}

class Modifier {

	constructor(modifierData) {
		this.setStats(modifierData);
		console.log(this.name + ' has been added');
	}

	//Called from the Character class.
	//If this instance is a save, it adds a 
	//Calls the rollArrack/rollSave and rollDamage functions.
	//Returns the results.
	makeAttack(results, roll = null) {
		console.log(results);
		results.push(this.name + ':');

		if (this.type == 'save') {
			results.push('Target(s) make a DC ' + this.saveDC + ' ' + this.saveType + ' saving throw.');
		}

		for(var i=0;i<this.damageArray.length;i++) {
			results = this.rollDamage(this.damageArray[i], results, roll);
		}

		return results;
	}

	//Called from makeAttack.
	//Rolls the damage and returns the results.
	rollDamage(damageObject, results, roll = null) {
		var damageRoll = null
		var damageTotal = damageObject.damageModifier;
		var damageRollsArray = [];

		if (roll == 20) {
			for(var i=0;i<2;i++) {
				for(var x=0;x<damageObject.damageDiceNum;x++) { 
					damageRoll = dice.roll(damageObject.damageDice);
					damageTotal += damageRoll;
					damageRollsArray.push(damageRoll);
				}
			}
		} else {
			for(var i=0;i<damageObject.damageDiceNum;i++) { 
					damageRoll = dice.roll(damageObject.damageDice);
					damageTotal = damageTotal + damageRoll;
					damageRollsArray.push(damageRoll);
			}
		}
		results.push(damageObject.damageType + ' Damage: [' + damageRollsArray + '] = ' + damageTotal);

		return results;
	}

	//Called from attack-modifier-form.
	//Calls setStats in order to update variables.	
	edit(modifierData) {
		this.setStats(modifierData);
		console.log(this.name + " has been edited");
	}

	//Sets all of the variables for this instance.
	setStats(modifierData) {
		this.name = modifierData.name;
		this.type = modifierData.type;
		if (this.type == 'save' ) {
			this.saveDC = modifierData.saveDC;
			this.saveType = modifierData.saveType;
		}	
		this.damageArray = modifierData.damageArray;
	}
}

class Counter {

	constructor(input) {
		this.name = input.name;
		this.type = input.type;
		this.total = input.total;
		this.slots = [];
		if(this.type == 'slots') {
			if (Array.isArray(input.slots) && input.slots.length > 0) {
				this.slots = input.slots;
			} else {
				for(var j=0;j<this.total;j++) {
					this.slots.push(new Slot);
				}
			}
		} else if(this.type == 'points') {
			if(input.current) {
				this.current = input.current;
			} else {
				this.current = this.total;
			}
		}
		console.log(this.name + " has been added");
	}


	edit(input) {
		this.name = input.name;
		this.type = input.type;
		this.total = input.total;
		if(this.type == 'slots') {
			if(this.total > this.slots.length) {
				for(var j=this.slots.length;j<this.total;j++) {
					this.slots.push(new Slot);
				}
			} else if(this.total < this.slots.length) {
				for(var j=this.slots.length;j>this.total;j--) {
					this.slots.pop();
				}
			}
		} 
		console.log(this.name + " has been added");
	}
}

class FeedItem {

	constructor(feedText, roll = false) {
		this.feedText = feedText;
		if (Array.isArray(this.feedText)) {
			this.feedText = this.feedText.join('\n');
		}
		this.critical = false;
		if(roll == 20) {
			this.critical = 'critSuccess';
		} else if (roll == 1) {
			this.critical = 'critFail';
		}
	}
}

var dice = {
	roll: function(number) {
		return Math.floor(Math.random() * number) + 1
	},
	d20: function() {
		return Math.floor(Math.random() * 20) + 1;
	}
}

// Use with .sort() to sort an array of objects.
// First param: variable by with to be sorted
// Second param: boolean to reverse order or not
// Third param: primer to prepare data to be compared. ex: parseInt() if comparting number. 
// case insensitive ex.  this.attacks.sort(sort_by('name', false, function(a){return a.toUpperCase()})); 
var sort_by = function(field, reverse, primer){

   var key = (primer) ? function(x) {return primer(x[field])} : function(x) {return x[field]};

   reverse = (!reverse) ? 1 : -1;

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}



Vue.component('nav-vue', {
	template: `
		<nav>
			<ul class="nav nav-tabs">
			    <li class="nav-item" v-if="characterList" v-for="character in characterList" @click="select(character)">
			        <a class="nav-link" v-bind:class="{active: selected == character}">{{character.name}}</a>
			    </li>
			    <li class="nav-item ml-auto" @click="select('home')">
			    	<a class="nav-link" v-bind:class="{active: selected == 'home'}">Home</a>
			    </li>
			    <li class="nav-item" @click="select('dice-roller')">
			    	<a class="nav-link" v-bind:class="{active: selected == 'dice-roller'}">Dice Roller</a>
			    </li>			    
			    <li class="nav-item" @click="select('create-character')">
			    	<a class="nav-link" v-bind:class="{active: selected == 'create-character'}">Create a Character</a>
			    </li>

			</ul>
		</nav>
	`,
	props: ["characters", "selected"],
	computed: {
		characterList() {
			return this.characters;
		}
	},
	methods: {
		select(selected) {
			app.selected = selected;
		}
	}
});


Vue.component('character-stats', {
	template: `
		<div v-if="character">
			<div class="row m-auto card-header border-left border-right">
				<div class="col-md-5 px-0">
					<h2 class="d-inline-block">{{character.name}}</h2>
					<span class="dropdown">
					  <a class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					  </a>
					  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
					  	<a class="dropdown-item" @click="toggleNotepad">Toggle Notepad</a>
					  	<a class="dropdown-item" @click="toggleResources">Toggle Resources</a>
					  	<a class="dropdown-item" @click="toggleSpells">Toggle Spells</a>
					    <a class="dropdown-item" @click="editCharacter" v-if="! edit">Edit {{character.name}}</a>
					    <a class="dropdown-item" @click="editCharacter" v-if="edit">Cancel Edit</a>
					    <a class="dropdown-item" @click="deleteCharacter">Delete {{character.name}}</a>
					  </div>
					</span><br>
					<span>Level {{character.level}}</span>
				</div>
				<div class="col-md-2 text-center">
					<h5>AC: {{character.ac}}</h5>
					<h5><a @click="rollStat('Initiative', character.initiative)">Initiative: {{character.initiative}}</a></h5>
				</div>
				<div class="col-md-5 px-0">
					<div class="float-right">
						<h5>HP: <input type="number" class="hpInput" v-model.number="character.currentHp"> / {{character.maxHp}}
						</h5>
						Calc: <input class="numInput" @keyup.enter="adjustCurrentHp()" v-model.number="hpCalculator"></input> 
					</div>
				</div>
			</div>

			<modal v-if="edit" v-bind:input="'character-editor'">
				<div class="modal-header card-header" slot="header">
			        <h5 class="modal-title">Editing {{character.name}}</h5>
			        <button type="button" class="close" @click="editCharacter">
			          	<span aria-hidden="true">&times;</span>
			        </button>
			    </div>

				<character-creator class="modal-body card-body" v-if="edit" v-bind:editCharacterData="{ characterData: character, edit: edit}" v-on:edit="edit = $event" slot="body">
				</character-creator>
			</modal>

			<div class="row m-auto" >
				<div class="card d-inline-block col-md rounded-0">
					<a @click="rollStat('Strength check', character.strengthModifier)">
						<b>Strength {{character.strength}}</b> 
						(<span v-if="character.strengthModifier > 0">+</span>{{character.strengthModifier}})
					</a>
					<ul class="list-group list-group-flush">
					  	<li>
					  		<a @click="rollStat('Strength save', character.strengthSave)">
					  			Save: <span v-if="character.strengthSave > 0">+</span>{{character.strengthSave}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('Athletics check', character.athletics)">
					  			Athletics: <span v-if="character.athletics > 0">+</span>{{character.athletics}}
					  		</a>
					  	</li>
					</ul>

					<hr>

					<b>Roll Modifier</b>
					<div class="form-check">
						<input type="radio" class="form-check-input" value="advantage" id="rollAdvantage" v-model="rollModifier">
						<label class="form-check-label" for="rollAdvantage">Advantage</label>
					</div>
					<div class="form-check">
						<input type="radio" class="form-check-input" value="normal" id="rollNormal" v-model="rollModifier">
						<label class="form-check-label" for="rollNormal">Normal</label>
					</div>
					<div class="form-check">
						<input type="radio" class="form-check-input" value="disadvantage" id="rollDisadvantage" v-model="rollModifier">
						<label class="form-check-label" for="rollDisadvantage">Disadvantage</label>
					</div>


				</div>
				<div class="card d-inline-block col-md rounded-0">
					<a @click="rollStat('Dexterity check', character.dexterityModifier)">
						<b>Dexterity {{character.dexterity}}</b> 
						(<span v-if="character.dexterityModifier > 0">+</span>{{character.dexterityModifier}})
					</a>

					<ul class="list-group list-group-flush">
					  	<li>
					  		<a @click="rollStat('Dexterity save', character.dexteritySave)">
					  			Save: <span v-if="character.dexteritySave > 0">+</span>{{character.dexteritySave}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('Acrobatics check', character.acrobatics)">
					  			Acrobatics: <span v-if="character.acrobatics > 0">+</span>{{character.acrobatics}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('Slight of Hand check', character.sleightOfHand)">
					  			Slight of Hand: <span v-if="character.sleightOfHand > 0">+</span>{{character.sleightOfHand}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('Stealth check', character.stealth)">
					  			Stealth: <span v-if="character.stealth > 0">+</span>{{character.stealth}}
					  		</a>
					  	</li>
					</ul>
				</div>
				<div class="card d-inline-block col-md rounded-0">
					<a @click="rollStat('Constitution check', character.constitutionModifier)">
						<b>Constitution {{character.constitution}}</b> 
						(<span v-if="character.constitutionModifier > 0">+</span>{{character.constitutionModifier}})
					</a>

					<ul class="list-group list-group-flush">
					  	<li>
					  		<a @click="rollStat('Constitution save', character.constitutionSave)">
					  			Save: <span v-if="character.constitutionSave > 0">+</span>{{character.constitutionSave}}
					  		</a>
					  	</li>
					</ul>
				</div>	
				<div class="card d-inline-block col-md rounded-0">
					<a @click="rollStat('Intelligence check', character.intelligenceModifier)">
						<b>Intelligence {{character.intelligence}}</b> 
						(<span v-if="character.intelligenceModifier > 0">+</span>{{character.intelligenceModifier}})
					</a>

					<ul class="list-group list-group-flush">
					  	<li>
					  		<a @click="rollStat('Intelligence save', character.intelligenceSave)">
					  			Save: <span v-if="character.intelligenceSave > 0">+</span>{{character.intelligenceSave}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('Arcana check', character.arcana)">
					  			Arcana: <span v-if="character.arcana > 0">+</span>{{character.arcana}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('History check', character.history)">
					  			History: <span v-if="character.history > 0">+</span>{{character.history}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('Investigation check', character.investigation)">
					  			Investigation: <span v-if="character.investigation > 0">+</span>{{character.investigation}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('Nature check', character.nature)">
					  			Nature: <span v-if="character.nature > 0">+</span>{{character.nature}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('Religion check', character.religion)">
					  			Religion: <span v-if="character.religion > 0">+</span>{{character.religion}}
					  		</a>
					  	</li>
					</ul>
				</div>	
				<div class="card d-inline-block col-md rounded-0">
					<a @click="rollStat('Wisdom check', character.wisdomModifier)">
						<b>Wisdom {{character.wisdom}}</b> 
						(<span v-if="character.wisdomModifier > 0">+</span>{{character.wisdomModifier}})
					</a>

					<ul class="list-group list-group-flush">
					  	<li>
					  		<a @click="rollStat('Wisdom save', character.wisdomSave)">
					  			Save: <span v-if="character.wisdomSave > 0">+</span>{{character.wisdomSave}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('Animal Handling check', character.animalHandling)">
					  			Animal Handling: <span v-if="character.animalHandling > 0">+</span>{{character.animalHandling}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('Insight check', character.insight)">
					  			Insight: <span v-if="character.insight > 0">+</span>{{character.insight}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('Medicine check', character.medicine)">
					  			Medicine: <span v-if="character.medicine > 0">+</span>{{character.medicine}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('Perception check', character.perception)">
					  			Perception: <span v-if="character.perception > 0">+</span>{{character.perception}}
					  		</a>

					  	</li>
					  	<li>
					  		<a @click="rollStat('Survival check', character.survival)">
					  			Survival: <span v-if="character.survival > 0">+</span>{{character.survival}}
					  		</a>
					  	</li>
					</ul>
				</div>	
				<div class="card d-inline-block col-md rounded-0">
					<a @click="rollStat('Charisma check', character.charismaModifier)">
						<b>Charisma {{character.charisma}}</b> 
						(<span v-if="character.charismaModifier > 0">+</span>{{character.charismaModifier}})
					</a>
					<ul class="list-group list-group-flush">
					  	<li>
					  		<a @click="rollStat('Charisma save', character.charismaSave)">
					  			Save: <span v-if="character.charismaSave > 0">+</span>{{character.charismaSave}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('Deception check', character.deception)">
					  			Deception: <span v-if="character.deception > 0">+</span>{{character.deception}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('Intimidation check', character.intimidation)">
					  			Intimidation: <span v-if="character.intimidation > 0">+</span>{{character.intimidation}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('Performance check', character.performance)">
					  			Performance: <span v-if="character.performance > 0">+</span>{{character.performance}}
					  		</a>
					  	</li>
					  	<li>
					  		<a @click="rollStat('Persuasion check', character.persuasion)">
					  			Persuasion: <span v-if="character.persuasion > 0">+</span>{{character.persuasion}}
					  		</a>
					  	</li>
					</ul>
				</div>				
			</div>

		</div>
	`,
	props: ["character"],
	data() {
		return {
			rollModifier: 'normal',
			edit: false,
			hpCalculator: null
		}
	},
	methods: {
		rollStat(stat, statModifier) {
			this.character.rollStat(stat, statModifier, this.rollModifier);
		},
		editCharacter(){
			if (this.edit != 'editing') {
				this.edit = 'editing';
			} else {
				this.edit = false;
			}
		},
		deleteCharacter(){
			if (confirm('Delete ' + this.character.name + '?')) {
				app.deleteCharacter(this.character);
			}
		},
		adjustCurrentHp() {
			this.character.currentHp += this.hpCalculator;
			this.hpCalculator = null;
		},
		toggleResources() {
			if (this.character.showResources == 'Show') {
				this.character.showResources = 'Hide';
			} else {
				this.character.showResources = 'Show';
			}
		},
		toggleNotepad() {
			if (this.character.showNotepad == 'Show') {
				this.character.showNotepad = 'Hide';
			} else {
				this.character.showNotepad = 'Show';
			}
		},
		toggleSpells() {
			if (this.character.showSpells == 'Show') {
				this.character.showSpells = 'Hide';
			} else {
				this.character.showSpells = 'Show';
			}
		}
	}
});

Vue.component('character-creator', {
	template: `
		<div>
			<h1 class="card-header border-left border-right" v-if="edit != 'editing'">Create a Character</h1>
			<form>
				<div class="row">
					<div class="col">
						<h4>Basic info</h4>
					    <div class="form-group">
					        <label for="name">Name:</label>
					        <input type="text" class="form-control" id="name" placeholder="Enter character name" v-model="name">
					    </div>
					    <div class="form-group">
					        <label for="characterLevel">Level:</label>
					        <input type="number" class="form-control" id="characterLevel" placeholder="0" v-model.number="level">
					    </div>
					    <div class="form-group">
					        <label for="characterMaxHp">Max HP:</label>
					        <input type="number" class="form-control" id="characterMaxHp" placeholder="0" v-model.number="maxHp">
					    </div>
					    <div class="form-group">
					        <label for="ac">AC:</label>
					        <input type="number" class="form-control" id="ac" placeholder="0" v-model.number="ac">
					    </div>
					    <div class="form-group">
					        <label for="initiative">Initiative:</label>
					        <input type="number" class="form-control" id="initiative" placeholder="0" v-model.number="initiative">
					    </div>
					</div>
				</div>
				<hr>
				<h4>Stats</h4>
				<div class="row">
					<div class="col-md-4"> 
					    <div class="form-group">
					        <label for="characterStrength"><b>Strength:</b></label>
					        <input type="number" class="form-control" id="characterStrength" placeholder="0" v-model.number="strength">
					    </div>
					    <div class="form-check">
					        <label for="strengthModifier">Strength Modifier:</label>
					        <input type="number" class="form-control" id="strengthModifier" placeholder="0" v-model.number="strengthModifier">
					    </div>			    
					    <div class="form-check">
						    <label for="strengthSave">Save</label>
						    <input type="number" class="form-control" id="strengthSave" placeholder="0" v-model.number="strengthSave">
						</div>
						<div class="form-check">
						    <label class="form-check-label" for="athletics">Athletics</label>
						    <input type="number" class="form-control" id="athletics" placeholder="0" v-model.number="athletics">
						</div>
					</div>
					<div class="col-md-4">
					    <div class="form-group">
					        <label for="characterDexterity"><b>Dexterity:</b></label>
					        <input type="number" class="form-control" id="characterDexterity" placeholder="0" v-model.number="dexterity">
					    </div>		
					    <div class="form-check">
					        <label for="dexterityModifier">Dexterity Modifier:</label>
					        <input type="number" class="form-control" id="dexterityModifier" placeholder="0" v-model.number="dexterityModifier">
					    </div>	
					    <div class="form-check">
						    <label class="form-check-label" for="dexteritySave">Save</label>
						    <input type="number" class="form-control" id="dexteritySave" placeholder="0" v-model.number="dexteritySave">
						</div>
						<div class="form-check">
						    <label class="form-check-label" for="acrobatics">Acrobatics</label>
						    <input type="number" class="form-control" id="acrobatics" placeholder="0" v-model.number="acrobatics">
						</div>
					    <div class="form-check">
						    <label class="form-check-label" for="sleightOfHand">Sleight of Hand</label>
						    <input type="number" class="form-control" id="sleightOfHand" placeholder="0" v-model.number="sleightOfHand">
						</div>
						<div class="form-check">
						    <label class="form-check-label" for="stealth">Stealth</label>
						    <input type="number" class="form-control" id="stealth" placeholder="0" v-model.number="stealth">
						</div>
					</div>

					<div class="col-md-4">
					    <div class="form-group">
					        <label for="characterConstitution"><b>Constitution:</b></label>
					        <input type="number" class="form-control" id="characterConstitution" placeholder="0" v-model.number="constitution">
					    </div>
					    <div class="form-check">
					        <label for="constitutionModifier">Constitution Modifier:</label>
					        <input type="number" class="form-control" id="constitutionModifier" placeholder="0" v-model.number="constitutionModifier">
					    </div>
					    <div class="form-check">
						    <label class="form-check-label" for="constitutionSave">Save</label>
						    <input type="number" class="form-control" id="constitutionSave" placeholder="0" v-model.number="constitutionSave">
						</div>
					</div>
				</div>
				<hr>
				<div class="row">
					<div class="col-md-4">
					    <div class="form-group">
					        <label for="characterIntelligence"><b>Intelligence:</b></label>
					        <input type="number" class="form-control" id="characterIntelligence" placeholder="0" v-model.number="intelligence">
					    </div>
					    <div class="form-check">
					        <label for="intelligenceModifier">Intelligence Modifier:</label>
					        <input type="number" class="form-control" id="intelligenceModifier" placeholder="0" v-model.number="intelligenceModifier">
					    </div>
					    <div class="form-check">
						    <label class="form-check-label" for="intelligenceSave">Save</label>
						    <input type="number" class="form-control" id="intelligenceSave" placeholder="0" v-model.number="intelligenceSave">
						</div>
						<div class="form-check">
						    <label class="form-check-label" for="arcana">Arcana</label>
						    <input type="number" class="form-control" id="arcana" placeholder="0" v-model.number="arcana">
						</div>
					    <div class="form-check">
						    <label class="form-check-label" for="history">History</label>
						    <input type="number" class="form-control" id="history" placeholder="0" v-model.number="history">
						</div>
						<div class="form-check">
						    <label class="form-check-label" for="investigation">Investigation</label>
						    <input type="number" class="form-control" id="investigation" placeholder="0" v-model.number="investigation">
						</div>
					    <div class="form-check">
						    <label class="form-check-label" for="nature">Nature</label>
						    <input type="number" class="form-control" id="nature" placeholder="0" v-model.number="nature">
						</div>
						<div class="form-check">
						    <label class="form-check-label" for="religion">Religion</label>
						    <input type="number" class="form-control" id="religion" placeholder="0" v-model.number="religion">
						</div>
					</div>
					<div class="col-md-4">
					    <div class="form-group">
					        <label for="characterWisdom"><b>Wisdom:</b></label>
					        <input type="number" class="form-control" id="characterWisdom" placeholder="0" v-model.number="wisdom">
					    </div>
					    <div class="form-check">
					        <label for="wisdomModifier">Wisdom Modifier:</label>
					        <input type="number" class="form-control" id="wisdomModifier" placeholder="0" v-model.number="wisdomModifier">
					    </div>
					    <div class="form-check">
						    <label class="form-check-label" for="wisdomSave">Save</label>
						    <input type="number" class="form-control" id="wisdomSave" placeholder="0" v-model.number="wisdomSave">
						</div>
						<div class="form-check">
						    <label class="form-check-label" for="animalHandling">Animal Handling</label>
						    <input type="number" class="form-control" id="animalHandling" placeholder="0" v-model.number="animalHandling">
						</div>
					    <div class="form-check">
						    <label class="form-check-label" for="insight">Insight</label>
						    <input type="number" class="form-control" id="insight" placeholder="0" v-model.number="insight">
						</div>
						<div class="form-check">
						    <label class="form-check-label" for="medicine">Medicine</label>
						    <input type="number" class="form-control" id="medicine" placeholder="0" v-model.number="medicine">
						</div>
					    <div class="form-check">
						    <label class="form-check-label" for="perception">Perception</label>
						    <input type="number" class="form-control" id="perception" placeholder="0" v-model.number="perception">
						</div>
						<div class="form-check">
						    <label class="form-check-label" for="survival">Survival</label>
						    <input type="number" class="form-control" id="survival" placeholder="0" v-model.number="survival">
						</div>			
					</div>
					<div class="col-md-4">
					    <div class="form-group">
					        <label for="characterCharisma"><b>Charisma:</b></label>
					        <input type="number" class="form-control" id="characterCharisma" placeholder="0" v-model.number="charisma">
					    </div>
					    <div class="form-check">
					        <label for="charismaModifier">Charisma Modifier:</label>
					        <input type="number" class="form-control" id="charismaModifier" placeholder="0" v-model.number="charismaModifier">
					    </div>
					    <div class="form-check">
						    <label class="form-check-label" for="charismaSave">Save</label>
						    <input type="number" class="form-control" id="charismaSave" placeholder="0" v-model.number="charismaSave">
						</div>
						<div class="form-check">
						    <label class="form-check-label" for="deception">Deception</label>
						    <input type="number" class="form-control" id="deception" placeholder="0" v-model.number="deception">
						</div>
						<div class="form-check">
						    <label class="form-check-label" for="intimidation">Intimidation</label>
						    <input type="number" class="form-control" id="intimidation" placeholder="0" v-model.number="intimidation">
						</div>
						<div class="form-check">
						    <label class="form-check-label" for="performance">Performance</label>
						    <input type="number" class="form-control" id="performance" placeholder="0" v-model.number="performance">
						</div>
						<div class="form-check">
						    <label class="form-check-label" for="persuasion">Persuasion</label>
						    <input type="number" class="form-control" id="persuasion" placeholder="0" v-model.number="persuasion">
						</div>
					</div>
				</div>
				<hr>
				<div class="row">
					<div class="col">
					    <button type="button" class="btn btn-primary mx-2" @click="createCharacter" v-if="edit != 'editing'">Create Character</button>
					    <button type="button" class="btn btn-primary mx-2" @click="updateCharacter" v-if="edit == 'editing'">Update Character</button>
					    <button type="button" class="btn btn-danger mx-2" @click="$emit('edit', false)" v-if="edit == 'editing'">Cancel</button>
					</div>
				</div>			    
			</form>
		</div>
	`,
	props: ['editCharacterData'],
	data() {
		return {
			character: null,
			edit: false,
			name: '',
			level: 0,
			maxHp: 0,
			ac: 0,
			initiative: 0,
			strength: 0,
			strengthSave: 0,
			strengthModifier: 0,
			athletics: 0,
			dexterity: 0,
			dexterityModifier: 0,
			dexteritySave: 0,
			acrobatics: 0,
			sleightOfHand: 0,
			stealth: 0,
			constitution: 0,
			constitutionModifier: 0,
			constitutionSave: 0,
			intelligence: 0,
			intelligenceModifier: 0,
			intelligenceSave: 0,
			arcana: 0,
			history: 0,
			investigation: 0,
			nature: 0,
			religion: 0,
			wisdom: 0,
			wisdomModifier: 0,
			wisdomSave: 0,
			animalHandling: 0,
			insight: 0,
			medicine: 0,
			perception: 0,
			survival: 0,
			charisma: 0,
			charismaModifier: 0,
			charismaSave: 0,
			deception: 0,
			intimidation: 0,
			performance: 0,
			persuasion: 0

			
		};
	},
	created() {
		if (this.editCharacterData) {
			this.edit = this.editCharacterData.edit;
			this.character = this.editCharacterData.characterData;
			this.name = this.character.name;
			this.level = this.character.level;
			this.maxHp = this.character.maxHp;
			this.ac = this.character.ac;
			this.initiative = this.character.initiative;
			this.strength = this.character.strength;
			this.strengthModifier = this.character.strengthModifier;
			this.strengthSave = this.character.strengthSave;
			this.athletics = this.character.athletics;
			this.dexterity = this.character.dexterity;
			this.dexterityModifier = this.character.dexterityModifier;
			this.dexteritySave = this.character.dexteritySave;
			this.acrobatics = this.character.acrobatics;
			this.sleightOfHand = this.character.sleightOfHand;
			this.stealth = this.character.stealth;
			this.constitution = this.character.constitution;
			this.constitutionModifier = this.character.constitutionModifier;
			this.constitutionSave = this.character.constitutionSave;
			this.intelligence = this.character.intelligence;
			this.intelligenceModifier = this.character.intelligenceModifier;
			this.intelligenceSave = this.character.intelligenceSave;
			this.arcana = this.character.arcana;
			this.history = this.character.history;
			this.investigation = this.character.investigation;
			this.nature = this.character.nature;
			this.religion = this.character.religion;
			this.wisdom = this.character.wisdom;
			this.wisdomModifier = this.character.wisdomModifier;
			this.wisdomSave = this.character.wisdomSave;
			this.animalHandling = this.character.animalHandling;
			this.insight = this.character.insight;
			this.medicine = this.character.medicine;
			this.perception = this.character.perception;
			this.survival = this.character.survival;
			this.charisma = this.character.charisma;
			this.charismaModifier = this.character.charismaModifier;
			this.charismaSave = this.character.charismaSave;
			this.deception = this.character.deception;
			this.intimidation = this.character.intimidation;
			this.performance = this.character.performance;
			this.persuasion = this.character.persuasion;
		}
	},
	methods: {
		createCharacter() {
			var characterData = this.prepareCharacterData();
			if(newCharacter = new Character(characterData)) {
				app.createCharacter(newCharacter);
			}
		},
		updateCharacter() {
			var characterData = this.prepareCharacterData();
			this.character.updateCharacter(characterData);
			this.$emit('edit', false);
		},
		prepareCharacterData() {
			return {
				name: this.name,
				level: this.level,
				maxHp: this.maxHp,
				ac: this.ac,
				initiative: this.initiative,
				strength: this.strength,
				strengthModifier: this.strengthModifier,
				strengthSave: this.strengthSave,
				athletics: this.athletics,
				dexterity: this.dexterity,
				dexterityModifier: this.dexterityModifier,
				dexteritySave: this.dexteritySave,
				acrobatics: this.acrobatics,
				sleightOfHand: this.sleightOfHand,
				stealth: this.stealth,
				constitution: this.constitution,
				constitutionModifier: this.constitutionModifier,
				constitutionSave: this.constitutionSave,
				intelligence: this.intelligence,
				intelligenceModifier: this.intelligenceModifier,
				intelligenceSave: this.intelligenceSave,
				arcana: this.arcana,
				history: this.history,
				investigation: this.investigation,
				nature: this.nature,
				religion: this.religion,
				wisdom: this.wisdom,
				wisdomModifier: this.wisdomModifier,
				wisdomSave: this.wisdomSave,
				animalHandling: this.animalHandling,
				insight: this.insight,
				medicine: this.medicine,
				perception: this.perception,
				survival: this.survival,
				charisma: this.charisma,
				charismaModifier: this.charismaModifier,
				charismaSave: this.charismaSave,
				deception: this.deception,
				intimidation: this.intimidation,
				performance: this.performance,
				persuasion: this.persuasion
			};
		}
	}
});


Vue.component('spells', {
	template: `
		<div class="px-0" v-bind:class="{'col-md-3': character.showNotepad == 'Show', 'col-md': character.showNotepad != 'Show'}"  v-if="character.showSpells == 'Show'">
			<div class="card rounded-0 h-100">
				<div class="card-header p-2">
					<h3 class="d-inline-block">Spells</h3>
					<spells-field v-bind:spells="character.spells"></spells-field>
				</div>
				<div class="card-body p-2 d-flex flex-column">
					<div class="mb-1" v-if="character.spells.spellType == 'slots'">
						<ul class="list-group list-group-flush">
							<li v-for="(level, levelIndex) in character.spells.spellSlots" v-if="levelIndex != 0 && level.length > 0">
								{{levelIndex}}: 
								<a v-for="spellSlot in level" @click="switchSlot(spellSlot)" v-text="spellSlot.value">
								</a>
							</li>
							
						</ul>
					</div>
					<div class="mb-1"  v-if="character.spells.spellType == 'points'">
						<span>
							Points:
							<input type="number" class="numInput" v-model.number="character.spells.currentSpellPoints"></input>
							/ {{character.spells.maxSpellPoints}}
						</span>
						<ul class="list-group list-group-flush">
							<li v-for="(cost, level) in spellPointsCosts" v-if="level != 0 && level <= character.spells.maxSpellLevel">
								<a @click="usePoints(cost)">
									{{level}}: {{cost}} points
								</a>
							</li>
						</ul>
					</div>
					<div v-if="character.spells.spellType == 'no' && character.spells.spellCounters.length == 0">
						If your character is not a spellcaster, you can hide this section by clicking 'Toggle Spells' from the dropdown menu next to the character's name.
					</div>
					<counters v-bind:character="character" v-bind:counterArray="character.spells.spellCounters" v-bind:counterType="'Spell Counter'"></counters>
				</div>
			</div>
		</div>
	`,
	props: ["character"],
	computed: {
		spells() {
			return this.character.spells;
		}
	},
	data() {
		return {
			spellPointsCosts: [0,2,3,5,6,7,9,10,11,13]
		}
	},
	methods: {
		switchSlot(spellSlot) {
			if (spellSlot.used) {
				spellSlot.used = false;
				spellSlot.value = "\u26AA";
			} else {
				spellSlot.used = true;
				spellSlot.value = "\u26AB";
			}	
		},
		usePoints(cost) {
			if (this.character.spells.currentSpellPoints >= cost) {
				this.character.spells.currentSpellPoints -= cost;
			}
		}
	}
});

Vue.component('spells-field', {
	template: `
		<div class="d-inline-block float-right">
			<button class="btn btn-primary btn-sm" @click="startEdit">Edit</button>
			<modal v-if="show">
		      	<div class="modal-header card-header" slot="header">
		        	<h5 class="modal-title">Edit Spells</h5>
		        	<button type="button" class="close" @click="reset">
			          	<span aria-hidden="true">&times;</span>
			        </button>
		      	</div>

		      	<div class="modal-body" slot="body">
					<div class="form-check form-check-inline">
					    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="yesSpellSlots" value="slots" v-model="spellType">
					    <label class="form-check-label" for="yesSpellSlots">Slots</label>
					</div>
					<div class="form-check form-check-inline">
					    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="yesSpellPoints" value="points" v-model="spellType">
					    <label class="form-check-label" for="yesSpellPoints">Points (DMG Variant)</label>
					</div>
					<div class="form-check form-check-inline">
					    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="noSpells" value="no" v-model="spellType">
					    <label class="form-check-label" for="noSpells">No</label>
					</div>
					<div v-if="spellType == 'points'">
						<div class="form-group">
					        <label for="spellPoints">Total Spell Points:</label>
					        <input type="number" class="form-control" id="spellPoints" placeholder="0" v-model.number="maxSpellPoints">
					    </div>		
						<div class="form-group">
					        <label for="maxSpellLevel">Max Spell Level Avaibale:</label>
					        <input type="number" class="form-control" id="maxSpellLevel" placeholder="0" v-model.number="maxSpellLevel">
					    </div>					    
					</div>			
					<div v-if="spellType == 'slots'">
						<div class="form-row">
							<div class="form-group col-6">
						        <label for="oneSpells">1st Level Spells:</label>
						        <input type="number" class="form-control" id="oneSpells" placeholder="0" v-model.number="oneSpells">
						    </div>
						    <div class="form-group col-6">
						        <label for="twoSpells">2nd Level Spells:</label>
						        <input type="number" class="form-control" id="twoSpells" placeholder="0" v-model.number="twoSpells">
						    </div>
						</div>
						<div class="form-row">
						    <div class="form-group col-6">
						        <label for="threeSpells">3rd Level Spells:</label>
						        <input type="number" class="form-control" id="threeSpells" placeholder="0" v-model.number="threeSpells">
						    </div>
						    <div class="form-group col-6">
						        <label for="fourSpells">4th Level Spells:</label>
						        <input type="number" class="form-control" id="fourSpells" placeholder="0" v-model.number="fourSpells">
						    </div>
						</div>
						<div class="form-row">
						    <div class="form-group col-6">
						        <label for="fiveSpells">5th Level Spells:</label>
						        <input type="number" class="form-control" id="fiveSpells" placeholder="0" v-model.number="fiveSpells">
						    </div>
						    <div class="form-group col-6">
						        <label for="sixSpells">6th Level Spells:</label>
						        <input type="number" class="form-control" id="sixSpells" placeholder="0" v-model.number="sixSpells">
						    </div>
						</div>
						<div class="form-row">
						    <div class="form-group col-6">
						        <label for="sevenSpells">7th Level Spells:</label>
						        <input type="number" class="form-control" id="sevenSpells" placeholder="0" v-model.number="sevenSpells">
						    </div>
						    <div class="form-group col-6">
						        <label for="eightSpells">8th Level Spells:</label>
						        <input type="number" class="form-control" id="eightSpells" placeholder="0" v-model.number="eightSpells">
						    </div>
						</div>
						<div class="form-row">
						    <div class="form-group col-6">
						        <label for="nineSpells">9th Level Spells:</label>
						        <input type="number" class="form-control" id="nineSpells" placeholder="0" v-model.number="nineSpells">
						    </div>
						</div>
					</div>
		      	</div>

		      	<div class="modal-footer" slot="footer">
					<button class="btn btn-primary btn-sm" @click="edit">Edit Spells</button>
					<button class="btn btn-danger btn-sm" @click="reset">Cancel</button>
		      	</div>
			</modal>
		</div>
	`,
	props: ["spells"],
	created() {
		this.reset();
	},
	data() {
		return {
			show: false,
			spellType: 'no',
			maxSpellPoints: 0,
			maxSpellLevel: 0,
			oneSpells: 0,
			twoSpells: 0,
			threeSpells: 0,
			fourSpells: 0,
			fiveSpells: 0,
			sixSpells: 0,
			sevenSpells: 0,
			eightSpells: 0,
			nineSpells: 0
		};
	},
	methods: {
		startEdit() {
			this.show = true;
			if (this.spells.spellType) {
				this.spellType = this.spells.spellType;
				if(this.spellType == 'slots') {
					this.oneSpells = this.spells.spellSlots[1] && this.spells.spellSlots[1].length;
					this.twoSpells = this.spells.spellSlots[2] && this.spells.spellSlots[2].length;
					this.threeSpells = this.spells.spellSlots[3] && this.spells.spellSlots[3].length;
					this.fourSpells = this.spells.spellSlots[4] && this.spells.spellSlots[4].length;
					this.fiveSpells = this.spells.spellSlots[5] && this.spells.spellSlots[5].length;
					this.sixSpells = this.spells.spellSlots[6] && this.spells.spellSlots[6].length;
					this.sevenSpells = this.spells.spellSlots[7] && this.spells.spellSlots[7].length;
					this.eightSpells = this.spells.spellSlots[8] && this.spells.spellSlots[8].length;
					this.nineSpells = this.spells.spellSlots[9] && this.spells.spellSlots[9].length;
				} else if(this.spellType == 'points') {
					this.maxSpellPoints = this.spells.maxSpellPoints;
					this.maxSpellLevel = this.spells.maxSpellLevel;
				}
			}
		},
		edit() {
			var data = this.prepareData();
			this.spells.edit(data);
			this.reset();
		},
		prepareData() {
			return {
				spellType: this.spellType,
				oneSpells: this.oneSpells,
				twoSpells: this.twoSpells,
				threeSpells: this.threeSpells,
				fourSpells: this.fourSpells,
				fiveSpells: this.fiveSpells,
				sixSpells: this.sixSpells,
				sevenSpells: this.sevenSpells,
				eightSpells: this.eightSpells,
				nineSpells: this.nineSpells,
				maxSpellPoints: this.maxSpellPoints,
				maxSpellLevel: this.maxSpellLevel
			};
		},
		reset() {
			this.show = false;
			this.spellType = 'no';
			this.maxSpellPoints = 0;
			this.maxSpellLevel = 0;
			this.oneSpells = 0;
			this.twoSpells = 0;
			this.threeSpells = 0;
			this.fourSpells = 0;
			this.fiveSpells = 0;
			this.sixSpells = 0;
			this.sevenSpells = 0;
			this.eightSpells = 0;
			this.nineSpells = 0;
		}

	}	
});

Vue.component('attack', {
	template: `
		<div class="col-md px-0">
			<div class="card rounded-0  h-100">
				<div class="card-header p-2">
					<h3 class="d-inline-block">Attacks</h3>
					<attack-modifier-field class="d-inline-block float-right px-2" v-bind:character="character"  v-bind:targetType="'Modifier'"></attack-modifier-field>
					<attack-modifier-field class="d-inline-block float-right px-2" v-bind:character="character" v-bind:targetType="'Attack'"></attack-modifier-field>
				</div>
				<div class="card-body p-2">
					<ul class="list-inline list-group-item" v-if="character.modifiers.length > 0">
						<li class="list-inline-item pr-4" v-for="(modifier, index) in character.modifiers">
							<input type="checkbox" :value="index" v-model="checkedModifiers">
							<label>{{modifier.name}}</label>
							<attack-modifier-field v-bind:character="character" v-bind:target="modifier" v-bind:targetType="'Modifier'"></attack-modifier-field>
						</li>
					</ul>
					<ul class="list-group" v-if="character.attacks">
						<li class="list-group-item" v-for="attack in character.attacks">
							<span>
								{{attack.name}} |
								<span v-if="attack.attackModifier && attack.attackModifier != 0 && attack.type == 'attack'">
									+{{attack.attackModifier}} |
								</span>
								<span v-if="attack.type == 'save'">
									{{attack.saveType}} save |
								</span>
								<span v-for="(damageObject, index) in attack.damageArray" v-if="damageObject != null && typeof damageObject == 'object'">
									<span v-if="index != 0">&</span>
									{{damageObject.damageDiceNum}}d{{damageObject.damageDice}}
									<span v-if="damageObject.damageModifier && damageObject.damageModifier != 0 ">
										+ {{damageObject.damageModifier}}
									</span> 
									{{damageObject.damageType}} damage
								</span>
							</span>
							<span class="float-right">
								<button class="btn btn-primary btn-sm" @click="rollAttack(attack, 'disadvantage')" v-if="attack.type == 'attack'">Roll with disadvantage!</button>
								<button class="btn btn-primary btn-sm" @click="rollAttack(attack)">Roll!</button>
								<button class="btn btn-primary btn-sm" @click="rollAttack(attack, 'advantage')" v-if="attack.type == 'attack'">Roll with advantage!</button>
							</span>
							<attack-modifier-field v-bind:character="character" v-bind:target="attack" v-bind:targetType="'Attack'"></attack-modifier-field>
						</li>
						<li class="list-group-item" v-if="character.attacks.length < 1">
							Click on 'Add Attack' to add a new attack (ex. 'Longsword') and 'Add Modifier' to add a new attack modifier (ex. 'Sneak Attack').
						</li>
					</ul>
				</div>
			</div>
		</div>
	`,
	props: ["character"],
	data() {
		return {
			checkedModifiers: []
		}
	},
	methods: {
		rollAttack(attack, type) {
			if (this.checkedModifiers.length > 0) {
				this.character.attack(attack, type, this.checkedModifiers);
			} else {
				this.character.attack(attack, type);
			}
		}
	}
});

Vue.component('attack-modifier-field', {
	template: `
		<div>
			<button class="btn btn-primary btn-sm" @click="show = true" v-if="task == 'New'">Add {{targetType}}</button>
			<a class="badge badge-light" @click="startEdit" v-if="task == 'Edit'">Edit {{targetType}}</a>

			<modal v-if="show">

		      	<div class="modal-header card-header" slot="header">
		        	<h5 class="modal-title">{{task}} {{targetType}}</h5>
		        	<button type="button" class="close" @click="reset">
			          	<span aria-hidden="true">&times;</span>
			        </button>
			    </div>

		      	<div class="modal-body" slot="body">
					<div class="my-2">
						Name:
						<input type="text" v-model="name">
					</div>
					<div class="my-2">
						Attack Type: 
						<select v-model="type">
							<option>attack</option>
							<option>save</option>
						</select>
					</div>
					<div class="my-2">
						<span v-if="targetType == 'Attack' && type == 'attack'">
							Attack Modifier: 
							<input class="numInput" type="number" v-model.number="attackModifier">
						</span>
						<span v-if="type == 'save'">
							DC: 
							<input class="numInput" type="number" v-model.number="saveDC">
							Save type:
							<select v-model="saveType">
								<option>STR</option>
								<option>DEX</option>
								<option>CON</option>
								<option>INT</option>
								<option>WIS</option>
								<option>CHA</option>
							</select>					
						</span>
					</div>
					<damage-row  v-for="(damageObject, index) in damageArray" v-model="damageArray[index]" :key="index"></damage-row>
					<button class="btn btn-primary btn-sm rounded-circle" @click="damageArray.push(1)">+</button>
					<button class="btn btn-primary btn-sm rounded-circle" @click="damageArray.pop()" v-if="damageArray.length > 1">&#x2212</button>
				</div>

				<div class="modal-footer" slot="footer">
		        	<button class="btn btn-primary btn-sm" @click="add" v-if="task == 'New'">Add {{targetType}}</button>
					<button class="btn btn-primary btn-sm" @click="edit" v-if="task == 'Edit'">Edit {{targetType}}</button>
					<button class="btn btn-danger btn-sm" @click="reset">Cancel</button>
					<button class="btn btn-danger btn-sm ml-auto" @click="deleteTarget" v-if="task == 'Edit'">Delete {{targetType}}</button>
				</div>

			</modal>
		</div>
	`,
	props: ["character", "target", "targetType"],
	created() {
		this.reset();
	},
	data() {
		return {
			show: false,
			name: '',
			type: '',
			attackModifier: 0,
			saveDC: 0,
			saveType: '',
			task: false,
			damageArray: [1]

		};
	},
	methods: {
		add() {
			var data = this.prepareData();
			if(this.targetType == 'Attack') {
				this.character.addAttack(data);
			} else {
				this.character.addModifier(data);
			}
			this.reset();
		},
		startEdit() {
			this.show = true;
			this.name = this.target.name;	
			this.type = this.target.type;	
			this.attackModifier = this.target.attackModifier;
			this.saveDC = this.target.saveDC;
			this.saveType = this.target.saveType;
			this.damageArray = this.target.damageArray;
		},
		edit() {
			var data = this.prepareData();
			this.target.edit(data);
			this.reset();
		},
		prepareData() {
			return {
				name: this.name,
				type: this.type,
				attackModifier: this.attackModifier,
				saveDC: this.saveDC,
				saveType: this.saveType,
				damageArray: this.damageArray
				};
		},
		deleteTarget() {
			if (confirm('Delete ' + this.target.name + '?')) {
			if(this.targetType == 'Attack') {
				this.character.deleteAttack(this.target);
			} else {
				this.character.deleteModifier(this.target);
			}
				this.reset();
			}
		},
		reset() {
			this.show = false;
			this.name = '';			
			this.type = '';
			this.attackModifier = 0;
			this.saveDC = 0;
			this.saveType = '';
			this.damageArray = [1];
			if (this.target) {
				this.task = 'Edit';
			} else {
				this.task = 'New';
			}
		}

	}	
});

Vue.component('damage-row', {
	template: `
		<div class="my-2 d-inline-block" v-on:change="outputData">
			Damage:
			<input class="numInput" type="number" v-model.number="damageDiceNum">
			d
			<select v-model.number="damageDice">
				<option>4</option>
				<option>6</option>
				<option>8</option>
				<option>10</option>
				<option>12</option>
			</select>
			+ 
			<input class="numInput" type="number" v-model.number="damageModifier">
			<select v-model="damageType">
				<option>Acid</option>
				<option>Bludgeoning</option>
				<option>Cold</option>
				<option>Fire</option>
				<option>Force</option>
				<option>Lightning</option>
				<option>Necrotic</option>
				<option>Piercing</option>
				<option>Poison</option>
				<option>Psychic</option>
				<option>Radiant</option>
				<option>Slashing</option>
				<option>Thunder</option>
			</select>
		</div>
	`,
	props: ["value"],
	data() {
		return {
			damageDiceNum: 0,
			damageDice: null,
			damageModifier: 0,
			damageType: null
		}
	},
	mounted() {
		if (this.value.damageDiceNum) {
			this.damageDiceNum = this.value.damageDiceNum;
			this.damageDice = this.value.damageDice;
			this.damageModifier = this.value.damageModifier;
			this.damageType = this.value.damageType;
		}
	},
	methods: {
		outputData() {
			var data = this.prepareData();
			this.$emit('input', data);
		},
		prepareData() {
			return {
				damageDiceNum: this.damageDiceNum,
				damageDice: this.damageDice,
				damageModifier: this.damageModifier,
				damageType: this.damageType
			}
		}
	}
})

Vue.component('resources', {
	template: `
		<div class="px-0" v-bind:class="{'col-md-3': character.showNotepad == 'Show', 'col-md': character.showNotepad != 'Show'}" v-if="character.showResources == 'Show'">
			<div class="card rounded-0  h-100">
				<div class="card-header p-2">
					<h3 class="d-inline-block">Resources</h3>
				</div>
				<div class="card-body p-2 d-flex flex-column">
					<span v-if="character.resources.length <= 0">
						If you don't have any resources to add, you can hide this section by clicking 'Toggle Resources' from the dropdown menu next to the character's name.
					</span>
					<counters v-bind:character="character" v-bind:counterArray="character.resources" v-bind:counterType="'Resource'"></counters>
				</div>
			</div>
		</div>			
	`,
	props: ["character"]
});


Vue.component('counters', {
	template: `
		<div class="d-flex flex-column" style="flex: 1;">
			<ul class="list-group list-group-flush">
				<li class="pb-2" v-if="counterArray" v-for="counter in counterArray">
					{{counter.name}}: 
					<a class="col-2 p-0" v-if="counter.type == 'slots'" v-for="slot in counter.slots" @click="switchSlot(slot)">
						{{slot.value}}
					</a>
					<span v-if="counter.type == 'points'">
						<input type="number" class="numInput" v-model="counter.current">
						/ {{counter.total}}
					</span>
					<counter-field v-bind:character="character" v-bind:counter="counter" v-bind:counterType="counterType"></counter-field>
				</li>
			</ul>
			<counter-field v-bind:character="character" v-bind:counterType="counterType"></counter-field>		
		</div>
	`,
	props: ["character", "counterArray", "counterType"],
	methods: {
		switchSlot(slot) {
			if (slot.used) {
				slot.used = false;
				slot.value = "\u26AA";
			} else {
				slot.used = true;
				slot.value = "\u26AB";
			}	
		}
	}
});

Vue.component('counter-field', {
	template: `
		<div class="d-flex" style="flex: 1;">
			<button class="btn btn-primary btn-sm mt-auto mx-auto" @click="show = true" v-if="task == 'New'">Add {{counterType}}</button>
			<a class="badge badge-light" @click="startEdit" v-if="task == 'Edit'">Edit</a>

			<modal v-if="show">
		      	<div class="modal-header card-header" slot="header">
		        	<h5 class="modal-title">{{task}} {{counterType}}</h5>
		        	<button type="button" class="close" @click="reset">
			          	<span aria-hidden="true">&times;</span>
			        </button>
		      	</div>

		      	<div class="modal-body" slot="body">
					<div class="my-2">
						Name:
						<input type="text" v-model="name">
					</div>
					<div class="my-2">
						<span v-if="counterType == 'Spell Counter'">Number of Rounds:</span>
						<span v-if="counterType == 'Resource'">Total:</span>
						<input class="numInput" type="number" v-model.number="total">
					</div>
					<div class="my-2">
						Points or Slots:
						<div class="form-check form-check-inline">
						    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="slots" value="slots" v-model="type">
						    <label class="form-check-label" for="slots">Slots</label>
						</div>
						<div class="form-check form-check-inline">
						    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="points" value="points" v-model="type">
						    <label class="form-check-label" for="points">Points</label>
						</div>
					</div>							
		      	</div>

		      	<div class="modal-footer" slot="footer">
		        	<button class="btn btn-primary btn-sm" @click="add" v-if="task == 'New'">Add {{counterType}}</button>
					<button class="btn btn-primary btn-sm" @click="edit" v-if="task == 'Edit'">Edit {{counterType}}</button>
					<button class="btn btn-danger btn-sm" @click="reset">Cancel</button>
					<button class="btn btn-danger btn-sm ml-auto" @click="deleteTarget" v-if="task == 'Edit'">Delete {{counterType}}</button>
				</div>
			</modal>
		</div>
	`,
	props: ["character", "counter", "counterType"],
	created() {
		this.reset();
	},
	data() {
		return {
			show: false,
			name: '',
			type: '',
			total: 0,
			task: false
		};
	},
	methods: {
		add() {
			var data = this.prepareData();
			if (this.counterType == 'Resource') {
				this.character.addResource(data);
			} else if (this.counterType == 'Spell Counter') {
				this.character.spells.addCounter(data);
			}
			this.reset();
		},
		startEdit() {
			this.show = true;
			this.name = this.counter.name;	
			this.type = this.counter.type;
			this.total = this.counter.total;
		},
		edit() {
			var data = this.prepareData();
			this.counter.edit(data);
			this.reset();
		},
		prepareData() {
			return {
				name: this.name,
				type: this.type,
				total: this.total
			};
		},
		deleteTarget() {
			if (confirm('Delete ' + this.counter.name + '?')) {
				if (this.counterType == 'Resource') {
					this.character.deleteResource(this.counter);
				} else if (this.counterType == 'Spell Counter') {
					this.character.spells.deleteCounter(this.counter);
				}
				this.reset();
			}
		},
		reset() {
			this.show = false;
			this.name = '';			
			this.type = 'slots';
			this.total = 0;
			if (this.counter) {
				this.task = 'Edit';
			} else {
				this.task = 'New';
			}
		}

	}	
});

Vue.component('notepad', {
	template: `
		<div class="card col-md px-0 rounded-0" v-if="character.showNotepad == 'Show'">
			<div class="card-header p-2">
				<h3 class="d-inline-block">Notepad</h3>
			</div>
			<div class="card-body"
				<textarea placeholder="If you don't want to keep any notes here, you can toggle this section by clicking 'Toggle Notepad' from the dropdown menu next to the character's name." v-model="character.notes">
				</textarea>
			</div>

		</div>
	`,
	props: ["character"]
});

Vue.component('feed', {
	template:`
	<div class="card col-md px-0 rounded-0">
		<div class="card-header p-2">
			<h3 class="d-inline-block">Feed</h3>
			<button type="button" class="close" @click="clearFeed">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
		<div class="card-body p-2 feed-div">
			<ul class="list-group feed-body pr-2">
				<li class="list-group-item feed-item" v-for="item in feed" :class="isCritical(item)">{{ item.feedText }}</li>
			</ul>
		</div>
	</div>
	`,
	props: ['feed'],
	methods: {
		isCritical(item) {
			if (item.critical == 'critSuccess') {
				return 'text-success';
			} else if (item.critical == 'critFail') {
				return 'text-danger';
			}
		},
		clearFeed() {
			app.feed = [];
		}
	}
});

Vue.component('home', {
	template: `
		<div>
			<h1 class="card-header border-left border-right">
				Character Manager
			</h1>
			<div class="row m-auto" >
				<div class="card d-inline-block col-md rounded-0">
					<div class="card-body">

						Welcome to my D&D Character Manager! This web app will help you manage your characters' attacks, spells, resources, dice rolls, etc.  In order to get started, 'Create a Character' in the navbar.  Once your character is created, you can add attacks, modifiers, and resources on that character's page.<br><br>
						  If you need to change your character's stats, select 'Edit (character name)' from the dropdown next to the character's name on that character's page. <br><br>
						  Any stat can be rolled by clicking on it.
					</div>
				</div>
			</div>
			<div class="row m-auto">
				<div class="card d-inline-block col-12 rounded-0 p-0">
					<h3 class="card-header">
						Saving and Loading
					</h3>
					<div class="card-body">
						Your character data is automatically saved in local storage on your browser.  This means that as long as you don't clear your browser data, your character data will always be here ready for your next session. <br><br>
						This is only true for this browser and the computer that you are using now.  For example, say you are using Chrome now, but if you return on Firefox next time, your data will not be here, because it is saved in Chrome's local storage.  The same is true if you use a different computer.  The data is only stored on the browser you are using now for the computer you are using now.<br><br>
						Should you feel the need to clear your browser data, use a different browser, or use a different computer, you can download your character data and upload it next time you on whatever browser (and computer) next time you visit.
					</div>
				</div>
				<div class="card d-inline-block col-md-6 rounded-0 p-0">
					<h3 class="card-header">
						Export Data
					</h3>
					<div class="card-body">
						<button class="btn btn-primary btn-sm" id="export" @click="exportData">Export Data</button>
					</div>
				</div>
				<div class="card d-inline-block col-md-6 rounded-0 p-0">
					<h3 class="card-header">
						Import Data
					</h3>
					<div class="card-body">
						<input type="file" id="selectFiles" value="Import" /><br />
						<button class="btn btn-primary btn-sm my-2" id="import" @click="importData">Import Data</button><br>	
						Note: importing will overwrite any locally stored characters.

					</div>
				</div>
			</div>


		</div>
	`,
	methods: {
		exportData() {
			console.log('entered export');

		    if(!app.characters) {
		        alert('error : No data')
		        return;
		    }

		    var jsonCharacters = JSON.stringify(app.characters);

		  	var a = document.createElement('a');
		  	document.body.appendChild(a);
		  	a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(jsonCharacters));
		  	a.setAttribute('download', 'characterData.json');
		  	a.click()
		  	console.log(a);
		 },

		importData() {
			var files = $('#selectFiles').prop('files')[0];
			console.log(files);
			if (files.length <= 0) {
				return false;
			}

			var fr = new FileReader();

			fr.onload = function(retrievedObject) { 
				var jsonCharacters = JSON.parse(retrievedObject.target.result);
				app.characters = [];
				for (var i=0;i<jsonCharacters.length;i++) {
					console.log(i + '/' + jsonCharacters.length);
					app.characters.push(new Character(jsonCharacters[i]));
				}
			}

			fr.readAsText(files);
		}	
	}

});

Vue.component('dice-roller',{
	template: `
		<div>
			<div class="card-header border-left border-right">
				<h1>Roll the Dice!</h1>
			</div>

			<div class="row m-auto">
				<div class="col-md-5 card px-0">
					<h3 class="card-header">How Many / Die / Modifier</h3>
					<ul class="list-group">
						<li class="list-group-item" id="dice-list-item" v-for="die in dice">
							<div class="row my-2 mx-1 text-center">
								<input class="col numInput" type="number" v-model.number="die.rollTimes">
								<span class="col">d{{die.die}} +</span>
								<input class="col numInput" type="number" v-model.number="die.modifier">	
								<button class="btn btn-primary btn-sm col mx-1" @click="roll(die)">Roll</button>
							</div>
						</li>
					</ul>
				</div>

				<div class="col-md card px-0">
					<h3 class="card-header">Feed</h3>
					<ul class="list-group">
						<li class="list-group-item" v-for="item in feed">{{ item }}</li>
					</ul>
				</div>
			</div>
			<button class="btn btn-danger btn-sm float-right mt-2" @click="reset()">Reset</button>
		</div>
	`,
	props: ['feed'],
	data() {
		return {
			dice: [
				{ die: 4, rollTimes: 1, modifier: 0 },
				{ die: 6, rollTimes: 1, modifier: 0 },
				{ die: 8, rollTimes: 1, modifier: 0 },
				{ die: 10, rollTimes: 1, modifier: 0 },
				{ die: 12, rollTimes: 1, modifier: 0 },
				{ die: 20, rollTimes: 1, modifier: 0 },
				{ die: 100, rollTimes: 1, modifier: 0 }
			]
		}
	},
	methods: {
		roll(die) {
			var result = [];
			for(i=0;i<die.rollTimes;i++) {
				result.push(Math.floor(Math.random() * die.die) + 1);
			}
			var total = 0;
			for(i=0;i<result.length;i++) {
				total = total + result[i];
			}
			var modifiedTotal = total + die.modifier;
			var resultString = "Rolled " + die.rollTimes + "d" + die.die + " for [" + result + "] + " + die.modifier + " = " + modifiedTotal + ".";
			if(this.feed.length >= 10) {
				this.feed.pop();
			}
			app.diceRollerFeed.unshift(resultString);
		},
		reset() {
			this.dice = [
				{ die: 4, rollTimes: 1, modifier: 0 },
				{ die: 6, rollTimes: 1, modifier: 0 },
				{ die: 8, rollTimes: 1, modifier: 0 },
				{ die: 10, rollTimes: 1, modifier: 0 },
				{ die: 12, rollTimes: 1, modifier: 0 },
				{ die: 20, rollTimes: 1, modifier: 0 },
				{ die: 100, rollTimes: 1, modifier: 0 },
			],
			app.diceRollerFeed = [];
		}
	}
});

Vue.component('modal', {
	template:`
		<transition name="modal">
		    <div class="modal-mask">
		        <div class="modal-dialog modal-dialog-centered" v-bind:class="{'modal-lg': input == 'character-editor'}" role="document">
		            <div class="modal-content">

	                    <slot name="header">
	                        default header
	                    </slot>


	                    <slot name="body">
	                        default body
	                    </slot>

	                    <slot name="footer">

	                    </slot>

		            </div>
		        </div>
		    </div>
		</transition>
	`,
	props: ['input'],
	mounted() {
		$('body').addClass("overflow-hidden");
	},
	beforeDestroy() {
		$('body').removeClass("overflow-hidden");
	}
});

const app = new Vue({
	el: '#app',
	data: {
		characters: [],

		feed: [],

		diceRollerFeed: [],

		selected: null
		
	},
	created() {
		this.selected = 'home';		
	},
	methods: {
		createCharacter(newCharacter) {
			this.characters.push(newCharacter);
			this.characters.sort(sort_by('name', false, function(a){return a.toUpperCase()}));
			this.selected = newCharacter;
		},
		deleteCharacter(removingCharacter) {
			var index = this.characters.indexOf(removingCharacter);
			delete this.characters[index];
			var newArray = [];
			for (i=0;i<this.characters.length;i++) {
				if (this.characters[i]) {
					newArray.push(this.characters[i]);
				}
			}
			this.characters = newArray;
			this.selected = 'home';
			$('.nav').find('.active').removeClass('active');
		},
		addToFeed(input, roll = false) {
			if(this.feed.length >= 30) {
				this.feed.pop();
			}
			this.feed.unshift(new FeedItem(input, roll));
		}
	}

});

function getData() {
	console.log('getting data');
	var retrievedObject;
	if (retrievedObject = localStorage.getItem('appCharacters')) {
		var jsonCharacters = JSON.parse(retrievedObject);
		for (var i=0;i<jsonCharacters.length;i++) {
			console.log(i + '/' + jsonCharacters.length);
			app.characters.push(new Character(jsonCharacters[i]));
		}
	}
}

function saveData() {
	window.setInterval(function(){
			console.log('saving to localStorage');
			localStorage.setItem('appCharacters', JSON.stringify(app.characters));
		}, 10000);
}


$(document).ready(function() {
	getData();
	saveData();
});


window.onbeforeunload = function(){
	console.log('saving to localStorage');
	localStorage.setItem('appCharacters', JSON.stringify(app.characters));
};

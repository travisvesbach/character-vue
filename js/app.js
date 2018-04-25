class Character {

	constructor(input) {
		this.name = input.name;
		this.level = input.level;
		this.maxHp = input.maxHp;
		this.strength = input.strength;
		this.strengthSave = input.strengthSave;
		this.athletics = input.athletics;
		this.dexterity = input.dexterity;
		this.dexteritySave = input.dexteritySave;
		this.acrobatics = input.acrobatics;
		this.sleightOfHand = input.sleightOfHand;
		this.stealth = input.stealth;
		this.constitution = input.constitution;
		this.constitutionSave = input.constitutionSave;
		this.intelligence = input.intelligence;
		this.intelligenceSave = input.intelligenceSave;
		this.arcana = input.arcana;
		this.history = input.history;
		this.investigation = input.investigation;
		this.nature = input.nature;
		this.religion = input.religion;
		this.wisdom = input.wisdom;
		this.wisdomSave = input.wisdomSave;
		this.animalHandling = input.animalHandling;
		this.insight = input.insight;
		this.medicine = input.medicine;
		this.perception = input.perception;
		this.survival = input.survival;
		this.charisma = input.charisma;
		this.charismaSave = input.charismaSave;
		this.deception = input.deception;
		this.intimidation = input.intimidation;
		this.performance = input.performance;
		this.persuasion = input.persuasion;
		this.spells = input.spells;
		if(this.spells == 'yes') {
			this.oneSpells = input.oneSpells;
			this.twoSpells = input.twoSpells;
			this.threeSpells = input.threeSpells;
			this.fourSpells = input.fourSpells;
			this.fiveSpells = input.fiveSpells;
			this.sixSpells = input.sixSpells;
			this.sevenSpells = input.sevenSpells;
			this.eightSpells = input.eightSpells;
			this.nineSpells = input.nineSpells;
		}
		this.attacks = [];
		if (input.attacks) {
			for (var j=0;j<input.attacks.length;j++) {
				this.addAttack(input.attacks[j]);
			}
		}
		this.currentHp = this.maxHp;
		console.log('Character ' + this.name + ' created!');

	}

	addAttack(attackData) {
		this.attacks.push(new Attack(attackData));
	}

	attack(attack, type = 'normal'){
		var output = attack.makeAttack(type);
		app.addToFeed(output);
	}

}


class Attack {

	constructor(attackData) {
		this.name = attackData.name;
		if(attackData.attackType == 'roll') {
			this.attackType = attackData.attackType;
			this.attackModifier = attackData.attackModifier;
		} else if (attackData.attackType == 'save' ) {
			this.attackType = attackData.attackType;
			this.saveDC = attackData.saveDC;
			this.saveType = attackData.saveType;
		}
		this.damageDiceNum = attackData.damageDiceNum;
		this.damageDice = attackData.damageDice;
		this.damageModifier = attackData.damageModifier;
		console.log(this.name + " has been added");
	}

	makeAttack(type = 'normal') {
		var attackRoll = null;
		var results = [];
		if (this.attackType == 'roll') {
			var fromRollAttack = this.rollAttack(type);
			attackRoll = fromRollAttack[0];
			fromRollAttack.shift();
			results = fromRollAttack;
		} else if (this.attackType == 'save') {
			results = this.rollSave();
		}
		results = this.rollDamage(results, attackRoll)

		console.log(results);
		return results.join('\n');
	}

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

	rollSave(){
		var output = [];
		output.push(this.name + ':');
		output.push('Your target(s) need(s) to make a DC ' + this.saveDC + ' ' + this.saveType + ' saving throw.');
		return output;
	}

	rollDamage(results, attackRoll = null) {
		var damageRoll = null
		var damageTotal = this.damageModifier;
		var damageRollsArray = [];
		if (attackRoll == 20) {
			results.push('You crit!');
			for(var i=0;i<2;i++) {
				console.log(i + ' time through crit loop');
				for(var x=0;x<this.damageDiceNum;x++) { 
					damageRoll = dice.roll(this.damageDice);
					damageTotal = damageTotal + damageRoll;
					damageRollsArray.push(damageRoll);
				}
			}
		} else {
			for(var i=0;i<this.damageDiceNum;i++) { 
					damageRoll = dice.roll(this.damageDice);
					damageTotal = damageTotal + damageRoll;
					damageRollsArray.push(damageRoll);
			}
		}
		results.push('Damage roll: [' + damageRollsArray + '] + ' + this.damageModifier + ' = ' + damageTotal);

		return results;
	}

	editAttack(attackData) {
		this.name = attackData.name;
		if(attackData.attackType == 'roll') {
			this.attackType = attackData.attackType;
			this.attackModifier = attackData.attackModifier;
		} else if (attackData.attackType == 'save' ) {
			this.attackType = attackData.attackType;
			this.saveDC = attackData.saveDC;
			this.saveType = attackData.saveType;
		}
		this.damageDiceNum = attackData.damageDiceNum;
		this.damageDice = attackData.damageDice;
		this.damageModifier = attackData.damageModifier;
		console.log(this.name + " has been edited");
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



Vue.component('nav-vue', {
	template: `
		<nav>
			<ul class="nav nav-tabs">
			    <li class="nav-item"  v-for="character in characterList" @click="select(character)">
			        <a class="nav-link">{{character.name}}</a>
			    </li>
			    <li class="nav-item ml-auto" @click="select('create-character')">
			    	<a class="nav-link">Create a Character</a>
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
			<h1 class="card-header">{{character.name}}</h1>
			HP: <input type="number" class="numInput" v-model.number="character.currentHp"> 
			out of {{character.maxHp}}
			<hr>
			<div class="row">
				<div class="col-md-3" >
					stats will go here
				</div>
				<div class="col-md-9"
					<attack v-bind:character="character"></attack>
				</div>
			</div>
		</div>
	`,
	props: ["character"]
});

Vue.component('create-character', {
	template: `
		<div>
			<h1 class="card-header">Create a Character</h1>
			<form>
				<h4>Basic info</h4>
			    <div class="form-group">
			        <label for="name">Name:</label>
			        <input type="text" class="form-control" id="name" placeholder="Enter character name" v-model="name">
			    </div>
			    <div class="form-group">
			        <label for="characterLevel">Level:</label>
			        <input type="number" class="form-control" id="characterLevel" placeholder="0" v-model="level">
			    </div>
			    <div class="form-group">
			        <label for="characterMaxHp">Max HP:</label>
			        <input type="number" class="form-control" id="characterMaxHp" placeholder="0" v-model="maxHp">
			    </div>
				
				<hr>
				<h4>Stats</h4>
			    <div class="form-group">
			        <label for="characterStrength"><b>Strength:</b></label>
			        <input type="number" class="form-control" id="characterStrength" placeholder="0" v-model="strength">
			    </div>
			    <div class="form-check">
				    <label for="strengthSave">Save</label>
				    <input type="number" class="form-control" id="strengthSave" placeholder="0" v-model="strengthSave">
				</div>
				<div class="form-check">
				    <label class="form-check-label" for="athletics">Athletics</label>
				    <input type="number" class="form-control" id="athletics" placeholder="0" v-model="athletics">
				</div>
				
				<hr>
			    <div class="form-group">
			        <label for="characterDexterity"><b>Dexterity:</b></label>
			        <input type="number" class="form-control" id="characterDexterity" placeholder="0" v-model="dexterity">
			    </div>			
			    <div class="form-check">
				    <label class="form-check-label" for="dexteritySave">Save</label>
				    <input type="number" class="form-control" id="dexteritySave" placeholder="0" v-model="dexteritySave">
				</div>
				<div class="form-check">
				    <label class="form-check-label" for="acrobatics">Acrobatics</label>
				    <input type="number" class="form-control" id="acrobatics" placeholder="0" v-model="acrobatics">
				</div>
			    <div class="form-check">
				    <label class="form-check-label" for="sleightOfHand">Sleight of Hand</label>
				    <input type="number" class="form-control" id="sleightOfHand" placeholder="0" v-model="history">
				</div>
				<div class="form-check">
				    <label class="form-check-label" for="stealth">Stealth</label>
				    <input type="number" class="form-control" id="stealth" placeholder="0" v-model="stealth">
				</div>

				<hr>
			    <div class="form-group">
			        <label for="characterConstitution"><b>Constitution:</b></label>
			        <input type="number" class="form-control" id="characterConstitution" placeholder="0" v-model="constitution">
			    </div>
			    <div class="form-check">
				    <label class="form-check-label" for="constitutionSave">Save</label>
				    <input type="number" class="form-control" id="constitutionSave" placeholder="0" v-model="constitutionSave">
				</div>

				<hr>
			    <div class="form-group">
			        <label for="characterIntelligence"><b>Intelligence:</b></label>
			        <input type="number" class="form-control" id="characterIntelligence" placeholder="0" v-model="intelligence">
			    </div>
			    <div class="form-check">
				    <label class="form-check-label" for="intelligenceSave">Save</label>
				    <input type="number" class="form-control" id="intelligenceSave" placeholder="0" v-model="intelligenceSave">
				</div>
				<div class="form-check">
				    <label class="form-check-label" for="arcana">Arcana</label>
				    <input type="number" class="form-control" id="arcana" placeholder="0" v-model="arcana">
				</div>
			    <div class="form-check">
				    <label class="form-check-label" for="history">History</label>
				    <input type="number" class="form-control" id="history" placeholder="0" v-model="history">
				</div>
				<div class="form-check">
				    <label class="form-check-label" for="investigation">Investigation</label>
				    <input type="number" class="form-control" id="investigation" placeholder="0" v-model="investigation">
				</div>
			    <div class="form-check">
				    <label class="form-check-label" for="nature">Nature</label>
				    <input type="number" class="form-control" id="nature" placeholder="0" v-model="nature">
				</div>
				<div class="form-check">
				    <label class="form-check-label" for="religion">Religion</label>
				    <input type="number" class="form-control" id="religion" placeholder="0" v-model="religion">
				</div>

				<hr>
			    <div class="form-group">
			        <label for="characterWisdom"><b>Wisdom:</b></label>
			        <input type="number" class="form-control" id="characterWisdom" placeholder="0" v-model="wisdom">
			    </div>
			    <div class="form-check">
				    <label class="form-check-label" for="wisdomSave">Save</label>
				    <input type="number" class="form-control" id="wisdomSave" placeholder="0" v-model="wisdomSave">
				</div>
				<div class="form-check">
				    <label class="form-check-label" for="animalHandling">Animal Handling</label>
				    <input type="number" class="form-control" id="animalHandling" placeholder="0" v-model="animalHandling">
				</div>
			    <div class="form-check">
				    <label class="form-check-label" for="insight">Insight</label>
				    <input type="number" class="form-control" id="insight" placeholder="0" v-model="insight">
				</div>
				<div class="form-check">
				    <label class="form-check-label" for="medicine">Medicine</label>
				    <input type="number" class="form-control" id="medicine" placeholder="0" v-model="medicine">
				</div>
			    <div class="form-check">
				    <label class="form-check-label" for="perception">Perception</label>
				    <input type="number" class="form-control" id="perception" placeholder="0" v-model="perception">
				</div>
				<div class="form-check">
				    <label class="form-check-label" for="survival">Survival</label>
				    <input type="number" class="form-control" id="survival" placeholder="0" v-model="survival">
				</div>			

				<hr>
			    <div class="form-group">
			        <label for="characterCharisma"><b>Charisma:</b></label>
			        <input type="number" class="form-control" id="characterCharisma" placeholder="0" v-model="charisma">
			    </div>
			    <div class="form-check">
				    <label class="form-check-label" for="charismaSave">Save</label>
				    <input type="number" class="form-control" id="charismaSave" placeholder="0" v-model="charismaSave">
				</div>
				<div class="form-check">
				    <label class="form-check-label" for="deception">Deception</label>
				    <input type="number" class="form-control" id="deception" placeholder="0" v-model="deception">
				</div>
				<div class="form-check">
				    <label class="form-check-label" for="intimidation">Intimidation</label>
				    <input type="number" class="form-control" id="intimidation" placeholder="0" v-model="intimidation">
				</div>
				<div class="form-check">
				    <label class="form-check-label" for="performance">Performance</label>
				    <input type="number" class="form-control" id="performance" placeholder="0" v-model="performance">
				</div>
				<div class="form-check">
				    <label class="form-check-label" for="persuasion">Persuasion</label>
				    <input type="number" class="form-control" id="persuasion" placeholder="0" v-model="persuasion">
				</div>

				<h4>Spells</h4>
				<div class="form-check form-check-inline">
				    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="yesSpells" value="yes" v-model="spells">
				    <label class="form-check-label" for="yesSpells">Yes</label>
				</div>
				<div class="form-check form-check-inline">
				    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="noSpells" value="no" v-model="spells">
				    <label class="form-check-label" for="noSpells">No</label>
				</div>
				<div v-if="spells == 'yes'">
					<div class="form-group">
				        <label for="oneSpells">1st Level Spells:</label>
				        <input type="number" class="form-control" id="oneSpells" placeholder="0" v-model="oneSpells">
				    </div>
				    <div class="form-group">
				        <label for="twoSpells">2nd Level Spells:</label>
				        <input type="number" class="form-control" id="twoSpells" placeholder="0" v-model="twoSpells">
				    </div>
				    <div class="form-group">
				        <label for="threeSpells">3rd Level Spells:</label>
				        <input type="number" class="form-control" id="threeSpells" placeholder="0" v-model="threeSpells">
				    </div>
				    <div class="form-group">
				        <label for="fourSpells">4th Level Spells:</label>
				        <input type="number" class="form-control" id="fourSpells" placeholder="0" v-model="fourSpells">
				    </div>
				    <div class="form-group">
				        <label for="fiveSpells">5th Level Spells:</label>
				        <input type="number" class="form-control" id="fiveSpells" placeholder="0" v-model="fiveSpells">
				    </div>
				    <div class="form-group">
				        <label for="sixSpells">6th Level Spells:</label>
				        <input type="number" class="form-control" id="sixSpells" placeholder="0" v-model="sixSpells">
				    </div>
				    <div class="form-group">
				        <label for="sevenSpells">7th Level Spells:</label>
				        <input type="number" class="form-control" id="sevenSpells" placeholder="0" v-model="sevenSpells">
				    </div>
				    <div class="form-group">
				        <label for="eightSpells">8th Level Spells:</label>
				        <input type="number" class="form-control" id="eightSpells" placeholder="0" v-model="eightSpells">
				    </div>
				    <div class="form-group">
				        <label for="nineSpells">9th Level Spells:</label>
				        <input type="number" class="form-control" id="nineSpells" placeholder="0" v-model="nineSpells">
				    </div>
				</div>

			    <button type="button" class="btn btn-primary" @click="createCharacter">Submit</button>
			</form>
		</div>
	`,
	data() {
		return {
			name: '',
			level: '',
			maxHp: '',
			strength: 0,
			strengthSave: 0,
			athletics: 0,
			dexterity: 0,
			dexteritySave: 0,
			acrobatics: 0,
			sleightOfHand: 0,
			stealth: 0,
			constitution: 0,
			constitutionSave: 0,
			intelligence: 0,
			intelligenceSave: 0,
			arcana: 0,
			history: 0,
			investigation: 0,
			nature: 0,
			religion: 0,
			wisdom: 0,
			wisdomSave: 0,
			animalHandling: 0,
			insight: 0,
			medicine: 0,
			perception: 0,
			survival: 0,
			charisma: 0,
			charismaSave: 0,
			deception: 0,
			intimidation: 0,
			performance: 0,
			persuasion: 0,
			spells: null,
			oneSpells: null,
			twoSpells: null,
			threeSpells: null,
			fourSpells: null,
			fiveSpells: null,
			sixSpells: null,
			sevenSpells: null,
			eightSpells: null,
			nineSpells: null

			
		};
	},
	methods: {
		createCharacter() {
			console.log('entering createCharacter');
			var characterData = {
				name: this.name,
				level: this.level,
				maxHp: this.maxHp,
				strength: this.strength,
				strengthSave: this.strengthSave,
				athletics: this.athletics,
				dexterity: this.dexterity,
				dexteritySave: this.dexteritySave,
				acrobatics: this.acrobatics,
				sleightOfHand: this.sleightOfHand,
				stealth: this.stealth,
				constitution: this.constitution,
				constitutionSave: this.constitutionSave,
				intelligence: this.intelligence,
				intelligenceSave: this.intelligenceSave,
				arcana: this.arcana,
				history: this.history,
				investigation: this.investigation,
				nature: this.nature,
				religion: this.religion,
				wisdom: this.wisdom,
				wisdomSave: this.wisdomSave,
				animalHandling: this.animalHandling,
				insight: this.insight,
				medicine: this.medicine,
				perception: this.perception,
				survival: this.survival,
				charisma: this.charisma,
				charismaSave: this.charismaSave,
				deception: this.deception,
				intimidation: this.intimidation,
				performance: this.performance,
				persuasion: this.persuasion,
				spells: this.spells,
				oneSpells: this.oneSpells,
				twoSpells: this.twoSpells,
				threeSpells: this.threeSpells,
				fourSpells: this.fourSpells,
				fiveSpells: this.fiveSpells,
				sixSpells: this.sixSpells,
				sevenSpells: this.sevenSpells,
				eightSpells: this.eightSpells,
				nineSpells: this.nineSpells
			};
			console.log(characterData);
			if(newCharacter = new Character(characterData)) {
				app.characters.push(newCharacter);
				app.selected = newCharacter;
				$(".nav").find(".active").removeClass("active");
				$(".nav-link:contains(this.name)").tab('show');
    			//$(".nav-link:contains(this.name)").addClass("active");
			}
		}
	}

});

Vue.component('attack', {
	template: `
		<div class="card col">
			<div class="card-header">
				<h3>Attacks</h3>
			</div>
			<div class="card-body">
				<ul class="list-group" v-if="character.attacks" v-for="attack in character.attacks">
					<li class="list-group-item">
						{{attack.name}} 
						{{attack.attackModifier}} 
						{{attack.damageDiceNum}}d{{attack.damageDice}} 
						{{attack.damageModifier}} 
						<button class="btn btn-primary" @click="character.attack(attack, 'disadvantage')" v-if="attack.attackType == 'roll'">Roll with disadvantage!</button>
						<button class="btn btn-primary" @click="character.attack(attack)">Roll!</button>
						<button class="btn btn-primary" @click="character.attack(attack, 'advantage')" v-if="attack.attackType == 'roll'">Roll with advantage!</button>
						<attack-field v-bind:character="character" v-bind:attack="attack"></attack-field>

					</li>
				</ul>
			</div>
			<div class="card-footer">
				<attack-field v-bind:character="character"></attack-field>
			</div>
		</div>
	`,
	props: ["character"]
});

Vue.component('attack-field', {
	template:`
		<div>
			<button class="btn btn-primary btn-sm" @click="show = true" v-if="newAttack && show == false">Add Attack</button>
			<button class="btn btn-primary btn-sm" @click="show = true" v-if="changeAttack && show == false">Edit Attack</button>

			<div class="my-2" v-if="show">
				<div v-if="newAttack">
					<h6>Adding Attack</h6>
				</div>
				<div v-if="changeAttack">
					<hr>
					<h6>Editing:</h6>
				</div>
				<div class="my-2">
				Name:
				<input type="text" v-model="name">
				</div>
				<div class="my-2">
				Attack Type: 
				<select v-model="attackType">
					<option>roll</option>
					<option>save</option>
				</select>
				</div>
				<div class="my-2">
				<span v-if="attackType == 'roll'">
					Attack Modifier: 
					<input class="numInput" type="number" v-model="attackModifier">
				</span>
				<span v-if="attackType == 'save'">
					DC: 
					<input class="numInput" type="number" v-model="saveDC">
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
				<div class="my-2">
				Damage:
				<input class="numInput" type="number" v-model="damageDiceNum">
				d
				<select v-model="damageDice">
					<option>4</option>
					<option>6</option>
					<option>8</option>
					<option>10</option>
					<option>12</option>
				</select>
				+ 
				<input class="numInput" type="number" v-model="damageModifier">
				</div>
				<button class="btn btn-primary btn-sm" @click="addAttack" v-if="newAttack">Add Attack</button>
				<button class="btn btn-primary btn-sm" @click="editAttack" v-if="changeAttack">Edit Attack</button>
				<button class="btn btn-danger btn-sm" @click="reset">Cancel</button>
			</div>
		</div>
	`,
	props: ["character", "attack"],
	created() {
		this.reset();
	},
	data() {
		return {
			show: false,
			name: '',
			attackType: '',
			attackModifier: 0,
			saveDC: 0,
			saveType: '',
			damageDiceNum: 0,
			damageDice: 0,
			damageModifier: 0,
			newAttack: false,
			changeAttack: false
		};
	},
	methods: {
		addAttack() {
			var attackData = this.prepareAttackData();
			this.character.addAttack(attackData);
			this.reset();
		},
		editAttack() {
			var attackData = this.prepareAttackData();
			this.attack.editAttack(attackData);
			this.reset();
		},
		prepareAttackData() {
			var output = {
				name: this.name,
				attackType: this.attackType,
				attackModifier: parseInt(this.attackModifier),
				saveDC: parseInt(this.saveDC),
				saveType: this.saveType,
				damageDiceNum: parseInt(this.damageDiceNum),
				damageDice: parseInt(this.damageDice),
				damageModifier: parseInt(this.damageModifier)
				};
			return output;
		},
		reset() {
			if (this.attack) {
				this.show = false;
				this.name = this.attack.name;			
				this.attackType = this.attack.attackType;
				this.attackModifier = this.attack.attackModifier;
				this.saveDC = this.attack.saveDC;
				this.saveType = this.attack.saveType;
				this.damageDiceNum = this.attack.damageDiceNum;
				this.damageDice = this.attack.damageDice;
				this.damageModifier = this.attack.damageModifier;
				this.changeAttack = true;
			} else {
				this.show = false;
				this.name = '';			
				this.attackType = '';
				this.attackModifier = 0;
				this.saveDC = 0;
				this.saveType = '';
				this.damageDiceNum = 0;
				this.damageDice = 0;
				this.damageModifier = 0;
				this.newAttack = true;
				this.changeAttack = false;
			}
		}

	}
});

const app = new Vue({
	el: '#app',
	data: {
		characters: [],

		feed: [],

		selected: null
		
	},
	created() {
		tom = new Character({name: 'tom', level: 7, maxHp: 56});
		this.characters.push(tom);
		bob = new Character({name: 'bob', level: 9, maxHp: 66});
		this.characters.push(bob);
		steve = new Character({name: 'steve', level: 9, maxHp: 66});
		this.characters.push(steve);		
	},
	methods: {
		createCharacter() {

		},
		addToFeed(input) {
			this.feed.unshift(input);
		}
	}
});


$(".nav .nav-link").on("click", function(){
   $(".nav").find(".active").removeClass("active");
   $(this).addClass("active");
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
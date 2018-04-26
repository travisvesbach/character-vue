class Character {

	constructor(input) {
		this.name = input.name;
		this.level = input.level;
		this.maxHp = input.maxHp;
		this.ac = input.ac;
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
		if (input.currentHp) {
			this.currentHp = input.currentHp;
		} else {
			this.currentHp = this.maxHp;
		}
		console.log('Character ' + this.name + ' created!');

		console.log(this.currentHp);

	}

	updateCharacter(input) {
		this.name = input.name;
		this.level = input.level;
		this.maxHp = input.maxHp;
		this.ac = input.ac;
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

	}

	addAttack(attackData) {
		this.attacks.push(new Attack(attackData));
	}

	attack(attack, type = 'normal'){
		var output = attack.makeAttack(type);
		app.addToFeed(output);
	}

	rollStat(stat, statModifier, rollModifier) {
		var roll = dice.d20();
		if (rollModifier == 'advantage') {
			var rollTwo = dice.d20();
			var winningRoll = (( roll > rollTwo ) ? roll : rollTwo);
			return stat + ' with advantage: [' + roll + ', ' + rollTwo + '] + ' + statModifier + ' = ' + (winningRoll + statModifier);
		} else if (rollModifier == 'disadvantage') {
			var rollTwo = dice.d20();
			var winningRoll = (( roll < rollTwo ) ? roll : rollTwo);
			return stat + ' with disadvantage: [' + roll + ', ' + rollTwo + '] + ' + statModifier + ' = ' + (winningRoll + statModifier);
		} else {
			return stat + ': [' + roll + '] + ' + statModifier + ' = ' + (roll + statModifier);
		}
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
			    <li class="nav-item" v-if="characterList" v-for="character in characterList" @click="select(character)">
			        <a class="nav-link">{{character.name}}</a>
			    </li>
			    <li class="nav-item ml-auto" @click="select('create-character')">
			    	<a class="nav-link">Create a Character</a>
			    </li>

			</ul>
		</nav>
	`,
	props: ["characters"],
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
			<div class="card-header">
				<h2 class="d-inline-block">{{character.name}}</h2>
				<span class="dropdown">
				  <a class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				  </a>
				  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
				    <a class="dropdown-item" @click="editCharacter">Edit {{character.name}}</a>
				    <a class="dropdown-item" @click="deleteCharacter">Delete {{character.name}}</a>
				  </div>
				</span>
				<h3 class="float-right d-inline-block">
					HP: <input type="number" class="hpInput" v-model.number="character.currentHp"> 
					/ {{character.maxHp}}
				</h3>
			</div>

			<character-creator v-if="edit == 'editing'" v-bind:editCharacterData="{ characterData: character, edit: edit}" v-on:edit="edit = $event">
			</character-creator>

			<div class="row" style="margin: auto;" v-if="edit != 'editing'">
				<div class="card d-inline-block col-md">
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
				<div class="card d-inline-block col-md">
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
				<div class="card d-inline-block col-md">
					<a @click="rollStat('Constitution check', character.constitutionModifier)">
						<b>Constitution {{character.Constitution}}</b> 
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
				<div class="card d-inline-block col-md">
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
				<div class="card d-inline-block col-md">
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
				<div class="card d-inline-block col-md">
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
			<div class="row" v-if="edit != 'editing'">
					<attack v-bind:character="character"></attack>
			</div>
		</div>
	`,
	props: ["character"],
	data() {
		return {
			rollModifier: 'normal',
			edit: false
		}
	},
	methods: {
		rollStat(stat, statModifier) {
			var result = this.character.rollStat(stat, statModifier, this.rollModifier);
			app.feed.unshift(result)
		},
		editCharacter(){
			this.edit = 'editing';
		},
		deleteCharacter(){
			if (confirm('Delete ' + this.character.name + '?')) {
				app.deleteCharacter(this.character);
			}
		}
	}
});

Vue.component('character-creator', {
	template: `
		<div>
			<h1 class="card-header" v-if="edit != 'editing'">Create a Character</h1>
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
			    <div class="form-group">
			        <label for="ac">AC:</label>
			        <input type="number" class="form-control" id="ac" placeholder="0" v-model="ac">
			    </div>
				
				<hr>
				<h4>Stats</h4>
			    <div class="form-group">
			        <label for="characterStrength"><b>Strength:</b></label>
			        <input type="number" class="form-control" id="characterStrength" placeholder="0" v-model="strength">
			    </div>
			    <div class="form-check">
			        <label for="strengthModifier">Strength Modifier:</label>
			        <input type="number" class="form-control" id="strengthModifier" placeholder="0" v-model="strengthModifier">
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
			        <label for="dexterityModifier">Dexterity Modifier:</label>
			        <input type="number" class="form-control" id="dexterityModifier" placeholder="0" v-model="dexterityModifier">
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
				    <input type="number" class="form-control" id="sleightOfHand" placeholder="0" v-model="sleightOfHand">
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
			        <label for="constitutionModifier">Constitution Modifier:</label>
			        <input type="number" class="form-control" id="constitutionModifier" placeholder="0" v-model="constitutionModifier">
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
			        <label for="intelligenceModifier">Intelligence Modifier:</label>
			        <input type="number" class="form-control" id="intelligenceModifier" placeholder="0" v-model="intelligenceModifier">
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
			        <label for="wisdomModifier">Wisdom Modifier:</label>
			        <input type="number" class="form-control" id="wisdomModifier" placeholder="0" v-model="wisdomModifier">
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
			        <label for="charismaModifier">Charisma Modifier:</label>
			        <input type="number" class="form-control" id="charismaModifier" placeholder="0" v-model="charismaModifier">
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

			    <button type="button" class="btn btn-primary" @click="createCharacter" v-if="edit != 'editing'">Create Character</button>
			    <button type="button" class="btn btn-primary" @click="updateCharacter" v-if="edit == 'editing'">Update Character</button>
			    <button type="button" class="btn btn-danger" @click="$emit('edit', 'no')" v-if="edit == 'editing'">Cancel</button>			    
			</form>
		</div>
	`,
	props: ['editCharacterData'],
	data() {
		return {
			character: null,
			edit: false,
			name: '',
			level: '',
			maxHp: '',
			ac: 0,
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
	created() {
		if (this.editCharacterData) {
			this.edit = this.editCharacterData.edit;
			this.character = this.editCharacterData.characterData;
			this.name = this.character.name;
			this.level = this.character.level;
			this.maxHp = this.character.maxHp;
			this.ac = this.character.ac;
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
			this.spells = this.character.spells;
			if(this.spells == 'yes') {
				this.oneSpells = this.character.oneSpells;
				this.twoSpells = this.character.twoSpells;
				this.threeSpells = this.character.threeSpells;
				this.fourSpells = this.character.fourSpells;
				this.fiveSpells = this.character.fiveSpells;
				this.sixSpells = this.character.sixSpells;
				this.sevenSpells = this.character.sevenSpells;
				this.eightSpells = this.character.eightSpells;
				this.nineSpells = this.character.nineSpells;
			}
		}
	},
	methods: {
		createCharacter() {
			console.log('entering createCharacter');
			var characterData = this.prepareCharacterData();
			console.log(characterData);
			if(newCharacter = new Character(characterData)) {
				app.characters.push(newCharacter);
				app.selected = newCharacter;
				$(".nav").find(".active").removeClass("active");
				//$(".nav-link:contains(this.name)").tab('show');
    			$(".nav-link:contains(this.name)").addClass("active");
			}
		},
		updateCharacter() {
			var characterData = this.prepareCharacterData();
			this.character.updateCharacter(characterData);
			this.$emit('edit', 'no');
		},
		prepareCharacterData() {
			return {
				name: this.name,
				level: parseInt(this.level),
				maxHp: parseInt(this.maxHp),
				ac: parseInt(this.ac),
				strength: parseInt(this.strength),
				strengthModifier: parseInt(this.strengthModifier),
				strengthSave: parseInt(this.strengthSave),
				athletics: parseInt(this.athletics),
				dexterity: parseInt(this.dexterity),
				dexterityModifier: parseInt(this.dexterityModifier),
				dexteritySave: parseInt(this.dexteritySave),
				acrobatics: parseInt(this.acrobatics),
				sleightOfHand: parseInt(this.sleightOfHand),
				stealth: parseInt(this.stealth),
				constitution: parseInt(this.constitution),
				constitutionModifier: parseInt(this.constitutionModifier),
				constitutionSave: parseInt(this.constitutionSave),
				intelligence: parseInt(this.intelligence),
				intelligenceModifier: parseInt(this.intelligenceModifier),
				intelligenceSave: parseInt(this.intelligenceSave),
				arcana: parseInt(this.arcana),
				history: parseInt(this.history),
				investigation: parseInt(this.investigation),
				nature: parseInt(this.nature),
				religion: parseInt(this.religion),
				wisdom: parseInt(this.wisdom),
				wisdomModifier: parseInt(this.wisdomModifier),
				wisdomSave: parseInt(this.wisdomSave),
				animalHandling: parseInt(this.animalHandling),
				insight: parseInt(this.insight),
				medicine: parseInt(this.medicine),
				perception: parseInt(this.perception),
				survival: parseInt(this.survival),
				charisma: parseInt(this.charisma),
				charismaModifier: parseInt(this.charismaModifier),
				charismaSave: parseInt(this.charismaSave),
				deception: parseInt(this.deception),
				intimidation: parseInt(this.intimidation),
				performance: parseInt(this.performance),
				persuasion: parseInt(this.persuasion),
				spells: this.spells,
				oneSpells: parseInt(this.oneSpells),
				twoSpells: parseInt(this.twoSpells),
				threeSpells: parseInt(this.threeSpells),
				fourSpells: parseInt(this.fourSpells),
				fiveSpells: parseInt(this.fiveSpells),
				sixSpells: parseInt(this.sixSpells),
				sevenSpells: parseInt(this.sevenSpells),
				eightSpells: parseInt(this.eightSpells),
				nineSpells: parseInt(this.nineSpells)
			};
		}
	}

});

Vue.component('attack', {
	template: `
		<div class="col">
			<div class="card">
				<div class="card-header">
					<h3>Attacks</h3>
				</div>
				<div class="card-body">
					<ul class="list-group" v-if="character.attacks" v-for="attack in character.attacks">
						<li class="list-group-item">
							<span>
								{{attack.name}} |
								<span v-if="attack.attackModifier && attack.attackModifier != 0 ">
									+{{attack.attackModifier}} |
								</span>
								{{attack.damageDiceNum}}d{{attack.damageDice}}
								<span v-if="attack.damageModifier && attack.damageModifier != 0 ">
									+{{attack.damageModifier}}
								</span> 
							</span>
							<span class="float-right">
								<button class="btn btn-primary btn-sm" @click="rollAttack(attack, 'disadvantage')" v-if="attack.attackType == 'roll'">Roll with disadvantage!</button>
								<button class="btn btn-primary btn-sm" @click="rollAttack(attack)">Roll!</button>
								<button class="btn btn-primary btn-sm" @click="rollAttack(attack, 'advantage')" v-if="attack.attackType == 'roll'">Roll with advantage!</button>
							</span>
							<attack-field v-bind:character="character" v-bind:attack="attack"></attack-field>
						</li>
					</ul>
				</div>
				<div class="card-footer">
					<attack-field v-bind:character="character"></attack-field>
				</div>
			</div>
		</div>
	`,
	props: ["character"],
	methods: {
		rollAttack(attack, type) {
			this.character.attack(attack, type);
		}
	}
});

Vue.component('attack-field', {
	template:`
		<div>
			<button class="btn btn-primary btn-sm" @click="show = true" v-if="newAttack && show == false">Add Attack</button>
			<a class="badge badge-light" @click="show = true" v-if="changeAttack && show == false">Edit Attack</a>

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
		// tom = new Character({name: 'tom', level: 7, maxHp: 56});
		// this.characters.push(tom);
		// bob = new Character({name: 'bob', level: 9, maxHp: 66});
		// this.characters.push(bob);
		// steve = new Character({name: 'steve', level: 9, maxHp: 66});
		// this.characters.push(steve);		
	},
	methods: {
		createCharacter() {

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
			this.selected = null;
		},
		addToFeed(input) {
			this.feed.unshift(input);
		}
	}

});


$('.nav').on('click', '.nav-link', function(){
   $('.nav').find('.active').removeClass('active');
   $(this).addClass('active');
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
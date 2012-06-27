var char = new Object;
	char["level"] = 60;
    char["name"];
	char["class"];
/*Main Stats*/
	char["str"];
	char["dex"];
	char["int"];
	char["vit"];
	char["armor"];
	char["avgRes"];
	char["hp"];
/*Secondary Stats*/
	char["avgDPS"];
	char["armorDmgRed"];
	char["avgResDmgRed"];
	char["ehp"];
/*Weapon*/
var weapon = new Object;
	weapon["type"];
	weapon["atkSpd"];
	weapon["maxDmg"];
	weapon["minDmg"];
/*Equips*/
var equips = new Object;
/*-----------------------------------*/

function updateChar() {
	char["level"] = parseInt($("input#charLevel").val());
	if( char["level"] > 60 ) { char["level"] = 60; }
	if( char["level"] < 1 ) { char["level"] = 1; }
	$("input#charLevel").val(char["level"].toString());
	char["name"] = $("input#charName").val();
	char["class"] = $("select#charClass option:selected").val();
	getCharData();
	getEquipData();
	getWeaponData();
	getTotalArmor();
	getTotalAtt();
	getHP();
	getDPS();
	updateStats();
}

function getCharData() {
	if(char["class"] == "Barbarian") { barbGen(); }
	if(char["class"] == "Demon Hunter") { dhGen(); }
	if(char["class"] == "Monk") { monkGen(); }
	if(char["class"] == "Witch Doctor") { wdGen(); }
	if(char["class"] == "Wizard") { wizGen(); }
}

function getWeaponData() {
	weaponType = $("select#weaponType").html();
	weaponAtkSpd = parseFloat($("select#weaponType option:selected").val());
	if($("#weaponMaxDmg").val()) { weaponMaxDmg = parseInt($("#weaponMaxDmg").val()); }
	else { weaponMaxDmg = 0; }
	if($("#weaponMinDmg").val()) { weaponMinDmg = parseInt($("#weaponMinDmg").val()); }
	else { weaponMinDmg = 0; }
}

function getEquipData() {
	var equipList = $(document).find("tr.equip");
	for( var i in equipList ) {
		var itemName = $(equipList[i]).find("th.itemCol");
		itemName = $(itemName[0]).html();
		if(!equips[itemName]) { equips[itemName] = new Object; }
		var itemArmor = $(equipList[i]).find("input.equipArmor");
		equips[itemName]["armor"] = parseInt($(itemArmor[0]).val());
		
		var attList = $(equipList[i]).find("li.equipAtt select option:selected");
		var attValueList = $(equipList[i]).find("li.equipAtt input");
		for( var j in attList) {
			equips[itemName][$(attList[j]).val()] = parseInt($(attValueList[j]).val());
		}
		
		var buffList = $(equipList[i]).find("li.equipAtt select option:selected");
		var buffValueList = $(equipList[i]).find("li.equipAtt input");
		for( var k in buffList) {
			equips[itemName][$(buffList[k]).val()] = parseInt($(buffValueList[k]).val());
		}
	}
}

function updateStats() {
	$("#Str").html(char["str"]);
	$("#Dex").html(char["dex"]);
	$("#Int").html(char["int"]);
	$("#Vit").html(char["vit"]);
	$("#HP").html(char["hp"]);
	$("#Armor").html(char["armor"]);
}

function getEquipArmor() {
	var equipArmor = 0;
	var equipList = $(".equipArmor");
	for( var i in equiList ) {
		if (parseInt($(equipList[i]).val()) > 0) {
			equipArmor += parseInt($(equipList[i]).val());
		}
	}
	
	return equipArmor;
}

function getTotalAtt() {
	var equipList = [];
	for( var i in equips) {
		if( equips.hasOwnProperty(i) ) { equipList.push(i); }
	}
	
	for( var j in equipList ) {
		char["str"] += equipList[j]["str"];
		char["dex"] += equipList[j]["dex"];
		char["int"] += equipList[j]["int"];
		char["vit"] += equipList[j]["vit"];
	}
}

function getTotalArmor() {
	char["armor"] = char["str"] + getEquipArmor();
}

function getHP() {
	if(char["level"] > 35) { char["hp"] = char["vit"] * (char["level"] - 25) + 36 + char["level"] * 4; }
	else { char["hp"] = char["vit"] * 10 + 36 + char["level"] * 4; }
}

function getArmorDmgRed() {
	
}

function getDPS() {
	charAvgDPS = (weaponMinDmg * weaponAtkSpd + weaponMaxDmg * weaponAtkSpd)/2;
	$("#avgDPS").html(charAvgDPS);
}
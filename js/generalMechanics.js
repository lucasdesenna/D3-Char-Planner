var char = {};
	char["level"] = 60;
/*Secondary Stats*/
	char["avgDPS"];
	char["armorDmgRed"];
	char["avgResDmgRed"];
	char["ehp"];
/*Weapon*/
var weapon = {};
/*Equips*/
var equips = {};
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
	weapon["type"] = $("select#weaponType").html();
	weapon["atkSpd"] = parseFloat($("select#weaponType option:selected").val());
	if($("#weaponMaxDmg").val()) { weapon["maxDmg"] = parseInt($("#weaponMaxDmg").val()); }
	else { weapon["maxDmg"] = 0; }
	if($("#weaponMinDmg").val()) { weapon["minDmg"] = parseInt($("#weaponMinDmg").val()); }
	else {weapon["minDmg"] = 0; }
	var attList = $("tr#mainWeapon").find("li.equipAtt select option:selected");
		var attValueList = $("tr#mainWeapon").find("li.equipAtt input");
		for( var j = 0; j < attList.length; j++ ) {
			weapon[$(attList[j]).val()] = parseInt($(attValueList[j]).val());
		}
		
	var buffList = $("tr#mainWeapon").find("li.equipBuff select option:selected");
	var buffValueList = $("tr#mainWeapon").find("li.equipBuff input");
	for( var k = 0; k < buffList.length; k++ ) {
		equips[$(buffList[k]).val()] = parseInt($(buffValueList[k]).val());
	}
}

function getEquipData() {
	var equipList = $.find("tr.equip");
	for( var i = 0; i < equipList.length; i++ ) {
		var itemName = $(equipList[i]).find("th.itemCol");
		itemName = $(itemName[0]).html();
		if(!equips[itemName]) { equips[itemName] = new Object; }
		var itemArmor = $(equipList[i]).find("input.equipArmor");
		equips[itemName]["armor"] = parseInt($(itemArmor[0]).val());
		
		var attList = $(equipList[i]).find("li.equipAtt select option:selected");
		var attValueList = $(equipList[i]).find("li.equipAtt input");
		for( var j = 0; j < attList.length; j++ ) {
			equips[itemName][$(attList[j]).val()] = parseInt($(attValueList[j]).val());
		}
		
		var buffList = $(equipList[i]).find("li.equipBuff select option:selected");
		var buffValueList = $(equipList[i]).find("li.equipBuff input");
		for( var k = 0; k < buffList.length; k++ ) {
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
	for( var i = 0; i < equipList.length; i++ ) {
		if (parseInt($(equipList[i]).val()) > 0) {
			equipArmor += parseInt($(equipList[i]).val());
		}
	}
	
	return equipArmor;
}

function getTotalAtt() {
	if (weapon["str"]) { char["str"] += weapon["str"]; }
	if (weapon["dex"]) { char["dex"] += weapon["dex"]; }
	if (weapon["int"]) { char["int"] += weapon["int"]; }
	if (weapon["vit"]) { char["vit"] += weapon["vit"]; }
	
	var keyList = new Array;
	for( var key in equips ) {
		keyList.push(key);
	}	
	for( var i = 0; i < keyList.length; i++ ) {
		if (equips[keyList[i]]["str"]) { char["str"] += equips[keyList[i]]["str"]; }
		if (equips[keyList[i]]["dex"]) { char["dex"] += equips[keyList[i]]["dex"]; }
		if (equips[keyList[i]]["int"]) { char["int"] += equips[keyList[i]]["int"]; }
		if (equips[keyList[i]]["vit"]) { char["vit"] += equips[keyList[i]]["vit"]; }
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
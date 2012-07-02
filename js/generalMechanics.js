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
equips["itemList"] = [ "Helmet", "Amulet", "Shoulders", "Chest", "Bracers", "Gloves", "Left Ring", "Right Ring", "Belt", "Pants", "Boots" ];
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
	calcTotalAtt();
	calcDPS();
	calcTotalArmor();
	calcHP();
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
	weapon["type"] = $("select#weaponType option:selected").html();
	weapon["baseAtkSpd"] = parseFloat($("select#weaponType option:selected").val());
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
		weapon[$(buffList[k]).val()] = parseInt($(buffValueList[k]).val());
	}
	if(!weapon["atkSpd"]) { weapon["atkSpd"] = 0; }
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
	for( var i = 0; i < equips["itemList"].length; i++ ) {
		equipArmor += equips["itemList"][i]["armor"];
	}
	
	return equipArmor;
}

function calcTotalAtt() {
	if (weapon["str"]) { char["str"] += weapon["str"]; }
	if (weapon["dex"]) { char["dex"] += weapon["dex"]; }
	if (weapon["int"]) { char["int"] += weapon["int"]; }
	if (weapon["vit"]) { char["vit"] += weapon["vit"]; }
		
	for( var i = 0; i < equips["itemList"].length; i++ ) {
		if (equips[equips["itemList"][i]]["str"]) { char["str"] += equips[equips["itemList"][i]]["str"]; }
		if (equips[equips["itemList"][i]]["dex"]) { char["dex"] += equips[equips["itemList"][i]]["dex"]; }
		if (equips[equips["itemList"][i]]["int"]) { char["int"] += equips[equips["itemList"][i]]["int"]; }
		if (equips[equips["itemList"][i]]["vit"]) { char["vit"] += equips[equips["itemList"][i]]["vit"]; }
	}
}

function calcTotalArmor() {
	char["armor"] = char["str"] + getEquipArmor();
}

function calcHP() {
	if(char["level"] > 35) { char["hp"] = char["vit"] * (char["level"] - 25) + 36 + char["level"] * 4; }
	else { char["hp"] = char["vit"] * 10 + 36 + char["level"] * 4; }
}

function getArmorDmgRed() {
	
}

function getEquipDPSData() {
	var equipDPSData = {};
	equipDPSData["maxDmg"] = 0;
	equipDPSData["minDmg"] = 0;
	equipDPSData["atkSpd"] = 0;
	equipDPSData["critChance"] = 0;
	equipDPSData["critDmg"] = 0;
	
	for( var i = 0; i < equips["itemList"].length; i++ ) {
		if (equips[equips["itemList"][i]]["maxDmg"]) { equipDPSData["maxDmg"] += equips[equips["itemList"][i]]["maxDmg"]; }
		if (equips[equips["itemList"][i]]["minDmg"]) { equipDPSData["minDmg"] += equips[equips["itemList"][i]]["minDmg"]; }
		if (equips[equips["itemList"][i]]["atkSpd"]) { equipDPSData["atkSpd"] += equips[equips["itemList"][i]]["atkSpd"]; }
		if (equips[equips["itemList"][i]]["critChance"]) { equipDPSData["critChance"] += equips[equips["itemList"][i]]["critChance"]; }
		if (equips[equips["itemList"][i]]["critDmg"]) { equipDPSData["critDmg"] += equips[equips["itemList"][i]]["critDmg"]; }
	}
	
	return equipDPSData;
}

function calcDPS() {
	var equipDPSData = getEquipDPSData();
	
	var avgDmg = (weapon["maxDmg"] + equipDPSData["maxDmg"]) + (weapon["minDmg"] + equipDPSData["minDmg"]) / 2;
	var weaponAPS = weapon["baseAtkSpd"] * (1 + weapon["atkSpd"] / 100);
	var nonWeaponAPS = 1 + equipDPSData["atkSpd"] / 100;
	var avgCritDmg = (1.5 + equipDPSData["critDmg"] / 100) * (0.05 + equipDPSData["critChance"] / 100);
	var mainAttBonus = 1 + char[char["mainAtt"]]/100;
	
	char["avgDPS"] = avgDmg * weaponAPS * nonWeaponAPS * avgCritDmg * mainAttBonus;
	$("#avgDPS").html(Math.round(char["avgDPS"]));
}

function saveChar() {
	localStorage.charData = JSON.stringify(char);
	localStorage.weaponData = JSON.stringify(weapon);
	localStorage.equipsData = JSON.stringify(equips);
}

function loadChar() {
	var charData = JSON.parse(localStorage.charData);
	var weaponData = JSON.parse(localStorage.weaponData);
	var equipsData = JSON.parse(localStorage.equipsData);
	charData.weapons = weaponData;
	charData.equips = equipsData;
	char = charData;
	updateStats();
}

function rebuildWeaponAndEquips(charData) {
	for( var i = 0; i < equips["itemList"].length; i++) {
		equips["itemList"][i]
	}
}
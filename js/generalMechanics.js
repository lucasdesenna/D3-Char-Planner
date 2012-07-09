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
var iDList = [ "#helmet", "#amulet", "#shoulders", "#chest", "#bracers", "#gloves", "#leftRing", "#rightRing", "#belt", "#pants", "#boots" ];
/*-----------------------------------*/

function updateChar() {
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
	char["level"] = parseInt($("input#charLevel").val());
	if( char["level"] > 60 ) { char["level"] = 60; }
	if( char["level"] < 1 ) { char["level"] = 1; }
	$("input#charLevel").val(char["level"].toString());
	char["name"] = $("input#charName").val();
	char["class"] = $("select#charClass option:selected").val();
	
	if(char["class"] == "Barbarian") { barbGen(); }
	if(char["class"] == "Demon Hunter") { dhGen(); }
	if(char["class"] == "Monk") { monkGen(); }
	if(char["class"] == "Witch Doctor") { wdGen(); }
	if(char["class"] == "Wizard") { wizGen(); }
}

function getWeaponData() {
	weapon = {};
	weapon["type"] = $("select#weaponType option:selected").html();
	weapon["baseAtkSpd"] = parseFloat($("select#weaponType option:selected").val());
	if($("#weaponMaxDmg").val() == "0" || !$("#weaponMaxDmg").val()) { $("#weaponMaxDmg").val("1")}
	weapon["maxDmg"] = parseInt($("#weaponMaxDmg").val());
	if($("#weaponMinDmg").val() > $("#weaponMaxDmg").val() || !$("#weaponMinDmg").val()) { $("#weaponMinDmg").val($("#weaponMaxDmg").val())}
	weapon["minDmg"] = parseInt($("#weaponMinDmg").val());
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
}

function getEquipData() {
	equips = {};
	var equipList = $.find("tr.equip");
	for( var i = 0; i < equipList.length; i++ ) {
		var itemName = $(equipList[i]);
		itemName = $(itemName[0]).html();
		if(!equips[itemName]) { equips[itemName] = new Object; }
		var itemArmor = $(equipList[i]).find("input.equipArmor");
		if($(itemArmor[0]).val()) { equips[itemName]["armor"] = parseInt($(itemArmor[0]).val()); }
		else { equips[itemName]["armor"] = 0; }
		
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
	for( var i = 0; i < equips.length; i++ ) {
		equipArmor += equips[i]["armor"];
	}
	
	return equipArmor;
}

function calcTotalAtt() {
	if (weapon["str"]) { char["str"] += weapon["str"]; }
	if (weapon["dex"]) { char["dex"] += weapon["dex"]; }
	if (weapon["int"]) { char["int"] += weapon["int"]; }
	if (weapon["vit"]) { char["vit"] += weapon["vit"]; }
		
	for( var i = 0; i < iDList.length; i++ ) {
		if (iDList[i]["str"]) { char["str"] += iDList[i]["str"]; }
		if (iDList[i]["dex"]) { char["dex"] += iDList[i]["dex"]; }
		if (iDList[i]["int"]) { char["int"] += iDList[i]["int"]; }
		if (iDList[i]["vit"]) { char["vit"] += iDList[i]["vit"]; }
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

function getDPSData() {
	var DPSData = {};
	DPSData["maxDmg"] = 0;
	DPSData["minDmg"] = 0;
	DPSData["wAtkSpd"] = 0;
	DPSData["atkSpd"] = 0;
	DPSData["critChance"] = 0;
	DPSData["critDmg"] = 0;
	
	if(weapon["maxDmg"]) { DPSData["maxDmg"] += weapon["maxDmg"]; }
	if(weapon["minDmg"]) { DPSData["minDmg"] += weapon["minDmg"]; }
	if(weapon["atkSpd"]) { DPSData["wAtkSpd"] += weapon["atkSpd"]; }
	
	for( var i = 0; i < iDList.length; i++ ) {
		if (iDList[i]["maxDmg"]) { DPSData["maxDmg"] += iDList[i]["maxDmg"]; }
		if (iDList[i]["minDmg"]) { DPSData["minDmg"] += iDList[i]["minDmg"]; }
		if (iDList[i]["atkSpd"]) { DPSData["atkSpd"] += iDList[i]["atkSpd"]; }
		if (iDList[i]["critChance"]) { DPSData["critChance"] += iDList[i]["critChance"]; }
		if (iDList[i]["critDmg"]) { DPSData["critDmg"] += iDList[i]["critDmg"]; }
	}
	
	return DPSData;
}

function calcDPS() {
	var DPSData = getDPSData();
	
	var avgDmg = (DPSData["maxDmg"] + DPSData["minDmg"]) / 2;
	var weaponAPS = weapon["baseAtkSpd"] * (1 + DPSData["wAtkSpd"] / 100);
	var nonWeaponAPS = 1 + DPSData["atkSpd"] / 100;
	var avgCritDmg = (1.5 + DPSData["critDmg"] / 100) * (0.05 + DPSData["critChance"] / 100);
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
	for( var i = 0; i < iDList.length; i++) {
		iDList[i]
	}
}
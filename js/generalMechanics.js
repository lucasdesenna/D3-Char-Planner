var char = new Array;
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
var weapon = new Array;
	weapon["type"];
	weapon["atkSpd"];
	weapon["maxDmg"];
	weapon["minDmg"];
/*Equips*/
var equipList;
/*-----------------------------------*/

function updateChar() {
	char["level"] = parseInt($("input#charLevel").val());
	if( char["level"] > 60 ) { char["level"] = 60; }
	if( char["level"] < 1 ) { char["level"] = 1; }
	$("input#charLevel").val(char["level"].toString());
	char["name"] = $("input#charName").val();
	char["class"] = $("select#charClass option:selected").val();
	getBaseStats();
	getEquipStats();
	getWeaponData();
	getTotalArmor();
	getHP();
	getDPS();
	updateStats();
}

function getBaseStats() {
	if(char["class"] == "Barbarian") { barbGen(); }
	if(char["class"] == "Demon Hunter") { dhGen(); }
	if(char["class"] == "Monk") { monkGen(); }
	if(char["class"] == "Witch Doctor") { wdGen(); }
	if(char["class"] == "Wizard") { wizGen(); }
}

function getEquipStats() {
	var keyList = $(".equipAtt").find("select option:selected");
	var valueList = $(".equipAtt").find("input");
	for( var i = 0; i < keyList.length; i++ ) {
		var key = $(keyList[i]).val();
		if( key == "Str" ) { char["str"] += parseInt($(valueList[i]).val()); }
		if( key == "Dex" ) { char["dex"] += parseInt($(valueList[i]).val()); }
		if( key == "Int" ) { char["int"] += parseInt($(valueList[i]).val()); }
		if( key == "Vit" ) { char["vit"] += parseInt($(valueList[i]).val()); }
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

function getTotalArmor() {
	char["armor"] = char["str"] + getEquipArmor();
}

function getHP() {
	if(char["level"] > 35) { char["hp"] = char["vit"] * (char["level"] - 25) + 36 + char["level"] * 4; }
	else { char["hp"] = char["vit"] * 10 + 36 + char["level"] * 4; }
}

function getArmorDmgRed() {
	
}

function getWeaponData() {
	weaponType = $("select#weaponType").html();
	weaponAtkSpd = parseFloat($("select#weaponType option:selected").val());
	if($("#weaponMaxDmg").val()) { weaponMaxDmg = parseInt($("#weaponMaxDmg").val()); }
	else { weaponMaxDmg = 0; }
	if($("#weaponMinDmg").val()) { weaponMinDmg = parseInt($("#weaponMinDmg").val()); }
	else { weaponMinDmg = 0; }
}

function getDPS() {
	charAvgDPS = (weaponMinDmg * weaponAtkSpd + weaponMaxDmg * weaponAtkSpd)/2;
	$("#avgDPS").html(charAvgDPS);
}
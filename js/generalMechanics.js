var charLevel = 60;
var charName;
var charClass;
/*Main Stats*/
var charStr;
var charDex;
var charInt;
var charVit;
var charArmor;
var charAvgRes;
var charHP;
/*Secondary Stats*/
var charAvgDPS;
var charArmorDmgRed;
var charAvgResDmgRed;
var charEHP;
/*Equips*/
var equipList;
/*-----------------------------------*/

function updateChar() {
	charLevel = parseInt($("input#charLevel").val());
	if( charLevel > 60 ) { charLevel = 60; }
	if( charLevel < 1 ) { charLevel = 1; }
	$("input#charLevel").val(charLevel.toString());
	charName = $("input#charName").val();
	charClass = $("select#charClass option:selected").val();
	getBaseStats();
	getEquipStats();
	getTotalArmor();
	getHP();
	updateStats();
}

function getBaseStats() {
	if(charClass == "Barbarian") { barbGen(); }
	if(charClass == "Demon Hunter") { dhGen(); }
	if(charClass == "Monk") { monkGen(); }
	if(charClass == "Witch Doctor") { wdGen(); }
	if(charClass == "Wizard") { wizGen(); }
}

function getEquipStats() {
	var keyList = $(".equipStat").find("select option:selected");
	var valueList = $(".equipStat").find("input");
	for( var i = 0; i < keyList.length; i++ ) {
		var key = $(keyList[i]).val();
		if( key == "Str" ) { charStr += parseInt($(valueList[i]).val()); }
		if( key == "Dex" ) { charDex += parseInt($(valueList[i]).val()); }
		if( key == "Int" ) { charInt += parseInt($(valueList[i]).val()); }
		if( key == "Vit" ) { charVit += parseInt($(valueList[i]).val()); }
	}
}

function updateStats() {
	$("#Str").html(charStr);
	$("#Dex").html(charDex);
	$("#Int").html(charInt);
	$("#Vit").html(charVit);
	$("#HP").html(charHP);
	$("#Armor").html(charArmor);
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
	charArmor = charStr + getEquipArmor();
}

function getHP() {
	if(charLevel > 35) { charHP = charVit * (charLevel - 25) + 36 + charLevel * 4; }
	else { charHP = charVit * 10 + 36 + charLevel * 4; }
}

function getArmorDmgRed() {
	
}
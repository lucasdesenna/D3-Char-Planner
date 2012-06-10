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

/*-----------------------------------*/

function updateChar() {
	charLevel = parseInt($("input#charLevel").val());
	if(charLevel > 60) { charLevel = 60; }
	$("input#charLevel").val(charLevel.toString());
	charName = $("input#charName").val();
	charClass = $("select#charClass option:selected").val();
	if(charClass == "Wizard") { wizGen(); }
}

function getArmor() {
	charArmor = charStr;
	$("#Armor").html(charArmor);
}

function getHP() {
	charHP = charVit * 35 + 276;
	$("#HP").html(charHP);
}

function getArmorDmgRed() {
	
}
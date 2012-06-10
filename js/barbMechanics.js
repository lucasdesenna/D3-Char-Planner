function barbGen() {
	charStr = 7 + 3 * charLevel;
	$("#Str").html(charStr);
	charDex = 7 + charLevel;
	$("#Dex").html(charDex);
	charInt = 7 + charLevel;
	$("#Int").html(charInt);
	charVit = 7 + 2 * charLevel;
	$("#Vit").html(charVit);
	getArmor();
	getHP();
}
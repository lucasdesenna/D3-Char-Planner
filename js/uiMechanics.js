function createStat(target) {
	$(target).parent().append("<li class='equipStat'><select><option>Str</option><option>Dex</option><option>Int</option><option>Vit</option></select><input type ='number' min='1' placeholder='0' /><button type='button' onclick='removeParent(this);'>x</button></li>");
}

function removeParent(target) {
	$(target).parent().remove();
	updateChar();
}

function createBuff(target) {
	
}
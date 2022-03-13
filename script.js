
	let x = 0,y = 0;
	let focussedOketetMain = 0;
	let ip_addresRozgl,min,max;
	let  last_oktet_for_min_max = 0;
	let diff = 0;
    let ip = [0,0,0,0];



ip_input_0.oninput  = function (){
	ip_input_0.value = ip_input_0.value.replace(/[^0-9. ]/g, '').replace(/(\..*?)\..*/g, '$1');
	if(ip_input_0.value.length > 2){
		ip_input_1.focus();
	}
}
ip_input_1.oninput  = function (){
		ip_input_1.value = ip_input_1.value.replace(/[^0-9. ]/g, '').replace(/(\..*?)\..*/g, '$1');
	if(ip_input_1.value.length > 2){
		ip_input_2.focus();
	}
}
ip_input_2.oninput  = function (){
		ip_input_2.value = ip_input_2.value.replace(/[^0-9. ]/g, '').replace(/(\..*?)\..*/g, '$1');
	if(ip_input_2.value.length > 2){
		ip_input_3.focus();
	}
}
ip_input_3.oninput  = function (){
		ip_input_3.value = ip_input_3.value.replace(/[^0-9. ]/g, '').replace(/(\..*?)\..*/g, '$1');
	if(ip_input_3.value.length > 2){
		maska.focus();
	}
}

maska.oninput = function(){
	maska.value = maska.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
}
ip_input_0.onkeypress  = function (event){

  if (event.code === 'Space' || event.code === 'Enter') {

    ip_input_1.focus();
  }
}
ip_input_1.onkeypress  = function (event){
	if (event.code === 'Space' || event.code === 'Enter') {
    ip_input_2.focus();
  }
}
ip_input_2.onkeypress  = function (event){
if (event.code === 'Space' || event.code === 'Enter') {
    ip_input_3.focus();
  }
}
ip_input_3.onkeypress  = function (event){
 if (event.code === 'Space' || event.code === 'Enter') {
    maska.focus();
  }
}
maska.onkeypress  = function (event){
if (event.code === 'Space' || event.code === 'Enter') {
  	maska.blur();
    do_magic.click();
  }
}
do_magic.onclick = function(){
	

let Result = "";
    
	for (let i = 0; i < 4; i++) {
       let input_val = document.getElementById("ip_input_" + i).value;
		ip[i] = parseInt(input_val);
	}
    

	if(!ValidateIPaddress(ip)){
		return;
	}		
	
	
	x = parseInt(maska.value);
	focussedOketetMain = Math.floor(x / 8);
	y = Math.pow(2,30 - x + 2);
	
	let maska_calculated = calcOktet(x);
	Result += "<p class='content'><b>Maska : </b>" + "&emsp;&emsp;&emsp;&emsp;" + "<span style='float:right'> " + maska_calculated + " </span>"  + "</p>";

	//Adres Sieci-----------------------------------------------
		let _Addres_Sieci_calculated = calcAdressSieci(y, ip, focussedOketetMain);
		Result += "<p class='content'><b>Adress Sieci : </b>" + "&emsp;&emsp;&emsp;&emsp;" +"<span style='float:right'> " + _Addres_Sieci_calculated + " </span>" + "</p>";
		let pos_dot = _Addres_Sieci_calculated.lastIndexOf(".");
		min = _Addres_Sieci_calculated.substr(0, pos_dot + 1 );
		min +=  parseInt(_Addres_Sieci_calculated.substr(pos_dot + 1)) + 1;

	//Adres Rozgloszeniowy--------------------------------------
		let _Addres_Rozgl_calculated = calcAdressRozgl(y, ip, focussedOketetMain);
		Result += "<p class='content'><b>Adres Rozgłoszeniowy : </b>" +
		 "&emsp;&emsp;&emsp;&emsp;" +"<span style='float:right'> " + _Addres_Rozgl_calculated + " </span>" + "</p>";
		max = _Addres_Rozgl_calculated.substr(0, _Addres_Rozgl_calculated.lastIndexOf(".") + 1);
		//Check last oktet------------------------------------------
		if (parseInt(_Addres_Rozgl_calculated.substr(_Addres_Rozgl_calculated.lastIndexOf(".") + 1) + diff) < 255) {
			max += parseInt(_Addres_Rozgl_calculated.substr(pos_dot + 1)) + diff - 1;
		}
		else {
			max += "254";
		}

		//Hostow W Sieci---------------------------------------------
		Result += "<p class='content'><b>Hostów W Sieci : </b>" +
		 "&emsp;&emsp;&emsp;&emsp;" + "<span style='float:right'> " + (y - 2) + " </span>"	 + "</p>";
		//Host Minimalny---------------------------------------------
		Result += "<p class='content'><b>Host Minimalny : </b>" +
		 "&emsp;&emsp;&emsp;&emsp;" + "<span style='float:right'> " + min + " </span>" + "</p>";
		//Host Maksymalny--------------------------------------------
		Result += "<p class='content'><b>Host Maksymalny : </b>" +
		 "&emsp;&emsp;&emsp;&emsp;"+ "<span style='float:right'> " + max + " </span>" +"</p>";
		 result.innerHTML = Result;

}

function calcOktet(numOfBits) {
	let ip = "";
	let count_oktets = Math.floor(numOfBits / 8);
	for (let i = 0; i < count_oktets; i++)
	{
		ip += "255.";
	}
	let answer = 0;
	for (let i = 0; i < numOfBits % 8; i++)
	{
		answer += Math.pow(2, 7 - i);
	}
	ip += answer + ".";
	for (let i = 0; i < 4 - count_oktets - 1; i++)
	{
		ip += "0.";
	}
	ip = ip.slice(0,-1);
	return ip;
}
function calcAdressSieci(countHosts, arrIp, focussedOketetMain) {

	let bits = Math.log2(countHosts);
	let ip_hadle = "";
	let temp = Math.pow(2, bits % 8);
	let dot = ".";
	if (focussedOketetMain == 0) dot = "";
	for (let i = 4; i > focussedOketetMain; i--)
	{
		
		if (bits > 8) {
			ip_hadle = addStr(ip_hadle,0, ".0");	
			bits -= 8;
		}
		else {
			diff = (Math.floor(arrIp[focussedOketetMain] / temp)) * temp;
			ip_hadle = addStr(ip_hadle,0, dot + Math.floor(arrIp[focussedOketetMain] / temp) * temp);
		}
		
	}

	for (let i = focussedOketetMain - 1 ; i >= 0 ; i--)
	{
		if (i == 0) {
			ip_hadle = addStr(ip_hadle,0,arrIp[i]);
			break;
		}
		ip_hadle = addStr(ip_hadle,0, "." + arrIp[i]);
	}

	return ip_hadle;

}
function addStr(str, index, stringToAdd){
  return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
}
function calcAdressRozgl(countHosts, arrIp, focussedOketetMain) {

	let bits = Math.log2(countHosts);
	let ip_hadle = "";
	let dot = ".";
	if (focussedOketetMain == 0) dot = "";
	for (let i = 4; i > focussedOketetMain; i--)
	{

		if (bits > 8) {

			ip_hadle = addStr(ip_hadle,0,".255");
			bits -= 8;
		}
		else {
			let calc = Math.pow(2, bits % 8) - 1 + diff;
			ip_hadle = addStr(ip_hadle,0, dot + calc);
		}

	}

	for (let i = focussedOketetMain - 1 ; i >= 0 ; i--)
	{
		if (i == 0) {
			ip_hadle = addStr(ip_hadle,0,arrIp[i]);
			break;
		}
		ip_hadle = addStr(ip_hadle,0, "." + arrIp[i]);
	}

	return ip_hadle;
}

ip_input_0.onblur = function (){
	if(ip_input_0.value == "") return;
        checkValidate_0(ip_input_0);
        ip_input_0.value = (ip_input_0.value).replace(/\s+/g, '');
	}
ip_input_1.onblur = function (){
	if(ip_input_1.value == "") return;
        checkValidate_1(ip_input_1);
        ip_input_1.value = (ip_input_1.value).replace(/\s+/g, '');

}
ip_input_2.onblur = function (){
	if(ip_input_2.value == "") return;
        checkValidate_2(ip_input_2);
        ip_input_2.value = (ip_input_2.value).replace(/\s+/g, '');

}
ip_input_3.onblur = function (){
	if(ip_input_3.value == "") return;
        checkValidate_3(ip_input_3);
        ip_input_3.value = (ip_input_3.value).replace(/\s+/g, '');

}
function checkValidate_0(input){
	if(input.value == "" ||  input.value == " "){
		ip_input_0.value = "";
			return;
	}
let  val = parseInt(input.value);
		if( val != 127 && val < 224  && val > 0){
			return;
		}else
	{
			alert("Znaczenia pola nie ma się równać 127 oraz ma być większa od zero i mniejsza od 224");
		if(val == 127){
			ip_input_0.value = "";
		}
		else if(val > 223){
			ip_input_0.value = "223";
		}else if(val < 1){
			ip_input_0.value = "1";
		}
	}
}
function checkValidate_1(input){
	if(input.value == "" ||  input.value == " "){
		ip_input_1.value = "";
			return;
	}
	let  val = parseInt(input.value);
	if(val < 256 && val > 0){
		return;
	}else{
		if(val < 1) {
			ip_input_1.value = "1";
		}else{
			ip_input_1.value = "255";
		}
	}
}
function checkValidate_2(input){
	if(input.value == "" ||  input.value == " "){
		ip_input_2.value = "";
			return;
	}
	let  val = parseInt(input.value);
	if(val < 256 && val > 0){
		return;
	}else{
		if(val < 1) {
			ip_input_2.value = "1";
		}else{
			ip_input_2.value = "255";
		}
	}
}
function checkValidate_3(input){
	if(input.value == "" ||  input.value == " "){
		ip_input_3.value = "";
			return;
	}
	let  val = parseInt(input.value);
	if(val < 255 && val > 0){
		return;
	}else{
		if(val < 1) {
			ip_input_3.value = "1";
		}else{
			ip_input_3.value = "254";
		}
	}
}
maska.onblur = function (){
	if(maska.value == ""){
		maska.value = "";
		return;
	}
    let vl = parseInt(maska.value);
    let check = vl > 0 && vl < 30;
    
	if(!check){

		if(vl > 30) {
			vl = 30;
		}else if(vl  < 1){
			vl = 1;
		}
		maska.value = vl;
	}
}

/*ip_input.onblur = function (){
	if(!ValidateIPaddress(ip_input.value)){
		return;
	}
	

	let ip_ = ip_input.value.split('.');
	for (let i = ip_.length - 1; i >= 0; i--) {
		ip_[i] = Number(ip_[i]);
	}
	ip_input.value = ip_[0] + "." + ip_[1] + "." + ip_[2] + "." + ip_[3];

}*/

function ValidateIPaddress(ipaddress) 
{
	let ip = "";
		ip = ipaddress[0];
	for (var i = 1; i < 4; i++) {
		ip += "." + ipaddress[i];
	}
 if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip))
  {
    return true;
  }
  alert("Nieprawidlowyj Ip Adress");
return false;
}
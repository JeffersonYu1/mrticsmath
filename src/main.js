var selectedTypes = [];
var tT = Boolean(10 > 9);
var fF = Boolean(10 < 9);

var currentProblem = "Problem";
var correctAnswer = 0;
var correctAnswerUpper = 0;
var correctAnswerLower = 0;
var estimation = 0;

var sessionAttempted = 0;
var sessionCorrect = 0;
var sessionStreak = 0;

var checkboxArray = document.getElementsByClassName("ruleCheckbox");

function backToSelection() {
    var selectorDisp = document.getElementById("selector");
    var problemsDisp = document.getElementById("problems");
    selectorDisp.style.display = "inline";
    problemsDisp.style.display = "none";
}
    
var gcd = function(a, b) {
    if ( ! b) {
        return a;
    }
    return gcd(b, a % b);
};

var randStringForSets = function(a) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	var setArray = [];

	for (var j = 0; j < a; j++)
	{
		for (var m = 0; m < 3; m++)
		{
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		setArray.push(text);
		text = "";
	}
	return setArray;
};

function doit_onkeypress(event){
    if (event.keyCode == 13 || event.which == 13)
    {
        checkAnswer();
    }
}

function selectAll() {
	for(var i=0; i<checkboxArray.length; i++){
		if(checkboxArray[i].type=='checkbox')
		{
			checkboxArray[i].checked=true;
		}
	}
}

function deselectAll() {
	for(var i=0; i<checkboxArray.length; i++){
		if(checkboxArray[i].type=='checkbox')
		{
			checkboxArray[i].checked=false;
		}
	}
}

var selectionCheckPass = false;

function selectionCheck() {
	selectedTypes = [];
	for(var i = 0; i<checkboxArray.length; i++)
	{
		var currentChecking = "rule" + i;
		var checking = document.getElementById(currentChecking).checked;
		if(checking == tT)
		{
			selectedTypes.push(i);
		}
	}
    console.log(selectedTypes);
    if(selectedTypes == "[]" || selectedTypes == null || selectedTypes == "[]" || selectedTypes.length == 0) {
        alert("You did not select any problem types.");
        selectionCheckPass = false;
        return;
    }
    else {
        var selectorDisp = document.getElementById("selector");
        var problemsDisp = document.getElementById("problems");
        selectorDisp.style.display = "none";
        problemsDisp.style.display = "inline";
        selectionCheckPass = true;
    }
}

function generateProblems() {
	var checkDisp = document.getElementById("check");
	checkDisp.style.backgroundColor = "rgb(255, 255, 255)";
    checkDisp.style.cursor = "pointer"; 
	document.getElementById("check").disabled = false;
    
	var nextProblemDisp = document.getElementById("next");
	nextProblemDisp.style.backgroundColor = "rgb(180, 180, 180)";
    nextProblemDisp.style.cursor = "not-allowed";
	document.getElementById("next").disabled = true;    

	document.getElementById('response').value = "";
	document.getElementById("correctness").innerHTML = "<br>";

	var numberOfTypes = selectedTypes.length;
	var chooseRandType = Math.floor(Math.random() * numberOfTypes);
	var problemType = selectedTypes[chooseRandType];
	
	var digA = Math.floor(Math.random() * 10);
	var digB = Math.floor(Math.random() * 10);
	var digC = Math.floor(Math.random() * 10);
	// Non Zero Digits
	var digD = Math.floor(Math.random() * 9) + 1;
	var digE = Math.floor(Math.random() * 9) + 1;
	var digF = Math.floor(Math.random() * 9) + 1;


	// Numbers as String
	var digAS = digA.toString();
	var digBS = digB.toString();
	var digCS = digC.toString();
	var digDS = digD.toString();
	var digES = digE.toString();
	var digFS = digF.toString();

	//reset estimation
	estimation = 0;

	switch (problemType) {
    case 0:
        currentProblem = digDS + digAS + " x " + digES + digBS + " =";
		correctAnswer = ((10*digD)+(digA))*((10*digE)+(digB));
        break;
    case 1:
        currentProblem = digDS + "5² =";
		correctAnswer = ((10*digD)+(5))*((10*digD)+(5));
        break;
    case 2:
        digE = digD + 1;
		digES = digE.toString();
		currentProblem = digDS + "5 x " + digES + "5 =";
		correctAnswer = ((10*digD)+(5))*((10*digE)+(5));
        break;
    case 3:
    	while ((digD % 2) === 1) {
		    digD = Math.floor(Math.random() * 9) + 1;
		}
		while ((digE % 2) === 1 || (digE == digD)) {
		    digE = Math.floor(Math.random() * 9) + 1;
		}
		digDS = digD.toString();
		digES = digE.toString();
		currentProblem = digDS + "5 x " + digES + "5 =";
		correctAnswer = ((10*digD)+(5))*((10*digE)+(5));
        break;
    case 4:
    	while ((digD % 2) === 0) {
		    digD = Math.floor(Math.random() * 9) + 1;
		}
		while ((digE % 2) === 0 || (digE == digD)) {
		    digE = Math.floor(Math.random() * 9) + 1;
		}
		digDS = digD.toString();
		digES = digE.toString();
		currentProblem = digDS + "5 x " + digES + "5 =";
		correctAnswer = ((10*digD)+(5))*((10*digE)+(5));
        break;
    case 5:
    	while ((digD % 2) === 1) {
		    digD = Math.floor(Math.random() * 9) + 1;
		}
		while ((digE % 2) === 0) {
		    digE = Math.floor(Math.random() * 9) + 1;
		}
		digDS = digD.toString();
		digES = digE.toString();
		currentProblem = digDS + "5 x " + digES + "5 =";
		correctAnswer = ((10*digD)+(5))*((10*digE)+(5));
        break;
    case 6:
    	if (digA < 5) {
    		while(((10*digD)+(digA)) % (8) != 0)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
    		currentProblem = digDS + digAS + " x 12 1/2 =";
			correctAnswer = ((10*digD)+(digA))*(12.5);
			correctAnswer = correctAnswer.toString();
    	}
    	else {
    		while(((100*digD)+(10*digA)+(digB)) % (8) != 0)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    			digB = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
			digBS = digB.toString();
    		currentProblem = digDS + digAS + digBS + " x 12 1/2 =";
			correctAnswer = ((100*digD)+(10*digA)+(digB))*(12.5);
			correctAnswer = correctAnswer.toString();
    	}
        break;
    case 7:
    	if (digA < 5) {
    		while((digA % 2) === 1 || (digD+digA) % (3) === 1 || (digD+digA) % (3) === 2)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
    		currentProblem = digDS + digAS + " x 16 2/3 =";
			correctAnswer = ((10*digD)+(digA))*(50)/(3);
			correctAnswer = correctAnswer.toString();
    	}
    	else {
    		while((digA % 2) === 1 || (digD+digA+digB) % (3) === 1 || (digD+digA+digB) % (3) === 2)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    			digB = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
			digBS = digB.toString();
    		currentProblem = digDS + digBS + digAS + " x 16 2/3 =";
			correctAnswer = ((100*digD)+(10*digB)+(digA))*(50)/(3);
			correctAnswer = correctAnswer.toString();
    	}
        break;
    case 8:
    	if (digA < 5) {
    		while((digD+digA) % (3) === 1 || (digD+digA) % (3) === 2)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
    		currentProblem = digDS + digAS + " x 33 1/3 =";
			correctAnswer = ((10*digD)+(digA))*(100)/(3);
			correctAnswer = correctAnswer.toString();
    	}
    	else {
    		while((digD+digA+digB) % (3) === 1 || (digD+digA+digB) % (3) === 2)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    			digB = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
			digBS = digB.toString();
    		currentProblem = digDS + digBS + digAS + " x 33 1/3 =";
			correctAnswer = ((100*digD)+(10*digB)+(digA))*(100)/(3);
			correctAnswer = correctAnswer.toString();
    	}
        break;
    case 9:
    	if (digA < 5) {
    		currentProblem = digDS + digAS + " x 25 =";
			correctAnswer = ((10*digD)+(digA))*(25);
			correctAnswer = correctAnswer.toString();
    	}
    	else {
    		while(((10*digA)+(digB)) % (4) === 1 || ((10*digA)+(digB)) % (4) === 2 || ((10*digA)+(digB)) % (4) === 3)
    		{
    			digA = Math.floor(Math.random() * 10);
    			digB = Math.floor(Math.random() * 10);
    		}
			digAS = digA.toString();
			digBS = digB.toString();

    		currentProblem = digDS + digAS + digBS + " x 25 =";
			correctAnswer = ((100*digD)+(10*digA)+(digB))*(25);
			correctAnswer = correctAnswer.toString();
    	}
        break;
	case 10:
    	if (digA < 5) {
    		currentProblem = digDS + digAS + " x 50 =";
			correctAnswer = ((10*digD)+(digA))*(50);
			correctAnswer = correctAnswer.toString();
    	}
    	else {
    		while((digB) % (2) === 1)
    		{
    			digB = Math.floor(Math.random() * 10);
    		}
			digBS = digB.toString();

    		currentProblem = digDS + digAS + digBS + " x 50 =";
			correctAnswer = ((100*digD)+(10*digA)+(digB))*(50);
			correctAnswer = correctAnswer.toString();
    	}
        break;
    case 11:
    	if (digA < 5) {
    		currentProblem = digDS + digAS + " x 75 =";
			correctAnswer = ((10*digD)+(digA))*(75);
			correctAnswer = correctAnswer.toString();
    	}
    	else {
    		while(((10*digA)+(digB)) % (4) === 1 || ((10*digA)+(digB)) % (4) === 2 || ((10*digA)+(digB)) % (4) === 3)
    		{
    			digA = Math.floor(Math.random() * 10);
    			digB = Math.floor(Math.random() * 10);
    		}
			digAS = digA.toString();
			digBS = digB.toString();

    		currentProblem = digDS + digAS + digBS + " x 75 =";
			correctAnswer = ((100*digD)+(10*digA)+(digB))*(75);
			correctAnswer = correctAnswer.toString();
    	}
        break;
    case 12:
    	if (digA < 5) {
    		while(((10*digD)+(digA)) % (8) != 0)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
    		currentProblem = digDS + digAS + " x 37 1/2 =";
			correctAnswer = ((10*digD)+(digA))*(37.5);
			correctAnswer = correctAnswer.toString();
    	}
    	else {
    		while(((100*digD)+(10*digA)+(digB)) % (8) != 0)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    			digB = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
			digBS = digB.toString();
    		currentProblem = digDS + digAS + digBS + " x 37 1/2 =";
			correctAnswer = ((100*digD)+(10*digA)+(digB))*(37.5);
			correctAnswer = correctAnswer.toString();
    	}
        break;
    case 13:
    	if (digA < 5) {
    		while(((10*digD)+(digA)) % (8) != 0)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
    		currentProblem = digDS + digAS + " x 62 1/2 =";
			correctAnswer = ((10*digD)+(digA))*(62.5);
			correctAnswer = correctAnswer.toString();
    	}
    	else {
    		while(((100*digD)+(10*digA)+(digB)) % (8) != 0)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    			digB = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
			digBS = digB.toString();
    		currentProblem = digDS + digAS + digBS + " x 62 1/2 =";
			correctAnswer = ((100*digD)+(10*digA)+(digB))*(62.5);
			correctAnswer = correctAnswer.toString();
    	}
        break;
    case 14:
    	if (digA < 5) {
    		while(((10*digD)+(digA)) % (8) != 0)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
    		currentProblem = digDS + digAS + " x 87 1/2 =";
			correctAnswer = ((10*digD)+(digA))*(87.5);
			correctAnswer = correctAnswer.toString();
    	}
    	else {
    		while(((100*digD)+(10*digA)+(digB)) % (8) != 0)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    			digB = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
			digBS = digB.toString();
    		currentProblem = digDS + digAS + digBS + " x 87 1/2 =";
			correctAnswer = ((100*digD)+(10*digA)+(digB))*(87.5);
			correctAnswer = correctAnswer.toString();
    	}
        break;
    case 15:
    	if (digA < 5) {
    		while((digA % 2) === 1 || (digD+digA) % (3) === 1 || (digD+digA) % (3) === 2)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
    		currentProblem = digDS + digAS + " x 83 1/3 =";
			correctAnswer = ((10*digD)+(digA))*(250)/(3);
			correctAnswer = correctAnswer.toString();
    	}
    	else {
    		while((digA % 2) === 1 || (digD+digA+digB) % (3) === 1 || (digD+digA+digB) % (3) === 2)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    			digB = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
			digBS = digB.toString();
    		currentProblem = digDS + digBS + digAS + " x 83 1/3 =";
			correctAnswer = ((100*digD)+(10*digB)+(digA))*(250)/(3);
			correctAnswer = correctAnswer.toString();
    	}
        break;
    case 16:
    	if (digA < 5) {
    		while((digD+digA) % (3) === 1 || (digD+digA) % (3) === 2)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
    		currentProblem = digDS + digAS + " x 66 2/3 =";
			correctAnswer = ((10*digD)+(digA))*(200)/(3);
			correctAnswer = correctAnswer.toString();
    	}
    	else {
    		while((digD+digA+digB) % (3) === 1 || (digD+digA+digB) % (3) === 2)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    			digB = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
			digBS = digB.toString();
    		currentProblem = digDS + digBS + digAS + " x 66 2/3 =";
			correctAnswer = ((100*digD)+(10*digB)+(digA))*(200)/(3);
			correctAnswer = correctAnswer.toString();
    	}
        break;
    case 17:
    	if (digA < 5) {
    		while(((10*digD)+(digA)) % (8) != 0)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
    		currentProblem = digDS + digAS + " x 125 =";
			correctAnswer = ((10*digD)+(digA))*(125);
			correctAnswer = correctAnswer.toString();
    	}
    	else {
    		while(((100*digD)+(10*digA)+(digB)) % (8) != 0)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    			digB = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
			digBS = digB.toString();
    		currentProblem = digDS + digAS + digBS + " x 125 =";
			correctAnswer = ((100*digD)+(10*digA)+(digB))*(125);
			correctAnswer = correctAnswer.toString();
    	}
        break;
    case 18:
    	while(digD == 0)
    	{
    		digD = Math.floor(Math.random() * 9) + 1;
    	}
    	digE = 10 - digD;
		digDS = digD.toString();
		digES = digE.toString();
		currentProblem = digFS + digDS + " x " + digFS + digES + " =";
		correctAnswer = ((10*digF)+(digD))*((10*digF)+(digE));
		break;
	case 19:
    	while(digD == 0)
    	{
    		digD = Math.floor(Math.random() * 9) + 1;
    	}
    	digE = 10 - digD;
		digDS = digD.toString();
		digES = digE.toString();
		currentProblem = digDS + digFS + " x " + digES + digFS + " =";
		correctAnswer = ((10*digD)+(digF))*((10*digE)+(digF));
		break;
	case 20:
		currentProblem = "9" + digAS + " x " + "9" + digBS + " =";
		correctAnswer = ((90)+(digA))*((90)+(digB));
		break;
	case 21:
		currentProblem = "10" + digAS + " x " + "10" + digBS + " =";
		correctAnswer = ((100)+(digA))*((100)+(digB));
		break;
	case 22:
		while(digA == 0  && digB == 0)
		{
			digA = Math.floor(Math.random() * 10);
			digB = Math.floor(Math.random() * 10);
		}
		digAS = digA.toString();
		digBS = digB.toString();
		currentProblem = digDS + "0" + digAS + " x " + digDS + "0" + digBS + " =";
		correctAnswer = ((100*digD)+(digA))*((100*digD)+(digB));
		break;
	case 23:
    	if (digA < 5) {
    		while((digD+digA) % (3) === 1 || (digD+digA) % (3) === 2)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
    		currentProblem = digDS + digAS + " x 3367 =";
			correctAnswer = ((10*digD)+(digA))*(3367);
			correctAnswer = correctAnswer.toString();
    	}
    	else {
    		while((digD+digA+digB) % (3) === 1 || (digD+digA+digB) % (3) === 2 || ((100*digD)+(10*digB)+(digA)) > 298)
    		{
    			digD = Math.floor(Math.random() * 9) + 1;
    			digA = Math.floor(Math.random() * 10);
    			digB = Math.floor(Math.random() * 10);
    		}
    		digDS = digD.toString();
			digAS = digA.toString();
			digBS = digB.toString();
    		currentProblem = digDS + digBS + digAS + " x 3367 =";
			correctAnswer = ((100*digD)+(10*digB)+(digA))*(3367);
			correctAnswer = correctAnswer.toString();
    	}
        break;
    case 24:
    	currentProblem = digDS + digAS + " x 11 =";
    	correctAnswer = ((10*digD)+(digA))*(11);
    	break;
	case 25:
    	currentProblem = digDS + digAS + digBS + " x 11 =";
    	correctAnswer = ((100*digD)+(10*digA)+(digB))*(11);
    	break;
	case 26:
    	currentProblem = digDS + digAS + digBS + " x 111 =";
    	correctAnswer = ((100*digD)+(10*digA)+(digB))*(111);
    	break;
	case 27:
    	currentProblem = digDS + digAS + " x 111 =";
    	correctAnswer = ((10*digD)+(digA))*(111);
    	break;
	case 28:
    	currentProblem = digDS + digAS + " x 101 =";
    	correctAnswer = ((10*digD)+(digA))*(101);
    	break;
	case 29:
    	currentProblem = digDS + digAS + digBS + " x 101 =";
    	correctAnswer = ((100*digD)+(10*digA)+(digB))*(101);
    	break;
	case 30:
    	currentProblem = digDS + digAS + " x 1001 =";
    	correctAnswer = ((10*digD)+(digA))*(1001);
    	break;
	case 31:
		digA = ((10*digD) + (digA))*2;
		while (digA > 200) {
			digD = Math.floor(Math.random() * 9) + 1;
			digA = Math.floor(Math.random() * 10);
			digA = ((10*digD) + (digA))*2;
		}
		digB = (digA)/4; 
		digAS = digA.toString();
		digBS = digB.toString();
		if (digE < 5)
		{
			currentProblem = digAS + " x " + digBS + " =";
		}
		else
		{
			currentProblem = digBS + " x " + digAS + " =";
		}
		correctAnswer = ((digA)*(digB));
		break;
	case 32:
		if (digE > 5)
		{
			currentProblem = "10" + digAS + " x " + "9" + digBS + " =";
			correctAnswer = ((100)+(digA))*((90)+(digB));
		}
		else
		{
			currentProblem = "9" + digAS + " x " + "10" + digBS + " =";
			correctAnswer = ((90)+(digA))*((100)+(digB));
		}
		break;
	case 33:
		digA = Math.floor(Math.random() * 9) + 1;
		digB = Math.floor(Math.random() * 8) + 2;
		digC = Math.floor(Math.random() * 9) + 1;
		digD = Math.floor(Math.random() * 8) + 2;	
		while ((digA) % (digD) !== 0 || (digC) % (digB) !== 0 || (digA) == (digC))
		{
			digD = Math.floor(Math.random() * 8) + 2;
			digA = Math.floor(Math.random() * 9) + 1;
			digB = Math.floor(Math.random() * 8) + 2;
			digC = Math.floor(Math.random() * 9) + 1;
		}
		digAS = digA.toString();
		digBS = digB.toString();
		digCS = digC.toString();
		digDS = digD.toString();
		currentProblem = digAS + " 1/" + digBS + " x " + digCS + " 1/" + digDS + " =";
		// using digE as correct answer calculation placeholder for the whole number portion
		digE = ((digA)*(digC)) + ((digC)/(digB)) + ((digA)/(digD));
		digES = digE.toString();
		// using digF as correct answer calculatoin placeholder for the fractional number portion
		digF = ((digB)*(digD));
		digFS = "1/" + digF.toString();
		correctAnswer = digES + " " + digFS;
		correctAnswer = correctAnswer.toString();
		break;
	case 34:
		digA = Math.floor(Math.random() * 9) + 1;
		digB = Math.floor(Math.random() * 8) + 2;
		digC = Math.floor(Math.random() * 9) + 1;
		digD = digB;
		while ((digA) == (digC) || (((digA)+(digC)) % digB) !== 0)
		{
			digA = Math.floor(Math.random() * 9) + 1;
			digB = Math.floor(Math.random() * 8) + 2;
			digC = Math.floor(Math.random() * 9) + 1;
			digD = digB;
		}
		digAS = digA.toString();
		digBS = digB.toString();
		digCS = digC.toString();
		digDS = digD.toString();
		currentProblem = digAS + " 1/" + digBS + " x " + digCS + " 1/" + digDS + " =";
		// using digE as correct answer calculation placeholder for the whole number portion
		digE = ((digA)*(digC)) + (((digA)+(digC))/(digB));
		digES = digE.toString();
		// using digF as correct answer calculatoin placeholder for the fractional number portion
		digF = ((digB)*(digD));
		digFS = "1/" + digF.toString();
		correctAnswer = digES + " " + digFS;
		correctAnswer = correctAnswer.toString();
		break;
	case 35:
		digA = Math.floor(Math.random() * 9) + 1;
		digB = Math.floor(Math.random() * 9) + 1;
		digC = Math.floor(Math.random() * 8) + 2;
		digD = (digC) - (digB);
		while ((digB) >= (digC) || (digD) >= (digC) || ((digC)%(digB) == 0) || (((digB)*(digD))%(digC) == 0))
		{
			digA = Math.floor(Math.random() * 9) + 1;
			digB = Math.floor(Math.random() * 9) + 1;
			digC = Math.floor(Math.random() * 8) + 2;
			digD = (digC) - (digB);
		}
		digAS = digA.toString();
		digBS = digB.toString();
		digCS = digC.toString();
		digDS = digD.toString();
		currentProblem = digAS + " " + digBS + "/" + digC + " x " + digAS + " " + digDS + "/" + digC + " =";
		//using digE as correct answer calculation placeholder for the whole number portion
		digE = ((digA)*((digA)+1));
		// using digF as correct answer calculatoin placeholder for the numerator of the fraction number portion
		digF = ((digB)*(digD));
		// using digG as correct answer calculatoin placeholder for the denominator of the fraction number portion
		var digG = ((digC)*(digC));
		digES = digE.toString();
		digFS = digF.toString();
		var digGS = digG.toString();
		correctAnswer = digES + " " + digFS + "/" + digGS;
		correctAnswer = correctAnswer.toString();
		break;
	case 36:
		digB = gcd(digD,digE);
		digD = Math.floor(Math.random() * 8) + 2;
		digE = Math.floor(Math.random() * 8) + 2;
		while (((digD)-(digE))%((digD)*(digE))==0 || (((digD)-(digE))*((digD)-(digE)) >= ((digD)*(digE))) || ((digB) !== 1) || ((digA) !== 1))
		{
			digD = Math.floor(Math.random() * 8) + 2;
			digE = Math.floor(Math.random() * 8) + 2;
			
			//digA & digB are gcd
			digA = gcd(digE,digD);
			digB = gcd(digD,digE);
		}
		digDS = digD.toString();
		digES = digE.toString();
		currentProblem = digDS + "/" + digES + " + " + digES + "/" + digDS + " =";
		//using digA as placeholder... lel
		digA = ((digD)-(digE))*((digD)-(digE));
		//using digB as placeholder
		digB = ((digD)*(digE));
		digAS = digA.toString();
		digBS = digB.toString();
		correctAnswer = "2 " + digA + "/" + digBS;
		correctAnswer = correctAnswer.toString();
		break;
	case 37:
		if(digB < 5)
		{
			while((((10*digD)+(digA))%(digE) !== 0))
			{
				digD = Math.floor(Math.random() * 9) + 1;
				digA = Math.floor(Math.random() * 10);
				digE = Math.floor(Math.random() * 9) + 1;
				digDS = digD.toString();
				digAS = digA.toString();
				digES = digE.toString();
			}
			currentProblem = digDS + digAS + " is " + digE + "% of  __";
			correctAnswer = (((10*digD)+(digA))/(digE))*100;
		}
		else
		{
			while((((100*digD)+(10*digA)+(digB))%(digE) !== 0))
			{
				digD = Math.floor(Math.random() * 9) + 1;
				digA = Math.floor(Math.random() * 10);
				digB = Math.floor(Math.random() * 10);
				digE = Math.floor(Math.random() * 9) + 1;
				digDS = digD.toString();
				digAS = digA.toString();
				digBS = digB.toString();
				digES = digE.toString();
			}
			currentProblem = digDS + digAS + digBS + " is " + digE + "% of  __";
			correctAnswer = (((100*digD)+(10*digA)+(digB))/(digE))*100;
		}
		break;
	case 38:
		digD = Math.floor(Math.random() * 9) + 1;
		digA = Math.floor(Math.random() * 10);
		digB = Math.floor(Math.random() * 8) + 2;
		while(digD >= digB || digA >= digB)
		{
			digD = Math.floor(Math.random() * 9) + 1;
			digA = Math.floor(Math.random() * 10);
			digB = Math.floor(Math.random() * 8) + 2;
		}
		digDS = digD.toString();
		digAS = digA.toString();
		digBS = digB.toString();
		currentProblem = digDS + digAS + " (base " + digBS + ") =  ___ (base 10)";
		correctAnswer = (((digD)*(digB))+digA);
		break;
	case 39:
		currentProblem = digDS + digAS + "/40 =";
		correctAnswer = ((10*digD)+(digA))/(40);
		break;
	case 40:
		digF = Math.floor(Math.random() * 10);
		if (digF < 3)
		{
			currentProblem = "What is the remainder of " + digDS + digAS + " ÷ 9?";
			correctAnswer = (((10*digD)+(digA))%9);
		}
		else if (digF >= 3 && digF < 7)
		{
			currentProblem = "What is the remainder of " + digDS + digAS + digBS+ " ÷ 9?";
			correctAnswer = (((100*digD)+(10*digA)+(digB))%9);
		}
		else
		{
			currentProblem = "What is the remainder of " + digDS + digAS + digBS + digCS + " ÷ 9?";
			correctAnswer = (((1000*digD)+(100*digA)+(10*digB)+(digC))%9);
		}
		break;
	case 41:
		// using digE as placeholder again lol
		digE = ((100*digA)+(10*digB)+(digC));
		while(digE >= 512 || digE <= 0)
		{
			digC = Math.floor(Math.random() * 10);
			digA = Math.floor(Math.random() * 10);
			digB = Math.floor(Math.random() * 10);
			digE = ((100*digA)+(10*digB)+(digC));
		}
		digE = parseInt(digE, 10);
		digD = digE.toString(8);
		digCS = digC.toString();
		digAS = digA.toString();
		digBS = digB.toString();
		digES = digE.toString();
		digDS = digD.toString();
		currentProblem = digDS + " (base 8) =  __ (base 2)";
		// using digF as placeholder for base conversions
		digF = digE.toString(2);
		correctAnswer = digF;
		break;
	case 42:
		digA = Math.floor(Math.random() * 19) + 1;
		digB = Math.floor(Math.random() * 19) + 1;
		digC = Math.floor(Math.random() * 19) + 1;
		digD = digA * digB * digC;
		while ((digD) % 27 !== 0)
		{
			digA = Math.floor(Math.random() * 19) + 1;
			digB = Math.floor(Math.random() * 19) + 1;
			digC = Math.floor(Math.random() * 19) + 1;
			digD = digA * digB * digC;
		}
		digAS = digA.toString();
		digBS = digB.toString();
		digCS = digC.toString();
		digDS = digD.toString();
		currentProblem = digAS + "ft x " + digBS + "ft x " + digCS + "ft =  __ yd³";
		correctAnswer = (digD)/27;
		break;
	case 43:
		digA = Math.floor(Math.random() * 999) + 1;
		if (digB < 5)
		{
			// ft/sec to mph
			while (digA % 22 !== 0)
			{
				digA = Math.floor(Math.random() * 999) + 1;
			}
			digAS = digA.toString();
			currentProblem = digAS + " ft/sec =  __ mph";
			correctAnswer = ((digA)*(15)/(22));
		}
		else
		{
			// mph to ft/sec
			while (digA % 15 !== 0)
			{
				digA = Math.floor(Math.random() * 999) + 1;
			}
			digAS = digA.toString();
			currentProblem = digAS + " mph =  __ ft/sec";
			correctAnswer = ((digA)*(22)/(15));
		}
		break;
	case 44:
		digD = Math.floor(Math.random() * 9) + 1;
		var generatedSetArray = randStringForSets(digD);
		var shownSet = "{";
		for (var p = 0; p < generatedSetArray.length; p++)
		{
			if (p == (generatedSetArray.length - 1))
			{
				shownSet = shownSet + generatedSetArray[p] + "}";
			}
			else
			{
				shownSet = shownSet + generatedSetArray[p] + ", ";
			}
		}
		currentProblem = "How many subsets in this set?  " + shownSet;
		correctAnswer = Math.pow(2,generatedSetArray.length);
		break;
	case 45:
		digD = Math.floor(Math.random() * 9) + 1;
		var generatedSetArray = randStringForSets(digD);
		var shownSet = "{";
		for (var p = 0; p < generatedSetArray.length; p++)
		{
			if (p == (generatedSetArray.length - 1))
			{
				shownSet = shownSet + generatedSetArray[p] + "}";
			}
			else
			{
				shownSet = shownSet + generatedSetArray[p] + ", ";
			}
		}
		currentProblem = "How many improper subsets in this set?  " + shownSet;
		correctAnswer = 1;
		break;
	case 46:
		digD = Math.floor(Math.random() * 9) + 1;
		var generatedSetArray = randStringForSets(digD);
		var shownSet = "{";
		for (var p = 0; p < generatedSetArray.length; p++)
		{
			if (p == (generatedSetArray.length - 1))
			{
				shownSet = shownSet + generatedSetArray[p] + "}";
			}
			else
			{
				shownSet = shownSet + generatedSetArray[p] + ", ";
			}
		}
		currentProblem = "How many proper subsets in this set?  " + shownSet;
		correctAnswer = (Math.pow(2,generatedSetArray.length) - 1);
		break;
	case 47:
		digD = Math.floor(Math.random() * 9) + 1;
		var generatedSetArray = randStringForSets(digD);
		var shownSet = "{";
		for (var p = 0; p < generatedSetArray.length; p++)
		{
			if (p == (generatedSetArray.length - 1))
			{
				shownSet = shownSet + generatedSetArray[p] + "}";
			}
			else
			{
				shownSet = shownSet + generatedSetArray[p] + ", ";
			}
		}
		currentProblem = "How many power sets in this set?  " + shownSet;
		correctAnswer = Math.pow(2,generatedSetArray.length);
		break;
	case 48:
		digD = Math.floor(Math.random() * 90) + 10;
		// digE is gcd of digD and 99
		digE = gcd(digD, 99);
		if ((digD) % (digE) !== 0 || (99) % (digE) !== 0)
		{
			digE = gcd(99, digD);
		}
		digDS = digD.toString();
		digES = digE.toString();
		currentProblem = "." + digDS + digDS + digDS + "... =  __ (fraction)";
		// digA, digB, & digF as placeholders
		digA = digD / digE;
		digF = 99 / digE;
		digAS = digA.toString();
		digFS = digF.toString();
		digB = digAS + "/" + digFS;
		digBS = digB.toString();
		correctAnswer = digBS;
		correctAnswer = correctAnswer.toString();
		break;
	case 49:
		// digA = numerator placeholder
		digA = (10*digD) + (digE) - (digD);
		// digB is GCD
		digB = gcd(digA, 90);
		if ((digA) % (digB) !== 0 || (90) % (digB) !== 0)
		{
			digB = gcd(90, digA);
		}
		digAS = digA.toString();
		digBS = digB.toString();
		digDS = digD.toString();
		digES = digE.toString();
		currentProblem = "." + digDS + digES + digES + digES + "... =  __ (fraction)";
		// digC & digF as placeholders
		digC = digA / digB;
		digF = 90 / digB;
		digCS = digC.toString();
		digFS = digF.toString();
		digF = digCS + "/" + digFS;
		digFS = digF.toString();
		correctAnswer = digFS;
		correctAnswer = correctAnswer.toString();
		break;
	case 50:
		if(digB < 5)
		{
			// gal to in3
			currentProblem = digD + " gallons =  __ in³";
			correctAnswer = (digD)*231;
		}
		else
		{
			// in3 to gal
			digE = digD*231;
			currentProblem = digE + " in³ =  __ gallon(s)";
			correctAnswer = (digD);
		}
		break;
	case 51:
		if(digD == 1)
		{
			currentProblem = "Find the 1st pentagonal number.";
		}
		else if(digD == 2)
		{
			currentProblem = "Find the 2nd pentagonal number.";
		}
		else if(digD == 3)
		{
			currentProblem = "Find the 3rd pentagonal number.";
		}	
		else
		{
			currentProblem = "Find the " + digDS + "th pentagonal number.";
		}
		correctAnswer = (((3)*(Math.pow(digD,2))-digD)/2);
		break;
	case 52:
		if(digA == 1)
		{
			currentProblem = "Find the " + digDS + digAS + "st triangular number.";
		}
		else if(digA == 2)
		{
			currentProblem = "Find the " + digDS + digAS + "nd triangular number.";
		}
		else if(digA == 3)
		{
			currentProblem = "Find the " + digDS + digAS + "rd triangular number.";
		}	
		else
		{
			currentProblem = "Find the " + digDS + digAS + "th triangular number.";
		}
		// digE placeholder
		digE = ((10*digD)+(digA));
		digES = digE.toString();
		correctAnswer = ((digE)*(digE + 1)/2);
		break;
	case 53:
		estimation = 1;
		digD = Math.floor(Math.random() * 18) + 1;
		while(digD % 2 == 0)
		{
			digD = Math.floor(Math.random() * 18) + 1;
		}
		digDS = digD.toString();
		if(digD == 1)
		{
			currentProblem = "Estimate pi to the 1st power.";
		}
		else if(digD == 3)
		{
			currentProblem = "Estimate pi to the 3rd power.";
		}
		else
		{
			currentProblem = "Estimate pi to the " + digDS + "th power.";
		}
		correctAnswer = Math.pow(Math.PI, digD);
		correctAnswerLower = Math.floor(correctAnswer * 0.95);
		correctAnswerUpper = Math.ceil(correctAnswer * 1.05);
		break;
	case 54:
		estimation = 1;
		digD = Math.floor(Math.random() * 18) + 1;
		while(digD % 2 == 1)
		{
			digD = Math.floor(Math.random() * 18) + 1;
		}
		digDS = digD.toString();
		if(digD == 2)
		{
			currentProblem = "Estimate pi to the 2nd power.";
		}
		else
		{
			currentProblem = "Estimate pi to the " + digDS + "th power.";
		}
		correctAnswer = Math.pow(Math.PI, digD);
		correctAnswerLower = Math.floor(correctAnswer * 0.95);
		correctAnswerUpper = Math.ceil(correctAnswer * 1.05);
		break;
	case 55:
		digD = Math.floor(Math.random() * 40) + 1;
		digE = Math.floor(Math.random() * 5) + 1;
		//digE is the difference
		//digF is the numerator
		//digD is the denominator
		digF = digD + digE;
		while(digF <= 1)
		{
			digD = Math.floor(Math.random() * 40) + 1;
			digE = Math.floor(Math.random() * 5) + 1;
			digF = digD + digE;
		}
		currentProblem = digF + "/" + digD + " x " + digF + " =";
		//digA B and C are placeholders
		digA = digF + digE;
		digB = Math.pow(digE,2);
		digC = gcd(digB,digD);
		if(digB % digC !== 0 || digD % digC !== 0)
		{
			digC = gcd(digD,digB);
		}
		digB = (digB)/(digC);
		digD = (digD)/(digC);

		digAS = digA.toString();
		digBS = digB.toString();
		digCS = digC.toString();
		digDS = digD.toString();
		digES = digE.toString();
		digFS = digF.toString();

		correctAnswer = digAS + " " + digB + "/" + digD;
		correctAnswer = correctAnswer.toString();
		break;
	case 56:
		digD = Math.floor(Math.random() * 40) + 1;
		digE = Math.floor(Math.random() * 5) + 1;
		//digE is the difference
		//digF is the numerator
		//digD is the denominator
		digF = digD - digE;
		while(digF <= 1)
		{
			digD = Math.floor(Math.random() * 40) + 1;
			digE = Math.floor(Math.random() * 5) + 1;
			digF = digD + digE;
		}
		currentProblem = digF + "/" + digD + " x " + digF + " =";
		//digA B and C are placeholders
		digA = digF - digE;
		digB = Math.pow(digE,2);
		digC = gcd(digB,digD);
		if(digB % digC !== 0 || digD % digC !== 0)
		{
			digC = gcd(digD,digB);
		}
		digB = (digB)/(digC);
		digD = (digD)/(digC);

		digAS = digA.toString();
		digBS = digB.toString();
		digCS = digC.toString();
		digDS = digD.toString();
		digES = digE.toString();
		digFS = digF.toString();

		correctAnswer = digAS + " " + digB + "/" + digD;
		correctAnswer = correctAnswer.toString();
		break;
	case 57:
		currentProblem = "99" + digAS + " x " + "99" + digBS + " =";
		correctAnswer = (((990)+(digA))*((990)+(digB)));
		break;
	case 58:
		digD = Math.floor(Math.random() * 18) + 2;
		digE = Math.floor(Math.random() * 18) + 2;
		while(digD == digE)
		{
			digD = Math.floor(Math.random() * 18) + 2;
			digE = Math.floor(Math.random() * 18) + 2;
		}
		digDS = digD.toString();
		digES = digE.toString();
		currentProblem = "1/" + digDS + " + 1/" + digES + " = 1/X      X =";
		//placeholder A B C
		digA = (digD)*(digE);
		digB = (digD)+(digE);
		if(digA % digB == 0)
		{
			correctAnswer = (digA) / (digB);
		}
		else
		{
			digC = gcd(digA,digB);
			if (digA % digC !== 0 || digB % digC !== 0)
			{
				digC = gcd(digB,digA);
			}
			digA = (digA)/(digC);
			digB = (digB)/(digC);
			digAS = digA.toString();
			digBS = digB.toString();
			digCS = digC.toString();
			correctAnswer = digA + "/" + digB;
			correctAnswer = correctAnswer.toString();
		}
		break;
	case 59:
		digD = Math.floor(Math.random() * 18) + 2;
		digE = Math.floor(Math.random() * 18) + 2;
		while(digD >= digE)
		{
			digD = Math.floor(Math.random() * 18) + 2;
			digE = Math.floor(Math.random() * 18) + 2;
		}
		digDS = digD.toString();
		digES = digE.toString();
		currentProblem = "1/" + digDS + " - 1/" + digES + " = 1/X      X =";
		//placeholder A B C
		digA = (digD)*(digE);
		digB = (digE)-(digD);
		if(digA % digB == 0)
		{
			correctAnswer = (digA) / (digB);
		}
		else
		{
			digC = gcd(digA,digB);
			if (digA % digC !== 0 || digB % digC !== 0)
			{
				digC = gcd(digB,digA);
			}
			digA = (digA)/(digC);
			digB = (digB)/(digC);
			digAS = digA.toString();
			digBS = digB.toString();
			digCS = digC.toString();
			correctAnswer = digA + "/" + digB;
			correctAnswer = correctAnswer.toString();
		}
		break;
	case 60:
		digD = Math.floor(Math.random() * 28) + 3;
		digDS = digD.toString();
		currentProblem = "1 + 2 + ... + " + digDS + " =";
		correctAnswer = ((digD)*(digD + 1)/2);
		break;
	case 61:
		digD = Math.floor(Math.random() * 35) + 6;
		while(digD % 2 == 1)
		{
			digD = Math.floor(Math.random() * 35) + 6;
		}
		digDS = digD.toString();
		currentProblem = "2 + 4 + ... + " + digDS + " =";
		correctAnswer = ((digD)*(digD + 2)/4);
		break;
	case 62:
		digD = Math.floor(Math.random() * 76) + 5;
		while(digD % 2 == 0)
		{
			digD = Math.floor(Math.random() * 76) + 5;
		}
		digDS = digD.toString();
		currentProblem = "1 + 3 + ... + " + digDS + " =";
		correctAnswer = Math.pow(((digD+1)/2),2);
		break;
	case 63:
		digD = Math.floor(Math.random() * 19) + 1;
		digDS = digD.toString();
		if(digD == 1)
		{
			currentProblem = "Find the 1st hexagonal number.";
		}
		else if(digD == 2)
		{
			currentProblem = "Find the 2nd hexagonal number.";
		}
		else if(digD == 3)
		{
			currentProblem = "Find the 3rd hexagonal number.";
		}	
		else
		{
			currentProblem = "Find the " + digDS + "th hexagonal number.";
		}
		correctAnswer = (((2)*(Math.pow(digD,2)))-digD);
		break;
	case 64:
		if(digB < 5)
		{
			// find SA given SD
			digD = Math.floor(Math.random() * 39) + 1;
			digDS = digD.toString();
			currentProblem = "Find the surface area of a cube with a space diagonal of " + digD + ".";
			correctAnswer = ((Math.pow(digD,2))*2);
		}
		else
		{
			//find SD given side
			digD = Math.floor(Math.random() * 99) + 1;
			digDS = digD.toString();
			currentProblem = "Find the space diagonal of a cube with a side length of " + digD + ".";
			correctAnswer = digD + " root 3";
			correctAnswer = correctAnswer.toString();
		}
		break;
	case 65:
		digD = Math.floor(Math.random() * 18) + 3;
		digDS = digD.toString();
		currentProblem = "Find the number of diagonals in a polygon with " + digD + " sides.";
		correctAnswer = (((digD)*(digD-3))/2);
		break;
	case 66:
		digD = Math.floor(Math.random() * 99) + 2;
		var factorsArray = [];
		for(var i = 1; i <= digD; i++)
		{
			if(digD % i == 0)
			{
				factorsArray.push(i);
			}
		}
		while(factorsArray.length <= 2)
		{
            factorsArray = [];
			digD = Math.floor(Math.random() * 99) + 2;
			for(i = 1; i <= digD; i++)
			{
				if(digD % i == 0)
				{
					factorsArray.push(i);
				}
			}
		}
		digDS = digD.toString();
		currentProblem = "Find the total number of factors of " + digD + ".";
		correctAnswer = factorsArray.length;
		break;
	case 67:
		estimation = 1;
		digD = Math.floor(Math.random() * 9000) + 1000;
		digDS = digD.toString();
		currentProblem = "Estimate square root of " + digDS + ".";
		correctAnswer = Math.sqrt(digD);
		correctAnswerLower = Math.floor(correctAnswer*0.95);
		correctAnswerUpper = Math.ceil(correctAnswer*1.05);
		break;
	case 68:
		estimation = 1;
		digD = Math.floor(Math.random() * 90000) + 10000;
		digDS = digD.toString();
		currentProblem = "Estimate square root of " + digDS + ".";
		correctAnswer = Math.sqrt(digD);
		correctAnswerLower = Math.floor(correctAnswer*0.95);
		correctAnswerUpper = Math.ceil(correctAnswer*1.05);
		break;
	case 69:
		digD = Math.floor(Math.random() * 500) + 1;
		while (digD % 5 !== 0)
		{
			digD = Math.floor(Math.random() * 500) + 1;
		}
		digDS = digD.toString();
		currentProblem = digDS + "C° = ___ F°";
		correctAnswer = (((digD)*9/5)+32);
		break;
	case 70:
		digD = Math.floor(Math.random() * 150) + 1;
		while ((digD-32) % 9 !== 0)
		{
			digD = Math.floor(Math.random() * 150) + 1;
		}
		digDS = digD.toString();
		currentProblem = digDS + "F° = ___ C°";
		correctAnswer = (((digD)-32)*5/9);
		break;
	case 71:
		digD = Math.floor(Math.random() * 40) + 1;
		while (digD % 2 == 1)
		{
			digD = Math.floor(Math.random() * 40) + 1;
		}
		digDS = digD.toString();
		currentProblem = "Find the area of a square with a diagonal of " + digDS + ".";
		correctAnswer = ((Math.pow(digD,2))/2);
		break;
	case 72:
		estimation = 1;
		digD = Math.floor(Math.random() * 900) + 100;
		digE = Math.floor(Math.random() * 900) + 100;
		while (digD == digE)
		{
			digD = Math.floor(Math.random() * 900) + 100;
			digE = Math.floor(Math.random() * 900) + 100;
		}
		digDS = digD.toString();
		digES = digE.toString();
		currentProblem = "Estimate " + digDS + " x " + digES + ".";
		correctAnswer = (digD)*(digE);
		correctAnswerLower = Math.floor(correctAnswer*0.95);
		correctAnswerUpper = Math.ceil(correctAnswer*1.05);
		break;
	case 73:
		if(digB < 5)
		{
			currentProblem = "What is the remainder of " + digDS + digAS + digES + digBS + digCS + " ÷ 11?";
			correctAnswer = (((10000*digD)+(1000*digA)+(100*digE)+(10*digB)+(digC))%11);
		}
		else
		{
			currentProblem = "What is the remainder of " + digDS + digAS + digES + digBS + digFS + digCS + " ÷ 11?";
			correctAnswer = (((100000*digD)+(10000*digA)+(1000*digE)+(100*digB)+(10*digF)+(digC))%11);
		}
		break;
	case 74:
		digD = Math.floor(Math.random() * 8) + 2;
		digF = Math.floor(Math.random() * 8) + 2;
		digDS = digD.toString();
		digFS = digF.toString();
		digA = (1000*digD)-digE;
		digAS = digA.toString();
		currentProblem = digAS + " x " + digFS + " =";
		correctAnswer = ((digA)*(digF));
		break;
	case 75: 
		if (digB < 5)
		{
			digF = Math.floor(Math.random() * 1) + 2;
			digD = Math.floor(Math.random() * 90) + 10;

			digD = digD + digF;
			digE = digD - digF;

			digDS = digD.toString();
			digES = digE.toString();

			currentProblem = digDS + "² - " + digES + "² =";
			correctAnswer = ((digD)+(digE))*((digD)-(digE));
		}
		else
		{
			digF = Math.floor(Math.random() * 8) + 2;
			digD = Math.floor(Math.random() * 120) + 10;

			digD = digD + digF;
			digE = digD - digF;

			while(((digD + digE) % 10 !== 0) && ((digD - digE) % 10 !== 0))
			{
				digF = Math.floor(Math.random() * 8) + 2;
				digD = Math.floor(Math.random() * 120) + 10;

				digD = digD + digF;
				digE = digD - digF;
			}

			digDS = digD.toString();
			digES = digE.toString();

			currentProblem = digD + "² - " + digE + "² =";
			correctAnswer = ((digD)+(digE))*((digD)-(digE));
		}
		break;
	case 76:
		digD = Math.floor(Math.random() * 8) + 2;
		digE = Math.floor(Math.random() * 900) + 100;
		digDS = digD.toString();
		digES = digE.toString();
		digA = (1000*digD)-digF;
		digAS = digA.toString();
		currentProblem = digAS + " + " + digES + " =";
		correctAnswer = ((digA)+(digE));
		break;
	case 77:
		if(digB < 5)
		{
			//complement
			digD = Math.floor(Math.random() * 89) + 1;
			digDS = digD.toString();
			currentProblem = "Find the complement of an angle of " + digDS + "°.";
			correctAnswer = (90-digD);
		}
		else
		{
			//suplement
			digD = Math.floor(Math.random() * 179) + 1;
			digDS = digD.toString();
			currentProblem = "Find the supplement of an angle of " + digDS + "°.";
			correctAnswer = (180-digD);
		}
		break;
	case 78:
		digD = Math.floor(Math.random() * 89) + 1;
		digDS = digD.toString();
		currentProblem = "Find the difference between the complement and the supplement of an angle of " + digDS + "°.";
		correctAnswer = 90;
		break;
	case 79:
		digD = Math.floor(Math.random() * 89) + 1;
		digDS = digD.toString();
		currentProblem = "Find the sum of the complement and the supplement of an angle of " + digDS + "°.";
		correctAnswer = 270-((digD)*(2));
		break;
	case 80:
		digD = Math.floor(Math.random() * 100) + 1;
		digDS = digD.toString();
		var relativelyPrimeArray = [];
		for(var i=1;i<digD;i++)
		{
			if(gcd(digD,i) == 1)
			{
				relativelyPrimeArray.push(i);
			}
		}
		currentProblem = "How many numbers less than " + digDS + " are relatively prime to " + digDS + "?";
		correctAnswer = relativelyPrimeArray.length;
		break;
	case 81:
		digD = Math.floor(Math.random() * 90) + 10;
		digE = Math.floor(Math.random() * 90) + 10;
		while(digD == digE)
		{
			digD = Math.floor(Math.random() * 90) + 10;
			digE = Math.floor(Math.random() * 90) + 10;
		}
		digDS = digD.toString();
		digES = digE.toString();
		currentProblem = "Find the product of the LCM and GCF of " + digDS + " and " + digES + ".";
		correctAnswer = ((digD)*(digE));
		break;
	case 82:
		estimation = 1;
		if(digB < 5)
		{
			digD = Math.floor(Math.random() * 18) + 3;
			digE = digD - 1;
			digF = digD + 1;
			digDS = digD.toString();
			digES = digE.toString();
			digFS = digF.toString();
			currentProblem = "Estimate " + digES + " x " + digDS + " x " + digFS + ".";
			correctAnswer = (Math.pow(digD,3))-digD;
		}
		else
		{
			digD = Math.floor(Math.random() * 17) + 4;
			digE = digD - 2;
			digF = digD + 2;
			digDS = digD.toString();
			digES = digE.toString();
			digFS = digF.toString();
			currentProblem = "Estimate " + digES + " x " + digDS + " x " + digFS + ".";
			correctAnswer = (Math.pow(digD,3))-((digD)*(4));
		}
		correctAnswerLower = Math.floor(correctAnswer*0.95);
		correctAnswerUpper = Math.ceil(correctAnswer*1.05);
		break;
	case 83: 
		digD = Math.floor(Math.random() * 40) + 1;
		digDS = digD.toString();
		currentProblem = digDS + "² =";
		correctAnswer = (Math.pow(digD,2));
		break;
	case 84: 
		digD = Math.floor(Math.random() * 20) + 1;
		digDS = digD.toString();
		currentProblem = digDS + "³ =";
		correctAnswer = (Math.pow(digD,3));
		break;
	}

	document.getElementById("currentProblem").innerHTML = currentProblem;
}

function checkAnswer() {
	var checkDisp = document.getElementById("check");
	var nextProblemDisp = document.getElementById("next");
	
	if (checkDisp.disabled == false)
	{
		checkDisp.style.cursor = "not-allowed";
		checkDisp.style.backgroundColor = "rgb(180, 180, 180)";
        document.getElementById("check").disabled = true;        

		nextProblemDisp.style.cursor = "pointer";
		nextProblemDisp.style.backgroundColor = "rgb(255, 255, 255)";
        document.getElementById("next").disabled = false;        

		var userResponse = document.getElementById("response").value;
		userResponse = userResponse.trim();
		
		var userResponseInt = Number(userResponse);

		if (isNaN(userResponseInt) == false) {           
			if (estimation == 1)
			{
				if (userResponseInt >= correctAnswerLower && userResponseInt <= correctAnswerUpper)
				{
					document.getElementById("correctness").innerHTML = "Correct! The acceptable range was " + correctAnswerLower + " to " + correctAnswerUpper + ".";
                    sessionCorrect++;
                    sessionStreak++;
				}
				else
				{
					document.getElementById("correctness").innerHTML = "Incorrect. The acceptable range was " + correctAnswerLower + " to " + correctAnswerUpper + ".";
                    sessionStreak = 0;
				}
			}
			else {
				if (userResponseInt == correctAnswer)
				{
					document.getElementById("correctness").innerHTML = "Correct!";
                    sessionCorrect++;
                    sessionStreak++;
				}
				else
				{
					document.getElementById("correctness").innerHTML = "Incorrect. The correct answer was " + correctAnswer + ".";
                    sessionStreak = 0;
				}
			}
		}

		else if (isNaN(userResponseInt) == true) {
			var correctAnswerWithSpace = correctAnswer;
			correctAnswer = correctAnswer.replace(/\s/g,'');
			userResponse = userResponse.replace(/\s/g,'');
			if (userResponse == correctAnswer)
			{
				document.getElementById("correctness").innerHTML = "Correct!";
                sessionCorrect++;
                sessionStreak++;
			}
			else
			{
				document.getElementById("correctness").innerHTML = "Incorrect. The correct answer was " + correctAnswerWithSpace + ".";
                sessionStreak = 0;
			}
		}

        sessionAttempted++;

        document.getElementById("attempted").innerHTML = "Problems Attempted: " + sessionAttempted;
        document.getElementById("correct").innerHTML = "Problems Correct: " + sessionCorrect;
        document.getElementById("streak").innerHTML = "Problems Correct In A Row: " + sessionStreak;
        document.getElementById("percentage").innerHTML = "Percentage Correct: " + ((sessionCorrect/sessionAttempted)*100).toFixed(0) + "%";
	}
	else
	{
		generateProblems();
	}
}

var pdfNumA;
var pdfNumB;
var questionsArray = [];
var qsppc = 20; // questions per page per column

function generatePDF() {
    if(selectionCheckPass)
    {
        questionsArray = [];
        var numQs;
        var answersArray = [];

        numQs = prompt("How many questions would you like in the PDF?");
        numQs = parseInt(numQs);

        while(typeof numQs !== "number")
        {
            numQs = prompt("Please try again: How many questions would you like in the PDF?");
            numQs = parseInt(numQs);
        }

        for (var i = 1; i < numQs + 1; i++) {
            generateProblems();
            var displayedProblem = document.getElementById("currentProblem").innerHTML;
            console.log("Gen Problem: " + i + ") " + displayedProblem);
            questionsArray.push(i + ") " + displayedProblem);
            if(estimation == 1)
            {
                console.log("Answer to " + i + ") " + correctAnswerLower + " - " + correctAnswerUpper);
                answersArray.push(i + ") " + correctAnswerLower + " - " + correctAnswerUpper);
            }
            else
            {
                console.log("Answer to " + i + ") " + correctAnswer);
                answersArray.push(i + ") " + correctAnswer);
            }
        }

        var d = new Date();
        var pdfDateDisplay = ("0" + (d.getMonth() + 1).toString()).slice(-2) + ("0" + d.getDate().toString()).slice(-2) + d.getFullYear().toString().substring(2) + "_" + ("0" + d.getHours().toString()).slice(-2) + ("0" + d.getMinutes().toString()).slice(-2) + ("0" + d.getSeconds().toString()).slice(-2);

        var doc = new jsPDF('p', 'pt');
        doc.setFontType("bold");
        doc.text(40, 40, "Mr. Tics Generated Practice PDF");

        doc.setFontType("normal");

        // questions formatting
        var leftTable = [];
        var rightTable = [];

        for(var i=0; i < questionsArray.length; i++)
        {
            if(parseInt(i/qsppc) %2 == 0)
            {
                leftTable.push(questionsArray[i]);
            }
            else
            {
                rightTable.push(questionsArray[i]);
            }
        }

        console.log(leftTable);
        console.log(rightTable);

        questionsArray = [];
        
        for(var i=0; i<leftTable.length; i++)
        {
            if(rightTable[i] !== undefined)
            {
                questionsArray.push([leftTable[i], rightTable[i]]);
            }        
            else
            {
                questionsArray.push([leftTable[i], ""]);
            }
        }

        // answers formatting
        var leftAnsTable = [];
        var rightAnsTable = [];

        for(var i=0; i < answersArray.length; i++)
        {
            if(parseInt(i/qsppc) %2 == 0)
            {
                leftAnsTable.push(answersArray[i]);
            }
            else
            {
                rightAnsTable.push(answersArray[i]);
            }
        }

        console.log(leftAnsTable);
        console.log(rightAnsTable);

        answersArray = [];
        
        for(var i=0; i<leftAnsTable.length; i++)
        {
            if(rightAnsTable[i] !== undefined)
            {
                answersArray.push([leftAnsTable[i], rightAnsTable[i]]);
            }        
            else
            {
                answersArray.push([leftAnsTable[i], ""]);
            }
        }

        console.log(answersArray);

        // problems tables
        var pCount = numQs;
        var pageNums = 1;

        doc.autoTable([numQs.toString() + " Problems.", " "], questionsArray.slice(0,qsppc), {
            styles: {theme: "plain", overflow: "linebreak", cellPadding: 9, valign: "middle", overflowColumns: false},
            startY: 60,
            columnStyles: {
                0: {columnWidth: 250},
                1: {columnWidth: 250},
                // etc
            }
        });

        pCount -= (qsppc*2);

        while(pCount > 0)
        {
            doc.addPage();
            doc.autoTable([numQs.toString() + " Problems.", " "], questionsArray.slice(qsppc*pageNums, qsppc*(pageNums+1)), {
                styles: {theme: "plain", overflow: "linebreak", cellPadding: 9, valign: "middle", overflowColumns: false},
                columnStyles: {
                    0: {columnWidth: 250},
                    1: {columnWidth: 250},
                    // etc
                }
            });

            pCount -= (qsppc*2);
            pageNums++;
        }

        doc.addPage();

        //answers table
        pCount = numQs;
        pageNums = 1;

        doc.autoTable(["Answer Key", " "], answersArray.slice(0,qsppc), {
            styles: {theme: "plain", overflow: "linebreak", cellPadding: 9, valign: "middle", overflowColumns: false},
            startY: 60,
            columnStyles: {
                0: {columnWidth: 250},
                1: {columnWidth: 250},
                // etc
            }
        });

        pCount -= (qsppc*2);

        while(pCount > 0)
        {
            doc.addPage();
            doc.autoTable(["Answer Key", " "], answersArray.slice(qsppc*pageNums, qsppc*(pageNums+1)), {
                styles: {theme: "plain", overflow: "linebreak", cellPadding: 9, valign: "middle", overflowColumns: false},
                columnStyles: {
                    0: {columnWidth: 250},
                    1: {columnWidth: 250},
                    // etc
                }
            });

            pCount -= (qsppc*2);
            pageNums ++;
        }


        doc.save("Mr. Tics NS Practice PDF " + pdfDateDisplay + ".pdf");
    }
}
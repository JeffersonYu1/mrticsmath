var selectedTypes = [];
var tT = Boolean(10 > 9);
var fF = Boolean(10 < 9);

var currentProblem = "Problem";
var correctAnswer = 0;
var correctAnswerTres = 0;
var correctAnswerTen = 0;
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

var reSpace = function(a)
{
	a = a.replace(/\s/g,'');
	return a;
};

var sA = function(a)
{
	if ((typeof correctAnswer !== 'number' && typeof correctAnswer !== 'string') || !correctAnswer || (typeof correctAnswer == "string" && !(correctAnswer.includes("e+") || correctAnswer.includes("e-"))))
	{
		console.log("Redirected by cA ...");
		generateProblems();
	}

	else if(typeof correctAnswer == "string" && (correctAnswer.includes("e+") || correctAnswer.includes("e-")))
	{
		// console.log(a);
	    a = a.split('e');

	    var tempted = a[0];
	    tempted = parseFloat(tempted);
	    tempted = tempted.toFixed(2);

	    var temp;
	    temp = a[1];
	    temp = temp.replace('+','');
	    temp = Number(temp);
	    temp = temp.toString();

		a.splice(0,2,tempted,temp);

	    correctAnswerTres = a[0];
	    correctAnswerTen = a[1];
	}

	else if (typeof correctAnswer == 'number' || correctAnswer)
	{
		//sA means switch Answer (to scientific ig...?)
		a = a.toExponential();
		// console.log(a);
	    a = a.split('e');

	    var tempted = a[0];
	    tempted = parseFloat(tempted);
	    tempted = tempted.toFixed(2);

	    var temp;
	    temp = a[1];
	    temp = temp.replace('+','');
	    temp = Number(temp);
	    temp = temp.toString();

		a.splice(0,2,tempted,temp);

	    correctAnswerTres = a[0];
	    correctAnswerTen = a[1];
	}
	
};

var gcd = function(a, b) {
    if ( ! b) {
        return a;
    }
    return gcd(b, a % b);
};

var cNG = function(a,b,c,d) {
	// cNG means calc number gen
	// a = min, b = max, c = decimal places, d= mode of signs
	// d mode: 0 is always pos, 1 is "" or -, 2 is + or - close together, 3 is + or - far away
	// 4? 5? 6: "" or (-num)
	var q = Math.random() * (b - a) + a;
	while(q < a || q > b)
	{
		q = Math.random() * (b - a) + a;
	}	

    q = q.toFixed(c); //q is now a set decimal # of places and also a string

	if (d==1)
	{
		var s = Math.floor(Math.random()*2);
	    if(s == 0){
	    }
	    else if(s == 1){
	    	q = "-" + q;
	    }	    
	}
	else if (d==2)
	{
		var s = Math.floor(Math.random()*2);
	    if(s == 0){
	    	q = "+" + q;
	    }
	    else if(s == 1){
	    	q = "-" + q;
	    }
	}
	else if (d==3)
	{
		var s = Math.floor(Math.random()*2);
	    if(s == 0){
	    	q = " + " + q;
	    }
	    else if(s == 1){
	    	q = " - " + q;
	    }
	}
	else if (d==4)
	{
		q = "+" + q;
	}
	else if (d==5)
	{
		q = " + " + q;
	}
	else if (d==6)
	{
		var s = Math.floor(Math.random()*4);
	    if(s == 1){
	    	q = "(-" + q + ")";
	    }
	}
	return q;
};

var cSG = function(a) {
	// cSG means calc sign gen
	// a is the sign gen mode: 1 is "" or -, 3 is + or - and spaces
	if (a==1)
		{
			var s = Math.floor(Math.random()*2);
			    if(s == 0){
			    	sign = "";
			    }
			    else if(s == 1){
			    	sign = "-";
			    }
		}
	else if (a==3)
		{
			var s = Math.floor(Math.random()*2);
			    if(s == 0){
			    	sign = " + ";
			    }
			    else if(s == 1){
			    	sign = " - ";
			    }
		}
	return sign;
};

var forLatex = function(problem, mode) {
	// convert expressions to latex w/ \times and \div
	// mode 0 (default) = change times and divided to LaTeX symbols
	// mode 1 = change times always, and divided only when white space on each side

	return problem.replace(/\*/g,"\\times").replace(/\s\/\s/g,"\\div").replace("pi","\\pi");
}

var forMathJS = function(problem, mode) {
	return problem.replace("[","(").replace("]", ")");
}

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
	document.getElementById("responsetres").focus();

	var checkDisp = document.getElementById("check");
	checkDisp.style.backgroundColor = "rgb(255, 255, 255)";
    checkDisp.style.cursor = "pointer"; 
	document.getElementById("check").disabled = false;
    
	var nextProblemDisp = document.getElementById("next");
	nextProblemDisp.style.backgroundColor = "rgb(180, 180, 180)";
    nextProblemDisp.style.cursor = "not-allowed";
	document.getElementById("next").disabled = true;    

	document.getElementById('responsetres').value = "";
	document.getElementById('responseten').value = "";
	document.getElementById("correctness").innerHTML = "<br>";

	var numberOfTypes = selectedTypes.length;
	var chooseRandType = Math.floor(Math.random() * numberOfTypes);
	var problemType = selectedTypes[chooseRandType];
	
	// saving vars for the numbers
	var numAA;
	var numBB;
	var numCC;
	var numDD;
	var numEE;
	var numFF;
	var numGG;
	var numHH;
	var numII;
	var numJJ;
	var numKK;
	var numLL;
	var numMM;
	var numNN;
	var numOO;
	var numPP;
	var numQQ;
	var numRR;
	var numSS;
	var numTT;

	// Numbers as String
	var numAAs;
	var numBBs;
	var numCCs;
	var numDDs;
	var numEEs;
	var numFFs;
	var numGGs;
	var numHHs;
	var numIIs;
	var numJJs;
	var numKKs;
	var numLLs;
	var numMMs;
	var numNNs;
	var numOOs;
	var numPPs;
	var numQQs;
	var numRRs;
	var numSSs;
	var numTTs;	

	// Signs if necessary
	var signAA;
	var signBB;
	var signCC;
	var signDD;
	var signEE;
	var signFF;
	var signGG;
	var signHH;

	var operStrs = [" + ", " - ", " * ", " / "];

	//reset estimation
	estimation = 0;

	var perPageProblemType = Math.floor(Math.random() * 5);
	// perPageProblemType = 4;

	switch (problemType) {
		case 0:
			// Arithmetic with 2 Numbers (Integers and Decimals)
			var operationAA = Math.floor(Math.random()*4);

			numAAs = cNG(1,100,cNG(0,6,0,0),0);
			numBBs = cNG(1,100,cNG(0,6,0,0),0);

			currentProblem = "" + numAAs + operStrs[operationAA] + numBBs;
			correctAnswer = parseFloat(math.evaluate(currentProblem));

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			break;
		case 1:
			// Arithmetic with 3 Numbers (Integers and Decimals)
			var operationAA = Math.floor(Math.random()*4);
			var operationBB = Math.floor(Math.random()*4);

			numAAs = cNG(1,1000,cNG(0,6,0,0),0);
			numBBs = cNG(1,1000,cNG(0,6,0,0),0);
			numCCs = cNG(1,1000,cNG(0,6,0,0),0);

			currentProblem = "" + numAAs + operStrs[operationAA] + numBBs + operStrs[operationBB] + numCCs;
			correctAnswer = parseFloat(math.evaluate(currentProblem));

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			break;
		case 2:
			// Arithmetic with 4 Numbers (Integers and Decimals)
			var operationAA = Math.floor(Math.random()*4);
			var operationBB = Math.floor(Math.random()*4);
			var operationCC = Math.floor(Math.random()*4);

			numAAs = cNG(1,1000,cNG(0,4,0,0),0);
			numBBs = cNG(1,1000,cNG(0,4,0,0),0);
			numCCs = cNG(1,1000,cNG(0,4,0,0),0);
			numDDs = cNG(1,1000,cNG(0,4,0,0),0);

			currentProblem = "" + numAAs + operStrs[operationAA] + numBBs + operStrs[operationBB] + numCCs + operStrs[operationCC] + numDDs;
			correctAnswer = parseFloat(math.evaluate(currentProblem));

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			break;
		case 3:
			// Arithmetic with 3 Numbers (Integers, Decimals, Fractions)
			var operationAA = Math.floor(Math.random()*4);
			var operationBB = Math.floor(Math.random()*4);
			var fracPlace = Math.floor(Math.random()*3);

			numAAs = cNG(1,1000,2,0);
			numBBs = cNG(1,100,0,0);
			numCCs = cNG(1,100,0,0);
			numDDs = cNG(1,1000,2,0);

			switch(fracPlace)
			{
				case 0:
					currentProblem = "" + numBBs + "/" + numCCs + operStrs[operationAA] + numAAs + operStrs[operationBB] + numDDs;
					break;
				case 1:
					currentProblem = "" + numAAs + operStrs[operationAA] + numBBs + "/" + numCCs + operStrs[operationBB] + numDDs;
					break;
				case 2:
					currentProblem = "" + numAAs + operStrs[operationAA] + numDDs + operStrs[operationBB] + numBBs + "/" + numCCs;
					break;
			}
			
			correctAnswer = parseFloat(math.evaluate(currentProblem));

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			break;
		case 4:
			// Arithmetic with 4 Numbers (Integers, Decimals, Fractions)
			var operationAA = Math.floor(Math.random()*4);
			var operationBB = Math.floor(Math.random()*4);
			var operationCC = Math.floor(Math.random()*4);
			var fracPlace = Math.floor(Math.random()*4);

			numAAs = cNG(1,1000,cNG(0,4,0,0),6);
			numBBs = cNG(1,100,0,0);
			numCCs = cNG(1,100,0,0);
			numDDs = cNG(1,1000,cNG(0,4,0,0),6);
			numEEs = cNG(1,1000,cNG(0,4,0,0),6);

			switch(fracPlace)
			{
				case 0:
					currentProblem = "" + numBBs + "/" + numCCs + operStrs[operationAA] + numAAs + operStrs[operationBB] + numDDs + operStrs[operationCC] + numEEs;
					break;
				case 1:
					currentProblem = "" + numAAs + operStrs[operationAA] + numBBs + "/" + numCCs + operStrs[operationBB] + numDDs + operStrs[operationCC] + numEEs;
					break;
				case 2:
					currentProblem = "" + numAAs + operStrs[operationAA] + numDDs + operStrs[operationBB] + numBBs + "/" + numCCs + operStrs[operationCC] + numEEs;
					break;
				case 3:
					currentProblem = "" + numAAs + operStrs[operationAA] + numDDs + operStrs[operationBB] + numEEs + operStrs[operationCC] + numBBs + "/" + numCCs;
					break;
			}
			
			correctAnswer = parseFloat(math.evaluate(currentProblem));

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			break;
		case 5:
			// arithmetic with parenthesis
			var operationAA = Math.floor(Math.random()*4);
			var operationBB = Math.floor(Math.random()*4);
			var operationCC = Math.floor(Math.random()*4);
			var fracPlace = Math.floor(Math.random()*3);

			numAAs = cNG(1,1000,cNG(0,3,0,0),6);
			numBBs = cNG(1,1000,cNG(0,3,0,0),6);
			numCCs = cNG(1,1000,cNG(0,3,0,0),6);
			numDDs = cNG(1,1000,cNG(0,3,0,0),6);

			switch(fracPlace)
			{
				case 0:
					currentProblem = "(" + numAAs + operStrs[operationAA] + numBBs + ")" + operStrs[operationBB] + numCCs + operStrs[operationCC] + numDDs;
					break;
				case 1:
					currentProblem = "" + numAAs + operStrs[operationAA] + "(" + numBBs + operStrs[operationBB] + numCCs + ")" + operStrs[operationCC] + numDDs;
					break;
				case 2:
					currentProblem = "" + numAAs + operStrs[operationAA] + numBBs + operStrs[operationBB] + "(" + numCCs + operStrs[operationCC] + numDDs + ")";
					break;
			}
			
			correctAnswer = parseFloat(math.evaluate(currentProblem));

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			break;
		case 6:
			// arithmetic with exponents
			var operationAA = Math.floor(Math.random()*4);
			var operationBB = Math.floor(Math.random()*4);
			var operationCC = Math.floor(Math.random()*4);
			var expPlace = Math.floor(Math.random()*3);

			numAAs = cNG(1,1000,2,6);
			numBBs = cNG(2,40,0,0);
			numCCs = cNG(1,7,0,0);
			numDDs = cNG(1,1000,2,6);

			switch(expPlace)
			{
				case 0:
					currentProblem = "" + numBBs + "^" + numCCs + operStrs[operationAA] + numAAs + operStrs[operationBB] + numDDs;
					break;
				case 1:
					currentProblem = "" + numAAs + operStrs[operationAA] + numBBs + "^" + numCCs + operStrs[operationBB] + numDDs;
					break;
				case 2:
					currentProblem = "" + numAAs + operStrs[operationAA] + numDDs + operStrs[operationBB] + numBBs + "^" + numCCs;
					break;
			}

			correctAnswer = parseFloat(math.evaluate(currentProblem));

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			break;
		case 7:
			// arithmetic with radicals
			var operationAA = Math.floor(Math.random()*4);
			var operationBB = Math.floor(Math.random()*4);
			var operationCC = Math.floor(Math.random()*4);
			var expPlace = Math.floor(Math.random()*3);

			numAAs = cNG(1,1000,cNG(0,3,0,0),6);
			numBBs = cNG(2,40,0,0);
			numCCs = cNG(2,7,0,0);
			numDDs = cNG(1,1000,cNG(0,3,0,0),6);

			if(numCCs == "2")
			{
				numCCs = "";
			}

			// currentProblem written in LaTeX
			switch(expPlace)
			{
				case 0:
					currentProblem = "\\sqrt[" + numCCs + "]{" + numBBs + "}" + operStrs[operationAA] + numAAs + operStrs[operationBB] + numDDs;
					correctAnswer = parseFloat(math.evaluate("(" + numBBs + "^(1/" + numCCs + "))" + operStrs[operationAA] + numAAs + operStrs[operationBB] + numDDs));
					break;
				case 1:
					// currentProblem = "" + numAAs + operStrs[operationAA] + numBBs + "^" + numCCs + operStrs[operationBB] + numDDs;
					currentProblem = numAAs + operStrs[operationAA] + "\\sqrt[" + numCCs + "]{" + numBBs + "}" + operStrs[operationBB] + numDDs;
					correctAnswer = parseFloat(math.evaluate(numAAs + operStrs[operationAA] + "(" + numBBs + "^(1/" + numCCs + "))" + operStrs[operationBB] + numDDs));
					break;
				case 2:
					currentProblem = numAAs + operStrs[operationAA] + numDDs + operStrs[operationBB] + "\\sqrt[" + numCCs + "]{" + numBBs + "}";
					correctAnswer = parseFloat(math.evaluate(numAAs + operStrs[operationAA] + numDDs + operStrs[operationBB] + "(" + numBBs + "^(1/" + numCCs + "))"));
					break;
			}

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			break;
		case 8:
			// arithmetic with pi and e
			var operationAA = Math.floor(Math.random()*4);
			var operationBB = Math.floor(Math.random()*4);
			var operationCC = Math.floor(Math.random()*4);
			var expPlace = Math.floor(Math.random()*3);
			var coeffOrExp = Math.floor(Math.random()*2);
			var eOrPi = Math.floor(Math.random()*2);
			var piEPart = "";			

			numAAs = cNG(1,1000,cNG(0,3,0,0),6);
			numCCs = cNG(2,10,0,0);
			numDDs = cNG(1,1000,cNG(0,3,0,0),6);

			if(coeffOrExp == 0)
			{
				piEPart = piEPart + numCCs;
				if(eOrPi == 0)
				{
					piEPart = piEPart + "e";
				}
				else
				{
					piEPart = piEPart + "pi";
				}
			}
			else
			{
				if(eOrPi == 0)
				{
					piEPart = piEPart + "e";
				}
				else
				{
					piEPart = piEPart + "pi";
				}
				piEPart = piEPart + "^" + numCCs;
			}

			switch(expPlace)
			{
				case 0:
					currentProblem = "" + piEPart + operStrs[operationAA] + numAAs + operStrs[operationBB] + numDDs;
					break;
				case 1:
					currentProblem = "" + numAAs + operStrs[operationAA] + piEPart + operStrs[operationBB] + numDDs;
					break;
				case 2:
					currentProblem = "" + numAAs + operStrs[operationAA] + numDDs + operStrs[operationBB] + piEPart;
					break;
			}

			correctAnswer = parseFloat(math.evaluate(currentProblem));

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			break;
		case 9:
			// arithmetic with sin, cos, tan
			var operationAA = Math.floor(Math.random()*4);
			var operationBB = Math.floor(Math.random()*4);
			var operationCC = Math.floor(Math.random()*4);
			var expPlace = Math.floor(Math.random()*2);
			var sinCosOrTan = Math.floor(Math.random()*3);
			var degOrRad = Math.floor(Math.random()*2);
			var tempBoi = ["sin","cos","tan"];
			var tempBoi2 = ["deg", "rad"];
			var tempBoi3 = ["^{\\circ}", ""];

			numAAs = cNG(1,100,cNG(0,2,0,0),0);
			numBBs = cNG(1,100,cNG(0,2,0,0),0);
			numCCs = cNG(1,1000,cNG(0,4,0,0),6);

			// currentProblem written in LaTeX
			switch(expPlace)
			{
				case 0:
					currentProblem = "\\text{(" + tempBoi2[degOrRad] + ") }" + "\\" + tempBoi[sinCosOrTan] + "{(" + numAAs + tempBoi3[degOrRad] + operStrs[operationAA] + numBBs + tempBoi3[degOrRad] + ")}" + operStrs[operationBB] + numCCs;
					correctAnswer = parseFloat(math.evaluate("" + tempBoi[sinCosOrTan] + "((" + numAAs + operStrs[operationAA] + numBBs + ") " + tempBoi2[degOrRad] + ")" + operStrs[operationBB] + numCCs));
					break;
				case 1:
					currentProblem = "\\text{(" + tempBoi2[degOrRad] + ") }" + numCCs + operStrs[operationBB] + "\\" + tempBoi[sinCosOrTan] + "{(" + numAAs + tempBoi3[degOrRad] + operStrs[operationAA] + numBBs + tempBoi3[degOrRad] + ")}";
					correctAnswer = parseFloat(math.evaluate("" + numCCs + operStrs[operationBB] + tempBoi[sinCosOrTan] + "((" + numAAs + operStrs[operationAA] + numBBs + ") " + tempBoi2[degOrRad] + ")"));
					break;
			}

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			break;
		case 10:
			// arithmetic with log, ln
			var operationAA = Math.floor(Math.random()*4);
			var operationBB = Math.floor(Math.random()*4);
			var operationCC = Math.floor(Math.random()*4);
			var expPlace = Math.floor(Math.random()*2);
			var sinCosOrTan = Math.floor(Math.random()*2);
			var tempBoi = ["log", "ln"];
			var tempBoi2 = ["10", "e"];

			while(operationAA == 1)
			{
				operationAA = Math.floor(Math.random()*4);
			}

			numAAs = cNG(1,100,cNG(0,2,0,0),0);
			numBBs = cNG(1,100,cNG(0,2,0,0),0);
			numCCs = cNG(1,1000,cNG(0,4,0,0),6);

			// currentProblem written in LaTeX
			switch(expPlace)
			{
				case 0:
					currentProblem = "\\" + tempBoi[sinCosOrTan] + "{(" + numAAs + operStrs[operationAA] + numBBs + ")}" + operStrs[operationBB] + numCCs;
					correctAnswer = parseFloat(math.evaluate("log((" + numAAs + operStrs[operationAA] + numBBs + ")," + tempBoi2[sinCosOrTan] + ")" + operStrs[operationBB] + numCCs));
					break;
				case 1:
					currentProblem = numCCs + operStrs[operationBB] + "\\" + tempBoi[sinCosOrTan] + "{(" + numAAs + operStrs[operationAA] + numBBs + ")}";
					correctAnswer = parseFloat(math.evaluate("" + numCCs + operStrs[operationBB] + "log((" + numAAs + operStrs[operationAA] + numBBs + ")," + tempBoi2[sinCosOrTan] + ")"));
					break;
			}

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			break;
		case 11:
			// elem pg. 1
			var selectPage = Math.floor(Math.random()*10);
			switch(selectPage)
			{
				case 0:
					numAAs = cNG(1000,9999,0,0);
					numBBs = cNG(1000,9999,0,0);
					currentProblem = "" + numAAs + " + " + numBBs;
					break;
				case 1:
					numAAs = cNG(1000,9999,0,0);
					numBBs = cNG(1000,9999,0,0);
					currentProblem = "" + numAAs + " - " + numBBs;
					break;
				case 2:
					numAAs = cNG(10000,99999,0,0);
					numBBs = cNG(10000,99999,0,0);
					currentProblem = "" + numAAs + " + " + numBBs;
					break;
				case 3:
					numAAs = cNG(1000,9999,0,0);
					numBBs = cNG(1000,9999,0,0);
					numCCs = cNG(1,10,2,0);
					currentProblem = "" + numAAs + " * " + numBBs + " * " + numCCs;
					break;
				case 4:
					numAAs = cNG(1000000,9999999,0,0);
					numBBs = cNG(10000,99999,0,0);
					currentProblem = "" + numAAs + " - " + numBBs;
					break;
				case 5:
					numAAs = cNG(1700,2100,0,0);
					numBBs = cNG(1700,2100,0,0);
					numCCs = cNG(1700,2100,0,0);
					numDDs = cNG(1700,2100,0,0);
					currentProblem = "" + numAAs + " + " + numBBs + " + " + numCCs + " - " + numDDs;
					break;
				case 6:
					numAAs = cNG(100000,999999,0,0);
					numBBs = cNG(10000,99999,0,0);
					currentProblem = "" + numAAs + " - " + numBBs;
					break;
				case 7:
					numAAs = cNG(100000,999999,0,0);
					numBBs = cNG(10,99,0,0);
					numCCs = cNG(10,99,0,0);
					currentProblem = "" + numAAs + " - " + numBBs + " * " + numCCs;
					break;
				case 8:
					numAAs = cNG(1,1000,0,0);
					numBBs = cNG(1,1000,0,0);
					numCCs = cNG(1,1000,0,0);
					currentProblem = "" + numAAs + " * " + numBBs + " * " + numCCs;
					break;
				case 9:
					numAAs = cNG(100,9999,0,0);
					numBBs = cNG(100,9999,0,0);
					numCCs = cNG(1,999,1,0);
					numDDs = cNG(1,999,1,0);
					currentProblem = "(" + numAAs + " + " + numBBs + ") * " + numCCs + " + " + numDDs;
					break;
			}

			correctAnswer = parseFloat(math.evaluate(currentProblem));
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			break;
		case 12:
			// elem pg. 2
			var selectPage = Math.floor(Math.random()*10);
			switch(selectPage)
			{
				case 0:
					numAAs = cNG(10,1000,2,0);
					numBBs = cNG(10,100,0,0);
					numCCs = cNG(10,100,3,0);
					numDDs = cNG(10,99,0,0);
					numEEs = cNG(1,100,0,0);
					numFFs = cNG(1,100,0,0);
					while(parseFloat(numFFs) <= parseFloat(numEEs) || gcd(parseFloat(numFFs), parseFloat(numEEs)) != 1)
					{
						numEEs = cNG(1,100,0,0);
						numFFs = cNG(1,100,0,0);
					}
					currentProblem = "(" + numAAs + " + " + numBBs + " + " + numCCs + ") + " + numDDs + "\\frac{" + numEEs + "}{" + numFFs + "}";
					correctAnswer = parseFloat(math.evaluate("(" + numAAs + " + " + numBBs + " + " + numCCs + ") + (" + numDDs + "+" + numEEs + "/" + numFFs + ")"));
					break;
				case 1:
					numAAs = cNG(10,99,3,0);
					numBBs = cNG(10,99,3,0);
					numCCs = cNG(10,99,3,0);
					currentProblem = "" + numAAs + " + " + numBBs + " + " + numCCs;
					break;
				case 2:
					numAAs = cNG(10,99,cNG(1,6,0,0),0);
					numBBs = cNG(10,99,cNG(1,6,0,0),0);
					numCCs = cNG(10,99,cNG(1,6,0,0),0);
					currentProblem = "" + numAAs + " + " + numBBs + " + " + numCCs;
					break;
				case 3:
					numAAs = cNG(100,999,0,0);
					numBBs = cNG(1,100,0,0);
					numCCs = cNG(1,100,1,0);
					numFFs = cNG(10,100,0,0);
					numDDs = cNG(1,10,4,0);
					numEEs = cNG(0,1, cNG(2,6,0,0), 0);
					currentProblem = "[" + numAAs + " + (" + numBBs + " - " + numCCs + ")]" + " + " + numFFs + "(" + numDDs + " + " + numEEs + ")";
					correctAnswer = parseFloat(math.evaluate(forMathJS(currentProblem, 0)));
					break;
				case 4:
					numAAs = cNG(90,100, cNG(0,2,0,0), 0);
					numBBs = cNG(1,100,0,0);
					numCCs = cNG(0,1,2,0);
					numDDs = cNG(1,1000,0,0);
					numEEs = cNG(10,100,0,0);
					numFFs = cNG(1,20,0,0);
					currentProblem = "" + numAAs + "(" + numBBs + " + " + numCCs + ")(" + numDDs + " - " + numEEs + " * " + numFFs + ")";
					break;
				case 5:
					numAAs = cNG(500,1000,0,0);
					numBBs = cNG(1,10,cNG(2,4,0,0),0);
					numCCs = cNG(10,100,cNG(2,5,0,0),0);
					currentProblem = "" + numAAs + " * " + numBBs + " * " + numCCs;
					break;
				case 6:
					numAAs = cNG(10,100,0,0);
					numBBs = cNG(100,1000,0,0);
					numCCs = cNG(100,1000,0,0);
					numDDs = cNG(10,50,0,0);
					currentProblem = "(" + numAAs + " * " + numBBs + " - " + numCCs + ") * " + numDDs;
					break;
				case 7:
					numAAs = cNG(0,100,3,0);
					numBBs = cNG(50,100,0,0);
					numCCs = cNG(10,100,0,0);
					numDDs = cNG(1,10,0,0);
					numEEs = cNG(2,10,0,0);
					while(parseFloat(numEEs) <= parseFloat(numDDs) || gcd(parseFloat(numEEs), parseFloat(numDDs)) != 1)
					{
						numDDs = cNG(1,10,0,0);
						numEEs = cNG(2,10,0,0);
					}
					currentProblem = "" + numAAs + " + " + numBBs + " * " + numCCs + "\\frac{" + numDDs + "}{" + numEEs + "}";
					correctAnswer = parseFloat(math.evaluate("" + numAAs + " + " + numBBs + " * (" + numCCs + "+" + numDDs + "/" + numEEs + ")"));
					break;
				case 8:
					numAAs = cNG(100,1000,0,0);
					numBBs = cNG(1,30,0,0);
					numCCs = cNG(1,20,0,0);
					numDDs = cNG(2,20,0,0);
					numEEs = cNG(1,30,0,0);
					numFFs = cNG(1,20,0,0);
					numGGs = cNG(2,20,0,0);
					while(parseFloat(numDDs) <= parseFloat(numCCs) || gcd(parseFloat(numDDs), parseFloat(numCCs)) != 1)
					{
						numCCs = cNG(1,20,0,0);
						numDDs = cNG(2,20,0,0);
					}
					while(parseFloat(numGGs) <= parseFloat(numFFs) || gcd(parseFloat(numGGs), parseFloat(numFFs)) != 1)
					{
						numFFs = cNG(1,20,0,0);
						numGGs = cNG(2,20,0,0);
					}
					currentProblem = "" + numAAs + "[" + numBBs + "\\frac{" + numCCs + "}{" + numDDs + "} + " + numEEs + "\\frac{" + numFFs + "}{" + numGGs + "}]";
					correctAnswer = parseFloat(math.evaluate("" + numAAs + "((" + numBBs + " + " + numCCs + "/" + numDDs + ") + (" + numEEs + " + " + numFFs + "/" + numGGs + "))"));
					break;
				case 9:
					numAAs = cNG(800,9999,0,0);
					numBBs = cNG(0,1,cNG(1,4,0,0),0);
					numCCs = cNG(1,10,cNG(1,4,0,0),0);
					numDDs = cNG(0,1,4,0);
					currentProblem = "" + numAAs + " + " + numBBs + " - " + numCCs + " * " + numDDs;
					break;
			}

			if(selectPage != 0 && selectPage != 3 && selectPage != 7 && selectPage != 8)
			{
				correctAnswer = parseFloat(math.evaluate(currentProblem));				
			}

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

			break;
		case 13:
			// elem pg. 3
			var selectPage = Math.floor(Math.random()*8);
			switch(selectPage)
			{
				case 0:
					numAAs = cNG(100,1000,2,0);
					numBBs = cNG(100,1000,2,0);
					numCCs = cNG(50,100,2,0);
					numDDs = cNG(0,1,1,0);
					numEEs = cNG(10,100,0,0);
					numFFs = cNG(0,1,3,0);
					numGGs = cNG(10,100,0,0);
					currentProblem = "(\\sqrt[3]{" + numAAs + " + \\sqrt{" + numBBs + "}})[(" + numCCs + " + " + numDDs + "(" + numEEs + " / " + numFFs + ") + " + numGGs + ")]";
					correctAnswer = parseFloat(math.evaluate("((" + numAAs + " + (" + numBBs + ")^(1/2))^(1/3))*(" + numCCs + " + " + numDDs + "(" + numEEs + "/" + numFFs + ") + " + numGGs + ")")); 
					break;
				case 1:
					numAAs = cNG(100,1000,0,0);
					numBBs = cNG(10,100,0,0);
					numCCs = cNG(1,10,2,0);
					numDDs = cNG(1,10,2,0);
					currentProblem = "" + numAAs + "(" + numBBs + " + " + numCCs + ")" + " + " + numDDs + "^3";
					correctAnswer = parseFloat(math.evaluate(currentProblem));
					break;
				case 2:
					numAAs = cNG(1,10, cNG(3,5,0,0), 0);
					numBBs = cNG(2,3,0,0);
					numCCs = cNG(10000,99999,0,0);
					numDDs = cNG(10,100,2,0);
					numEEs = cNG(10,100,4,0);
					currentProblem = "" + numAAs + " ^" + numBBs + " + \\sqrt{" + numCCs + "} + " + numDDs + " + " + numEEs;
					correctAnswer = parseFloat(math.evaluate("" + numAAs + " ^" + numBBs + " + (" + numCCs + "^(1/2)) + " + numDDs + " + " + numEEs));
					break;
				case 3:
					numAAs = cNG(10,1000,0,0);
					numBBs = cNG(10000,99999,0,0);
					numCCs = cNG(100000,999999,0,0);
					numDDs = cNG(10,99,2,0);
					numEEs = cNG(10,99,0,0);
					numFFs = cNG(1,10,3,0);
					numGGs = cNG(1,20,4,0);
					currentProblem = "" + numAAs + " + \\frac{\\sqrt[3]{" + numBBs + "}}{\\sqrt{" + numCCs + "}} + (" + numCCs + " + " + numDDs + "(" + numEEs + " + " + numFFs + "))";
					correctAnswer = parseFloat(math.evaluate("" + numAAs + "+ (((" + numBBs + ")^(1/3))/((" + numCCs + ")^(1/2))) + (" + numCCs + " + " + numDDs + "(" + numEEs + " + " + numFFs + "))"));
					break;
				case 4:
					numAAs = cNG(10,1000,2,0);
					numBBs = cNG(100,1000,0,0);
					numCCs = cNG(10,100,1,0);
					numDDs = cNG(10,100,2,0);
					numEEs = cNG(10,100,1,0);
					currentProblem = "" + numAAs + " + " + numBBs + " * " + numCCs + " - " + numDDs + " + " + numEEs;
					correctAnswer = parseFloat(math.evaluate(currentProblem));
					break;
				case 5:
					numAAs = cNG(10,99,2,0);
					numBBs = cNG(1000,9999,0,0);
					numCCs = cNG(10,99,4,0);
					numDDs = cNG(1000,9999,0,0);
					currentProblem = "(" + numAAs + "^2 + " + numBBs + ") + " + numCCs + " - " + numDDs;
					correctAnswer = parseFloat(math.evaluate(currentProblem));
					break;
				case 6:
					numAAs = cNG(10,1000,cNG(0,3,0,0),0);
					numBBs = cNG(100000,99999999,0,0);
					currentProblem = "" + numAAs + " + \\sqrt[4]{" + numBBs + "}";
					correctAnswer = parseFloat(math.evaluate("" + numAAs + " + ((" + numBBs + ")^(1/4))"));
					break;
				case 7:
					numAAs = cNG(1000,5000,0,0);
					numBBs = cNG(100,1500,0,0);
					currentProblem = "" + numAAs + "^{" + numBBs + "}";
					var tenPart = parseFloat(math.evaluate("log(" + numAAs + ",10)*" + numBBs));
					var tempBoi = tenPart - Math.floor(tenPart);
					var threePart = parseFloat(math.evaluate("10^(" + tempBoi + ")"));
					threePart = threePart.toFixed(2);
					correctAnswer = ("" + threePart) + "e+" + ("" + Math.floor(tenPart));
					break;
			}

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

			break;
		case 14:
			// elem pg. 4
			var selectPage = Math.floor(Math.random()*8);
			switch(selectPage)
			{
				case 0:
					numAAs = cNG(10,1000,2,0);
					numBBs = cNG(1000,99999,0,0);
					numCCs = cNG(10,999,2,0);
					numDDs = cNG(3,5,0,0);
					currentProblem = "(" + numAAs + " + \\frac{\\sqrt{" + numBBs + "}}{" + numCCs + "})^" + numDDs;
					correctAnswer = parseFloat(math.evaluate("(" + numAAs + "+ (" + numBBs + ")^(1/2)/" + numCCs + ")^(" + numDDs + ")"));
					break;
				 case 1:
				 	numAAs = cNG(500,999,2,0);
				 	numBBs = cNG(100000,9999999,0,0);
				 	numCCs = cNG(100,1000,cNG(1,2,0,0),0);
				 	currentProblem = "" + numAAs + " - \\sqrt[3]{" + numBBs + "} + \\sqrt{" + numCCs + "}";
				 	correctAnswer = parseFloat(math.evaluate("" + numAAs + " - (" + numBBs + ")^(1/3) + (" + numCCs + ")^(1/2)"));
				 	break;
			 	case 2:
			 		numAAs = cNG(1000,9999,0,0);
			 		numBBs = cNG(100,999,2,0);
			 		numCCs = cNG(0,1,5,0);
			 		numDDs = cNG(1,10,2,0);
			 		numEEs = cNG(4,7,0,0);
			 		currentProblem = "(" + numAAs + " - " + numBBs + ") + " + numCCs + "^3 + " + numDDs + "^" + numEEs;
			 		correctAnswer = parseFloat(math.evaluate(currentProblem));
			 		break;
		 		case 3:
		 			numAAs = cNG(1000,9999,cNG(0,1,0,0),0);
		 			numBBs = cNG(1,10,3,0);
		 			numCCs = cNG(3,5,0,0)
		 			numDDs = cNG(100000,9999999,0,0);
		 			currentProblem = "" + numAAs + " + " + numBBs + "^2 + \\sqrt[" + numCCs + "]{" + numDDs + "}";
		 			correctAnswer = parseFloat(math.evaluate("" + numAAs + " + (" + numBBs + ")^2 + ((" + numDDs + ")^(1/" + numCCs + "))"));
		 			break;
	 			case 4:
	 				numAAs = cNG(10,999,cNG(4,6,0,0),0);
	 				numBBs = cNG(0,99,cNG(4,6,0,0),0);
	 				currentProblem = "" + numAAs + " - " + numBBs;
	 				correctAnswer = parseFloat(math.evaluate(currentProblem));
	 				break;
 				case 5:
 					numAAs = cNG(100,999,0,0);
 					numBBs = cNG(100,999,0,0);
 					numCCs = cNG(100,999,0,0);
 					numDDs = cNG(10,99,2,0);
 					currentProblem = "" + numAAs + "^3 - " + numBBs + " - " + numCCs + " - " + numDDs + "^2";
 					correctAnswer = parseFloat(math.evaluate(currentProblem));
 					break;
				case 6:
					numAAs = cNG(1000,99999,0,0);
					numBBs = cNG(1,10,2,0);
					numCCs = cNG(10,100,2,0);
					numDDs = cNG(1,100,2,0);
					currentProblem = "" + numAAs + " / " + numBBs + " / " + numCCs + " + " + numDDs;
					correctAnswer = parseFloat(math.evaluate(currentProblem));
					break;
				case 7:
					numAAs = cNG(100,999,0,0);
					numBBs = cNG(1000,9999,0,0);
					numCCs = cNG(100,999,0,0);
					numDDs = cNG(100,9999,1,0);
					currentProblem = "\\frac{\\sqrt{" + numAAs + " + " + numBBs + "}}{" + numCCs + "/" + numDDs + "}";
					correctAnswer = parseFloat(math.evaluate("((" + numAAs + " + " + numBBs + ")^(1/2))/(" + numCCs + "/" + numDDs + ")"));
					break;
			}

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

			break;
		case 15:
			// elem pg. 5
			var selectPage = Math.floor(Math.random()*8);
			switch(selectPage)
			{
				case 0:
					numAAs = cNG(100,1000,0,0);
					numBBs = cNG(100,1000,1,0);
					numEEs = cNG(4,6,0,0);
					numCCs = cNG(1,100,2,0);
					numDDs = cNG(90,100,3,0);
					currentProblem = "(\\sqrt{" + numAAs + " + " + numBBs + "})^" + numEEs + " + " + numCCs + "^2 + " + numDDs + "^2";
					correctAnswer = parseFloat(math.evaluate("((" + numAAs + " + " + numBBs + ")^(1/2))^" + numEEs + " + " + numCCs + "^2 + " + numDDs + "^2"));
					break;
				case 1:
					numAAs = cNG(5,14,0,0);
					numBBs = cNG(5,14,0,0);
					numCCs = cNG(100,999,0,0);
					numDDs = cNG(5,14,0,0);
					numEEs = cNG(100,999,2,0);
					currentProblem = "(" + numAAs + "! + " + numBBs + "!) + " + numCCs + "^2 + " + numDDs + "!(" + numEEs + ")";
					correctAnswer = parseFloat(math.evaluate(currentProblem));
					break;
				case 2:
					numAAs = cNG(10,99,2,0);
					numBBs = cNG(100,999,cNG(0,1,0,0),0);
					numCCs = cNG(100,999,2,0);
					currentProblem = "" + numAAs + "^2(" + numBBs + " + " + numCCs + ")^3";
					correctAnswer = parseFloat(math.evaluate(currentProblem));
					break;
				case 3:
					numAAs = cNG(100,999,cNG(0,1,0,0),0);
					numBBs = cNG(100,999,0,0);
					numCCs = cNG(1000,9999,0,0);
					numDDs = cNG(3,6,0,0);
					numEEs = cNG(10,99,0,0);
					currentProblem = "" + numAAs + " + (" + numBBs + " + \\sqrt{" + numCCs + "})^" + numDDs + " + " + numEEs + "pi^e";
					correctAnswer = parseFloat(math.evaluate("" + numAAs + " + (" + numBBs + " + (" + numCCs + ")^(1/2))^(" + numDDs + ") + " + numEEs + "pi^e"));
					break;
				case 4:
					numAAs = cNG(10,100,cNG(0,2,0,0),0);
					numBBs = cNG(3,5,0,0);
					numCCs = cNG(1000,9999,0,0);
					numDDs = cNG(10,100,3,0);
					numEEs = cNG(10,100,3,0);
					currentProblem = "" + numAAs + "^" + numBBs + " - " + numCCs + " + " + numDDs + "^2 + " + numEEs;
					correctAnswer = parseFloat(math.evaluate(currentProblem));
					break;
				case 5:
					numAAs = cNG(1000,9999,0,0);
					numBBs = cNG(10000,99999,0,0);
					numCCs = cNG(100,999,0,0);
					numDDs = cNG(1,10,3,0);
					numEEs = cNG(10,200,3,0);
					currentProblem = "" + numAAs + " - \\sqrt{" + numBBs + "} - \\frac{\\sqrt{" + numCCs + "}}{" + numDDs + "} + " + numEEs;
					correctAnswer = parseFloat(math.evaluate("" + numAAs + " - (" + numBBs + ")^(1/2) - ((" + numCCs + ")^(1/2))/(" + numDDs + ") + " + numEEs));
					break;
				case 6:
					numAAs = cNG(100,999,1,0);
					numBBs = cNG(10,99,0,0);
					numCCs = cNG(100,9999,3,0);
					currentProblem = "" + numAAs + "+ \\sqrt{" + numBBs + "pi} + " + numCCs;
					correctAnswer = parseFloat(math.evaluate("" + numAAs + "+ (" + numBBs + "pi)^(1/2) + " + numCCs));
					break;
				case 7:
					var sinCosOrTan = Math.floor(Math.random()*3);
					var degOrRad = Math.floor(Math.random()*2);
					var operationAA = Math.floor(Math.random()*4);
					var tempBoi = ["sin","cos","tan"];
					var tempBoi2 = ["deg", "rad"];
					var tempBoi3 = [["^{\\circ}", ""], ["^{\\circ}", "pi"], ["", "pi"]];

					numAAs = cNG(1,100,0,0);
					numBBs = cNG(1,20,1,0);

					currentProblem = "\\text{(" + tempBoi2[degOrRad] + ") }" + "\\" + tempBoi[sinCosOrTan] + "{(" + numAAs + tempBoi3[1][degOrRad] + operStrs[operationAA] + numBBs + tempBoi3[0][degOrRad] + ")}";
					correctAnswer = parseFloat(math.evaluate("" + tempBoi[sinCosOrTan] + "(((" + numAAs + ")" + tempBoi3[2][degOrRad] + operStrs[operationAA] + numBBs + ") " + tempBoi2[degOrRad] + ")"));
					/*
					// arithmetic with sin, cos, tan
					var operationAA = Math.floor(Math.random()*4);
					var operationBB = Math.floor(Math.random()*4);
					var operationCC = Math.floor(Math.random()*4);
					var expPlace = Math.floor(Math.random()*2);
					var sinCosOrTan = Math.floor(Math.random()*3);
					var degOrRad = Math.floor(Math.random()*2);
					var tempBoi = ["sin","cos","tan"];
					var tempBoi2 = ["deg", "rad"];
					var tempBoi3 = ["^{\\circ}", ""];

					numAAs = cNG(1,100,cNG(0,2,0,0),0);
					numBBs = cNG(1,100,cNG(0,2,0,0),0);
					numCCs = cNG(1,1000,cNG(0,4,0,0),6);

					// currentProblem written in LaTeX
					switch(expPlace)
					{
						case 0:
							currentProblem = "\\text{(" + tempBoi2[degOrRad] + ") }" + "\\" + tempBoi[sinCosOrTan] + "{(" + numAAs + tempBoi3[degOrRad] + operStrs[operationAA] + numBBs + tempBoi3[degOrRad] + ")}" + operStrs[operationBB] + numCCs;
							correctAnswer = parseFloat(math.evaluate("" + tempBoi[sinCosOrTan] + "((" + numAAs + operStrs[operationAA] + numBBs + ") " + tempBoi2[degOrRad] + ")" + operStrs[operationBB] + numCCs));
							break;
						case 1:
							currentProblem = "\\text{(" + tempBoi2[degOrRad] + ") }" + numCCs + operStrs[operationBB] + "\\" + tempBoi[sinCosOrTan] + "{(" + numAAs + tempBoi3[degOrRad] + operStrs[operationAA] + numBBs + tempBoi3[degOrRad] + ")}";
							correctAnswer = parseFloat(math.evaluate("" + numCCs + operStrs[operationBB] + tempBoi[sinCosOrTan] + "((" + numAAs + operStrs[operationAA] + numBBs + ") " + tempBoi2[degOrRad] + ")"));
							break;
					}
					*/ 

					break;
			}

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

			break;
		case 16:
			// elem pg. 6
			var selectPage = Math.floor(Math.random()*8);
			switch(selectPage)
			{
				case 0:
					numAAs = cNG(3,9,0,0);
					numBBs = cNG(3,9,0,0);
					numCCs = cNG(3,9,0,0);
					numDDs = cNG(3,9,0,0);
					numEEs = cNG(1,30,0,0);
					currentProblem = "" + numAAs + "! + " + numBBs + "! + " + numCCs + " + " + numDDs + "! + " + numEEs;
					correctAnswer = parseFloat(math.evaluate(currentProblem));
					break;
				case 1:
					var sinCosOrTan = Math.floor(Math.random()*3);
					var degOrRad = Math.floor(Math.random()*2);
					var operationAA = Math.floor(Math.random()*2);
					var tempBoi = ["sin","cos","tan"];
					var tempBoi2 = ["deg", "rad"];
					var tempBoi3 = [["^{\\circ}", ""], ["^{\\circ}", "pi"], ["", "pi"]];

					numAAs = cNG(1,100,2,0);
					numBBs = cNG(1,20,1,0);

					currentProblem = "\\text{(" + tempBoi2[degOrRad] + ") }" + "\\" + tempBoi[sinCosOrTan] + "{(" + numAAs + tempBoi3[0][degOrRad] + ")}" + operStrs[operationAA] + numBBs;
					correctAnswer = parseFloat(math.evaluate("" + tempBoi[sinCosOrTan] + "(((" + numAAs + ")" + ") " + tempBoi2[degOrRad] + ")" + operStrs[operationAA] + numBBs));
					break;
				case 2:
					numAAs = cNG(50,99,0,0);
					numDDs = cNG(2,5,0,0);
					numBBs = cNG(100,999,0,0);					
					numCCs = cNG(10,99,0,0);

					currentProblem = "" + numAAs + "pi^" + numDDs + " + " + numBBs + " + " + numCCs + "e";
					correctAnswer = parseFloat(math.evaluate(currentProblem));
					break;
				case 3:
					var sinCosOrTan = Math.floor(Math.random()*3);
					var sinCosOrTan2 = Math.floor(Math.random()*3);
					var degOrRad = Math.floor(Math.random()*2);
					var operationAA = Math.floor(Math.random()*2);
					var operationBB = Math.floor(Math.random()*2);
					var tempBoi = ["sin","cos","tan"];
					var tempBoi2 = ["deg", "rad"];
					var tempBoi3 = [["^{\\circ}", ""], ["^{\\circ}", "pi"], ["", "pi"]];

					numAAs = cNG(10,50,1,0);
					numBBs = cNG(3,10,0,0);
					numCCs = cNG(1,10,0,0);
					numDDs = cNG(0,1,5,0);

					currentProblem = "\\text{(" + tempBoi2[degOrRad] + ") }" + "\\" + tempBoi[sinCosOrTan] + "{(" + numAAs + tempBoi3[0][degOrRad] + ")}" + operStrs[operationAA] + numBBs + "\\" + tempBoi[sinCosOrTan2] + "{(" + numCCs + tempBoi3[1][degOrRad] + ")}" + operStrs[operationBB] + numDDs;
					correctAnswer = parseFloat(math.evaluate("" + tempBoi[sinCosOrTan] + "(((" + numAAs + ")) " + tempBoi2[degOrRad] + ")" + operStrs[operationAA] + "(" + numBBs + "*(" + tempBoi[sinCosOrTan2] + "(((" + numCCs + tempBoi3[2][degOrRad] + ")" + ") " + tempBoi2[degOrRad] + ")))" + operStrs[operationBB] + numDDs));
					// console.log(("" + tempBoi[sinCosOrTan] + "(((" + numAAs + ")) " + tempBoi2[degOrRad] + ")" + operStrs[operationAA] + "(" + numBBs + "*(" + tempBoi[sinCosOrTan2] + "(((" + numCCs + tempBoi3[2][degOrRad] + ")" + ") " + tempBoi2[degOrRad] + ")))" + operStrs[operationBB] + numDDs));
					break;
				case 4:
					numAAs = cNG(10,99,0,0);
					numBBs = cNG(10,99,0,0);
					numCCs = cNG(2000,2050,0,0);
					numDDs = cNG(0,1,4,0);

					currentProblem = "" + numAAs + "pi^3 + " + numBBs + "e + " + numCCs + "(" + numDDs + ")";
					correctAnswer = parseFloat(math.evaluate(currentProblem));
					break;
				case 5:
					var sinCosOrTan = Math.floor(Math.random()*3);
					var degOrRad = Math.floor(Math.random()*2);
					var tempBoi = ["sin","cos","tan"];
					var tempBoi2 = ["deg", "rad"];
					var tempBoi3 = [["^{\\circ}", ""], ["^{\\circ}", "pi"], ["", "pi"]];

					numAAs = cNG(1,360,2,0);

					currentProblem = "\\text{(" + tempBoi2[degOrRad] + ") }" + "\\" + tempBoi[sinCosOrTan] + "{(" + numAAs + tempBoi3[0][degOrRad] + ")}";
					correctAnswer = parseFloat(math.evaluate("" + tempBoi[sinCosOrTan] + "(((" + numAAs + ")" + ") " + tempBoi2[degOrRad] + ")"));
					break;
				case 6:
					numAAs = cNG(1,15,cNG(2,4,0,0),0);
					numBBs = 3.1415926.toFixed(cNG(2,7,0,0));
					numCCs = 2.7182818.toFixed(cNG(2,7,0,0));
					currentProblem = "(" + numBBs + " + " + numCCs + ")^{" + numAAs + "}";
					correctAnswer = parseFloat(math.evaluate("(" + numBBs + " + " + numCCs + ")^(" + numAAs + ")"));
					break;
				case 7:
					var sinCosOrTan = Math.floor(Math.random()*3);
					var degOrRad = Math.floor(Math.random()*2);
					var operationAA = Math.floor(Math.random()*4);
					var tempBoi = ["sin","cos","tan"];
					var tempBoi2 = ["deg", "rad"];
					var tempBoi3 = [["^{\\circ}", ""], ["^{\\circ}", "pi"], ["", "pi"]];

					numAAs = cNG(1,100,0,0);
					numBBs = cNG(1,20,1,0);

					currentProblem = "\\text{(" + tempBoi2[degOrRad] + ") }" + "\\" + tempBoi[sinCosOrTan] + "{(" + numAAs + tempBoi3[1][degOrRad] + operStrs[operationAA] + numBBs + tempBoi3[0][degOrRad] + ")}";
					correctAnswer = parseFloat(math.evaluate("" + tempBoi[sinCosOrTan] + "(((" + numAAs + ")" + tempBoi3[2][degOrRad] + operStrs[operationAA] + numBBs + ") " + tempBoi2[degOrRad] + ")"));
					break;
			}

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

			break;
		case 17:
			// elem pg. 7
			var selectPage = 5; // Math.floor(Math.random()*9);
			switch(selectPage)
			{
				case 0:
					var power = Math.floor(Math.random()*3) + 1;
					switch(power)
					{
						case 1:
							numAAs = cNG(1,9999,cNG(0,2,0,0),0);
							currentProblem = "\\ln{(" + numAAs + ")}";
							correctAnswer = parseFloat(math.evaluate("log(" + numAAs + ", e)"));
							break;
						default:
							numAAs = cNG(1,9999,cNG(0,2,0,0),0);
							currentProblem = "\\ln{(" + numAAs + "^" + power + ")}";
							correctAnswer = parseFloat(math.evaluate("log(" + numAAs + "^" + power + ", e)"));
							break;
					}
					break;
				case 1:
					var power = Math.floor(Math.random()*2) + 1;
					switch(power)
					{
						case 1:
							numAAs = cNG(1,99999,cNG(0,2,0,0),0);
							currentProblem = "\\log{(" + numAAs + ")}";
							correctAnswer = parseFloat(math.evaluate("log(" + numAAs + ", 10)"));
							break;
						default:
							numAAs = cNG(1,99999,cNG(0,2,0,0),0);
							currentProblem = "\\log{(\\sqrt{" + numAAs + "})}";
							correctAnswer = parseFloat(math.evaluate("log((" + numAAs + ")^(1/" + power + "), 10)"));
							break;
					}
					break;
				case 2:
					numAAs = cNG(10,99,0,0);
					numBBs = cNG(1,7,cNG(1,2,0,0),0);
					numCCs = cNG(10,99,0,0);
					numDDs = cNG(1,7,cNG(1,2,0,0),0);
					currentProblem = "" + numAAs + "^{" + numBBs + "} + " + numCCs + "^{" + numDDs + "}";
					correctAnswer = parseFloat(math.evaluate("" + numAAs + "^(" + numBBs + ") + " + numCCs + "^(" + numDDs + ")"));
					break;
				case 3:
					numBBs = cNG(2,5,0,0);
					numCCs = cNG(10,40,0,0);
					var power = Math.floor(Math.random()*2) + 1;
					switch(power)
					{
						case 1:
							numAAs = cNG(501,999,0,0);
							currentProblem = "\\log{(10^{" + numAAs + "})} + \\log{(" + numBBs + "^{" + numCCs + "})}";
							correctAnswer = parseFloat(math.evaluate("" + numAAs + " + log((" + numBBs + ")^(" + numCCs + "), 10)"));
							break;
						default:
							numAAs = cNG(1150,1500,0,0);
							currentProblem = "\\ln{(e^{" + numAAs + "})} + \\ln{(" + numBBs + "^{" + numCCs + "})}";
							correctAnswer = parseFloat(math.evaluate("" + numAAs + " + log((" + numBBs + ")^(" + numCCs + "), e)"));
							break;
					}
					break;
				case 4:
					numAAs = cNG(2000,2050,0,0);
					numBBs = cNG(2000,2050,0,0);
					numCCs = cNG(10,50,0,0);
					currentProblem = "" + numAAs + " + " + numBBs + "(e^{" + numCCs + "})";
					correctAnswer = parseFloat(math.evaluate("" + numAAs + " + " + numBBs + "(e^(" + numCCs + "))"));
					break;
				case 5:
					var power = 2; // Math.floor(Math.random()*3);
					var hardVersion = Math.floor(Math.random()*4);
					var parsedBoiAA;
					var parsedBoiBB;

					switch(power)
					{
						case 0:
							if(hardVersion == 0)
							{
								do {
									numAAs = cNG(1,500,0,0);
									numBBs = cNG(parseInt(numAAs) + 50, parseInt(numAAs) + 1000, 0, 0);
								} while(parseInt(numAAs) % 2 == 0 || parseInt(numBBs) % 2 == 0);

								parsedBoiAA = parseInt(numAAs);
								parsedBoiBB = parseInt(numBBs);

								currentProblem = "" + parsedBoiAA + " + " + (parsedBoiAA + 2) + " + " + (parsedBoiAA + 4) + " + \\text{ ... } + " + (parsedBoiBB - 4) + " + " + (parsedBoiBB - 2) + " + " + parsedBoiBB;
								var tempBoi = 0;
								for(var tempBoi2 = parsedBoiAA; tempBoi2 <= parsedBoiBB; tempBoi2+=2)
								{
									tempBoi += tempBoi2;
								}
								correctAnswer = tempBoi;
								break;
							}
							else
							{
								do {
									numAAs = "1";
									numBBs = cNG(parseInt(numAAs) + 50, parseInt(numAAs) + 1000, 0, 0);
								} while(parseInt(numAAs) % 2 == 0 || parseInt(numBBs) % 2 == 0);

								parsedBoiAA = parseInt(numAAs);
								parsedBoiBB = parseInt(numBBs);

								currentProblem = "" + parsedBoiAA + " + " + (parsedBoiAA + 2) + " + " + (parsedBoiAA + 4) + " + \\text{ ... } + " + (parsedBoiBB - 4) + " + " + (parsedBoiBB - 2) + " + " + parsedBoiBB;
								var tempBoi = 0;
								for(var tempBoi2 = parsedBoiAA; tempBoi2 <= parsedBoiBB; tempBoi2+=2)
								{
									tempBoi += tempBoi2;
								}
								correctAnswer = tempBoi;
								break;
							}
						case 1:
							if(hardVersion == 0)
							{
								do {
									numAAs = cNG(1,500,0,0);
									numBBs = cNG(parseInt(numAAs) + 50, parseInt(numAAs) + 1000, 0, 0);
								} while(parseInt(numAAs) % 2 != 0 || parseInt(numBBs) % 2 != 0);

								parsedBoiAA = parseInt(numAAs);
								parsedBoiBB = parseInt(numBBs);

								currentProblem = "" + parsedBoiAA + " + " + (parsedBoiAA + 2) + " + " + (parsedBoiAA + 4) + " + \\text{ ... } + " + (parsedBoiBB - 4) + " + " + (parsedBoiBB - 2) + " + " + parsedBoiBB;
								var tempBoi = 0;
								for(var tempBoi2 = parsedBoiAA; tempBoi2 <= parsedBoiBB; tempBoi2+=2)
								{
									tempBoi += tempBoi2;
								}
								correctAnswer = tempBoi;
								break;
							}
							else
							{
								do {
									numAAs = "2";
									numBBs = cNG(parseInt(numAAs) + 50, parseInt(numAAs) + 1000, 0, 0);
								} while(parseInt(numAAs) % 2 != 0 || parseInt(numBBs) % 2 != 0);

								parsedBoiAA = parseInt(numAAs);
								parsedBoiBB = parseInt(numBBs);

								currentProblem = "" + parsedBoiAA + " + " + (parsedBoiAA + 2) + " + " + (parsedBoiAA + 4) + " + \\text{ ... } + " + (parsedBoiBB - 4) + " + " + (parsedBoiBB - 2) + " + " + parsedBoiBB;
								var tempBoi = 0;
								for(var tempBoi2 = parsedBoiAA; tempBoi2 <= parsedBoiBB; tempBoi2++)
								{
									tempBoi += tempBoi2;
								}
								correctAnswer = tempBoi;
								break;
							}
						case 2:
							if(hardVersion == 0)
							{
								numAAs = cNG(1,500,0,0);
								numBBs = cNG(parseInt(numAAs) + 50, parseInt(numAAs) + 1000, 0, 0);
								
								parsedBoiAA = parseInt(numAAs);
								parsedBoiBB = parseInt(numBBs);

								currentProblem = "" + parsedBoiAA + " + " + (parsedBoiAA + 1) + " + " + (parsedBoiAA + 2) + " + \\text{ ... } + " + (parsedBoiBB - 2) + " + " + (parsedBoiBB - 1) + " + " + parsedBoiBB;
								var tempBoi = 0;
								for(var tempBoi2 = parsedBoiAA; tempBoi2 <= parsedBoiBB; tempBoi2++)
								{
									tempBoi += tempBoi2;
								}
								correctAnswer = tempBoi;
								break;
							}
							else
							{
								numAAs = "1";
								numBBs = cNG(parseInt(numAAs) + 50, parseInt(numAAs) + 1000, 0, 0);								

								parsedBoiAA = parseInt(numAAs);
								parsedBoiBB = parseInt(numBBs);

								currentProblem = "" + parsedBoiAA + " + " + (parsedBoiAA + 1) + " + " + (parsedBoiAA + 2) + " + \\text{ ... } + " + (parsedBoiBB - 2) + " + " + (parsedBoiBB - 1) + " + " + parsedBoiBB;
								var tempBoi = 0;
								for(var tempBoi2 = parsedBoiAA; tempBoi2 <= parsedBoiBB; tempBoi2++)
								{
									tempBoi += tempBoi2;
								}
								correctAnswer = tempBoi;
								break;
							}
					}

					

					break;
			}

			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
			currentProblem = "<span><script type='math/tex'>" + forLatex(currentProblem, 0) + "</script>";
			MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

			break;
	    case 18:
	    	// hs pg. 1
	    	switch(perPageProblemType) {
	    		case 0:
	    			numAAs = cNG(1,10,2,1);
	    			numBBs = cNG(0,1,3,3);
	    			numCCs = cNG(1,10,2,1);

	    			console.log(numAAs);
	    			console.log(numBBs);
	    			console.log(numCCs);

	    			currentProblem = "(" + numAAs + numBBs + ") / (" + numCCs + ")";
	    			
	    			numBBs = reSpace(numBBs);

	    			numAA = parseFloat(numAAs);
	    			numBB = parseFloat(numBBs);
	    			numCC = parseFloat(numCCs);

	    			correctAnswer = (numAA + numBB)/numCC;
	    			
	    			break;
				case 1:
					numAAs = cNG(1,10,2,1);
					numBBs = cNG(1,10,2,3);
					numCCs = cNG(1,10,2,1);
					numDDs = cNG(0,1,3,3);
					currentProblem = "(" + numAAs + numBBs + ") / (" + numCCs + ")" + numDDs;

					numBBs = reSpace(numBBs);
					numDDs = reSpace(numDDs);

					numAA = parseFloat(numAAs);
	    			numBB = parseFloat(numBBs);
	    			numCC = parseFloat(numCCs);
	    			numDD = parseFloat(numDDs);

					correctAnswer = ((numAA + numBB)/numCC) + numDD;
					
					break;
				case 2: 
					numAAs = cNG(1,10,2,1);
					numBBs = cNG(0,1,2,3);
					signCC = cSG(3);
					numDDs = cNG(0,1,4,3);
					numEEs = cNG(1,10,2,1);

					currentProblem = "(" + numAAs + numBBs + signCC + "&pi;" + numDDs + ") x (" + numEEs + ")";

					numBBs = reSpace(numBBs);
					numDDs = reSpace(numDDs);

					numAA = parseFloat(numAAs);
	    			numBB = parseFloat(numBBs);
	    			numDD = parseFloat(numDDs);
	    			numEE = parseFloat(numEEs);

	    			if(signCC == " + ")
	    			{
	    				correctAnswer = (numAA + numBB + Math.PI + numDD)*(numEE);
	    			}
	    			else if(signCC == " - ")
	    			{
	    				correctAnswer = (numAA + numBB - Math.PI + numDD)*(numEE);
	    			}

	    			
	    			break;
				case 3:
					numAAs = cNG(10,100,1,1);
					numBBs = cNG(100,1000,0,1);
					numCCs = cNG(100,1000,0,3);
					numDDs = cNG(100,1000,0,3);
					numEEs = cNG(100,1000,0,1);
					numFFs = cNG(100,1000,0,1);

					currentProblem = "<div class='frac'><span>(" + numAAs + ")(" + numBBs + numCCs + numDDs + ")</span><span class='symbol'>/</span><span class='bottom'>(" + numEEs + ")(" + numFFs + ")</span></div>";

					numCCs = reSpace(numCCs);
					numDDs = reSpace(numDDs);

					numAA = parseFloat(numAAs);
	    			numBB = parseFloat(numBBs);
	    			numCC = parseFloat(numCCs);
	    			numDD = parseFloat(numDDs);
	    			numEE = parseFloat(numEEs);
	    			numFF = parseFloat(numFFs);

	    			correctAnswer = ((numAA)*(numBB + numCC + numDD))/(numEE*numFF);
	    			
	    			break;
				case 4:
					numAAs = cNG(0,1,5,1);
					numBBs = cNG(0,1,4,3);
					numCCs = cNG(0,1,3,1);
					numDDs = cNG(0,1,3,1);
					numEEs = cNG(0,1,2,1);
					signFF = cSG(3);
					numFFs = cNG(0,1,5,1);
					numGGs = cNG(0.0001,0.000999,6,0);
					signGG = cSG(3);

					numGG = parseFloat(numGGs);

					currentProblem = "<div class='frac'><span>(" + numAAs + numBBs + ")(" + numCCs + ")</span><span class='symbol'>/</span><span class='bottom'>" + "{(" + numDDs + ") / (" + numEEs + ")}" + "</span></div>" + signFF + "(" + numFFs + signGG + (numGG.toExponential()).replace("e","x10<sup>") + "</sup>)";

					numBBs = reSpace(numBBs);

					numAA = parseFloat(numAAs);
	    			numBB = parseFloat(numBBs);
	    			numCC = parseFloat(numCCs);
	    			numDD = parseFloat(numDDs);
	    			numEE = parseFloat(numEEs);
	    			numFF = parseFloat(numFFs);
	    			numGG = parseFloat(numGGs);

	    			if(signFF == " + ")
					{
						if(signGG == " + ")
						{
							correctAnswer = (((numAA + numBB)*(numCC))/((numDD)/(numEE))) + (numFF + numGG);						
						}
						else if(signGG == " - ")
						{
							correctAnswer = (((numAA + numBB)*(numCC))/((numDD)/(numEE))) + (numFF - numGG);
						}
					}
					else if(signFF == " - ")
					{
						if(signGG == " + ")
						{
							correctAnswer = (((numAA + numBB)*(numCC))/((numDD)/(numEE))) - (numFF + numGG);						
						}
						else if(signGG == " - ")
						{
							correctAnswer = (((numAA + numBB)*(numCC))/((numDD)/(numEE))) - (numFF - numGG);
						}
					}
					
					break;
	    	}
			break;
		case 19:
			// hs pg. 2
	    	switch(perPageProblemType)
	    	{
	    		case 0:
	    			numAAs = cNG(1000,9999,0,1);
	    			numBBs = cNG(1000,9999,0,3);
	    			numCCs = cNG(0,1,3,1);
	    			numDDs = cNG(0,1,3,3);
	    			signEE = cSG(3);
	    			numEEs = cNG(10000,99999,0,1);
	    			numFFs = cNG(10000,99999,0,3);
	    			numGGs = cNG(1,10,2,1);
	    			signHH = cSG(3);

	    			currentProblem = "<div class='frac'><span>(" + numAAs + numBBs + ")</span><span class='symbol'>/</span><span class='bottom'>(" + numCCs + numDDs + ")</span></div>" + signEE + "<div class='frac'><span>(" + numEEs + numFFs + ")</span><span class='symbol'>/</span><span class='bottom'>(" + numGGs + signHH + "&pi;)</span></div>";

	    			numBBs = reSpace(numBBs);
	    			numDDs = reSpace(numDDs);
	    			numFFs = reSpace(numFFs);

	    			numAA = parseFloat(numAAs);
	    			numBB = parseFloat(numBBs);
	    			numCC = parseFloat(numCCs);
	    			numDD = parseFloat(numDDs);
	    			numEE = parseFloat(numEEs);
	    			numFF = parseFloat(numFFs);
	    			numGG = parseFloat(numGGs);

	    			if(signEE == " + ")
					{
						if(signHH == " + ")
						{
							correctAnswer = ((numAA + numBB)/(numCC + numDD)) + ((numEE + numFF)/(numGG + Math.PI));
						}
						else if(signHH == " - ")
						{
							correctAnswer = ((numAA + numBB)/(numCC + numDD)) + ((numEE + numFF)/(numGG - Math.PI));
						}
					}
					else if(signEE == " - ")
					{
						if(signHH == " + ")
						{
							correctAnswer = ((numAA + numBB)/(numCC + numDD)) - ((numEE + numFF)/(numGG + Math.PI));						
						}
						else if(signHH == " - ")
						{
							correctAnswer = ((numAA + numBB)/(numCC + numDD)) - ((numEE + numFF)/(numGG - Math.PI));
						}
					}
					
					break;
				case 1:
					numAAs = cNG(0.00001,0.01,5,1);
					numBBs = cNG(0.0001,0.1,4,1);
					signCC = cSG(3);
					numCCs = cNG(0.0001,0.1,4,1);
					numDDs = cNG(0.00001,0.01,5,3);
					numEEs = cNG(0.0001,0.1,4,1);
					numFFs = cNG(0.00001,0.01,5,1);
					numGGs = cNG(0.0001,0.1,4,3);
					numHHs = cNG(0.00001,0.01,5,3);
					numIIs = cNG(0.0001,0.1,4,1);

					currentProblem = "<div class='frac'><span>(" + numAAs + ")(" + numBBs + ")" + signCC + "(" + numCCs + numDDs + ")(" + numEEs + ")</span><span class='symbol'>/</span><span class='bottom'>(" + numFFs + numGGs + numHHs + ")(" + numIIs + ")</span></div>";

					numDDs = reSpace(numDDs);
					numGGs = reSpace(numGGs);
					numHHs = reSpace(numHHs);

					numAA = parseFloat(numAAs);
	    			numBB = parseFloat(numBBs);
	    			numCC = parseFloat(numCCs);
	    			numDD = parseFloat(numDDs);
	    			numEE = parseFloat(numEEs);
	    			numFF = parseFloat(numFFs);
	    			numGG = parseFloat(numGGs);
	    			numHH = parseFloat(numHHs);
	    			numII = parseFloat(numIIs);

	    			if(signCC == " + ")
	    			{
	    				correctAnswer = ((numAA*numBB)+((numCC+numDD)*numEE))/((numFF+numGG+numHH)*numII);
	    			}
	    			else if(signCC == " - ")
	    			{
	    				correctAnswer = ((numAA*numBB)-((numCC+numDD)*numEE))/((numFF+numGG+numHH)*numII);
	    			}
	    			
					break;
				case 2:
					numAAs = cNG(10,100,1,1);
					numBBs = cNG(100,1000,0,1);
					numCCs = cNG(10,1000,0,3);
					numDDs = cNG(1000,10000,0,1);
					signEE = cSG(3);
					numEEs = cNG(10,100,0,1);
					numFFs = cNG(10,100,1,1);
					numGGs = cNG(10,100,1,1);
					numHHs = cNG(10,100,1,3);
					numIIs = cNG(10,100,1,1);
					numJJs = cNG(100,1000,0,3);

					currentProblem = "<div class='frac'><span>(" + numAAs + ")(" + numBBs + numCCs + "){" + numDDs + signEE + "(" + numEEs + ")(" + numFFs  + ")}</span><span class='symbol'>/</span><span class='bottom'>(" + numGGs + numHHs + ")(" + numIIs + numJJs + ")</span></div>";

					numCCs = reSpace(numCCs);
					numHHs = reSpace(numHHs);
					numJJs = reSpace(numJJs);

					numAA = parseFloat(numAAs);
	    			numBB = parseFloat(numBBs);
	    			numCC = parseFloat(numCCs);
	    			numDD = parseFloat(numDDs);
	    			numEE = parseFloat(numEEs);
	    			numFF = parseFloat(numFFs);
	    			numGG = parseFloat(numGGs);
	    			numHH = parseFloat(numHHs);
	    			numII = parseFloat(numIIs);
	    			numJJ = parseFloat(numJJs);

	    			if(signEE == " + ")
	    			{
	    				correctAnswer = ((numAA)*(numBB+numCC)*((numDD)+(numEE*numFF)))/((numGG+numHH)*(numII+numJJ));
	    			}
	    			else if(signEE == " - ")
	    			{
	    				correctAnswer = ((numAA)*(numBB+numCC)*((numDD)-(numEE*numFF)))/((numGG+numHH)*(numII+numJJ));
	    			}
	    			
					break;
				case 3:
					numAAs = cNG(1000,10000,0,1);
					numBBs = cNG(1000,10000,0,3);
					numCCs = cNG(100,1000,0,3);
					numDDs = cNG(0.00001,0.01,5,1);
					numEEs = cNG(0.0001,0.1,4,3);
					numFFs = cNG(0.0001,0.1,4,3);
					numGGs = cNG(0.001,1,3,1);
					numHHs = cNG(0.001,1,3,3);
					numIIs = cNG(0.001,1,3,1);
					numJJs = cNG(0.001,1,3,1);
					numKKs = cNG(0.001,1,3,3);

					currentProblem = "<div class='frac'><span>(" + numAAs + numBBs + numCCs + ")(" + numDDs + numEEs + numFFs + ")</span><span class='symbol'>/</span><span class='bottom'>(" + numGGs + numHHs + ")(" + numIIs + ")(" + numJJs + numKKs + ")</span></div>";

					numBBs = reSpace(numBBs);
					numCCs = reSpace(numCCs);
					numEEs = reSpace(numEEs);
					numFFs = reSpace(numFFs);
					numHHs = reSpace(numHHs);
					numKKs = reSpace(numKKs);

					numAA = parseFloat(numAAs);
	    			numBB = parseFloat(numBBs);
	    			numCC = parseFloat(numCCs);
	    			numDD = parseFloat(numDDs);
	    			numEE = parseFloat(numEEs);
	    			numFF = parseFloat(numFFs);
	    			numGG = parseFloat(numGGs);
	    			numHH = parseFloat(numHHs);
	    			numII = parseFloat(numIIs);
	    			numJJ = parseFloat(numJJs);
	    			numKK = parseFloat(numKKs);

	    			correctAnswer = ((numAA + numBB + numCC)*(numDD + numEE + numFF))/((numGG + numHH)*(numII)*(numJJ + numKK));
	    			
	    			break;
				case 4:
					numAAs = cNG(1,10,2,1);
					numBBs = cNG(1,10,2,3);
					numCCs = cNG(1,10,2,1);
					numDDs = cNG(10,100,1,3);
					signEE = cSG(3);
					numEEs = cNG(0.001,1,3,1);
					numFFs = cNG(10,100,0,1);
					numGGs = cNG(100,1000,0,3);
					signHH = cSG(3);
					numHHs = cNG(0.001,1,3,1);
					numIIs = cNG(100,1000,0,1);
					numJJs = cNG(100,1000,0,3);
					numKKs = cNG(100,1000,0,1);
					numLLs = cNG(0.001,1,3,1);

					currentProblem = "<div class='frac'><span>(" + numAAs + numBBs + ")</span><span class='symbol'>/</span><span class='bottom'>" + numCCs + numDDs + "</span></div>" + signEE + "<div class='frac'><span>" + numEEs + "</span><span class='symbol'>/</span><span class='bottom'>" + numFFs + numGGs + "</span></div>" + signHH + "<div class='frac'><span>(" + numHHs + ")(" + numIIs + numJJs + ")</span><span class='symbol'>/</span><span class='bottom'>(" + numKKs + ")(" + numLLs + ")</span></div>";

					numBBs = reSpace(numBBs);
					numDDs = reSpace(numDDs);
					numGGs = reSpace(numGGs);
					numJJs = reSpace(numJJs);

					numAA = parseFloat(numAAs);
	    			numBB = parseFloat(numBBs);
	    			numCC = parseFloat(numCCs);
	    			numDD = parseFloat(numDDs);
	    			numEE = parseFloat(numEEs);
	    			numFF = parseFloat(numFFs);
	    			numGG = parseFloat(numGGs);
	    			numHH = parseFloat(numHHs);
	    			numII = parseFloat(numIIs);
	    			numJJ = parseFloat(numJJs);
	    			numKK = parseFloat(numKKs);
	    			numLL = parseFloat(numLLs);

	    			if(signEE == " + ")
					{
						if(signHH == " + ")
						{
							correctAnswer = ((numAA+numBB)/(numCC+numDD)) + ((numEE)/(numFF+numGG)) + ((numHH)*(numII+numJJ)/((numKK)*(numLL)));					
						}
						else if(signHH == " - ")
						{
							correctAnswer = ((numAA+numBB)/(numCC+numDD)) + ((numEE)/(numFF+numGG)) - ((numHH)*(numII+numJJ)/((numKK)*(numLL)));
						}
					}
					else if(signEE == " - ")
					{
						if(signHH == " + ")
						{
							correctAnswer = ((numAA+numBB)/(numCC+numDD)) - ((numEE)/(numFF+numGG)) + ((numHH)*(numII+numJJ)/((numKK)*(numLL)));					
						}
						else if(signHH == " - ")
						{
							correctAnswer = ((numAA+numBB)/(numCC+numDD)) - ((numEE)/(numFF+numGG)) - ((numHH)*(numII+numJJ)/((numKK)*(numLL)));
						}
					}

					
					break;
	    	}
			break;
		case 20:
			// hs pg. 3
			switch(perPageProblemType)
			{
				case 0:
					numAAs = cNG(1,10,2,1);
					numBBs = cNG(10,100,1,3);
					signCC = cSG(3);
					numCCs = cNG(1,10,2,1);
					numDDs = cNG(1,10,1,3);
					signEE = cSG(3);
					signFF = cSG(1);

					currentProblem = "<div class='frac'><span>1</span><span class='symbol'>/</span><span class='bottom'>" + numAAs + numBBs + "</span></div>" + signCC + "<div class='frac'><span>1</span><span class='symbol'>/</span><span class='bottom'>" + numCCs + numDDs + "</span></div>" + signEE + "<div class='frac'><span>1</span><span class='symbol'>/</span><span class='bottom'>(" + signFF + "&pi;)</span></div>";

					numBBs = reSpace(numBBs);
					numDDs = reSpace(numDDs);

					numAA = parseFloat(numAAs);
	    			numBB = parseFloat(numBBs);
	    			numCC = parseFloat(numCCs);
	    			numDD = parseFloat(numDDs);

	    			if(signCC == " + ")
					{
						if(signEE == " + ")
						{
							if(signFF == "")
							{
								correctAnswer = (1/(numAA+numBB) + 1/(numCC+numDD) + 1/(Math.PI));
							}
							else if(signFF == "-")
							{
								correctAnswer = (1/(numAA+numBB) + 1/(numCC+numDD) + 1/(0-(Math.PI)));
							}				
						}
						else if(signEE == " - ")
						{
							if(signFF == "")
							{
								correctAnswer = (1/(numAA+numBB) + 1/(numCC+numDD) - 1/(Math.PI));
							}
							else if(signFF == "-")
							{
								correctAnswer = (1/(numAA+numBB) + 1/(numCC+numDD) - 1/(0-(Math.PI)));
							}	
						}
					}
					else if(signCC == " - ")
					{
						if(signEE == " + ")
						{
							if(signFF == "")
							{
								correctAnswer = (1/(numAA+numBB) - 1/(numCC+numDD) + 1/(Math.PI));
							}
							else if(signFF == "-")
							{
								correctAnswer = (1/(numAA+numBB) - 1/(numCC+numDD) + 1/(0-(Math.PI)));
							}				
						}
						else if(signEE == " - ")
						{
							if(signFF == "")
							{
								correctAnswer = (1/(numAA+numBB) - 1/(numCC+numDD) - 1/(Math.PI));
							}
							else if(signFF == "-")
							{
								correctAnswer = (1/(numAA+numBB) - 1/(numCC+numDD) - 1/(0-(Math.PI)));
							}	
						}
					}
					
					break;
				case 1:
					numAAs = cNG(0.001,1,3,1);
					numBBs = cNG(0.001,1,3,1);
					numCCs = cNG(1,10,2,1);
					numDDs = cNG(0.0001,1,4,3);
					signEE = cSG(3);
					numEEs = cNG(0.0000001,0.0001,7,0);

					numEE = parseFloat(numEEs);

					MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
					currentProblem = "[<div class='frac'><span>(" + numAAs + ")(" + numBBs + ")</span><span class='symbol'>/</span><span class='bottom'>" + numCCs + "</span></div>" + numDDs + "]<sup>2</sup>" + signEE + "<script type='math/tex'>\\sqrt{" + numEE.toExponential().replace("e","\\times 10^{") + "}}</script>";
					MathJax.Hub.Queue(["Typeset",MathJax.Hub]);		
							
					numDDs = reSpace(numDDs);

					numAA = parseFloat(numAAs);
	    			numBB = parseFloat(numBBs);
	    			numCC = parseFloat(numCCs);
	    			numDD = parseFloat(numDDs);
	    			numEE = parseFloat(numEEs);

	    			if(signEE == " + ")
	    			{
	    				correctAnswer = (Math.pow((((numAA*numBB)/(numCC))+numDD),2) + Math.sqrt(numEE));
	    			}
	    			else if(signEE == " - ")
	    			{
	    				correctAnswer = (Math.pow((((numAA*numBB)/(numCC))+numDD),2) - Math.sqrt(numEE));
	    			}
	    			
	    			break;
				case 2:
					numAAs = cNG(0.0001,0.1,4,1);
					signBB = cSG(1);
					numBBs = cNG(0.001,1,3,1);
					numCCs = cNG(0.001,1,3,0);
					signDD = cSG(3);
					numDDs = cNG(1,10,1,0);
					numEEs = cNG(10,100,1,3);

					while(numEEs.includes("-") == true)
					{
						numEEs = cNG(10,100,1,3);
					}

					MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
					currentProblem = "(" + numAAs + ")(" + signBB + "&pi;)<script type='math/tex'>\\sqrt{(" + numBBs + ")^2 / " + numCCs + "}</script>" + signDD + "1/" + "<script type='math/tex'>\\sqrt{" + numDDs + numEEs + "}</script>";
					MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

					numEEs = reSpace(numEEs);

					numAA = parseFloat(numAAs);
	    			numBB = parseFloat(numBBs);
	    			numCC = parseFloat(numCCs);
	    			numDD = parseFloat(numDDs);
	    			numEE = parseFloat(numEEs);

					if(signBB == "")
					{
						if(signDD == " + ")
						{
							correctAnswer = ((numAA* Math.PI *(Math.sqrt(Math.pow(numBB,2)/numCC))+(1/(Math.sqrt(numDD + numEE)))));					
						}
						else if(signDD == " - ")
						{
							correctAnswer = ((numAA* Math.PI *(Math.sqrt(Math.pow(numBB,2)/numCC))-(1/(Math.sqrt(numDD + numEE)))));
						}
					}
					else if(signBB == "-")
					{
						if(signDD == " + ")
						{
							correctAnswer = ((numAA* (0-Math.PI) *(Math.sqrt(Math.pow(numBB,2)/numCC))+(1/(Math.sqrt(numDD + numEE)))));					
						}
						else if(signDD == " - ")
						{
							correctAnswer = ((numAA* (0-Math.PI) *(Math.sqrt(Math.pow(numBB,2)/numCC))-(1/(Math.sqrt(numDD + numEE)))));
						}
					}

					
					break;
				case 3:
					numAAs = cNG(0.01,1,2,0);
					numBBs = cNG(0.001,1,3,5);
					numCCs = cNG(0.0001,1,4,0);
					numDDs = cNG(0.001,1,3,0);
					numEEs = cNG(0.001,1,3,1);
					numFFs = cNG(0.001,1,3,3);

					MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
					currentProblem = "<div class='frac'><span><script type='math/tex'>\\sqrt{" + numAAs + numBBs + "(" + numCCs + ")/(" + numDDs + ")}</script></span><span class='symbol'>/</span><span class='bottom'>" + numEEs + numFFs + "</span></div>";
					MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

					numFFs = reSpace(numFFs);

					numAA = parseFloat(numAAs);
	    			numBB = parseFloat(numBBs);
	    			numCC = parseFloat(numCCs);
	    			numDD = parseFloat(numDDs);
	    			numEE = parseFloat(numEEs);
	    			numFF = parseFloat(numFFs);

					correctAnswer = (Math.sqrt(numAA + numBB + (numCC)/(numDD))/(numEE + numFF));
					
					break;

				case 4:
					numAAs = cNG(0.001,1,3,1);
					numBBs = cNG(0.001,1,3,3);
					signCC = cSG(3);
					numCCs = cNG(0.001,1,3,1);
					numDDs = cNG(0.001,1,3,1);
					numEEs = cNG(0.01,1,2,1);
					numFFs = cNG(0.00001,0.01,5,3);

					while((numCCs.includes("-") == true && numDDs.includes("-") == false) || (numCCs.includes("-") == false && numDDs.includes("-") == true))
					{
						numCCs = cNG(0.001,1,3,1);
						numDDs = cNG(0.001,1,3,1);
					}

					MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
					currentProblem = "[<div class='frac'><span>" + numAAs + numBBs + signCC + "<script type='math/tex'>\\sqrt{" + numCCs + "/" + numDDs + "}</script></span><span class='symbol'>/</span><span class='bottom'>" + numEEs + numFFs + "</span></div>]<sup>2</sup>";
					// currentProblem = "<script type='math/tex'>[ \\frac{" + numAAs + numBBs + signCC + "\\sqrt{" + numCCs + "/" + numDDs + "}}{" + numEEs + numFFs + "}]^2</script>";
					MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

					numBBs = reSpace(numBBs);
					numFFs = reSpace(numFFs);

					numAA = parseFloat(numAAs);
	    			numBB = parseFloat(numBBs);
	    			numCC = parseFloat(numCCs);
	    			numDD = parseFloat(numDDs);
	    			numEE = parseFloat(numEEs);
	    			numFF = parseFloat(numFFs);

					if(signCC == " + ")
					{
						correctAnswer = Math.pow((numAA + numBB + Math.sqrt((numCC)/(numDD)))/(numEE+numFF),2);
					}
					else if(signCC == " - ")
					{
						correctAnswer = Math.pow((numAA + numBB - Math.sqrt((numCC)/(numDD)))/(numEE+numFF),2);
					}

					
					break;
			}
		// cases go here		
	}

	sA(correctAnswer);
	//(numGG.toExponential()).replace("e","x10<sup>")

	// Code for fraction
	// 1 <div class='frac'><span>1123</span><span class='symbol'>/</span><span class='bottom'>2</span></div>

	// <script type='math/tex'></script>

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

		var userResponseTres = document.getElementById("responsetres").value;
		var userResponseTen = document.getElementById("responseten").value;
		userResponseTres = userResponseTres.trim();
		userResponseTen = userResponseTen.trim();
		
		if(userResponseTen == "")
		{
			userResponseTen = "0";
		}

		if (userResponseTres == correctAnswerTres && userResponseTen == correctAnswerTen)
		{
			sessionCorrect++;
			sessionStreak++;
			document.getElementById("correctness").innerHTML = "Correct!";
		}

		else
		{
			sessionStreak = 0;
			document.getElementById("correctness").innerHTML = "Incorrect. The correct answer was " + correctAnswerTres + " x 10<sup>" + correctAnswerTen + "</sup>.";
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


function generatePDF() {
	/* old generatePDF from Mr. Tocs 
	numQs = prompt("How many questions would you like in the PDF?");
	numQs = parseInt(numQs);

	while(typeof numQs !== "number")
	{
		numQs = prompt("Please try again: How many questions would you like in the PDF?");
		numQs = parseInt(numQs);
	}

	for (var i = 0; i < numQs; i++) {
	    generateProblems();
	    console.log("Gen Problem: " + i);
	    html2canvas(document.getElementById('currentProblem')).then(function(canvas) {
	    	document.body.appendChild(canvas);
		});	
		console.log("Canvas: " + i);	
	}
	*/

	/*
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
        doc.text(40, 40, "Mr. Tics Generated Calc Practice PDF");

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


        doc.save("Mr. Tics Calc Practice PDF " + pdfDateDisplay + ".pdf");
    }
    */

    // this was on originally
    /*
    if(selectionCheckPass)
    {
		generateProblems();

		html2canvas(document.getElementById("currentProblemDiv"), {backgroundColor: null, width: 500, height: 80}).then(function(canvas) {
		    var imgData = canvas.toDataURL('image/png');
            var doc = new jsPDF('p', 'pt');
            doc.addImage(imgData, 'PNG', 10, 10);
            doc.save('sample-file.pdf');
		});
	}
	*/
}
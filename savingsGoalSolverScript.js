var currentSavingsAssumption = 0;
var monthlySavingsAssumption = 0;
var numberMonthsAssumption = 0;
var numberYearsAssumption = 0;
var monthsToReachGoal = 0;
var investmentReturnAssumption = 0;
var monthlyInvestmentReturnAssumption = 0;
var finalSavingsAssumption = 0;

var impliedCurrentSavings = 0;
var impliedMonthlySavings = 0;
var impliedNumberMonths = 0;
var impliedMonthlyInvestmentReturn = 0;
var impliedAnnualInvestmentReturn = 0;
var impliedFinalSavings = 0;

var currentSavingsOutput = 0;
var monthlySavingsOutput = 0;
var numberMonthsOutput = 0;
var annualInvestmentReturnOutput = 0;
var finalSavingsOutput = 0;

var contributionTotal = 0;
var investmentReturnTotal = 0;
var contributionPortion = 0;
var investmentReturnPortion = 0;

var impliedOutput1 = document.getElementById("impliedOutput1");
var impliedOutput2 = document.getElementById("impliedOutput2");
var impliedOutput3 = document.getElementById("impliedOutput3");
var impliedOutput4 = document.getElementById("impliedOutput4");
var impliedOutput6 = document.getElementById("impliedOutput6");
var impliedOutput7 = document.getElementById("impliedOutput7");

var solveVariable = 0;

var panel1 = document.getElementById("panel1");
var panel2 = document.getElementById("panel2");
var panel3 = document.getElementById("panel3");
var panel4 = document.getElementById("panel4");
var panel5 = document.getElementById("panel5");

var monthsArray = [];
var contributionArray = [];
var investmentReturnArray = [];
var totalArray = [];

var dateOutputText = "";

var outputTextDiv = document.getElementById("outputTextDiv");
var outputTextDiv2 = document.getElementById("outputTextDiv2");

var chart;
var outputBarChart = document.getElementById("outputBarChart");

var tickSpacing = 10;


//main method
addInputEventListeners();
getUserInputs();
calculateSavings();
showOutputs();


function addInputEventListeners() {
    
    var dropDownArray = document.getElementsByClassName("dropDown");
    var inputsArray = document.getElementsByClassName("userInput");

    for(i=0;i<dropDownArray.length;i++) {
        dropDownArray[i].addEventListener('change',refreshAnalysis, false);
    }

    for(i=0;i<inputsArray.length;i++) {
        inputsArray[i].addEventListener('change',refreshAnalysis, false);
    }
}

function refreshAnalysis(){

    currentSavingsAssumption = 0;
    monthlySavingsAssumption = 0;
    numberMonthsAssumption = 0;
    numberYearsAssumption = 0;
    investmentReturnAssumption = 0;
    monthlyInvestmentReturnAssumption = 0;
    finalSavingsAssumption = 0;

    currentSavingsOutput = 0;
    monthlySavingsOutput = 0;
    numberMonthsOutput = 0;
    annualInvestmentReturnOutput = 0;
    finalSavingsOutput = 0;

    monthsArray = [];
    contributionArray = [];
    investmentReturnArray = [];
    totalArray = [];

    if(typeof chart !== "undefined"){
        chart.destroy();
    }

    getUserInputs();
    calculateSavings();
    showOutputs();
}

function getUserInputs(){

    solveVariable = document.getElementById("solveVariable");

    if(solveVariable.value == "Final Savings"){
        console.log("Solve for final savings");

        panel1.classList.remove("hide");
        panel2.classList.add("hide");
        panel3.classList.add("hide");
        panel4.classList.add("hide");
        panel5.classList.add("hide");

        currentSavingsAssumption = Number(document.getElementById("currentSavings1").value);
        monthlySavingsAssumption = Number(document.getElementById("monthlySavings1").value);
        numberMonthsAssumption = Number(document.getElementById("numberMonths1").value);
        numberYearsAssumption = Number(document.getElementById("numberYears1").value);
        investmentReturnAssumption = Number(document.getElementById("investmentReturn1").value)/100;
        
        monthlyInvestmentReturnAssumption = Math.pow(1+investmentReturnAssumption,(1/12))-1;
        monthsToReachGoal = numberMonthsAssumption + numberYearsAssumption * 12;

    } else if(solveVariable.value == "Monthly Contribution"){
        console.log("Solve for monthly contribution");

        panel2.classList.remove("hide");
        panel1.classList.add("hide");
        panel3.classList.add("hide");
        panel4.classList.add("hide");
        panel5.classList.add("hide");

        currentSavingsAssumption = Number(document.getElementById("currentSavings2").value);
        finalSavingsAssumption = Number(document.getElementById("finalSavings2").value);
        numberMonthsAssumption = Number(document.getElementById("numberMonths2").value);
        numberYearsAssumption = Number(document.getElementById("numberYears2").value);
        investmentReturnAssumption = Number(document.getElementById("investmentReturn2").value)/100;
        
        monthlyInvestmentReturnAssumption = Math.pow(1+investmentReturnAssumption,(1/12))-1;
        monthsToReachGoal = numberMonthsAssumption + numberYearsAssumption * 12;

    } else if(solveVariable.value == "# of Months to Reach Goal"){
        console.log("Solve for # of months to reach goal");

        panel3.classList.remove("hide");
        panel1.classList.add("hide");
        panel2.classList.add("hide");
        panel4.classList.add("hide");
        panel5.classList.add("hide");

        currentSavingsAssumption = Number(document.getElementById("currentSavings3").value);
        finalSavingsAssumption = Number(document.getElementById("finalSavings3").value);
        monthlySavingsAssumption = Number(document.getElementById("monthlySavings3").value);
        investmentReturnAssumption = Number(document.getElementById("investmentReturn3").value)/100;
        
        monthlyInvestmentReturnAssumption = Math.pow(1+investmentReturnAssumption,(1/12))-1;

    } else if(solveVariable.value == "Investment Return"){
        console.log("Solve for investment return");

        panel4.classList.remove("hide");
        panel1.classList.add("hide");
        panel2.classList.add("hide");
        panel3.classList.add("hide");
        panel5.classList.add("hide");

        currentSavingsAssumption = Number(document.getElementById("currentSavings4").value);
        finalSavingsAssumption = Number(document.getElementById("finalSavings4").value);
        monthlySavingsAssumption = Number(document.getElementById("monthlySavings4").value);
        numberMonthsAssumption = Number(document.getElementById("numberMonths4").value);
        numberYearsAssumption = Number(document.getElementById("numberYears4").value);

        monthsToReachGoal = numberMonthsAssumption + numberYearsAssumption * 12;
        
    } else if(solveVariable.value == "Initial Savings"){
        console.log("Solve for initial savings");

        panel5.classList.remove("hide");
        panel1.classList.add("hide");
        panel2.classList.add("hide");
        panel3.classList.add("hide");
        panel4.classList.add("hide");

        finalSavingsAssumption = Number(document.getElementById("finalSavings5").value);
        monthlySavingsAssumption = Number(document.getElementById("monthlySavings5").value);
        numberMonthsAssumption = Number(document.getElementById("numberMonths5").value);
        numberYearsAssumption = Number(document.getElementById("numberYears5").value);
        investmentReturnAssumption = Number(document.getElementById("investmentReturn5").value)/100;
        
        monthlyInvestmentReturnAssumption = Math.pow(1+investmentReturnAssumption,(1/12))-1;
        monthsToReachGoal = numberMonthsAssumption + numberYearsAssumption * 12;

    }

}

function calculateSavings(){

    if(solveVariable.value == "Final Savings"){
        
        if(monthlyInvestmentReturnAssumption==0){
            impliedFinalSavings = currentSavingsAssumption + monthlySavingsAssumption * monthsToReachGoal;
        } else{
            impliedFinalSavings = (currentSavingsAssumption * Math.pow(1+monthlyInvestmentReturnAssumption,monthsToReachGoal)) + (monthlySavingsAssumption * ((Math.pow(1+monthlyInvestmentReturnAssumption,monthsToReachGoal)-1) / monthlyInvestmentReturnAssumption));
        }
        
        impliedOutput1.innerHTML = "$"+Math.round(impliedFinalSavings).toLocaleString();

        currentSavingsOutput = currentSavingsAssumption;
        monthlySavingsOutput = monthlySavingsAssumption;
        annualInvestmentReturnOutput = investmentReturnAssumption;
        numberMonthsOutput = monthsToReachGoal;
        finalSavingsOutput = impliedFinalSavings;

        if(numberMonthsOutput<24){
            dateOutputText = Math.round(numberMonthsOutput*10)/10+" months ";
        } else{
            dateOutputText = Math.floor(numberMonthsOutput / 12)+" years and "+ Math.round((numberMonthsOutput - (Math.floor(numberMonthsOutput/12)*12))*10)/10 + " months ";
        }

        if(numberMonthsOutput==0){
            outputTextDiv.innerHTML = "";    
        } else {
            outputTextDiv.innerHTML = "<p>Assuming...</p><ul><li>Initial savings of "+"$"+Math.round(currentSavingsOutput).toLocaleString()+"</li>"+"<li>A monthly contribution of "+"$"+Math.round(monthlySavingsOutput).toLocaleString()+"</li>"+"<li>"+dateOutputText+"to reach your goal </li>"+"<li>An annual investment return of "+(Math.round(annualInvestmentReturnOutput*1000)/10)+"% </li></ul>"+"<p>Your final savings balance will be <span id=\"textOutputKey\">"+"$"+Math.round(finalSavingsOutput).toLocaleString()+"</span>.";
        }

    } else if(solveVariable.value == "Monthly Contribution"){
        console.log("Solve for monthly contribution");

        if(monthsToReachGoal == 0) {
            impliedMonthlySavings = 0;
        } else if(investmentReturnAssumption == 0){
            impliedMonthlySavings = (finalSavingsAssumption - currentSavingsAssumption) / monthsToReachGoal;
        } else {
            impliedMonthlySavings = (finalSavingsAssumption - (currentSavingsAssumption * Math.pow(1+monthlyInvestmentReturnAssumption,monthsToReachGoal))) / ((Math.pow(1+monthlyInvestmentReturnAssumption,monthsToReachGoal)-1)/monthlyInvestmentReturnAssumption);
        }
        
        currentSavingsOutput = currentSavingsAssumption;
        monthlySavingsOutput = impliedMonthlySavings;
        annualInvestmentReturnOutput = investmentReturnAssumption;
        numberMonthsOutput = monthsToReachGoal;
        finalSavingsOutput = finalSavingsAssumption;

        if(numberMonthsOutput<24){
            dateOutputText = Math.round(numberMonthsOutput*10)/10+" months ";
        } else{
            dateOutputText = Math.floor(numberMonthsOutput / 12)+" years and "+ Math.round((numberMonthsOutput - (Math.floor(numberMonthsOutput/12)*12))*10)/10 + " months ";
        }

        if(numberMonthsOutput == 0){
            impliedOutput2.innerHTML = "";
            impliedOutput3.innerHTML = "";
            outputTextDiv.innerHTML = "";    
        } else{
            impliedOutput2.innerHTML = "$"+Math.round(impliedMonthlySavings).toLocaleString();
        
            if(monthsToReachGoal>=12){
                impliedOutput3.innerHTML = "$"+Math.round(impliedMonthlySavings*12).toLocaleString();
            } else {
                impliedOutput3.innerHTML = "n/a";
            }

            outputTextDiv.innerHTML = "<p>Assuming...</p><ul><li>Initial savings of "+"$"+Math.round(currentSavingsOutput).toLocaleString()+"</li>"+"<li>A final savings goal of "+"$"+Math.round(finalSavingsOutput).toLocaleString()+"</li>"+"<li>"+dateOutputText+" to reach your goal </li>"+"<li>An annual investment return of "+(Math.round(annualInvestmentReturnOutput*1000)/10)+"% </li></ul>"+"<p>You will need to save <span id=\"textOutputKey\">"+"$"+Math.round(monthlySavingsOutput).toLocaleString()+" per month</span> to reach your goal.";
        }

    } else if(solveVariable.value == "# of Months to Reach Goal"){

        if(monthlyInvestmentReturnAssumption == 0){
            impliedNumberMonths = (finalSavingsAssumption - currentSavingsAssumption) / monthlySavingsAssumption;
        } else {
            impliedNumberMonths = (Math.log((finalSavingsAssumption * monthlyInvestmentReturnAssumption + monthlySavingsAssumption) / (monthlyInvestmentReturnAssumption * currentSavingsAssumption + monthlySavingsAssumption))) / (Math.log(1+monthlyInvestmentReturnAssumption));
        }

        currentSavingsOutput = currentSavingsAssumption;
        monthlySavingsOutput = monthlySavingsAssumption;
        annualInvestmentReturnOutput = investmentReturnAssumption;
        numberMonthsOutput = impliedNumberMonths;
        finalSavingsOutput = finalSavingsAssumption;

        if(numberMonthsOutput<24){
            dateOutputText = Math.round(numberMonthsOutput*10)/10+" months ";
        } else{
            dateOutputText = Math.floor(numberMonthsOutput / 12)+" years and "+ Math.round((numberMonthsOutput - (Math.floor(numberMonthsOutput/12)*12))*10)/10 + " months ";
        }

        if(isNaN(numberMonthsOutput) || !isFinite(numberMonthsOutput)){
            impliedOutput4.innerHTML = "";
            outputTextDiv.innerHTML = "";
        } else{
            impliedOutput4.innerHTML = dateOutputText;
            outputTextDiv.innerHTML = "<p>Assuming...</p><ul><li>Initial savings of "+"$"+Math.round(currentSavingsOutput).toLocaleString()+"</li>"+"<li>A final savings goal of "+"$"+Math.round(finalSavingsOutput).toLocaleString()+"</li>"+"<li>A monthly contribution of "+"$"+Math.round(monthlySavingsOutput).toLocaleString()+"</li>"+"<li>An annual investment return of "+(Math.round(annualInvestmentReturnOutput*1000)/10)+"% </li></ul>"+"<p>It will take <span id=\"textOutputKey\">"+dateOutputText+"</span> to reach your goal.";
        }

    } else if(solveVariable.value == "Investment Return"){

        impliedMonthlyInvestmentReturn = solveRate(monthsToReachGoal, monthlySavingsAssumption * -1, currentSavingsAssumption * -1, finalSavingsAssumption);
        console.log("Implied monthly investment return: "+impliedMonthlyInvestmentReturn);

        impliedAnnualInvestmentReturn = Math.pow(1+impliedMonthlyInvestmentReturn,12)-1;
        console.log("Implied annual investment return: "+impliedAnnualInvestmentReturn);


        currentSavingsOutput = currentSavingsAssumption;
        monthlySavingsOutput = monthlySavingsAssumption;
        annualInvestmentReturnOutput = impliedAnnualInvestmentReturn;
        numberMonthsOutput = monthsToReachGoal;
        finalSavingsOutput = finalSavingsAssumption;

        if(numberMonthsOutput<24){
            dateOutputText = Math.round(numberMonthsOutput*10)/10+" months ";
        } else{
            dateOutputText = Math.floor(numberMonthsOutput / 12)+" years and "+ Math.round((numberMonthsOutput - (Math.floor(numberMonthsOutput/12)*12))*10)/10 + " months ";
        }

        if(numberMonthsOutput == 0 || finalSavingsOutput == 0 || (currentSavingsOutput == 0 && monthlySavingsOutput == 0)){
            impliedOutput6.innerHTML = "";
            outputTextDiv.innerHTML = "";
        } else {
            impliedOutput6.innerHTML = (Math.round(impliedAnnualInvestmentReturn*1000)/10).toLocaleString()+"%";
            outputTextDiv.innerHTML = "<p>Assuming...</p><ul><li>Initial savings of "+"$"+Math.round(currentSavingsOutput).toLocaleString()+"</li>"+"<li>A final savings goal of "+"$"+Math.round(finalSavingsOutput).toLocaleString()+"</li>"+"<li>A monthly contribution of "+"$"+Math.round(monthlySavingsOutput).toLocaleString()+"</li>"+"<li>"+dateOutputText+" to reach your goal </li></ul>"+"<p>You'll need an investment return of <span id=\"textOutputKey\">"+(Math.round(annualInvestmentReturnOutput*1000)/10).toLocaleString()+"% per year</span> to reach your goal.";
        }

    } else if(solveVariable.value == "Initial Savings"){

        if(monthlyInvestmentReturnAssumption == 0){
            impliedCurrentSavings = finalSavingsAssumption - monthlySavingsAssumption * monthsToReachGoal;
        } else{
            impliedCurrentSavings = (finalSavingsAssumption - (monthlySavingsAssumption * ((Math.pow(1+monthlyInvestmentReturnAssumption,monthsToReachGoal) - 1) / monthlyInvestmentReturnAssumption))) / (Math.pow(1+monthlyInvestmentReturnAssumption,monthsToReachGoal));
        }

        impliedOutput7.innerHTML = "$"+Math.round(impliedCurrentSavings).toLocaleString();

        currentSavingsOutput = impliedCurrentSavings;
        monthlySavingsOutput = monthlySavingsAssumption;
        annualInvestmentReturnOutput = investmentReturnAssumption;
        numberMonthsOutput = monthsToReachGoal;
        finalSavingsOutput = finalSavingsAssumption;
        
        if(numberMonthsOutput<24){
            dateOutputText = Math.round(numberMonthsOutput*10)/10+" months ";
        } else{
            dateOutputText = Math.floor(numberMonthsOutput / 12)+" years and "+ Math.round((numberMonthsOutput - (Math.floor(numberMonthsOutput/12)*12))*10)/10 + " months ";
        }

        if(numberMonthsOutput == 0){
            outputTextDiv.innerHTML = "";    
        } else{
            outputTextDiv.innerHTML = "<p>Assuming...</p><ul><li>A final savings goal of "+"$"+Math.round(finalSavingsOutput).toLocaleString()+"</li>"+"<li>A monthly contribution of "+"$"+Math.round(monthlySavingsOutput).toLocaleString()+"</li>"+"<li>"+dateOutputText+" to reach your goal </li>"+"<li>An annual investment return of "+(Math.round(annualInvestmentReturnOutput*1000)/10)+"% </li></ul>"+"<p>You'll need an initial savings balance of <span id=\"textOutputKey\">"+"$"+Math.round(currentSavingsOutput).toLocaleString()+"</span> to reach your goal.";
        }
    }

    contributionTotal = currentSavingsOutput + monthlySavingsOutput * numberMonthsOutput;
    investmentReturnTotal = finalSavingsOutput - contributionTotal;

    if(finalSavingsOutput == 0){
        contributionPortion = 0;
        investmentReturnPortion = 0;
    } else{
        contributionPortion = contributionTotal / finalSavingsOutput;
        investmentReturnPortion = investmentReturnTotal / finalSavingsOutput;
    }

    if(numberMonthsOutput == 0 || finalSavingsOutput == 0 || !isFinite(numberMonthsOutput) || (currentSavingsOutput == 0 && monthlySavingsOutput == 0)){
        outputTextDiv2.innerHTML = "";
    } else {
        outputTextDiv2.innerHTML = "<p><span id=\"textOutputKey\">$"+Math.round(contributionTotal).toLocaleString()+"</span> ("+(Math.round(contributionPortion*1000)/10).toLocaleString()+"%) of your final savings balance will come directly from your contributions.</p>"+"<p><span id=\"textOutputKey\">$"+Math.round(investmentReturnTotal).toLocaleString()+"</span> ("+(Math.round(investmentReturnPortion*1000)/10).toLocaleString()+"%) will come from investment returns.</p>";
    }
}

function showOutputs(){

    if(outputTextDiv2.innerHTML == ""){
        return;
    } else{

        for(i=0; i<=numberMonthsOutput; i++){
            
            if(i >=2000){
                break;
            }

            monthsArray[i] = i;

            if(i==0){
                contributionArray[i] = currentSavingsOutput;
                investmentReturnArray[i] = 0;
                totalArray[i] = currentSavingsOutput;
            } else{
                contributionArray[i] = contributionArray[i-1] + monthlySavingsOutput;
                totalArray[i] = totalArray[i-1]*Math.pow(1+annualInvestmentReturnOutput,(1/12))+monthlySavingsOutput;
                investmentReturnArray[i] = totalArray[i] - contributionArray[i];
            }

        }

        //calculate max ticks number based on # of months
        if(numberMonthsOutput<11){
            tickSpacing = 1;
        } else if(numberMonthsOutput<21){
            tickSpacing = 2;
        } else if(numberMonthsOutput<37){
            tickSpacing = 3;
        } else if(numberMonthsOutput <59){
            tickSpacing = 5;
        } else if(numberMonthsOutput <239){
            tickSpacing = 12;
        } else {
            tickSpacing = 24;
        }

        console.log("tickSpacing: "+tickSpacing);

        console.log("Months array: "+monthsArray);
        console.log("Contribution array: "+contributionArray);
        console.log("Investment Return array: "+investmentReturnArray);
        console.log("Total array: "+totalArray);

        //draw bar chart for savings split by contributions and investment returns
        var ctx = outputBarChart.getContext('2d');

        chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',

            // The data for our dataset
            data: {
                labels: monthsArray,
                datasets: [
                    {
                        data: contributionArray,
                        backgroundColor: "rgb(0, 121, 129)", 
                        label: "Contributions",
                    },
                    
                    {
                        data: investmentReturnArray,
                        backgroundColor: "rgb(215, 66, 95)", 
                        label: "Investment Returns",
                    },  
                ]
            },

            //options for annual returns chart.js bar chart
            options: outputBarChartOptions = {

                plugin_one_attribute: 1,
                maintainAspectRatio: false,

                tooltips: {
                    // Include a dollar sign in the ticks and add comma formatting
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';

                            if (label) {
                                label += ': ';
                            }
                            label += "$"+(Math.round(tooltipItem.yLabel)).toLocaleString();
                            return label;
                        }
                    },
                },
                
                scales: {
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            fontColor: "rgb(56,56,56)",
                            fontStyle: "bold",
                            fontSize: 13,
                            labelString: "Month",
                        },

                        ticks: {
                            fontColor: "rgb(56,56,56)",
                            min: 0,
                            max: numberMonthsOutput,
                            stepSize: tickSpacing,
                            maxTicksLimit: Math.floor(numberMonthsOutput / tickSpacing),
                        },

                        gridLines: {
                            zeroLineColor: "rgb(56,56,56)",
                            zeroLineWidth: 2,
                        },

                        stacked: true,
                    }],

                    yAxes: [{
                        
                        ticks: {
                            autoSkip: false,
                            fontSize: 12,
                            fontColor: "rgb(56,56,56)",
                            fontStyle: "bold",

                            callback: function(value, index, values) {
                                return "$"+value.toLocaleString();
                            },
                        },

                        scaleLabel: {
                            display: true,
                            fontColor: "rgb(56,56,56)",
                            fontStyle: "bold",
                            fontSize: 13,
                        },

                        gridLines: {

                        },

                        stacked: true,
                    }],    
                },

                legend: {
                    display: true,
                },

                title: {
                    display: false,
                    text: "Your Savings",
                    fontSize: 18,
                    fontColor: "rgb(56,56,56)",
                    padding: 8,
                },

                plugins: {
                    datalabels: {
                        formatter: function(value, context) {
                            return '$' + Math.round(value).toLocaleString();                   
                        },

                        color: "#555555",

                        anchor: "end",
                        align: "end",

                        clamp: true,

                        display: false,
                    }
                }
            }
        });
    }
}

function solveRate (periods, payment, present, future, type, guess) {
    guess = (guess === undefined) ? 0.004 : guess;
    future = (future === undefined) ? 0 : future;
    type = (type === undefined) ? 0 : type;
  
    // Set maximum epsilon for end of iteration
    var epsMax = 1e-10;
  
    // Set maximum number of iterations
    var iterMax = 10;
  
    // Implement Newton's method
    var y, y0, y1, x0, x1 = 0,
      f = 0,
      i = 0;
    var rate = guess;
    if (Math.abs(rate) < epsMax) {
      y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
    } else {
      f = Math.exp(periods * Math.log(1 + rate));
      y = present * f + payment * (1 / rate + type) * (f - 1) + future;
    }
    y0 = present + payment * periods + future;
    y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
    i = x0 = 0;
    x1 = rate;
    while ((Math.abs(y0 - y1) > epsMax) && (i < iterMax)) {
      rate = (y1 * x0 - y0 * x1) / (y1 - y0);
      x0 = x1;
      x1 = rate;
        if (Math.abs(rate) < epsMax) {
          y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
        } else {
          f = Math.exp(periods * Math.log(1 + rate));
          y = present * f + payment * (1 / rate + type) * (f - 1) + future;
        }
      y0 = y1;
      y1 = y;
      ++i;
    }
    return rate;
}


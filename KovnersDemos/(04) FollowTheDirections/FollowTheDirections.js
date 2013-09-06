window.onload = function() {

	var sheetDiv = document.getElementById("myVizContainer");
	var sheetURL = "http://localhost/views/FollowTheDirections/AnalyzingHospitalProfitabilitybyMarket";
	var sheetOptions = {
		hideTabs: true,
		hideToolbar: true,
		width: "800px",
		height: "800px",
		onFirstInteractive: function() {
			viz.getWorkbook().showCustomViewAsync("Completed");
		}
	};
	viz = new tableauSoftware.Viz(sheetDiv, sheetURL, sheetOptions);

	actionUsed = false;
	metricChosen = false;
	qfUsed = false;
	tabsSwitched = false;

	viz.addEventListener("marksselection", function(event) {
		console.log(event.getWorksheet().getName());
		//Geography vs Profitability
		if(event.getWorksheet().getName() === "Geography vs Profitability") {
			actionUsed = true;
			workbook = viz.getWorkbook();
			workbook.changeParameterValueAsync("ActionUsed?",1);
		}
	});
	viz.addEventListener("parametervaluechange", function(event) {
		if(event.getParameterName() === "Choose a Metric") {
			metricChosen = true;
			workbook = viz.getWorkbook();
			workbook.changeParameterValueAsync("MetricChosen?",1);
		}
	});
	viz.addEventListener("filterchange", function(event) {
		if(event.getFieldName() === "Priority") {
			qfUsed = true;
			workbook = viz.getWorkbook();
			workbook.changeParameterValueAsync("QuickFilterUsed?",1);
		}
	});
	viz.addEventListener("tabswitch", function(event) {
		tabsSwitched = true;
		workbook = viz.getWorkbook();
		workbook.changeParameterValueAsync("TabsSwitched?",1);
	});

};



			
		

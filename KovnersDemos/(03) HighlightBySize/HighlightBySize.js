window.onload = function() {

	var sheetDiv = document.getElementById("myVizContainer");
	var sheetURL = "http://localhost/views/HighlightBySize/HighlightBySize";
	var sheetOptions = {
		hideTabs: true,
		hideToolbar: true,
		width: "900px",
		height: "900px",
		onFirstInteractive: function() {
		}
	};
	viz = new tableauSoftware.Viz(sheetDiv, sheetURL, sheetOptions);

	viz.addEventListener("marksselection", function(event) {
		event.getMarksAsync().then(function(marks) {
			if(marks.length  === 1) {
				team = marks[0].getPairs().get("Team").value;
			} else {
				team = "None";
			}
			viz.getWorkbook().changeParameterValueAsync("ChooseTeam", team);
		});
	});

};



			
		

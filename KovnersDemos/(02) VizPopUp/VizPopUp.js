window.onload = function() {

	var sheetDiv = document.getElementById("myVizContainer");
	var sheetURL = "http://localhost/views/VizPopUp/BarChart"
	var sheetOptions = {
		hideTabs: true,
		hideToolbar: true,
		width: "800px",
		height: "800px",
		onFirstInteractive: function() {
		}
	}
	var viz = new tableauSoftware.Viz(sheetDiv, sheetURL, sheetOptions);
	
	var popupDiv = document.getElementById("popUpVizDiv");
	var popupURL = "http://localhost/views/VizPopUp/LineChart"
	var popupOptions = {
		hideTabs: true,
		hideToolbar: true,
		width: "260px",
		height: "200px",
		onFirstInteractive: function() {
		}
	};
	var popUpViz = new tableauSoftware.Viz(popupDiv, popupURL, popupOptions);
	
	var popUpDialog = $('#popUp').dialog({autoOpen: false});
	
	viz.addEventListener('marksselection', function(event) {
		event.getMarksAsync().then(function(marks) {
			if(marks.length === 0) {
				return;
			}
			states = [];
			var i;
			for(i = 0; i < marks.length; i++) {
				states.push(marks[i].getPairs().get('State').value);
			}
			var title = "";
			if(states.length > 1) {
				title = states.length.toString() + " States";
			} else {
				title = states[0];
			}
			sheet = popUpViz.getWorkbook().getActiveSheet();
			sheet.applyFilterAsync("State", states, "REPLACE");
			$('#popUp').dialog("open")
				.dialog("option", "title", title)
				.dialog("option", "position", [350, 250]);
		});
	});
};



			
		

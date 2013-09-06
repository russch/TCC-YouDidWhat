window.onload = function() {

	var placeholder = document.getElementById("myVizContainer");
	var url = "http://localhost/views/NewsArticlePg2/NewsArticlePg2"
	var options = {
		hideTabs: true,
		hideToolbar: true,
		width: "700px",
		height: "360px",
		onFirstInteractive: function() {
			setupScrollEvents();
		}
	}
	viz = new tableauSoftware.Viz(placeholder, url, options);
};

var selectCounty = function(county) {
	workbook = viz.getWorkbook();
	sheet = workbook.getActiveSheet().getWorksheets().get("Map 2");
	sheet.selectMarksAsync("County", county, "REPLACE");
}

var setupScrollEvents = function() {
	elementArray = []
	$("h4").each( function() {
		elemObj = {
			id: $(this).attr('id'),
			top: $(this).offset().top,
			hasShown: false
		};
		elementArray.push(elemObj);
	});
	$(window).scroll(function() {
		var docViewTop = $(window).scrollTop() + 400;
		var i;
		for(i = 0; i < elementArray.length; i++) {
			if(elementArray[i]["top"] > docViewTop && elementArray[i]["top"] < docViewTop+150 && !elementArray[i]["hasShown"]) {
				elementArray[i]["hasShown"] = true;
				selectCounty(elementArray[i]["id"]);
			}
		}
	});
}

			
		

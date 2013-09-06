window.onload = function() {

	var placeholder = document.getElementById("myVizContainer");
	var url = "http://localhost/views/NewsArticle/NewsArticle"
	var options = {
		hideTabs: true,
		hideToolbar: true,
		width: "420px",
		height: "420px"
	}
	viz = new tableauSoftware.Viz(placeholder, url, options);
};

var selectCounty = function(county) {
	workbook = viz.getWorkbook();
	workbook.activateSheetAsync('NewsArticle').then( function() {
		sheet = workbook.getActiveSheet().getWorksheets().get("location map");
		sheet.selectMarksAsync("County", county, "REPLACE");
	});
	
}

var switchSheet = function(sheetName) {
	workbook = viz.getWorkbook();
	workbook.activateSheetAsync(sheetName);
}
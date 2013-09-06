window.onload = function() {

	var sheetDiv = document.getElementById("myVizContainer");
	var sheetURL = "https://demo.tableausoftware.com/views/WriteToWebService/CustomerScatter";
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
			var i;
			for(i = 0; i < marks.length; i++) {
				$.ajax({
					url: "/customers",
					type: "POST",
					async: false,
					data: {
						customer: {
							name: marks[i].getPairs().get("Customer Name").value,
							city: marks[i].getPairs().get("City").value,
							state: marks[i].getPairs().get("State").value,
							sales: marks[i].getPairs().get("SUM(Sales)").value,
							profit: marks[i].getPairs().get("SUM(Profit)").value,
							order_quantity: marks[i].getPairs().get("SUM(Order Quantity )").value,
							profit_ratio: marks[i].getPairs().get("AGG(Gross Profit Ratio)").value
						}
					}
				});
			}
		});
	});


};



			
		

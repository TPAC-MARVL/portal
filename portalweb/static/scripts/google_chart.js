      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      
      
      function drawChart() {
    	  
    	var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

        var options = {
          title: 'My Daily Activities',
          is3D: true,
          width: 300,
          height: 150
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
      }
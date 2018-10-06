(function() {
	
    'use strict'

    
    $('.pie').on('click', function(e) {
        
        var table = document.getElementsByClassName('UomTable')[0];
        var columns;
        columns = tableToArray(table);
            
            
        var pie1 = {
            "type": "pie3d",
            "series": [],
            "title": {
                "text": "Height"
            }  
        };
        
        var pie2 = {
            "type": "pie3d",
            "title": {
                "text": "Score"
            },
            "series": []
        };

        var pie3 = {
            "type": "pie3d",
            "title": {
                "text": "Income"
            },
            "series": []
        };


        var pie4 = {
            "type": "pie3d",
            "title": {
                "text": "Age"
            },
            "series": []
        };


        
        for(var i=0; i<columns.length; i++){
            var array = columns[i];
            for(var j=0; j<array.length; j++){
                var jsonObj = {};
                jsonObj ["values"] = [array[j]];
                if(i==0)
                    pie1.series.push(jsonObj);
                else if(i==1)
                    pie2.series.push(jsonObj);
                else if(i==2)
                    pie3.series.push(jsonObj);
                else if(i==3)
                    pie4.series.push(jsonObj);
                
                
            }
        }
        


        zingchart.render({
            id: 'pie1',
            data: pie1,
            height: '100%',
            width: "100%"
        });
        
        zingchart.render({
            id: 'pie2',
            data: pie2,
            height: '100%',
            width: "100%"
        });
        
        zingchart.render({
            id: 'pie3',
            data: pie3,
            height: '100%',
            width: "100%"
        });
        
        zingchart.render({
            id: 'pie4',
            data: pie4,
            height: '100%',
            width: "100%"
        });

        
    });            
	
   
    
    $('.graph').on('click', function(e) {
        
        var table = document.getElementsByClassName('UomTable')[0];
        var columns;
        columns = tableToArray(table);
        
            
        var plot1 = {
            "type": "bar",
            "plot": {
                "styles": ["red", "#ff6666", "#ff99cc", "#cc99ff", "#6699ff", "blue", "green", "black", "magenta", "yellow", "orange", "grey", "violet", "deeppink", "darkseagreen", "darkcyan"]
            },
            "title": {
                "text": "Height"
            },
            "scale-x": {
                "labels": []
            },
            "scale-y": {
                "values": ""
            },
            "series": [{
                "values": []
            }]
        };
        
        var plot2 = {
            "type": "bar",
            "plot": {
                "styles": ["red", "#ff6666", "#ff99cc", "#cc99ff", "#6699ff", "blue", "green", "black", "magenta", "yellow", "orange", "grey", "violet", "deeppink", "darkseagreen", "darkcyan"]
            },
            "title": {
            "text": "Score"
            },
            "scale-x": {
                "labels": []
            },
            "scale-y": {
                "values": ""
            },
            "series": [{
                "values": []
            }]
        };
        
        var plot3 = {
            "type": "bar",
            "plot": {
                "styles": ["red", "#ff6666", "#ff99cc", "#cc99ff", "#6699ff", "blue", "green", "black", "magenta", "yellow", "orange", "grey", "violet", "deeppink", "darkseagreen", "darkcyan"]
            },
            "title": {
                "text": "Income"
            },
            "scale-x": {
                "labels": []
            },
            "scale-y": {
                "values": ""
            },
            "series": [{
                "values": []
            }]
        };
        
        var plot4 = {
            "type": "bar",
            "plot": {
                "styles": ["red", "#ff6666", "#ff99cc", "#cc99ff", "#6699ff", "blue", "green", "black", "magenta", "yellow", "orange", "grey", "violet", "deeppink", "darkseagreen", "darkcyan"]
            },
            "title": {
                "text": "Age"
            },
            "scale-x": {
                "labels": []
            },
            "scale-y": {
                "values": ""
            },
            "series": [{
                "values": []
            }]
        };
        
        
        
        
        for(var i=0; i<columns.length; i++){
            var array = columns[i];
            for(var j=0; j<array.length; j++){
                if(i==0){
                    plot1["scale-x"].labels.push(""+(j+1));
                    plot1.series[0].values.push(array[j]);
                    plot1["scale-y"].values = "0:" + Math.max(...array) + ":" + (Math.max(...array)/array.length).toFixed(2) + "";
                }
                else if(i==1){
                    plot2["scale-x"].labels.push(""+(j+1));
                    plot2.series[0].values.push(array[j]);
                    plot2["scale-y"].values = "0:" + Math.max(...array) + ":" + (Math.max(...array)/array.length).toFixed(2) + "";
                }
                else if(i==2){
                    plot3["scale-x"].labels.push(""+(j+1));
                    plot3.series[0].values.push(array[j]);
                    plot3["scale-y"].values = "0:" + Math.max(...array) + ":" + (Math.max(...array)/array.length).toFixed(2) + "";
                }
                else if(i==3){
                    plot4["scale-x"].labels.push(""+(j+1));
                    plot4.series[0].values.push(array[j]);
                    plot4["scale-y"].values = "0:" + Math.max(...array) + ":" + (Math.max(...array)/array.length).toFixed(2) + "";
                }
                  
            }
        }
    
    
    
        zingchart.render({
            id: 'graph1',
            data: plot1,
            height: "100%",
            width: "100%"
        });
        
        
        zingchart.render({
            id: 'graph2',
            data: plot2,
            height: "100%",
            width: "100%"
        });
        
        zingchart.render({
            id: 'graph3',
            data: plot3,
            height: "100%",
            width: "100%"
        });
        
        zingchart.render({
            id: 'graph4',
            data: plot4,
            height: "100%",
            width: "100%"
        });
        
    });
    
    


    



    



    
    function tableToArray(pinakas){
        
        var genArray=[];
        var tr = pinakas.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        var temp = tr[0].getElementsByTagName("td");
        for (var i=0; i<temp.length-2; i++){
            var colArray=[];
            for (var j=0; j<tr.length; j++)
                colArray.push(Number(tr[j].getElementsByTagName("td")[i].getElementsByTagName("input")[0].value));
            genArray.push(colArray);
        }
        return genArray;
    }

 })();
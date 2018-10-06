(function() {
            

    
    $('.save').on('click', function(e) {  
        
        var title = prompt('Please enter your name');
        
        var table = document.getElementsByClassName('UomTable')[0];
        var columns;
        columns = tableToArray(table);
        
        var jsonObj = {};
        
        jsonObj ["title"] = title;
        
        for(var i=0; i<columns.length; i++){
            var array = columns[i];
                if(i==0)
                    jsonObj ["col1"] = array;
                else if(i==1)
                    jsonObj ["col2"] = array;
                else if(i==2)
                    jsonObj ["col3"] = array; 
                else if(i==3)
                    jsonObj ["col4"] = array;           
        }

        
        $.ajax({
            type: 'POST',
            url: 'AjaxScriptPost.php',
            data: {json: JSON.stringify(jsonObj)}
        }).done(function(){
            alert('Dataset Successfully Saved!');
        }).fail(function(){
            alert('A Problem Occured');
        });
        
    }); 
    
//    $('.flex-item').on('click', function(e){
//        var string = e.target.firstChild.innerText;
//        $.ajax({
//            type: 'POST',
//            url: 'AjaxScriptPost.php',
//            data: string
//        }).done(function(){
//            alert('Dataset Successfully Saved!');
//        }).fail(function(){
//            alert('A Problem Occured');
//        });
        
  

    
    
    
    
    
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
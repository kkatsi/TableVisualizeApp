(function () {
    'use strict';
    
var Arxtable = document.getElementsByClassName("UomTable");

// Loop για τον αριθμό των πινάκων className = "UomTable" καθώς το HTML μπορεί να έχει παραπάνω απο ένα πίνακες.

var k;
for(k=0; k<Arxtable.length; k++){

    var divHeight;
    //Δημιουργώ το table σαν global variable για ευκολότερη χρήση απο τις συναρτήσεις.
    window.table = Arxtable[k];
    //Έλεγχος του πίνακα.
    if (checkTable(table)){
    var thead = table.getElementsByTagName("thead")[0];
    var tbody = table.getElementsByTagName("tbody")[0];
    var headrows = thead.getElementsByTagName("tr");
    var bodyrows = tbody.getElementsByTagName("tr");
    var tfoot = table.getElementsByTagName("tfoot")[0];
    tfoot.insertRow(0);
    tfoot.insertRow(1);
    var footrows = tfoot.getElementsByTagName("tr");
    thead.style.fontWeight="bold";
    headrows[0].style.borderBottom = "1px solid";
    headrows[0].style.fontSize = "18px";
    table.style.borderCollapse = "collapse";
	footrows[0].style.borderTop = "1px solid"; 
    
    
   
    //Για τις ενέργειες που χρειάζονται να γίνουν στο thead.
    //Μορφοποίηση και εναλλαγή χρώματος ανάλογα με την επιλεγμένη στήλη.
    for(var i=0;i<headrows.length;i++){
        var htd = headrows[i].getElementsByTagName("td");
        for (var j=0; j<htd.length;j++){
            htd[j].style.padding = "10px";
            htd[j].style.textAlign = "center";
            htd[j].addEventListener("click", function(event) {  
                sortTable(event.target.cellIndex, table);
                event.target.style.backgroundColor = "orange";
                for(var m=0;m<htd.length;m++)
                    if(event.target != htd[m]){htd[m].style.backgroundColor = "";}    
            });
     
        }                 
    }

    //Για τις ενέργειες που χρειάζεται να γίνουν στο tbody.
    //Μορφοποίηση κελιών δημιουργία Inputs, και εικονιδίων.
    for( i=0;i<bodyrows.length;i++){
        var brdata = bodyrows[i].getElementsByTagName("td");
        for ( j=0; j<brdata.length;j++){
            brdata[j].style.padding = "10px";
            brdata[j].style.textAlign = "center";
            createInput(brdata[j]);
            if(i<2){footrows[i].insertCell(j);}
        }
        //Δημιουργία εικονιδίων αντιγραφής και διαγραφής.
        var cell1 = createCellforIcon(document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i]);
        var cell2 = createCellforIcon(document.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[i]);
        var imgdel = document.createElement("img");
        var imgcopy = document.createElement("img");
        imgcopy.src = "http://icons.iconarchive.com/icons/icons8/ios7/512/Very-Basic-Copy-icon.png";
        imgdel.src = "https://cdn2.iconfinder.com/data/icons/e-business-helper/240/627249-delete3-512.png";
        iconFormatter(imgcopy, cell1);
        iconFormatter(imgdel, cell2);
    }
    
    //Δημιουργούμε για πρώτη φορά τα Arrays με τις στήλες.
    var array = tableToArray(table);
    
    //Δίνουμε λειτουργικότητα στα κουμπιά αντιγραφής και διαγραφής.
    var length = bodyrows[0].getElementsByTagName("td").length;
    var divHeight = $('.tabNGraphs').height() - $('.newHeader').height();
    console.log(divHeight);
    for(var i=0; i<bodyrows.length; i++){
    
        var copycell = bodyrows[i].getElementsByTagName("td")[length-2];
        var delcell = bodyrows[i].getElementsByTagName("td")[length-1];
        copylistener(copycell,divHeight);
        dellistener(delcell);
        var brdata = bodyrows[i].getElementsByTagName("td");
        for(var j=0; j<brdata.length; j++){
            brdata[j].childNodes[0].onchange=changeInputEventHandler;
        }
    }
    
    var temp = footrows[0].getElementsByTagName("td");
    
    //Για τις ενέργειες που χρειάζεται να γίνουν στο tfoot.
    for(var j=0;j<temp.length;j++){
        for (var i=0;i<footrows.length;i++){
            var frdata = footrows[i].getElementsByTagName("td")[j];
            frdata.style.textAlign = "center";
            if(i==0){
                var select = document.createElement("select");
                frdata.appendChild(select);
                select.style.marginTop = "10px";
                createOption(select,"Max");
                createOption(select,"Min");
                createOption(select,"Avg");
                createOption(select,"Mode");
                createOption(select,"Median");
                createOption(select,"Range");
                createOption(select,"Variance");
                createOption(select,"StdDev");
                
            }
            else if(i==1){
                var p = document.createElement("p");
                frdata.appendChild(p);
            } 
            
        }
    }
    
    //Για την εμφάνιση των αποτελεσμάτων των προεπιλεγμένων τιμών του select με την φόρτωση της σελίδας.
    document.addEventListener('DOMContentLoaded',function() {
        calcSelectResults(); 
    },false);
    
    //Για την εμφάνιση των αποτελεσμάτων σύφμωνα με τις τιμές των select.
    for (var i=0; i<temp.length; i++){
        document.getElementsByTagName("select")[i].onchange=changeSelectEventHandler;
    }

    }
    
}
    
    
    //Ένας listener για το cloning γραμμής.
    function copylistener(copycell,divHeight){
        
            copycell.addEventListener("click", function(event){
                var currHeight = $('.UomTable').height();
                if(currHeight<divHeight){
                addRow(event.target);
                array = tableToArray(table);
                calcSelectResults();
                copycell = bodyrows[event.target.parentNode.parentNode.rowIndex-headrows.length-1].getElementsByTagName("td")[length-2];
                delcell = bodyrows[event.target.parentNode.parentNode.rowIndex-headrows.length-1].getElementsByTagName("td")[length-1];
                
                //Για τις νέες γραμμές που δημιουργούνται
                copylistener(copycell,divHeight);
                dellistener(delcell);
                currHeight = $('.UomTable').height();
                }
        } );
    }
    
    //Listener για την διαγραφή γραμμής.
    function dellistener(delcell){
        delcell.addEventListener("click", function(event){
            if(bodyrows.length>1){
                deleteRow(event.target);
                array = tableToArray(table);
                calcSelectResults();
                
            }
        } );
    }
    
    
    //Απεικόνηση στην οθόνη των αποτελεσμάτων με βάση την τιμή του select.
    function calcSelectResults(){
        for(var i=0;i<temp.length;i++){
                var value = document.getElementsByTagName("select")[i].value;
                var cellInd = i;
                document.getElementsByTagName("p")[cellInd].innerHTML = chooseOption(array[cellInd], value);
        }
    }
    
    //Ενέργειες που πραγματοποιούνται με την αλλαγή του value του select.
    function changeSelectEventHandler(event) {
        
        var cellInd = event.target.parentNode.cellIndex;
        document.getElementsByTagName("p")[cellInd].innerHTML = chooseOption(array[cellInd], event.target.value);
        
        }
    
    //Ενέργειες που πραγματοποιούνται με την αλλαγή της τιμής του input.
    function changeInputEventHandler(event) {
        
        array=tableToArray(table);
        var index = event.target.parentNode.cellIndex;
        var value = document.getElementsByTagName("select")[index].value;
        document.getElementsByTagName("p")[index].innerHTML = chooseOption(array[index], value);
        
        }
                
    //Επιστροφή κατάλληλης τιμής ανάλογα με το value του select.
    function chooseOption(array, index){
        
        switch (index){
            case "Max":
                return Math.max(...array);
            case "Min":
                return Math.min(...array);
            case "Mode":
                return mode(array);
            case "Avg":
                return avg(array);
            case "Median":
                return median(array);
            case "Range":
                return Number(Math.max(...array)) - Number(Math.min(...array));
            case "Variance":
                return variance(array);
            case "StdDev":
                return (Math.sqrt(variance(array))).toFixed(2);
                
                
        }
    }
    
    function avg(array){
        var sum =0;
        for(var i=0;i<array.length;i++){
            sum += parseFloat(array[i]);
        }
        return (sum/array.length).toFixed(2);
    }
    
    function variance(array){
        var sum = 0;
        var aver = avg(array);
        
        for(var i =0;i<array.length;i++){
            
            var sub = aver-Number(array[i]);
            
            var sq = Math.pow(sub,2);
            
            sum += sq;
        }
        return (sum/array.length).toFixed(2);
    }
    
    function median(values) {

    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return Number(values[half]);
    else
        return (Number(values[half-1]) + Number(values[half])) / 2;
    }
    
    //Σε περίπτωση που υπάρχει 'ισοπαλία' ανάμεσα στους αριθμούς και 2 ή παραπάνω (αριθμοί) εμφανίζονται πάνω απο 1 φορά, τότε ο αλγόριθμος τους εμφανίζει και τους 2. Εαν δεν υπάρχει καμία ομοιότητα τότε εμφανίζεται το σχετικό μήνυμα.
    function mode(array){
        if (array.length == 0)
                    return null;
                var modeMap = {},
                maxCount = 1, 
                modes = [];

                for(var i = 0; i < array.length; i++)
                {
                    var el = array[i];

                    if (modeMap[el] == null)
                        modeMap[el] = 1;
                    else
                        modeMap[el]++;
                    
                    if (modeMap[el] > maxCount)
                    {
                        modes = [el];
                        maxCount = modeMap[el];
                    }
                    else if (modeMap[el] == maxCount)
                    {
                        modes.push(el);
                        maxCount = modeMap[el];
                    }
                }
                if (modes.length == array.length){
                    return "No Result!"
                }
                else
                    return modes;
    }
    
    //Δημιουργία των νέων κελιών για την εισαγωγή των εικονιδίων αντιγραφής και διαγραφής.
    function createCellforIcon(tr){
        var cell = tr.insertCell(-1);
        cell.className = "icon";
        cell.width = "25px";
        return cell
    }
    
    //Δημιουργία των input elements και τοποθέτηση τους μέσα στα κελιά του πίνακα.
    function createInput(cell){
        var ninput = document.createElement("input");
        ninput.type = "number";
        ninput.value = cell.innerHTML;
        ninput.style.maxWidth = "60px";
        cell.innerText = "";
        cell.appendChild(ninput);
    }
    
    //Διπλασιασμός γραμμής. 
    function addRow(ele) { 
        var x=document.getElementsByTagName("tbody")[0];  
        var row = ele.parentNode.parentNode;
        var node=row.cloneNode(true);    
        x.insertBefore(node,row);   
    } 
    
    //Διαγραφή γραμμής.
    function deleteRow(ele) {
        if(ele.tagName == "IMG"){
            var row = ele.parentNode.parentNode;
            row.parentNode.removeChild(row);
        }
    }
 
    //Μετατροπή του πίνακα, σε Array. Το Array αυτό περιέχει άλλα array με τα στοιχεία της κάθε στήλης του πίνακα.
    function tableToArray(pinakas){
        
        var genArray=[];
        var tr = pinakas.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
        var temp = tr[0].getElementsByTagName("td");
        for (var i=0; i<temp.length-2; i++){
            var colArray=[];
            for (var j=0; j<tr.length; j++)
                colArray.push(tr[j].getElementsByTagName("td")[i].getElementsByTagName("input")[0].value);
            genArray.push(colArray);
        }
        return genArray;
    }
    
    //Αλγόριθμος ταξινόμησης του πίνακα, απο το W3C.
    function sortTable(n, pinakas) {
        
  var tab, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  tab = pinakas.getElementsByTagName("tbody")[0];
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = tab.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 0; i < rows.length-1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n].getElementsByTagName("input")[0];
      y = rows[i+1].getElementsByTagName("TD")[n].getElementsByTagName("input")[0];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (Number(x.value) > Number(y.value)) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (Number(x.value) < Number(y.value)) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
    
    //Συνάρτηση για μορφοποίηση και τοποθέτηση των εικονιδίων στα κελιά.
    function iconFormatter(ele,cell){
        ele.style.display = "block";
        ele.style.width = "80%";
        ele.style.height = "auto";
        cell.appendChild(ele);
    }
    
    //Συνάρτηση για δημιουργία νέου Option στο Select element.
    function createOption(select, value){
        var z = document.createElement("option");
        z.setAttribute("value", value);
        var t = document.createTextNode(value);
        z.appendChild(t);
        select.appendChild(z);
    }
    
    //Έλεγχος για το αν ο πίνακας περιέχει μόνο αριθμούς.
    function checkTable(tab){
        var body = tab.getElementsByTagName("tbody")[0];
        var rows = body.getElementsByTagName("tr");
        for(var i=0; i<rows.length; i++){
            var cells = rows[i].getElementsByTagName("td");
            for(var j=0; j<cells.length; j++){
                if(!(cells[j].innerText).match("^[0-9.]+$")){
                   console.log("Table must contain only numbers");
                    return false;
                } 
            }
        }
        return true;
            
    }
    
    
}());
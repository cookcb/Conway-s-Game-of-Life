$(document).ready(function () {
    var cycles;
    var view;
    var border_effect;
    var timer; 
    var selecter = document.getElementById("borderOptions");
    var radius = 1; 
    var lonliness = 2; 
    var overPopulation = 3;
    var gMin = 3;
    var gMax = 3;
    var nextEnable = true;
    
    $("#record").on('click', function(e) {
        var width = $("#width-input").val(); 
        var height = $("#height-input").val(); 
        var table = document.getElementById("grid");
        $("#grid tr").remove();
        view = new Array(height);
        for(i = 0; i < height; i++){
            var row = table.appendChild(document.createElement('tr'));
            view[i] = new Array(width);
            for(j = 0; j < width; j++){
                var cell = row.appendChild(document.createElement('td'));
                view[i][j] = "dead";
           }
        }
        $("#width_td").html(width);
        $("#height_td").html(height);
        $("#radius_td").html(radius);
        $("#o_td").html(overPopulation);
        $("#l_td").html(lonliness);
        $("#gMin_td").html(gMin);
        $("#gMax_td").html(gMax);
        
   });   
   $("#Clear").on('click', function(e) {
       var table = document.getElementById("grid");
        for(i = 0; i < table.rows.length; i++){
            for(j = 0; j < table.rows[0].cells.length; j++){
                table.rows[i].cells[j].style.background =  "#FF0000";
                view[i][j] = "dead";
            }     
        }   
       //alert(table.rows[0].cells.length);
   });
   $(document).on('click', 'td', function (e){
      var col = $(this).closest("td").index();
      var row = $(this).closest("tr").index();
      if(e.ctrlKey){
          if(view[row][col] == "alive"){
           $(this).css('background-color', '#FF0000');
            view[row][col] = "dead";
          }
      }else if(e.shiftKey){
          if(view[row][col] == "dead"){
            $(this).css('background-color', '#C3C3C3');
            view[row][col] = "alive"; 
          }
      }else{
          if(view[row][col] == "dead"){
            $(this).css('background-color', '#C3C3C3');
            view[row][col] = "alive"; 
          }else{
            $(this).css('background-color', '#FF0000');
            view[row][col] = "dead";   
          }
        }
   });
   $("#Next").on('click', function(e) {
       var rows = document.getElementById("grid").rows.length;
       var cols = document.getElementById("grid").rows[0].cells.length;
       var table = document.getElementById("grid");
       if(nextEnable === true){
        border_effect = selecter.options[selecter.selectedIndex].text;
        step(rows, cols, table, view, border_effect, radius, lonliness, overPopulation, gMin, gMax);
       }
   });
   $("#Start").on('click', function(e){
       nextEnable = false;
       var rows = document.getElementById("grid").rows.length;
       var cols = document.getElementById("grid").rows[0].cells.length;
       var table = document.getElementById("grid");
       var current_speed = document.getElementById("Speed").value;  
       border_effect = selecter.options[selecter.selectedIndex].text;
       timer = setInterval(function(){ step(rows, cols, table, view, border_effect, radius, lonliness, overPopulation, gMin, gMax)}, current_speed);
       
   });
   $("#Stop").on('click', function(e){
       clearInterval(timer);
       nextEnable = true;
   });
   $("#Random").on('click', function(e){
       var rows = document.getElementById("grid").rows.length;
       var cols = document.getElementById("grid").rows[0].cells.length;
       var table = document.getElementById("grid");
       randomize(rows, cols, table, view)
   });
   $("#SaveRules").on('click', function(e){
        if(document.getElementById("radius-input").value !== ""){
            radius = parseInt(document.getElementById("radius-input").value);
        }else{
            radius = 1;   
        }
       var measure = (4*radius*radius) + (4*radius);
        if($("#OverPopulation-input").val() < measure && $("#OverPopulation-input").val() !== ""){
            overPopulation = $("#OverPopulation-input").val(); 
        }else{
            overPopulation = 3;
        }
       
        if($("#Lonliness-input").val() <= overPopulation && $("#Lonliness-input").val() !== ""){
            lonliness = $("#Lonliness-input").val();
        }else{    
            lonliness = 2;
        }
    
        if($("#genMax-input").val() < measure && $("#genMax-input").val() !== ""){
            gMax = $("#genMax-input ").val();
        }else{
            gMax = 3;
        }
       
       if($("#genMin-input").val() <= gMax && $("#genMin-input").val() !== ""){
            gMin = $("#genMin-input ").val();
        }else{
            gMin = 3;
        }
   });
});
//var x = document.getElementById("mySelect").options[0].text;

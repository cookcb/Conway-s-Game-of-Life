function randomize(rowNum, colNum, grid, model){
    ranNum = Math.floor((Math.random() * 10) + 1);
    var to_alive = new Array();
    var to_dead = new Array();
    for(i = 0; i < rowNum; i++){
        for(j = 0; j <colNum; j++){
            if(model[i][j] == "alive"){
                 ranNum = Math.floor((Math.random() * 10) + 1);
                 if(ranNum > 6){
                     model[i][j] = "dead";
                     to_dead.push({x:i, y:j});
                 }
            }
            if(model[i][j] == "dead"){
                 ranNum = Math.floor((Math.random() * 10) + 1);
                 if(ranNum <= 5){
                     model[i][j] = "alive";
                     to_alive.push({x:i, y:j});
                 }
            }
        }
    }
    for(w = 0; w < to_alive.length; w++){
             
             var row = to_alive[w].x;   
             var col = to_alive[w].y; 
             grid.rows[row].cells[col].style.background =  "#C3C3C3";
    }
    for(w = 0; w < to_dead.length; w++){
            var row = to_dead[w].x;   
            var col = to_dead[w].y;
            grid.rows[row].cells[col].style.background =  "#FF0000";
    }
}
function step(rowNum, colNum, grid, model, border, r, l, o, gMin, gMax){
    var now_alive = new Array();
    var now_dead = new Array();
    //r = parseInt(r);
    for(i = 0; i < rowNum; i++){                       //Go through each cell
           for(j = 0; j < colNum; j++){
               //i = parseInt(i);
               //j = parseInt(j);
               var alive_count = 0;
               if(model[i][j] == "alive"){         //Initially alive cells                   
                   for(k = i - r; k <= i + r; k++){
                       for(g = j - r; g <= j + r; g++){
                           console.log("K: " + k + " G: " + g);
                           if((g < 0 || g > colNum-1) || (k < 0 || k > rowNum-1)){       //Imaginary cells outside of the grid (greater than the max num of cols/less than zero)
                               if(border === "Always Alive"){
                                 alive_count = alive_count + 1;   
                                }else if(border === "Always Dead"){
                                    
                                }else{
                                  if(k < 0 && (k + rowNum  < rowNum)){
                                      if((g >= 0 && g < colNum-1) && model[k + rowNum][g] == "alive"){
                                        alive_count = alive_count + 1;
                                      }else if(g < 0 && model[k + rowNum][g + colNum] == "alive"){
                                        alive_count = alive_count + 1;  
                                      }else if(g > colNum-1 && model[k + rowNum][g - colNum] == "alive"){
                                         alive_count = alive_count + 1; 
                                      }
                                  }else if(k > rowNum-1 && (k - rowNum >= 0)){
                                      if((g >= 0 && g < colNum-1) && model[k - rowNum][g] == "alive"){
                                        alive_count = alive_count + 1;
                                      }else if(g < 0 && model[k - rowNum][g + colNum] == "alive"){
                                        alive_count = alive_count + 1;  
                                      }else if(g > colNum-1 && model[k - rowNum][g - colNum] == "alive"){
                                         alive_count = alive_count + 1; 
                                      }
                                  }else if(g < 0 && (g + colNum < colNum)){
                                      if((k >= 0 && k < rowNum-1) && model[k][g + colNum] == "alive"){
                                        alive_count = alive_count + 1;
                                      }else if(k < 0 && model[k + rowNum][g + colNum] == "alive"){
                                        alive_count = alive_count + 1;  
                                      }else if(k > rowNum-1 && model[k - rowNum][g + colNum] == "alive"){
                                         alive_count = alive_count + 1; 
                                      }
                                  }else if(g > colNum-1 && (g - colNum >= 0)){
                                      if((k >= 0 && k < rowNum-1) && model[k][g - colNum] == "alive"){
                                        alive_count = alive_count + 1;
                                      }else if(k < 0 && model[k + rowNum][g - colNum] == "alive"){
                                        alive_count = alive_count + 1;  
                                      }else if(k > rowNum-1 && model[k - rowNum][g - colNum] == "alive"){
                                         alive_count = alive_count + 1;  
                                      }
                                  }
                                }
                           }
                           else if (k == i && g == j){
                               
                           }
                          //console.log("Current Position: (" + k + ", " + g + ")" + model[k][g])
                          else if (model[k][g] == "alive"){
                            alive_count = alive_count + 1;   
                          }
                        }    
                   }
                   if(alive_count < l){
                    //model[i][j] = "dead";
                    now_dead.push({x:i, y:j});
                    console.log("Now Dead: (" + i + ", " + j + ")" + "alive count of " + alive_count);
                   }
                   if(alive_count > o){
                    //model[i][j] = "dead";   
                    now_dead.push({x:i, y:j});
                    console.log("Now Dead: (" + i + ", " + j + ")") + "alive count of " + alive_count;
                   }
               }else{                                   //Initially dead cells
                   for(k = i - r; k <= i + r; k++){
                       var limit = i + r;
                       //console.log(limit);
                       for(g = j - r; g <= j + r; g++){
                           //console.log("K: " + k + " G: " + g);
                           if((g < 0 || g > colNum-1) || (k < 0 || k > rowNum-1)){       //Imaginary cells outside of the grid (greater than the max num of cols/less than zero)                       
                               if(border === "Always Alive"){
                                 alive_count = alive_count + 1;   
                                }else if(border === "Always Dead"){
                                    
                                }else{
                                  if(k < 0 && (k + rowNum  < rowNum)){
                                      if((g >= 0 && g < colNum-1) && model[k + rowNum][g] == "alive"){
                                        alive_count = alive_count + 1;
                                      }else if(g < 0 && model[k + rowNum][g + colNum] == "alive"){
                                        alive_count = alive_count + 1;  
                                      }else if(g > colNum-1 && model[k + rowNum][g - colNum] == "alive"){
                                         alive_count = alive_count + 1; 
                                      }
                                  }else if(k > rowNum-1 && (k - rowNum >= 0)){
                                      if((g >= 0 && g < colNum-1) && model[k - rowNum][g] == "alive"){
                                        alive_count = alive_count + 1;
                                      }else if(g < 0 && model[k - rowNum][g + colNum] == "alive"){
                                        alive_count = alive_count + 1;  
                                      }else if(g > colNum-1 && model[k - rowNum][g - colNum] == "alive"){
                                         alive_count = alive_count + 1; 
                                      }
                                  }else if(g < 0 && (g + colNum < colNum)){
                                      if((k >= 0 && k < rowNum-1) && model[k][g + colNum] == "alive"){
                                        alive_count = alive_count + 1;
                                      }else if(k < 0 && model[k + rowNum][g + colNum] == "alive"){
                                        alive_count = alive_count + 1;  
                                      }else if(k > rowNum-1 && model[k - rowNum][g + colNum] == "alive"){
                                         alive_count = alive_count + 1; 
                                      }
                                  }else if(g > colNum-1 && (g - colNum >= 0)){
                                      if((k >= 0 && k < rowNum-1) && model[k][g - colNum] == "alive"){
                                        alive_count = alive_count + 1;
                                      }else if(k < 0 && model[k + rowNum][g - colNum] == "alive"){
                                        alive_count = alive_count + 1;  
                                      }else if(k > rowNum-1 && model[k - rowNum][g - colNum] == "alive"){
                                         alive_count = alive_count + 1;  
                                      }
                                  }
                                }
                           }
                           else if(k == i && g == j){
                               
                           }
                           else if(model[k][g] == "alive"){
                            alive_count = alive_count + 1; 

                            console.log("Alive: " + k + ", " + g + ")")   
                          }
                          
                        }    
                   }
                   if(alive_count >= gMin && alive_count <= gMax){
                    //model[i][j] = "alive"; 
                    now_alive.push({x:i, y:j});
                    console.log("Now Alive: (" + i + ", " + j + ")")
                    
                   }
               }
           }
       }
        for(w = 0; w < now_alive.length; w++){
             
             var row = now_alive[w].x;   
             var col = now_alive[w].y;
             model[row][col] = "alive"; 
             grid.rows[row].cells[col].style.background =  "#C3C3C3";
        }
        for(w = 0; w < now_dead.length; w++){
             var row = now_dead[w].x;   
             var col = now_dead[w].y;
             model[row][col] = "dead";
             grid.rows[row].cells[col].style.background =  "#000000";
        }
//       for(w = 0; w < rowNum; w++){
//           //alert("TESTESTEST");
//            for(z = 0; z < colNum; z++){
//                if(model[w][z] == "dead"){
//                    grid.rows[w].cells[z].style.background =  "#FF0000";
//                }
//                if(model[w][z] == "alive"){
//                    grid.rows[w].cells[z].style.background =  "#C3C3C3";
//                }
//        }   
//       }
}

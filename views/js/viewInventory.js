//decode to specific sector and warehouse
function loadInventory(num){
  let warehouse =0;
  let sector = 0;
  let preid = 0;
  switch(num) {
    case 1:
      warehouse = 1;
      sector =1;
      preid = 100;
      break;
    case 2:
      sector = 1;
      warehouse =2;
      preid = 200;
      break;
    case 3:
      warehouse =1;
      sector = 2;
      preid = 300;
      break;
    case 4:
      warehouse =2;
      sector = 2;
      preid = 400;
          break;
    default:
      console.log("Invalid Selection")
  }


    // xhr request to get all in a specific sector & warehouse
    let xhr = new XMLHttpRequest();
    let str = 'sector='+sector+'&warehouse=' + warehouse;
    xhr.open('GET', 'http://localhost:8084/view/?' + str, true);
    const header = `<h2>SECTOR ${sector} : Warehouse ${warehouse}</h2><h4><u>Current Inventory Total : `;
    xhr.onload = function(){
        if (this.status == 200){
            let count = 0;
            let users = JSON.parse(this.responseText);
            let output = '<table><tr><th>Item #</th><th>Material Name</th><th>Description</th><th>Quantity</th></tr>';
            for(var i in users){
              if((users[i].Sector == sector)&& (users[i].Warehouse == warehouse) && (users[i].Quantity != 0) && (users[i].Quantity != null)){
                  output += '<tr> <td>' + (users[i]._id -preid)
                  + '</td><td>' + users[i].Material 
                  + '</td><td> Yet another rare material' 
                  + '</td><td>' + users[i].Quantity +
                    '</td></tr>';
                  }count += users[i].Quantity;
            }
            output += '</table>';
            document.getElementById('data').innerHTML =  output;
            document.getElementById('form-header').innerHTML = header +count + '/999</u></h4>' ;
        }
    }
    xhr.send();
}
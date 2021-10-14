//set function to ADD/DELETE/UPDATE
function setFunction(method){
    document.getElementById('form-function').value = method;
    selectSector()
}





// set sector, warehouse, material , quantity
function setSector(sector){
    document.getElementById('form-sector').value = sector;
}

function setWarehouse(warehouse){
    document.getElementById('form-warehouse').value = warehouse;
}

function setMaterial(material){
    document.getElementById('form-material').value = material;
}

function setQuantity(quantity){
    document.getElementById('form-quantity').value = quantity;
}

function setId(id){
    document.getElementById('form-id').value = id;
}




// Select Sector for CRUD
function selectSector(){
    let next = '<button onclick="setSector(1);selectWarehouse();">Sector 1</button> <button onclick="setSector(2);selectWarehouse();">Sector2</button>'
    document.getElementById('data').innerHTML = '<h2>Please select the Sector to ' + document.getElementById('form-function').value.toUpperCase()  +  ' a material:</h2><br><br>' + next;
    document.getElementById('form-header').innerHTML = '<h1>Inventory Management</h1>';
}

//Select Warehouse for CRUD
function selectWarehouse(){
    let next = '<button onclick="setWarehouse(1); selectMaterial();">Warehouse 1</button> <button onclick="setWarehouse(2);selectMaterial();">Warehouse 2</button>'
    document.getElementById('data').innerHTML = '<h2>Please select the Warehouse to '+ document.getElementById('form-function').value.toUpperCase()  +' a material:</h2><br><br>' +next;
}

//Set Max

function setMax(body){
    let count = 0;
    for(var i in body){
        count += body[i].Quantity;
    }
    let offset =999-count;
    if((count == 999) && (document.getElementById('form-function').value == 'Add' )){
        document.getElementById('set-max').value = 0;
        document.getElementById('form-header').innerHTML = '<h3>Inventory is at MAX capacity of 999</h3>'
        document.getElementById('data').innerHTML =' ';
    }else if(offset >= 99){
        document.getElementById('set-max').value = 99;
    }else{
        document.getElementById('set-max').value = offset;
    }
    
}

//Select Material to display 
function selectMaterial(){
    let sector = document.getElementById('form-sector').value ;
    let warehouse = document.getElementById('form-warehouse').value ;
    let str = 'sector='+sector+'&warehouse=' + warehouse;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8084/view/?' +str, true);
    document.getElementById('form-header').innerHTML = '<h2>Please select a Material to ' + document.getElementById('form-function').value +'</h2><br><br>';
    xhr.onload = function(){
        if (this.status == 200){
            var body = JSON.parse(this.responseText);
            var output = '';
            whattodo = document.getElementById('form-function').value;
            if(whattodo == 'Update' || whattodo == 'Delete') {
                document.getElementById('data').innerHTML = output + updateDelete(body);
            }else{
                document.getElementById('data').innerHTML = output + selectAdd(body);
            }
            setMax(body);
        }
    }
    xhr.send();
} 


//Create List of Material to Add
function selectAdd(body){
    output ='';
    let count =0;
    for(var i in body){
        if(body[i].Quantity == 0 || body[i].Quantity == null){
               output += '<button onclick="setMaterial(\'' + body[i].Material + '\');' + 'setId(\'' + body[i]._id + '\');' +'addForm()">'+ body[i].Material +'</button>' 
               count +=1;                
              }
        if(count == 0){
            return '<h2>All material types already existed in this Warehouse</h2>'
        }
      } return output;
}


//Create list of existing material to Update or Remove
function updateDelete(body){
    output ='';
    for(var i in body){
        if(body[i].Quantity != 0){
               output +=  '<button onclick="setMaterial(\'' + body[i].Material + '\');' + 'setQuantity(\'' + body[i].Quantity + '\');' + 'setId(\'' + body[i]._id + '\');' +'selectConfirmation()">'+ body[i].Material +'</button>'               
              }
      } return output;
}

function selectConfirmation(){
    if(document.getElementById('form-function').value == 'Delete'){
        DeleteConfirmation();
    }else{
        UpdateConfirmation();
    }
}



// Delete Functions
function DeleteConfirmation(){
    document.getElementById('form-header').innerHTML = '<h3>Please confirm the deletion of ' + document.getElementById('form-material').value + '</h3>';
    document.getElementById('data').innerHTML = '<h4>Do you want to proceed?</h4><br> <button onclick="setFunction(\'Delete\')">Cancel</button><button id="add-confirm" onclick="deleteM(); loadUpdate();">'+ document.getElementById('form-function').value +'</button>'
    setQuantity(0);
}

function deleteM(){
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'http://localhost:8084/inv/del', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function() { 
        if(xhr.status == 201) {
            document.getElementById('data').innerHTML =this.responseText;
        }
    }
    let str = "_id="+ parseInt(document.getElementById('form-id').value) + "&Quantity="+document.getElementById('form-quantity').value;
    xhr.send(str);
}



// Update Functions
function UpdateConfirmation(){
    var output = '<form id="update-material" action="/signup" method="POST"><input type="number" id="iQuantity" REQUIRED name="iquantity" min="1" max="' + updateMax()  +'"> <br><br><br><br><button type="submit" role="button" >Submit</button></form>'
    document.getElementById('data').innerHTML = output;
    document.getElementById('form-header').innerHTML = '<h4>Material : ' + document.getElementById('form-material').value +'<br>'+
    'Current Quantity : '+ document.getElementById('form-quantity').value +' <br> Warehouse : 1 <br> Sector : 1 <br><br><br> Please Enter a New Quantity(1-'+ updateMax() +')</h4>';
    confirmation();
}

function updateMax(){
    let max = parseInt(document.getElementById("set-max").value);
    let mat = parseInt(document.getElementById("form-quantity").value);
    if((max + mat) >= 99){
        return 99;
    }else if((max+mat) >=1){
        return max+mat;
    }

}

function confirmation(){
    const form = document.querySelector('#update-material');
    form.addEventListener('submit', (event) => {
        // disable default action
        event.preventDefault();
        // prepare form data
        let data = new FormData(form);
        setQuantity(data.get('iquantity'));
        let confirm = '<h4>Do you want to proceed?</h4><br> <button onclick="setFunction(\'Update\')">CANCEL</button><button id="add-confirm" onclick="updateMaterial(); loadUpdate();">UPDATE</button>';
        let output ="<h4><br><br><br>New Quanity for "+ document.getElementById('form-material').value + ' : '+ document.getElementById('form-quantity').value + '</h4>';
        document.getElementById('data').innerHTML = confirm;
        document.getElementById('form-header').innerHTML = output;

        })
}

function updateMaterial(){
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://localhost:8084/inv/update', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {  //Call a function when the state changes.
        if(xhr.status == 201) {
            document.getElementById('data').innerHTML =this.responseText;
        }
    }
    let str = "_id="+ parseInt(document.getElementById('form-id').value) + "&Quantity="+document.getElementById('form-quantity').value;
    xhr.send(str);
    
}


//Add Functions

function addForm(){
    var output = '<form id="add-material" action="/signup" method="POST"><input type="number" id="iQuantity" REQUIRED name="iquantity" min="1" max="' + document.getElementById("set-max").value + '"> <br><br><button type="submit" role="button" >Submit</button></form>'
    document.getElementById('data').innerHTML = output;
    document.getElementById('form-header').innerHTML = '<h4>New Material : ' + document.getElementById('form-material').value +'<br>'+
    '<h4>Please Specify the number of ' + document.getElementById('form-material').value+ ' you would like to ADD (<=' +document.getElementById("set-max").value+')</h4><br>'
    addConfirmation();
}

function addConfirmation(){
    const form = document.querySelector('#add-material');
    form.addEventListener('submit', (event) => {

        // disable default action
        event.preventDefault();
        // prepare form data
        let data = new FormData(form);
        setQuantity(data.get('iquantity'));
        let confirm = '<h4>Do you want to proceed?</h4><br> <button onclick="setFunction(\'Add\')">CANCEL</button><button id="add-confirm" onclick="addMaterial();">ADD</button>'
        let output ="<br><br><h3>New Quantity for "+ document.getElementById('form-material').value + ' : '+ document.getElementById('form-quantity').value + '</h3><br>'
        document.getElementById('data').innerHTML = confirm;
        document.getElementById('form-header').innerHTML = output;  
        })
}

function addMaterial(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8084/inv/add', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {  //Call a function when the state changes.
        if(xhr.status == 201) {
            document.getElementById('data').innerHTML =this.responseText;
        }
    }
    let str = "_id="+ parseInt(document.getElementById('form-id').value) + "&Quantity="+document.getElementById('form-quantity').value;
    xhr.send(str);
    
}

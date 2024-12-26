var webName = document.getElementById("siteName");
var webLink = document.getElementById("siteURL");



var list = []
if(localStorage.getItem("inputs") == null){
    list = [];
}else {
    list = JSON.parse(localStorage.getItem("inputs"))
    displayLink()
}


function addLink() {
    
    validateLinkName();
    validateurl();

    
    const isNameValid = document.getElementById("siteName").classList.contains("is-valid");
    const isURLValid = document.getElementById("siteURL").classList.contains("is-valid");

    if (!isNameValid || !isURLValid) {
        return;
    }

    
    const isDuplicate = list.some(item => item.code.toLowerCase() === webName.value.trim().toLowerCase());
    if (isDuplicate) {
        alert("This website name already exists!");
        return;
    }

    
    var website = {
        code: webName.value,
        url: webLink.value,
    };

    
    list.push(website);
    localStorage.setItem("inputs", JSON.stringify(list));
    displayLink();
    clearLink();
}


function clearLink(){
    webName.value = null
    webLink.value = null

}

function deleteLink(deletedLink){
    list.splice(deletedLink,1);
    displayLink()
    localStorage.setItem("inputs" , JSON.stringify(list));
    
}

function displayLink(){
    var cartona = "";

    for(var i =0; i < list.length; i++){
        cartona += `<tr>
          <th id="tableIndex" scope="row">${i+1}</th>
          <td id="tableName">${list[i].code}</td>
          <td><button onclick="window.location.href = '${list[i].url}'" id="visit" class="btn btn-warning px-3 py-1"><i class="fa-solid fa-eye"></i> Visit</button></td>
          <td><button onClick="deleteLink(${i})" id="delete" class="btn btn-danger px-4 py-1"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>`
    }

    document.getElementById("myRow").innerHTML = cartona
}

function validateLinkName(){
    var regex = /^[A-Z][a-z]{2,}$/;
    var text = webName.value;

    var result = regex.test(text);

    if (result == true){
        document.getElementById("siteName").classList.add("is-valid")
        document.getElementById("siteName").classList.remove("is-invalid")

        document.getElementById("siteName").nextElementSibling.classList.add("d-none")
        
    }else{
        document.getElementById("siteName").classList.remove("is-valid")
        document.getElementById("siteName").classList.add("is-invalid")

        document.getElementById("siteName").nextElementSibling.classList.remove("d-none")
        
    }

}

function validateurl(){
        const regex = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;

    
        var text = webLink.value;

        var result = regex.test(text);

        if (result == true){
        document.getElementById("siteURL").classList.add("is-valid")
        document.getElementById("siteURL").classList.remove("is-invalid")

        document.getElementById("siteURL").nextElementSibling.classList.add("d-none")
        }else{
        document.getElementById("siteURL").classList.remove("is-valid")
        document.getElementById("siteURL").classList.add("is-invalid")
         
        document.getElementById("siteURL").nextElementSibling.classList.remove("d-none")
        
    }
}
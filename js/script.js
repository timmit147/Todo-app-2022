// Functions

// Function check if you are a new user eles create a new list
function addTutorial() {
    if(localStorage.getItem("new") == 1){
        // do nothing
    }
    else{
        const list = { 'Double tap to add new item': {},'Click item to open folder':{} };
        localStorage.setItem("data", JSON.stringify(list));
        localStorage.setItem("new", 1);
    }
}

// Function get localStorage data in list
function createList() {
    const list = JSON.parse(localStorage.getItem("data"));
    document.querySelector("ul").innerHTML = "";
    for (key in list) {
        const ul = document.querySelector("ul");
        const li = document.createElement("li");
        li.appendChild(document.createTextNode(key));
        ul.appendChild(li);
    }
}

//   Add new input
function newInput(){
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    ul.appendChild(li);
    const form = document.createElement("form");
    form.setAttribute("onSubmit", "return mySubmitFunction(event)");
    li.appendChild(form);
    const input = document.createElement("input");
    form.appendChild(input);
    input.select();
}

// Double tap to add input
document.body.addEventListener("dblclick", event => {
    newInput();
})

// Double space
document.body.addEventListener("dblclick", event => {
    newInput();
})



//   prevent submit
  function mySubmitFunction(e) {
    e.preventDefault();
    newListitem();
    return false;
}

// Add new item to list
  function newListitem() {
    const list = JSON.parse(localStorage.getItem("data"));
    list[document.querySelector("input").value] = { 'hoi2':'test2'};
    if(document.querySelector("input").value == ""){
        var select = document.querySelector('ul');
  select.removeChild(select.lastChild);
        return;
    }
    localStorage.setItem("data", JSON.stringify(list));
    createList();
    newInput();
  }

  


// Activate functions

// Create a list
addTutorial();

// Add li to ul
createList();








// old
// console.log(NewList[Object.keys(NewList)[0]]); 
// console.log(NewList[Object.keys(NewList)[1]]); 
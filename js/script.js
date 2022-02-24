// Functions

// Function check if you are a new user eles create a new list
function startScript() {
    if(localStorage.getItem("new") == 1){
        // do nothing
    }
    else{
        const list = { 'Double tap to add new item': {},'Click item to open folder':{} };
        localStorage.setItem("data", JSON.stringify(list));
        localStorage.setItem("new", 1);
    }
    createList();
}

// Activate script
startScript();

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
    addDrag();
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
    if(!document.querySelector("form")){
        newInput();
    }
    else{
        document.querySelector("input").select();
    }
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

//   Add drag to all li items
function addDrag(){
    const box = document.querySelectorAll("li");
    var startx;
    var starty;
    var movex;
    var movey;

    for (let i = 0; i < box.length; i++) {
        box[i].addEventListener('touchstart', function(e){
            const touchobj = e.changedTouches[0]; 
        startx = parseInt(touchobj.clientX); 
        starty = parseInt(touchobj.clientY); 
        }, false);

        box[i].addEventListener('touchmove', function(e){
        const touchobj = e.changedTouches[0]; 
        movex = parseInt(touchobj.clientX); 
        movey = parseInt(touchobj.clientY); 
        box[i].style.left = (movex - startx + 30) + "px";
        box[i].style.top = movey + "px";
        box[i].style.position = "fixed";
        if(box.length != i+1){
            box[i+1].style.paddingTop = "28px";
        }
        if(movex > window.innerWidth - 50){
            box[i].style.opacity = "0.5";
            document.querySelector('body').style.boxShadow = "inset  -75px 9px 26px -62px white";
        }
        else{
            box[i].style.opacity = "1";
            document.querySelector('body').style.boxShadow = "unset";
        }

        for (let n = 0; n < i; n++) {
            if(movey < starty - 30*(n+1) ){
                box[(i-1)-n].style.paddingTop = "28px";
                box[(i)-n].style.paddingTop = "unset";
                if(box[i+1]){
                    box[i+1].style.paddingTop = "0px";
                }
                // console.log("test");
            }
            else{
                box[(i-1)-n].style.paddingTop = "unset";
            }
            // if(movey > starty + 30*(n+1) ){
            //     console.log("test");
            //     box[(i+1)+n].style.paddingBottom = "28px";
            //     // box[(i)+n].style.paddingBottom = "unset";
            //     // if(box[i-1]){
            //     //     box[i-1].style.paddingBottom = "0px";
            //     // }
            // }
            // else{
            //     box[(i+1)+n].style.paddingBottom = "unset";
            // }
          }

        }, false);

        box[i].addEventListener('touchend', function(e){
            box[i].style.position = "unset"
            if(box.length != i+1){
                box[i+1].style.paddingTop = "unset";
            }
            if(movex > window.innerWidth - 50){
                const list = JSON.parse(localStorage.getItem("data"));
                delete list[box[i].innerHTML];
                localStorage.setItem("data", JSON.stringify(list));
                createList();
                document.querySelector('body').style.boxShadow = "unset";
            }
        }, false);
    }
}
 







// old
// console.log(NewList[Object.keys(NewList)[0]]); 
// console.log(NewList[Object.keys(NewList)[1]]); 
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

var n = 0;
var testa = 0;
//   Add drag to all li items
function addDrag(){
    const box = document.querySelectorAll("li");
    var startx;
    var starty;
    var movex;
    var movey;

    for (let i = 0; i < box.length; i++) {
        box[i].addEventListener('touchstart', function(e){
            n = i;
            const touchobj = e.changedTouches[0]; 
        startx = parseInt(touchobj.clientX); 
        starty = parseInt(touchobj.clientY); 
        testa = startx;
        if(box[i+1]){
            if(i == n+1){
                n++;
            }
            box[n+1].style.paddingTop = "28px";
        }
        box[i].style.position = "fixed";
        }, false);

        box[i].addEventListener('touchmove', function(e){
        const touchobj = e.changedTouches[0]; 
        movex = parseInt(touchobj.clientX); 
        movey = parseInt(touchobj.clientY); 
        box[i].style.left = (movex - startx + 30) + "px";
        box[i].style.top = (movey - 10) + "px";
        box[i].style.position = "fixed";
        if(movex > window.innerWidth - 50){
            box[i].style.opacity = "0.5";
            document.querySelector('body').style.boxShadow = "inset  -75px 9px 26px -62px white";
        }
        else{
            box[i].style.opacity = "1";
            document.querySelector('body').style.boxShadow = "unset";
        }
        console.log(i);
        if(testa + 20 < movey){
            n++;
            testa = movey;
            if(n == i){
                n++;
            }
            if(box[n]){
                box[n].style.paddingTop = "0px";
            }
            if(box[n+1]){
                box[n+1].style.paddingTop = "28px";   
            }
            
        }

        // if(testa - 20 > movey){ 
        //     console.log("test");
        //     box[n].style.backgroundColor = "red"; 
        //     n--;
        //     testa = movey;
        //     console.log(n)
        //     if(box[n+2]){
        //     box[n+2].style.paddingTop = "0px"; 
        //     }
        //     if(box[n+1]){
        //         box[n+1].style.paddingTop = "28px"; 
        //     }
        // }


        // if(box[n+1]){
        // box[n+1].style.paddingTop = "28px";
        // box[i].style.paddingTop = "0px";
        // }
        

        // if(box[n]){
        // box[n].style.paddingTop = "0px";
        // }


        // if(testa + 20 < movey){
        //     n++;
        //     console.log(n);
        //     testa = movey;
        //     if(box[n]){
        //     box[n].style.paddingTop = "0px";
        //     }
        //     if(box[n-1]){
        //         n++;
        //     }
        //     box[n-1].style.backgroundColor = "red";
        // }
        // else{
        //     if(box[n+1]){
        //      box[n+1].style.paddingTop = "28px";
        //     }
        // }

        // if(testa - 20 > movey){         
        //     testa = movey;
        //     n--;
        //     console.log(n)  
        //     box[n-1].style.paddingTop = "28px";
        //     box[n].style.paddingTop = "0px";
        //     if(box[n+2]){
        //     box[n+2].style.paddingTop = "0px";
        //     }
        //     box[n].style.backgroundColor = "red";
        // }


     

        }, false);

        box[i].addEventListener('touchend', function(e){
            if(box[i+1]){
                box[i+1].style.paddingTop = "unset";
            }
            box[i].style.position = "unset"
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
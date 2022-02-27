// Functions

window.onbeforeunload = function() {
    return;
  }

// Function check if you are a new user eles create a new list
function startScript() {
    if(localStorage.getItem("new") == 1){
        // do nothing
    }
    else{
        const list = { 'Double tap to add new item': {"newitme":"new"},'Click item to open folder':{"newitme2":"new2","newitme3":"new3"} };
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
        var keyAmounth = 0;
        for (item in list[key]) {
            keyAmounth++;
        }
        
        const ul = document.querySelector("ul");
        const li = document.createElement("li");
        // if(keyAmounth != 0){
        //     li.appendChild(document.createTextNode(key + " ("+keyAmounth+")"));
        // }
        // else{
            li.appendChild(document.createTextNode(key));
        // }
        ul.appendChild(li);
    }
    addDrag();
      
}

// detect windows key
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 91) {
        if(document.querySelector("ul input")){
            var select = document.querySelector('ul');
            select.removeChild(select.lastChild);
            return;
        }
        else{
            if(!document.querySelector("ul form")){
                newInput();
            }
            else{
                document.querySelector("ul input").select();
            }
        }
    }
});

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
    input.focus();

}

// Double tap to add input
document.body.addEventListener("dblclick", event => {
    if(document.querySelector("ul input")){
        var select = document.querySelector('ul');
        select.removeChild(select.lastChild);
        return;
    }
    else{
        if(!document.querySelector("ul form")){
            newInput();
        }
        else{
            document.querySelector("ul input").select();
        }
    }
})


document.body.addEventListener("click", event => {
        createList();
})



//   prevent submit
  function mySubmitFunction(e) {
    e.preventDefault();
    newListitem();
    return false;
}

// backgroundImage
if(localStorage.getItem("img")){
    var backgroundImage = localStorage.getItem("img");
    document.body.style.backgroundImage = "url('"+ localStorage.img +"')";
}
    
    
    async function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object
    
        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {
    
          // Only process image files.
          if (!f.type.match('image.*')) {
            continue;
          }
    
          var reader = new FileReader();
    
          // Closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) {
              // Render thumbnail.
              localStorage.setItem('img', e.target.result);
            };
          })(f);
    
          // Read in the image file as a data URL.
          reader.readAsDataURL(f);
        location.reload();
        }
      }
    
    if(document.getElementById('files')){
     document.getElementById('files').addEventListener('change', handleFileSelect, false);
    }


// Add new item to list
  function newListitem() {
    const list = JSON.parse(localStorage.getItem("data"));
    var numberToString = document.querySelector("ul input").value;
    if(!isNaN(document.querySelector("input").value)){
        numberToString = document.querySelector("ul input").value + " ";
    }
    list[numberToString] = { };
    if(document.querySelector("ul input").value == ""){
        var select = document.querySelector('ul');
        select.removeChild(select.lastChild);
        return;
    }
    if(document.querySelector("ul input").value == ".backgroundred"){
        document.body.style.backgroundColor = "red";
        var select = document.querySelector('ul');
        select.removeChild(select.lastChild);
        return;
    }
    if(document.querySelector("ul input").value == ".image"){
        document.getElementById("files").click();
        var select = document.querySelector('ul');
        select.removeChild(select.lastChild);
        return;
    }
    if(document.querySelector("ul input").value == ".dellall"){
        const list = {};
        localStorage.setItem("data", JSON.stringify(list));
        createList();
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
    var n = 0;

    var liPosition = 0;
    
    for (let i = 0; i < box.length; i++) {
        var edit = false;
        var onlongtouch = function(a) { 
            if(movex == undefined){
                a.setAttribute("contenteditable", "true");
                edit = true;
            }
            else{
                edit = false;
            }
        };
        box[i].addEventListener('touchstart', function(e){
            setTimeout(function() { onlongtouch(box[i]); } , 500)
        const touchobj = e.changedTouches[0]; 
        startx = parseInt(touchobj.clientX); 
        starty = parseInt(touchobj.clientY); 
        liPosition = starty;
        if(box[i+1]){
            box[i+1].style.paddingTop = "28px";
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


        if(liPosition + 25  < movey){
            liPosition = movey;
            n++;
            if(i == n){
                return;
            }
            if(box[i+(n+1)]){
                box[i+(n+1)].style.paddingTop = "28px";
            }
            if(box[i+n]){
                box[i+n].style.paddingTop = "unset";
            }
            if(box[i+(n-1)]){
                box[i+(n-1)].style.paddingTop = "unset";
            }
        }
        if(liPosition - 25  > movey){ 
            // console.log(i);
            liPosition = movey;
            n--;
            if(i == n){
                return;
            }
            if( box[i+n]){
                box[i+n].style.paddingTop = "28px";
            }
            if( box[i+(n+1)]){
            box[i+(n+1)].style.paddingTop = "unset";
            }
            if( box[i+(n+2)]){
                box[i+(n+2)].style.paddingTop = "unset";
            }
        }



     

        }, false);

        box[i].addEventListener('touchend', function(e){
            if(movex > window.innerWidth - 50){
                const list = JSON.parse(localStorage.getItem("data"));
                delete list[box[i].innerHTML];
                localStorage.setItem("data", JSON.stringify(list));
                createList();
                document.querySelector('body').style.boxShadow = "unset";
            }
            else{

                const list = JSON.parse(localStorage.getItem("data"));
                const newList = {};
                var newOrder = i+n;

                if(newOrder > box.length){
                    newOrder = box.length-1;
                }
                if(newOrder < 0){
                    newOrder = 0;
                }

                for (key in list) {
                    if(key == box[newOrder].innerHTML){
                        if(newOrder < i){
                            newList[box[i].innerHTML] = list[box[i].innerHTML];
                            newList[key] = list[key];
                        }
                        newList[key] = list[key];
                        newList[box[i].innerHTML] = list[box[i].innerHTML];
                    }
                    else{
                        if(key == box[i].innerHTML){
                        }
                        else{
                        newList[key] = list[key];
                        }
                    }
                }
                if(newOrder > box.length){
                    console.log("noting");
                }
    

                localStorage.setItem("data", JSON.stringify(newList));

                if(box[i+1]){
                    box[i+1].style.paddingTop = "unset";
                }
                box[i].style.position = "unset"
                if(edit != true){
                    createList();
                }
                else{
                    var oldKey = box[i].innerHTML;
                    var changeList = JSON.parse(localStorage.getItem("data"));
                    onlyOnes = function(e) {
                        if (event.keyCode === 13) {
                            event.preventDefault();
                            if(changeList[oldKey] != changeList[box[i].innerHTML]){
                                changeList[box[i].innerHTML] = changeList[oldKey];
                                delete changeList[oldKey];
                                localStorage.setItem("data", JSON.stringify(changeList));
                                createList();
                                window.document.removeEventListener("keydown", onlyOnes); 
                            }
                            else{
                                createList();
                                window.document.removeEventListener("keydown", onlyOnes); 
                            }
                        }

                    }

                    window.document.addEventListener("keydown", onlyOnes);
 
                }
            }
        }, false);
    }
}
 


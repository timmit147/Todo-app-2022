//// Step 1: get data from localStorage

// Make getItem localStorage shorter
function get(item){
    return localStorage.getItem(item);
}

// Make setItem localStorage shorter
function set(item, input){
    return localStorage.setItem(item, input);
}

// If localStorage is empty place tutorial text
function newUser() {
    if(!get("new") == 1){
        const list = { 'Tutorial': {"Double tap to add new item":{},"Click item to open folder":{},"Swipe left to go back":{},"Drag item to right to delete":{}},"Settings":{"Type .image to change background":{},"Type .dellall to delete alle list items":{}} };
        set("data", JSON.stringify(list));
        set("new", 1);
        set("path", "");
    }
}

newUser();

//// Step 2: Convert localStorage to Json list
function localStorageToJson(input){
    return JSON.parse(get(input));
}

//// Step 3: Change path
function changePath(){
    if(get("path") == ""){
        return JSON.parse(localStorage.getItem("data"));
    }
    else{
        const split = get("path").split('~');
        console.log(get("path"));
        var newSplit = "";
        for (key in split){
            if(!split[key] == ""){  
                newSplit = newSplit + "."+split[key]+"";
            }
        }
        return Object.byString(localStorageToJson("data"), newSplit);
    }
}

function getPath(){

        const split = get("path").split('~');
        var newSplit = "";
        for (key in split){
            if(!split[key] == ""){  
                newSplit = newSplit + "."+split[key]+"";
            }
        }
        return newSplit;
}


// funtion string to properties
Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}


//// Step 4: Make a HTML list
function createList() {
    list = changePath();
    document.querySelector("ul").innerHTML = "";
    for (key in list) {
        var keyAmounth = 0;
        for (item in list[key]) {
            keyAmounth++;
        }
        
        const ul = document.querySelector("ul");
        const li = document.createElement("li");
        li.id = key;
        li.addEventListener("click", event => {
            set("path", get("path")+"~"+li.id);
            createList();
        });
        if(keyAmounth != 0){
            li.appendChild(document.createTextNode(key + " ("+keyAmounth+")"));
        }
        else{
            li.appendChild(document.createTextNode(key));
        }
        ul.appendChild(li);
    }
    addDrag();
}

createList();


window.onbeforeunload = function() {
    return;
  }

// detect shift ctl
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 17) {
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


//   prevent submit
  function mySubmitFunction(e) {
    e.preventDefault();
    newListitem();
    return false;
}

// backgroundImage
async function backgroundImage(){
    if(localStorage.getItem("img")){
        var backgroundImage = localStorage.getItem("img");
        document.body.style.backgroundImage = "url('"+ localStorage.img +"')";
    }
}

backgroundImage();    
    
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
            return async function(e) {
              // Render thumbnail.
              localStorage.setItem('img', e.target.result);
              backgroundImage();
              console.log("test");
            };
          })(f);
    
          // Read in the image file as a data URL.
          reader.readAsDataURL(f);
        // location.reload();
        }
      }
    
    if(document.getElementById('files')){
     document.getElementById('files').addEventListener('change', handleFileSelect, false);
    }


// Add new item to list
  function newListitem() {
    var list = JSON.parse(localStorage.getItem("data"));
    var numberToString = document.querySelector("ul input").value;
    if(!isNaN(document.querySelector("input").value)){
        numberToString = document.querySelector("ul input").value + " ";
    }
    


    const newPath = getPath();
    if(newPath){
        Object.byString(list, newPath)[numberToString] = {};
    }
    else{
        list[numberToString] = {};
    }


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




  function getPath2(){
    const split = get("path").split('~');
    var newSplit = "";
    for (key in split){
        if(!split[key] == ""){  
            newSplit = newSplit + "["+split[key]+"]";
        }
    }
    return newSplit;
}

Object.byString2 = function(o, s, newList ) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ) {
        var k = a[i];

        if(a.length == i+1){
            console.log("no");
            return o[k] = newList;
        }
        else{
            console.log("yes");
            o = o[k];
        
        }
        console.log(o);
        ++i;
    }
    return o;
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
            const newPath = getPath();
            var list = JSON.parse(localStorage.getItem("data"));
            
            function getList(){
            if(newPath){
            return Object.byString(list, newPath);
            }
            else{
                return list;
            }
            }
            if(movex > window.innerWidth - 50){
                var newList = getList();
 
                const tostingtext = String(box[i].id);
                console.log(newList);
                delete newList[tostingtext];
                console.log(newList);
                const newPath2 = getPath2();
                console.log(newPath2);
                if(newPath2){
                    Object.byString2(list, newPath2, newList);
                }

                localStorage.setItem("data", JSON.stringify(list));
                createList();
                document.querySelector('body').style.boxShadow = "unset";
            }
            else{


                // console.log(list);
                var newList = {};
                let newOrder = i+n;

                if(newOrder > box.length){
                    newOrder = box.length-1;
                }

                if(newOrder < 0){
                    newOrder = 0;
                }

                if(box[newOrder] != undefined){


                    for (key in getList()) {
                            if(key == box[newOrder].id){
                                if(newOrder < i){
                                    newList[box[i].id] = getList()[box[i].id];
                                    newList[key] = getList()[key];
                                }
                                newList[key] = getList()[key];
                                newList[box[i].id] = getList()[box[i].id];
                            }
                            else{
                                if(key == box[i].id){
                                }
                                else{
                                newList[key] = getList()[key];
                                }
                            }
                    }

                    console.log(newList);

                    if(newPath){



                        

                        // {afas: {…}, fa: {…}, fas: {…}, af: {…}}
                        console.log(Object.byString(list, getPath2()));

                        // {afas: {…}, fa: {…}, af: {…}, fas: {…}}
                        console.log(newList);


                        Object.byString2(list, newPath, newList);

                        }
                        else{
                            list = newList;
                        }
                    localStorage.setItem("data", JSON.stringify(list));
                }


                createList();

                if(box[i+1]){
                    box[i+1].style.paddingTop = "unset";
                }
                box[i].style.position = "unset"
                if(edit != true){
                    createList();
                }
                else{
                    var oldKey = box[i].id;
                    var changeList = JSON.parse(localStorage.getItem("data"));
                    onlyOnes = function(e) {
                        if (e.keyCode === 13) {
                            e.preventDefault();
                            if(changeList[oldKey] != changeList[box[i].id]){
                                changeList[box[i].id] = changeList[oldKey];
                                delete changeList[oldKey];
                                localStorage.setItem("data", JSON.stringify(changeList));
                                createList();
                                window.document.removeEventListener("keydown", onlyOnes); 
                            }
                            else{
                                createList();
                                window.document.removeEventListener("keydown", onlyOnes); 
                            }
                            return false;
                        }

                    }

                    window.document.addEventListener("keydown", onlyOnes);
 
                }
            }
        }, false);
    }
}
 
function shortenPath(){
    var split =  get("path").split("~");
    return split.slice(0, split.length - 1).join("~");
}




// Move body
document.body.addEventListener('touchstart', function(e){ 
const touchobj = e.changedTouches[0]; 
startx = parseInt(touchobj.clientX);  
}, false);

document.body.addEventListener('touchmove', function(e){
    const touchobj = e.changedTouches[0]; 
    movex = parseInt(touchobj.clientX); 
}, false);

document.body.addEventListener('touchend', function(e){
    const touchobj = e.changedTouches[0]; 
    endx = parseInt(touchobj.clientX); 
    if(endx + 150 < startx ){
        set("path", shortenPath());
        createList();
    }
}, false);
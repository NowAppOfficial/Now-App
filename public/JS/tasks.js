

/* PAGE TRANSITIONS + START AND END FUNCTIONS */

function toPage (string) {

    var curtain = document.getElementsByClassName('curtain-transition')[0];
    curtain.style.display = 'block'

    curtain.style.zIndex = '5'
    curtain.style.animation = 'height 0.6s cubic-bezier(.35, .76, .65, 1)'

    setTimeout(function() {
        curtain.style.filter = null
        window.location.href = string + ".html"
    }, 1000);

    var pageInd = document.getElementById('invertNav')
    pageInd.style.animation = 'heightReverseInd 0.6s cubic-bezier(.35, .76, .65, 1)'

    var pageIndText = document.getElementById('dashboardNavText')
    pageIndText.style.transition = 'cubic-bezier(.35, .76, .65, 1) 0.1s'
    pageIndText.style.filter = 'opacity(0)'

    var pageIndCont = document.getElementById('taskIconContainer')
    pageIndCont.style.width = "85px"
    pageIndCont.style.borderRadius = '19px'

    var pageIndSvg = document.getElementById('taskIcon')
    pageIndSvg.style.fill = "#e6e6e6"

    setTimeout(function() {
        curtain.style.filter = 'opacity(1)'
        pageInd.style.filter = 'opacity(0)'
    },600);
}

function startPage () {
    var curtain = document.getElementsByClassName('curtain-transition')[0];

    curtain.style.zIndex = '5'

    var pageInd = document.getElementById('invertNav')
    pageInd.style.filter = "opacity(0)"

    var pageIndText = document.getElementById('dashboardNavText')
    pageIndText.style.filter = 'opacity(0)'

    var pageIndCont = document.getElementById('taskIconContainer')
    pageIndCont.style.width = "85px"
    pageIndCont.style.borderRadius = '19px'

    setTimeout(function() {
        pageInd.style.filter = "opacity(1)"
        pageInd.style.animation = 'heightInd 0.6s cubic-bezier(.35, .76, .65, 1)'
    
        pageIndText.style.transition = 'cubic-bezier(.35, .76, .65, 1) 0.9s'
        pageIndText.style.filter = 'opacity(1)'

        pageIndCont.style.transition = 'cubic-bezier(.35, .76, .65, 1) 0.9s'
        pageIndCont.style.width = "105px"
        pageIndCont.style.borderRadius = '27px'

    }, 400)



    setTimeout(function() {

        curtain.style.animation = 'heightReverse 0.8s cubic-bezier(.35, .76, .65, 1)'
    },600);


    setTimeout(function() {
        curtain.style.filter = 'opacity(0)'
        curtain.style.display = 'none'
    },1400);
}
startPage();

/* PAGE TRANSITIONS + START AND END FUNCTIONS */





/* INDIVIDUAL ELEMENTS ANIMATIONS */


//Add a task button:

var taskAddButton = document.getElementsByClassName('button-task-add')[0]

taskAddButton.addEventListener("click", function() {
        /* Check to see if item is stored yet */
    if (localStorage.getItem(open)) {
        //console.log(localStorage.getItem(open))
        if (localStorage.getItem(open) == 'no') {
            /* if the button is not opened do...: */
            openAddTaskButton();
        }  else {
            /* if the button IS opened do...: */
            closeTaskButton();
        }
    } else {
        /* set the item for the first time */
        openAddTaskButton();
    }
})  

function openAddTaskButton () {
    var bt = document.getElementsByClassName('button-task-add')[0]
    var img = document.getElementById('img-plus-icon')   
    var addBut = document.getElementsByClassName('add-Task-Click')[0]
  
    addBut.style.transition = "ease 0.4s"
    addBut.style.right = '50px'
    addBut.style.filter = 'opacity(1)'

    bt.style.transition = "ease 0.4s"
    bt.style.border = "1px solid #d4d4d4"
    
    img.style.transition = "ease 0.4s"
    img.style.transform = "rotate(180deg)"

    localStorage.setItem(open,'yes') 
}
function closeTaskButton () {
    var bt = document.getElementsByClassName('button-task-add')[0]
    var img = document.getElementById('img-plus-icon')
    var addBut = document.getElementsByClassName('add-Task-Click')[0]
  
    addBut.style.transition = "ease 0.4s"
    addBut.style.right = null
    addBut.style.filter = null
  
    bt.style.transition = "ease 0.4s"
    bt.style.width = null
    
    img.style.transition = "ease 0.4s"
    img.style.transform = "rotate(0deg)"

    localStorage.setItem(open,'no') 
}

var addBut = document.getElementsByClassName('add-Task-Click')[0]
addBut.addEventListener("click", closeTaskButton)

//END//////////////////////////////////////////
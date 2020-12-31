/* BROWSER CHECK */

var isChromium = window.chrome;
var winNav = window.navigator;
var vendorName = winNav.vendor;
var isOpera = typeof window.opr !== "undefined";
var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
var isIOSChrome = winNav.userAgent.match("CriOS");

if (isIOSChrome) {
   // is Google Chrome on IOS
} else if(
  isChromium !== null &&
  typeof isChromium !== "undefined" &&
  vendorName === "Google Inc." &&
  isOpera === false &&
  isIEedge === false
) {
   // is Google Chrome
} else { 
   // not Google Chrome 
   if ( isOpera === false) {
    
   } else {
    unsupportedUserBrowser("Opera")
   }
   if ( isIEedge === false) {
    
    } else {
    unsupportedUserBrowser("Internet Explorer")
    }
}

/* BROWSER CHECK END*//////////////////////






function unsupportedUserBrowser (string) {

    var msg = "is not supported yet. Switch to a chrome browser to view this website"

    document.getElementById("coverUp").style.display = "block"
    document.getElementById("coverUp").style.zIndex = "1000"
    document.getElementsByClassName("browser-name")[0].innerHTML = string + ' ' + msg 
}

/* PAGE TRANSITIONS + START AND END FUNCTIONS */

function toPage (string) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

   var curtain = document.getElementsByClassName('curtain-transition')[0];
   curtain.style.display = 'block'

   curtain.style.zIndex = '5'
   curtain.style.animation = 'height 0.6s cubic-bezier(.35, .76, .65, 1)'

   setTimeout(function() {
       curtain.style.filter = null
       window.location.href =  string + ".html"
   }, 1000);

   var pageInd = document.getElementById('invertNav')
   pageInd.style.animation = 'heightReverseInd 0.6s cubic-bezier(.35, .76, .65, 1)'

   var pageIndText = document.getElementById('dashboardNavText')
   pageIndText.style.transition = 'cubic-bezier(.35, .76, .65, 1) 0.1s'
   pageIndText.style.filter = 'opacity(0)'

   var pageIndCont = document.getElementById('dashboardIconContainer')
   pageIndCont.style.width = "85px"
   pageIndCont.style.borderRadius = '19px'

   var pageIndSvg = document.getElementById('taskIcon')
   pageIndSvg.style.fill = "#6ea4bf"

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

   var pageIndCont = document.getElementById('dashboardIconContainer')
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


   var clientReminders = document.getElementById('userReminders')

   if (localStorage.getItem('clientReminders') ===  null) {

   } else {
    clientReminders.innerHTML = localStorage.getItem('clientReminders')
}
}
startPage();

/* PAGE TRANSITIONS + START AND END FUNCTIONS END ////////// */




/* INDIVIDUAL ELEMENTS ANIMATIONS */

//Assign each button a onclick:
function reminderAssign (string) {

    var subjects = document.getElementById('reminder' + string).children
    //console.log(subjects[1])
    /* Subjects is each reminder-or any element that has a class of remind-box. */
    subjects[1].addEventListener('click',  clearReminder); 
}

function buttonAssign () {
    var subjects = document.getElementsByClassName('remind-box')

    if (subjects[0]) {
        var getFirst = subjects[0].id
        var childNum = getFirst[getFirst.length - 1]
        //console.log(childNum)
    
        /* Subjects is each reminder-or any element that has a class of remind-box. */
        var reminderCount = subjects.length
        for (i = childNum; i < (reminderCount + parseInt(childNum)); i++) {
            //console.log(i)
            reminderAssign(i)
    
        }
    } else {
        return;
    }

}
buttonAssign();

function assignRemoveListenersClear () {
    var subjects = document.getElementsByClassName('remind-box')
    /* Subjects is each reminder-or any element that has a class of remind-box. */
    var reminderCount = subjects.length
    for (i = 1; i < (reminderCount + 1); i++) {
        //console.log(i)
        removeListenersClear(i)

    }
}
function removeListenersClear (string) {
    //console.log(string)

    var subjects = document.getElementById('reminder' + string).children
    //console.log(subjects)
    /* Subjects is each reminder-or any element that has a class of remind-box. */
    subjects[1].removeEventListener('click',  clearReminder); 
    //console.log(subjects[1])
}

//END
document.getElementById('artDots').addEventListener('click', function(){
    console.log(document.getElementsByClassName('clearRemindButton' + '1')[0].innerHTML)
})
//Clear a reminder
function clearReminder() {

    var getThis = this.classList[0]
    var string = getThis.charAt(getThis.length - 1);
    var detectIf = getThis.slice(0, -1) 

    if (detectIf == 'clearRemindButton') {

        //console.log(getThis)
    
        if (document.getElementsByClassName('clearRemindButton' + string)[0].innerHTML == "Unclear") {
            unClearReminder(string);
            return;
        }
        var button = document.createElement("button"); button.id = 'deleteReminder';  button.className = "delete-remind" + (string)
        var textButton = document.createTextNode('Delete')
        button.appendChild(textButton)

        var reminderTarget = document.getElementById('reminder' + string)
        reminderTarget.appendChild(button)

        button.addEventListener('click', clearReminder)
    
        document.getElementsByClassName('user-content-reminder' + string)[0].style.textDecoration = "line-through #bababa"
        document.getElementsByClassName('user-content-reminder' + string)[0].style.color = "rgb(173 198 202)"
    
        document.getElementsByClassName('clearRemindButton' + string)[0].innerHTML = "Unclear"
    } else {
        var childNum = parseInt(string)
        var childToRemove = document.getElementById('reminder' + childNum)
        //console.log('Hello??')

        childToRemove.style.animation = "clearReminderSlide 0.6s"
        setTimeout(function() {
            document.getElementById('userReminders').removeChild(childToRemove)
            saveClientReminders();

            if (reminderCount() < 4) {
                document.getElementById('artDots').style.display = "block"
            } else {
                document.getElementById('artDots').style.display = "none"
            }
        }, 599)

    }

}
//END

//Clear all reminders
function clearAllReminders () {
    var subjects = document.getElementsByClassName('markForAllReminders')

    for (i = 0; i < subjects.length; i++) {
        subjects[i].style.textDecoration = "line-through #bababa"
        subjects[i].style.color = "rgb(173 198 202)"
    }

    var buts = document.getElementsByClassName('bt-mark')

    for (i = 0; i < buts.length; i++) {
        buts[i].innerHTML = 'Unclear'
        buts[i].classList.add('cleared')
    }
    sortAll('cleared')
}


//Unclear a reminder
function unClearReminder (string) {
    document.getElementsByClassName('user-content-reminder' + string)[0].style.textDecoration = null
    document.getElementsByClassName('user-content-reminder' + string)[0].style.color = null

    document.getElementsByClassName('clearRemindButton' + string)[0].innerHTML = "Clear"

    //console.log(document.getElementById('reminder' + string).children.length)

    if (document.getElementById('reminder' + string).children.length > 2 ) {
        document.getElementById('reminder' + string).removeChild(document.getElementById('reminder' + string).lastChild)
    }


}

//#of reminders [UNUSED]
function reminderCount () {
    var subjects = document.getElementsByClassName('remind-box')
    var reminderCount = subjects.length

    return reminderCount
}

//Sort all reminders
function sortAll (type) {
    /*
    var subjects = document.getElementsByClassName('bt-mark')
    var length = subjects.length

    var remind = document.getElementsByClassName('remind-box')

    var cleared = document.getElementsByClassName('bt-mark cleared')

    switch (type) {
        case 'cleared' :
            //Sort by cleared

            var clearArray = {
              "1": [
                {"element": remind[0],
                "top": "0"}
              ],
              "2": [
                {"element": remind[1],
                "top": "65"}
              ],
              "3": [
                {"element": remind[2],
                "top": "130"}
              ],
              "4": [
                {"element": remind[3],
                "top": "195"}
              ],
              "5": [
                {"element": remind[4],
                "top": "0"}
              ]

            };

            console.log(clearArray)
 
        break;
    }
    */

}

//Clear a reminder:



//Add a reminder button:

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
    var redAddBut = document.getElementsByClassName('redirect-to-task-page')[0]
  
    setTimeout(function() {
        addBut.style.transition = "ease 0.4s"
        addBut.style.right = '50px'
        addBut.style.filter = 'opacity(1)'
    }, 50)

    redAddBut.style.transition = "ease 0.4s"
    redAddBut.style.right = '170px'
    redAddBut.style.filter = 'opacity(1)'

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
    var redAddBut = document.getElementsByClassName('redirect-to-task-page')[0]

    addBut.style.transition = "ease 0.4s"
    addBut.style.right = null
    addBut.style.filter = null
  
    redAddBut.style.transition = "ease 0.4s"
    redAddBut.style.right = null
    redAddBut.style.filter = null

    bt.style.transition = "ease 0.4s"
    bt.style.width = null
    
    img.style.transition = "ease 0.4s"
    img.style.transform = "rotate(0deg)"

    localStorage.setItem(open,'no') 
}

var addBut = document.getElementsByClassName('add-Task-Click')[0]
addBut.addEventListener("click", function(){
    closeTaskButton();
    showInputCreateNewReminder();
}) 

//END//////////////////////////////////////////
localStorage.setItem('remInputFocus', 'no')

//Create a reminder

function showInputCreateNewReminder() {

    localStorage.setItem('remInputFocus', 'yes')
    //console.log("bruh2")

    var input = document.getElementById('clientTextInput')

    input.focus()
    input.addEventListener('focusout', hideInputCreateNewReminder)
    input.value = ''

    input.style.right = '65px'
    input.style.opacity = '1'
}

var inputGLOBALcomplexWhoo = document.getElementById('clientTextInput')

inputGLOBALcomplexWhoo.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        if (localStorage.getItem('remInputFocus') == 'yes') {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            //console.log('uhoh 3?')
            createNewReminder();
            setTimeout(function() {
                    hideInputCreateNewReminder();
            }, 10)
        } else {
            return;
        }
    }
})

hotkeys('cmd+b,ctrl+b', function (event, handler){
    switch (handler.key) {

        case 'cmd+b': 
        event.preventDefault() 
            if (localStorage.getItem('remInputFocus') == 'yes') {
                alert('you pressed cmd+b!');
            } else {
                alert("bruhhh")
            }
        break;
            
        case 'ctrl+b': alert('you pressed ctrl+b!');
        break;
        default: alert(event);
    }
  });
  

function hideInputCreateNewReminder () {
    var input = document.getElementById('clientTextInput')
    input.style.right = null
    input.style.opacity = null

    input.blur();

    localStorage.setItem('remInputFocus', 'no')
}

function createNewReminder() {

    var bigContRem = document.getElementById("userReminders")
    var reminderCount = document.getElementsByClassName('remind-box').length

    var button = document.createElement("button")
    var textButton = document.createTextNode('Clear')
    button.id = 'clearAllReminders'; button.className = 'clearRemindButton' + (reminderCount + 1); button.classList.add( 'bt-mark') 

    button.appendChild(textButton)

    var clientTextInput = document.getElementById('clientTextInput')
    var clientText = clientTextInput.value 
    var clientRemFinal;

    var divRem = document.createElement("div"); divRem.id = 'reminder' + (reminderCount + 1); divRem.className = 'remind-box'
    var divTextRem = document.createElement("div"); divTextRem.className = 'user-content-reminder'+ (reminderCount + 1); divTextRem.classList.add('markForAllReminders') 
    var textRem = document.createTextNode(clientText)

    divTextRem.appendChild(textRem)
    divRem.appendChild(divTextRem)
    divRem.appendChild(button)

    clientRemFinal = divRem



    bigContRem.insertBefore(clientRemFinal, document.getElementById('artDots'))

    if (reminderCount >= 3) {
        document.getElementById('artDots').style.display = "none"
    } else {
        document.getElementById('artDots').style.display = "block"
    }

    assignRemoveListenersClear ();
    buttonAssign();
    saveClientReminders();
}

function saveClientReminders () {
    var clientHtml = document.getElementById('userReminders').innerHTML
    localStorage.setItem('clientReminders', clientHtml)
}
saveClientReminders()

function setDefaultResetHtml () {
    var defaultHTML = `                                <div id="reminder1" class="remind-box">
    <div class="user-content-reminder1 markForAllReminders name"><b>Take out your laundry!</b></div>
    <button id="clearAllReminders" class="clearRemindButton1 bt-mark" >Clear</button>
</div>

<div id="artDots">
    <img class="art-Dots-Svg" src="Imgs/Art/Seagreen/SeagreenDots.svg" alt="">
</div>`

    document.getElementById('userReminders').innerHTML = defaultHTML
    saveClientReminders()
    localStorage.setItem('resetHtml', 'done')
}
if (localStorage.getItem('resetHtml') === null) {
    setTimeout(setDefaultResetHtml, 2000);
}


//END OF REMINDERS FUNCTIONS///////////////////////////////////////////////////








// Add a task 



// CALENDAR API AND GENERATOR CODE:
///////////////////////////////////////////////////////////////////////////////////////////////////////
var events = [
    {'Date': new Date(2016, 6, 7), 'Title': 'Doctor appointment at 3:25pm.'},
    {'Date': new Date(2016, 6, 18), 'Title': 'New Garfield movie comes out!', 'Link': 'https://garfield.com'},
    {'Date': new Date(2016, 6, 27), 'Title': '25 year anniversary', 'Link': 'https://www.google.com.au/#q=anniversary+gifts'},
];

var settings = {
    Color: '',
    LinkColor: '',
    NavShow: true,
    NavVertical: false,
    NavLocation: '',
    DateTimeShow: true,
    DateTimeFormat: 'mmm, yyyy',
    DatetimeLocation: '',
    EventClick: '',
    EventTargetWholeDay: false,
    DisabledDays: [],

};

var element = document.getElementById('caleandar');
caleandar(element, events, settings);
///////////////////////////////////////////////////////////////////////////////////////////////////////


// LOAD TASKS ONTO DASHBOARD:
///////////////////////////////////////////////////////////////////////////////////////////////////////

function loadTasksFromTaskPage () {

    if (localStorage.getItem('clientTasksHtml')) {
        var tasks = document.getElementById('userTasks')
        tasks.innerHTML = localStorage.getItem('clientTasksHtml')
    }

}
loadTasksFromTaskPage();

function assignClicksForTasks () {
    var subjects = document.getElementsByClassName('task-Conts')
    for (i = 0; i < subjects.length; i++) {
        subjects[i].addEventListener('click', toTaskPageFocus)
    }
}
assignClicksForTasks();

function toTaskPageFocus() {
    localStorage.setItem('taskToFocusOnLoad', this.id)
    toPage('tasks');
}


///////////////////////////////////////////////////////////////////////////////////////////////////////

function overrideMakeSureTasks () {
    var tasks = document.getElementsByClassName('task-Conts')
    for (i = 0; i < tasks.length; i++) {
        tasks[i].style.transition = 'ease 0.3s'
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(function() {
        overrideMakeSureTasks();
    }, 500)
});
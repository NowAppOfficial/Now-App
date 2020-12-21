

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

document.getElementsByClassName('add-Task-Click')[0].style.display = "none"

function openAddTaskButton () {
    var bt = document.getElementsByClassName('button-task-add')[0]
    var img = document.getElementById('img-plus-icon')   
    var addBut = document.getElementsByClassName('add-Task-Click')[0]
  
    addBut.style.display = null

    setTimeout(function() {
        addBut.style.transition = "ease 0.4s"
        addBut.style.right = '50px'
        addBut.style.filter = 'opacity(1)'
    }, 1)


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

    setTimeout(function() {
        addBut.style.display = 'none'
    }, 400)

    localStorage.setItem(open,'no') 
    addTask(2)
}

var addBut = document.getElementsByClassName('add-Task-Click')[0]
addBut.addEventListener("click", closeTaskButton)

//END//////////////////////////////////////////


function animateNewTask (string) {
    var Square = document.getElementById('subCardRow1')

    Square.style.marginTop = null
    Square.style.opacity = null

    setTimeout(function() {
        var subject = string.classList[1]
        var array = (JSON.parse(localStorage.getItem(subject)))
        console.log(array)

        Square.children[0].children[0].innerHTML = array['title']
        Square.children[4].children[2].children[0].innerHTML = array['due']

        Square.style.marginTop = "0px"
        Square.style.opacity = "1"

        string.style.backgroundColor = array["status"]
    }, 450)


}


document.getElementById('upcoming').style.backgroundColor = "#e6deba"

function addTask (string) {
    var taskCount;



    // CLIENT INPUTS: 

    
    var clientTaskTitle = "Add a title..."

    var clientInputTaskDue = document.getElementById('dueDate')
    var clientTaskDue = clientInputTaskDue.innerHTML

    var clientTaskFiles = document.getElementsByClassName('user-attachment-markAll').length

    var clientTaskStatusName = document.getElementsByClassName('tagged-status')[0]

    var clientTaskStatus = clientTaskStatusName.style.backgroundColor

    // CREATE TASK:

    // OUTER DIV
    var newTaskCont = document.createElement('div'); newTaskCont.id = 'taskContainer' + string; newTaskCont.className = "task-Conts"
    newTaskCont.addEventListener('click', focusTask); newTaskCont.click();
    newTaskCont.style.backgroundColor = "#e0d6b2"
    // TITLE
    var newTaskTitle = document.createElement('h1'); newTaskTitle.id = 'taskTitle' + string
    var newTaskTitleText = document.createTextNode(clientTaskTitle); 
    newTaskTitle.appendChild(newTaskTitleText)

    // ATTACHMENTS
    var newTaskFiles = document.createElement('div'); newTaskFiles.className = 'task-attachments' 
    var newTaskFilesText = document.createElement('p'); newTaskFilesText.appendChild(document.createTextNode(clientTaskFiles)) 
    var attachImg = document.createElement('img'); attachImg.src = "Imgs/attach-icons/dark-green.svg"; attachImg.className = "attachment-icon"

    newTaskFiles.appendChild(newTaskFilesText)
    newTaskFiles.insertBefore(attachImg, newTaskFilesText)

    // SPACER DIV
    var spaceDiv = document.createElement('div')

    // DUE DATE
    var newTaskDue = document.createElement('div'); newTaskDue.id = 'taskDue' + string; newTaskDue.className = "task-due"
    var newTaskDueText = document.createTextNode(clientTaskDue); 
    newTaskDue.appendChild(newTaskDueText)

    // STATUS
    var newTaskStatus = document.createElement('div'); newTaskStatus.id = 'taskStatus' +string; newTaskStatus.style.backgroundColor = clientTaskStatus

     // COMBINE TASK ELEMENTS
    newTaskCont.appendChild(newTaskTitle);
    newTaskCont.appendChild(newTaskFiles);
    newTaskCont.appendChild(spaceDiv);
    newTaskCont.appendChild(newTaskDue);
    newTaskCont.appendChild(newTaskStatus);

    var finalCombinedTask = newTaskCont;

    var userTasks = document.getElementById('userTasks')
    var firstTask = userTasks.children[0]

    if (userTasks.children.length > 0) {
        userTasks.insertBefore(finalCombinedTask, firstTask)
    } else {
        userTasks.appendChild(finalCombinedTask)
    }
    
    console.log(finalCombinedTask)

    addEventListenersForTasksArrays();
    newTaskCont.click();

    document.getElementById('userSelectedTaskTitle').focus()
    document.getElementById('userSelectedTaskTitle').innerHTML = ""
    document.getElementById('userSelectedTaskTitle').addEventListener('click', clearPlaceHolder)
}

// CLEAR PLACEHOLDER

function clearPlaceHolder () {
    var subject = this

    if (subject.id == 'userSelectedTaskTitle') {
        if (subject.innerHTML == "Add a title...") {
            subject.innerHTML =  ""
        } else {
           
        }
    }
    if (subject.id == 'clientDesc-Task') {
        if (subject.innerHTML == "...") {
            subject.innerHTML =  ""
        } else {
           
        }
    }

}





function updateEditedTask () {
    var subjects = document.getElementById('userTasks').children[0].children
    //console.log(subjects)

    if (subjects.length == 5) {
        subjects[0].innerHTML = document.getElementById('userSelectedTaskTitle').innerHTML
    }

        // Number 13 is the "Enter" key on the keyboard
    autoSaveTasks ();

    var taskCont;

    var tasks =  document.getElementsByClassName('task-Conts')

    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].style.border != "none") {
            taskCont = tasks[i]
        }
    }
    


    createArrays(taskCont);
}

function autoSaveTasks () {
    var subject = document.getElementById('userTasks').innerHTML;
    localStorage.setItem('clientTasksHtml', subject)

    var subjectExpand = document.getElementById('subCardRow1').innerHTML;
    localStorage.setItem('clientTasksAdvancedHtml', subjectExpand)
}

function loadSavedTasks () {
    if (localStorage.getItem('clientTasksHtml')) {
        var subject = document.getElementById('userTasks');
        subject.innerHTML = localStorage.getItem('clientTasksHtml')

        var subjectExpand = document.getElementById('subCardRow1')
        subjectExpand.innerHTML = localStorage.getItem('clientTasksAdvancedHtml')
    } else {
        autoSaveTasks();
    }


}
loadSavedTasks();



function clearHtmlReset() {
    var subject = document.getElementById('userTasks');
    subject.innerHTML = ''
    autoSaveTasks();
}

function blurAllFocusedTasks () {
    var subjects = document.getElementsByClassName('task-Conts')

    for (i = 0; i < subjects.length; i++) {
        subjects[i].style.border = "none"

        subjects[i].removeEventListener('click', focusTask)
        subjects[i].addEventListener('click', focusTask)
    }
}
blurAllFocusedTasks();

function focusTask () {
    var subjects = document.getElementsByClassName('task-Conts')

    for (i = 0; i < subjects.length; i++) {
        subjects[i].style.border = "none"
        subjects[i].style.transition = "none"
    }

    this.style.transition = "ease 0.05s"
    this.style.border = "solid #a59b72"
}


document.getElementById('userSelectedTaskTitle').addEventListener('keyup', function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        this.blur()
    } else {
        updateEditedTask()
    }
})

document.getElementById('subCardRow1').addEventListener('mouseenter', function() {
    document.getElementById('subCardRow1').addEventListener('keyup', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        } else {
            updateEditedTask()
        }
    })
})

function createArrays (string) {

    try {
        this.classList.contains('task-Conts')

        fetch('https://helloacm.com/api/random/?n=12') 
        .then(response => response.json())
        .then(data => {
        
            // CREATE DATA ARRAY
            var title = this.children[0].innerHTML
            var attachments = this.children[1].children[1].innerHTML
            var dueDate = this.children[3].innerHTML
            var status = this.children[4].style.backgroundColor
            //console.log(status)
            var array = {
                "title": title,
                "attachments":  attachments,
                "due" : dueDate,
                "status" : status,
            }
    
            if (this.classList.contains('marked-already')) {
                var alreadyNum = this.classList[1]
    
                localStorage.setItem(alreadyNum, JSON.stringify(array))
    
            } else {
                // RANDOM DATA
                var randomNum = data
                var randomClass = (randomNum)
    
                // ADD RANDOM DATA TO ELEMENT
                //console.log(this)
                this.classList.add(randomClass)
                this.classList.add('marked-already')
            
                // STORE THE ARRAY IN A RANDOM VARIABLE (STRINGIFY IS REQUIRED)
                localStorage.setItem(randomNum, JSON.stringify(array))
    
                //TO RETRIEVE THE ARRAY, JSON PARSE IS REQUIRED
    
                //console.log(JSON.parse(localStorage.getItem(randomNum)))
            }
            animateNewTask(this);
        })
    }
    catch(err) {
        //console.log(string)
            // CREATE DATA ARRAY
            var title = string.children[0].innerHTML
            var attachments = string.children[1].children[1].innerHTML
            var dueDate = string.children[3].innerHTML
            var status = string.children[4].style.backgroundColor
            //console.log(status)
            var array = {
                "title": title,
                "attachments":  attachments,
                "due" : dueDate,
                "status" : status,
            }
    
            if (string.classList.contains('marked-already')) {
                var alreadyNum = string.classList[1]
    
                localStorage.setItem(alreadyNum, JSON.stringify(array))
                //console.log(dueDate)
            }
    }

}



function addEventListenersForTasksArrays () {
    var x = document.getElementsByClassName('task-Conts')

    for (i = 0; i < x.length; i++) {
        x[i].removeEventListener('click', createArrays)
        x[i].addEventListener('click', createArrays)
    }
    document.getElementById('userSelectedTaskTitle').addEventListener('click', clearPlaceHolder)
    document.getElementById('clientDesc-Task').addEventListener('click', clearPlaceHolder)
}
addEventListenersForTasksArrays();
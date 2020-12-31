

/* PAGE TRANSITIONS + START AND END FUNCTIONS */


function toPage (string) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    var curtain = document.getElementsByClassName('curtain-transition')[0];
    curtain.style.display = 'block'

    curtain.style.zIndex = '5'
    curtain.style.animation = 'height 0.4s cubic-bezier(.35, .76, .65, 1)'

    setTimeout(function() {
        curtain.style.filter = null
        window.location.href = string + ".html"
    }, 600);

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
    },400);
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

// ANIMATIONS  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function gotoUrl (url) {
    if (typeof url === 'string' || url instanceof String) {
        window.open(url)
    } 
    if (this.tagName == 'DIV' && this.children[0].tagName == 'A') {
        var link = this.children[0]
        window.open(link)
    }
}



function animateNewTask (string) {
    var Square = document.getElementById('subCardRow1')


    var subject = document.getElementById('userTasks').children
    for (i = 0; i < subject.length; i++) {
        subject[i].id = "taskContainer" + [i];
    }

    var mark =  localStorage.getItem('mark')
    var target =  localStorage.getItem('target')

    /*
    console.log(target + ' target')
    console.log(mark + ' mark')
*/
    if (mark < target) {
        Square.style.animation = "prevCardTask 0.5s cubic-bezier(.44, .63, .66, .99)"
    } else {
        Square.style.animation = "nextCardTask 0.5s cubic-bezier(.44, .63, .66, .99)"
        localStorage.setItem('prevTask',  localStorage.getItem('prevTaskQueue'))
        localStorage.setItem('prevTaskQueue', mark)
    }


    setTimeout(function() {
        var tasks =  document.getElementsByClassName('task-Conts')
        var taskCont;
        for (i = 0; i < tasks.length; i++) {
            if (tasks[i].style.border != "none") {
                taskCont = tasks[i]
            }
        }
        var subject = taskCont.classList[1]
        var array = (JSON.parse(localStorage.getItem(subject)))
        //console.log(subject)

        if (array['title'] == 'Add a title...') {
            //console.log(array['title']); 
            setTimeout(function() {
                Square.children[0].children[0].innerHTML = '';
                document.getElementById('userSelectedTaskTitle').focus()
            }, 10)
        } else {
            Square.children[0].children[0].innerHTML = array['title'];
        }
        Square.children[0].style.backgroundColor = array['status']

        var attachments = array['urls']['filestack'].length
        document.getElementById('file-uploads-container').innerHTML = ""



        for(i = 1; i < attachments; i++) {
            if (array['urls']['filestack'][i]['name'] && array['urls']['filestack'][i]['url']) {
                var contUrl = document.createElement('div');
                document.getElementById('file-uploads-container').appendChild(contUrl) 

                var subStringVarCharAttachments = 20
                console.log(subStringVarCharAttachments)

                if (document.getElementById('file-uploads-container').children[0].offsetWidth > 320) {
                    subStringVarCharAttachments = 25
                }
                if (document.getElementById('file-uploads-container').children[0].offsetWidth > 350) {
                    subStringVarCharAttachments = 30
                }
                if (document.getElementById('file-uploads-container').children[0].offsetWidth > 400) {
                    subStringVarCharAttachments = 40
                }

                var list = document.createElement('a'); list.innerHTML = array['urls']['filestack'][i]['name'].substr(0, subStringVarCharAttachments); list.href = array['urls']['filestack'][i]['url']
                if (list.innerHTML.length < array['urls']['filestack'][i]['name'].length) {
                    list.innerHTML = list.innerHTML + '...'
                }
                list.target = "_blank"; list.rel = "noopener noreferrer"
                contUrl.appendChild(list)

                var xdelete = '<svg id="deleteAttachmentIcon"  class= "deleteIcon'+ document.getElementById('file-uploads-container').children.length +'"  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"width="20" height="20"viewBox="0 0 172 172"style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#666666"><path d="M31.4975,21.715l-9.7825,9.7825l54.5025,54.5025l-54.825,54.9325l9.675,9.675l54.9325,-54.825l54.825,54.825l9.7825,-9.7825l-54.825,-54.825l54.5025,-54.5025l-9.7825,-9.7825l-54.5025,54.5025z"></path></g></g></svg>'
                var contXDelete = document.createElement('table'); contXDelete.innerHTML = xdelete; contXDelete.style.display = 'grid'; contXDelete.style.placeItems = 'center';
                contUrl.appendChild(contXDelete)

                document.getElementById('deleteAttachmentIcon').addEventListener('click', deleteAttachment)
            }
        }

        //console.log(array['status'])
        switch(array['status']) {
            case 'rgb(218, 211, 184)': //Upcoming
            //console.log('upcoming')
                Square.children[0].children[0].style.color = 'rgb(165, 155, 114)'
            break;
            case 'rgb(225, 230, 168)': //Doing
            //console.log('doing')
                Square.children[0].children[0].style.color = 'rgb(157, 160, 109)'
            break;
            case 'rgb(203, 227, 198)': // Done
            //console.log('green')
                Square.children[0].children[0].style.color = 'green'
            break;
        }

        var dueDate =  (moment(array['due']).format("YYYY-MM-DD"));

        if (dueDate == 'Invalid date') {
            dueDate = moment().format("YYYY-MM-DD")
        }

        try {
            Square.children[4].children[2].children[1].value = '2020-12-30'
        }
        catch(warn) {
            
        }

        Square.children[2].innerHTML = array['taskDesc']

        //console.log(array)

        //string.style.backgroundColor = array["status"]
    }, 350)

    setTimeout(function() {
        Square.style.animation = null
    }, 500)
    
}

// MAKE SURE TASKS ARE ANIMATIBLE

function overrideMakeSureTasks () {
    var tasks = document.getElementsByClassName('task-Conts')
    for (i = 0; i < tasks.length; i++) {
        tasks[i].style.transition = 'ease 0.3s'
    }
}
window.addEventListener('DOMContentLoaded', (event) => {
    setTimeout(function() {
        
        overrideMakeSureTasks();
        if (document.getElementsByClassName('task-Conts').length == 0) {
            document.getElementsByClassName('add-Task-Click')[0].click()
        } 
    }, 500)


});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    var attachImg = document.createElement('img'); attachImg.src = "https://img.icons8.com/material-outlined/24/000000/link--v1.png"; attachImg.className = "attachment-icon"

    newTaskFiles.appendChild(newTaskFilesText)
    newTaskFiles.insertBefore(attachImg, newTaskFilesText)

    // SPACER DIV
    var spaceDiv = document.createElement('div'); spaceDiv.style.opacity = "0"; spaceDiv.style.whiteSpace = "nowrap"

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
    
    //console.log(finalCombinedTask)

    addEventListenersForTasksArrays();
    newTaskCont.click();

    document.getElementById('userSelectedTaskTitle').addEventListener('click', clearPlaceHolder)
}
//DELTE A TASK

document.getElementsByClassName('trash-task-icon-container')[0].addEventListener('click', function() {
    var tasks =  document.getElementsByClassName('task-Conts')
    var taskCont;
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].style.border != "none") {
            taskCont = tasks[i]
        }
    }

    var string = taskCont
    //console.log(string)
    delteTaskCurrent(string);
})

function delteTaskCurrent (string) {
    var targetCont = document.getElementById('userTasks') 
    targetCont.removeChild(string)

    autoSaveTasks();

    var id = parseInt(string.id.slice(string.id.length - 1))
    id = (id - 1)
    console.log(id)

    if (targetCont.children.length > 0) {
        setTimeout(function() {
            targetCont.children[(id)].click()
            console.log('clicked:' + targetCont.children[id])
        }, 0)
    } else {
        return;
    }

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
    
    if (document.getElementById('userTasks').children.length > 0) {

    } else {
        addTask(2);
    }

}

// STATUS UPDATES AND CHANGES BY CLIENT:

function updateClientTaskStatus(string) {
    var tasks =  document.getElementsByClassName('task-Conts')
    var taskCont;
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].style.border != "none") {
            taskCont = tasks[i]
        }
    }

    switch(string) {
        case 'Upcoming':
            taskCont.style.border = 'solid rgb(165, 155, 114)'
            taskCont.style.backgroundColor = 'rgb(218 211 184)'
            taskCont.lastChild.style.backgroundColor = 'rgb(230, 222, 186)'

            taskCont.lastChild.innerHTML = string
            taskCont.lastChild.style.color = '#a59b72'
        break;

        case 'Doing':
            taskCont.style.border = 'solid rgb(179 183 118)'
            taskCont.style.backgroundColor = '#E1E6A8'
            taskCont.lastChild.style.backgroundColor = 'rgb(238 241 194)'

            taskCont.lastChild.innerHTML = string
            taskCont.lastChild.style.color = 'rgb(157 160 109)'
        break;

        case 'Done':
            taskCont.style.border = 'solid rgb(141 179 131)'
            taskCont.style.backgroundColor = '#CBE3C6'
            taskCont.lastChild.style.backgroundColor = 'rgb(223 241 219)'

            taskCont.lastChild.innerHTML = string
            taskCont.lastChild.style.color = 'green'
            break;
    }
    autoSaveTasks();
    createArrays(taskCont)

    setTimeout(function() {
        animateNewTask()
    }, 100)
}
document.getElementById('select-status').addEventListener('change', function() {
    var status = document.getElementById('select-status').value
    //console.log(status)
    updateClientTaskStatus(status)
})

function updateClientDueDate (date) {
    var tasks =  document.getElementsByClassName('task-Conts')
    var taskCont;
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].style.border != "none") {
            taskCont = tasks[i]
        }
    }
    taskCont.children[3].innerHTML = date

    createArrays(taskCont)
    autoSaveTasks();
}
document.getElementById('dueDate').addEventListener('change', function() {
    var dueDate = document.getElementById('dueDate').value
    var readable =  moment(dueDate).format("MMM D YYYY");
    console.log(readable)
    updateClientDueDate(readable)
})
//////////////////////////////////
//ATTACHMENTS IDLE ANIMATION

function animateUploadButton (string) {
    var subject = document.getElementsByClassName('upload-icon-container')[0];

    if (string == 'yes') {
        subject.children[0].style.animation = 'upload-bounce-tease 1.1s ease-in-out infinite'
    } else {
        subject.children[0].style.animation = null
    }
}
/*

FilePond.registerPlugin(FilePondPluginImagePreview);
FilePond.create(
    document.getElementById('filePondAttatchments'),
    {
        imagePreviewMaxHeight: 90,
    }
  );
  FilePond.setOptions({
    server: 'http://localhost:8888/Imgs/Server'
});

const pond = document.querySelector('.filepond--root');
pond.addEventListener('FilePond:updatefiles', e => {
    console.log('File added', e.detail);
});
*/


//  FILESTACK  /////////////////////////

const client = filestack.init('ALxoEda6VQ76Ilj7wYtGEz');

const options = {
    // WHEN FILE IS UPLOADED 
    onUploadDone: file => {

        setTimeout(function(){     
            // IF THE FILE IS PRESENT:
            if(typeof (file['filesUploaded'][0]['url']) !== "undefined"){

                var nameFile = file['filesUploaded'][0]['filename']
                var urlFile = file['filesUploaded'][0]['url']
                console.log(urlFile)
                console.log(file)
                
                // SET A TEMP LOCAL STORAGE WITH THE URL AND NAME OF FILE
                localStorage.setItem('TEMPurlsClient',  urlFile)
                localStorage.setItem('TEMPnamesClient',  nameFile)
    
                // GET THE FOCUSED TASK
                var tasks =  document.getElementsByClassName('task-Conts');
                var taskCont;
                for (i = 0; i < tasks.length; i++) {
                    if (tasks[i].style.border != "none") {
                        taskCont = tasks[i]
                    }
                }
    
                // SAVE THE TASK WITH THE ATTACHMENT
                createArrays(taskCont)
                setTimeout(function() {
                    var lol =  returnFocusedTaskPlease()
                    animateNewTask(lol)
                }, 500)
            }
        }, 200)

    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function deleteAttachment () {
   // console.log(this)

    var Number = this.classList[0]
    var nodeNumber = (Number.charAt(Number.length - 1) - 1)
    var childNode =  document.getElementById('file-uploads-container').children[nodeNumber]

    //console.log(childNode)

    document.getElementById('file-uploads-container').removeChild(childNode)
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

document.getElementsByClassName('upload-icon-container')[0].addEventListener('click', function() {
    var atCount = document.getElementById('file-uploads-container').children.length
    if (atCount >= 4) {

    } else {
        client.picker(options).open();
    }
})



function updateEditedTask () {
    var taskCont;
    var tasks =  document.getElementsByClassName('task-Conts')

    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].style.border != "none") {
            taskCont = tasks[i]
        }
    }
    createArrays(taskCont);
    

    var subjects = taskCont.children
    if (subjects.length == 5) {
        subjects[0].innerHTML = document.getElementById('userSelectedTaskTitle').innerHTML
        subjects[2].innerHTML = document.getElementById('clientDesc-Task').innerHTML
    }
    //console.log(subjects[2])

        // Number 13 is the "Enter" key on the keyboard
    autoSaveTasks ();
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

    } else {
        autoSaveTasks();
        setTimeout(function() {
            console.log('hello?')
            document.getElementsByClassName('trash-task-icon-container')[0].click()
            document.getElementsByClassName('add-Task-Click')[0].click()
        }, 500)
    }


}
loadSavedTasks();



function clearHtmlReset() {
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

    for (s = 0; s < subjects.length; s++) {
        if (subjects[s].style.border != "none") {
            localStorage.setItem('mark', subjects[s].id.slice(subjects[s].id.length - 1))
        }
    }

    for (i = 0; i < subjects.length; i++) {
        subjects[i].style.border = "none"
        subjects[i].style.transition = "none"
    }

    switch(this.style.backgroundColor) {
        default: 
        this.style.border = 'solid rgb(165, 155, 114)'
        break;
        case 'rgb(218, 211, 184)':
            this.style.border = 'solid rgb(165, 155, 114)'
        break;

        case 'rgb(225, 230, 168)':
            this.style.border = 'solid rgb(179 183 118)'
        break;

        case 'rgb(203, 227, 198)':
            this.style.border = 'solid rgb(141 179 131)'
            break;
    }


    localStorage.setItem('target', this.id.slice(this.id.length - 1))
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

            var urls = '{"filestack":[{}]}'
            urls = JSON.parse(urls)

            var focused =  returnFocusedTaskPlease();
            if (this.classList.contains('marked-already')) {
                var prev =  JSON.parse(localStorage.getItem(focused.classList[1]))


                if (prev['urls']) {
                    var urls = prev['urls']
                    var urlString = localStorage.getItem('TEMPurlsClient')
                    var urlName =  localStorage.getItem('TEMPnamesClient')

                    for (i = 0; i < urls['filestack'].length; i++) {
                        if (urlString == urls['filestack'][i]) {
                            var sameFile = 'true'
                        } 
                    }
                    if (sameFile == 'true') {
                        //console.log('We found a match! Not adding file.')
                        localStorage.setItem('TEMPurlsClient', '')
                    } else {
                        urls['filestack'].push({ "url" : urlString, "name" : urlName})
                        localStorage.setItem('TEMPurlsClient', '')
                        //console.log(urls)
                    }
                } else {
                    var urls = '{"filestack":[]}'
                    urls = JSON.parse(urls)

                    var urlString = localStorage.getItem('TEMPurlsClient')
                    urls['filestack'].push({ "url" : urlString, "name" : urlName})
                    localStorage.setItem('TEMPurlsClient', '')
                    //console.log(urls)
                }
            }

            var dueDate = this.children[3].innerHTML
            var status = this.style.backgroundColor
            var taskDesc = this.children[2].innerHTML

            var array = {
                "title": title,
                urls,
                "due" : dueDate,
                "status" : status,
                "taskDesc" : taskDesc,
            }
            //console.log(array)
    
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

            // CREATE DATA ARRAY
            var title = string.children[0].innerHTML

            var attachments = string.children[1].children[1].innerHTML;

            var focused =  returnFocusedTaskPlease();
            if (string.classList.contains('marked-already')) {
                var prev =  JSON.parse(localStorage.getItem(focused.classList[1]))

                if (prev['urls']) {
                    var urls = prev['urls']
                    var urlString = localStorage.getItem('TEMPurlsClient')
                    var urlName =  localStorage.getItem('TEMPnamesClient')

                    for (i = 0; i < urls['filestack'].length; i++) {
                        if (urlString == urls['filestack'][i]) {
                            var sameFile = 'true'
                        } 
                    }
                    if (sameFile == 'true') {
                        //console.log('We found a match! Not adding file.')
                        localStorage.setItem('TEMPurlsClient', '')
                    } else {
                        urls['filestack'].push({ "url" : urlString, "name" : urlName})
                        localStorage.setItem('TEMPurlsClient', '')
                        //console.log(urls)
                    }
                } else {
                    var urls = '{"filestack":[]}'
                    urls = JSON.parse(urls)

                    var urlString = localStorage.getItem('TEMPurlsClient')
                    urls['filestack'].push({ "url" : urlString, "name" : urlName})
                    localStorage.setItem('TEMPurlsClient', '')
                    //console.log(urls)
                }
            }
            
            var dueDate = string.children[3].innerHTML
            var status = string.style.backgroundColor
            var taskDesc = string.children[2].innerHTML
            //console.log(status)
            var array = {
                "title": title,
                urls,
                "due" : dueDate,
                "status" : status,
                "taskDesc" : taskDesc,
            }
            //console.log(array)
            
            

            if (string.classList.contains('marked-already')) {
                var alreadyNum = string.classList[1]
    
                localStorage.setItem(alreadyNum, JSON.stringify(array))

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

if (document.getElementById('userTasks').children.length > 0) {
    /*
    if (localStorage.getItem('taskToFocusOnLoad')) {
        document.getElementById(localStorage.getItem('taskToFocusOnLoad')).click()
    }
    */
   document.getElementById('userTasks').children[0].click()
}


function returnFocusedTaskPlease () {
    var taskCont;
    var tasks =  document.getElementsByClassName('task-Conts')

    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].style.border != "none") {
            taskCont = tasks[i]
        }
    }

    return taskCont;
}
// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));

// let nextId = JSON.parse(localStorage.getItem("nextId"));

const taskName = document.querySelector('#taskName');

const datePicker = document.querySelector('#datepicker');
const taskDescription = document.querySelector('#taskDescription');

const taskSubmitBut = $('#taskSubmit');

const testClass = document.getElementsByClassName('remove')
console.log(testClass)


if (taskList === null){
     taskList = []
} else {
    taskList = JSON.parse(localStorage.getItem("tasks"));
}

function createTaskCard(task) {
    console.log('creating taskCard')
  
    console.log(dayjs())

    console.log(task.taskDate)

    console.log(dayjs().isAfter(dayjs(task.taskDate)))
    
    let bgColor = "" 
    
    if (dayjs().isSame(dayjs(task.taskDate), 'day')) {
        console.log('yellow')
        bgColor = "yellow"

    }else if (dayjs().isAfter(dayjs(task.taskDate))) {
        console.log('red')
        bgColor = "red"
    }


function generateTaskId() {
    var uniqID = 'id' + (new Date()).getTime(); 
    // https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
  
    return uniqID

}

    switch (task.taskStatus){
        case 'placeHolder':
            console.log(`you understand Switch cases`)    
            break;

        case 'in-progress-cards':
            $('#in-progress-cards').append(cardObject)
            break;

        case 'done-cards':
            $('#done-cards').append(cardObject)
            cardObject.removeClass("yellow red")

            break;
        case 'todo-cards':
            $('#todo-cards').append(cardObject) 
    }



    $(".draggable").draggable({
        revert: "invalid",
        zIndex: 100,
        helper: "clone",
        cursor: "grab",
    } );


}

function handleDrop(event, ui) {
}

$(".droppable").droppable({
    accept: ".draggable",
    
    drop: function(event, ui){
        console.log(ui)
        
        let task
    for (let i = 0; i < taskList.length; i++ ) {

        if (JSON.parse(taskList[i]).uniqID == ui.draggable[0].id ) {

            console.log(JSON.parse(taskList[i]).taskStatus)

            console.log(event.target.children[0].id)

            tempTaskList = taskList

            taskObject = JSON.parse(taskList[i])

            taskObject.taskStatus = event.target.children[0].id
            
            tempTaskList[i] = JSON.stringify(taskObject)
            
            localStorage.setItem("tasks" , JSON.stringify(tempTaskList))
           
            console.log('MATCH!!!')
            break;

        } else{
         console.log('not a match')
        }

        function renderTaskList() {

    
            $('.cards').html("");
            console.log("displaying task?")
            for (let i = 0; i < taskList.length; i++) {
                // console.log(JSON.parse(taskList[i]))
                createTaskCard(JSON.parse(taskList[i]))
                
        }
        
        }

    }   
    function handleAddTask(event){
    }
    
    function handleDeleteTask(event){ 
        console.log( $(this) )
        
        console.log( event.target.parentElement.id)
        for (let i = 0; i < taskList.length; i++ ) {

            if(JSON.parse(taskList[i]).uniqID == event.target.parentElement.id) {
                
                tempTaskList = taskList

                tempTaskList.splice(i,1)
               
                localStorage.setItem("tasks" , JSON.stringify(tempTaskList))
                renderTaskList()
                return
            }
            else {
    
                console.log ('no works?')
            }
        }
        
         renderTaskList();

    }
   
        } 
})

$(document).ready(function () {

    
    $( "#datepicker" ).datepicker(); 
    renderTaskList()


    $(taskSubmitBut).click(function(){
       
        let uniqID = generateTaskId()

        let newTask = {
            uniqID: uniqID,

            taskName : taskName.value,

            taskDate: datePicker.value,

            taskDescription : taskDescription.value,

            taskStatus: 'todo-cards'


          };
          taskList.push(JSON.stringify(newTask))

          localStorage.setItem("tasks" , JSON.stringify(taskList))

          createTaskCard(newTask)

          
      });

});
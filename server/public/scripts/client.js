console.log('js');

$(document).ready(onReady);

function onReady() {
    console.log('On ready test');
    getTaskData();
    $(document).on('click', '#submitBtn', postTaskData);
    $('#toDoList').on('click', '#completeBtn', updateTask);
    $('#toDoList').on('click', '#deleteBtn', deleteTask);
}

//Get data from the server
function getTaskData(){
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function(response){
        tasks = response;
        console.log('The response is', response);

        //append data to the DOM
        $('#toDoList').empty();
        for (let i = 0; i < response.length; i++){
            if (response[i].complete === false || response[i].complete === null){
                $('#toDoList').append(`
                    <tr data-id="${response[i].id}" data-complete=${response[i].complete}>
                        <td id="task">${response[i].task}</td>
                        <td><button id="completeBtn">Complete Task</button>
                        <td><button id="deleteBtn">Delete</button>
                    </tr>
                `);
            } else if (response[i].complete === true){
                $('#toDoList').append(`
                    <tr data-id="${response[i].id}" data-complete=${response[i].complete}>
                        <td id="task" class="completeTask" class="moveTask">${response[i].task}</td>
                        <td><button id="completeBtn">Complete Task</button>
                        <td><button id="deleteBtn">Delete</button>
                    </tr>
                `);
            }
        } //end for loop
    }).catch(function(error){
        console.log('error in client', error);
    })
} //end getTaskData function

function postTaskData(){
    console.log('button clicked');
    //req.body
    let toDoList = {
        task: $('#createTaskIn').val(),
    }; //end toDoList object
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: toDoList
    }).then(function(response){
        $('#createTaskIn').val('')
        $('#createCompleteIn').val('')
        getTaskData();
    }).catch(function(error){
        console.log('error in client POST', error);
    })
}

function updateTask() {
    let id = $(this).closest('tr').data('id');
    let isComplete = $(this).closest('tr').data('complete');
    console.log('isComplete', isComplete);

    if (isComplete === false || isComplete === null) {
        isComplete = true;
    } 

    $.ajax({
        type: 'PUT',
        url: `/todo/${id}`,                     //id becomes req.params.id
        data: {isComplete: isComplete}          //data becomes req.body
    }).then(function (response) {
        console.log('response', response)
        getTaskData();                          //refresh the data
    }).catch(function (error) {
        console.log('error in PUT', error);
    });
}

function deleteTask() {
    let taskId = $(this).closest('tr').data('id')
    console.log('taskId is', taskId)
    $.ajax({
        type: 'DELETE',
        url: `/todo/${taskId}`,
    }).then(function (res) {
        getTaskData();
    })
}


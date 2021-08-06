console.log('js');

$(document).ready(onReady);

function onReady() {
    console.log('On ready test');
    getTaskData();
    $(document).on('click', '.submitBtn', postTaskData);
    $('#toDoList').on('click', '.deleteBtn', deleteTask);
}

function getTaskData(){
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function(response){
        console.log('The resonse is', response);

        $('#toDoList').empty();
        for (let i = 0; i < response.length; i++){
            $('#toDoList').append(`
                <tr data-id="${response[i].id}">
                    <td>${response[i].task}</td>
                    <td><button class="deleteBtn">Delete</button>
                </tr>
            `);
        } //end for loop
    }) //end response
} //end getTaskData function

function postTaskData(){
    console.log('button clicked');
    let toDoList = {
        task: $('#createTaskIn').val()
    }; //end toDoList object
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: toDoList
    }).then(function(response){
        $('#createTaskIn').val('')
        getTaskData();
    });
}

function deleteTask() {
    let taskId = $(this).closest('tr').data('id')
    //.parents('tr');
    console.log('taskId is', taskId)
    $.ajax({
        type: 'DELETE',
        url: `/todo/${taskId}`,
    }).then(function (res) {
        getTaskData();
    })
}


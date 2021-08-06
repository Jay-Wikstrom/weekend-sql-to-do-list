console.log('js');

$(document).ready(onReady);

function onReady() {
    console.log('On ready test');
    $(document).on('click', '.submitBtn', postTaskData);
}

function getTaskData(){
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function(response){
        console.log('The resonse is', response);

        for (let i = 0; i < response.length; i++){
            $('#toDoList').append(`
                <tr>
                    <td>${response[i].task}</td>
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
    $ajax({
        type: 'POST',
        url: '/todo',
        data: toDoList
    }).then(function(response){
        $('#createTaskIn').val('')
        getTaskData();
    });
}


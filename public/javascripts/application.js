jQuery(function($) {

    var tasksContainer = $('#tasks');
    $('#taskName').focus();

    var newTaskItem = function(task) {
        return $("<li />", {
            id: task.id,
            "class": "task_item ui-state-default"
        }).append($("<span />", {
            "class": "delete_task_btn ui-icon ui-icon-circle-close",
            task_id: task.id
        // })).append($("<input />", {
        //     name: "hour",
        //     "class": "input_hour",
        //     type: "text",
        //     task_id: task.id,
        //     value: task.hour
        })).append(task.name);
    };
    
    var refresh = function() {
        $.getJSON("/tasks", function(tasks){
          tasksContainer.empty();
          for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            tasksContainer.append(newTaskItem(task));
            if (task.active){
              $('#' + task.id).removeClass('ui-state-default').addClass('ui-state-highlight');
            }
          }
        });

        tasksContainer.sortable({
            placeholder: 'ui-state-highlight',
            update: function(event, ui) {
                $.post('/tasks/reorder',{"ids":tasksContainer.sortable('toArray')});
            }
        });

        $.getJSON("/timelogs", function(logs){
          Indicator.show(logs);
        });
    };

    $('#datepicker').datepicker().datepicker( 'setDate' , new Date());

    var currentTimeLog = null;
    $('#datepicker').change(function() {
      refresh();
    }).change();

    $('#add_task_form').submit(function(){
        $.post('/tasks',{"task":{"name":$('#taskName').val()}}, function() {
          refresh(currentTimeLog);
          $('#taskName').val('');
          $('#taskName').focus();
        });
        return false;
    });

    $(".delete_task_btn").live("click", function(){
        $.post('/tasks/'+$(this).attr('task_id'),{"_method":"delete"}, function() {
          refresh(currentTimeLog);
        });
    });

    $('.task_item').live("dblclick",function() {
        $.post('/tasks/'+$(this).attr('id')+"/toggle",{},function() {
          refresh(currentTimeLog);
        });
    });
});

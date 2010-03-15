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
        })).append(task.name);
    };
    var refreshDiary = function() {
      $.getJSON("/diary/pulse", function(diary){
        if (diary.current_task_id){
          $('#' + diary.current_task_id).removeClass('ui-state-default').addClass('ui-state-highlight');
        }
        Indicator.show(diary);
      });
    }
    
    var refresh = function() {
        $.getJSON("/tasks", function(tasks){
          tasksContainer.empty();
          for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            tasksContainer.append(newTaskItem(task));
          }
          refreshDiary();
        });

        tasksContainer.sortable({
            placeholder: 'ui-state-highlight',
            update: function(event, ui) {
                $.post('/tasks/reorder',{"ids":tasksContainer.sortable('toArray')});
            }
        });

    };

    $.doTimeout(60 * 1000,function(){
        refreshDiary();
        return true;
    });

    $('#add_task_form').submit(function(){
        $.post('/tasks',{"task":{"name":$('#taskName').val()}}, function() {
          refresh();
          $('#taskName').val('');
          $('#taskName').focus();
        });
        return false;
    });

    $(".delete_task_btn").live("click", function(){
        $.post('/tasks/'+$(this).attr('task_id'),{"_method":"delete"}, function() {
          refresh();
        });
    });

    $('.task_item').live("dblclick",function() {
        $.post('/diary/'+$(this).attr('id')+"/toggle",{},function() {
          refresh();
        });
    });

    refresh();
});
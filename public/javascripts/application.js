jQuery(function($) {
    $("#tabs").tabs({
                    ajaxOptions: {
//                      success: function(xhr,status,index,anchor) {
//                        refresh();
//                      },
                      error: function(xhr, status, index, anchor) {
                        $("#notice").html("Couldn't load this tab.");}}
                   });
});

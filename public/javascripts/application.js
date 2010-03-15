jQuery(function($) {
    $("#tabs").tabs({
                    ajaxOptions: {
                      error: function(xhr, status, index, anchor) {
                        $("#notice").html("Couldn't load this tab.");}}
                   });
});

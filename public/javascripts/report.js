jQuery(function($) {

    $('#from_date').datepicker().datepicker( 'setDate' , new Date());
    $('#to_date').datepicker().datepicker( 'setDate' , new Date());

    $('#report_form').submit(function(){
        $.post('/report/list',{"from":$('#from_date').val(),
                               "to":$('#to_date').val(),
                               "tag":$('#tag').val()},
                               function(html_data) {$('#report_div').html(html_data);});
        return false;
    });

});

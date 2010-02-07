var SolrDB = function($) {
    /**
    * Constructor
    */
    var SolrDB = function(url,option) {
        var self = this;
        self.url = url;
        option = option || {};
        self.updatePath = option.updatePath || '/update';
        self.selectPath = option.selectPath || '/select';

        /**
        * Public methods
        */
        this.post = function(objectOrArray,afterPost) {
            var xml = '<add>';
            var objArray = [];
            ($.isArray(objectOrArray)) ? objArray = objectOrArray : objArray.push(objectOrArray);
            for(var i in objArray) {
                var obj = objArray[i];
                xml += '<doc>';
                var data = eval('('+JSON.stringify(obj)+')');
                for (var field in data) {
                    xml += '<field name="'+field+'">'
                    if (typeof data[field] == 'object') {
                        xml += JSON.stringify(data[field]);
                    } else {
                        xml += data[field];
                    }
                    xml += '</field>'
                }
                xml += '</doc>';
            }

            xml += '</add>';

            $.ajaxSetup({contentType:'text/xml; charset=utf-8'});
            $.post(self.url+self.updatePath,xml,function(responseData) {
                $.post(self.url+self.updatePath,'<commit/>');
            });
        };

        this.search = function(query,fnCallBack,option) {
            $.get(self.url+self.selectPath,{q:query},function(data) {
                var result = [];
                $(data).find("doc").each(function() {
                    var doc = $(this);
                    var jsonDoc = {};
                    doc.children().each(function() {
                        var field = $(this);
                        var fieldName = field.attr('name');
                        var text = field.text();
                        if (this.tagName == 'str') {
                            if (/^{.*}$/.exec(text) || /^\[.*\]$/.exec(text)) {
                                jsonDoc[fieldName] = JSON.parse(text);
                            } else {
                                jsonDoc[fieldName] = text;
                            }
                        } else if (this.tagName == 'date') {
                            var a =/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(text);
                            if (a) { jsonDoc[fieldName] = new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));}
                        } else {
                            jsonDoc[fieldName] = eval('('+text+')');
                        }
                    });
                    result.push(jsonDoc);
                });
                if (fnCallBack) fnCallBack(result);
            });
        };
    };

    return SolrDB;
}(jQuery);

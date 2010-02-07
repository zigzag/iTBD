var JSTemplate = function() {
	function private() {
		var self = this;
		this._parseLine = function(line,functionText) {
			var escaped=line.replace("\r","");
			escaped=escaped.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
			escaped=escaped.replace(/<!--begin/g,"<!--begin-->").replace(/end-->/g,"<!--end-->");
			var prefix;
			if (line.charAt(0)=='#') {
				prefix="stack.push(\""+escaped.replace(/\"/g,"\\\"")+ "\");\n";
				functionText.push(prefix+escaped.substring(1,escaped.length));
			} else {
				escaped=escaped.replace(/\"/g,"\\\"").replace(/<%/g,"\"+").replace(/%>/g,"+\"");
				prefix="stack.push(\""+escaped+ "\");\n";
				functionText.push(prefix+"out.push(\""+escaped+"\");");
			}
		};
	}

	function JSTemplate(template) {
		var self = this;
		self.template = template;
		private.call(this);

		/**
		* Public methods
		*/
	    this.process = function(context) {
			var parseResult;
			var functionText=["var tempFunction=function(context,stack) { with (context) {"];
			functionText.push("var out=[];");
			var lines = this.template.split('\n');
			for (var i = 0; i < lines.length; i++) {
				self._parseLine(lines[i], functionText);
			}
			functionText.push("return out.join(\"\\n\");");
			functionText.push("}}");
			try {
				eval(functionText.join(""));
			} catch (e) {
				alert(functionText.join("\n"));
				alert("eval ERROR("+ e.toString()+"). Check for unclosed, unmatched statement(s).");
				return;
			}

			var stack=[];
			try {
				parseResult = tempFunction(context,stack);
			} catch (e) {
				alert("ERROR("+e.toString()+") at \""+stack[stack.length-1]+"\"");
			}
			return parseResult;
		};
	  };
	  return JSTemplate;
}();

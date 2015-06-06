(function() {


  function BerMyHome(doc) {

    var regex = /^.*[\s]([0-9]*).*$/;

    this.getBerNo = function() {

    	var node = document.querySelector('.contentBER');

    	var textNode = null;
    	for(var i = 0; i < node.childNodes.length; i++){
    		var n = node.childNodes[i];
    		if(n.nodeType === 3 && n.textContent.indexOf('BER') !== -1){
    		 textNode = n;	
    		}
    	}

    	if(textNode){
    		var s = textNode.textContent.trim();
	    	var m = s.match(regex);
	    	if(m && m.length >= 2){
	    		return m[1];
	    	}
    	}
    };

    this.getNode = function() {
      return document.querySelector('.contentBER');
    };

    var helper = new com.ee.BerHelper(doc, this);
    helper.run();
  }

  document.addEventListener('DOMContentLoaded', function() {
    new BerMyHome(document);
  });


})(this);

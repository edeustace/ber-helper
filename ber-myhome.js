(function(){

  function BerMyHome(doc){

    function getBerNo(){

      var filter = {
        acceptNode: function(node) {
          console.log('n: ', node);
          return NodeFilter.FILTER_ACCEPT;
        }
      };
      var treeWalker = document.createTreeWalker( document.body, NodeFilter.SHOW_TEXT, filter, false);
      return null;
    }

    var berNo = getBerNo();
    console.log('found ber number: ', berNo);
  }

  document.addEventListener('DOMContentLoaded', function() {
    console.log('llll');

    new BerMyHome(document);
  });


})(this);

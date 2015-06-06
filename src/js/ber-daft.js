(function() {

  function BerDaft(doc) {

    var regex = /BER No.?([0-9]*)/;

    this.getBerNo = function() {

      var filter = {
        acceptNode: function(node) {
          if (node.textContent.trim().match(regex)) {
            return NodeFilter.FILTER_ACCEPT;
          } else {
            return NodeFilter.FILTER_SKIP;
          }
        }
      };
      var treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, filter, false);
      var n = treeWalker.nextNode();

      if (n) {
        var match = n.textContent.trim().match(regex);

        if (match && match.length === 2) {
          return match[1];
        }
      }
    };

    this.getNode = function() {
      return document.querySelector('#smi-ber-details');
    };

    var helper = new com.ee.BerHelper(doc, this);
    helper.run();
  }

  document.addEventListener('DOMContentLoaded', function() {
    new BerDaft(document);
  });


})(this);
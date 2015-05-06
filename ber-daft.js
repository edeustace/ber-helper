(function(){

  var bg = [
    '<div class="remodal-bg">',
      '...Page content...',
    '</div>'
  ].join('');

  var modal = [
    '<div class="remodal" data-remodal-id="modal">',
    '<pre class="modal-content"></pre>',
    '<a class="remodal-cancel" href="#">Cancel</a>',
    '<a class="remodal-confirm" href="#">OK</a>',
    '</div>'
  ].join('');

  function BerDaft(doc){

    $('body').append(bg);
    $('body').append(modal);

    var fa = document.createElement('style');
        fa.type = 'text/css';
        fa.textContent = '@font-face { font-family: FontAwesome; src: url("' +
        chrome.extension.getURL('bower_components/font-awesome/fonts/fontawesome-webfont.woff?v=4.0.3') +
        '"); }';

    document.head.appendChild(fa);
    //chrome.tabs.insertCSS(null, "//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css");
    console.log('-----> BerDaft::Constructor');

    // var styleNode = document.createElement ("style");
    // styleNode.type = "text/css";
    // styleNode.textContent = "@font-face { " +
    // " font-family: 'FontAwesome'; " +
    // " src: url('" + chrome.extension.getURL ("bower_components/font-awesome/fonts/font-awesome-webfont.woff") + "'); " +
    // "}";
                        ;
    //document.head.appendChild (styleNode);

    var regex = /BER No.?([0-9]*)/;
    function getBerNo(){

      var filter = {
        acceptNode: function(node) {
          if(node.textContent.trim().match(regex)){
            return NodeFilter.FILTER_ACCEPT;
          } else {
            return NodeFilter.FILTER_SKIP;
          }
        }
      };
      var treeWalker = document.createTreeWalker( document.body, NodeFilter.SHOW_TEXT, filter, false);
      var n = treeWalker.nextNode();

      if(n){
        var match = n.textContent.trim().match(regex);

        if(match && match.length === 2){
          return match[1];
        }
      }
    }

    function url(n){
      //return 'http://localhost:3000/' + n + '.json';
      return 'http://better-ber.herokuapp.com/' + n + '.json';
    }

    function loadInfo(number, done){
      $.get(url(number), function(info){
        done(null, info);
      });
    }

    var berNo = getBerNo();

    if(berNo){
      console.log('found ber number: ', berNo);

      loadInfo(berNo, function(err, info){
        console.log('info: ', info);
        var node = document.querySelector('#smi-ber-details');
        if(node){

          $('.modal-content').html(JSON.stringify(info, null, '  '));

          $(node).append(['<a id="ber-helper-icon">',
            '<i class="fa fa fa-tachometer large"></i> Ber Helper',
          '</a>'].join(''));

          $('#ber-helper-icon').click(function(){
            console.log('------> ');
            $('[data-remodal-id=modal]').remodal({}).open();
          })
        } else {
          console.warn('no node: #smi-ber-details');
        }
        //$('.tooltipText').html('<pre>' + JSON.stringify(info, null, '  ') + '</pre>');
      });
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    new BerDaft(document);
  });


})(this);

(function() {

  window.com = window.com || {};
  com.ee = com.ee || {};

  var bg = [
    '<div class="remodal-bg">',
    '...Page content...',
    '</div>'
  ].join('');

  var modal = [
    '<div class="remodal" data-remodal-id="modal">',
    '<div class="modal-header"></div>',
    '<div class="modal-content"></div>',
    '<div class="modal-footer">data from <a target="_blank" href="//www.seai.ie">seai</a></div>',
    '<br/>',
    '</div>'
  ].join('');


  function url(n) {
    return 'http://better-ber.herokuapp.com/' + n + '.json';
  }

  function BerHelper(doc, page) {

    function loadInfo(number, done) {
      $.get(url(number), function(info) {
        done(null, info);
      });
    }

    $('body').append(bg);
    $('body').append(modal);

    var fa = document.createElement('style');
    fa.type = 'text/css';
    fa.textContent = '@font-face { font-family: FontAwesome; src: url("' +
      chrome.extension.getURL('bower_components/font-awesome/fonts/fontawesome-webfont.woff?v=4.0.3') +
      '"); }';

    document.head.appendChild(fa);


    function capitalize(l) {
      var arr = l.split('-');
      var firstWord = arr[0];
      firstWord = firstWord.replace(/(?:^|\s)\S/g, function(a) {
        return a.toUpperCase();
      });
      return [firstWord].concat(arr.splice(1)).join(' ');
    }

    function buildMarkup(info) {

      var entries = [];

      for (var x in info) {
        if (x !== '_id' && x !== 'ber-number' && x !== 'address') {
          var label = capitalize(x);
          var n = '<tr class="ber-helper-entry">' +
            '<td class="ber-helper-label">' + label + '</td>' +
            '<td class="ber-helper-value">' + info[x] + '</td>' +
            '</tr>';
          entries.push(n);
        }
      }
      return '<table>' + entries.join('') + '</table>';
    }

    this.run = function() {

      var berNo = page.getBerNo();
      var node = page.getNode();

      if (berNo) {
        $(node).append('<span class="ber-helper">Loading info from www.seai.ie...</span>');

        loadInfo(berNo, function(err, info) {

          var markup = buildMarkup(info);
          $('.modal-header').html('Ber Number: ' + info['ber-number']);
          $('.modal-content').html(markup);

          $('.ber-helper').html('<a id="ber-helper-icon">more info...</a>');

          $('#ber-helper-icon').click(function() {
            $('[data-remodal-id=modal]').remodal({}).open();
          });
        });
      }
    };
  }

  com.ee.BerHelper = BerHelper;

})(this);
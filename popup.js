(function(){

  function PropUtil(doc){

    function getBerNo(){
     var xpath = '//*[@id="smi-ber-details"]/../text()[2]';
     var raw = document.evaluate(xpath, document.body, null, XPathResult.STRING_TYPE, null);
     var match = raw.stringValue.match('BER No\\. ([0-9]*)');
     if(match.length == 2){
      return match[1];
     } else {
      return null;
     }
    }

    var berNo = getBerNo();
    console.log('found ber number: ', berNo);
  }

  document.addEventListener('DOMContentLoaded', function() {
    console.log('llll');

    new PropUtil(document);
  });


})(this);

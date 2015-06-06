describe('ber-helper', function(){

  var chrome, doc, page, mock$, jqMock;

  beforeEach(function(){
    doc = {
      head: {
        appendChild: jasmine.createSpy('appendChild')
      },
      createElement: jasmine.createSpy('createElement').and.returnValue({})
    };

    page = {
      getBerNo: jasmine.createSpy('getBerNo'),
      getNode: jasmine.createSpy('getNode')
    };

    jqMock = {
      append : jasmine.createSpy('append'),
      html: jasmine.createSpy('html'),
      click: jasmine.createSpy('click')
    };

    mock$ = function(n){
      return jqMock;
    };

    mock$.get = jasmine.createSpy('get');

  });

  beforeEach(function(){
    window.chrome = {
      extension: {
        getURL: jasmine.createSpy('getURL')
      }
    };
    window.$ = mock$;
  });

  describe('constructor', function(){
    it('constructs', function(){
      var helper = com.ee.BerHelper(doc,page);
      expect(helper).not.toBe(null);
    });
  });

  describe('run', function(){

    it('sets nothing if there is no ber number', function(){
      page.getBerNo.and.returnValue(null);
      var helper = new com.ee.BerHelper(doc, page);
      helper.run();
      expect(jqMock.append).not.toHaveBeenCalledWith('<span class="ber-helper">Loading info from www.seai.ie...</span>');
    });

    it('sets loading message', function(){
      page.getBerNo.and.returnValue('1111');
      page.getNode.and.returnValue({});
      var helper = new com.ee.BerHelper(doc, page);
      helper.run();
      expect(jqMock.append).toHaveBeenCalledWith('<span class="ber-helper">Loading info from www.seai.ie...</span>');
    });

    it('sets the info on load', function(){
      page.getBerNo.and.returnValue('1111');
      page.getNode.and.returnValue({});
      mock$.get.and.callFake(function(url, cb){
        cb({'ber-number': '111', 'a' : 'b'});
      });
      var helper = new com.ee.BerHelper(doc, page);
      helper.run();
      expect(jqMock.append).toHaveBeenCalledWith('<span class="ber-helper">Loading info from www.seai.ie...</span>');
      expect(jqMock.html).toHaveBeenCalledWith('<a id="ber-helper-icon">more info...</a>');
      expect(jqMock.html).toHaveBeenCalledWith('<table><tr class="ber-helper-entry"><td class="ber-helper-label">A</td><td class="ber-helper-value">b</td></tr></table>');
      expect(jqMock.html).toHaveBeenCalledWith('Ber Number: 111');
      expect(jqMock.click).toHaveBeenCalled();
    });
  });
});

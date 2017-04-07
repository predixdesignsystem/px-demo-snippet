document.addEventListener("WebComponentsReady", function() {
  runCustomTests();
});

function runCustomTests() {

  describe('px-demo-snippet', function () {
    var demoSnippet;

    beforeEach(function() {
      demoSnippet = fixture('DemoSnippetFixture');
    });

    describe('unit tests', function() {
      it('stringifies a valid Object or Array with `_tryToStringify`', function() {
        var objString = demoSnippet._tryToStringify({"test":"object"});
        var arrString = demoSnippet._tryToStringify(['test','array']);
        expect(objString).to.equal('{"test":"object"}');
        expect(arrString).to.equal('["test","array"]');
      });

      it('correctly prints Boolean and stringy Boolean values with `_printProperties`', function() {
        var propNames = ['boolTrue', 'boolFalse', 'strTrue', 'strFalse'];
        var props = {
          'boolTrue' : true,
          'boolFalse' : false,
          'strTrue' : 'true',
          'strFalse' : 'false'
        };
        var output = demoSnippet._printProperties(propNames, props);
        expect(output).to.have.lengthOf(2);
        expect(output).to.include('bool-true');
        expect(output).to.include('str-true');
      });

      it('correctly prints String values with `_printProperties`', function() {
        var propNames = ['str', 'emptryStr'];
        var props = {
          'str' : 'some value',
          'emptryStr' : ''
        };
        var output = demoSnippet._printProperties(propNames, props);
        expect(output).to.have.lengthOf(1);
        expect(output).to.include('str="some value"');
      });

      it('correctly prints Number values with `_printProperties`', function() {
        var propNames = ['num', 'zeroNum'];
        var props = {
          'num' : 12,
          'zeroNum' : 0
        };
        var output = demoSnippet._printProperties(propNames, props);
        expect(output).to.have.lengthOf(2);
        expect(output).to.include('num="12"');
        expect(output).to.include('zero-num="0"');
      });

      it('correctly prints Object and Array values with `_printProperties`', function() {
        var propNames = ['simpleArr', 'smallObj', 'bigObj'];
        var props = {
          'simpleArr' : ['item1', 'item2'],
          'smallObj' : {'testy' : 'testTest'},
          'bigObj' : { arr: ['thing1', 'thing2'], str: 'other thing' }
        };
        var output = demoSnippet._printProperties(propNames, props);
        expect(output).to.have.lengthOf(3);
        expect(output).to.include('simple-arr=\'["item1","item2"]\'');
        expect(output).to.include('small-obj=\'{"testy":"testTest"}\'');
        expect(output).to.include('big-obj=\'{"arr":["thing1","thing2"],"str":"other thing"}\'');
      });

      it('gracefully recovers from recursive Object stringify failure with `_printProperties`', function() {
        var recursiveObj = {};
        recursiveObj.a = { b: recursiveObj };
        var propNames = ['recursiveObj'];
        var props = {
          recursiveObj: recursiveObj
        };
        var output = demoSnippet._printProperties(propNames, props);
        expect(output).to.have.lengthOf(1);
        expect(output).to.include('recursive-obj=\'[object Object]\'');
      });
    });

    describe('attribute API tests', function() {
      var name;
      var props;

      beforeEach(function() {
        name = 'px-foo';
        props = {
          'str' : 'some string',
          'arr' : ['item1', 'item2'],
          'boolTrue' : true,
          'boolFalse' : false
        };
      });

      it('prints its name and attributes to _output to be rendered', function(done) {
        demoSnippet.set('elementName', name);
        demoSnippet.set('elementProperties', props);

        setTimeout(function() {
          expect(demoSnippet._output).to.include(name);
          expect(demoSnippet._output).to.include('str="some string"');
          expect(demoSnippet._output).to.include('arr=\'["item1","item2"]\'');
          // bool-true should be all by itself with no trailing ="true"
          expect(demoSnippet._output).to.match(/\sbool-true(?:\s|\>)/);
          // bool-false should not exist
          expect(demoSnippet._output).not.to.include('bool-false');
          done();
        }, 50);
      });

      it('highlights and renders its code', function(done) {
        demoSnippet.set('elementName', name);
        demoSnippet.set('elementProperties', props);

        setTimeout(function() {
          var content = demoSnippet.querySelector('#jeditor');
          expect(content.innerHTML).not.to.be.empty;
          expect(content.innerHTML).to.include(name);
          expect(content.innerHTML).to.include('<span class="token tag">');
          done();
        }, 500);
      });

      it('responds to element property changes and re-renders', function(done) {
        demoSnippet.set('elementName', name);
        demoSnippet.set('elementProperties', props);

        setTimeout(function() {
          demoSnippet.set('elementProperties.str', 'A_NEW_STRING');
        }, 10);

        setTimeout(function() {
          var content = demoSnippet.querySelector('#jeditor');
          expect(content.innerHTML).to.include('A_NEW_STRING');
          done();
        }, 500);
      });
    });
  });
}

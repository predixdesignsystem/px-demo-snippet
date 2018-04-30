/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

describe('px-demo-snippet', function (done) {
  describe('unit tests', function() {
    var demoSnippet;
    var indentationFixture;

    beforeEach(function(done) {
      demoSnippet = fixture('DemoSnippetFixture');
      indentationFixture = fixture('DemoSnippetFixtureWithIndents');
      flush(()=>{
        done();
      });
    });

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
    var demoSnippet;
    var name;
    var props;

    beforeEach(function() {
      demoSnippet = fixture('DemoSnippetFixture');
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
        // this is slightly bad because we are checking the output of Prism, but if it changes, then our regexs to add indentation will break, so bof.
        var content = demoSnippet.$$('#jeditor'),
            styleScopeOnly = 'class="style-scope px-demo-snippet"', //empty divs get a class attr and would not under shadow dom
            styleScope = 'style-scope px-demo-snippet',
            snippet = '<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>px-foo</span> <span class="token attr-name">str</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>some string<span class="token punctuation">"</span></span> <span class="token attr-name">arr</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">\'</span>[<span class="token punctuation">"</span>item1<span class="token punctuation">"</span>,<span class="token punctuation">"</span>item2<span class="token punctuation">"</span>]<span class="token punctuation">\'</span></span> <span class="token attr-name">bool-true</span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>px-foo</span><span class="token punctuation">&gt;</span></span>'.split(' ').join(''),
            html = content.innerHTML.split(styleScopeOnly).join('').split(styleScope).join('').split(' ').join('');
        expect(content.innerHTML).not.to.be.empty;
        expect(content.innerHTML).to.include(name);
        expect(html).to.equal(snippet);
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
        var content = demoSnippet.$$('#jeditor');
        expect(content.innerHTML).to.include('A_NEW_STRING');
        done();
      }, 500);
    });
  });

  describe('Applying basic indentation', function() {
    var demoSnippet;
    var name;
    var props;

    beforeEach(function() {
      demoSnippet = fixture('DemoSnippetFixtureWithIndents');
      name = 'px-foo';
      props = {
        'str' : 'some string',
        'arr' : ['item1', 'item2'],
        'boolTrue' : true,
        'boolFalse' : false,
        'myAttrWithStyle' : 'foo' //need to check an attr with the word style in it. Prism marks it up differently
      };
    });

    it('highlights and renders its code with divs', function(done) {
      demoSnippet.set('elementName', name);
      demoSnippet.set('elementProperties', props);

      setTimeout(function() {
        var content = demoSnippet.$$('#jeditor'),
            styleScopeOnly = 'class="style-scope px-demo-snippet"',
            styleScope = 'style-scope px-demo-snippet',
            snippet = ' <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>px-foo</span> <div class="keyVal"><span class="token attr-name">str</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>some string<span class="token punctuation">"</span></span> </div><div class="keyVal"><span class="token attr-name">arr</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">\'</span>[<span class="token punctuation">"</span>item1<span class="token punctuation">"</span>,<span class="token punctuation">"</span>item2<span class="token punctuation">"</span>]<span class="token punctuation">\'</span></span> </div><div class="keyVal"><span class="token attr-name">bool-true</span> </div><div class="keyVal"><span class="token attr-name">my-attr-with-</span><span class="token attr-name">style</span><span class="token punctuation">="</span><span class="token attr-value">foo</span><span class="token punctuation">"</span><span class="token punctuation">&gt;</span></div><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>px-foo</span><span class="token punctuation">&gt;</span></span></span>'.split(' ').join(''),
            html = content.innerHTML.split(styleScopeOnly).join('').split(styleScope).join('').split(' ').join('');
        expect(content.innerHTML).not.to.be.empty;
        expect(content.innerHTML).to.include(name);
        expect(html).to.equal(snippet);
        done();
      }, 500);
    });

    it('applies a style-scope when needed', function(done) {
      if(!!(document.head.createShadowRoot || document.head.attachShadow)){
        expect(true).to.equal.true;
        done();
      }else {
        demoSnippet.set('elementName', name);
        demoSnippet.set('elementProperties', props);

        setTimeout(function() {
          var content = demoSnippet.$$('#jeditor'),
          styleScope = ' style-scope px-demo-snippet';
          if(Polymer.Settings.useNativeShadow) {
            expect(content.innerHTML).to.not.include(styleScope);
          } else {
            expect(content.innerHTML).to.include(styleScope);
          }
          done();
        }, 500);
      }
    });
  });

  describe('Applying indentation with nested tags', function() {
    var demoSnippet;
    var name;
    var props;

    beforeEach(function() {
      demoSnippet = fixture('NestedDemoSnippet');
      name = 'px-foo';
      props = {
        'str' : 'some string',
        'arr' : ['item1', 'item2'],
        'boolTrue' : true,
        'boolFalse' : false,
        'parentComponent':[
          '<div style="height:400px;width:600px;display:flex"><px-bar flex-to-size disable-scroll-zoom disable-touch-zoom>',
          '</px-bar></div>'
        ],
        'siblingElement': [
          '<px-bof url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></px-bof>'
        ]
      }
    });

    it('highlights and renders its code with divs', function(done) {
      demoSnippet.set('elementName', name);
      demoSnippet.set('elementProperties', props);

      setTimeout(function() {
        var content = demoSnippet.$$('#jeditor'),
            styleScopeOnly = 'class="style-scope px-demo-snippet"',
            styleScope = 'style-scope px-demo-snippet',
            snippet = '<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token style-attr language-css"><div class="keyVal"><span class="token attr-name"> </span></div><div class="keyVal"><span class="token attr-name">style</span><span class="token punctuation">="</span><span class="token attr-value"><span class="token property">height</span><span class="token punctuation">:</span>400px<span class="token punctuation">;</span><span class="token property">width</span><span class="token punctuation">:</span>600px<span class="token punctuation">;</span><span class="token property">display</span><span class="token punctuation">:</span>flex</span><span class="token punctuation">"</span><span class="token punctuation">&gt;</span><div class="openTag"><div><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>px-bar</span> </span></div><div class="keyVal"><span class="token attr-name">flex-to-size</span> </div><div class="keyVal"><span class="token attr-name">disable-scroll-zoom</span> </div><div class="keyVal"><span class="token attr-name">disable-touch-zoom</span><span class="token punctuation">&gt;</span><div class="openTag"><div><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>px-foo</span> </span></div><div class="keyVal"><span class="token attr-name">str</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>some string<span class="token punctuation">"</span></span> </div><div class="keyVal"><span class="token attr-name">arr</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">\'</span>[<span class="token punctuation">"</span>item1<span class="token punctuation">"</span>,<span class="token punctuation">"</span>item2<span class="token punctuation">"</span>]<span class="token punctuation">\'</span></span> </div><div class="keyVal"><span class="token attr-name">bool-true</span><span class="token punctuation">&gt;</span></div></div><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>px-foo</span><span class="token punctuation">&gt;</span></span><div class="openTag"><div><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>px-bof</span> </span></div><div class="keyVal"><span class="token attr-name">url</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></div></div><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>px-bof</span><span class="token punctuation">&gt;</span></span></div></div><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>px-bar</span><span class="token punctuation">&gt;</span></span></div><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span></span>'.split(' ').join(''),
            html = content.innerHTML.split(styleScopeOnly).join('').split(styleScope).join('').split(' ').join('');
        expect(content.innerHTML).not.to.be.empty;
        expect(content.innerHTML).to.include(name);
        expect(html).to.equal(snippet);
        done();
      }, 500);
    });
  });
});

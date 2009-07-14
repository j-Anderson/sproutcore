// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Apple Inc. and contributors.
// License:   Licened under MIT license (see license.js)
// ==========================================================================
/*globals module ok equals same test MyApp */

// test parsing of query string
var q;
module("SC.Query evaluation", {
  setup: function() {  
    q = SC.Query.create();
  }
});


// ..........................................................
// PRIMITIVES
// 

test("should evaluate all primitives", function() {
  
  // null
  q.conditions = "null";
  q.parse();
  ok(q.tokenTree.evaluate() == null, 'null should be null');
  
  // undefined
  q.conditions = "undefined";
  q.parse();
  ok(q.tokenTree.evaluate() == undefined, 'undefined should be undefined');
  
  // true
  q.conditions = "true";
  q.parse();
  ok(q.tokenTree.evaluate() == true, 'true should be true');
  
  // false
  q.conditions = "false";
  q.parse();
  ok(q.tokenTree.evaluate() == false, 'false should be false');
  
  // integer
  q.conditions = "1";
  q.parse();
  ok(q.tokenTree.evaluate() == 1, '1 should be 1');
  
  // float
  q.conditions = "1.5";
  q.parse();
  ok(q.tokenTree.evaluate() == 1.5, '1.5 should be 1.5');
  
  // string
  q.conditions = "'Hyperion'";
  q.parse();
  ok(q.tokenTree.evaluate() == 'Hyperion', "'Hyperion' should be 'Hyperion'");
  
});

// ..........................................................
// COMPARATORS
// 

test("should evaluate all comparators", function() {
  
  q.conditions = "true = true";
  q.parse();
  ok(q.tokenTree.evaluate() == true, 'true = true should be true');
  
  q.conditions = "true = false";
  q.parse();
  ok(q.tokenTree.evaluate() == false, 'true = false should be false');
  
  q.conditions = "false != true";
  q.parse();
  ok(q.tokenTree.evaluate() == true, 'false != true should be true');
  
  q.conditions = "1 < 1.2";
  q.parse();
  ok(q.tokenTree.evaluate() == true, '1 < 1.2 should be true');
  
  q.conditions = "1.1 <= 1.2";
  q.parse();
  ok(q.tokenTree.evaluate() == true, '1.1 <= 1.2 should be true');
  
  q.conditions = "1.2 <= 1.2";
  q.parse();
  ok(q.tokenTree.evaluate() == true, '1.2 <= 1.2 should be true');
  
  q.conditions = "1.1 > 1.2";
  q.parse();
  ok(q.tokenTree.evaluate() == false, '1.1 > 1.2 should be false');
  
  q.conditions = "1.3 >= 1.2";
  q.parse();
  ok(q.tokenTree.evaluate() == true, '1.3 >= 1.2 should be true');
  
  q.conditions = "'Tea pot' BEGINS_WITH 'Tea'";
  q.parse();
  ok(q.tokenTree.evaluate() == true, "'Tea pot' BEGINS_WITH 'Tea' should be true");
  
  q.conditions = "'Tea pot' BEGINS_WITH 'Coffee'";
  q.parse();
  ok(q.tokenTree.evaluate() == false, "'Tea pot' BEGINS_WITH 'Coffee' should be false");
  
  q.conditions = "'Tea pot' ENDS_WITH 'a pot'";
  q.parse();
  ok(q.tokenTree.evaluate() == true, "'Tea pot' ENDS_WITH 'a pot' should be true");
  
  q.conditions = "'Tea pot' ENDS_WITH 'a cup'";
  q.parse();
  ok(q.tokenTree.evaluate() == false, "'Tea pot' ENDS_WITH 'a cup' should be false");
  
  q.conditions = "'Tea pot' CONTAINS 'Tea pot'";
  q.parseQuery();
  ok(q.tokenTree.evaluate() == true, "'Tea pot' CONTAINS 'Tea pot' should be true");
  
  q.conditions = "'Tea pot' CONTAINS 'Tea'";
  q.parseQuery();
  ok(q.tokenTree.evaluate() == true, "'Tea pot' CONTAINS 'Tea' should be true");
  
  q.conditions = "'Tea pot' CONTAINS 'pot'";
  q.parseQuery();
  ok(q.tokenTree.evaluate() == true, "'Tea pot' CONTAINS 'pot' should be true");
  
  q.conditions = "'Tea pot' CONTAINS 'a po'";
  q.parseQuery();
  ok(q.tokenTree.evaluate() == true, "'Tea pot' CONTAINS 'a po' should be true");
  
  q.conditions = "'Tea pot' CONTAINS 'a cup'";
  q.parseQuery();
  ok(q.tokenTree.evaluate() == false, "'Tea pot' CONTAINS 'a cup' should be false");
  
  q.conditions = "'Tea pot' MATCHES {myCup}";
  q.parse();
  ok(q.tokenTree.evaluate(null,{myCup: /a\sp/}) == true, "'Tea pot' MATCHES /a\sp/ should be true");
  
  q.conditions = "'Tea pot' MATCHES {myCup}";
  q.parse();
  ok(q.tokenTree.evaluate(null,{myCup: /ap/}) == false, "'Tea pot' MATCHES /ap/ should be false");
  
  q.conditions = "'Veterano' ANY {drinks}";
  q.parse();
  ok(q.tokenTree.evaluate(null,{drinks: ['Tempranillo','Bacardi','Veterano']}) == true, "'Veterano' should be in ['Tempranillo','Bacardi','Veterano']");
  
  q.conditions = "'Veterano' ANY {drinks}";
  q.parse();
  ok(q.tokenTree.evaluate(null,{drinks: ['soda','water']}) == false, "'Veterano' should not be in ['soda','water']");
}); 
  

// ..........................................................
// BOOLEAN OPERATORS
// 

test("boolean operators should work", function() {
  
  // here we see a limitation of the tree builder:
  // boolean values like true are considered to be a primitive
  // and boolean operators only accept comparators as arguments,
  // so "true AND true" will not parse into a tree!
  // hence i used a small hack here
  
  q.conditions = "1=1 AND 1=1";
  q.parse();
  ok(q.tokenTree.evaluate() == true, "true AND true should be true");
  
  q.conditions = "1=1 AND 1=2";
  q.parse();
  ok(q.tokenTree.evaluate() == false, "true AND false should be false");
  
  q.conditions = "1=1 OR 1=1";
  q.parse();
  ok(q.tokenTree.evaluate() == true, "true OR true should be true");
  
  q.conditions = "1=2 OR 1=2";
  q.parse();
  ok(q.tokenTree.evaluate() == false, "false OR false should be false");
  
  q.conditions = "NOT 1=1";
  q.parse();
  ok(q.tokenTree.evaluate() == false, "NOT true should be false");
  
});  
  
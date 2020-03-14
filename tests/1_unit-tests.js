var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32, 'getNum should handle whole numbers');
      done();
    });
    
    test('Decimal Input', function(done) {
      let input = '3.78541gal'
      assert.equal(convertHandler.getNum(input),3.78541, 'getNum should handle decimals');
      done();
    });
    
    test('Fractional Input', function(done) {
      let input =  '1/2gal'
      assert.equal(convertHandler.getNum(input),.5, 'getNum should handle fractions');
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      let input = '0.5/1km'
      assert.equal(convertHandler.getNum(input),.5, 'getNum should handle fractions with deimals');
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      let input = '1/2/3mi'
      assert.equal(convertHandler.getNum(input),'Invalid number', 'getNum should return Invalid number with double fractions');
      done();
    });
    
    test('No Numerical Input', function(done) {
      let input = 'km'
      assert.equal(convertHandler.getNum(input),1, 'getNum should handle no input');
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        assert.notEqual(convertHandler.getUnit(ele), 'Invalid unit', 'these inputs should not be invalid')
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      assert.equal(convertHandler.getUnit('oz'), 'Invalid unit', 'An invalid unit should return Invalid unit');
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var output = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach((inp, index) => {
        assert.equal(convertHandler.spellOutUnit(inp), output[index]);
      });
      done();
    });
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      let input = [3, 'l'];
      let expected = 0.79252;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      let input = [3.5, 'mi'];
      let expected = 5.63269;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      let input = [7, 'km'];
      let expected = 4.34961;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      let input = [210.5, 'lbs'];
      let expected = 95.48112;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      let input = [80.252, 'kg'];
      let expected = 176.92552;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
  });

});
class ConvertHandler {
  
  getNum(input) {
    let result;
    let index = input.search(/[a-zA-Z]/g);
    
    result = index > 0 ? input.slice(0, index) : '1';
    
    if (result.indexOf('/') > 0) {
      let fractionArray = result.split('/');
      if (fractionArray.length > 2) {
        return 'Invalid number'
      }
      result = fractionArray[0] / fractionArray[1];
    }
    
    return result;
  };
  
  getUnit(input) {
    let index = input.search(/[a-zA-Z]/g);
    let result = input.slice(index);
    
    return this.getReturnUnit(result) != 'Invalid unit' ? result.toLowerCase() : 'Invalid unit';
  };
  
  getReturnUnit(initUnit) {
    switch (initUnit.toLowerCase()) {
      case 'gal':
        return 'l';
      case 'l':
        return 'gal';
      case 'lbs':
        return 'kg';
      case 'kg':
        return 'lbs';
      case 'mi':
        return 'km';
      case 'km':
        return 'mi';
      default:
        return 'Invalid unit';
    }
  };

  spellOutUnit(unit) {
    switch (unit.toLowerCase()) {
      case 'gal':
        return 'gallons';
      case 'l':
        return 'liters';
      case 'lbs':
        return 'pounds';
      case 'kg':
        return 'kilograms'
      case 'mi':
        return 'miles';
      case 'km':
        return 'kilometers';
      default:
        return 'Invalid unit';
    }
  };
  
  convert(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let retVal;
    
    switch (initUnit) {
      case 'gal':
        retVal = initNum * galToL;
        break;
      case 'l':
        retVal = initNum / galToL;
        break;
      case 'lbs':
        retVal = initNum * lbsToKg;
        break;
      case 'kg':
        retVal = initNum / lbsToKg;
        break;
      case 'mi':
        retVal = initNum * miToKm;
        break;
      case 'km':
        retVal = initNum / miToKm;
        break;
      default:
        return retVal = 'Invalid unit';
    }
    
    return parseFloat(retVal.toFixed(5));
  };
  
  getString(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;

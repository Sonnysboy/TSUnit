import { Test } from "./Test";




type SomeFunction = {
    func: (...args: any) => any;

}









export class Expectation  {
    protected eatenFunction: SomeFunction;



    public to: ExpectTo;



    constructor(fun: SomeFunction) {

        this.eatenFunction = fun;
        this.to = new ExpectTo(this.eatenFunction);

    }

  
}

class ExpectTo {

  protected wrappedFunc: SomeFunction;
  private _negated: boolean = false;
  private _orElse?: () => void;

  constructor(wrappedFunc: SomeFunction) {
    this.wrappedFunc = wrappedFunc;
  }

  public equal(value: any, onPass?: () => void, onErr?: () => void): any {

    if (
     Tests.assertEquals(this.wrappedFunc.func.call(this) as any, value) && !this._negated 
) {
      onPass?.call(this)
      return true;
    }else onErr?.call(this); return false;
    
    


  }

  get not() : ExpectTo {
    this._negated = true;
    console.log(this);
    return this;
  }


}
class EqualityAssertion {


}

// ensureThat(the_function(func)).evaluatesTo(5)
export function expect(the_function: SomeFunction) {

    return new Expectation(the_function);

}
export function the_function(func: (...args: any) => any) : SomeFunction {
    return {func: func};
}




export class Tests {


  public static assertEquals<T>(o1: T, o2: T) {

    if (typeof o1 !== 'boolean' && typeof o2 !== 'boolean' && !(o1 || o2)) // if (!o1 && !o2) de morgans law ,look it up !
      return false;
    
    if (typeof o1 !== typeof o2) 
      return false;
    
  
    if (Array.isArray(o1) && Array.isArray(o2)) 
    {
      if (o1.length !== o2.length) return false;
      return o1.every(entry => o2.includes(entry));
    }
    return o1 === o2;
  }
  


}

export class doTests {



  constructor() {
    expect(the_function(() => 21)).to.equal(21, () => console.log("no shot"), () => console.log("you fail."))
  }
}
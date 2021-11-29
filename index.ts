import {DisplayName, Test, runAllTests} from './lib/Test';
import  {Tests} from './lib/TestingLibraryMethods';



class Class {
  @Test(false)
  @DisplayName("Testing Function Test")
  test() {
    let val = false;
    for (let i = 0; i <= 2000; i++) {
      if (val = (i ^ i ^ i ^ i ^ (i + 1)) === i) return true; 
    }
    return val; 
  }
  @Test(45)
  @DisplayName("Testing with a number.")
  testTwo() {

    return 23+22;


  }
}
runAllTests();

// new Class().test();

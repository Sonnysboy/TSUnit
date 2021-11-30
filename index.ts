import { It, DisplayName, Test, runAllTests } from './lib/Test';
import axios from 'axios';
import { ensureThat, the_function } from './lib/Tests';


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
    return 23 + 22;
  }


  @Test(true)
  @DisplayName("Running with an async function")
  @It("Should query the most optimized api ever, and then return true because 6 is even.")
  async testThree() {
    return await axios.get('https://api.isevenapi.xyz/api/iseven/6/').then(response => response.data.iseven);

  }

  @Test(35)
  @DisplayName("35")
  @It("Should generate the number 35 with this very complex algorithm, and then return it.")
  async testAgain() {
    return 35;
  }
  // time to step up the pace.
  @Test([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34])
  @It("Will generate an array with elements 0,1,2,...,34 and then compare it with another array of the same elements. Should Pass.")
  async complexArrayTest() {

    return (Array.from({ length: 35 }) as number[]).map((_, i) => i)
  }
  @Test(true)
  @It("Should work, that is, this checking thing should work.")
  testOfNewMethods() {
    return ensureThat(the_function(() => 5 + 2)).evaluatesTo(7)
  }

}
// see testResults.csv
runAllTests("testResults.csv", 'csv');

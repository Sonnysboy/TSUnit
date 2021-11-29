import {It, DisplayName, Test, runAllTests} from './lib/Test';
import axios from 'axios';


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


  @Test(true)
  @DisplayName("Running with an async function.")
  @It("Should query the most optimized api ever, and then return true because 6 is even.")
  async testThree() {

    return await axios.get('https://api.isevenapi.xyz/api/iseven/6/').then(response => response.data.iseven);

  }

  @Test(35)
  @DisplayName("35.")
  @It("Should generate the number 35 with this very complex algorithm, and then return it.")
  async testAgain() {
    return 35;
  }

}
// see testResults.csv
runAllTests("testResults.csv", 'csv');

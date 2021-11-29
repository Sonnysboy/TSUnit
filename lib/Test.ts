import * as fo from './TestFileOutput';
import {Tests} from './TestingLibraryMethods'
export type TestFunction<T> = {
  fn: any;  // real fnuction 
  displayName: string;
  expectedValue: T;
  passed?: true | false;
  it?: string;
}

/**
 * The output message for this testing function.
 */
const _getOutputMessage = (test: TestFunction<any>) => {
  return `Test: "${test.displayName}" ${test.it ? test.it.split("\n").map(entry => "\n - " + "it: " + entry).join("") : ""}\n - Test Result: ${test.passed ?  "PASSED " + _PASSED_CHAR : "FAILED " + _FAILED_CHAR }`;
}

const _tests: TestFunction<any>[] = [];
const _PASSED_CHAR = "✅";
const _FAILED_CHAR = "❌";

/**
 * 
 * The @Test decorator declares a function as a testing function.
 * @see {DisplayName}
 */
export function Test<T>(expectedValue: T) {

  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor) {
    let method = descriptor.value!;

    // declare that this method is a test.
    
    _tests.push({ fn: method, displayName: method.name, expectedValue: expectedValue });

    return descriptor;
  }

}

/**
 * 
 * This annotation gives the function the certain name inside of the testing output.
 * 
 */
export function DisplayName(testName: string) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor) {

// give this boyo a name...o
    Object.assign(descriptor.value!, { displayName: `${testName}` });

    return descriptor;

  }
}
/**
 * Look familiar?
 */
export function It(description: string) {

  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    if (
      descriptor.value![`it`]
    ) description = description + "\n" + descriptor.value![`it`]
    Object.assign(descriptor.value!, { it : `${description}` });
    return descriptor;
  }
}



// run all the tests.
export const runAllTests = async (outputFile?: string, outputType?: string) => {
  for (const test of _tests) { 
    
    test.passed = Tests.assertEquals(await test.fn.apply(), test.expectedValue)
    // check if the test passed in the first place.
    test.displayName = test.fn.displayName || test.fn.name;
    test.it = test.fn.it; // mutate the test objects for use in output.

    console.log(_getOutputMessage(test)); // display.
  };
  if (outputFile) {

    fo.getOutputInstance(outputType!).exec(outputFile, _tests);

  }

}
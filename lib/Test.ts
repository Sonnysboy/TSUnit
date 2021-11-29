type TestFunction<T> = {
  fn: any;  // real fnuction 
  displayName: string;
  expectedValue: T;
}

const _getResultMessage = (test: string, passed: boolean) => {
  return ` - Test: "${test}" ${passed ? _PASSED_CHAR + " PASSED" : _FAILED_CHAR + " FAILED"}\n`;
}

const tests: TestFunction<any>[] = [];
const _PASSED_CHAR = "✅";
const _FAILED_CHAR = "❌";

/**
 * 
 * The @Test decorator declares a function as a testing function.
 * 
 */
export function Test<T>(expectedValue: T) {

  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor) {
    let method = descriptor.value!;

    // declare that this method is a test.

    Object.assign(method, {
      testMethod: true
    });

    tests.push({ fn: method, displayName: method.name, expectedValue: expectedValue });

    return descriptor;
  }
}
export function DisplayName<T>(testName: string) {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor) {

    Object.assign(descriptor.value!, { testingDisplayName: `${testName}` });

    return descriptor;

  }
}
// run all the tests.
export function runAllTests() {
  let output = `Test Results:\n`;

  tests.forEach(test => {
    output += _getResultMessage(test.fn.testingDisplayName || test.displayName, test.fn.apply() === test.expectedValue);
  })
  console.log(output);
}

/**
 * Times the function given to it.
 * also assigns the function a property named executionTimeTotal, with the amount of time it took (in millis) for it to run.
 * 
 */
export const TimedFunction = function() {
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {

    // descriptor.value!;
    let time = Date.now();
    descriptor.value!.call();
    let total = Date.now() - time;
    Object.assign(descriptor.value!, {
      executionTimeTotal: total 
    });
    console.log("Function " + descriptor.value!.name + " took " + total + " milliseconds to execute.");
  }
}


import * as fs from 'fs';
import { TestFunction } from './Test';



interface FileOutput {



  /**
   * Strict means fail if file DNE.
   */
  exec: (fileName: string, tests: TestFunction<any>[], strict?: boolean) => Promise<void>;

}
/**
 * csv file output.
 */
class CommaSeperatedValueOutput implements FileOutput {


  /**
   * Write the csv file.
   */
  async exec(filePath: string, tests: TestFunction<any>[], strict?: boolean) {
    if (!fs.existsSync(filePath) && strict) {
      throw new Error(`File ${filePath} does not exist.`);
    }
    fs.writeFile(filePath, "Report Generated at " + new Date().toUTCString() + `\nTest Name, It?, Passed\n${tests.map(
      test => `${test.displayName}, ${test.it?.split("\n").join(" ") ?? "null"}, ${test.passed}`).join("\n")}`, err => {
        if (err) return false;

      })
  }

}

/**
 * Get the correct file output given a key.
 */
export const getOutputInstance = (key: string): FileOutput => {
  switch (key.toLowerCase()) {
    case "csv":
    case "commaseperatedvalues":
      return new CommaSeperatedValueOutput();
    default:
      throw new Error("Not implemented.");
    // todo default file output.
    // throw new Error(`Key is null`);
  }
}
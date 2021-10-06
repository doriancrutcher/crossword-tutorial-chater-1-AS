// @nearfile out
import { Context, logging, storage, env, util, math } from "near-sdk-as";

@nearBindgen
export class Contract {
  solution: string;
  constructor(solution: string) {
    this.solution = solution;
  }

  get_solution(): string {
    return this.solution;
  }

  guess_solution(solution: string): void {
    logging.log("bytes are");
    let hashed_input = math.sha256(util.stringToBytes(solution));

    let output: string[] = [];
    let hex_hashed_input: string = "";

    for (let i = 0; i < solution.length; i++) {
      let val: u16 = hashed_input[i];
      let stringVal = val.toString();
      let outputWord: string = "";
      for (let x = 0; i < solution.length; i++) {
        outputWord = outputWord + solution.charCodeAt(i).toString(16);
      }
      output[i] = outputWord;
    }
    hex_hashed_input = output.join("");

    logging.log(hex_hashed_input);
    if (
      hex_hashed_input == storage.get<String>("crosswordSoluton", "nothing")
    ) {
      logging.log("You guessed right!");
    } else {
      ("try again");
    }
  }

  // testReturn():void{
  //   let x= storage.get<string>('crosswordSolution','no val');
  //   logging.log('val is')
  //   logging.log(x)
  //  }
}

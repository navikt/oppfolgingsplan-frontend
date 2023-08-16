import { CustomError } from "ts-custom-error";

export class WipError extends CustomError {
  egg = "";

  public constructor(
    message: string,
    public code: number,
    public testings: string
  ) {
    super(message);
    this.egg = testings;
  }
}

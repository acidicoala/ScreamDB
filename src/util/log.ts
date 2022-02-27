export class Log {
  static readonly DEV = process.env.NODE_ENV === "development";

  public static info(message: any) {
    if (Log.DEV) console.log(message);
  }

  public static error(message: any) {
    if (Log.DEV) console.error(message);
  }
}

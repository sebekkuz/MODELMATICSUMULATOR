export class Clock {
  private t = 0;
  now() { return this.t; }
  advanceTo(t: number) { this.t = t; }
}

import { Event } from "../types";

export class EventQueue {
  private q: Event[] = [];
  push(e: Event) {
    // simple sorted insert
    let i = this.q.findIndex(x => x.time > e.time);
    if (i === -1) this.q.push(e);
    else this.q.splice(i, 0, e);
  }
  pop(): Event|undefined { return this.q.shift(); }
  peek(): Event|undefined { return this.q[0]; }
  get length() { return this.q.length; }
}

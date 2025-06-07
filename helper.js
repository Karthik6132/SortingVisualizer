"use strict";
class Helper {
  constructor(time, list = []) {
    this.time = parseInt(400 / time);
    this.list = list;
  }

  mark = async (index) => this.list[index].className = "cell current";
  markSpl = async (index) => this.list[index].className = "cell min";
  unmark = async (index) => this.list[index].className = "cell";

  pause = async () => new Promise(res => setTimeout(res, this.time));

  compare = async (i, j) => {
    await this.pause();
    return +this.list[i].getAttribute("value") > +this.list[j].getAttribute("value");
  };

  swap = async (i, j) => {
    await this.pause();
    const val1 = this.list[i].getAttribute("value");
    const val2 = this.list[j].getAttribute("value");

    this.list[i].setAttribute("value", val2);
    this.list[j].setAttribute("value", val1);

    this.list[i].style.height = `${3 * val2}px`;
    this.list[j].style.height = `${3 * val1}px`;
  };
}

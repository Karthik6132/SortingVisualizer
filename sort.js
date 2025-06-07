"use strict";
class sortAlgorithms {
  constructor(time) {
    this.list = document.querySelectorAll(".cell");
    this.size = this.list.length;
    this.help = new Helper(time, this.list);
  }

  BubbleSort = async () => {
    for (let i = 0; i < this.size - 1; i++) {
      for (let j = 0; j < this.size - i - 1; j++) {
        await this.help.mark(j);
        await this.help.mark(j + 1);
        if (await this.help.compare(j, j + 1)) await this.help.swap(j, j + 1);
        await this.help.unmark(j);
        await this.help.unmark(j + 1);
      }
      this.list[this.size - i - 1].className = "cell done";
    }
    this.list[0].className = "cell done";
  };

  InsertionSort = async () => {
    for (let i = 0; i < this.size - 1; i++) {
      let j = i;
      while (j >= 0 && await this.help.compare(j, j + 1)) {
        await this.help.mark(j);
        await this.help.mark(j + 1);
        await this.help.swap(j, j + 1);
        await this.help.unmark(j);
        await this.help.unmark(j + 1);
        j--;
      }
    }
    this.markAllDone();
  };

  SelectionSort = async () => {
    for (let i = 0; i < this.size; i++) {
      let minIndex = i;
      for (let j = i + 1; j < this.size; j++) {
        await this.help.markSpl(minIndex);
        await this.help.mark(j);
        if (await this.help.compare(minIndex, j)) minIndex = j;
        await this.help.unmark(j);
      }
      await this.help.swap(minIndex, i);
      this.list[i].className = "cell done";
    }
  };

  MergeSort = async () => {
    await this.mergeSort(0, this.size - 1);
    this.markAllDone();
  };

  mergeSort = async (l, r) => {
    if (l < r) {
      const m = Math.floor((l + r) / 2);
      await this.mergeSort(l, m);
      await this.mergeSort(m + 1, r);
      await this.merge(l, m, r);
    }
  };

  merge = async (l, m, r) => {
    const merged = [];
    let i = l, j = m + 1;
    while (i <= m && j <= r) {
      const vi = +this.list[i].getAttribute("value");
      const vj = +this.list[j].getAttribute("value");
      merged.push(vi < vj ? vi : vj);
      vi < vj ? i++ : j++;
    }
    while (i <= m) merged.push(+this.list[i++].getAttribute("value"));
    while (j <= r) merged.push(+this.list[j++].getAttribute("value"));
    for (let k = l; k <= r; k++) {
      this.list[k].setAttribute("value", merged[k - l]);
      this.list[k].style.height = `${3 * merged[k - l]}px`;
    }
  };

  QuickSort = async () => {
    await this.quickSort(0, this.size - 1);
    this.markAllDone();
  };

  quickSort = async (low, high) => {
    if (low < high) {
      const p = await this.partition(low, high);
      await this.quickSort(low, p - 1);
      await this.quickSort(p + 1, high);
    }
  };

  partition = async (low, high) => {
    const pivot = +this.list[high].getAttribute("value");
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (+this.list[j].getAttribute("value") < pivot) {
        i++;
        await this.help.swap(i, j);
      }
    }
    await this.help.swap(i + 1, high);
    return i + 1;
  };

  markAllDone = () => {
    this.list.forEach(cell => cell.className = "cell done");
  };
}

import DataInterface from './data-interface';

export default class RephraseData extends DataInterface {
  constructor() {
    //construct with default data
    super();
    this.data = {};
  }
  loadData(data) {
    this.data = data;
  }

  save() {}

  getData() {
    return this.data;
  }

  saveCell(row, col, cellData) {
    this.data[row][col] = cellData;
  }
}

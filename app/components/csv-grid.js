import Component from '@glimmer/component';

// import RephraseData from 'csv-crud/modules/data-interface';
// import ENV from 'csv-crud/app/modules/rephrase-data';

import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

class RephraseData {
  constructor() {
    //construct with default data

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
    this.data.rows[row][col] = cellData;
  }
}

export default class CsvGridComponent extends Component {
  @tracked data = {
    columns: ['question', 'option_1', 'option_2', 'option_3', 'option_4'],
    rows: [
      {
        question: {
          data: 'Mark',
          checked: false,
        },
        option_1: {
          data: 'Mark',
          checked: false,
        },
        option_2: {
          data: 'Mark',
          checked: false,
        },
        option_3: {
          data: 'Mark',
          checked: false,
        },
        option_4: {
          data: 'Mark',
          checked: false,
        },
      },
      {
        question: {
          data: 'Mark',
          checked: false,
        },
        option_1: {
          data: 'Mark',
          checked: false,
        },
        option_2: {
          data: 'Mark',
          checked: false,
        },
        option_3: {
          data: 'Mark',
          checked: false,
        },
        option_4: {
          data: 'Mark',
          checked: false,
        },
      },
      {
        question: {
          data: 'Mark',
          checked: false,
        },
        option_1: {
          data: 'Mark',
          checked: false,
        },
        option_2: {
          data: 'Mark',
          checked: false,
        },
        option_3: {
          data: 'Mark',
          checked: false,
        },
        option_4: {
          data: 'Mark',
          checked: false,
        },
      },
    ],
  };

  @tracked cell = {
    data: '',
    checked: false,
  };

  @tracked popperInstance;
  @tracked tooltip;

  reloadData() {
    this.data = this.data;
  }

  @action
  focus() {}

  @action
  edit() {}

  @action
  discardEdit() {}

  @action
  arrowNavigate() {}

  @action
  cellKeyPress(e) {
    //key = Enter
    if (e.keyCode === 13) {
      let row = e.target.dataset.row;
      let col = e.target.dataset.col;
      this.saveCellValue(row, col, 'data', e.target.value);
      console.log(this.data);
    }
    //Key = Escape
    else if (e.keyCode === 27) {
      console.log('Escape key pressed');
      let row = e.target.dataset.row;
      let col = e.target.dataset.col;
      e.target.value = this.getCellValue(row, col, 'data');
      document.activeElement.blur();
    }
    //Key = Tab
    else if (e.keyCode === 9) {
      let row = e.target.dataset.row;
      let col = e.target.dataset.col;
      this.saveCellValue(row, col, 'data', e.target.value);
      console.log(this.data);
    }
  }

  @action
  cellBlur(e) {
    let row = e.target.dataset.row;
    let col = e.target.dataset.col;
    this.saveCellValue(row, col, 'data', e.target.value);
    console.log(this.data);
  }

  saveCell(row, col, cell) {
    this.data.rows[row][col] = cell;
  }

  saveCellValue(row, col, key, value) {
    this.data.rows[row][col][key] = value;
  }

  getCell(row, col) {
    return this.data.rows[row][col];
  }

  getCellValue(row, col, key) {
    return this.data.rows[row][col][key];
  }

  addRow(index) {
    let jsonObject = {};
    this.data.columns.forEach((key, index) => {
      jsonObject[key] = JSON.parse(JSON.stringify(this.cell));
    });

    this.data.rows.splice(index, 0, jsonObject);

    this.reloadData();
  }

  @action
  addRowAbove(e) {
    let row = e.target.dataset.row;
    console.log(row);
    this.addRow(row);
  }

  @action
  addRowBelow(e) {
    let row = parseInt(e.target.dataset.row) + 1;
    console.log(row);
    this.addRow(row);
  }

  @action
  deleteRow(e) {
    let row = e.target.dataset.row;
    this.data.rows.splice(row, 1);
    console.log(this.data.rows.length);
    if (this.data.rows.length < 1) {
      this.addRow(0);
    }
    this.reloadData();
  }

  @action
  onLoad() {
    console.log(this.data);

    const button = document.querySelector('#popper-button');
    this.tooltip = document.querySelector('#tooltip');

    this.popperInstance = Popper.createPopper(button, this.tooltip);
    console.log(this.popperInstance);
    console.log(this.tooltip);
  }

  @action
  showPopper() {
    this.tooltip.classList.remove('d-none');

    // Enable the event listeners
    this.popperInstance.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: true },
      ],
    }));

    // Update its position
    this.popperInstance.update();
  }

  @action
  hidePopper() {
    // Hide the tooltip
    this.tooltip.classList.add('d-none');

    // Disable the event listeners
    this.popperInstance.setOptions((options) => ({
      ...options,
      modifiers: [
        ...options.modifiers,
        { name: 'eventListeners', enabled: false },
      ],
    }));
  }

  @action
  someAction() {
    console.log('action called');
  }
}

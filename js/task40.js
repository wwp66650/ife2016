/**
 * Created by yawenina on 12/10/16.
 */
// options = {
//   maxDate,
//   minData,
// }

function $(selector) {
  return document.querySelector(selector);
}

function formatDate(year, month, day) {
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  return year + '-' + month + '-' + day;
}

function Calender(wrapperSelector, options) {
  this.wrapperSelector = wrapperSelector;
  let today = new Date();
  this.year = today.getFullYear();
  this.month = today.getMonth() + 1;
  this.calender = null;
  this.table = null;
  this.yearSelect = null;
  this.monSelect = null;
}

function renderSelect(min, max) {
  let select = document.createElement('select');
  let fragment = document.createDocumentFragment();
  for (let i = min; i <= max; i++) {
    let option = document.createElement('option');
    option.textContent = i;
    option.value = i;
    if (i === this.year || i === this.month) {
      option.setAttribute('selected', true);
    }
    fragment.appendChild(option);
  }
  select.appendChild(fragment);
  return select;
}

//顶部选择框
function renderCalenderHeader() {
  let div = document.createElement('div');
  div.className = 'selection';
  //向前按钮
  let prevBtn = document.createElement('button');
  prevBtn.textContent = "<";
  prevBtn.className = 'btn prev';
  prevBtn.addEventListener('click', function () {
    $(".mon-select option[selected='true']").removeAttribute('selected');
    this.month = this.month - 1;
    if (this.month  < 1) {
      this.year = this.year - 1;
      this.month = 12;
      $(".year-select option[selected='true']").removeAttribute('selected');
      let selector = ".year-select option[value='" + this.year + "']";
      $(selector).setAttribute('selected', 'true');
    }
    let selector = ".mon-select option[value='" + this.month + "']";
    $(selector).setAttribute('selected', 'true');
    this.renderCalenderBody();
    this.renderCalender();
  }.bind(this));

  //向后按钮
  let nextBtn = document.createElement('button');
  nextBtn.textContent = ">";
  nextBtn.className = 'btn next';
  nextBtn.addEventListener('click', function () {
    $(".mon-select option[selected='true']").removeAttribute('selected');
    this.month = this.month + 1;
    if (this.month > 12) {
      this.year = this.year + 1;
      this.month = 1;
      $(".year-select option[selected='true']").removeAttribute('selected');
      let selector = ".year-select option[value='" + this.year + "']";
      $(selector).setAttribute('selected', 'true');
    }
    let selector = ".mon-select option[value='" + this.month + "']";
    $(selector).setAttribute('selected', 'true');

    this.renderCalenderBody();
    this.renderCalender();
  }.bind(this));

  this.yearSelect = this.renderSelect(1976, 2020);
  this.yearSelect.className = 'year-select';
  this.yearSelect.addEventListener('change', function (e) {
    this.year = e.target.value
    this.renderCalenderBody();
    this.renderCalender();
  }.bind(this));
  this.monSelect = this.renderSelect(1, 12);
  this.monSelect.className = 'mon-select';
  this.monSelect.addEventListener('change', function (e) {
    this.month = e.target.value
    this.renderCalenderBody();
    this.renderCalender();
  }.bind(this));

  div.appendChild(prevBtn);
  div.appendChild(this.yearSelect);
  div.appendChild(this.monSelect);
  div.appendChild(nextBtn);
  return div
}

function createCalenderData() {
  var week = null;
  var monthDate = [];
  var monthDays = new Date(this.year, this.month - 1, 0).getDate();
  var firstDay = new Date(this.year, this.month - 1, 1).getDay();
  week = new Array(firstDay);
  for (let i = 1; i <= monthDays; i++) {
    let date = this.formatDate(this.year, this.month, i);
    if (week.length == 7 || i === monthDays) {
      monthDate.push(week);
      week = [];
    }
    week.push({
      day: i,
      date: date
    })

  }
  return monthDate
}

function renderCalenderBody() {
  let weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  let data = this.createCalenderData();
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  let tr = document.createElement('tr');
  let fragement = document.createDocumentFragment();
  for (let i = 0; i < weekDays.length; i++) {
    let th = document.createElement('th');
    th.textContent = weekDays[i];
    tr.appendChild(th);
  }
  fragement.appendChild(tr);
  fragement.appendChild(tbody);

  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < data[i].length; j++) {
      let td = document.createElement('td');
      td.textContent = data[i][j] ? data[i][j].day : '';
      let date = data[i][j] ? data[i][j].date : '';
      td.setAttribute('data-date',  date);
      tr.appendChild(td);
    }
    fragement.appendChild(tr);
  }
  table.appendChild(fragement);
  this.table = table;
}

function renderCalender() {
  let last = this.calender.lastElementChild;
  this.calender.removeChild(last);
  this.calender.appendChild(this.table);
}
function init() {
  let div = document.createElement('div');
  div.className = 'calender';
  this.calender = div;
  let calenderHeader = this.renderCalenderHeader();
  div.appendChild(calenderHeader);
  this.renderCalenderBody();
  div.appendChild(this.table);
  $(this.wrapperSelector).appendChild(div);
}

Calender.prototype = {
  constructor: Calender,
  init,
  renderSelect,
  renderCalenderHeader,
  renderCalenderBody,
  formatDate,
  createCalenderData,
  renderCalender
};

new Calender('.container', {

}).init();
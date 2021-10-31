import "./App.css";
import "./css/main.css";
import moment from "moment";
import "moment/locale/ru";

const now = new Date(2017, 2, 8);
function TBodyItem(props) {
  const { item, i, day } = props;
  if (i < 6 && item > 7) {
    return <td className="ui-datepicker-other-month">{item}</td>;
  } else if (item === Number(day)) {
    return <td className="ui-datepicker-today">{item}</td>;
  } else {
    return <td>{item}</td>;
  }
}

function Week(props) {
  const { week, nowDaysNumber, day } = props;
  let arrayfilter = [];
  nowDaysNumber.map(
    (item, i) =>
      (arrayfilter[i] = <TBodyItem key={i} item={item} i={i} day={day} />)
  );
  return (
    <tr>{arrayfilter.filter((o, i) => i < week * 7 && i >= (week - 1) * 7)}</tr>
  );
}

function TBodyDays(props) {
  const { nowDaysNumber, day } = props;
  let weeks = new Array(nowDaysNumber.length / 7)
    .fill(null)
    .map((x, i) => i + 1);
  return (
    <tbody>
      {weeks.map((item, i) => (
        <Week week={item} key={i} nowDaysNumber={nowDaysNumber} day={day} />
      ))}
    </tbody>
  );
}

function Calendar(props) {
  const { date } = props;
  const firstDay = moment(new Date(date.getFullYear(), date.getMonth(), 1));
  const lastDay = moment(new Date(date.getFullYear(), date.getMonth() + 1, 0));
  const now = moment(date);
  const prevMonth = moment(date).date(0);

  const days = moment.weekdays();
  days.push(days.shift());
  const daysShort = moment.weekdaysShort();
  daysShort.push(daysShort.shift());

  let nowDaysNumber = new Array(now.daysInMonth())
    .fill(null)
    .map((x, i) => i + 1);

  if (firstDay.weekday() !== 0) {
    let lastDayPrev = Number(prevMonth.format("DD"));
    for (let i = firstDay.weekday(); i > 0; i--) {
      nowDaysNumber.unshift(lastDayPrev);
      lastDayPrev--;
    }
  }

  if (lastDay.weekday() !== 6) {
    let lastDayNow = 6 - lastDay.weekday();
    for (let i = 1; i <= lastDayNow; i++) {
      nowDaysNumber.push(i);
    }
  }
  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">
          {now.format("dddd").charAt(0).toUpperCase() +
            now.format("dddd").slice(1)}
        </div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">
            {now.format("D")}
          </div>
          <div className="ui-datepicker-material-month">
            {now.format("D MMMM").slice(2)}
          </div>
          <div className="ui-datepicker-material-year">
            {now.format("YYYY")}
          </div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{now.format("MMMM")}</span>
          &nbsp;<span className="ui-datepicker-year">{now.format("YYYY")}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            {daysShort.map((o, idx) => (
              <th
                scope="col"
                key={idx}
                title={days[idx].charAt(0).toUpperCase() + days[idx].slice(1)}
              >
                {o.charAt(0).toUpperCase() + o.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <TBodyDays nowDaysNumber={nowDaysNumber} day={now.format("D")} />
      </table>
    </div>
  );
}

function App() {
  return <Calendar date={now} />;
}

export default App;

import React from 'react';
import './Calendar.scss';
import { areEqual } from './GetMonthData';
import classnames from 'classnames';

const Calendar = props => {

  const monthSelect = React.createRef();
  const yearSelect = React.createRef();

  const handleSelectChange = () => {
    const year = yearSelect.current.value
    const month = monthSelect.current.value
    props.onSelectChange(year, month)
  }
  
  return (
    <div className="container mt-5">
      {
        props.selectedDate && 
        <p className="selected-data-show">Выбранная дата: {props.selectedDate.toLocaleDateString()}</p>
      }
      <div className="card">
        <div className="card-header">
          <div className='row text-center'>
            <div className="col-12 col-sm">
              <button className='btn btn-light' onClick={props.handlePrevMonthButtonClick}>{'<'}</button>
            </div>
            <div className="col-12 col-sm">
              <select 
                className="select-calendar" 
                ref={monthSelect} 
                onChange={handleSelectChange}
                value={props.date.getMonth()}
              >
                {
                  props.months.map((month, i) => {
                  return <option key={month} value={i}>{month}</option>
                  })
                }
              </select>
              </div>
              <div className="col-12 col-sm">
                <select
                  className="select-calendar" 
                  ref={yearSelect} 
                  onChange={handleSelectChange}
                  value={props.date.getFullYear()}
                >
                  {
                    props.years.map(year => {
                      return <option key={year} value={year}>{year}</option>
                    })
                  }
                </select>
              </div>
              <div className="col-12 col-sm">
                <button className='btn btn-light' onClick={props.handleNextMonthButtonClick}>{'>'}</button>
              </div>
          </div>
        </div>
      </div>
      <table className="table mt-2">
        <thead>
          <tr>
            {
              props.weekDayNames.map(day => {
                return <th key={day}>{day}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
          { 
            props.monthData.map((week, i) => {
              return <tr key={i}>
                { 
                  week.map((date, i) => date ? 
                  <td 
                    key={i} 
                    onClick={() => props.handleDayClick(date)} 
                    className = {classnames('td-date', {
                      'today': areEqual(date, props.baseDate),
                      'selected': areEqual(date, props.selectedDate) 
                    })}
                  >
                    {date.getDate()}
                  </td>
                    :
                      <td key={i} />
                  )}
              </tr>
            }) 
          }
        </tbody>
      </table>
    </div>
  )
}

export default Calendar
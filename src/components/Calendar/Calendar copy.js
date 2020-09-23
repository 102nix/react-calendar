import React, { useState } from 'react';
import './Calendar.scss';
import { getMonthData, areEqual } from './GetMonthData';
import classnames from 'classnames';

const Calendar = () => {

  const monthSelect = React.createRef();
  const yearSelect = React.createRef();

  const baseDate = new Date()

  const months = [
    'Январь', 'Февраля', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ]
  const years = [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020
  ]
  const weekDayNames = [
    'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'
  ]

  const [date, setDate] = useState(baseDate)
  const [selectedDate, setSelectedDate] = useState(null)
  const [monthData, setMonthData] = useState(getMonthData(date.getFullYear(), date.getMonth()))

  const handlePrevMonthButtonClick = () => {
    const prevDate = new Date(date.getFullYear(), date.getMonth() - 1)
    setDate(prevDate)
    setMonthData(getMonthData(prevDate.getFullYear(), prevDate.getMonth()))
  }
  
  const handleNextMonthButtonClick = () => {
    const nextDate = new Date(date.getFullYear(), date.getMonth() + 1)
    setDate(nextDate)
    setMonthData(getMonthData(nextDate.getFullYear(), nextDate.getMonth()))
  }

  const handleSelectChange = () => {
    const year = yearSelect.current.value
    const month = monthSelect.current.value
    const selectDate = new Date(year, month)
    setDate(selectDate)
    setMonthData(getMonthData(selectDate.getFullYear(), selectDate.getMonth()))
  }

  const handleDayClick = date => {
    setSelectedDate(date)
  }

  return (
    <div className="container mt-5">
      {
        selectedDate && 
        <p className="selected-data-show">Выбранная дата: {selectedDate.toLocaleDateString()}</p>
      }
      <div className='header'>
        <button className='btn btn-light' onClick={handlePrevMonthButtonClick}>{'<'}</button>
        <select 
          className="select-calendar" 
          ref={monthSelect} 
          onChange={handleSelectChange}
          value={date.getMonth()}
        >
          {
            months.map((month, i) => {
             return <option key={month} value={i}>{month}</option>
            })
          }
        </select>
        <select
          className="select-calendar" 
          ref={yearSelect} 
          onChange={handleSelectChange}
          value={date.getFullYear()}
        >
          {
            years.map(year => {
              return <option key={year} value={year}>{year}</option>
            })
          }
        </select>
        <button className='btn btn-light' onClick={handleNextMonthButtonClick}>{'>'}</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            {
              weekDayNames.map(day => {
                return <th key={day}>{day}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
          { 
            monthData.map((week, i) => {
              return <tr key={i}>
                { 
                  week.map((date, i) => date ? 
                  <td 
                    key={i} 
                    onClick={() => handleDayClick(date)} 
                    className = {classnames('td-date', {
                      'today': areEqual(date, baseDate),
                      'selected': areEqual(date, selectedDate) 
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
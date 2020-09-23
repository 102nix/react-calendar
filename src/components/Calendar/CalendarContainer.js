import React, { useState } from 'react';
import './Calendar.scss';
import { getMonthData } from './GetMonthData';
import Calendar from './Calendar';

const CalendarContainer = () => {

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

  const onSelectChange = (year, month) => {
    const selectDate = new Date(year, month)
    setDate(selectDate)
    setMonthData(getMonthData(selectDate.getFullYear(), selectDate.getMonth()))
  }

  const handleDayClick = date => {
    setSelectedDate(date)
  }

  return (
    <Calendar
      baseDate ={baseDate}
      selectedDate = {selectedDate}
      handlePrevMonthButtonClick= {handlePrevMonthButtonClick}
      onSelectChange = {onSelectChange}
      date = {date} 
      months = {months}
      years = {years}
      handleNextMonthButtonClick = {handleNextMonthButtonClick}
      weekDayNames = {weekDayNames}
      monthData = {monthData}
      handleDayClick = {handleDayClick}
    />
  )
}

export default CalendarContainer
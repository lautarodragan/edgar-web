import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts'

import './Edgar.css'

export class Edgar extends React.Component {

  constructor(props) {
    super(props)
    this.onFetchResponse = this.onFetchResponse.bind(this)
    this.state = {
      players: [],
    }
    fetch('https://edgar-hodlers.herokuapp.com/').then(this.onFetchResponse)
  }

  render() {
    return (
      <main>
        <header>
          <h1>Number of addresses holding POE</h1>
        </header>
        <LineChart
          width={1000}
          height={800}
          data={this.state.data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="dateLabel" />
          <YAxis domain={['auto']}  />
          {/*<Tooltip />*/}
          <CartesianGrid stroke="#f5f5f5" />
          <Line dataKey="holders" stroke="#ff7300"  />
        </LineChart>

      </main>
    )
  }

  async onFetchResponse(result) {
    const raw = await result.json()

    const dateEqualsUpToDay = (date1, date2) =>
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getYear() === date2.getYear()

    const dateToLabel = date => date.toLocaleDateString('en-us', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    const mapper = ({date, holders}) => ({
      holders,
      date: new Date(date),
      dateLabel: dateToLabel(new Date(date))
    })

    const reducer = (accumulator, current) =>
      accumulator.some(({ date }) => dateEqualsUpToDay(current.date, date))
        ? accumulator
        : [ ...accumulator, current ]

    const data = raw
      .map(mapper)
      .reduce(reducer, [])

    this.setState({
      data
    })

  }

}

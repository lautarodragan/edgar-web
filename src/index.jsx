import React from 'react'
import { render} from 'react-dom'

import { Edgar } from './components/Edgar'

import './index.css'

// const { } = process.env

async function main() {
  render(<Edgar />, document.getElementById("react-root"))
}

main().catch(console.error)
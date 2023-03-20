import { Component } from 'react'
import s from './ErrorBoundary.scss'

class ErrorBoundary extends Component {
  state = { hasError: false }

  errorMessage = () => (
    <section className={s.section}>
      <p>An error has caused this component to stop working.</p>
      <p>Please contact support. We will resolve this issue as soon as possible.</p>
    </section>
  )

  render() {
    return this.state.hasError ? this.errorMessage() : this.props.children
  }
}

export default ErrorBoundary

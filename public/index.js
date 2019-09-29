import { render } from 'react-dom'
import App from '../src/App'
import * as serviceWorker from '../src/serviceWorker'
import './index.css'

window.RELEASE = RELEASE
render(App, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

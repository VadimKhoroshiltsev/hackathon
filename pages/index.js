import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from '../containers/App'
import reducer from '../reducers'

const store = createStore(reducer)

export default () => (
  <Provider store={store}>
      <App />
  </Provider>
)

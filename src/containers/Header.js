import { connect } from 'react-redux'
import Header from '../components/Header'
import { postTask } from '../actions'

export default connect(null, { postTask })(Header)

import { connect } from 'react-redux'
import { playerMove } from '../actions'
import App from '../components/App'

const mapStateToProps = (state) => {
  return { state };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPlayerMove: (rowIndex, colIndex) => {
      dispatch(playerMove(rowIndex, colIndex))
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
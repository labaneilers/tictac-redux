import App from './App';
import tictactoe from '../reducers'

it('renders without crashing', () => {
    var model = tictactoe();
    console.log(App);
    App({state: model});
});

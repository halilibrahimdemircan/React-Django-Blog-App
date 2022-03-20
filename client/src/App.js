import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { loadUser } from './redux/actions/userAction';
import AppRouter from './router/AppRouter';

function App() {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      dispatch(loadUser(token));
    }
  }, [dispatch, token]);

  return (
    <div>
      <AppRouter />
      <ToastContainer />
    </div>
  );
}

export default App;

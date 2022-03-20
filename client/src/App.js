import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { loadUser } from './redux/actions/userAction';
import AppRouter from './router/AppRouter';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div>
      <AppRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
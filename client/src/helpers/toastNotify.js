import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const successNote = msg =>
    toast.success(msg, {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });

export const errorNote = msg =>
    toast.error(msg, {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });
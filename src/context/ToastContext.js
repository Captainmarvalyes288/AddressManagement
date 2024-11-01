
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { X } from 'lucide-react';

const ToastContext = createContext();

const initialState = {
  toasts: []
};

const toastReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      };
    case 'REMOVE_TOAST':
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      };
    default:
      return state;
  }
};

export const ToastProvider = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    dispatch({
      type: 'ADD_TOAST',
      payload: {
        id,
        message,
        type
      }
    });

    // Auto remove toast after 5 seconds
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_TOAST',
        payload: id
      });
    }, 5000);
  }, []);

  const removeToast = useCallback((id) => {
    dispatch({
      type: 'REMOVE_TOAST',
      payload: id
    });
  }, []);

  return (
    <ToastContext.Provider value={{ state, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

const ToastContainer = () => {
  const { state, removeToast } = useContext(ToastContext);

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {state.toasts.map(toast => (
        <Toast
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

const Toast = ({ toast, onClose }) => {
  const getToastStyles = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-lg shadow-lg min-w-[300px] ${getToastStyles()}`}
    >
      <p className="text-sm font-medium pr-8">{toast.message}</p>
      <button
        onClick={onClose}
        className="p-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
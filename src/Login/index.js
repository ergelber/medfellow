import { signup, login, logout, loggingIn, 
  signingUp, clearLoginNotification, setLoginNotification 
} from './actions';
import LoginReducer from './reducer';
import { getIsLoggedIn, getIsSigningUp, getUserRole,
  getIsLoggingIn, getToken, getLoginNotification 
} from './selectors';
import LoginModal from './components/LoginModal';

// Actions
export { signup, login, logout, loggingIn, 
  signingUp, clearLoginNotification, setLoginNotification 
};

// Components
export { LoginModal };

// reducer
export { LoginReducer };

// Selectors
export { getToken, getIsLoggedIn, 
  getIsSigningUp, getIsLoggingIn,
  getLoginNotification, getUserRole
};



import { useState, useRef, useEffect } from "react";
import * as firebaseui from "firebaseui";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./../../config/firebase";
import {
  getAuth,
  EmailAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Form, Input, Button, Modal } from "antd";

import "./index.less";

const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    // Email / Password Provider.
    EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // Handle sign-in.
      // Return false to avoid redirect.
      return false;
    },
  },
};

initializeApp(firebaseConfig);

const auth = getAuth();
const ui = new firebaseui.auth.AuthUI(auth);

const Login = () => {
  const startRsvpRef = useRef();
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: "", displayName: "" });

  const startLogin = () => {
    ui.start(startRsvpRef.current, uiConfig);

    onAuthStateChanged(auth, (user) => {
      if (user && !userInfo.email) {
        const { email, displayName } = user;
        setUserInfo({ email, displayName });
        setVisible(false)
      } else {
        console.log(3333);
      }
    });
  };

  const handleLogin = async () => {
    if (userInfo.displayName) return signOut(auth);

    setVisible(true);
    startLogin();
  };

  useEffect(() => {
    console.log("eeffffect");
    startLogin();
  }, []);

  return (
    <div className="login-container">
      <div className="login-form">
        {userInfo.displayName && <div className="user-info">Welcome {userInfo.displayName}</div>}
        <Button type="primary" onClick={handleLogin}>
          {userInfo.displayName ? "Log out" : "Login By Firebase"}
        </Button>
        <Modal
          title="Login"
          visible={visible}
          footer={null}
          forceRender
          onCancel={() => {
            setVisible(false);
          }}
        >
          <div ref={startRsvpRef} />
        </Modal>
      </div>
    </div>
  );
};

export default Login;

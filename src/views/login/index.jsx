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
import {
  getFirestore,
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { Input, Button, Modal } from "antd";

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
const db = getFirestore();
const ui = new firebaseui.auth.AuthUI(auth);

const Login = () => {
  const startRsvpRef = useRef();
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    displayName: "",
    uid: "",
  });

  const startLogin = () => {
    ui.start(startRsvpRef.current, uiConfig);

    onAuthStateChanged(auth, (user) => {
      if (user && !userInfo.email) {
        const { email, displayName, uid } = user;
        queryMessage()
        setUserInfo({ email, displayName, uid });
        setVisible(false);
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

  const sendMessage = () => {
    if (!message) return false;

    const params = {
      text: message,
      timestamp: new Date().getTime(),
      name: userInfo.displayName,
      userId: userInfo.uid,
    };

    addDoc(collection(db, "guestbook"), params);
    queryMessage();
    setMessage("");
  };

  const queryMessage = () => {
    const list = [];
    const q = query(
      collection(db, "guestbook"),
      orderBy("timestamp", "desc")
    );
    onSnapshot(q, (snaps) => {
      snaps.forEach((doc) => {
        list.push(doc.data());
      });
      setMessageList(list);
    });
  }

  useEffect(() => {
    startLogin();
  }, []);

  return (
    <div className="login-container">
      <div className="login-form">
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
      {userInfo.displayName && (
        <div className="chat-container">
          <div className="user-info">Welcome {userInfo.displayName}</div>
          <div className="message-send">
            <span>message: </span>
            <Input
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <Button type="primary" onClick={sendMessage}>
              Send
            </Button>
          </div>
          {messageList.map((item) => (
            <p key={item.timestamp}>
              {item.name}: {item.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Login;

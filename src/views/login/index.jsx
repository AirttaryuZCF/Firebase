import Firebase from "../../config/firebase";
import { useState } from "react";
import * as firebaseui from "firebaseui";
import { getAuth, EmailAuthProvider } from "firebase/auth";
import { Form, Input } from "antd";

import "./index.less";

const auth = getAuth();
const ui = new firebaseui.auth.AuthUI(auth);
console.log(ui);

const Login = () => {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  return (
    <div className="login-container">
      <div className="login-form">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={userInfo}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            defaultValue={userInfo.password}
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

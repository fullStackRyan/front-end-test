import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../redux/auth/authSlice";
import { RootState } from "../redux/store";
import { Form, Input, Button, Checkbox } from "antd";
import { AppDispatch } from "../redux/store";

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.auth);

  // TODO: ideally not use any
  const onFinish = async (values: any) => {
    console.log("values", values);
    try {
      const formValues = values as FormValues;
      const actionResult = dispatch(login(formValues));
      const user = await actionResult.unwrap();
      console.log("user logged in", user);
      navigate("/patients");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // max 128 characters between '@' and '.' - I assume this means domain name can't be longer than 128 characters (i.e. gmail is 5 characters)
  // max 6 characters after last '.' character - I assume ryan.mcavoy@gmail.com would be fine as mcavoy is 6 characters but ryan.mcavoy.javacript@gmail.com would fail as javascript is 9 characters.
  return (
    <>
      <main>
        <Form
          layout={"vertical"}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              { type: "email", message: "Please enter a valid email" },
              {
                whitespace: true,
              },
              () => ({
                validator(_, value) {
                  const domainName = value.split("@")[1].split(".")[0];
                  const usernameParts = value.split("@")[0].split(".");
                  const endLength =
                    usernameParts[usernameParts.length - 1].length;
                  if (domainName.length < 129 && endLength < 7) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      new Error(
                        "Domain name must be less than 128 characters long"
                      )
                    );
                  }
                },
              }),
              () => ({
                validator(_, value) {
                  const usernamePart = value.split("@")[0];
                  const containsDot = usernamePart?.includes(".");

                  if (!containsDot) {
                    return Promise.resolve();
                  }

                  const usernameParts = value.split("@")[0].split(".");
                  const endLength =
                    usernameParts[usernameParts.length - 1].length;
                  if (endLength < 7) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(
                      new Error("max 6 characters after last '.' character")
                    );
                  }
                },
              }),
            ]}
            hasFeedback
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,128}$/,
                message:
                  "Password must be alphanumeric, min 8 characters, max 128 characters, contain at least one number and one capital letter",
              },
              {
                required: true,
                message: "Please enter your password",
              },
            ]}
            hasFeedback
          >
            <Input.Password size="large" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="bg-sky-500"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </main>
      <footer></footer>
    </>
  );
};

export default LoginPage;

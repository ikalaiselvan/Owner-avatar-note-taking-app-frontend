import {
  Button,
  Card,
  Form,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as formik from "formik";
import * as yup from "yup";
import axios from "axios";
import API_URL from "../../config/global";

export default function Login({ loading }) {
  const navigate = useNavigate();

  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const handSubmit = async (e) => {
    console.log(e);

    const response = await axios.post(`${API_URL}/login`, e);

    if (response.data === "Invalid User name and Password") {
      alert("Invalid User name and Password");
    } else if (response?.status) {
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      const user = await JSON.parse(localStorage.getItem("userInfo"));
      loading ? navigate("/login") : navigate("/home");

      if (user && user.token) {
        navigate("/home");
      }
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(e) => handSubmit(e)}
      initialValues={{
        email: "",
        password: "",
      }}
    >
      {({ handleSubmit, handleChange, values, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Card
              className="p-4 m-auto mt-5"
              as={Col}
              md="4"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(252, 244, 245), rgb(183, 160, 208))",
              }}
            >
              <h1
                style={{ letterSpacing: "2px" }}
                className="text-success m-auto mb-3 fw-bold"
              >
                Login
              </h1>

              <Form.Group
                as={Col}
                className="mb-4"
                controlId="validationFormikEmail"
              >
                <Form.Label className="fw-bold">email</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="text"
                    placeholder="email"
                    aria-describedby="inputGroupPrepend"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group
                as={Col}
                className="mb-5"
                controlId="validationFormik03"
              >
                <Form.Label className="fw-bold">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                type="submit"
                className="w-40 m-auto mb-4 px-5 py-2 bg-success fw-bold"
                style={{
                  letterSpacing: "2px",
                  // backgroundImage:
                  //   "linear-gradient(to right, rgb(224, 212, 224), rgb(64, 157, 64)",
                }}
              >
                Login
              </Button>
              <p className="fw-bold">
                Didn't join us? <Link to="/">Register</Link> here
              </p>
            </Card>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

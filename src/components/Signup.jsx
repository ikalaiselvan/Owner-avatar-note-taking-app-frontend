import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { Card } from "react-bootstrap";
import axios from "axios";
import API_URL from "../../config/global";
import { Link } from "react-router-dom";

function Signup() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const handsubmit = async (e) => {
    console.log(e);

    try {
      const response = await axios.post(`${API_URL}/register/verify`, e);
      console.log(response);

      if (response.data === true) {
        alert("Registration link sent to your email id ...");
      } else if (response.data === false) {
        alert("User aldready exist");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(e) => {
        handsubmit(e);
      }}
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
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
                Register
              </h1>
              <Form.Group
                as={Col}
                className="mb-4"
                controlId="validationFormik01"
              >
                <Form.Label className="fw-bold">First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

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
                Register
              </Button>
              <p className="fw-bold">
                Aldready registered <Link to="/login">Login</Link> here
              </p>
            </Card>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default Signup;

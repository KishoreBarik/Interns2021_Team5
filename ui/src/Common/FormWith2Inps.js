import React from "react";

function FormWith2Inps(props) {
  return (
    <div className="col-md-5">
      <div className="box shadow bg-white p-4">
        <h3 className="nm-4 text-center fs-1 m-4">{props.title}</h3>
        <form class="mb-3">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control rounded-0"
              placeholder="Enter email"
              id="email"
            />
            <label for="email">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control rounded-0"
              placeholder="Enter password"
              id="password"
            />
            <label for="password">Password</label>
          </div>
          <div className="d-grid gap-2 mb-3">
            <button
              type="button"
              className="btn btn-primary btn-lg border-0 rounded-0"
            >
              Login
            </button>
          </div>
          <div className="forgot-password-link mb-3 text-right">
            <a
              href="#s"
              title="Forgot Password"
              className="text-decoration-none"
            >
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

/*<Container
      className="d-flex justify-content-center align-items-center bg-primary"
      style={{ height: "100vh" }}
    >
      <Card className="w-50">
        <Card.Body>
          <Card.Title className="text-center ">{props.title}</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group size="lg" controlId="email">
              <Form.Label className="my-10">Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group size="lg" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button
              className="mt-10"
              block
              size="lg"
              type="submit"
              disabled={!validateForm()}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>*/
export default FormWith2Inps;

const logout = require("../controller/logoutController");

const ress = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  cookie: jest.fn().mockReturnThis(),
  clearCookie: jest.fn().mockReturnThis(),
};

describe("test suite for logout controller", () => {
  let res;
  beforeEach(() => {
    res = ress;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("Should send invalid credentials when invalid cookie is sent", () => {
    const req = {
      cookies: {},
    };

    logout.index(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith("invalid credentials");
  });

  it("Should clear cookie when cookie is sent", () => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      clearCookie: jest.fn().mockReturnThis(),
    };
    const req = {
      cookies: { token: "abcd" },
    };
    logout.index(req, res);
    expect(res.clearCookie).toHaveBeenCalledWith("token", {
      sameSite: "none",
      secure: true,
    });
    expect(res.json).toHaveBeenCalledWith("ok");
  });
});

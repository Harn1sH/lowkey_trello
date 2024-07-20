const utils = require("../utils/utils");
const login = require("../controller/loginController");
const user = require("../models/userModel");
const bcrypt = require("bcrypt");

const ress = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  cookie: jest.fn().mockReturnThis(),
  clearCookie: jest.fn().mockReturnThis(),
};

describe("Test Suite for login controller", () => {
  describe("login manualy", () => {
    let res;

    beforeEach(() => {
      res = ress;
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("Should throw invalid data when sent misssing data", async () => {
      const req = {
        body: { email: "test@gmail.com" },
      };

      await login.index(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("invalid Data");
    });

    it("Should account not found when non existing details is sent", async () => {
      const req = {
        body: { email: "test", password: "test" },
      };

      jest.spyOn(user, "findOne").mockResolvedValue(null);

      await login.index(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("Account not found");
    });

    it("Should send incorrect password when sent wrong password", async () => {
      const req = {
        body: { email: "test", password: "test" },
      };

      jest.spyOn(user, "findOne").mockResolvedValue({ password: "pass" });
      jest.spyOn(bcrypt, "compareSync").mockReturnValue(false);

      await login.index(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith("Incorrect password");
    });
  });

  describe("login using google", () => {
    let res;

    beforeEach(() => {
      res = ress;
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("Should throw invalid data when sent misssing data", async () => {
      const req = {
        body: { email: "test@gmail.com" },
      };

      await login.google(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("invalid Data");
    });

    it("Should throw account not found when non existing details is sent", async () => {
      const req = {
        body: { email: "test", firstName: "test", firstName: "test" },
      };

      jest.spyOn(user, "findOne").mockResolvedValue(null);

      await login.google(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("invalid Data");
    });
  });

  describe("validate", () => {
    let res;
    beforeEach(() => {
      res = ress;
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("Should return null if not loggin in", async () => {
      const req = {
        cookies: {},
      };
      await login.validate(req, res);
      expect(res.json).toHaveBeenCalledWith(null);
    });

    it("Should return data if  logged", async () => {
      const req = {
        cookies: { token: "abcd" },
      };

      jest.spyOn(utils, "jwtVerifier").mockResolvedValue({ test: "test" });

      await login.validate(req, res);
      expect(utils.jwtVerifier).toHaveBeenCalledWith("abcd", res);
    });
  });
});

const signUp = require("../controller/signUpController");
const utils = require("../utils/utils");
const user = require("../models/userModel");
const bcrypt = require("bcrypt");

describe.skip("test suite for signUp controller", () => {
  describe("signUp manualy", () => {
    let res;

    beforeEach(() => {
      res = utils.res;
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("Should throw invalid data when given missing data", () => {
      const req = {
        body: { firstName: "Test", lastName: "Test", email: "Password" },
      };
      const res = utils.res;

      signUp.index(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("invalid data");
    });

    it("Should throw email already exists when given already existing email", async () => {
      const req = {
        body: {
          firstName: "Test",
          lastName: "Test",
          email: "exists@gmail.com",
          password: "123",
        },
      };

      jest.spyOn(user, "findOne").mockResolvedValue({ isGoogle: false });

      await signUp.index(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("Email already exists");
    });

    it("should should return a created document when google is not linked", async () => {
      const req = {
        body: {
          firstName: "Test",
          lastName: "User",
          email: "newuser@example.com",
          password: "password123",
        },
      };

      jest.spyOn(user, "findOne").mockResolvedValue(null);
      jest.spyOn(user, "create").mockResolvedValue({
        _id: "123",
        firstName: "Test",
        lastName: "User",
        email: "newuser@example.com",
        isGoogle: false,
        password: "password123",
      });
      jest.spyOn(bcrypt, "hashSync").mockReturnValue("password123");

      await signUp.index(req, res);

      expect(user.findOne).toHaveBeenCalledWith({
        email: "newuser@example.com",
      });
      expect(user.create).toHaveBeenCalledWith({
        firstName: "Test",
        lastName: "User",
        email: "newuser@example.com",
        password: expect.any(String), // Ensure password is hashed
        isGoogle: false,
      });
      expect(res.json).toHaveBeenCalledWith({
        _id: "123",
        firstName: "Test",
        lastName: "User",
        email: "newuser@example.com",
        isGoogle: false,
        password: "password123",
      });
    });

    it("should should return a created document when google not linked", async () => {
      const req = {
        body: {
          firstName: "Test",
          lastName: "User",
          email: "newuser@example.com",
          password: "password123",
        },
      };

      const mockUser = {
        isGoogle: true,
        set: jest.fn(),
        save: jest.fn(),
      };

      jest.spyOn(user, "findOne").mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, "hashSync").mockReturnValue("password123");

      await signUp.index(req, res);

      expect(mockUser.save).toHaveBeenCalled();
      expect(mockUser.set).toHaveBeenCalledWith({
        password: "password123",
        isGoogle: true,
      });

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("signUp via google", () => {
    let res;

    beforeEach(() => {
      res = utils.res;
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("Should throw invalid data when given missing data", () => {
      const req = {
        body: { firstName: "Test", lastName: "Test" },
      };

      signUp.google(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("invalid data");
    });

    it("Should return a document when user does not exist", async () => {
      const req = {
        body: {
          firstName: "test",
          lastName: "test",
          email: "test@gmail.com",
        },
      };

      jest.spyOn(user, "findOne").mockResolvedValue(null);
      jest.spyOn(user, "create").mockResolvedValue({
        firstName: "test",
        lastName: "test",
        email: "test@gmail.com",
        isGoogle: true,
        password: null,
      });

      await signUp.google(req, res);

      expect(user.create).toHaveBeenCalledWith({
        firstName: "test",
        lastName: "test",
        email: "test@gmail.com",
        isGoogle: true,
        password: null,
      });
      expect(res.json).toHaveBeenCalledWith({
        firstName: "test",
        lastName: "test",
        email: "test@gmail.com",
        isGoogle: true,
        password: null,
      });
    });

    it("should return a document when user exist but not linked to google", async () => {
      const req = {
        body: { firstName: "test", lastName: "test", email: "test@gmail.com" },
      };
      const mockUser = { isGoogle: false, set: jest.fn(), save: jest.fn() };

      jest.spyOn(user, "findOne").mockResolvedValue(mockUser);

      await signUp.google(req, res);

      expect(mockUser.set).toHaveBeenCalledWith({ isGoogle: true });
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });

    it("Should send user already exists when trying to sign up with an existing google id", async () => {
      const req = {
        body: { firstName: "test", lastName: "test", email: "test@gmail.com" },
      };
      const mockUser = { isGoogle: true };

      jest.spyOn(user, "findOne").mockResolvedValue(mockUser);

      await signUp.google(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("User already exists");
    });
  });
});

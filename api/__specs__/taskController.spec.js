const taskController = require("../controller/taskController");
const utils = require("../utils/utils");
const Task = require("../models/taskModel");

const ress = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  cookie: jest.fn().mockReturnThis(),
  clearCookie: jest.fn().mockReturnThis(),
};

describe("Test Suite for task controller", () => {
  describe("Test suite for add task", () => {
    let res;

    beforeEach(() => {
      res = ress;
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("Should return error when given invalid inputs", async () => {
      const req = {
        body: { task: "test", progress: "progress" },
        cookies: {},
      };

      await taskController.add(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("invalid inputs");
    });

    it("Should return error when given invalid credentials", async () => {
      const req = {
        body: {
          task: "test",
          progress: "progress",
          description: "description",
        },
        cookies: {},
      };

      await taskController.add(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith("invalid token");
    });

    it("Should return doc when given valid credentials", async () => {
      const req = {
        body: {
          task: "test",
          progress: "progress",
          description: "description",
        },
        cookies: { token: "abcd" },
      };
      const mockValue = { _id: "123" };
      const mockResult = { data: "test data" };

      jest.spyOn(utils, "jwtVerifier").mockResolvedValue(mockValue);
      jest.spyOn(Task, "create").mockResolvedValue(mockResult);

      await taskController.add(req, res);

      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it("Should return error when jwt is invalid", async () => {
      const req = {
        body: {
          task: "test",
          progress: "progress",
          description: "description",
        },
        cookies: { token: "abcd" },
      };

      jest.spyOn(utils, "jwtVerifier").mockRejectedValue("error");

      await taskController.add(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith("invalid token");
    });
  });

  describe("Test suite for get task", () => {
    let res;
    beforeEach(() => {
      res = ress;
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it("Should return error when given invalid credentials", async () => {
      const req = {
        body: {
          task: "test",
          progress: "progress",
          description: "description",
        },
        cookies: {},
      };

      await taskController.get(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith("invalid credentials");
    });

    it("Should return error when jwt is invalid", async () => {
      const req = {
        cookies: { token: "abcd" },
      };

      jest.spyOn(utils, "jwtVerifier").mockRejectedValue("error");

      await taskController.get(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith("invalid credentials");
    });

    it("Should return doc when given valid credentials", async () => {
      const req = {
        cookies: { token: "abcd" },
      };
      const mockValue = { _id: "123" };
      const mockResult = { data: "test data" };

      jest.spyOn(utils, "jwtVerifier").mockResolvedValue(mockValue);
      jest.spyOn(Task, "find").mockResolvedValue(mockResult);

      await taskController.get(req, res);

      expect(Task.find).toHaveBeenCalledWith({ user: "123" });
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });
  });

  describe("Test suite for edit task", () => {
    let res;
    beforeEach(() => {
      res = ress;
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("Should return error when given invalid inputs", async () => {
      const req = {
        body: { _id: "123", progress: "progress" },
        cookies: {},
      };

      await taskController.edit(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith("invalid inputs");
    });

    it("Should return error when given invalid credentials", async () => {
      const req = {
        body: { _id: "123", task: "task", description: "progress" },
        cookies: {},
      };

      await taskController.edit(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith("invalid request");
    });

    it("Should return error when jwt is invalid", async () => {
      const req = {
        body: { _id: "123", task: "task", description: "progress" },
        cookies: { token: "abcd" },
      };

      jest.spyOn(utils, "jwtVerifier").mockRejectedValue("error");

      await taskController.edit(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith("invalid credential");
    });

    it("Should return doc when given valid credentials", async () => {
      const req = {
        body: { _id: "123", task: "task", description: "progress" },
        cookies: { token: "abcd" },
      };
      const mockValue = { _id: "123" };
      const mockResult = { data: "test data", set: jest.fn(), save: jest.fn() };

      jest.spyOn(utils, "jwtVerifier").mockResolvedValue(mockValue);
      jest.spyOn(Task, "findById").mockResolvedValue(mockResult);

      await taskController.edit(req, res);

      expect(mockResult.set).toHaveBeenCalled();
      expect(mockResult.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });
  });

  describe("Test suite for delete task", () => {
    let res;

    beforeEach(() => {
      res = ress;
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("Should return error when given invalid inputs", async () => {
      const req = {
        body: {},
        cookies: {},
      };

      await taskController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("invalid input");
    });

    it("Should return error when given invalid credentials", async () => {
      const req = {
        body: { _id: "123" },
        cookies: {},
      };

      await taskController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith("invalid credentials");
    });

    it("Should return ok when given valid credentials", async () => {
      const req = {
        body: { _id: "123" },
        cookies: { token: "abcd" },
      };
      const mockValue = { _id: "321" };
      const mockResult = { data: "test data" };

      jest.spyOn(utils, "jwtVerifier").mockResolvedValue(mockValue);
      jest.spyOn(Task, "findByIdAndDelete").mockResolvedValue(mockResult);

      await taskController.delete(req, res);

      expect(res.json).toHaveBeenCalledWith("deleted");
    });

    it("Should return error when jwt is invalid", async () => {
      const req = {
        body: { _id: "123" },
        cookies: { token: "abcd" },
      };

      jest.spyOn(utils, "jwtVerifier").mockRejectedValue("error");

      await taskController.delete(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith("invalid credentials");
    });
  });

  describe("Test suite for edit progress task", () => {
    let res;

    beforeEach(() => {
      res = ress;
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("Should return error when given invalid inputs", async () => {
      const req = {
        body: { progress: "progress" },
        cookies: {},
      };

      await taskController.editProgress(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith("invalid request");
    });

    it("Should return error when given invalid credentials", async () => {
      const req = {
        body: {
          _id: "123",
          progress: "progress",
        },
        cookies: {},
      };

      await taskController.editProgress(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith("invalid credentials");
    });

    it("Should return doc when given valid credentials", async () => {
      const req = {
        body: { _id: "123", progress: "progress" },
        cookies: { token: "abcd" },
      };
      const mockValue = { _id: "123" };
      const mockResult = {
        _id: "123",
        task: "test data",
        set: jest.fn(),
        save: jest.fn(),
      };

      jest.spyOn(utils, "jwtVerifier").mockResolvedValue(mockValue);
      jest.spyOn(Task, "findOne").mockResolvedValue(mockResult);

      await taskController.editProgress(req, res);

      expect(mockResult.set).toHaveBeenCalled();
      expect(mockResult.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it("Should return error when jwt is invalid", async () => {
      const req = {
        body: { _id: "123", progress: "progress" },
        cookies: { token: "abcd" },
      };

      jest.spyOn(utils, "jwtVerifier").mockRejectedValue("error");

      await taskController.editProgress(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith("invalid credentials");
    });
  });
});

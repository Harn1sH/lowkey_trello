exports.res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  cookie: jest.fn().mockReturnThis(),
};

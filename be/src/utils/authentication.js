const jwt = require("jsonwebtoken");
const json = require("../components/json");
const getIdByEmail = require("./getIdByEmail");

async function authenticateToken(req, res, next) {
  // Get token from Authorization header
  const token = req.headers["authorization"] || req.query.token;
  console.log("authenticateToken:", token);

  // If token is null, return 401 Unauthorized
  if (!token) {
    return res.send(json("", false, "Không có quyền truy cập"));
  }
  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const id = await getIdByEmail(decoded.email);
    // Add decoded user information to request object
    req.body = { ...decoded, ...req.body, ...id };
    console.log("Body after authenticateToken: \n", req.body);
    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      return res.send(json(error, false, "Token đã hết hạn"));
    }
    return res.send(json(error, false, "Token không hợp lệ"));
  }
}

function staffCheck(req, res, next) {
  const role = req.body.role;
  if (role != "PS00000003" && role != "PS00000002" && role != "PS00000004") {
    return res.send(
      json(
        { client: role, require: "staff || manager || supervisor" },
        false,
        "Không có quyền truy cập"
      )
    );
  }
  next();
}

function managerCheck(req, res, next) {
  const role = req.body.role;
  if (role != "PS00000002") {
    return res.send(
      json(
        { client: role, require: "manager" },
        false,
        "Không có quyền truy cập"
      )
    );
  }
  next();
}

function supervisorCheck(req, res, next) {
  const role = req.body.role;
  if (role != "PS00000004") {
    return res.send(
      json(
        { client: role, require: "supervisor" },
        false,
        "Không có quyền truy cập"
      )
    );
  }
  next();
}

function supervisorManaCheck(req, res, next) {
  const role = req.body.role;
  if (role != "PS00000004" && role != "PS00000002") {
    return res.send(
      json(
        { client: role, require: "supervisor || manager" },
        false,
        "Không có quyền truy cập"
      )
    );
  }
  next();
}

function managerAdminCheck(req, res, next) {
  const role = req.body.role;
  if (role != "PS00000001" && role != "PS00000002") {
    return res.send(
      json(
        { client: role, require: "admin || manager" },
        false,
        "Không có quyền truy cập"
      )
    );
  }
  next();
}

function adminCheck(req, res, next) {
  const role = req.body.role;
  if (role != "PS00000001") {
    return res.send(
      json({ client: role, require: "admin" }, false, "Không có quyền truy cập")
    );
  }
  next();
}

async function decodedToken(req, res, next) {
  const token = req.headers["authorization"] || req.query.token;
  console.log("token: ", token);
  if (!token) {
    next();
    return;
  }
  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const id = await getIdByEmail(decoded.email);
    // Add decoded user information to request object
    req.body = { ...decoded, ...req.body, ...id };
    console.log("Body after authenticateToken: \n", req.body);
    next();
  } catch (error) {
    if (error.message == "jwt expired") {
      return res.send(json(error, false, "Token đã hết hạn"));
    }
    // return res.send(message(error, false, "Token không hợp lệ"));
  }
}

module.exports = {
  authenticateToken,
  adminCheck,
  managerCheck,
  managerAdminCheck,
  supervisorManaCheck,
  supervisorCheck,
  staffCheck,
  decodedToken,
};

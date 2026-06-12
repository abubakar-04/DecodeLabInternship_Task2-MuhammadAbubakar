const http = require("http");

const PORT = 3000;

let tasks = [
  {
    id: 1,
    title: "Review Project 1 frontend",
    completed: false,
  },
  {
    id: 2,
    title: "Build Project 2 backend API",
    completed: false,
  },
];

const server = http.createServer(async (req, res) => {
  setCorsHeaders(res);

  if (req.method === "OPTIONS") {
    return sendResponse(res, 204);
  }

  if (req.url === "/" && req.method === "GET") {
    return sendResponse(res, 200, {
      message: "DecodeLabs Project 2 Backend API",
      endpoints: ["GET /tasks", "POST /tasks", "GET /health"],
    });
  }

  if (req.url === "/health" && req.method === "GET") {
    return sendResponse(res, 200, {
      status: "ok",
      uptime: Math.round(process.uptime()),
    });
  }

  if (req.url === "/tasks" && req.method === "GET") {
    return sendResponse(res, 200, {
      count: tasks.length,
      tasks,
    });
  }

  if (req.url === "/tasks" && req.method === "POST") {
    return createTask(req, res);
  }

  return sendResponse(res, 404, {
    error: "Route not found",
  });
});

server.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});

async function createTask(req, res) {
  try {
    const body = await readRequestBody(req);
    const title = typeof body.title === "string" ? body.title.trim() : "";

    if (!title) {
      return sendResponse(res, 400, {
        error: "Task title is required",
      });
    }

    if (title.length > 120) {
      return sendResponse(res, 400, {
        error: "Task title must be 120 characters or less",
      });
    }

    const task = {
      id: getNextId(),
      title,
      completed: false,
    };

    tasks.push(task);

    return sendResponse(res, 201, {
      message: "Task created successfully",
      task,
    });
  } catch {
    return sendResponse(res, 400, {
      error: "Invalid JSON request body",
    });
  }
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      if (!data) {
        return resolve({});
      }

      try {
        resolve(JSON.parse(data));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}

function sendResponse(res, statusCode, data = null) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
  });

  if (data === null) {
    return res.end();
  }

  return res.end(JSON.stringify(data, null, 2));
}

function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function getNextId() {
  if (tasks.length === 0) {
    return 1;
  }

  return Math.max(...tasks.map((task) => task.id)) + 1;
}

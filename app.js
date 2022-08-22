import createError from "http-errors";
import express from "express";
import session from "express-session";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import morgan from "morgan";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import { indexRouter } from "./routes/index.js";
import { apiRouter } from "./routes/api.js";

const app = express();

/** Swagger */
import swaggerUI from "swagger-ui-express";
// import swagger from "./swagger/swagger.json";

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// PORT setting
const PORT = 5000;
app.set("port", process.env.PORT || PORT);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// req.session 객체 생성
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  // redis저장 설정
  // store: new RedisStore({ client: redisClient }),
};
if (process.env.NODE_ENV === "production") {
  sessionOption.proxy = true;
  // sessionOption.cookie.secure = true;
}
app.use(session(sessionOption));

app.use("/", indexRouter); // Using in Citylabs Cloud Admin Site
app.use("/api", apiRouter); // Using in Others Project Site
// app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swagger)); // Swagger

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

// PORT 연결상태 확인
app.listen(app.get("port"), () =>
  console.log(`Listening on port ${app.get("port")}`)
);

export default app;

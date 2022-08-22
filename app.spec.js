import request from "supertest";
import should from "should";
import app from "./app.js";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import * as userDB from "./test/user.js";
import * as reportDB from "./test/report.js";

// HTTP_STATUS_CODE
// OK: 200,
// CREATED: 201,
// BAD_REQUEST: 400,
// UNAUTHORIZED: 401,
// FORBIDDEN: 403,
// NOT_FOUND: 404,
// METHOD_NOT_ALLOW: 405,
// CONFLICT: 409,
// INTERNAL_SERVER: 500,

// describe("Post /user/add", () => {
// describe("일반 유저 등록", () => {
//   it("레코드 기록 성공 시 200 리턴", (done) => {
//     request(app)
//       .post("/user/add")
//       .send(userDB.user)
//       .expect(200)
//       .end((err, res) => {
//         console.log(res.text);
//         if (err) {
//           done(err);
//         } else {
//           done();
//         }
//       });
//   });
// });
// describe("폰 번호 없는 유저 등록", () => {
//   it("파라미터 없어서 400 에러", (done) => {
//     request(app)
//       .post("/user/add")
//       .send(userDB.user_noPhoneNumber)
//       .expect(400)
//       .end((err, res) => {
//         console.log(res.text);
//         if (err) {
//           done(err);
//         } else {
//           done();
//         }
//       });
//   });
// });
// });

// describe("Post /report/add", () => {
//   let body = null;
//   describe("레코드 기록 성공 시", () => {
//     it("200 리턴", (done) => {
//       request(app)
//         .post("/report/add")
//         // .send(reportDB.report)
//         .attach("fileUpload", `${__dirname}/public/10611.png`)
//         .expect(200)
//         .end((err, res) => {
//           console.log(res.text);
//           if (err) {
//             done(err);
//           } else {
//             done();
//           }
//         });
//     });
//   });
// });

// describe("Get /user/access", () => {
//   describe("게스트 & 사이트 방문시 jwt 생성 성공시", () => {
//     it("200 리턴", (done) => {
//       request(app)
//         .get("/user/access")
//         .expect(200)
//         .set("Accept", "application/json")
//         .end((err, res) => {
//           console.log(res.text);
//           if (err) {
//             done(err);
//           } else {
//             done();
//           }
//         });
//     });
//   });
// });

describe("Post /user/login", () => {
  const response = {
    userId: "hi",
    password: "12",
  };

  describe("로그인 성공시", () => {
    it("200 리턴", (done) => {
      request(app)
        .post("/user/login")
        .send(response)
        .expect(200)
        .end((err, res) => {
          console.log(res.text);
          if (err) {
            done(err);
          } else {
            done();
          }
        });
    });
  });
});

// describe("Get /user/fetchUser", () => {
//   describe("유저 세션 정보 요청 성공시", () => {
//     it("200 리턴", (done) => {
//       request(app)
//         // .get("/user/fetchUser")
//         .get("/user/fetchUser")
//         .set("Accept", "application/json")
//         .expect(200)
//         .end((err, res) => {
//           console.log(res.text);
//           if (err) {
//             done(err);
//           } else {
//             done();
//           }
//         });
//     });
//   });
// });

// before((done) => {
//   request(app)
//     .post("/report/add")
//     .send(report)
//     .expect(200)
//     .end((err, res) => {
//       if (err) {
//         throw err;
//       }
//       body = res.body;
//       console.log("바디", body);

//       done();
//     });
// });

// describe("Get /admin/fetchRecentReport", () => {
//   describe("최근 신고 리스트 요청 성공시", () => {
//     it("200 리턴", (done) => {
//       request(app)
//         .get("/api/admin/report")
//         .expect(200)
//         .end((err, res) => {
//           console.log(res.text);
//           if (err) {
//             done(err);
//           } else {
//             done();
//           }
//         });
//     });
//   });
// });

// describe("Post /admin/fetchReport", () => {
//   const req = { reportNumber: 3 };
//   describe("개별 신고 리스트 요청 성공시", () => {
//     it("200 리턴", (done) => {
//       request(app)
//         .post("/api/admin/report/fetchReport")
//         .send(req)
//         .expect(200)
//         .end((err, res) => {
//           console.log(res.text);
//           if (err) {
//             done(err);
//           } else {
//             done();
//           }
//         });
//     });
//   });
// });

// describe("Post /admin/fetchReportQuery", () => {
//   describe("신고 쿼리 검색 리스트 요청 성공시", () => {
//     it("200 리턴", (done) => {
//       request(app)
//         .post("/api/admin/report/fetchReportQuery")
//         .expect(200)
//         .end((err, res) => {
//           console.log(res.text);
//           if (err) {
//             done(err);
//           } else {
//             done();
//           }
//         });
//     });
//   });
// });

// 관리자 로그인(admin login)
// describe("Post /admin/login", () => {
//   const response = {
//     adminId: "citylabs1",
//     password: "12",
//   };
//   describe("로그인 성공시", () => {
//     it("200 리턴", (done) => {
//       request(app)
//         .post("/admin/login")
//         .send(response)
//         .expect(200)
//         .end((err, res) => {
//           console.log(res.text);
//           if (err) {
//             done(err);
//           } else {
//             done();
//           }
//         });
//     });
//   });
// });

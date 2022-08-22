import express from "express";

import * as userControllers from "../../controller/user/user.js";

const userRouter = express.Router();

userRouter.post("/add", userControllers.addUser);

// // 탈퇴 사유 추가 해서 그리고에 공유 API
// userRouter.post("/withdraw", userControllers.userWithdraw);

userRouter.post("/login", userControllers.login);

userRouter.post("/loginCheck", userControllers.loginCheck);

userRouter.get("/fetchUser", userControllers.fetchUser);

// userRouter.put("/updateUser", userControllers.updateUser);

// userRouter.put("/updateDrivingLicense", userControllers.updateDrivingLicense);

// userRouter.get("/fetchdrivingLicense", userControllers.findDrivingLicense);

// userRouter.get("/fetchAllUsers", userControllers.fetchAllUsers);

// userRouter.get("/getUserQuestionId", userControllers.getUserQuestionId);

// userRouter.get(
//   "/fetchAllUserByCondition",
//   userControllers.fetchAllUserByCondition
// );

// userRouter.post("/userWithdraw", userControllers.userWithdraw);

// userRouter.get("/fetchUserById", userControllers.fetchUserById);

userRouter.get("/access", userControllers.registAccessLog);

userRouter.get("/dev", userControllers.dev);

export { userRouter };

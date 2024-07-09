"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    try {
        //hash the password
        const hashedpassword = yield bcrypt_1.default.hash(password, 10);
        console.log(hashedpassword);
        //create a new user and save to database
        const newUser = yield prisma_1.default.user.create({
            data: {
                username,
                email,
                password: hashedpassword,
            },
        });
        console.log(newUser);
        res.status(201).json({ message: "User created succesfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to create user" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //check if the user exists
    try {
        const user = yield prisma_1.default.user.findUnique({
            where: { username },
        });
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });
        //check if the password is correct
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(401).json({ message: "Invalid credentials" });
        //generate a cookie token and send it to the user
        const age = 1000 * 60 * 60 * 24 * 7;
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            isAdmin: false,
            //login after change isAdmin
        }, process.env.JWT_SECRET_KEY, { expiresIn: age });
        const { password: userPassword } = user, userInfo = __rest(user, ["password"]);
        res
            .cookie("token", token, {
            httpOnly: true,
            // secure: true,
            maxAge: age,
        })
            .status(200)
            .json(userInfo);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to login" });
    }
});
exports.login = login;
const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successful" });
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map
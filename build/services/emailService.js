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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailToken = void 0;
const API_KEY = process.env.API_KEY || "key";
const DOMAIN = process.env.DOMAIN_NAME || "localhost";
// @ts-ignore
const form_data_1 = __importDefault(require("form-data"));
const mailgun_js_1 = __importDefault(require("mailgun.js"));
const mailgun = new mailgun_js_1.default(form_data_1.default);
const client = mailgun.client({ username: 'api', key: API_KEY, url: "https://api.eu.mailgun.net" });
function sendEmailToken(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const messageData = {
            from: `Dan0m1.me <confirmation@dan0m1.me>`,
            to: email,
            subject: 'Your one-time password',
            text: "Your one-time password is: " + token + "\n\nDon't reply to this letter!\ndan0m1.me"
        };
        client.messages.create(DOMAIN, messageData)
            .then((res) => {
            console.log(res);
        })
            .catch((err) => {
            console.error(err);
        });
    });
}
exports.sendEmailToken = sendEmailToken;

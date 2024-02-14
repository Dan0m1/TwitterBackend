const API_KEY = process.env.API_KEY || "key";
const DOMAIN = process.env.DOMAIN_NAME || "localhost";
// @ts-ignore
import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);
const client = mailgun.client({username: 'api', key: API_KEY, url: "https://api.eu.mailgun.net"});

export async function sendEmailToken(email: string, token: string) {

    const messageData = {
        from: `Bohdan <bohdan.shevchenko182@gmail.com>`,
        to: email,
        subject: 'Your one-time password',
        text: "Your one-time password is: " + token,
    };

    client.messages.create(DOMAIN, messageData)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        });
}
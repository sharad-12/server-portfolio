const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const config = require('./config');
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(config.clientId, config.clientSecret);
OAuth2_client.setCredentials({ refresh_token: config.refreshToken });

function sendMail(data)
{
    return new Promise((resolve, reject) =>
    {
        const access_token = OAuth2_client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAUTH2',
                user: config.user,
                clientId: config.clientId,
                clientSecret: config.clientSecret,
                refreshToken: config.refreshToken,
                accessToken: access_token
            }
        });
        const mailOption = {
            // from: `Portfolio${config.user}`,
            // to: config.user,
            // subject: 'Contact Us Page',
            // html: `User data:<h2>Name:</h2>
            // <h4>${data.name}</h4>
            // <h2>Email:</h2>
            // <h4>${data.email}</h4>
            // <h2>Message:</h2>
            // <h4>${data.message}</h4>`

            from: `Portfolio${config.user}`,
            to: config.user,
            subject: 'Contact Us Page',
            html: `
                <h2 style="margin-bottom: 5px;">Get In Touch:</h2><br/>
                <div style="margin-bottom: 15px;">
                    <strong>Name:</strong> <span style="color: #333;">${data.name}</span>
                </div>
                <div style="margin-bottom: 15px;">
                    <strong>Email:</strong> <span style="color: #333;">${data.email}</span>
                </div>
                <div>
                    <strong>Message:</strong> <span style="color: #333;">${data.message}</span>
                </div>
            `
            
        }
        transport.sendMail(mailOption, (err, result) =>
        {
            transport.close();
            if (err) {
                reject({ status: 300, message: 'Mail not sent', err: err });
            } else {
                resolve({ status: 200, message: 'Mail sent successfully', result: result });
            }
        });
    });
}

module.exports = sendMail;
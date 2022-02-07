const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

//https://developers.google.com/oauthplayground 에서 refresh토큰 발급 가능
const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const ouath2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

//send mail

const sendEmail = (to, url, txt) => {
  ouath2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });

  const accessToken = ouath2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });

  // SENDER_EMAIL_ADDRESS 는 보내는 메일주소 쉽게말해서 회사 메일 이라고 생각하면된다 html은 이메일인증 화면을 간단하게 해놓은 것
  // 버튼은 자동생성인것 같다 나머지 부분은 수정 가능
  // 본문에 있는 url은 가입하면서 생성된 토큰이 추가된 url 인 것 같다.

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: "URurl",
    html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">URurl에 가입하신걸 환영합니다!</h2>
            <p>Congratulations! You're almost set to start using DEVAT✮SHOP.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `,
  };

  //메일보내는 함수
  smtpTransport.sendMail(mailOptions, (err, infor) => {
    if (err) {
      return err;
    }

    return infor;
  });
};

module.exports = sendEmail;

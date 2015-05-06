var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: '126',
    auth: {
        user: 'yq891001@126.com',
        pass: '891001'
    }
});
var transporter = nodemailer.createTransport();
transporter.sendMail({
    from: 'yq8910011@126.com',
    to: 'yinghui.zhang@3g2win.com',
    subject: 'hello',
    //text: 'hello world email 中文'
    html:'<a href="baidu.com">mengbing</a> <h3>呵呵</h3>'
});
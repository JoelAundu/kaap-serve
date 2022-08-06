import sgMail from '@sendgrid/mail'
sgMail.setApiKey('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',);

// function to check if it's a weekend
const isWeekend = (date) => {
    return date.getDay() === 6 || date.getDay() === 0 ? true : false;
};

// function to check if it's office hours
const isWorkHours = (date) => {
    return (date.getHours() >= 7) && (date.getHours() < 20)
};

const Days = {
    Monday: 1,
    Tues: 2,
    Wed: 3,
    Thurs: 4,
    Fri: 5,
    Sat: 6,
    Sun: 0,
}

export const scheduleAutoReply = (hoursAfter) => {
    const currDte = new Date()
    let scheduledDate = new Date()

    if (isWeekend(currDte)) {
        const daysToSkip = currDte.getDay() === Days.Sat ? 2 : 1;
        scheduledDate = new Date(
            currDte.getFullYear(),
            currDte.getMonth(),
            currDte.getDate() + daysToSkip, 7, 0, 0, 0)
    }

    else if (isWorkHours(currDte)) {
        scheduledDate = new Date(
            currDte.getFullYear(),
            currDte.getMonth(),
            currDte.getDate(),
            currDte.getHours() + (hoursAfter || 2),
            currDte.getMinutes(),
            currDte.getSeconds(),
            currDte.getMilliseconds())
    }

    return scheduledDate
}

export const sendEmail = (req, res) => {
    const scheduledDate = scheduleAutoReply(2)

    const msg = {
        to: `${req.body.email}`,
        from: 'joel960801@outlook.com',
        subject: 'Kaap Service Test App',
        text: `This is the automated response scheduled to send at ${scheduledDate.toTimeString() + "" + scheduledDate.toTimeString()}`,
        html: `Dear ${req.body.name}<br />
        I trust you are doing&nbsp;well<br />
        <br />        
        Thank you for reaching out to me, we are working at your request and will be back to you as soon as possible.<br />
        <br />
        Kind regards&nbsp;<br />
        <br />
        <br />
        <br />`,
    }


    const callBack = () => sgMail.send(msg)
        .catch((e) => {
            // console.log(e)
            throw new Error(e);
        })

    setTimeout(callBack, scheduledDate.getTime() - new Date().getTime())

    res.send({
        status: 'success',
        message: 'Email sent successfully',
    })
}

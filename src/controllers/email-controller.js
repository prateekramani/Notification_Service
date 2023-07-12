
const { EmailService } = require("../services");
const { StatusCodes } = require("http-status-codes");

async function create(req, res, next) {
    try {
        const response = await EmailService.createTicket({
            subject: req.body.subject,
            content: req.body.content,
            recipientMail : req.body.recipientMail
        })

        return res.status(StatusCodes.CREATED).json(response);

    } catch (error) {
        return res.status(StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE);
    }
}

module.exports = {
    create
}
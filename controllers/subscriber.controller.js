const Subscribers = require('../models/subscribers.models');
const transporter = require('../services/mailer');



exports.subscribe= async (req, res) => {
    try{
        const{ email} = req.body;
        if (!email) return res.json({ error: 'Email is required' });
        const subscriberExists = await Subscribers.findOne({ email})
        if (subscriberExists) return res.status(409).json({ error: 'Email is already subscribed' });

        const subscriber = await new Subscribers({ email}).save();
        await transporter.sendMail({
            from: `"My App" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Thank you for subscribing!",
            html: `<p>Hello, thank you for subscribing with <b>${email}</b>!</p>`,
    });
        res.json({ message: 'Subscription successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }}


exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscribers.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
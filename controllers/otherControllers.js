import catchAsyncError from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandlerClass.js";
import sendEmail from "../utils/sendEmail.js";
import { Stats } from "../models/Stats.js";

export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new ErrorHandler("Please fill all fields", 400));
  }

  const to = process.env.MY_MAIL;
  const subject = "Contact from CourseBundler";
  const text = `I am ${name} and my Email is ${email}.\n${message}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your Message has been sent",
  });
});

export const requestaCourse = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;

  if (!name || !email || !message) {
    return next(new ErrorHandler("Please fill all fields", 400));
  }

  const to = process.env.MY_MAIL;
  const subject = "Requesting for a course on CourseBundler";
  const text = `I am ${name} and my Email is ${email}.\n${course}`;

  await sendEmail(to, subject, text);

  res.status(200).json({
    success: true,
    message: "Your Request has been sent",
  });
});

export const getStats = catchAsyncError(async (req, res, next) => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

  const statsData = [];

  for (let i = 0; i < stats.length; i++) {
    statsData.unshift (stats[i]) ;
  }
  const requiredSize = 12 - stats.length;

  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      user: 0,
      subscription: 0,
      views: 0,
    });
  }

  const usersCount = statsData[11].length;
  const subscriptionCount = statsData[11].length;
  const viewsCount = statsData[11].length;

  let usersPercentage = 0,
    subscriptionPercentage = 0,
    viewsPercentage = 0;
  let usersProfit = true,
    subscriptionProfit = true,
    viewsProfit = true;

  if (statsData[10].user === 0) usersPercentage = usersCount * 100;
  if (statsData[10].subscription === 0)
    subscriptionPercentage = subscriptionCount * 100;
  if (statsData[10].user === 0) viewsPercentage = viewsCount * 100;
  else {
    const difference = {
      user: (statsData[11].user = statsData[10].user),
      subscription: (statsData[11].subscription = statsData[10].subscription),
      views: (statsData[11].views = statsData[10].views),
    };

    usersPercentage = (difference.user / statsData[10].user) * 100;
    subscriptionPercentage =
      (difference.subscription / statsData[10].subscription) * 100;
    viewsPercentage = (difference.views / statsData[10].views) * 100;

    if (usersPercentage < 0) usersProfit = false;
    if (subscriptionPercentage < 0) subscriptionProfit = false;
    if (viewsPercentage < 0) viewsProfit = false;
  }

  res.status(200).json({
    success: true,
    stats: statsData,
    usersCount,
    subscriptionCount,
    viewsCount,
    usersPercentage,
    usersProfit,
    subscriptionPercentage,
    subscriptionProfit,
    viewsPercentage,
    viewsProfit,
  });
});

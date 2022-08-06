import { sendEmail } from "./scheduler.js";
import express from "express";
import cors from "cors";
import sgMail from "@sendgrid/mail";
import bodyParser from "body-parser";
import path from "path";

const isDev = process.env.NODE_ENV === "development";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5500;
sgMail.setApiKey(
  "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"
);

app.get("/", (_, res) => {
  if (isDev) res.send("server running");
});

app.post("/send-email", (req, res) => {
  try {
    sendEmail(req, res, setError);
  } catch (error) {
    setError(res, error);
  }
});

app.listen(port, () => {
  if (isDev) console.log(`server running on port ${port}`);
});

function setError(res, error) {
  res.send({
    status: "failed",
    message: isDev ? error.message : "",
  });
}

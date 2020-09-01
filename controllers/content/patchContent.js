const db = require("../../models");
const jwt = require("jsonwebtoken");

// 글을 수정할 때 사용합니다.
module.exports = {
  patch: (req, res) => {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, req.app.get("jwt-secret"));
    const { contentId } = req.params;
    const {
      title,
      text,
      covid_date,
      referenceFile,
      q_temp,
      q_resp,
      q_cough,
      q_appet,
      q_sleep,
      q_fatigue,
      q_psy,
      like,
    } = req.body;

    try {
      db.Content.findOne({ where: { id: contentId, userId: decoded.id } })
        .then((content) => {
          db.Content.update(
            {
              title: title,
              text: text,
              covid_date: covid_date,
              referenceFile: referenceFile,
              q_temp: q_temp,
              q_resp: q_resp,
              q_cough: q_cough,
              q_appet: q_appet,
              q_sleep: q_sleep,
              q_fatigue: q_fatigue,
              q_psy: q_psy,
              like: like,
            },
            { where: { id: content.id, userId: decoded.id } }
          ).then((contentUpdated) => {
            if (contentUpdated) {
              res.status(201).send({ message: "수정되었습니다" });
            } else {
              res.status(404).send("잘못된 요청입니다");
            }
          });
        })
        .catch((err) => {
          console.error("contentId 값이 잘못되었습니다.", err);
        });
    } catch (err) {
      (err) => {
        console.log(err);
        res.status(500).json("Server Error");
      };
    }
  },
};

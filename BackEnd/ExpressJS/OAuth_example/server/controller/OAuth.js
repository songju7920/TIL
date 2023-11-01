const { default: axios } = require("axios");

const clientSecret = "ffcf22507ad5f32c62366a528fc70f0367ca6873";
const clientID = "9832d7e998a874ee7459";
const GITHUB_LOGIN_REDIRECT = "http://localhost:8080/OAuth/github/getCode";

const login = async (req, res) => {
  let url = "https://github.com/login/oauth/authorize";
  url += `?client_id=${clientID}`;
  url += `&redirect_uri=${GITHUB_LOGIN_REDIRECT}`;
  url += "&scope=repo:status%20user";
  return res.redirect(url);
};

const getToken = async (req, res) => {
  const { code } = req.query;
  const url = `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`;
  try {
    const response = await axios({
      method: "POST",
      url: url,
      headers: {
        "Content-Type": "application/json",
        token_type: "bearer",
      },
    });
    console.log(`response.data:${response.data}`);
    const access_token = response.data.split("&")[0].split("=")[1];
    console.log(`access_token:${access_token}`);

    const userResponse = await axios({
      method: "GET",
      url: "https://api.github.com/user",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const Repos = await axios({
      method: "GET",
      url: `${userResponse.data.repos_url}`,
    });
    res.send(
      res.send(`
    <h1>${userResponse.data.name}님</h1>
    <img herf=${userResponse.data.avatar_url}>
    <div>Github 가입일: ${userResponse.data.created_at}</div>
    <div>2FA: ${userResponse.data.two_factor_authentication}</div>
    <div>레포지터리 수 : ${Repos.data.length}</div>`)
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  login,
  getToken,
};

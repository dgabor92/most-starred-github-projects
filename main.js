const express = require("express");
const fetch = require("node-fetch");
const PORT = process.env.PORT || 3000;

const app = express();

async function getRepos(req, res, next) {
  try {
    console.log("Fetching Data...");
    const { topic } = req.params;
    const response = await fetch(
      `https://api.github.com/search/repositories?q=${topic}&sort=stars&order=desc`
    );
    const data = await response.json();
    console.log("Data fetched!");
    const filteredData = data.items.map((item) => ({
      full_name: item.full_name,
      html_url: item.html_url,
      description: item.description,
      language: item.language,
      stargazers_count: item.stargazers_count,
      forks_count: item.forks_count,
      watchers: item.watchers,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));

    res.send(filteredData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

app.get("/", (req, res) => {
  res.send(
    `You can search in GITHUB repositories by adding /repos to the url and add the topic you want to search for after the /repos in the url /repos/react`
  );
});

app.get("/repos/:topic", getRepos);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

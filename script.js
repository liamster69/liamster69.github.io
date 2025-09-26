document.getElementById('startBtn').addEventListener('click', function () {
  const url = 'https://jsonplaceholder.typicode.com/posts'; // Change this to any API you want
  const corsProxyUrl = 'https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/proxy/'; // Our proxy endpoint

  fetch(corsProxyUrl + encodeURIComponent(url))
    .then(response => response.json())
    .then(data => {
      console.log(data); // Log data to console
      document.getElementById('result').textContent = JSON.stringify(data, null, 2); // Display data
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('result').textContent = 'Error: ' + error;
    });
});

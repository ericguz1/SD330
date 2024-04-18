function githubFilelist() {
    var htmlString = "";

    (async () => {
        const response = await fetch("https://api.github.com/repos/ERICGUZ1.GITHUB.IO/SD330/");
        const data = await response.json();

        for (let file of data) {
            let fname = file.name;
            let fpath = "https://github.com/ERICGUZ1.GITHUB.IO/SD330/" + fname;

            htmlString += "<p><a href='" + fpath + "'>" + fname + "</a></p>";
        }

        document.getElementById('files').innerHTML = htmlString;
    })()
}

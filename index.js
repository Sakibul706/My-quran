const div = document.querySelector("#root");

axios
    .get("http://api.alquran.cloud/v1/surah")
    .then((res) => {
        const suras = res.data.data;
        // console.log(suras);
        // console.log(typeof suras);
        let divText = [];
        for (let k in suras) {
            let sura = suras[k];
            const sur = `
            <div>
                <a href="#"> number: ${sura.number} Ename: ${sura.englishName} </a>
            </div>`;
            divText.push(sur);
        }
        // console.log(divText.toString());
        div.innerHTML = divText.toString().replace(/,/g, "");
    })
    .catch((err) => {
        console.log(err);
    });

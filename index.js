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
            // console.log(sura);
            const sur = `
            <div class="ddiv">
                <p>${sura.number} -<span> ${sura.name} </span> ${sura.englishName} </p>
            </div>`;
            divText.push(sur);
        }
        div.innerHTML = divText.toString().replace(/,/g, "");
        const divC = document.querySelectorAll(".ddiv");
        divC.forEach((item, index) => {
            item.addEventListener("click", () => {
                // console.log(`${index + 1}`);
                loadSurah(`${index + 1}`);
            });
        });
    })
    .catch((err) => {
        console.log(err);
    });

function loadSurah(indx) {
    console.log(indx);
    axios.get(`http://api.alquran.cloud/v1/surah/${indx}`).then((res) => {
        const surah = res.data.data;
        console.log(surah);
        const ayahs = surah.ayahs;
        const ayaArr = [];
        ayahs.forEach((item, index) => {
            if (index === 0) {
                index = "";
                return;
            }
            const aya = `
            <div>${index}</div>
            <div class="aya">
                ${item.text}
            </div>`;
            ayaArr.push(aya);
        });
        const ayaaa = ayaArr.toString().replace(/,/g, "");
        const surahHtml = `
        <div class="go-back">go bck</div>
        <a href="/">Back</a>
        <h1>${surah.englishName}</h1>

        <div class="imfo">${surah.revelationType}</div>
            ${ayaaa}
        `;
        document.body.innerHTML = surahHtml;
    });
}

const surahHtml = `

`;

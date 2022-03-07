const div = document.querySelector("#root");
const bismillah = `\ufeff\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064e\u0647\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0652\u0645\u064e\u0670\u0646\u0650 \u0627\u0644\u0631\u0651\u064e\u062d\u0650\u064a\u0645\u0650`;

// axios
//     .get("http://api.alquran.cloud/v1/surah")
//     .then((res) => {
//         const suras = res.data.data;
//         // console.log(suras);
//         // console.log(typeof suras);
//         let divText = [];
//         for (let k in suras) {
//             let sura = suras[k];
//             // console.log(sura);
//             const sur = `
//             <div class="surah">
//                 <p>${sura.number} -<span> ${sura.name} </span> ${sura.englishName} </p>
//             </div>`;
//             divText.push(sur);
//         }
//         div.innerHTML = divText.toString().replace(/,/g, "");
//         const divC = document.querySelectorAll(".surah");
//         divC.forEach((item, index) => {
//             item.addEventListener("click", () => {
//                 // console.log(`${index + 1}`);
//                 loadSurah(`${index + 1}`);
//             });
//         });
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// function loadSurah(indx) {
//     axios.get(`http://api.alquran.cloud/v1/surah/${indx}`).then((res) => {
//         const surah = res.data.data;
//         console.log(surah);
//         const ayahs = surah.ayahs;
//         const ayaArr = [];
//         ayahs.forEach((item, index) => {
//             let ayaContent = item.text;
//             if (index === 0) {
//                 console.log(ayaContent);
//                 console.log(bismillah);
//                 console.log(ayaContent.indexOf(bismillah));
//                 ayaContent = ayaContent.replace(bismillah, "");
//             }
//             const aya = `
//             <div class="aya">
//                 <div>${index}</div>
//                 <p>${item.text}</p>
//                 <div id="aya-${index}-t"></div>
//             </div>`;
//             ayaArr.push(aya);
//         });
//         const ayaaa = ayaArr.toString().replace(/,/g, "");
//         const surahHtml = `
//         <a href="/">Back</a>
//         <h1>${surah.englishName}</h1>
//         <div class="imfo">${surah.revelationType}</div>
//         <p>${bismillah}</p>
//             ${ayaaa}
//         `;
//         document.body.innerHTML = surahHtml;
//         translations(indx);
//     });
// }

// function translations(index) {
//     axios
//         .get(
//             `http://api.alquran.cloud/v1/surah/${index}/editions/en.itani,bn.bengali`
//         )
//         .then((res) => {
//             console.log(res.data.data);
//         });
// }

///***************************************************************
/*88888888888888888888888888888888 */

axios
    .get(`https://api.quran.com/api/v4/chapters`)
    .then((res) => {
        const suras = res.data.chapters;
        console.log(suras);
        // console.log(typeof suras);
        let divText = [];
        for (let sura of suras) {
            // console.log(sura);
            const sur = `
            <div class="surah">
                <p>${sura.id} -<span> ${sura.name_arabic} </span> ${sura.name_simple} </p>
            </div>`;
            divText.push(sur);
        }
        div.innerHTML = divText.toString().replace(/,/g, "");
        const divC = document.querySelectorAll(".surah");
        divC.forEach((item, index) => {
            item.addEventListener("click", () => {
                loadSurah(`${index + 1}`);
            });
        });
    })
    .catch((err) => {
        console.log(err);
    });

function loadSurah(indx) {
    axios
        .get(`https://api.quran.com/api/v4/chapters/${indx}?language=en`)
        .then((res) => {
            const suraData = res.data.chapter;

            axios
                .get(
                    `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=${indx}`
                )
                .then((res) => {
                    const surah = res.data.verses;
                    console.log(surah);
                    const ayaArr = [];
                    surah.forEach((item, index) => {
                        let ayaContent = item.text;

                        const aya = `
                            <div class="aya">
                                <div>${item.verse_key}</div>
                                <p>${item.text_uthmani}</p>
                                <div id="aya-${index}-t" class="aya-translation"></div>
                            </div>`;
                        ayaArr.push(aya);
                    });
                    const ayaaa = ayaArr.toString().replace(/,/g, "");
                    const surahHtml = `
                        <a href="/">Back</a>
                        <h1>${suraData.name_simple}</h1>
                        <div class="imfo">${suraData.revelation_place}</div>
                        <p>${bismillah}</p>
                            ${ayaaa}
                        `;
                    document.body.innerHTML = surahHtml;
                    translations(indx);
                });
        });
}

function translations(index) {
    axios
        .get(
            `http://api.alquran.cloud/v1/surah/${index}/editions/en.itani,bn.bengali`
        )
        .then((res) => {
            console.log(res.data.data);
            const translationData = res.data.data;
            const elements = document.querySelectorAll(".aya-translation");
            elements.forEach((item, indx) => {
                item.innerHTML = `
                    <p>${translationData[0].ayahs[indx].text}</p>
                    <p>${translationData[1].ayahs[indx].text}</p>
                    `;
            });
            const elemt = document.getElementById("aya-0-t");
            console.log(elemt);
            console.log(elements);
        });
}

// async function data() {
//     const aa = await axios.get(`https://api.quran.com/api/v4/chapters`);
//     console.log(aa);
// }

// const deta = data();
// console.log(deta);
// data();

// async function data() {
//     const aa = await axios.get(
//         `https://api.quran.com/api/v4/quran/verses/uthmani?chapter_number=1`
//     );
//     console.log(aa);
// }
// data();

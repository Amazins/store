const fragment = new URLSearchParams(window.location.search.slice(1));
const [item, rand, player] = [fragment.get('product'), fragment.get('hash'), fragment.get('trkId')];

const firebaseConfig = {
    apiKey: "AIzaSyCImQ1forKpA4QqYDUBdgnHrWuRrDoe5JE",
    authDomain: "amazins-warehouse.firebaseapp.com",
    projectId: "amazins-warehouse",
    storageBucket: "amazins-warehouse.appspot.com",
    messagingSenderId: "168751389916",
    appId: "1:168751389916:web:273d298b49357e47ad2819"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

if(item, rand, player != null){
    db.collection('warehouse').doc('items').collection('available').where("sku", "==", item).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const pepo = doc.data();
            document.title = `${pepo.name} | Amazins`
            document.querySelector(".app-container").innerHTML = 
            `
            <div style="color: white;">
                <h1 style="text-decoration: underline;">${pepo.name}</h1>
                <ul class="images">
                    <li>
                        <img src="${pepo.image}">
                    </li>
                    <li>
                        <img src="${pepo.img2}">
                    </li>
                    <li>
                        <img src="${pepo.img3}">
                    </li>
                    <li>
                        <img src="${pepo.img4}">
                    </li>
                    <li>
                        <img src="${pepo.img5}">
                    </li>
                </ul>
            </div>
            <div id="descriptionz" style="color: white;">
                <p id="basic">${pepo.desc}<br>Price: ${pepo.price}</p><br>
                <p>${pepo.advanced}</p>
            </div>
            <div style="background-color:white;">${pepo.table}</div>`
        })
    })
} else{
    window.alert("Invalid URL")
    location.href="/404"
}
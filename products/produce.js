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
            <div style="color: white; position: relative;">
                <h1 style="text-decoration: underline; cursor: default;">${pepo.name}</h1>
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
                </ul>
            </div>
            <div id="descriptionz" style="color: white;">
                <p id="basic">${pepo.desc}<br>Color: ${pepo.color}<br>Price: $${pepo.price} + Shipping<br>Logo: ${pepo.merch}</p>
                <button onclick="location.href='https://amazins.github.io/store/purchase?item=${pepo.sku}&page=1&trkId=${player}';" style="background-color: #F2E941; height: 39px; border: none; width: 98.6%; height: 24px; cursor: pointer;">Buy ${pepo.name}</button><br>
                <p>Advanced Description:<br>${pepo.advanced}</p>
                <p></p>
            </div>
            <div style="background-color:white;">${pepo.table}</div>
            <button onclick="location.href='https://amazins.github.io/store/purchase?item=${pepo.sku}&page=1&trkId=${player}';" style="background-color: yellow; border: none; width: 100%; height: 32px; cursor: pointer;" title="Buy ${pepo.name}">Buy ${pepo.name}</button>`
        })
    })
} else{
    window.alert("Malformed URL")
    location.href="/404"
}

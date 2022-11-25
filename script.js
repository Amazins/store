const container = document.querySelector('.gridz');
document.title = `Store | Amazin`
window.alert('BLACK FRIDAY SALE NOW ON!\nUP TO 40% DISCOUNT SELECT ITEMS ONLY!')

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

db.collection('warehouse').doc('items').collection('available').get().then(snapshot => {
    setupSite(snapshot.docs);
});

function generateHashString() {
	let niceString = '';
	const randomNumber = Math.floor(Math.random() * 10);

	for (let i = 0; i < 20 + randomNumber; i++) {
		niceString += Math.floor(Math.random() * 94);
	}

	return niceString;
}

function generateTrackId() {
	let trackId = '';
	const randomNumber = Math.floor(Math.random() * 10);

	for (let i = 0; i < 20 + randomNumber; i++) {
		trackId += Math.floor(Math.random() * 8);
	}

	return trackId;
}



const hashTrigger = generateHashString();
const trkString = generateTrackId();

const setupSite = (data) => {
    let html = ``;
    data.forEach(doc => {
        const item = doc.data();
        const li = `
        <div onclick="location.href='https://amazins.github.io/store/products?product=${item.sku}&hash=${hashTrigger}&trkId=${trkString}';" title="Buy ${item.name}">
            <div class="slot">
                <div class="banner">
                    <img class="banner-img" src="${item.image}">
                </div>
                <div class="bot-descriptors">
                    <div class="bot-desc">
                        <div class="bot-name">${item.name}</div>
                        <div class="bot-owner">${item.desc}<br>Color: ${item.color}</div>
                        <div class="owner-descriptors">
                            <div>
                                <p id="bot-id">$${item.price}</p>
                            </div>
                            <div>
                                <p id="vote-count" style="font-size: 8px; margin-top: 22px;">SKU: ${item.sku}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        html += li
    });
    container.innerHTML = html;
}

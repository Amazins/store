const fragment = new URLSearchParams(window.location.search.slice(1));
const [item, rand, player] = [fragment.get('product'), fragment.get('hash'), fragment.get('trkId')];
document.title = `Products | Amazins`

if(item, rand, player != null){
    console.log('ok')
} else{
    window.alert("Invalid URL")
    location.href="/404"
}
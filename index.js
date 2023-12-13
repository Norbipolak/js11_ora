/*
Keresést kezdtük el múlt órán, most a katergóriákat kell megjelenitenünk illetve létrehozni az url-eket 
és az url változók alapján rákeresni a dolgokra

a products.executer-ben a 
const categorySelect = document.querySelector("#category")-t azt kivisszük a location.pathname === "/add_product.html"-ből ahova 
eddig le volt mentve és lementjük globálisan -> betesszük rögtön a const p = new Products(); alá 

és még a p.createCategorySelect(categorySelect)-nek a meghívását is kihelyezzük globálisra -> ezzel jelennek meg a termékkategóriák 

ezzel meg is vannak a kategóriák 
*/

/*
FormData lementeni az összes adatát a formnak és ilyen tömböket készít, ha beírunk valami random dolgot a márkához és a terméknévhez 
console.log(entry); a for ciklusból

['category', 'skincare']
['brand', 'egreg']
['title', 'dsgsdg']

ebből összeállítunk egy url-t, most azt akarjuk, ha valamit üresen hagyunk(nem írunk semmit az input mezőjébe), akkor 
ne menjen be az url-ünkbe pl. brand=és ide nincs semmi írva, akkor a brand se jelenjen meg az url-ünkben.

kell egy if
for(const entry of fd) {
    if(entry[1] !== 0 && entry[1] !="0") -> && utána rész, azért mert a category=0 megjelenik nélküle 
        const url = `${entry[0]=${entry[1]}&`
    productUrl += url;
}

Hogyha már ott van az url változó és rányumunk a keresés gombra, akkor nem szedi le ->
megoldás location nevű objektum (ami tartalmaz ilyeneket, hogy host, hostname, pathname, port, href, protocol stb..)

a products.executer.js searchBtn.addEventListener-jébe az e.preventDefault után ->
    const urlPlusPath = location.protcok + "//"location.host + location.pathname; 
    -> azért, mert a port is fontos, tehát kell a :8080 a 127.0.0.1 után és plusz location.pathname a /-jel miatt és 
    a protocol is fontos az elején a http: és a "//"
console.log(UrlPlusPath) -> http://127.0.0.1:8080 és utána tudjuk hozzáfüzni az url-t amit generáltunk 

hisory.pishState(null, "", urlPlusPath + productUrl)

Azt kell megnézni a dummyjson-on, hogyan tudunk rákeresni a dolgokra ->search product 
bármire ré tud keresni q=valami -> a q(query segítségével)
csak egy valamire tud rákeresni, szóval amit eddig csináltunk azt itt nem tudjuk alkalmazni
********************************************************************************************************************************************* 
*/

/*
Csinálunk egy searchProduct-ot a deleteProduct után a Products.js-ben

async searchProduct() {
    const category = getUrlVariable("category") alapból null-t ad vissza ezért ->
    const searchStr = category !== null ? "?q=" + category : ""     -> különben üres string
    const response = await fetch("https://dummyjson.com/products" + searchStr); - mivel ez egy get, ezért nem kell function 

    const json = await response.json();

    az index.html-ből kijönnek a name="brand" name="title" mert csak category-t tudunk keresni
    
    Ha a category nincsen megadva, akkor csak egy sima get-et csinálunk és a searchString egy üres string lesz,
    ha meg van adva, akkor hozzáfüzzük "?q=" a category-val 
    ezt pedig hozzáfüzzük a /products-nak a végére

    a SearchBtn-ben pedig meghívjuk a p.searchProduct()-ot

}
*/


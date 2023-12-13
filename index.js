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
bármire rá tud keresni q=valami -> a q(query segítségével)
csak egy valamire tud rákeresni, szóval amit eddig csináltunk azt itt nem tudjuk alkalmazni
********************************************************************************************************************************************* 
*/

/*
Csinálunk egy searchProduct-ot a deleteProduct után a Products.js-ben

async searchProduct() {
    const category = getUrlVariable("category") alapból null-t ad vissza ezért ->
    const searchStr = category !== null ? "?q=" + category : ""     -> különben üres string
    const response = await fetch("https://dummyjson.com/products/search" + searchStr); - mivel ez egy get, ezért nem kell function 

    const json = await response.json();
}   
    az index.html-ből kijönnek a name="brand" name="title" mert csak category-t tudunk keresni
    
    Ha a category nincsen megadva, akkor csak egy sima get-et csinálunk és a searchString egy üres string lesz,
    ha meg van adva, akkor hozzáfüzzük "?q=" a category-val 
    ezt pedig hozzáfüzzük a /products-nak a végére

    searchProduct()-ban a végén meghívjuk a this.createProductsHtml(json.products-ot) -> így nem müködik 

    csak, úgy fog müködni, ha az index.html-ben kivesszük a a name="category"-t a <h4>Category</h4> 
                                                                                    <select id="category" name="category"></select>-ból

    és a <h4>Márka</h4>            helyett csinélunk         <h4>Keresési kifejezés</h4>
         <input type="text">                                 <input type="text" name="searchParam">
    
    az async searchProduct() pedig, így fog kinézni
*/

async searchProduct() {
    const searchParam = getVariable("searhcParam"); //lementjük a searchParam-ot mint url-változót
    //console.log(category);
    const searchStr = searchParam !== null ? "?q=" + searchParam : "";

    const response = await fetch("https://dummyjson.com/products/search" + searchStr);
    const json = await response.json();

    this.createProductsHtml(json.products);
}

/*
Lett egy olyan mezőnk a 127.0.0.1:/8080, hogy Keresési kifejezés a Márka helyett 
és ha most ide beírunk valamit, pl. azt, hogy asdf és rányumunk a keresés gombunkra
akkor megváltozik az Url-ünk -> 127.0.0.1:8080/searchParam=asdf -re 
és ha console.log(searhcParam);, akkor a console-on megjelenik az asdf

const searchStr azt csinálja, hogyha beírunk valamit a keresési feltételnek, tehát nem marad üresen, akkor 
a legyen egy "?q=" amihez hozzáfüzzük a searchParam-ot, azt a kifejezést, amit beírtunk a Keresési kifejezés input-jába, 
ha ez üresen marad, akkor viszot, adjon vissza egy üres stringet.

a Products.js-ben csináltunk egy this.productHolder.innerHtml = "" -et rögtön a createProductsHtml(products) alatt.

és így jó lett -> ez lesz az url, ha a keresőbe mondjuk beírtuk, hogy phone ->
127.0.0.1:8080/?searchParam=phone 

megjelenik 4 termék [{...}, {...}, {...}, {...}]
0: {id: 1, title: 'iPhone 9', description: ....}
0: {id: 2, title: 'iPhone X', description: ....}
0: {id: 71, title: 'Women Shoulder Bags', description: ....}
0: {id: 86, title: 'Bluetooth Aux', description: ....}
length: 4
[[Prototype]]: Array(0)

product.executer.js-ben így a FormData okafogyott lett, mert nem így szerezzük meg az adatokat.
kitöröltünk mindent, csak az egyetlen input mezőnk a keresési feltételek lesznek és a keresés gomb 

<div>
    <h4>Keresési kifejezés</h4>
    <input type="text" id="searchParam">
</div>
<div>
    <h4>Keresés</h4>
    <button id="search">Keresés!</button>
</div>

input id-ja az lesz, hogy searchParam és az id-t lementjük a products.executer.js-be a const searchBtn alá.
!!!!!!!!!!!!ha Form-val szeretnénk beszedni az adatokat, akkor name kell, ha pedig simán lementéssel akkor pedig id!!!!!!!!!!!

lementés
const searchParamInput = document.querySelector("searchParam");

így fog kinézni az új ->
*/
const p = new Products()
if(location.pathname === "/" || location.pathname === "/index.html") {
    p.getProducts();

    const searchBtn = document.querySelector("search");
    const searchParamInput = document.querySelector("searchParam");

    searchBtn.addEventListener("click", function(e) {
        const urlPlusPath = location.protocol + "/" + location.host + location.pathname;
        let productUrl = "?searchParam=" + searchParamInput.value.trim(); //searchParamInput.value -> az amit beleírtunk az input mezőnkbe 
        //meg kell nézni, hogy fog reagálni, az összeset kihozza-e -> igen, ha a keresési feltételbe nem írunk semmit, akkor az összeset kihozza
        // csinálhatnánk itt egy hasonlót searchParam !== null ? "?q=" + searchParam : "";
        //productUrl = productUrl.substring(0, productUrl.length-1); -> az itt nem is szükséges
        history.pushState(null, "", urlPlusPath + productUrl); //megváltozik a pushState által az url-ünk anélkül, hogy újratöltödne az oldal
        
        p.searchProduct();
    });
}
/****************************************************************************************************************************************/ 

/*
Lapozás
Egyszerre kapunk valamennyi terméket -> limit & skip products a dummyjson-on példa

fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
.then(res => res.json())
.then(console.log);

output-ja
{
  "products": [
    {
      "id": 11, // first 10 items are skipped
      "title": "perfume Oil",
      "price": 13
    },
    {...},
    {...},
    {...}
    // 10 items
  ],

  "total": 100,
  "skip": 10,
  "limit": 10

  limit azt jelenti, hogy egy oldalon 10 jelenik meg a skip 10 meg azt, hogy a második tizet mutatja meg nekünk (11-től 20-ig)

  Az a kérdés, hogyha keresünk és a keresés után azt mondinom, hogy a keresés után jelenitse meg a limitet és a skipet is,
  hogyha van, akkor vajon az müködik-e ha kiegészitjük a searchProduct()-nak a response-át
*/
const response = await fetch("https://dummyjson.com/products/search" + searchStr); // ->
const response = await fetch("https://dummyjson.com/products/search" + searchStr  + "&limit=12");

/*
Müködik, de elöször megcsináljuk a lapozást searchParam nélkül 

index html-ben csinálunk egy div-et aminek a class="pagination" azon belül két div és azon belül két button

<div class="pagination">
  <div>
   <button id="prev">&lt</button>
  </div>
  <div>
    <button id="next">&gt</button>
  </div>
</div>

&lt -> hátra nyíl
&gt -> előre nyíl 

pagination-nek a style.css csinálunk ->
.pagination {
    width: 230px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.pagination button {
    cursor: pointer;
}
itt csinálunk változásokat X-vel jelölöm az újat
*/
const p = new Products()
const categorySelect = document.querySelector("#category");
//const prevBtn = document.querySelector("#prev"); /*X*/ 
//const nextBtn = document.querySelector("#next"); /*X*/
//let page = 1; /*X 1-nél fog kezdődni és amikor rákattintunk a pagination gombok valamelyikre akkor ez megváltozik*/

//if(nextBtn){ /* X ugyanaz mintha azt írnánk, hogy if(prevBtn !== null -> tehát létezik)*/
    //nextBtn.addEventListener("click" function() {
        //page++;
        // utána azt csináljuk az url-t
        //const UrlPlusPath = location.protocol + "/" + location.host + location.pathname;
        //history.pushState(null, "", urlPlusPath + "?skip=" + (page-1*30)); // ezzel megváltozik az url -> 127.0.0.1:8080?skip=30 vagy 60, 90 
        /*előrelapozásonként növekszik 30-val
        azért kell (page-1*30)), mert ha csak page*30 lenne, akkor rögtön az első oldalon kihagyna 30-at és ha lapoznánk egyet akkor skip 60 lesz
        de még az a probléma, hogy nem áll meg, mert nem ismeri a miximumunk at, ezért ezt az egészet be kell vinni a class products-ba,
        mert a product tudja a maxpages-t 
        */
    //});



/*
ha leszedjük az összes terméket ott, hogy getProducts() (products.js.ben van) és ha ott console.log(json)-t, 
akkor a json-ban kapunk olyan információkat, hogy hol járunk skip: (hányat ugrottunk át) és, hogy összesen hány termék van
jelen esetben itt
skip: 0
total: 100

lementünk a Products.js-ben a 
*/
Class Products {
    productsHolder;
    productImg;
    productTable;
    page; /*X*/
    maxPages; /*X*/
    nextBtn;  /*X*/

    constructor {
        this.productsHolder = document.querySelector("#products-holder");
        this.productImg = document.querySelector("#product-img");
        this.productTable = document.querySelector("#product-table");
        this.nextBtn = document.querySelector("#next");

        this.page = 1; /* X értéke az lesz, hogy 1, mert 1-vel kezdünk*/
        this.maxPages = 0; /* X értéke 0 lesz eleinte, de amikor rákeresünk, megnézzük, 
        hogy mennyi a total és hogy mennyit akarunk megjeleniteni egy lapon
        totalunk az 100 alapból és egy lapon 30-at jelenitünk meg, tehát 
        ebben az esetben 100/30=3.33333 -> 4 lapra lesz így szükségünk*/

        this.nextBtn() // regisztráljuk a next-et, mint eseménykezelőt 
    }
    nextBtn() {
        this.nextBtn.addEventListener("click", ()=> { // ha ide írjuk, akkor ki kell egészíteni a this.-vel, arrow function kell 
            this.page++;

            const urlPlusPath = location.protocol + "/" + location.host + location.pathname;
            history.pushState(null, "", urlPlusPath + "?skip=" + ((this.page-1)*30));
        });
    }
}
/*
getPoducts-ban aztmondjuk
*/

async getProduts() {
    const response = await fetch("https://dummyjson.com/products");
    const json = await response.json();


    this.maxPages = Math.ceil(json.total/json.limit); /* X azért fontos, hogy ne tudjunk tovább számolni, mint amennyire szükségünk lenne*/
    this.createProductsHtml(json.products);
}
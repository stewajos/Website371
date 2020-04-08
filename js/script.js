function test(body){
    console.log(body.cards);
    displayImage(body.cards[0]);
}
//document.getelementbyid
//document is an object version of the html
function displayImage(card){
    var card1 = document.getElementById("card");
    card1.innerHTML += '<img src="' + card.imageUrl + '"/>'
    console.log(card1);
}
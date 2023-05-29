

function calculateTotal() {
  var product1 = parseInt(document.getElementById("product1").value);
  var product2 = parseInt(document.getElementById("product2").value);
  var product3 = parseInt(document.getElementById("product3").value);
  var total = product1 + product2 + product3;
  document.getElementById("total").innerHTML = total;
}
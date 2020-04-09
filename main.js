let btnText = document.querySelector('.btn-text-span')
btnText.innerHTML = 'HOVER ME'
btnText.addEventListener('mouseover', function() {
    btnText.innerHTML = "CLICK ME"
    console.log(this);
})
btnText.addEventListener('mouseout', function() {
    btnText.innerHTML = "HOVER ME"
    console.log(this);
})
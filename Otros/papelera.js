const trash = document.querySelector('.trash');

trash.addEventListener('click', function(){
    trash.style.backgroundImage = 'none';
    setTimeout(() => {alert("La papelera esta vacia")}, 40) 
});
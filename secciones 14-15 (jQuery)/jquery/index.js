$('body').keypress(function (e) { 
    $('h1').text(e.key);
});

$('h1').on('mouseover',(e)=>{
    $('h1').css('color','red');
})

$('h1').on('mouseout',(e)=>{
    $('h1').css('color','#c1ff72');
})

// Adding things to the HTML

const h1 = $('h1');

h1.before(`<button class='btn-jquery'>Before button</button>`);
h1.after(`<button class='btn-jquery'>After button</button>`);
h1.prepend(`<button class='btn-jquery'>Prepend button</button>`);
h1.append(`<button class='btn-jquery'>Append button</button>`);

$('.btn-jquery').hide();

$('.btn-hide').click((e)=>{
    e.preventDefault();
    h1.hide();
});

$('.btn-show').click((e)=>{
    e.preventDefault();
    h1.show();
});

$('.btn-toggle').click((e)=>{
    e.preventDefault();
    h1.toggle();
});

$('.btn-fade-in').click(function (e) { 
    e.preventDefault();
    h1.fadeIn();
});

$('.btn-fade-out').click(function (e) { 
    e.preventDefault();
    h1.fadeOut();
});
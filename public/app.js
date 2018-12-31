document.addEventListener("DOMContentLoaded", function(event) {
    
    var reviewsPerTime = 3;

    var mySiema = new Siema({
        selector: '.siema',
        duration: 200,
        easing: 'ease-out',
        perPage: {
            600: 1,
            800: 2, 
            1240: 3
          },
        startIndex: 0,
        draggable: true,
        multipleDrag: true,
        threshold: 20,
        loop: false,
        rtl: false,
        onInit: () => {},
        onChange: () => {},
      });

    var mySiema2 = new Siema({
      selector: '.siema-2',
      duration: 200,
      easing: 'ease-out',
      perPage: {
          600: 1,
          800: 2, 
          1240: 3
        },
      startIndex: 0,
      draggable: true,
      multipleDrag: true,
      threshold: 20,
      loop: false,
      rtl: false,
      onInit: () => {},
      onChange: () => {},
    });

    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    prev.addEventListener('click', () => mySiema.prev());
    next.addEventListener('click', () => mySiema.next());

    const prev2 = document.querySelector('.prev-2');
    const next2 = document.querySelector('.next-2');

    prev2.addEventListener('click', () => mySiema2.prev());
    next2.addEventListener('click', () => mySiema2.next());

    //getting elements to manipulate
    var menuBtn = document.getElementsByClassName('menu-btn');
    var dropdownMenu = document.getElementById('dropdown-menu');

    for (var i = 0; i < menuBtn.length; i++) {
      menuBtn[i].addEventListener('click',function() {
        dropdownMenu.classList.toggle('is-visible');        
      }, false);
    }

    var loadSelectInput = function(selector, data) {
      var $select = $(selector);

      $select.find('option')
      .remove()
      .end()

      $(data).each(function(i, v){
          $select.append($("<option>", { value: v.id, html: v.name }));
        });
    };

    $('#marcas').change(function() {
      var params = [];
      params.push($(this).val());
      getOptions('#modelos', params)
    })

    $('#modelos').change(function() {
      var params = [];
      params = $(this).val();
      getOptions('#modelos', params)
    })

    var getOptions = function(selector, params) {
      var url = '';

      switch(selector) {
        case '#marcas':
          url = 'http://fipeapi.appspot.com/api/1/carros/marcas.json';
          break;
        case '#modelos':
          url = 'http://fipeapi.appspot.com/api/1/carros/veiculos/' + params + '.json';
          break;
        case '#anos':
        url = url.replace('.json', '/' + params + '.json');
          break;
        default:
          break;
      }

      $.get(url, function(data, status) {
        loadSelectInput(selector, data);
      });
    };

    getOptions('#marcas');
});

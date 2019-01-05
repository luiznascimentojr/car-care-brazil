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

    //get marcas modelos anos
    var params = [];

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

    var clearInputs = function(inputs) {
      for (var i = 0; i < inputs.length; i++) {
        $(inputs[i]).empty();
      }
    };

    $('#marcas').change(function() {
      params = [];
      clearInputs(['#modelos', '#anos']);
      params.push($(this).val()) ; 
      getOptions('#modelos', params)
    })

    $('#modelos').change(function() {
      params.push($(this).val());
      clearInputs(['#anos']);
      getOptions('#anos', params)
    })

    var getOptions = function(selector, p) {
      var url = '';
      var veiculo = '';

      switch(selector) {
        case '#marcas':
          url = 'http://fipeapi.appspot.com/api/1/carros/marcas.json';
          console.log(url);
          break;
        case '#modelos':
          url = 'http://fipeapi.appspot.com/api/1/carros/veiculos/' + p[0] + '.json';
          console.log(url, p);
          break;
        case '#anos':
          url = 'http://fipeapi.appspot.com/api/1/carros/veiculo/' + p[0] + '/' + p[1] + '.json';
          console.log(url, p);
          params.splice(-1,1);
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

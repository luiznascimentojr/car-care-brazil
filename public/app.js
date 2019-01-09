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
          $select.append($("<option>", { value: v.name, 'data-id': v.id, html: v.name }));
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
      params.push($(this).find(':selected').data('id')) ; 
      getOptions('#modelos', params)
    })

    $('#modelos').change(function() {
      params.push($(this).find(':selected').data('id'));
      clearInputs(['#anos']);
      getOptions('#anos', params)
    })

    $('#disponibilidade').change(function() {
      var disponilidade = '';
      {
        $('#disponibilidade :checked').each(function() {
          if(disponilidade.indexOf($(this).val()) === -1){
            disponilidade = disponilidade + $(this).val() + ' ';
          }
        });
      }
      $(this).val(disponilidade)
    });

    $('#periodo').change(function() {
      var periodo = '';
      {
        $('#periodo :checked').each(function() {
          if(periodo.indexOf($(this).val()) === -1){
            periodo = periodo + $(this).val() + ' ';
          }
        });
        $(this).val(periodo);
      }
    });

    $('#servico').change(function() {
      var servico = [];
      {
        $('#servico :checked').each(function() {
          if(servico.indexOf($(this).val()) === -1){
            servico.push($(this).val());
          }
        });
        $(this).val(servico);
      }
    });

    var getOptions = function(selector, p) {
      var url = '';
      var veiculo = '';

      switch(selector) {
        case '#marcas':
          url = 'http://fipeapi.appspot.com/api/1/carros/marcas.json';
          break;
        case '#modelos':
          url = 'http://fipeapi.appspot.com/api/1/carros/veiculos/' + p[0] + '.json';
          break;
        case '#anos':
          url = 'http://fipeapi.appspot.com/api/1/carros/veiculo/' + p[0] + '/' + p[1] + '.json';
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

    //phone mask
    $('.phone-mask')

	.keydown(function (e) {
		var key = e.which || e.charCode || e.keyCode || 0;
		$phone = $(this);

    // Don't let them remove the starting '('
    if ($phone.val().length === 1 && (key === 8 || key === 46)) {
			$phone.val('('); 
      return false;
		} 
    // Reset if they highlight and type over first char.
    else if ($phone.val().charAt(0) !== '(') {
			$phone.val('('+String.fromCharCode(e.keyCode)+''); 
		}

		// Auto-format- do not expose the mask as the user begins to type
		if (key !== 8 && key !== 9) {
			if ($phone.val().length === 3) {
				$phone.val($phone.val() + ')');
			}
			if ($phone.val().length === 4) {
				$phone.val($phone.val() + ' ');
			}			
			if ($phone.val().length === 10) {
				$phone.val($phone.val() + '-');
			}
		}

		// Allow numeric (and tab, backspace, delete) keys only
		return (key == 8 || 
				key == 9 ||
				key == 46 ||
				(key >= 48 && key <= 57) ||
				(key >= 96 && key <= 105));	
	})
	
  .bind('focus click', function () {
    $phone = $(this);
    
    if ($phone.val().length === 0) {
      $phone.val('(');
    }
    else {
      var val = $phone.val();
      $phone.val('').val(val); // Ensure cursor remains at the end
    }
  })
	
	.blur(function () {
		$phone = $(this);
		
		if ($phone.val() === '(') {
			$phone.val('');
		}
	});
});

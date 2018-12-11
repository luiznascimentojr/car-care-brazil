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
});

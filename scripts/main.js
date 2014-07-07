//Define Variables
var we_are_live = $("#wearelive-audio")[0];
var its_time = $("#itstime-audio")[0];
we_are_live.play();
$( "#intro1" ).fadeIn( 4000 );
$( "#intro1" ).fadeOut( 4000 );
$( "#intro-luigi" ).hide();
$( "#intro-luigi" ).delay( 8100 ).fadeIn( 3000 ).delay(3000).fadeOut( 2000 );
$( "#intro-mario" ).hide();
$( "#intro-mario" ).delay( 16000 ).fadeIn( 3000 ).delay(3000).fadeOut( 2000 );
$( '.sec2' ).hide();
$( '.sec2' ).delay( 25500 ).fadeIn( 3000 );
$('.top').hide();
$( '.top' ).delay( 25500 ).fadeIn( 3000 );
$( ".gmario" ).hide();
$( ".luigi-wins" ).hide();
var playerHealth = $('#playerHealth'),
    fightBTN = $('#fight'),
    damage;

var consoleLine = "<p class=\"console-line\"></p>";
 
console = {
    log: function (text) {
        $("#console-log").append($(consoleLine).html(text));
    }
};
// Setup Player Constructor
var Player = function (options) {
	var options = options || {};
	this.name = options.name;
	this.health = 100;
	this.elem = options.elem;
	this.meter = options.meter;
  this.attack = function (target) {
    attack_seq(this, target);
  };	
};

//Mario Instance created
var mario = new Player ({
  name: 'Mario',
  elem: $('.mario-health'),
  meter: $('#mario-meter')
	});

// Luigi Instance created
var luigi = new Player ({
  name: 'Luigi',
  elem: $('.luigi-health'),
  meter: $('#luigi-meter')
});	 

fightBTN.on('click', function () {
	its_time.play();
  var firstattack = _.random(1, 2);
  // console.log(firstattack);
    if (firstattack === 1) {
      mario.attack(luigi);
      // console.log('Mario Attacked first');
    } else {
      luigi.attack(mario);
      // console.log('Luigi Attacked first');
    }
  });


var attack_seq = function (attacker, attackee) {
  var random_attack = _.random(200);
  // console.log(random_attack);
   if (random_attack % 2 == 0) {
   	attacker = mario;
   	attackee = luigi;
   } else {
   	attacker = luigi;
   	attackee = mario;
   };
  
  var mariodead = $("#mario-dies-audio")[0];
  var gameover = $("#luigi-wins-audio")[0];

  // Generate a new damage value each time
  damage = _.random(5, 9);

  // Lower the attackee's health
  attackee.health -= damage;

  // console.log(attacker.name  + ' - ' + attacker.health);
  //Change the health meter based on the health number

  if ( attackee.health <= 99 ) {
  	$( attackee.meter ).text( "*********" );
  }; 
  if ( attackee.health <= 89 ) {
  	$( attackee.meter ).text( "********" );
  };	
  if ( attackee.health <= 79 ) {
  	$( attackee.meter ).text( "*******" );
  	$( attackee.elem ).css('color', '#FF7920');
  };
  if ( attackee.health <= 69 ) {
  	$( attackee.meter ).text( "******" );
  	$( attackee.elem ).css('color', '#FF7920');
  };  
  if (attackee.health <= 59)  {
  	$( attackee.meter ).text( "*****" );
  	$( attackee.elem ).css('color', '#ffdb20');
  };
  if (attackee.health <= 49)  {
  	$( attackee.meter ).text( "****" );
  	$( attackee.elem ).css('color', '#ffdb20');
  };
  if (attackee.health <= 39)  {
  	$( attackee.meter ).text( "***" );
  	$( attackee.elem ).css('color', '#ffdb20');
  };
  if (attackee.health <= 29)  {
  	$( attackee.meter ).text( "**" );
  	$( attackee.elem ).css('color', 'red');
  };
  if (attackee.health <= 19)  {
  	$( attackee.meter ).text( "**" );
  	$( attackee.elem ).css('color', 'red');
  }; 
  if (attackee.health <= 9)  {
  	$( attackee.meter ).text( "*" ),( attackee.elem ).css('color', 'red');
  };        
  // If Attackee is still alive, decrease health!
  if (attackee.health > 0) {

    // Update the individual attacked's health visually
    attackee.elem.find('input').val(attackee.health);
  
    // When we attack a monster, he fights back
      fightBTN.prop('disabled', true).text('Fighting...');
      _.delay(attack_seq, 1000, attackee, attacker);
      console.log(attacker.name  + ' is now attacking - ' + attackee.name);

  } else {

    if (attackee.name === 'Mario') {
      // You Loose!!
      $('.sec2').empty();
      $('.top').empty();
      $( ".luigi-wins" ).fadeIn( 2000 );
      gameover.play();
    } else {
      // You Win!!
      // $( ".gmario" ).fadeIn( "slow" );
      $('.sec2').empty();
      $('.top').empty();
      $( ".gmario" ).fadeIn( 2000 );
      gameover.play();
    }

  }
};
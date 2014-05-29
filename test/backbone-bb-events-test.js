var ryan = new Backbone.Model({ shirt: 'tee', pants: 'jeans', shoes: 'wingtip' });

var Paparazzi = Backbone.View.extend({

  model: ryan,

  bbEvents: {
    'change model'      : 'changingClothes',
    'change:shirt model': 'alertShirt',
    'change:shoes model': 'alertShoes'
  },

  changingClothes: function() {
    alert("He's changed clothes!!");
  },

  alertShirt: function() {
    if (this.model.get('shirt'))
      alert("Now, he's wearing a new " + this.model.get('shirt') + " shirt");
    else
      alert("He's now shirtless!");
  },

  alertShoes: function() {
    if (this.model.get('shoes'))
      alert("Now, he's sporting new " + this.model.get('shoes') + " kicks");
    else
      alert("He's walking barefoot!");
  }

});

var paparazzi = new Paparazzi();

ryan.set('shirt', 'button-up');
// Will call the "alertNewShirt" method alerting: Now, he's wearing a new button-up shirt;

ryan.unset('shoes');
// Will call the "alert"

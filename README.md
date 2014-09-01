Backbone Event Delegator (bbEvent Hash)
==============================================================================
A way to organize your Backbone Events in a Router, Model, or View in an Event Delegator hash

This is just a way to pretty your code by creating an event delegator based on Backbone Events. Basically, it replaces having to call out "listenTo" commands, but places them in a neat delegator. For example:
```js
this.listenTo( this.rackView,  'reSorted', this.updateOrder );
this.listenTo( this.shoeModel, 'change',   this.renderShoes );

TO

bbEvents: {
  'reSorted  rackView' : 'updateOrder',
  'change    shoeModel': 'renderShoes'
}
```

Best way to understand this is to see a working example:

```js
var ryan = new Backbone.Model({ shirt: 'tee', pants: 'jeans', shoes: 'wingtip' });

var Paparazzi = Backbone.View.extend({

  model: ryan,

  bbEvents: {
    'change       model': 'changedClothes',
    'change:shirt model': 'alertShirt',
    'change:shoes model': 'alertShoes'
  },

  changedClothes: function() {
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
// Will call the "alertShirt" method alerting: Now, he's wearing a new button-up shirt
// It'll also call "changedClothes" alerting: He's changed clothes!!

ryan.unset('shoes');
// Will call the "alertShoes" method alerting: "He's walking barefoot!"
// It'll also call "changedClothes" alerting: He's changed clothes!!

```

## How to use
Add a object literal "bbEvents", and write it the same format as the event delegates for DOM events: 
```
[action] [instantiated Backbone class] : [method]
```
One caviat is unlike the Views event delegator, the Backbone class whould already be instantiated and ready right at "initialize".  In the case above, the "model" is brought in by plopping it in the definition.  Another way of doing it is to instantiate it in the "initialize" constructor.

```js
  initialize: function() {
    this.phoneCall = new PhoneCall();
  },

  bbEvents: {
    'hangup phoneCall' : 'disconnect',
    'ring   phoneCall' : 'pickUp'
  }
```

or like this

```js
  phoneCall: new PhoneCall(),

  bbEvents: {
    'hangup phoneCall' : 'disconnect',
    'ring   phoneCall' : 'pickUp'
  }
```

## Listen "once"
To use "listenToOnce", you just need to add it's pseudo-flag `:once` appended on to it like so:
```js
     'ring:once phoneCall' : 'lightUp'
```

### Versions

#### v0.1.1
 - Added standard UMD wrapper

#### v0.1
 - First commit! 

!function(_, Backbone){
  'use strict'

  // Cached regex to split keys for delegate.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of Backbone classes
  var backboneClasses = ['Controller','Router','Model','Collection','View'];

  // Loop through the classes
  _.each( backboneClasses, function( backboneClass ) {

    // Cache to BackboneClass
    var BackboneClass = Backbone[ backboneClass ];

    // If Backbone class doesn't exist, get out.
    if ( !BackboneClass ) return;

    // Create a new proto class with new applied Construtor
    var NewBackboneClass = function( options ){

      // Bind the BB Events
      this.delegateBBEvents( options && options.bbEvents );

      // Call the old constructor
      return BackboneClass.prototype.constructor.call( this, options );
    };

    // New BBEvent Methods
    _.extend( NewBackboneClass.prototype, BackboneClass.prototype, {

      // BBEvent Delegate Method (based on Backbone.View's delegateEvents)
      delegateBBEvents: function( events ) {
        if (!(events || (events = _.result(this, 'bbEvents')))) return this;
        this.undelegateBBEvents();
        for (var key in events) {
          var method = events[key];
          if (!_.isFunction(method)) method = this[events[key]];
          if (!method) continue;

          var match = key.match(delegateEventSplitter);
          
          var eventName = match[1], 
              context = match[2];

          method = _.bind(method, this);

          var listenMethod = eventName.indexOf(':once') >= 0 ? 'listenToOnce' : 'listenTo';
          eventName = eventName.replace(':once', '');

          if (context === '') {
            this[listenMethod]( this, eventName, method );
          } else {
            this[listenMethod]( this[context], eventName, method );
          }

        }
        return this;
      },

      // BBEvent Undelegate Method (based on Backbone.View's undelegateEvents)
      undelegateBBEvents: function() {
        this.stopListening();
        return this;
      }

    });

    // Carry over old extend
    NewBackboneClass.extend = BackboneClass.extend;

    // Throw it back to the original method;
    Backbone[ backboneClass ] = NewBackboneClass;

  });

  return Backbone;

}(_, Backbone);
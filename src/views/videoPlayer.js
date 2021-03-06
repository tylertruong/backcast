var VideoPlayerView = Backbone.View.extend({

  initialize: function() {
    //for mocha tests
    this.collection.on('sync', this.render, this);
   
    this.collection.on('select', this.render, this);
    this.collection.on('reset', () => { this.render(); }, this);
    
  },

  render: function(event) {
    this.model = event || this.collection.models[0];
    if (!this.model) {
      this.$el.html(this.template());
    } else {
      this.$el.html(this.template(this.model.attributes));

       //for mocha tests
      this.model.select.call(this);
    }
    return this;
  },

  events: {
    'click .autoplaybtn': 'handleClick',
  },
  
  
  handleClick: function () {
    var autoplay = this.$('#autoplay').text();
    if (autoplay === 'ON') {
      this.model.set('autoplay', 0);
      this.$('#autoplay').text('OFF');
    } else {
      this.model.set('autoplay', 1);
      this.$('#autoplay').text('ON');
    }
  },

  template: templateURL('src/templates/videoPlayer.html')

});

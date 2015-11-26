var ViewModel = function(first, last) {

  this.firstname = ko.observable(first);
  this.lastname = ko.observable(last);

  this.fullname = ko.computed(function(){
    return this.firstname() + " " + this.lastname();
  },this);
};
ko.applyBindings(new ViewModel("osaka", "taro"));

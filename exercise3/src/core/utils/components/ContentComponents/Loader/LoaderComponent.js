import React, { Component } from 'react';

export default class LoaderComponent extends Component {
  componentDidMount() {

    // VARIABLES
    var $element = $('.content-loader');
    var $parent = $element.parent();
    var minHeight = 200;

    // FUNCTIONS
    var onChange = function() {
      var parentHeight = $parent.height();
      var parentOffset = $parent.offset().top;
      var windowHeight = $(window).height();
      var windowOffset = $(window).scrollTop();
      if(parentHeight > (windowHeight - parentOffset)) {
        var height, offset, top;
        if(windowOffset > parentOffset) {
          var calculation = -(parentOffset + parentHeight - windowOffset - windowHeight);
          height = calculation > 0 ? windowHeight - calculation : windowHeight;
          offset = calculation > 0 && (windowHeight - calculation) < minHeight ? parentHeight - minHeight : windowOffset-parentOffset;
        } else if((parentOffset - windowOffset + parentHeight) < windowHeight) {
          $element.css({height:'100%'});
        } else {
          height = windowHeight - parentOffset + windowOffset;
          offset = windowOffset-parentOffset;
        }
        top = offset>0 ? offset : 0;
        if(height<minHeight) height = minHeight;
        $element.css({height: height, top: top})
      } else {
        $element.css({height:'100%'});
      }
    };

    // ACTIONS
    $parent.css({minHeight: minHeight, position: 'relative'}).addClass('position-relative'); // adds the element's container position:relative css class
    onChange();
    $(window).scroll(onChange);
    $(window).resize(onChange);

  }

  render() {
    return (
      <div className="content-loader"><i className="fa fa-spin fa-refresh" /></div>
    );
  }

}

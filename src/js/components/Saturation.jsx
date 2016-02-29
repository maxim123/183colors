import React from 'react';
import ReactCSS from 'reactcss';
import throttle from 'lodash.throttle';

export default class Saturation extends ReactCSS.Component {

  constructor(props) {
    super();

    this.throttle = throttle(function(fn, data) {
      fn(data);
  }, 50);

    this.handleChange = this.handleChange.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  classes() {
    return {
      'default': {
        color: {
          Absolute: '0 0 0 0',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: 'absolute',
          background: 'hsl(' + this.props.hsl.h + ',100%, 50%)',
          borderRadius: this.props.radius,
        },
        white: {
          Absolute: '0 0 0 0',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: 'absolute',
          background: 'linear-gradient(to right, #fff, rgba(255,255,255,0))',
        },
        black: {
          Absolute: '0 0 0 0',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            position: 'absolute',
          background: 'linear-gradient(to top, #000, rgba(0,0,0,0))',
          boxShadow: this.props.shadow,
        },
        pointer: {
          position: 'absolute',
          top: -(this.props.hsv.v * 100) + 100 + '%',
          left: this.props.hsv.s * 100 + '%',
          cursor: 'default',
        },
        circle: {
          width: '8px',
          height: '8px',
          boxShadow: '0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3), 0 0 1px 2px rgba(0,0,0,.4)',
          borderRadius: '50%',
          cursor: 'pointer',
          transform: 'translate(-2px, -2px)',
        },
      },
  };
  }

  componentWillUnmount() {
    this.unbindEventListeners();
  }

  handleChange(e, skip) {
    !skip && e.preventDefault();
    var container = this.refs.container;
    var containerWidth = container.clientWidth;
    var containerHeight = container.clientHeight;
    var left = (e.pageX || e.touches[0].pageX) - (container.getBoundingClientRect().left + window.pageXOffset);
    var top = (e.pageY || e.touches[0].pageY) - (container.getBoundingClientRect().top + window.pageYOffset);

    if (left < 0) {
      left = 0;
    } else if (left > containerWidth) {
      left = containerWidth;
    } else if (top < 0) {
      top = 0;
    } else if (top > containerHeight) {
      top = containerHeight;
    }

    var saturation = left * 100 / containerWidth;
    var bright = -(top * 100 / containerHeight) + 100;

    this.throttle(this.props.onChange, {
      h: this.props.hsl.h,
      s: saturation,
      v: bright,
      a: this.props.hsl.a,
      source: 'rgb',
  });
  }

  handleMouseDown(e) {
    this.handleChange(e, true);
    window.addEventListener('mousemove', this.handleChange);
    window.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseUp() {
    this.unbindEventListeners();
  }

  unbindEventListeners() {
    window.removeEventListener('mousemove', this.handleChange);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    var pointer = <div is="circle" style={this.classes().default.circle} />;

    if (this.props.pointer) {
      pointer = <this.props.pointer {...this.props} />;
    }

    return (
      <div is="color" style={this.classes().default.color} ref="container" onMouseDown={ this.handleMouseDown }
          onTouchMove={ this.handleChange }
          onTouchStart={ this.handleChange }>
        <div is="white" style={this.classes().default.white}>
          <div is="black" style={this.classes().default.black} />
          <div is="pointer" style={this.classes().default.pointer} ref="pointer">
            { pointer }
          </div>
        </div>
      </div>
  );
  }
}

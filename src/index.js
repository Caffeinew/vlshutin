import "./style/index.scss"
import "locomotive-scroll/src/locomotive-scroll.scss"
import LocomotiveScroll from 'locomotive-scroll';
import "./three"

new LocomotiveScroll({
    el: container,
    smooth: true,
    lerp: 0.05,
});


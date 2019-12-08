import './SwipeableListItem.css'
import React from 'react'

class SwipeableListItem extends React.Component {
    constructor(props) {
        super(props);
        // Drag & Drop
        dragStartX = 0
        left = 0
        dragged = false

        this.listElement = null;
        this.wrapper = null;
        this.background = null;

        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onDragStartMouse = this.onDragStartMouse.bind(this);
        this.onDragStartTouch = this.onDragStartTouch.bind(this);
        this.onDragEndMouse = this.onDragEndMouse.bind(this);
        this.onDragEndTouch = this.onDragEndTouch.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
        this.onSwiped= this.onSwiped.bind(this);
    }
    onDragStartMouse(evt) {
        this.onDragStart(evt.clientX);
        window.addEventListener("mousemove", this.onMouseMove);
    }

    onDragStartTouch(evt) {
        const touch = evt.targetTouches[0];
        this.onDragStart(touch.clientX);
        window.addEventListener("touchmove", this.onTouchMove);
    }

    onDragStart(clientX) {
        this.dragged = true;
        this.dragStartX = clientX;
        requestAnimationFrame(this.updatePosition);
    }
    // DOM Refs
    listElement
    wrapper
    background

    render() {
        return (
            <>
                <div className="Wrapper" ref={div => (this.wrapper = div)}>
                    <div ref={div => (this.background = div)} className="Background">
                        <span>Delete</span>
                    </div>
                    <div ref={div => (this.listElement = div)} className="ListItem">
                        {this.props.children}
                    </div>
                </div>
            </>
        )
    }
}

export default SwipeableListItem

import React, { Component } from 'react'
import './SwipeableList.css'

class SwipeableList extends Component {
    render() {
        const { children } = this.props
        return <div className="List">{children}</div>
    }
}

export default SwipeableList

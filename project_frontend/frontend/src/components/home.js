import React, { Component } from 'react';

class home extends Component {
    render() {
        return (
            <div>
                <img className='backgroundimg' src="/background2.jpg" alt="Paris" width="100%" height="100%"></img>
                <div className='container' id='box-info'>
                    <h1 id='welcome'>WELCOME TO PlanGpt</h1>
                    <h1 id='welcome2'> Here we make your plans easy and guide you.</h1>
                    <button type="button" class="btn btn-outline-success btn-lg">PLAN_NOW</button>
                </div>
            </div>
        );
    }
}

export default home;
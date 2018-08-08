import * as React from 'react';
import TopMenu from './TopMenu'
import { Button } from 'antd';

import '../assets/scss/component/TopModel.scss'

export default class TopModel extends React.Component {
    state = {
        message: '父组件传递给子组件的信息',
        showMenu: true
    };

    constructor(props: any) {
        super(props);
        this.triggerMenu=this.triggerMenu.bind(this);
    }

    changeMassage(newMassage:string){
        console.log(newMassage);
        let newState={...this.state};
        newState.message=newMassage;
        this.setState(newState);
    }

    triggerMenu(key:string,e:any){
        const state=key;
        let newState={...this.state};
        state == `hide` ? newState.showMenu=false : newState.showMenu=true;
        this.setState(newState);
    }

    render() {
        const buttonObj = this.state.showMenu ? <Button onClick={this.triggerMenu.bind(this,'hide')}>隐藏导航栏</Button> : <Button onClick={this.triggerMenu.bind(this,'show')} type="dashed">显示导航栏</Button>
        return (
            <header>
                <TopMenu {...{ message: this.state['message'],showMenu: this.state['showMenu'],changeMassage:(newMassage:string)=>this.changeMassage(newMassage)}} />
                <br/>
                {buttonObj}
                <br/>
                {this.state.message}
            </header>
        )
    }
}



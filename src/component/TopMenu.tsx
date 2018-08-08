import { Menu, Icon, Button } from 'antd';
import * as React from 'react';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class App extends React.Component {
    state = {
        current: 'app',
        message: this.props['message']
    }

    constructor(props: any) {
        super(props);
        console.log(this.props);
        this.changeMessageAndReturn = this.changeMessageAndReturn.bind(this);
    }

    handleClick = (e: any) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    changeMessageAndReturn() {
        this.props['changeMassage']('我修改了父组件传来的信息，并回传给父组件');
    }

    render() {
        let show = this.props['showMenu'];
        const showInfo = show ? <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            >
            <Menu.Item key="mail">
                <Icon type="mail" />Navigation One
            </Menu.Item>
            <Menu.Item key="app">
                <Icon type="appstore" />Navigation Two
            </Menu.Item>
            <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
                <MenuItemGroup title="Item 1">
                    <Menu.Item key="setting:1">Option 1</Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup title="Item 2">
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </MenuItemGroup>
            </SubMenu>
            <Menu.Item key="alipay">
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
            </Menu.Item>
        </Menu> : <span>已被隐藏</span>
        return (
            <div>
                {showInfo}
                <br />
                <Button onClick={this.changeMessageAndReturn} type="dashed">修改信息</Button>
            </div>
        );
    }
}
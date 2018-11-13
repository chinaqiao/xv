import Taro, { Component, Config } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import "./index.scss";
import HPage from "./index.services";

export default class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: "首页"
  };
  hpage: HPage;
  interval: number;
  setTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const sec = date.getSeconds();
    this.setState({
      year,
      month,
      day,
      hour,
      minute,
      sec
    });
  };

  componentWillMount() {
    this.setTime();
    this.hpage = new HPage();
    this.hpage.init().then(resp => {
      this.setState({
        thumbs: resp.thumbs
      });
    });
  }

  componentDidMount() {
    this.interval = setInterval(this.setTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidShow() {}

  componentDidHide() {}

  getThumbs() {
    if (this.state.thumbs) {
      const listItems = [];
      this.state.thumbs.map(item => {
        listItems.push(<Text>{item.title}</Text>);
      });
      return <View>{listItems}</View>;
    }
  }

  render() {
    const { year, month, day, hour, minute, sec } = this.state;
    // const numbers = [1, 2, 3, 4, 5];
    const listItems = this.getThumbs();
    return (
      <View className="index">
        <Text>
          The time is {year}-{month}-{day} {hour}:{minute}:{sec}
        </Text>
        {listItems}
      </View>
    );
  }
}

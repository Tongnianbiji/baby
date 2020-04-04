import BaseComponent from '../../../common/baseComponent'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      sliderStyle: {},
      activeTab: 1
    }
  }

  componentWillMount() {
    this.setNavBarTitle('济阳三村幼儿园')
  }

  tabChange(index) {
    this.setState({
      activeTab: index,
      sliderStyle: {
        transform: `translateX(${100 * (index - 1)}%)`
      }
    })
  }
}
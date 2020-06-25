import BaseComponent from '../../../common/baseComponent'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      listType: 0,
      dataList: [1, 2, 3, 4],
      showOpPanel: false
    }
  }

  componentDidMount() {
    this.setNavBarTitle('市光三村幼儿园')
    this.showLoading()

    // load data
    setTimeout(() => {
      this.hideLoading()
      this.setState({
        loading: false
      })
    }, 1000)
  }

  typeChange = (index, data) => {
    this.setState({ listType: index })
  }

  troggleOpPanel = () => {
    this.setState(prevState => ({
      showOpPanel: !prevState.showOpPanel
    }))
  }
}
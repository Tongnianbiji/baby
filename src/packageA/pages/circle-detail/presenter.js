import BaseComponent from '../../../common/baseComponent'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
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
}
import BaseComponent from '../../../common/baseComponent'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.setNavBarTitle('市光三村幼儿园')
  }
}
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
  }
  componentDidMount() {
    
    this.initData();
  }
  async initData() {
    this.setState({
      content: this.$router.params.content || '',
    })
  }
}
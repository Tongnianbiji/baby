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
    const res = await Model.getData(this.$router.params.mid || 0)
    this.setState({
      content: res[0].content,
    })
  }
}
import BaseComponent from '../../../common/baseComponent'
import Model from './model'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    Model.getData()
  }
}
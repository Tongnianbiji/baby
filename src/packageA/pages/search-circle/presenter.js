import BaseComponent from '../../../common/baseComponent'

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      showCleanBtn: false,
      kw: ''
    }
  }

  onKwInput = e => {
    this.setState(prev => {
      const ret = {
        kw: e.target.value
      }
      if (prev.showCleanBtn !== !!e.target.value) {
        ret.showCleanBtn = !prev.showCleanBtn
      }
      return ret
    })
  }

  cleanKw = () => {
    this.setState({
      kw: '',
      showCleanBtn: false
    })
  }
}
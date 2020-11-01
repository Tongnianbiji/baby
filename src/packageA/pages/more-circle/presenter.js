import BaseComponent from '../../../common/baseComponent'
import Model from './model';

export default class Presenter extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      sliderStyle: {},
      activeTab: 1,
      childrenCircles:[]
    }
  }

  componentWillMount() {
    const {cname} = this.$router.params;
    this.setNavBarTitle(cname);
    this.getData()
  }

  tabChange(index) {
    this.setState({
      activeTab: index,
      sliderStyle: {
        transform: `translateX(${100 * (index - 1)}%)`
      }
    })
  }

  getData = async()=>{
    const {cid} = this.$router.params;
    let res = await Model.getData(cid);
    if(res && res.items){
      this.setState({
        childrenCircles:res.items
      })
    }
  }

  handleSubsrc = ()=>{
    
  }
}
import staticDataStore from '@src/store/common/static-data'

export default ()=>{
    const {updateReLoadCirclePage} = staticDataStore;
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2]
    if(prevPage.route === 'packageA/pages/circle-detail/index'){
      updateReLoadCirclePage(false)
    }else{
      updateReLoadCirclePage(true)
    }
}
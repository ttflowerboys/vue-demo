import * as asideList from './data/asideList'

const setpromise = data => {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}

export const asideListData = () => setpromise(asideList.aside);


import fetch from 'isomorphic-unfetch'
import keyBy from 'lodash/keyBy'
import get from 'lodash/get'

import { resourceFetchSuccess } from '../components/redux'

export const apiUrl = 'https://api.eventjuicer.com/v1/public/hosts/targiehandlu.pl/'

export const fetcher = async (endpoints, store = null) => {

  const results = await Promise.all(
    Object.keys(endpoints).map(endpoint => fetch(`${apiUrl}${endpoint}`).
    then(response => response.json()).
    then(data => ( {endpoint, data, keyBy : endpoints[endpoint]} ) )
  ))

  if(store){
    results.forEach(obj => store.dispatch(
      resourceFetchSuccess( obj.endpoint, obj.data.data) )
    )
  }

  const keyed = keyBy(results, "endpoint")

  return {

    get : function(item){ return item in keyed ? keyed[item].data : null },
    getData : function(item){ return item in keyed ? get(keyed[item], "data.data") : null },
    getMeta : function(item){ return item in keyed ? get(keyed[item], "data.meta") : null }

  }

}
import { createSelector } from 'reselect';

import keyBy from 'lodash/keyBy'
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';

import { processArrayData, chunkArrayData, getGalleryImageSize } from '../helpers';

const defaultFilters = {
  random : false,
  limit : false,
  filter : null,
  mobile : 4,
  columns : false
}

export const getCart = state => state.app.cart;
export const getResources = state => state.resources;
export const getFaqs = state => state.visuals.faqs;

export const getBoothsSelected = state => state.boothsSelected

/*
RESOURCES
*/
export const getTickets = state => state.resources.tickets
export const getFormdata = state => state.resources.formdata
export const getTicketGroups = state => state.resources.ticketgroups
export const getBookingmap = state => state.resources.bookingmap
export const getPhotos = state => state.resources.photos
export const getExhibitors = (state, props) => state.resources.exhibitors

/*
RESOURCES
*/


export const getExhibitorsProps = (state, props) => ({...defaultFilters, ...props})

export const getViewPortWidth = (state) => state.app.width || "xs"



export const ExhibitorKeywordsSelector = createSelector(
  getExhibitors,
  exhibitors => {
    const allUsedKeywords = [].concat.apply([], exhibitors.map(e => "keywords" in e.profile && Array.isArray(e.profile.keywords) ? e.profile.keywords : []))
    const uniqueKeywords = [...new Set(allUsedKeywords )];
    return uniqueKeywords
  }
)

export const TicketsSelector = createSelector(
  getTickets,
  tickets => tickets
)

export const SortedTicketsSelector = createSelector(
  getTickets,
  tickets => sortBy(tickets, ['start'])
)

export const getRecord = (state, props) => {
  const key = `${props.endpoint}/${props.id}`
  return key in state.resources ? state.resources[key] : []
}



export const SingleRecordSelector = createSelector(
  getRecord,
  data => data
)

export const FilteredExhibitors = createSelector(
  getExhibitors,
  getExhibitorsProps,
  (exhibitors, props) => processArrayData(exhibitors, props)
)

export const MobileAwarePhotosSelector = createSelector(
  getPhotos,
  getExhibitorsProps,
  (photos, props) => processArrayData( photos, props )
)

export const PhotoSizeSelector = createSelector(
  getViewPortWidth,
  width => getGalleryImageSize(width)
)

export const MobileAwareFilteredExhibitors = createSelector(
  FilteredExhibitors,
  getViewPortWidth,
  getExhibitorsProps,
  (exhibitors, width, props) => {

    if(props.columns){
      exhibitors = chunkArrayData(exhibitors, width)

    //  console.log(exhibitors)
    }

    if ((width === 'xs' || width === 'sm') && "mobile" in props && props.mobile && exhibitors.length > props.mobile) {
     exhibitors = exhibitors.slice(0, props.mobile);
   }
   return exhibitors
  }
)

export const KeyedFormdataSelector = createSelector(
  getFormdata,
  (formdata) => keyBy(formdata, "id")
)

export const KeyedTicketGroupsSelector = createSelector(
  getTicketGroups,
  (ticketgroups) => keyBy(ticketgroups, "id")
)

export const getTicketGroup = createSelector(
  KeyedTicketGroupsSelector,
  (state, props) => props.groupId,
  (groups, groupId) => groups[groupId]
)

export const getNonPastTickets = createSelector(
  getTicketGroup,
  (ticketgroup) => ticketgroup.tickets.filter(t => t.errors.indexOf("overdue") === -1)
)

export const getTicketsSortedByStart = createSelector(
  getNonPastTickets,
  (tickets) => sortBy(tickets, ['start'])
)


export const BookingMapResourcesSelector = createSelector(
  KeyedFormdataSelector,
  KeyedTicketGroupsSelector,
  getBookingmap,
  (formdata, ticketgroups, bookingmap) => ({formdata, ticketgroups, bookingmap})
)

export const BookingMapSelector = createSelector(
  BookingMapResourcesSelector,
  getBoothsSelected,
  (resources, boothsSelected) => ({...resources, boothsSelected})
)

export const FilteredByKeywordExhibitors = createSelector(
  FilteredExhibitors,
  getExhibitorsProps,
  (exhibitors, props) => exhibitors.filter(e => "keywords" in e.profile && e.profile.keywords.includes(props.keyword))

  //
  //
  //
  // let boothIds = []
  //
  // data.forEach(exhibitor => {
  //
  //   const formdata = exhibitor.instances.filter(purchase => purchase.formdata && "id" in purchase.formdata).map(purchase => purchase.formdata.id)
  //
  //   if(formdata.length){
  //     boothIds = boothIds.concat(formdata)
  //   }
  //
  // })

)

import React from 'react'
import {
  connect,
  WidgetVisitor,
  WidgetVotable,
  WidgetVoteStatus,
  WidgetRoleButtons,
  reduxWrapper,
  configure,
  HeadVote,
  WidgetRegForm,
  WidgetSalesMap
} from 'eventjuicer-site-components';
import dynamic from 'next/dynamic'
import Head from 'next/head'
import VotingCategories from '../../components/VotingCategories'

const settings = require('../../settings').default;

const DynamicWidgetVoteWithLinkedIn = dynamic(
  () => import('../../proxy/WidgetVoteWithLinkedIn'),
  { ssr: false }
)


const onVoted = (canVote) => (<>
  {/* <WidgetVoteStatus max_votes={30} /> */}
  {canVote ? 
    <div><VotingCategories label={null} secondaryLabel={null} /><WidgetRegForm setting="visitor.register" wrapperProps={{secondaryLabel: "visitors.register_question"}} /></div>: 
    <WidgetRegForm setting="visitor.register" wrapperProps={{secondaryLabel: "visitors.register"}} />
  }</>)

const PageVote  = ({id}) => (

  
  <div>

  <HeadVote id={id} template="template_teh27_callforpapers_pl">{(data) => <Head>{data}</Head>}</HeadVote> 
   
  <WidgetVotable
      id={id}
      asPath={`/vote/${id}`}
      // vote={<DynamicWidgetVoteWithLinkedIn id={id} max_votes={55} onVoted={onVoted} />}
      vote={null} 
      status={false}
      show_votes={true}
    />

 {/* <WidgetSalesMap wrapperProps={{label: "exhibitors.map.title_alt"}} /> */}


  <VotingCategories />

 
<WidgetVisitor setting="visitor.register" />

 {/* <WidgetVips limit={12} mobile={4} /> */}

  {/* {id && (
    <WidgetSalesMap
      label="exhibitors.map.title2"
      secondaryLabel="exhibitors.map.opensales"
      disabled={false}
    />
  )} */}

  <WidgetRoleButtons />
 
  </div>
  
) 

export const getStaticPaths = () => {

  return {paths: [

  ], fallback: "blocking"}

}
 

export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {

  const {params: {id}} = props;

  await configure(props, {
    settings : settings,
    preload : ["callforpapers"]
  })

  return {
    props : {
      id : id
    },
    revalidate: 300
  }

})



export default connect()(PageVote);

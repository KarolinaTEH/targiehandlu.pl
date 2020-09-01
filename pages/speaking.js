import {
  connect,
  Wrapper,
  WidgetVideoWithEventInfo,
  WidgetSpeaking,
  WidgetRoleButtons,
  Markdown,
  WidgetPresentersAll,
  WidgetSpeakerBenefits,
  WidgetFaq,
  WidgetJurors,
  reduxWrapper,
  configure,
  WidgetPhotostream,
  WidgetVerticalTimeline,
  TwoColsLayout as Section,
  MyTypography
} from 'eventjuicer-site-components';

import NoteAdd from '@material-ui/icons/NoteAdd'
import Settings from '@material-ui/icons/Settings'
import Public from '@material-ui/icons/Public'
import Mic from '@material-ui/icons/Mic'
import Assessment from '@material-ui/icons/Assessment'



import settings from '../settings';


const PageSpeaking = () => (

  <div>
       <Wrapper first label="cfp.hello.title">
       
       <Section 
        
        left={  <div style={{marginTop: '5rem'}}>

          <MyTypography template="h4" label="cfp.hello.submit" />
         
          <MyTypography template="subtitle1" label="cfp.hello.needs" />
  
          <Markdown label="cfp.hello.details" />
  
  
          </div> }
        right={ 
          <WidgetVerticalTimeline 
          setting="cfptimeline" 
          icons={{
            NoteAdd: <NoteAdd />,
            Settings: <Settings />,
            Public: <Public />,
            Mic: <Mic />,
            Assessment: <Assessment />
          }} />
        }

      leftCentered={true}

      />


      </Wrapper>


  <WidgetPhotostream setting="cfpphotostream" />

  <WidgetSpeaking
        categories={[
          'conversion',
          'marketing',
          'logistics',
          'payments',
          'it',
          'trends',
        ]}

      right={
        <>
        <MyTypography template="subtitle1" label="presenters.competition.rules.title" /> 
        <Markdown label="presenters.competition.rules.content" />
        </>
      }

      summary={<div>asd</div>}

      />


   

        {/* <div>

        Why speak at the E-commerce Berlin Expo?
Over 7,000 e-commerce professionals
90% average session capacity
3,000+ CEOs, Directors & Heads of Departments
Relevant visitors, 65% of whom come from retailers & brands


        </div> */}

        {/*

Website Conversion Rate
Marketing in E-commerce
eLogistics / International Expansion
ePayments
IT for E-commerce
New Developments in E-commerce

 */}

      
        
  
        <WidgetJurors minToShow={4} />

        <WidgetFaq 
            items={[
            {
              label: 'exhibitor-status',
              important: true,
              buttons: [],
            },
            {
          //    baseLabel: 'exhibitors.faq.before_event',
              label: 'fee',
            },
            { label: 'submission-limits' },
            { label: 'co-presenter' },
            { label: 'ranking' },
            { label: 'fair-play' },
            {
            //  baseLabel: 'cfp.faq.before_event',
              label: 'stage',
            },
    ]} />


      
        <WidgetSpeakerBenefits label="presenters.steps.title" />

        <WidgetPresentersAll 
          filter={(item)=> parseInt(item.featured_cfp) } limit="24" 
          label="cfp.featured_presenters"
        />



        <WidgetVideoWithEventInfo
          //  background="https://res.cloudinary.com/eventjuicer/image/upload/v1552428524/teh_presenters_video.png"
          //  showEventDetails={false}
          //  videoSrc="https://res.cloudinary.com/eventjuicer/video/upload/v1552428525/teh_presenters_video.mp4"
          title="presenters.claim.title"
          subtitle="presenters.claim.description"
        />

        <WidgetRoleButtons first={false} />

  </div>
)





export const getStaticProps = reduxWrapper.getStaticProps(async ({ store }) => {

  await configure(store, {
    settings : settings,
    preload : ["exhibitors"]
  })

  return {
    props: {},
    revalidate: 1
  }

})

export default connect()(PageSpeaking);

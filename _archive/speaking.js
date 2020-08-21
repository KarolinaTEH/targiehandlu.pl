import { MyHead as Head } from '../next';
import { connect } from 'react-redux';

import {
  Gallery,
  Wrapper,
  Markdown
} from '../components';

import {
  VideoWithEventInfo,
  Speaking,
  SpeakerBenefits,
  SalesMap
} from '../compositions';

import Layout from '../layouts/main';

import {Photos} from '../datasources';

class PageSpeaking extends React.Component {

  static async getInitialProps({

    query,
    asPath,
    isServer,
    store
  }) {

    return {
  //    preload : ["exhibitors", "presenters"]
    };
  }

  render() {

    const { url } = this.props;

    return (
      
    <Layout>

      <Head />

      <Speaking first />

      <Wrapper  label="presenters.competition.title">
        <img src="https://res.cloudinary.com/eventjuicer/image/upload/c_fit,w_1600,f_auto/v1583705310/cfp_TEH18_2tura_extended.jpg" style={{width: '100%', maxWidth : 1600}} />
      </Wrapper>

      <Wrapper  label="presenters.competition.rules.title">
       <Markdown label="presenters.competition.rules.content" />
      </Wrapper>

      {/* <SalesMap
      label="exhibitors.map.title3"
      secondaryLabel="exhibitors.map.opensales"
      disabled={false}
      /> */}

      <SpeakerBenefits 
        label="presenters.steps.title" 
      />

      <VideoWithEventInfo 
        //background="https://res.cloudinary.com/eventjuicer/image/upload/v1552428524/teh_presenters_video.png" 
        //showEventDetails={false}
        //videoSrc="https://res.cloudinary.com/eventjuicer/video/upload/v1552428525/teh_presenters_video.mp4" 
        title="presenters.claim.title"
        subtitle="presenters.claim.description"
      />

      <Photos>{
        (photos, size) => <Gallery data={photos} size={size} label="event.gallery" />
      }</Photos>

    </Layout>
    );
  }
}

export default connect()(PageSpeaking);
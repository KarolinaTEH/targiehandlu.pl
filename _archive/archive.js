 
import { connect } from 'react-redux';
import Layout from '../layouts/main';

import Table from '../components/MyTable';

import {
  Wrapper,
  Avatarlist,
  Typography,
  Gallery,
  WidthAwareInfo,
  People
} from '../components';

import { MyHead as Head, MyLink as Link } from '../next';

import {Visitor} from '../compositions'

 
class PageArchive extends React.Component {
  static async getInitialProps({
   
    
    query,
    asPath,
    isServer,
    store
  }) {

    const presenters = `presenters?event_id=${query.id}`;
    
    return {
      preload : ["events", presenters],
      eventId: query.id,
    };
  }

  render() {
    const { events, eventId, presenters } = this.props;

    return (
      <Layout>
        <Head />

        {eventId && (
          <Wrapper
            first
            label="presenters.archive"
            secondaryTitle=""
            // links={[
            //   <Link href="/agenda" label="presenters.list_full" variant="flat" color="secondary" />
            // ]}
          >
            <People
              link={false}
              random={false}
              eventId={eventId}
              filter={n => n.presentation_time}
            />
          </Wrapper>
        )}

        <Wrapper first label="archive.events" secondaryTitle="">
          <Table
            data={events}
            cols={{
              name: {},
              loc: {},
              starts: { transform: v => v },
              show: { button: true, label: 'common.details' }
            }}
          />
        </Wrapper>

        <Gallery label="event.gallery" />
      </Layout>
    );
  }
}

export default connect()(PageArchive);

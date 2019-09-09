import dynamic from 'next/dynamic';
import { MyHead as Head, MyLink as Link } from '../next';

import { connect } from 'react-redux';

import Layout from '../layouts/main';

import {
  Wrapper,
  Avatarlist,
  ColumnList,
  Bookingmap,
  Typography,
  Gallery,
  resourceFetchSuccess,
  KeywordSelect,
  CompanyLocationMap,
  Centered
} from '../components';

import {Visitor, SalesMap} from '../compositions'

//const Gallery = dynamic(import('../components/GalleryQuoted'))

import {Exhibitors} from '../datasources'

class PageExhibitorsByKeyword extends React.Component {

  static async getInitialProps({query}) {

    return {

      preload: ["exhibitors", "bookingmap"],
      keyword : query.keyword

    };

  }

  render() {

    const { exhibitors, bookingmap, keyword } = this.props;

    return (
      <Layout>
        <Head />


        <Wrapper label="exhibitors.list_by_keyword" first>

          <Exhibitors keyword={keyword} sort={['profile.name']}>
            {
              (all, keywords, filtered) =>

              <React.Fragment>

              <Centered>
                <KeywordSelect keywords={keywords} selected={keyword} />
              </Centered>

              <Avatarlist data={filtered} limit="200" mobile={false} />

              <CompanyLocationMap data={filtered}>{
                (selected) =>  <div style={{marginTop: 30}}><Bookingmap selected={selected} /></div>
              }</CompanyLocationMap>

              </React.Fragment>

            }
          </Exhibitors>

        </Wrapper>


          <Visitor 
          label="visitors.register"
          color="#ffffff"
          links={[
            <Link
              key="visit"
              href="/visit"
              label="visitors.more_info"
              variant="flat"
              color="secondary"
            />
          ]}
          />
 

        <SalesMap 
        label="exhibitors.map.title"
        disabledTicketIds={[1562,1566,1557,1570,1574,1578,1563,1567,1571,1579,1575,1581]}

        />

       
      </Layout>
    );
  }
}

export default connect()(PageExhibitorsByKeyword);

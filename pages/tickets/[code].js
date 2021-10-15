import {
    get as _get,
    MyHead as Head,
    connect,
    getInviteOgImage,
    WidgetVisitor,
    WidgetSchedule,
    WidgetEventInfo,
    TicketDownload,
    Resignation,
    Wrapper,
    EventInfo,
    Invite,
    reduxWrapper,
    configure,
    WidgetSalesMap,
    TwoColsLayout
  } from 'eventjuicer-site-components';
  
  
  const settings = require('../../settings').default;
  
  const PageTicket = ({code, person, exhibitors }) => {
  
    const name = `${_get(person, 'fname', '')} ${_get(person, 'lname', '')}`;
  
    return (
  
<>
<Head
    url={`/invite,${_get(person, 'id', 0)}`}
    image={getInviteOgImage(`Do zobaczenia! ${_get(person, 'fname', '')} z ${_get(person, 'cname2',)}`,
    "teh20_visitor_template1"
    )}
    titleLabel={[
    'visitors.opengraph.title',
    {
    name: name,
    location: 'EXPO XXI ',
    date: '20 października 2021',
    },
    ]}
/>

<Wrapper first label={['visitors.thankyou', { name: _get(person, 'fname', '') }]}>

<TwoColsLayout 

left={<>
<TicketDownload code={code} />
<Resignation code={code} />
</>}

right={
<WidgetEventInfo orientation="v" style={{ marginTop: 50 }} primaryStyle={null} secondaryStyle={null}  iconStyle="black" />
}

/>

<Invite person={person} text="Będę!" template="teh20_visitor_template1"/>
</Wrapper>

<WidgetSchedule />
<WidgetSalesMap />
<WidgetVisitor setting="visitor.register" />
</>)

}
  
  export const getServerSideProps = reduxWrapper.getServerSideProps(async (props) => {
  
    const {params: {code}} = props;
    const resource = `code/${code}`;
  
    const request = await fetch(`${settings.system.api}/${resource}`)
    const response = await request.json();
  
    await configure(props, {
      settings : settings,
      preload : [resource]
    })
  
    return {props: {
      code: code,
      person: "data" in response ? response.data : {}
    }}
  
  })
  
  export default connect(
    (state, props) => ({
      person:
        'code' in props && props.code && `code/${props.code}` in state.resources
          ? state.resources[`code/${props.code}`]
          : {},
    }),
    null,
  )(PageTicket);
  
// External Dependencies
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

// Internal Dependencies
import Container from '../../components/shared/container';
import Layout from '../../components/layout';
import { useEventData } from '../../utils/hooks/useEventData';

// Local Variables
const StyledContainer = styled(Container)(({ theme }) => ({
  '.leftSpacing': {
    marginLeft: theme.spacing(2),
  },
}));

// Component Definition
const TmeaRoundTable = ({ location }) => {
  const { edges } = useEventData();

  const tmeaRoundTable = edges.find((e) => e.node.titleOfEvent.includes('TMEA')).node;

  return (
    <Layout location={location}>
      <Helmet>
        <title>TMAC | TMEA Round Table</title>
      </Helmet>

      <StyledContainer>
        <h1>{tmeaRoundTable.titleOfEvent}</h1>
        <section>
          <h4>When</h4>
          <p className="leftSpacing">{tmeaRoundTable.dateOfEvent}</p>
          <p className="leftSpacing">{tmeaRoundTable.timeOfEvent}</p>
        </section>

        <section>
          <h4>Where</h4>
          <div className="leftSpacing">
            <p>Details coming soon</p>
            {/* <a
              href="http://www.marriott.com/hotels/travel/satdt-san-antonio-marriott-riverwalk/?scid=bb1a189a-fec3-4d19-a255-54ba596febe2"
              rel="noopener noreferrer"
              target="_blank">
              Marriott Riverwalk
            </a>
            , Salon ABC (tentative location)
            <p>
              <a
                href="https://www.google.com/maps/place/889+E+Market+St,+San+Antonio,+TX+78205/@29.4224582,-98.4864776,17z/data=!3m1!4b1!4m5!3m4!1s0x865c58aa7befb2d7:0xb0912174007dfe05!8m2!3d29.4224582!4d-98.4842889"
                rel="noopener noreferrer"
                target="_blank">
                889 E. Market St
                <br />
                San Antonio, TX 78205
              </a>
            </p> */}
          </div>
        </section>

        <section>
          <h4>Why</h4>
          <p className="leftSpacing">
            Held in conjunction with the&nbsp;
            <a href="https://www.tmea.org/">
              Texas Music Educators Association
            </a>{' '}
            convention.
          </p>
        </section>ider>
      </StyledContainer>
    </Layout>
  );
};

TmeaRoundTable.propTypes = {
  location: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
};

export default TmeaRoundTable;
